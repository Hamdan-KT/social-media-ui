import { apiClient } from "src/api/axios";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";

function AuthProvider({ children }) {
	const [token, setToken] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await apiClient.get("/me");
				setToken(response?.data?.token);
			} catch (error) {
				setToken(null);
			}
		};

		fetchUser();
	}, []);

	// adding request interceptors to api
	useLayoutEffect(() => {
		const authInterceptor = apiClient.interceptors.request.use((config) => {
			config.headers.Authorization =
				!config._retry && token
					? `Bearer ${token}`
					: config.headers.Authorization;
			return config;
		});

		// clean up function
		return () => {
			apiClient.interceptors.request.eject(authInterceptor);
		};
	}, [token]);

	// add response interceptors to refresh token
	useLayoutEffect(() => {
		const refreshInterceptor = apiClient.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;
				if (
					error.response.status === 403 &&
					error.response.data.message === "Unauthorized"
				) {
					try {
						const response = await apiClient.get("/refresh");
						setToken(response.data.accessToken);
						originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
						originalRequest._retry = true;
						apiClient(originalRequest);
					} catch (error) {
						setToken(null);
					}
				}
				return Promise.reject(error);
			}
		);

		return () => {
			apiClient.interceptors.response.eject(refreshInterceptor);
		};
	}, [token]);

	return <>{children}</>;
}

export default AuthProvider;

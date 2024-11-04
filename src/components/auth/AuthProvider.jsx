import { apiClient } from "src/api/axios";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getCurrentUser, refreshAuthToken } from "src/api/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { saveUser, setToken } from "src/app/slices/userSlice/userSlice";
import { useNavigate } from "react-router";
import { RoutePath } from "src/utils/routes";

function AuthProvider({ children }) {
	const token = useSelector((state) => state.user?.accessToken);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await getCurrentUser();
				console.log({ currentUser: response });
				const { accessToken, ...rest } = response.data;
				dispatch(saveUser(rest));
				dispatch(setToken(accessToken));
			} catch (error) {
				console.log({ currentUserError: error });
				if (error === "Unauthorized") {
					dispatch(saveUser({}));
					dispatch(setToken(null));
					navigate(`/${RoutePath.AUTH}/${RoutePath.LOGIN}`, { replace: true });
				}
			}
		};
		fetchUser();
	}, [dispatch, navigate]);

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
				console.log({ responseError: error });
				if (
					error.response.status === 401 &&
					error.response.data === "Unauthorized"
				) {
					try {
						const response = await refreshAuthToken();
						//setting new access token
						dispatch(setToken(response.data));
						originalRequest.headers.Authorization = `Bearer ${response.data}`;
						originalRequest._retry = true;
						return apiClient(originalRequest);
					} catch (error) {
						console.log({ refreshResponse: error });
						if (error.status === 403) {
							dispatch(saveUser({}));
							dispatch(setToken(null));
							navigate(`/${RoutePath.AUTH}/${RoutePath.LOGIN}`, {
								replace: true,
							});
						}
					}
				}
				return Promise.reject(error);
			}
		);

		return () => {
			apiClient.interceptors.response.eject(refreshInterceptor);
		};
	}, [token, dispatch, navigate]);

	return <>{children}</>;
}

export default AuthProvider;

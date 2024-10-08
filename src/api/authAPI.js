import { handleApiCallError } from "utils/common";
import { apiClient, authClient } from "./axios";

export const signIn = async (formData) => {
	try {
		const res = await authClient.post("/users/signin", formData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.data;
	} catch (error) {
		return handleApiCallError(error);
	}
};

export const signUp = async (formData) => {
	try {
		const res = await authClient.post("/users/signup", formData, {
			headers: {
				// "Content-Type": "multipart/form-data",
				"Content-Type": "application/json",
			},
		});
		return res.data;
	} catch (error) {
		return handleApiCallError(error);
	}
};

export const logout = async () => {
	try {
		const res = await apiClient.post("/users/logout", {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.data;
	} catch (error) {
		return handleApiCallError(error);
	}
};

export const refreshToken = async () => {
	try {
		const res = await apiClient.post("/users/refresh", {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.data;
	} catch (error) {
		return handleApiCallError(error);
	}
};

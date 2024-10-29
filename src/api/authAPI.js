import { handleApiCallError } from "src/utils/common";
import { apiClient, authClient } from "./axios";

// Register a new user
export const registerUser = async (userData) => {
	try {
		const { data } = await authClient.post("/auth/register", userData);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Log in an existing user
export const loginUser = async (credentials) => {
	try {
		const { data } = await authClient.post("/auth/login", credentials);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Log out the currently authenticated user
export const logoutUser = async () => {
	try {
		const { data } = await apiClient.post("/auth/logout");
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Refresh the authentication token
export const refreshAuthToken = async (refreshToken) => {
	try {
		const { data } = await apiClient.post("/auth/refresh-token", {
			refreshToken,
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get the currently authenticated user's details
export const getCurrentUser = async () => {
	try {
		const { data } = await apiClient.get("/auth/current-user");
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

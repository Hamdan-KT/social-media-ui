import { handleApiCallError } from "src/utils/common";
import { apiClient } from "./axios";

// Get details of a specific user by their ID
export const getUser = async (id) => {
	try {
		const { data } = await apiClient.get(`/user/${id}`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get a list of all users (can include filtering, pagination, etc.)
export const getUsers = async (params = {}, page, limit) => {
	try {
		const { data } = await apiClient.get("/user", {
			params: {
				...params,
				page,
				limit,
			},
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Update the currently authenticated user (e.g., update profile information)
export const updateUser = async (userData) => {
	try {
		const { data } = await apiClient.put("/user", userData);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Update the currently authenticated user's avatar
export const updateUserAvatar = async (avatarFile) => {
	try {
		const formData = new FormData();
		formData.append("avatar", avatarFile);
		const { data } = await apiClient.put("/user/avatar", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Delete a specific user by their ID
export const deleteUser = async (id) => {
	try {
		const { data } = await apiClient.delete(`/user/${id}`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get the list of users the specified user is following
export const getFollowingUsers = async (id) => {
	try {
		const { data } = await apiClient.get(`/user/${id}/following`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get the list of users following the specified user (i.e., their followers)
export const getFollowerUsers = async (id) => {
	try {
		const { data } = await apiClient.get(`/user/${id}/followers`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get the list of mutual users (both following and followers) for the specified user
export const getMutualUsers = async (id) => {
	try {
		const { data } = await apiClient.get(`/user/${id}/mutual`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Follow a specific user by their ID
export const followUser = async (id) => {
	try {
		const { data } = await apiClient.patch(`/user/${id}/follow`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Unfollow a specific user by their ID
export const unfollowUser = async (id) => {
	try {
		const { data } = await apiClient.patch(`/user/${id}/unfollow`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Accept a follow request from a user by their ID
export const acceptFollowRequest = async (id) => {
	try {
		const { data } = await apiClient.patch(`/user/${id}/follow-accept`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Reject a follow request from a user by their ID
export const rejectFollowRequest = async (id) => {
	try {
		const { data } = await apiClient.patch(`/user/${id}/follow-reject`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

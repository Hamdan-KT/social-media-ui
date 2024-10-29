import { handleApiCallError } from "src/utils/common";
import { apiClient } from "./axios";

// Create a new post (uploading content like images or videos, then saving the post)
export const createPost = async (postData) => {
	try {
		const formData = new FormData();
		for (const key in postData) {
			formData.append(key, postData[key]);
		}
		const { data } = await apiClient.post("/post", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Update an existing post
export const updatePost = async (postData) => {
	try {
		const { data } = await apiClient.put("/post", postData);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get the details of a specific post by its ID
export const getPost = async (id) => {
	try {
		const { data } = await apiClient.get(`/post/${id}/post`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Delete a specific post by its ID
export const deletePost = async (id) => {
	try {
		const { data } = await apiClient.delete(`/post/${id}/post`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get all posts from a specific user by their ID
export const getUserPosts = async (id) => {
	try {
		const { data } = await apiClient.get(`/post/${id}/posts`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Save a specific post for the authenticated user
export const savePost = async (id) => {
	try {
		const { data } = await apiClient.patch(`/post/${id}/save`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Unsave a specific post for the authenticated user
export const unsavePost = async (id) => {
	try {
		const { data } = await apiClient.patch(`/post/${id}/unsave`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get all saved posts for the authenticated user
export const getSavedPosts = async () => {
	try {
		const { data } = await apiClient.get("/post/saved");
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get all posts where a specific user is tagged
export const getTaggedPosts = async (id) => {
	try {
		const { data } = await apiClient.get(`/post/${id}/tagged`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get all users tagged in a specific post by post media ID
export const getTaggedUsers = async (id) => {
	try {
		const { data } = await apiClient.get(`/post/${id}/tags`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Like a specific post by its ID
export const likePost = async (id) => {
	try {
		const { data } = await apiClient.patch(`/post/${id}/like`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Unlike a specific post by its ID
export const unlikePost = async (id) => {
	try {
		const { data } = await apiClient.patch(`/post/${id}/unlike`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

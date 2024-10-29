import { handleApiCallError } from "src/utils/common";
import { apiClient } from "./axios";

// Add a new comment to a specific post by its ID
export const createComment = async (postId, commentData) => {
	try {
		const { data } = await apiClient.post(
			`/comment/${postId}/comment`,
			commentData
		);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Edit an existing comment on a specific post by its ID
export const updateComment = async (postId, commentData) => {
	try {
		const { data } = await apiClient.put(
			`/comment/${postId}/comment`,
			commentData
		);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get all comments for a specific post by its ID
export const getComments = async (postId) => {
	try {
		const { data } = await apiClient.get(`/comment/${postId}/comments`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get all reply comments for a specific comment by its ID
export const getReplyComments = async (commentId) => {
	try {
		const { data } = await apiClient.get(
			`/comment/${commentId}/reply-comments`
		);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Delete a comment from a specific post by its ID
export const deleteComment = async (commentId) => {
	try {
		const { data } = await apiClient.delete(`/comment/${commentId}/comment`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Like a specific comment by its ID
export const likeComment = async (commentId) => {
	try {
		const { data } = await apiClient.patch(`/comment/${commentId}/like`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Unlike a specific comment by its ID
export const unlikeComment = async (commentId) => {
	try {
		const { data } = await apiClient.patch(`/comment/${commentId}/unlike`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

import { handleApiCallError } from "src/utils/common";
import { apiClient } from "./axios";

// Create a new story (uploading content like images or videos, then saving the story)
export const createStory = async (storyData) => {
	try {
		const { data } = await apiClient.post("/story", storyData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Update an existing story
export const updateStory = async (storyData) => {
	try {
		const { data } = await apiClient.put("/story", storyData);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Get all story based on latest updated
export const getAllStory = async (page, limit) => {
	try {
		const { data } = await apiClient.get(`/story`, { params: { page, limit } });
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// delete specific story by it's id
export const deleteStory = async (id) => {
	try {
		const { data } = await apiClient.delete(`/story/${id}/story`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};
// Get all stories from a specific user by their ID
export const getUserStory = async (id, page, limit) => {
	try {
		const { data } = await apiClient.get(`/story/${id}/stories`, {
			params: { page, limit },
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};
// Like a specific story by its ID
export const likeStory = async (id) => {
	try {
		const { data } = await apiClient.patch(`/story/${id}/like`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// Unlike a specific story by its ID
export const unlikeStory = async (id) => {
	try {
		const { data } = await apiClient.patch(`/story/${id}/unlike`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

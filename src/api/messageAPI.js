import { handleApiCallError } from "src/utils/common";
import { apiClient } from "./axios";

// get searched message users
export const getChatSearchUsers = async (params = {}, page, limit) => {
	try {
		const { data } = await apiClient.get("/message/search-users", {
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

// start a new conversation if chat is not already exist
export const inintializeChat = async (receiverId) => {
	try {
		const { data } = await apiClient.get(
			`/message/initialize-chat/${receiverId}`
		);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// fetch all user chats
export const fetchUserChats = async (page, limit) => {
	try {
		const { data } = await apiClient.get("/message/fetch-chats", {
			params: {
				page,
				limit,
			},
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// fetch current chat based on chatId
export const getCurrentChat = async (chatId) => {
	try {
		const { data } = await apiClient.get(`/message/current-chat/${chatId}`);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// fetch all users messages based on chat ID
export const fetchChatMessages = async (chatId, page, limit) => {
	try {
		const { data } = await apiClient.get(`/message/fetch-messages/${chatId}`, {
			params: {
				page,
				limit,
			},
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

// upload message medias
export const uploadMessageMedias = async (medias) => {
	try {
		const { data } = await apiClient.post("/message/upload-media", medias, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};
import { handleApiCallError } from "src/utils/common";
import { apiClient } from "./axios";

export const subscribeNotification = async (subscription) => {
	try {
		const { data } = await apiClient.post(`/notification/subscribe`, {
			subscription,
		});
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

export const sendNotification = async (body) => {
	try {
		const { data } = await apiClient.post(
			`/notification/send-notification`,
			body
		);
		return data;
	} catch (error) {
		handleApiCallError(error);
	}
};

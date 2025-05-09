import { handleApiCallError } from "src/utils/common";
import { apiClient } from "./axios";
import { requestFCMToken } from "src/utils/firebase";

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

export const sendFCMToken = async (body) => {
	try {
		const token = await requestFCMToken();
		console.log({ token });
		if (token) {
			const { data } = await apiClient.post(`/notification/send-fcm-token`, {
				fcmToken: token,
				...body,
			});
			return data;
		} else {
			throw new Error("unable to generate FCM token! please try again!");
		}
	} catch (error) {
		handleApiCallError(error);
	}
};

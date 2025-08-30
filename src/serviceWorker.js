import axios from "axios";
import { Workbox } from "workbox-window";
import { apiClient } from "./api/axios";
import { sendFCMToken, subscribeNotification } from "./api/notificationAPI";

// service worker registration
export const registerSW = (mount = true) => {
	if ("serviceWorker" in navigator) {
		const wb = new Workbox("/firebase-messaging-sw.js");
		if (mount) {
			wb.register().then((registration) => {
				console.log(
					"Service Worker registered with scope:",
					registration.scope
				);
			});
			wb.addEventListener("waiting", () => {
				console.log("New version available. Please refresh the page.");
			});
		} else {
			wb.removeEventListener("waiting", () => {
				console.log("event removed!");
			});
		}
	}
};

export const registerPushNotification = async () => {
	if (
		"Notification" in window &&
		"serviceWorker" in navigator &&
		"PushManager" in window
	) {
		if (Notification.permission === "granted") {
			return sendFCMToken();
		} else if (Notification.permission === "default") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					return sendFCMToken();
				} else {
					console.warn("push notifications permission denied.");
				}
			});
		} else {
			console.warn("user has blocked notifications.");
		}
	} else {
		console.error("Push notifications are not supported in this browser.");
	}
};

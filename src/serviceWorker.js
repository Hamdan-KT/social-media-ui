import axios from "axios";
import { Workbox } from "workbox-window";
import { apiClient } from "./api/axios";
import { subscribeNotification } from "./api/notificationAPI";

// service worker registration
export const registerSW = () => {
	if ("serviceWorker" in navigator) {
		const wb = new Workbox("/sw.js");

		wb.register().then((registration) => {
			console.log("Service Worker registered with scope:", registration.scope);
		});

		wb.addEventListener("waiting", () => {
			console.log("New version available. Please refresh the page.");
		});
	}
};

export const registerPushNotification = async () => {
	if (
		"Notification" in window &&
		"serviceWorker" in navigator &&
		"PushManager" in window
	) {
		const handlesubscribeNotification = async () => {
			await navigator.serviceWorker.ready.then(async (registration) => {
				// Check if the user is already subscribed
				const existingSubscription =
					await registration.pushManager.getSubscription();
				if (existingSubscription) {
					console.log("user is already subscribed to notifications.");
					return;
				}
				const subscription = await registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: import.meta.env.VITE_PUBLIC_VAPID_KEY,
				});
				await subscribeNotification(subscription).then((response) => {
					console.log(response);
					console.log("user subscribed to notification.");
				});
			});
		};
		if (Notification.permission === "granted") {
			return handlesubscribeNotification();
		} else if (Notification.permission === "default") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					return handlesubscribeNotification();
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

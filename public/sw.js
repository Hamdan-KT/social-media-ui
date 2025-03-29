self.addEventListener("push", (event) => {
	console.log("Push event received:", event);
	if (event?.data) {
		const notificationData = event.data.json();
		const title = notificationData.title || "New Notification";
		const options = {
			body: notificationData.body || "You have a new notification.",
			icon: "/pwa-512x512.png",
			image: notificationData.image || undefined,
			data: { url: notificationData?.url || "/" },
		};
	}
});

self.addEventListener("notificationclick", (event) => {
	event.notification.close();
	const url = event.notification?.data?.url;
});

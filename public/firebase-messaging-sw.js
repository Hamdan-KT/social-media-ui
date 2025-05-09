import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
	apiKey: "AIzaSyCxOzLhnc5BHEGB9ViORxVvhGXlOjsmz2o",
	authDomain: "instogram-786.firebaseapp.com",
	projectId: "instogram-786",
	messagingSenderId: 21381023072,
	appId: "1:21381023072:web:3cdf146b1825d34f2b0a05",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

onBackgroundMessage(messaging, (payload) => {
	const { title, body } = payload.notification;
	console.log("got notification ....______d-----df-_")
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = "Background Message Title";
	const notificationOptions = {
		body: "Background Message body.",
		// icon: "/firebase-logo.png",
	};
	self.registration.showNotification(notificationTitle, notificationOptions);
});

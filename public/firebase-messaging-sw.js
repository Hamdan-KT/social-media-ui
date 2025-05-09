// Use importScripts instead of import
importScripts(
	"https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyCxOzLhnc5BHEGB9ViORxVvhGXlOjsmz2o",
	authDomain: "instogram-786.firebaseapp.com",
	projectId: "instogram-786",
	messagingSenderId: 21381023072,
	appId: "1:21381023072:web:3cdf146b1825d34f2b0a05",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	const { title, body } = payload.notification;

	console.log("got notification ....______d-----df-_");
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

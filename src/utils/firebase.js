// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestFCMToken = async () => {
	try {
		const token = await getToken(messaging, {
			vapidKey: import.meta.env.VITE_FIREBASE_PUBLIC_VAPID_KEY,
		});
		console.log({ ogToken: token });
		return token;
	} catch (err) {
		console.error("Error getting FCM token:", err);
	}
};

export { messaging, onMessage, requestFCMToken };

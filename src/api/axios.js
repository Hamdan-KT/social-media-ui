import axios from "axios";

export const apiClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const authClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// To share cookies to cross site domain, change to true.
apiClient.defaults.withCredentials = true;
authClient.defaults.withCredentials = true;

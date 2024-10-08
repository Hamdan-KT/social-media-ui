import axios from "axios";

export const apiClient = axios.create({
	baseURL: process.env.API_URL,
});

export const authClient = axios.create({
	baseURL: process.env.API_URL,
});

// To share cookies to cross site domain, change to true.
apiClient.defaults.withCredentials = true;
authClient.defaults.withCredentials = true;

import { io } from "socket.io-client";

let socket;

export const initSocket = (onConnect, onDisconnect, options = {}) => {
	const HOST = import.meta.env.VITE_API_URL;
	socket = io(HOST, {
		withCredentials: true,
		// query: { userId },
		// transports: ["websocket", "polling"],
		...options,
	});

	socket.on("connect", () => {
		console.log("Connected to socket server");
		if (onConnect) onConnect(socket);
	});

	socket.on("disconnect", () => {
		console.log("Disconnected from socket server");
		if (onDisconnect) onDisconnect();
	});

	return socket;
};

export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		console.log("Socket disconnected manually");
	}
};

export const getSocket = () => socket;

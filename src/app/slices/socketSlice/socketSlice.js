import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	socket: null,
	isConnected: false,
};

export const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		setSocket: (state, action) => {
			state.socket = action.payload;
		},
		setConnected: (state, action) => {
			state.isConnected = action.payload;
		},
		resetSocket: (state) => {
			state.socket = null;
			state.isConnected = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSocket, setConnected, resetSocket } = socketSlice.actions;

export default socketSlice.reducer;

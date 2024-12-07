import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	attachment: {
		userId: null,
		messageId: null,
		name: "",
		message: "",
	},
	selectedChat: null,
	chatMessages: []
};

export const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		updateAttachment: (state, action) => {
			state.attachment = action.payload;
		},
		setSelectedChat: (state, action) => {
			state.selectedChat = action.payload;
		},
		setChatMessages: (state, action) => {
			state.chatMessages = action.payload
		}
	},
});

// Action creators are generated for each case reducer function
export const { updateAttachment, setSelectedChat, setChatMessages } =
	messageSlice.actions;

export default messageSlice.reducer;

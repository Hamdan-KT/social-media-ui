import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	attachment: {
		userId: null,
		message: null,
		media: null,
	},
	selectedChat: null,
	primaryChatList: [],
	chatMessages: [],
};

export const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		updateAttachment: (state, action) => {
			state.attachment = {
				...action.payload,
				media: action.payload?.media ?? null,
			};
		},
		setSelectedChat: (state, action) => {
			state.selectedChat = action.payload;
		},
		setChatMessages: (state, action) => {
			state.chatMessages = action.payload;
		},
		setPrimaryChatList: (state, action) => {
			state.primaryChatList = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	updateAttachment,
	setSelectedChat,
	setChatMessages,
	setPrimaryChatList,
} = messageSlice.actions;

export default messageSlice.reducer;

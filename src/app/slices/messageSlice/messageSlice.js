import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	attachment: {
        userId: null,
        messageId: null,
		name: "",
		message: "",
	},
};

export const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		updateAttachment: (state, action) => {
			state.attachment = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateAttachment } = messageSlice.actions;

export default messageSlice.reducer;

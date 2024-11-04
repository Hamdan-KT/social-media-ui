import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	postId: null,
	commentWindowOpen: false,
};

export const commentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {
		setCommentData: (state, action) => {
			state.postId = action.payload;
		},
		handleCommentWindowOpen: (state, action) => {
			state.commentWindowOpen = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCommentData, handleCommentWindowOpen } = commentSlice.actions;

export default commentSlice.reducer;

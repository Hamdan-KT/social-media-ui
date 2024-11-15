import { commentTypes } from "src/utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	postId: null,
	commentWindowOpen: false,
	commentBody: {
		parent_comment: null,
		type: commentTypes.GENERAL,
		mentions: [],
		replyUserName: null,
	},
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
		setCommentBody: (state, action) => {
			state.commentBody = action.payload;
		},
		clearCommentBody: (state, action) => {
			state.commentBody = {
				parent_comment: null,
				type: commentTypes.GENERAL,
				mentions: [],
				replyUserName: null,
			};
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setCommentData,
	handleCommentWindowOpen,
	setCommentBody,
	clearCommentBody,
} = commentSlice.actions;

export default commentSlice.reducer;

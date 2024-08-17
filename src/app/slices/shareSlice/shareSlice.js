import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	shareWindowOpen: false,
	shareContent: {
		id: null,
		message: "",
	},
	selectedUsers: {},
};

export const shareSlice = createSlice({
	name: "share",
	initialState,
	reducers: {
		setShareContent: (state, action) => {
			state.shareContent = action.payload;
		},
		setSelectedUsers: (state, action) => {
			state.selectedUsers = action.payload;
		},
		handleShareWindowOpen: (state, action) => {
			state.shareWindowOpen = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setShareContent, setSelectedUsers, handleShareWindowOpen } =
	shareSlice.actions;

export default shareSlice.reducer;

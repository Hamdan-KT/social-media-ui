import { generateStories } from "src/views/Stories/dummy";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
	accessToken: null,
	stories: generateStories(),
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		saveUser: (state, action) => {
			console.log(action.payload?.user);
			state.user = action.payload;
		},
		logOut: (state) => {
			state.user = {};
		},
		setToken: (state, action) => {
			state.accessToken = action.payload;
		},
		setStories: (state, action) => {
			state.stories = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { saveUser, logOut, setToken, setStories } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
	accessToken: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		saveUser: (state, action) => {
			state.user = action.payload;
		},
		logOut: (state) => {
			state.user = {};
		},
		setToken: (state, action) => {
			state.accessToken = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { saveUser, logOut, setToken } = userSlice.actions;

export default userSlice.reducer;

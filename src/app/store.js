import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice/userSlice";
import postReducer from "./slices/postSlice/postSlice";
import customizationReducer from "./slices/customizationSlice/customization";
import layoutReducer from "./slices/layoutSlice/layoutSlice";
import messageReducer from "./slices/messageSlice/messageSlice";
import shareReducer from "./slices/shareSlice/shareSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		customization: customizationReducer,
		post: postReducer,
		layout: layoutReducer,
		message: messageReducer,
		share: shareReducer,
	},
});

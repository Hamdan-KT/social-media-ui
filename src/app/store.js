import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice/userSlice";
import postReducer from "./slices/postSlice/postSlice";
import customizationReducer from "./slices/customizationSlice/customization";

export const store = configureStore({
	reducer: {
		user: userReducer,
		customization: customizationReducer,
		post: postReducer,
	},
});

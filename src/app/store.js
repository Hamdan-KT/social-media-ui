import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice/userSlice";
import appReducer from "./slices/appSlice/appSlice"
import customizationReducer from "./slices/customizationSlice/customization";

export const store = configureStore({
  reducer: {
    user: userReducer,
    customization: customizationReducer,
    app: appReducer
  },
});

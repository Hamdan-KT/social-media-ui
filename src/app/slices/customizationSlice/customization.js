import { sidebarpopUps } from "utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	borderRadius: 15,
};

export const customizationSlice = createSlice({
	name: "customization",
	initialState,
	reducers: {
		handleBorderRadius: (state, action) => {
			state.borderRadius = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { handleBorderRadius } = customizationSlice.actions;

export default customizationSlice.reducer;

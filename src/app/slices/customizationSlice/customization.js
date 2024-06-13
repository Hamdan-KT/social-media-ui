import { sidebarpopUps } from "utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	sideBarOpen: true,
	borderRadius: 15,
	sideBarPopup: {
		[sidebarpopUps.SEARCH]: false,
		[sidebarpopUps.NOTIFICATION]: false,
		[sidebarpopUps.CREATE]: false,
	},
};

export const customizationSlice = createSlice({
	name: "customization",
	initialState,
	reducers: {
		handleSideBarOpen: (state, action) => {
			state.sideBarOpen = action.payload.open;
		},
		handleBorderRadius: (state, action) => {
			state.borderRadius = action.payload;
		},
		sideBarPopupOpen: (state, action) => {
			// initially setting all values to false
			state.sideBarPopup = _.mapValues(state.sideBarPopup, () => false);
			// settsideBarPopup
			if (action.payload?.type) {
				state.sideBarPopup[action.payload?.type] = action.payload?.value;
			}
		},
		sideBarPopupClose: (state, action) => {
			// setting all values to false
			state.sideBarPopup[action.payload?.type] = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { handleSideBarOpen, sideBarPopupOpen, sideBarPopupClose } =
	customizationSlice.actions;

export default customizationSlice.reducer;

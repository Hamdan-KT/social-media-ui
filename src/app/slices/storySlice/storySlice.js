import { storyStages } from "src/utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	storyMedias: [],
	activeStory: {},
	aspectRatio: 9 / 16, //default aspect ratio to all post medias
	storyStages: {
		[storyStages.CROP]: true,
		[storyStages.EDIT]: false,
	},
	storyDetails: {
		caption: "",
		isDisableComment: false,
		isHideLikes: false,
		location: "",
	},
};

export const storySlice = createSlice({
	name: "story",
	initialState,
	reducers: {
		loadStories: (state, action) => {
			if (!Array.isArray(action.payload)) {
				throw new Error(
					"Stories should be an array of that contain objects of story with properties!"
				);
			}
			state.activeStory = action.payload[0];
			state.storyMedias = action.payload;
		},
		clearStories: (state) => {
			state.activeStory = {};
			state.storyMedias = [];
			// initially setting all values to false
			state.storyStages = _.mapValues(state.storyStages, () => false);
			// set post stage to next stage
			state.storyStages[storyStages.CROP] = true;
		},
		setStoryDetails: (state, action) => {
			state.postDetails = {
				...state.postDetails,
				[action.payload.key]: action.payload.value,
			};
		},
		setActiveStory: (state, action) => {
			state.activeStory = action.payload;
		},
		cropStories: (state, action) => {
			state.storyMedias = action.payload;
			// initially setting all values to false
			state.storyStages = _.mapValues(state.storyStages, () => false);
			// set post stage to next stage
			state.storyStages[storyStages.EDIT] = true;
		},
		setStoryCroppedAreaPixels: (state, action) => {
			const index = state.storyMedias?.findIndex(
				(item) => item.uID === state.activeStory.uID
			);
			if (index !== -1) {
				state.storyMedias[index] = {
					...state.storyMedias[index],
					croppedAreaPixels: action.payload.croppedAreaPixels,
				};
				state.activeStory = state.storyMedias[index];
			}
		},
		setStoryStages: (state, action) => {
			// initially setting all values to false
			state.storyStages = _.mapValues(state.storyStages, () => false);
			// set post stage
			if (action.payload?.type) {
				state.storyStages[action.payload?.type] = action.payload?.value;
			}
		},

		setStoryZoomVal: (state, action) => {
			// state.storyMedias = action.payload;
			const index = state.storyMedias?.findIndex(
				(item) => item.uID === state.activeStory.uID
			);
			if (index !== -1) {
				state.storyMedias[index] = {
					...state.storyMedias[index],
					zoom: action.payload.zoom,
				};
				state.activeStory = state.storyMedias[index];
			}
		},
		setStoryRotationVal: (state, action) => {
			// state.storyMedias = action.payload;
			const index = state.storyMedias?.findIndex(
				(item) => item.uID === state.activeStory.uID
			);
			if (index !== -1) {
				state.storyMedias[index] = {
					...state.storyMedias[index],
					rotation: action.payload.rotation,
				};
				state.activeStory = state.storyMedias[index];
			}
		},
		setStoryCropVal: (state, action) => {
			// state.storyMedias = action.payload;
			const index = state.storyMedias?.findIndex(
				(item) => item.uID === state.activeStory.uID
			);
			if (index !== -1) {
				state.storyMedias[index] = {
					...state.storyMedias[index],
					crop: action.payload.crop,
				};
				state.activeStory = state.storyMedias[index];
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	loadStories,
	clearStories,
	setStoryDetails,
	setActiveStory,
	cropStories,
	setStoryCroppedAreaPixels,
	setStoryZoomVal,
	setStoryRotationVal,
	setStoryCropVal,
	setStoryStages,
} = storySlice.actions;

export default storySlice.reducer;

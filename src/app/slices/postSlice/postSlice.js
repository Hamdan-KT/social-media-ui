import { postStages } from "utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const initialState = {
	postMedias: [
		{
			uID: uuidv4(),
			url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
			crop: { x: 0, y: 0 },
			zoom: 1,
			rotation: 0,
			flip: { x: 1, y: 1 },
			aspectRatio: 1 / 1,
			filterClassName: "",
			customFilters: {
				Brightness: "",
				Contrast: "",
				Fade: "",
				Saturation: "",
				Temperature: "",
				Vignette: "",
			},
		},
		{
			uID: uuidv4(),
			url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
			crop: { x: 0, y: 0 },
			zoom: 1,
			rotation: 0,
			flip: { x: 1, y: 1 },
			aspectRatio: 1 / 1,
			filterClassName: "",
			customFilters: {
				Brightness: "",
				Contrast: "",
				Fade: "",
				Saturation: "",
				Temperature: "",
				Vignette: "",
			},
		},
		{
			uID: uuidv4(),
			url: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			crop: { x: 0, y: 0 },
			zoom: 1,
			rotation: 0,
			flip: { x: 1, y: 1 },
			aspectRatio: 1 / 1,
			filterClassName: "",
			customFilters: {
				Brightness: "",
				Contrast: "",
				Fade: "",
				Saturation: "",
				Temperature: "",
				Vignette: "",
			},
		},
	],
	activePost: {},
	aspectRatio: 1 / 1, //default aspect ratio to all post medias
	postStages: {
		[postStages.CROP]: true,
		[postStages.EDIT]: false,
		[postStages.SHARE]: false,
	},
};

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		loadPosts: (state, action) => {
			if (!Array.isArray(action.payload)) {
				throw new Error(
					"Posts should be an array of that contain objects of posts with properties!"
				);
			}
			state.activePost = action.payload[0];
			state.postMedias = action.payload;
		},
		clearPosts: (state) => {
			state.activePost = {};
			state.postMedias = [];
		},
		setActivePost: (state, action) => {
			state.activePost = action.payload;
		},
		setFilterClassName: (state, action) => {
			const index = state.postMedias?.findIndex(
				(item) => item.uID === state.activePost.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					filterClassName: action.payload.className,
				};
				state.activePost = state.postMedias[index];
			}
		},
		setCustomFilter: (state, action) => {
			const index = state.postMedias?.findIndex(
				(item) => item.uID === state.activePost.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					filterClassName: "",
					customFilters: {
						...state.postMedias[index].customFilters,
						[action.payload.filter]: action.payload.value,
					},
				};
				state.activePost = state.postMedias[index];
			}
		},
		setPostStages: (state, action) => {
			// initially setting all values to false
			state.postStages = _.mapValues(state.postStages, () => false);
			// set post stage
			if (action.payload?.type) {
				state.postStages[action.payload?.type] = action.payload?.value;
			}
		},
		setAspectRatioVal: (state, action) => {
			state.aspectRatio = action.payload.ratio;
			state.postMedias = state.postMedias?.map((item) => {
				return {
					...item,
					aspectRatio: action.payload.ratio,
				};
			});
		},
		setZoomVal: (state, action) => {
			// state.postMedias = action.payload;
			const index = state.postMedias?.findIndex(
				(item) => item.uID === state.activePost.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					zoom: action.payload.zoom,
				};
				state.activePost = state.postMedias[index];
			}
		},
		setRotationVal: (state, action) => {
			// state.postMedias = action.payload;
			const index = state.postMedias?.findIndex(
				(item) => item.uID === state.activePost.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					rotation: action.payload.rotation,
				};
				state.activePost = state.postMedias[index];
			}
		},
		setFlipVal: (state, action) => {
			// state.postMedias = action.payload;
			const index = state.postMedias?.findIndex(
				(item) => item.uID === state.activePost.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					flip: action.payload.flip,
				};
				state.activePost = state.postMedias[index];
			}
		},
		setCroVal: (state, action) => {
			// state.postMedias = action.payload;
			const index = state.postMedias?.findIndex(
				(item) => item.uID === state.activePost.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					crop: action.payload.crop,
				};
				state.activePost = state.postMedias[index];
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	loadPosts,
	clearPosts,
	setZoomVal,
	setRotationVal,
	setFlipVal,
	setCroVal,
	setAspectRatioVal,
	setPostStages,
	setFilterClassName,
	setCustomFilter,
	setActivePost,
} = postSlice.actions;

export default postSlice.reducer;

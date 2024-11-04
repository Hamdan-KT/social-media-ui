import { postStages } from "utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { postStages as ps } from "utils/constants";

const initialState = {
	postMedias: [],
	activePost: {},
	aspectRatio: 4 / 5, //default aspect ratio to all post medias
	postStages: {
		[postStages.CROP]: true,
		[postStages.EDIT]: false,
		[postStages.SHARE]: false,
	},
	postDetails: {
		caption: "",
		isDisableComment: false,
		isHideLikes: false,
		location: "",
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
			// initially setting all values to false
			state.postStages = _.mapValues(state.postStages, () => false);
			// set post stage to next stage
			state.postStages[ps.CROP] = true;
		},
		setPostDetails: (state, action) => {
			state.postDetails = {
				...state.postDetails,
				[action.payload.key]: action.payload.value,
			};
		},
		setActivePost: (state, action) => {
			state.activePost = action.payload;
		},
		cropPosts: (state, action) => {
			state.postMedias = action.payload;
			// initially setting all values to false
			state.postStages = _.mapValues(state.postStages, () => false);
			// set post stage to next stage
			state.postStages[ps.EDIT] = true;
		},
		setCroppedAreaPixels: (state, action) => {
			const index = state.postMedias?.findIndex(
				(item) => item.uID === state.activePost.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					croppedAreaPixels: action.payload.croppedAreaPixels,
				};
				state.activePost = state.postMedias[index];
			}
		},
		setFilterClassName: (state, action) => {
			const index = state.postMedias?.findIndex(
				(item) => item.uID === state.activePost.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					customFilters: {
						Brightness: 100,
						Contrast: 100,
						Saturation: 100,
						Fade: 0,
						Temperature: 0,
						Vignette: 0,
					},
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
		setCropVal: (state, action) => {
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
		setTags: (state, action) => {
			// state.postMedias = action.payload;
			const index = state.postMedias?.findIndex(
				(item) => item.uID === state.activePost.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					tags: action.payload.tags,
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
	setCropVal,
	setAspectRatioVal,
	setPostStages,
	setFilterClassName,
	setCustomFilter,
	setActivePost,
	setCroppedAreaPixels,
	cropPosts,
	setTags,
	setPostDetails,
} = postSlice.actions;

export default postSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
		},
		{
			uID: uuidv4(),
			url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
			crop: { x: 0, y: 0 },
			zoom: 1,
			rotation: 0,
			flip: { x: 1, y: 1 },
			aspectRatio: 1 / 1,
		},
		{
			uID: uuidv4(),
			url: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			crop: { x: 0, y: 0 },
			zoom: 1,
			rotation: 0,
			flip: { x: 1, y: 1 },
			aspectRatio: 1 / 1,
		},
	],
	aspectRatio: 1 / 1, //default aspect ratio to post medias
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		loadPosts: (state, action) => {
			state.postMedias = action.payload;
		},
		clearPosts: (state) => {
			state.postMedias = [];
		},
		setAspectRatioVal: (state, action) => {
			state.aspectRatio = action.payload.ratio
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
				(item) => item.uID === action.payload.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					zoom: action.payload.zoom,
				};
			}
		},
		setRotationVal: (state, action) => {
			// state.postMedias = action.payload;
			const index = state.postMedias?.findIndex(
				(item) => item.uID === action.payload.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					rotation: action.payload.rotation,
				};
			}
		},
		setFlipVal: (state, action) => {
			// state.postMedias = action.payload;
			const index = state.postMedias?.findIndex(
				(item) => item.uID === action.payload.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					flip: action.payload.flip,
				};
			}
		},
		setCroVal: (state, action) => {
			// state.postMedias = action.payload;
			const index = state.postMedias?.findIndex(
				(item) => item.uID === action.payload.uID
			);
			if (index !== -1) {
				state.postMedias[index] = {
					...state.postMedias[index],
					crop: action.payload.crop,
				};
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
} = appSlice.actions;

export default appSlice.reducer;

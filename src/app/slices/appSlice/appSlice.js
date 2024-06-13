import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	postMedias: [],
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

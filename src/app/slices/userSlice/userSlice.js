import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, logOut } = userSlice.actions;

export default userSlice.reducer;

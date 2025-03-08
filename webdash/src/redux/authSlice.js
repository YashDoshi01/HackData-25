import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "userAuth",
  initialState: { auth: false },
  reducers: {
    authenticated: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { authenticated } = authSlice.actions;
export default authSlice.reducer;

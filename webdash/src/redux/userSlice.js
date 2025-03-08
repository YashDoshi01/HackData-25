import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userRef",
  initialState: { userId: null },
  reducers: {
    userReference: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { userReference } = userSlice.actions;
export default userSlice.reducer;

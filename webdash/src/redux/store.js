import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    userAuth: authReducer,
    userRef: userReducer,
  },
});

export default store;

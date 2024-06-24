import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import courseReducer from "./courses/courseSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

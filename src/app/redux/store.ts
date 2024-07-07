import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import courseReducer from "./courses/courseSlice";
import categoryReducer from "./categories/categorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

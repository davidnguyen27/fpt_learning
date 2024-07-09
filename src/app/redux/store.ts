import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import courseReducer from "./courses/courseSlice";
import categoryReducer from "./categories/categorySlice";
import updateReducer from "./user/updateSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    course: courseReducer,
    update: updateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

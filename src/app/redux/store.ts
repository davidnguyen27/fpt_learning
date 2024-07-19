import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import courseReducer from "./courses/courseSlice";
import categoryReducer from "./categories/categorySlice";
import updateReducer from "./user/updateSlice";
import paginationSlice from "./pagination/paginationSlice";

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    toggleLoading: (state, action) => action.payload,
  },
});

export const { toggleLoading } = loadingSlice.actions;


export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    course: courseReducer,
    update: updateReducer,
    loading: loadingSlice.reducer,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

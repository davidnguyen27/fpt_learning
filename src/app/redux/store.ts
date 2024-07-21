import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import paginationSlice from "./pagination/paginationSlice";

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    toggleLoading: (_state, action) => action.payload,
  },
});

export const { toggleLoading } = loadingSlice.actions;


export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingSlice.reducer,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

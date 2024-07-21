import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  pageNum: number;
  pageSize: number;
  total: number;
}

const initialState: PaginationState = {
  pageNum: 1,
  pageSize: 10,
  total: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pageNum = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const { setPage, setPageSize } = paginationSlice.actions;
export default paginationSlice.reducer;

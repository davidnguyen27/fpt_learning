import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../../models/Types";
import {
  createCategoryAPI,
  deleteCategoryAPI,
  getCategoriesAPI,
} from "../../../services/categoryService";

interface CategoryState {
  categories: Category["pageData"];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (
    categoryData: Partial<Category["pageData"][number]>,
    { rejectWithValue },
  ) => {
    try {
      const res = await createCategoryAPI(categoryData);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (searchKeyword: string, { rejectWithValue }) => {
    try {
      const res: Category = await getCategoriesAPI(searchKeyword);
      return res.pageData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await deleteCategoryAPI(categoryId);
      return categoryId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<Category["pageData"]>) => {
          state.loading = false;
          state.categories = action.payload;
        },
      )
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<Category["pageData"][number]>) => {
          state.loading = false;
          state.categories.push(action.payload);
        },
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.categories = state.categories.filter(
            (category) => category._id !== action.payload,
          );
        },
      );
  },
});

export default categorySlice.reducer;

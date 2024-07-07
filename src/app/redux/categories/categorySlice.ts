import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../../models/Types";
import {
  createCategoryAPI,
  getCategoriesAPI,
} from "../../../services/categoryService";

// Định nghĩa loại dữ liệu cho trạng thái
interface CategoryState {
  categories: Category["pageData"];
  loading: boolean;
  error: string | null;
}

// Khởi tạo trạng thái ban đầu
const initialState: CategoryState = {
  categories: [
    {
      _id: "",
      name: "",
      parent_category_id: null,
      description: "",
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
    },
  ],
  loading: false,
  error: null,
};

// Tạo async thunk để xử lý việc thêm Category
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
  async (_, { rejectWithValue }) => {
    try {
      const res: Category = await getCategoriesAPI();
      return res.pageData;
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
        createCategory.fulfilled,
        (state, action: PayloadAction<Category["pageData"][number]>) => {
          state.loading = false;
          state.categories.push(action.payload);
        },
      )
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<Category["pageData"]>) => {
          state.categories = action.payload;
        },
      );
  },
});

export default categorySlice.reducer;

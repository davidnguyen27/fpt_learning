import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCourses } from "../../../services/coursesService";
import { Course } from "../../../models/Types";

interface CourseState {
  course: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  course: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state: CourseState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourses.fulfilled,
        (state: CourseState, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.course = action.payload;
        },
      )
      .addCase(fetchCourses.rejected, (state: CourseState, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      });
  },
});

export const fetchCourses = createAsyncThunk("course/fetchCourses", async () =>
  getCourses(),
);

export default courseSlice.reducer;

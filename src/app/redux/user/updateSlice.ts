

import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { APILink } from "../../../const/linkAPI";
import { UserData } from "../../../models/Types";


interface UpdateState {
  loading: boolean;
  error: string | null;
}

const initialState: UpdateState = {
  loading: false,
  error: null,
};

export const updateUser = createAsyncThunk(
  "update/updateUser",
  async ({ userId, updatedUserData }: { userId: string, updatedUserData: Partial<UserData> }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.put(`${APILink}/api/users/${userId}`, updatedUserData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser: UserData = response.data.data; // Assuming response structure matches UserData
      console.log("Updated user:", updatedUser);

      return updatedUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateUser.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addCase(
      updateUser.fulfilled,
      (state) => {
        state.loading = false;
        // Optionally handle success case if needed
      }
    );
    builder.addCase(
      updateUser.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Update user failed";
      }
    );
  },
});

export const { clearError } = updateSlice.actions;

export default updateSlice.reducer;

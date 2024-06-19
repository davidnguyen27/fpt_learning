import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/Types";
import { getUsers } from "../../../services/getUsers";

interface UserState {
  users: User[];
  admin: User | null;
  roleFilter: string;
  statusFilter: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  admin: null,
  roleFilter: "",
  statusFilter: "",
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () =>
  getUsers(),
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    filterRole(state, action) {
      state.roleFilter = action.payload;
    },
    filterStatus(state, action) {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UserState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: UserState, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchUsers.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { filterRole, filterStatus } = userSlice.actions;

export default userSlice.reducer;

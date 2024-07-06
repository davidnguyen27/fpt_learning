import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SignUpPayload, User } from "../../../models/Types";
import { registerAccount } from "../../../services/usersService";

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
      })
      .addCase(signUp.pending, (state: UserState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signUp.fulfilled,
        (state: UserState, action: PayloadAction<User>) => {
          state.loading = false;
          state.users.push(action.payload);
        },
      )
      .addCase(signUp.rejected, (state: UserState, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to sign up";
      });
  },
});

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () =>
  getUsers(),
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData: SignUpPayload, { rejectWithValue }) => {
    try {
      return await registerAccount.signUp(userData);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to sign up");
    }
  },
);

export const { filterRole, filterStatus } = userSlice.actions;

export default userSlice.reducer;

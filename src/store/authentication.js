import { HandleCheckUserLoggedIn } from "@/api/authentication";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: false,
};

export const checkUserLoggedIn = createAsyncThunk(
  "auth/checkUserLoggedIn",
  async () => {
    const response = HandleCheckUserLoggedIn();
    return response;
  }
);

const authenticationSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    handleLogout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUserLoggedIn.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(checkUserLoggedIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.isLoggedIn ? action.payload.user : null;
    });

    builder.addCase(checkUserLoggedIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { handleLogout } = authenticationSlice.actions;

export default authenticationSlice.reducer;

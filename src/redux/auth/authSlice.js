import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authOperations";

const handlePending = (state, action) => {
  state.error = null;
  state.isAuthLoading = true;
};

const handleRejected = (state, action) => {
  state.isAuthLoading = false;
  state.error = action.payload;
};

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isAuthLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        const { name, email } = action.payload;
        state.isAuthLoading = false;
        state.user = { name, email };
      })
      .addCase(registerUser.rejected, handleRejected);
  },
});

export const { reducer: auth } = authSlice;

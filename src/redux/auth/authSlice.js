import { createSlice } from "@reduxjs/toolkit";
import { registerUser, login, logout, getCurrentUser } from "./authOperations";

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
  isLoggedIn: false,
  isRefreshing: false,
  isAuthLoading: false,
  success: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    removeErrorMassage: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        const { name, email } = action.payload;
        state.user = { name, email };
        state.success = true;
        state.isAuthLoading = false;
      })
      .addCase(registerUser.rejected, handleRejected);
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isAuthLoading = false;
      })
      .addCase(login.rejected, handleRejected);
    builder
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.isAuthLoading = false;
        state.user = { name: null, email: null };
        state.error = null;
      })
      .addCase(logout.rejected, handleRejected);
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const { reducer: auth } = authSlice;
export const { removeErrorMassage, removeSuccess } = authSlice.actions;

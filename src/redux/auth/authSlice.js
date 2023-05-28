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
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isAuthLoading: false,
  error: null,
  success: null,
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
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isAuthLoading = false;
      })
      .addCase(login.rejected, handleRejected);
    builder
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.isAuthLoading = false;
        state.token = null;
        state.user = { name: null, email: null };
        state.error = null;
      })
      .addCase(logout.rejected, handleRejected);
    builder
      .addCase(getCurrentUser.pending, handlePending)
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.isAuthLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.rejected, handleRejected);
  },
});

export const { reducer: auth } = authSlice;
export const { removeErrorMassage, removeSuccess } = authSlice.actions;

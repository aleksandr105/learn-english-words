import { instance } from "../../axiosSettings";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/register",

  async ({ name, email, password, language }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/register", {
        name,
        email,
        password,
        language,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",

  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/login", { email, password });

      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("accessToken", data.accessToken);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      await instance.post("/auth/logout");

      localStorage.setItem("refreshToken", null);

      localStorage.setItem("accessToken", null);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/currentUser",
  async (payload, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken === "null") return rejectWithValue();

    try {
      const { data } = await instance.get("/auth/current");

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

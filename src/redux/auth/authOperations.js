import { instance } from "../axiosSettings";
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

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

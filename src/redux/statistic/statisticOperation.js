import { instance } from "../../axiosSettings";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { onNatification } from "../../helpers";

export const getStatistic = createAsyncThunk(
  "statistics/get_user_statistic",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/statistics/get_user_statistic");
      return data;
    } catch (error) {
      onNatification(error.message, { autoClose: 4000 });
      return rejectWithValue;
    }
  }
);

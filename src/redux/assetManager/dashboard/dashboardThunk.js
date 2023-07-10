import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";
import { postLoginService } from "services";

export const getCurrentHourSpendRate = createAsyncThunk(
  "environments/getCurrentHourSpendRate",
  async () => {
    try {
      const response = await postLoginService.get(config.GET_CURRENT_HOUR_SPEND_RATE);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

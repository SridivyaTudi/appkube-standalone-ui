import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const organizationsAsyncThunk = createAsyncThunk(
  "organizations/getOrgsAsync",
  async () => {
    try {
      const response = await postLoginService.get(
        `${config.GET_ALL_ORG_WISE_DEPARTMENTS}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

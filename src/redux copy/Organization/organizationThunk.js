import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";
import { postLoginService } from "services";

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

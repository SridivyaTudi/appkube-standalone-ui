import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/auth-views/config";
import { postLoginService } from "services";

export const getMFACode = createAsyncThunk(
  "settings/getMFACode",
  async (data) => {
    try {
      const response = await postLoginService.post(
        `${config.GET_MFA_CODE}`,
        data
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/auth-views/Config";
import { postLoginService } from "Services";

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

export const authMFACode = createAsyncThunk(
  "settings/authMFACode",
  async (params) => {
    try {
      const response = await postLoginService.post(
        `${config.AUTH_MFA}`,
        params
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

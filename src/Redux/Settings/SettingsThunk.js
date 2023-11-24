import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AuthViews/Config";
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

export const createRole = createAsyncThunk(
  "settings/createRole",
  async (params) => {
    try {
      const response = await postLoginService.post(
        `${config.CREATE_ROLE}`,
        params
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createGroup = createAsyncThunk(
  "settings/createGroup",
  async (params) => {
    try {
      const response = await postLoginService.post(
        `${config.CREATE_GROUP}`,
        params
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

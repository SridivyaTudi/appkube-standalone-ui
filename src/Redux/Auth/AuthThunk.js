import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AuthViews/Config";
import { preLoginService } from "Services";

export const signUp = createAsyncThunk("auth/signUp", async (params) => {
  try {
    const response = await preLoginService.post(config.SIGN_UP, params);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const login = createAsyncThunk("auth/signIn", async (data) => {
  const url = `${config.LOGIN}?username=${data.userName}&password=${data.password}`;
  try {
    const response = await preLoginService.get(url);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (params) => {
    try {
      const response = await preLoginService.get(`${config.FORGET_PWD}`, {
        headers: { "public-request": "true" },
        params: { userName: params },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (params) => {
    try {
      const response = await preLoginService.post(
        `${config.RESET_PWD}`,
        params
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const sentEmailToCompanyAdmin = createAsyncThunk(
  "auth/sentEmailToCompanyAdmin",
  async (formData) => {
    try {
      const response = await preLoginService.post(
        config.SENT_EMAIL_TO_COMPANY_ADMIN,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const authMFACode = createAsyncThunk(
  "auth/authMFACode",
  async (params) => {
    try {
      const response = await preLoginService.post(config.AUTH_MFA, params);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

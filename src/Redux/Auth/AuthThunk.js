import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AuthViews/Config";
import { preLoginService } from 'Services';

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (urlParams) => {
    try {
      const response = await preLoginService.post(`${config.SIGN_UP}?${urlParams}`);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

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

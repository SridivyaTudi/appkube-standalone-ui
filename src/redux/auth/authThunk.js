import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/auth-views/config";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (urlParams) => {
    const url = config.SIGN_UP;
    const options = {
      method: "POST",
      body: {},
      redirect: "follow",
    };
    const response = await fetch(`${url}?${urlParams}`, options);
    if (response.ok) {
      const newUser = await response.json();
      return newUser;
    } else {
      return Promise.reject(response.status);
    }
  }
);

export const login = createAsyncThunk("auth/signIn", async (data) => {
  const url = `${config.LOGIN}?username=${data.userName}&password=${data.password}`;
  const response = await fetch(`${url}`);
  if (response.ok) {
    const signInUser = await response.json();
    return signInUser;
  } else {
    return Promise.reject(response.status);
  }
});

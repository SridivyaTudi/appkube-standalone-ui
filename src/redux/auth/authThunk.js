import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "./../../views/auth-views/config";

export const signUpUserAPI = createAsyncThunk(
  "auth/signUp",
  async (userData) => {
    const url = config.SIGN_UP;
    let formdata = new FormData();
    formdata.append("obj", JSON.stringify(userData));
    // formdata.append("file", null);
    // formdata.append("obj", userData);
    // formdata.append("file", null);
    const options = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    const response = await fetch(`${url}`, options);
    if (response.ok) {
      const newUser = await response.json();
      return { newUser };
    } else {
      return Promise.reject(response.status);
    }
  }
);

export const signInUserAPI = createAsyncThunk("auth/signIn", async (data) => {
  const url = `${config.LOGIN}?username=${data.email}&password=${data.password}`;
  const response = await fetch(`${url}`);
  if (response.ok) {
    const signInUser = await response.json();
    return { signInUser };
  } else {
    return Promise.reject(response.status);
  }
});

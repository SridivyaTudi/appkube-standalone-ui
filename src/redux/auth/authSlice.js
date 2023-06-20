import { createSlice } from "@reduxjs/toolkit";
import { signUpUserAPI, signInUserAPI } from "./authThunk";
import status from "../constants/commonDS";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signUpUser: {
      status: null,
    },
    signInUser: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: {
    [signUpUserAPI.pending]: (state, action) => {
      return {
        ...state,
        signUpUser: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [signUpUserAPI.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        signUpUser: {
          status: status.SUCCESS,
          data: payload?.signUpUser,
        },
      };
    },
    [signUpUserAPI.rejected]: (state, { payload }) => {
      return {
        ...state,
        signUpUser: {
          status: status.FAILURE,
        },
      };
    },
    [signInUserAPI.pending]: (state, action) => {
      return {
        ...state,
        signInUser: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [signInUserAPI.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        signInUser: {
          status: status.SUCCESS,
          data: payload?.signInUser,
        },
      };
    },
    [signInUserAPI.rejected]: (state, { payload }) => {
      return {
        ...state,
        signInUser: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  sentEmailToCompanyAdmin,
  authMFACode,
} from "Redux/Auth/AuthThunk";
import status from "Redux/Constants/CommonDS";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signUpUser: {
      status: null,
    },
    loggedInUser: {
      status: null,
    },
    forgotPwd: {
      status: null,
      data: {},
    },
    resetPwd: {
      status: null,
    },
    sentEmailToAdmin: {
      status: null,
      data: {},
    },
    mfaAuth: {
      status: null,
      data: "",
    },
  },
  reducers: {},
  extraReducers: {
    [signUp.pending]: (state, action) => {
      return {
        ...state,
        signUpUser: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [signUp.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        signUpUser: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [signUp.rejected]: (state, { payload }) => {
      return {
        ...state,
        signUpUser: {
          status: status.FAILURE,
        },
      };
    },

    [login.pending]: (state, action) => {
      return {
        ...state,
        loggedInUser: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [login.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loggedInUser: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [login.rejected]: (state, { payload }) => {
      return {
        ...state,
        loggedInUser: {
          status: status.FAILURE,
        },
      };
    },

    [forgotPassword.pending]: (state, action) => {
      return {
        ...state,
        forgotPwd: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        forgotPwd: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      return {
        ...state,
        forgotPwd: {
          status: status.FAILURE,
          data: payload,
        },
      };
    },

    [resetPassword.pending]: (state, action) => {
      return {
        ...state,
        resetPwd: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        resetPwd: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [resetPassword.rejected]: (state, { payload }) => {
      return {
        ...state,
        resetPwd: {
          status: status.FAILURE,
        },
      };
    },

    [sentEmailToCompanyAdmin.pending]: (state, action) => {
      return {
        ...state,
        sentEmailToAdmin: {
          status: status.IN_PROGRESS,
          data: {},
        },
      };
    },
    [sentEmailToCompanyAdmin.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        sentEmailToAdmin: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [sentEmailToCompanyAdmin.rejected]: (state, { payload }) => {
      return {
        ...state,
        sentEmailToAdmin: {
          status: status.FAILURE,
          data: payload,
        },
      };
    },

    [authMFACode.pending]: (state) => {
      return {
        ...state,
        mfaAuth: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [authMFACode.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        mfaAuth: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [authMFACode.rejected]: (state) => {
      return {
        ...state,
        mfaAuth: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default authSlice.reducer;

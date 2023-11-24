import { createSlice } from "@reduxjs/toolkit";
import status from "Redux/Constants/CommonDS";
import {
  getMFACode,
  authMFACode,
  createRole,
  createGroup,
} from "./SettingsThunk";

export const settingsSlice = createSlice({
  name: "getMFACode",
  initialState: {
    MFACode: {
      status: null,
      data: {},
    },
    mfaAuth: {
      status: null,
      data: {},
    },
    roleCreation: {
      status: null,
      data: {},
    },
    groupCreation: {
      status: null,
      data: {},
    },
  },
  reducers: {},
  extraReducers: {
    [getMFACode.pending]: (state) => {
      return {
        ...state,
        MFACode: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getMFACode.fulfilled]: (state, action) => {
      return {
        ...state,
        MFACode: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getMFACode.rejected]: (state) => {
      return {
        ...state,
        MFACode: {
          status: status.FAILURE,
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

    [createRole.pending]: (state) => {
      return {
        ...state,
        roleCreation: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createRole.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        roleCreation: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [createRole.rejected]: (state) => {
      return {
        ...state,
        roleCreation: {
          status: status.FAILURE,
        },
      };
    },

    [createGroup.pending]: (state) => {
      return {
        ...state,
        groupCreation: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createGroup.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        groupCreation: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [createGroup.rejected]: (state) => {
      return {
        ...state,
        groupCreation: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default settingsSlice.reducer;

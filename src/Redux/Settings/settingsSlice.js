import { createSlice } from "@reduxjs/toolkit";
import status from "Redux/Constants/commonDS";
import { getMFACode, authMFACode } from "./settingsThunk";

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
  },
});

export default settingsSlice.reducer;

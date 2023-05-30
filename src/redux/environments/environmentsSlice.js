import { createSlice } from "@reduxjs/toolkit";
import { getEnvsAsync, getEnvsSummary } from "./environmentsThunk";
import status from "../constants/commonDS";

export const environmentSlice = createSlice({
  name: "environments",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getEnvsAsync.pending]: (state, action) => {
      return {
        ...state,
        allEnvs: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getEnvsAsync.fulfilled]: (state, action) => {
      return {
        ...state,
        allEnvs: {
          status: status.SUCCESS,
          data: action.payload.allEnvs,
        },
      };
    },
    [getEnvsAsync.rejected]: (state, action) => {
      return {
        ...state,
        allEnvs: {
          status: status.FAILURE,
        },
      };
    },
    [getEnvsSummary.pending]: (state, action) => {
      return {
        ...state,
        envSummary: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getEnvsSummary.fulfilled]: (state, action) => {
      return {
        ...state,
        envSummary: {
          status: status.SUCCESS,
          data: action.payload.envSummary,
        },
      };
    },
    [getEnvsSummary.rejected]: (state, action) => {
      return {
        ...state,
        envSummary: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default environmentSlice.reducer;

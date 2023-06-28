import { createSlice } from "@reduxjs/toolkit";
import {
  getEnvsAsync,
  getEnvsSummary,
  getDepartmentsOrgWise,
  getProductsByDepId,
} from "redux/assetManager/environments/environmentsThunk";
import status from "redux/constants/commonDS";

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
          data: action?.payload?.allEnvs,
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
          data: action?.payload?.envSummary,
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
    [getDepartmentsOrgWise.pending]: (state, action) => {
      return {
        ...state,
        departmentsFilters: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getDepartmentsOrgWise.fulfilled]: (state, action) => {
      return {
        ...state,
        departmentsFilters: {
          status: status.SUCCESS,
          data: action?.payload,
        },
      };
    },
    [getDepartmentsOrgWise.rejected]: (state, action) => {
      return {
        ...state,
        departmentsFilters: {
          status: status.FAILURE,
        },
      };
    },
    [getProductsByDepId.pending]: (state, action) => {
      return {
        ...state,
        productsByDepId: { status: status.IN_PROGRESS },
      };
    },
    [getProductsByDepId.fulfilled]: (state, action) => {
      return {
        ...state,
        productsByDepId: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getProductsByDepId.rejected]: (state, action) => {
      return {
        ...state,
        productsByDepId: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default environmentSlice.reducer;

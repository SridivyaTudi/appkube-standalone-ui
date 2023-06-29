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
  initialState: {
    allEnvs:{
      status: null
    },
    envSummary: {
      status: null
    },
    departmentsFilters:{
      status: null
    }
  },
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
    [getEnvsAsync.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        allEnvs: {
          status: status.SUCCESS,
          data: payload,
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
    [getEnvsSummary.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        envSummary: {
          status: status.SUCCESS,
          data:payload
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
    [getDepartmentsOrgWise.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        departmentsFilters: {
          status: status.SUCCESS,
          data: payload,
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
    [getProductsByDepId.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        productsByDepId: {
          status: status.SUCCESS,
          data: payload,
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

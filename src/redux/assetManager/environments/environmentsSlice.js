import { createSlice } from "@reduxjs/toolkit";
import {
  getEnvsAsync,
  getEnvsSummary,
  getOrgWiseDepartments,
  getProductsByDepId,
  getDeploymentEnvs,
  getEnvsByFilters
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
    organizationWiseDepartments:{
      status: null
    },
    productsByDepId: {
      status: null,
      data:[]
    },
    deploymentEnvs: {
      status: null,
      data:[]
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
    [getOrgWiseDepartments.pending]: (state, action) => {
      return {
        ...state,
        organizationWiseDepartments: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getOrgWiseDepartments.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        organizationWiseDepartments: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getOrgWiseDepartments.rejected]: (state, action) => {
      return {
        ...state,
        organizationWiseDepartments: {
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
      let { products,depId} = payload
      return {
        ...state,
        productsByDepId: {
          status: status.SUCCESS,
          data: {products ,depId },
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

    [getDeploymentEnvs.pending]: (state, action) => {
      return {
        ...state,
        deploymentEnvs: { status: status.IN_PROGRESS },
      };
    },
    [getDeploymentEnvs.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        deploymentEnvs: {
          status: status.SUCCESS,
          data: payload
        },
      };
    },
    [getDeploymentEnvs.rejected]: (state, action) => {
      return {
        ...state,
        deploymentEnvs: {
          status: status.FAILURE,
        },
      };
    },

    [getEnvsByFilters.pending]: (state, action) => {
      return {
        ...state,
        envSummary: { status: status.IN_PROGRESS },
      };
    },
    [getEnvsByFilters.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        envSummary: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getEnvsByFilters.rejected]: (state, action) => {
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

import { createSlice } from "@reduxjs/toolkit";
import {
  getEnvironmentCount,
  getEnvsSummary,
  getOrgWiseDepartments,
  getProductsByDepId,
  getDeploymentEnvs,
} from "redux/Environments/environmentsThunk";
import status from "redux/Constants/commonDS";

export const environmentSlice = createSlice({
  name: "environments",
  initialState: {
    environmentCountData: {
      status: null,
      data: [],
    },
    envSummary: {
      status: null,
      data: [],
    },
    organizationWiseDepartments: {
      status: null,
    },
    productsByDepId: {
      status: null,
      data: [],
    },
    deploymentEnvs: {
      status: null,
      data: [],
    },
  },
  reducers: {},
  extraReducers: {
    [getEnvironmentCount.pending]: (state, action) => {
      return {
        ...state,
        environmentCountData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getEnvironmentCount.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        environmentCountData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getEnvironmentCount.rejected]: (state, action) => {
      return {
        ...state,
        environmentCountData: {
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
    [getEnvsSummary.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        envSummary: {
          status: status.SUCCESS,
          data: payload,
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
    [getOrgWiseDepartments.fulfilled]: (state, { payload }) => {
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
    [getProductsByDepId.fulfilled]: (state, { payload }) => {
      let { products, depId } = payload;
      return {
        ...state,
        productsByDepId: {
          status: status.SUCCESS,
          data: { products, depId },
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
    [getDeploymentEnvs.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        deploymentEnvs: {
          status: status.SUCCESS,
          data: payload,
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
  },
});

export default environmentSlice.reducer;

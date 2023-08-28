import { createSlice } from "@reduxjs/toolkit";
import {
  getEnvironmentDataByLandingZone,
  getDepartments,
  getSingleEnvironmentCountData,
  GetInfraTopologyCloudElementList,
  getInfraTopologyCategoryWiseViewData,
  getInfraTopologyDbCategories,
  getInfraTopologyLambdaTableData,
} from "Redux/EnvironmentData/EnvironmentDataThunk";
import status from "Redux/Constants/CommonDS";

export const environmentDataSlice = createSlice({
  name: "environmentData",
  initialState: {
    envDataByLandingZone: {
      status: null,
      data: {},
    },
    departments: {
      status: null,
      data: [],
    },
    singleEnvironmentCountData: {
      status: null,
      data: [],
    },
    infraTopologyCloudElementList: {
      status: null,
      data: {},
    },
    infraTopologyCategoryWiseData: {
      status: null,
      data: {},
    },
    infraTopologyDbCategories: {
      status: null,
      data: {},
    },
    infraTopologyLambdaTable: {
      status: null,
      data: {},
    },
  },

  extraReducers: {
    [getEnvironmentDataByLandingZone.pending]: (state, action) => {
      return {
        ...state,
        envDataByLandingZone: {
          status: status.IN_PROGRESS,
        },
      };
    },

    [getEnvironmentDataByLandingZone.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        envDataByLandingZone: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },

    [getEnvironmentDataByLandingZone.rejected]: (state, action) => {
      return {
        ...state,
        envDataByLandingZone: {
          status: status.FAILURE,
        },
      };
    },

    [getDepartments.pending]: (state, action) => {
      return {
        ...state,
        departments: {
          status: status.IN_PROGRESS,
        },
      };
    },

    [getDepartments.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        departments: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },

    [getDepartments.rejected]: (state, action) => {
      return {
        ...state,
        departments: {
          status: status.FAILURE,
        },
      };
    },

    [getSingleEnvironmentCountData.pending]: (state) => {
      return {
        ...state,
        singleEnvironmentCountData: {
          status: status.initialState,
        },
      };
    },
    [getSingleEnvironmentCountData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        singleEnvironmentCountData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getSingleEnvironmentCountData.rejected]: (state) => {
      return {
        ...state,
        singleEnvironmentCountData: {
          status: status.FAILURE,
        },
      };
    },

    [GetInfraTopologyCloudElementList.pending]: (state) => {
      return {
        ...state,
        infraTopologyCloudElementList: {
          status: status.initialState,
        },
      };
    },
    [GetInfraTopologyCloudElementList.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        infraTopologyCloudElementList: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [GetInfraTopologyCloudElementList.rejected]: (state) => {
      return {
        ...state,
        infraTopologyCloudElementList: {
          status: status.FAILURE,
        },
      };
    },

    [getInfraTopologyCategoryWiseViewData.pending]: (state) => {
      return {
        ...state,
        infraTopologyCategoryWiseData: {
          status: status.initialState,
        },
      };
    },
    [getInfraTopologyCategoryWiseViewData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        infraTopologyCategoryWiseData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getInfraTopologyCategoryWiseViewData.rejected]: (state) => {
      return {
        ...state,
        infraTopologyCategoryWiseData: {
          status: status.FAILURE,
        },
      };
    },

    [getInfraTopologyDbCategories.pending]: (state) => {
      return {
        ...state,
        infraTopologyDbCategories: {
          status: status.initialState,
        },
      };
    },
    [getInfraTopologyDbCategories.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        infraTopologyDbCategories: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getInfraTopologyDbCategories.rejected]: (state) => {
      return {
        ...state,
        infraTopologyDbCategories: {
          status: status.FAILURE,
        },
      };
    },

    [getInfraTopologyLambdaTableData.pending]: (state) => {
      return {
        ...state,
        infraTopologyLambdaTable: {
          status: status.initialState,
        },
      };
    },
    [getInfraTopologyLambdaTableData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        infraTopologyLambdaTable: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getInfraTopologyLambdaTableData.rejected]: (state) => {
      return {
        ...state,
        infraTopologyLambdaTable: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default environmentDataSlice.reducer;

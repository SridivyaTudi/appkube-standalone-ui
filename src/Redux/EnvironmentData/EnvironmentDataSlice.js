import { createSlice } from "@reduxjs/toolkit";
import {
  getEnvironmentDataByLandingZone,
  getDepartments,
  getSingleEnvironmentCountData,
  GetInfraTopologyCloudElementList,
  getInfraTopologyCategoryWiseViewData,
  getInfraTopologyDbCategories,
  getInfraTopologyLambdaTableData,
  getGlobalServiceCategoryWiseSummary,
  getGlobalServiceCloudElements,
  getEnvironmentsApplicationTableData,
  getViewServiceData,
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
    globalServiceData: {
      status: null,
      data: [],
    },
    globalServicesCloudElements: {
      status: null,
      data: [],
    },
    applicationsTableData: {
      status: null,
      data: [],
    },
    viewServiceData: {
      status: null,
      data: [],
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
          status: status.IN_PROGRESS,
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
          status: status.IN_PROGRESS,
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
          status: status.IN_PROGRESS,
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
          status: status.IN_PROGRESS,
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
          status: status.IN_PROGRESS,
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

    [getGlobalServiceCategoryWiseSummary.pending]: (state) => {
      return {
        ...state,
        globalServiceData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getGlobalServiceCategoryWiseSummary.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        globalServiceData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getGlobalServiceCategoryWiseSummary.rejected]: (state) => {
      return {
        ...state,
        globalServiceData: {
          status: status.FAILURE,
        },
      };
    },

    [getGlobalServiceCloudElements.pending]: (state) => {
      return {
        ...state,
        globalServicesCloudElements: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getGlobalServiceCloudElements.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        globalServicesCloudElements: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getGlobalServiceCloudElements.rejected]: (state) => {
      return {
        ...state,
        globalServicesCloudElements: {
          status: status.FAILURE,
        },
      };
    },

    [getEnvironmentsApplicationTableData.pending]: (state) => {
      return {
        ...state,
        applicationsTableData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getEnvironmentsApplicationTableData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        applicationsTableData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getEnvironmentsApplicationTableData.rejected]: (state) => {
      return {
        ...state,
        applicationsTableData: {
          status: status.FAILURE,
        },
      };
    },

    [getViewServiceData.pending]: (state) => {
      return {
        ...state,
        viewServiceData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getViewServiceData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        viewServiceData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getViewServiceData.rejected]: (state) => {
      return {
        ...state,
        viewServiceData: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default environmentDataSlice.reducer;

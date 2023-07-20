import { createSlice } from "@reduxjs/toolkit";
import {
  getEnvironmentDataByLandingZone,
  getDepartments,
  getEnvironmentBoxesData,
} from "redux/EnvironmentData/environmentDataThunk";
import status from "redux/Constants/commonDS";

export const environmentDataSlice = createSlice({
  name: "environmentData",
  initialState: {
    envDataByLandingZone: {
      status: null,
      data: {},
    },
    allEnv: {
      status: null,
      data: [],
    },
    departments: {
      status: null,
      data: [],
    },
    environmentBoxesData: {
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

    [getEnvironmentBoxesData.pending]: (state) => {
      return {
        ...state,
        environmentBoxesData: {
          status: status.initialState,
        },
      };
    },
    [getEnvironmentBoxesData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        environmentBoxesData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getEnvironmentBoxesData.rejected]: (state) => {
      return {
        ...state,
        environmentBoxesData: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default environmentDataSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getEnvironmentDataByLandingZone,getEnvironments,getDepartments } from "redux/assetManager/environments/environmentData/environmentDataThunk";
import status from "redux/constants/commonDS";

export const environmentDataSlice = createSlice({
  name: "environmentData",
  initialState: {
    envDataByLandingZone:{
      status: null,
      data:{}
    },
    allEnv:{
      status: null,
      data:[]
    },
    departments:{
      status: null,
      data:[]
    }
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

    [getEnvironmentDataByLandingZone.fulfilled]: (state, {payload}) => {
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

    [getEnvironments.pending]: (state, action) => {
      return {
        ...state,
        allEnv: {
          status: status.IN_PROGRESS,
        },
      };
    },

    [getEnvironments.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        allEnv: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },

    [getEnvironments.rejected]: (state, action) => {
      return {
        ...state,
        allEnv: {
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

    [getDepartments.fulfilled]: (state, {payload}) => {
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
  },
});

export default environmentDataSlice.reducer;

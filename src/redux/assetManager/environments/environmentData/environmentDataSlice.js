import { createSlice } from "@reduxjs/toolkit";
import { getEnvironmentVpcs,getEnvironments,getDepartments } from "redux/assetManager/environments/environmentData/environmentDataThunk";
import status from "redux/constants/commonDS";

export const environmentDataSlice = createSlice({
  name: "environmentData",
  initialState: {
    allVpcs:{
      status: null,
      data:[]
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
    [getEnvironmentVpcs.pending]: (state, action) => {
      return {
        ...state,
        allVpcs: {
          status: status.IN_PROGRESS,
        },
      };
    },

    [getEnvironmentVpcs.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        allVpcs: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },

    [getEnvironmentVpcs.rejected]: (state, action) => {
      return {
        ...state,
        allVpcs: {
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

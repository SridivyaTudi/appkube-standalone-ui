import { createSlice } from "@reduxjs/toolkit";
import status from "Redux/Constants/CommonDS";
import {
  createNewOU,
  addCloudEnv,
  addLandingZone,
} from "Redux/NewAccountSetup/NewAccountSetupThunk";

export const organizationalUnitSlice = createSlice({
  name: "organizationalUnit",
  initialState: {
    createOu: {
      status: null,
      data: {},
    },
    organizationalUnit: {
      status: null,
      data: {},
    },
    addCloudEnvState: {
      status: null,
    },
    addLandingZoneState: {
      status: null,
    }
  },
  reducers: {},
  extraReducers: {
    [createNewOU.pending]: (state) => {
      return {
        ...state,
        createOu: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createNewOU.fulfilled]: (state, action) => {
      return {
        ...state,
        createOu: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [createNewOU.rejected]: (state) => {
      return {
        ...state,
        createOu: {
          status: status.FAILURE,
        },
      };
    },
    [addCloudEnv.pending]: (state) => {
      return {
        ...state,
        addCloudEnvState: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [addCloudEnv.fulfilled]: (state) => {
      return {
        ...state,
        addCloudEnvState: {
          status: status.SUCCESS,
        },
      };
    },
    [addCloudEnv.rejected]: (state) => {
      return {
        ...state,
        addCloudEnvState: {
          status: status.FAILURE,
        },
      };
    },
    [addLandingZone.pending]: (state) => {
      return {
        ...state,
        addLandingZoneState: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [addLandingZone.fulfilled]: (state) => {
      return {
        ...state,
        addLandingZoneState: {
          status: status.SUCCESS,
        },
      };
    },
    [addLandingZone.rejected]: (state) => {
      return {
        ...state,
        addLandingZoneState: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default organizationalUnitSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getDiscoveredAssets,
  getAwsRegions,getEventsHistory
} from "Redux/DiscoveredAssets/DiscoveredAssetsThunk";
import status from "Redux/Constants/CommonDS";

export const DiscoveredAssetsSlice = createSlice({
  name: "discoveredAssets",
  initialState: {
    discoveredAssetsData: {
      status: null,
      data: [],
    },
    awsRegionsData: {
      status: null,
      data: [],
    },
    eventHistoryData: {
      status: null,
      data: [],
    },
  },

  extraReducers: {
    [getDiscoveredAssets.pending]: (state, action) => {
      return {
        ...state,
        discoveredAssetsData: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getDiscoveredAssets.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        discoveredAssetsData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getDiscoveredAssets.rejected]: (state, { error }) => {
      return {
        ...state,
        discoveredAssetsData: {
          status: status.FAILURE,
          data: error?.message,
        },
      };
    },

    [getAwsRegions.pending]: (state, action) => {
      return {
        ...state,
        awsRegionsData: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getAwsRegions.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        awsRegionsData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getAwsRegions.rejected]: (state, { error }) => {
      return {
        ...state,
        awsRegionsData: {
          status: status.FAILURE,
          data: error?.message,
        },
      };
    },

    [getEventsHistory.pending]: (state, action) => {
      return {
        ...state,
        eventHistoryData: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getEventsHistory.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        eventHistoryData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getEventsHistory.rejected]: (state, { error }) => {
      return {
        ...state,
        eventHistoryData: {
          status: status.FAILURE,
          data: error?.message,
        },
      };
    },

  },
});

export default DiscoveredAssetsSlice.reducer;

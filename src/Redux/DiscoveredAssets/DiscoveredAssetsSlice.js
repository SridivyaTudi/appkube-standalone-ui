import { createSlice } from "@reduxjs/toolkit";
import { getDiscoveredAssets } from "Redux/DiscoveredAssets/DiscoveredAssetsThunk";
import status from "Redux/Constants/CommonDS";

export const DiscoveredAssetsSlice = createSlice({
  name: "discoveredAssets",
  initialState: {
    discoveredAssetsData: {
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
  },
});

export default DiscoveredAssetsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentHourSpendRate,
  getCurrentDaySpendRate,
} from "redux/assetManager/dashboard/dashboardThunk";
import status from "redux/constants/commonDS";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    currentHourSpendRate: {
      status: null,
      data: [],
    },
    currentDaySpendRate: {
      status: null,
      data: [],
    },
  },
  reducers: {},
  extraReducers: {
    [getCurrentHourSpendRate.pending]: (state, action) => {
      return {
        ...state,
        currentHourSpendRate: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getCurrentHourSpendRate.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        currentHourSpendRate: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getCurrentHourSpendRate.rejected]: (state, action) => {
      return {
        ...state,
        currentHourSpendRate: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getCurrentDaySpendRate.pending]: (state, action) => {
      return {
        ...state,
        currentDaySpendRate: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getCurrentDaySpendRate.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        currentDaySpendRate: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getCurrentDaySpendRate.rejected]: (state, action) => {
      return {
        ...state,
        currentDaySpendRate: {
          status: status.FAILURE,
          data: [],
        },
      };
    },
  },
});

export default dashboardSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getCurrentHourSpendRate } from "redux/assetManager/dashboard/dashboardThunk";
import status from "redux/constants/commonDS";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    currentHourSpendRate: {
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
        },
      };
    },
  },
});

export default dashboardSlice.reducer;

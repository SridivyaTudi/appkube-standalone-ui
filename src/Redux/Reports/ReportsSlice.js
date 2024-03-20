import { createSlice } from "@reduxjs/toolkit";
import { getSpendOverview } from "Redux/Reports/ReportsThunk";
import status from "Redux/Constants/CommonDS";

export const ReportsSlice = createSlice({
  name: "Reports",
  initialState: {
    spendOverviewData: {
      status: null,
      data: [],
    },
  },
  extraReducers: {
    [getSpendOverview.pending]: (state) => {
      return {
        ...state,
        spendOverviewData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getSpendOverview.fulfilled]: (state, action) => {
      return {
        ...state,
        spendOverviewData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getSpendOverview.rejected]: (state) => {
      return {
        ...state,
        spendOverviewData: {
          status: status.FAILURE,
        },
      };
    },

  },
});
export const { setProductIntoDepartment } = ReportsSlice.actions;
export default ReportsSlice.reducer;

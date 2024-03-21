import { createSlice } from "@reduxjs/toolkit";
import {
  getSpendOverview,
  getTopUsedService,
  getPotentialSavings,
  getCostTopAccounts,
  getSpendingTrend,
} from "Redux/Reports/ReportsThunk";
import status from "Redux/Constants/CommonDS";

export const ReportsSlice = createSlice({
  name: "Reports",
  initialState: {
    spendOverviewData: {
      status: null,
      data: [],
    },
    topUsedServiceData: {
      status: null,
      data: [],
    },
    potentialSavingsData: {
      status: null,
      data: [],
    },
    costTopAccountsData: {
      status: null,
      data: [],
    },
    spendingTrendData: {
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

    [getTopUsedService.pending]: (state) => {
      return {
        ...state,
        topUsedServiceData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getTopUsedService.fulfilled]: (state, action) => {
      return {
        ...state,
        topUsedServiceData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getTopUsedService.rejected]: (state) => {
      return {
        ...state,
        topUsedServiceData: {
          status: status.FAILURE,
        },
      };
    },

    [getPotentialSavings.pending]: (state) => {
      return {
        ...state,
        potentialSavingsData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getPotentialSavings.fulfilled]: (state, action) => {
      return {
        ...state,
        potentialSavingsData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getPotentialSavings.rejected]: (state) => {
      return {
        ...state,
        potentialSavingsData: {
          status: status.FAILURE,
        },
      };
    },

    [getCostTopAccounts.pending]: (state) => {
      return {
        ...state,
        costTopAccountsData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getCostTopAccounts.fulfilled]: (state, action) => {
      return {
        ...state,
        costTopAccountsData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getCostTopAccounts.rejected]: (state) => {
      return {
        ...state,
        costTopAccountsData: {
          status: status.FAILURE,
        },
      };
    },

    [getSpendingTrend.pending]: (state) => {
      return {
        ...state,
        spendingTrendData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getSpendingTrend.fulfilled]: (state, action) => {
      return {
        ...state,
        spendingTrendData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getSpendingTrend.rejected]: (state) => {
      return {
        ...state,
        spendingTrendData: {
          status: status.FAILURE,
        },
      };
    },
  },
});
export const { setProductIntoDepartment } = ReportsSlice.actions;
export default ReportsSlice.reducer;

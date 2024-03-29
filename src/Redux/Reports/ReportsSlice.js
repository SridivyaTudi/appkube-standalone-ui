import { createSlice } from "@reduxjs/toolkit";
import {
  getSpendOverview,
  getSpendOverviewComputeDetails,
  getTopUsedService,
  getPotentialSavings,
  getCostTopAccounts,
  getSpendingTrend,
  getTopUsedServiceDetails,
  getComputeSummary,
  getPotentialTotalSaving,
  getPotentialMonthlySaving,
  getTopRiRecommendations,
  getElementSummary,
  getElementDetails,
  getCostTopAccountsDetails,
  getCostTopAccountsByAccountId,
} from "Redux/Reports/ReportsThunk";
import status from "Redux/Constants/CommonDS";

export const ReportsSlice = createSlice({
  name: "Reports",
  initialState: {
    spendOverviewData: {
      status: null,
      data: [],
    },
    spendOverviewComputeDetailsData: {
      status: null,
      data: [],
    },
    topUsedServiceData: {
      status: null,
      data: [],
    },
    topUsedServiceDetailsData: {
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
    computeSummaryData: {
      status: null,
      data: [],
    },
    potentialTotalSavingData: {
      status: null,
      data: [],
    },
    potentialMonthlySavingData: {
      status: null,
      data: [],
    },
    topRiRecommendationsData: {
      status: null,
      data: [],
    },
    elementSummaryData: {
      status: null,
      data: [],
    },
    elementDetailsData: {
      status: null,
      data: [],
    },
    costTopAccountsDetailList: {
      status: "",
      data: [],
    },
    topAccountsById: {
      status: "",
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

    [getSpendOverviewComputeDetails.pending]: (state) => {
      return {
        ...state,
        spendOverviewComputeDetailsData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getSpendOverviewComputeDetails.fulfilled]: (state, action) => {
      return {
        ...state,
        spendOverviewComputeDetailsData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getSpendOverviewComputeDetails.rejected]: (state) => {
      return {
        ...state,
        spendOverviewComputeDetailsData: {
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

    [getTopUsedServiceDetails.pending]: (state) => {
      return {
        ...state,
        topUsedServiceDetailsData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getTopUsedServiceDetails.fulfilled]: (state, action) => {
      return {
        ...state,
        topUsedServiceDetailsData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getTopUsedServiceDetails.rejected]: (state) => {
      return {
        ...state,
        topUsedServiceDetailsData: {
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

    [getComputeSummary.pending]: (state) => {
      return {
        ...state,
        computeSummaryData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getComputeSummary.fulfilled]: (state, action) => {
      return {
        ...state,
        computeSummaryData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getComputeSummary.rejected]: (state) => {
      return {
        ...state,
        computeSummaryData: {
          status: status.FAILURE,
        },
      };
    },

    [getPotentialTotalSaving.pending]: (state) => {
      return {
        ...state,
        potentialTotalSavingData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getPotentialTotalSaving.fulfilled]: (state, action) => {
      return {
        ...state,
        potentialTotalSavingData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getPotentialTotalSaving.rejected]: (state) => {
      return {
        ...state,
        potentialTotalSavingData: {
          status: status.FAILURE,
        },
      };
    },

    [getPotentialMonthlySaving.pending]: (state) => {
      return {
        ...state,
        potentialMonthlySavingData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getPotentialMonthlySaving.fulfilled]: (state, action) => {
      return {
        ...state,
        potentialMonthlySavingData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getPotentialMonthlySaving.rejected]: (state) => {
      return {
        ...state,
        potentialMonthlySavingData: {
          status: status.FAILURE,
        },
      };
    },

    [getTopRiRecommendations.pending]: (state) => {
      return {
        ...state,
        topRiRecommendationsData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getTopRiRecommendations.fulfilled]: (state, action) => {
      return {
        ...state,
        topRiRecommendationsData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getTopRiRecommendations.rejected]: (state) => {
      return {
        ...state,
        topRiRecommendationsData: {
          status: status.FAILURE,
        },
      };
    },

    [getElementSummary.pending]: (state) => {
      return {
        ...state,
        elementSummaryData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getElementSummary.fulfilled]: (state, action) => {
      return {
        ...state,
        elementSummaryData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getElementSummary.rejected]: (state) => {
      return {
        ...state,
        elementSummaryData: {
          status: status.FAILURE,
        },
      };
    },

    [getElementDetails.pending]: (state) => {
      return {
        ...state,
        elementDetailsData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getElementDetails.fulfilled]: (state, action) => {
      return {
        ...state,
        elementDetailsData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getElementDetails.rejected]: (state) => {
      return {
        ...state,
        elementDetailsData: {
          status: status.FAILURE,
        },
      };
    },

    [getCostTopAccountsDetails.pending]: (state) => {
      return {
        ...state,
        costTopAccountsDetailList: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getCostTopAccountsDetails.fulfilled]: (state, action) => {
      return {
        ...state,
        costTopAccountsDetailList: {
          status: status.SUCCESS,
          data: action.payload?.data || [],
        },
      };
    },
    [getCostTopAccountsDetails.rejected]: (state) => {
      return {
        ...state,
        costTopAccountsDetailList: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getCostTopAccountsByAccountId.pending]: (state) => {
      return {
        ...state,
        topAccountsById: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getCostTopAccountsByAccountId.fulfilled]: (state, action) => {
      return {
        ...state,
        topAccountsById: {
          status: status.SUCCESS,
          data: action.payload?.data || [],
        },
      };
    },
    [getCostTopAccountsByAccountId.rejected]: (state) => {
      return {
        ...state,
        topAccountsById: {
          status: status.FAILURE,
          data: [],
        },
      };
    },
  },
});
export const { setProductIntoDepartment } = ReportsSlice.actions;
export default ReportsSlice.reducer;

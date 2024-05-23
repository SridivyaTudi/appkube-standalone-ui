import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentHourSpendRate,
  getCurrentDaySpendRate,
  getTodaySpendAnalytics,
  getYesterdaySpendAnalytics,
  getTotalSpend,
  getTotalCloudWiseSpend,
  getMonthlyCloudWiseSpend,
  getTotalBudget,
  getMonthlyStatistics,
  getProductWiseCost,
  getProductionVsOther,
  getServiceTypeWiseCost,
  getSlaMetrics,
  getProcessCentral,
} from "Redux/Dashboard/DashboardThunk";
import status from "Redux/Constants/CommonDS";

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
    todaySpendAnalytics: {
      status: null,
      data: {},
    },
    yesterdaySpendAnalytics: {
      status: null,
      data: {},
    },
    totalSpend: {
      status: null,
      data: [],
    },
    totalCloudWiseSpend: {
      status: null,
      data: [],
    },
    monthlyCloudWiseSpend: {
      status: null,
      data: [],
    },
    totalBudget: {
      status: null,
      data: {},
    },
    monthlyStatistics: {
      status: null,
      data: [],
    },
    productWiseCost: {
      status: null,
      data: [],
    },
    productionVsOther: {
      status: null,
      data: [],
    },
    serviceTypeWiseCost: {
      status: null,
      data: [],
    },
    slaMetrics: {
      status: null,
      data: [],
    },
    processCentral: {
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

    [getTodaySpendAnalytics.pending]: (state, action) => {
      return {
        ...state,
        todaySpendAnalytics: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getTodaySpendAnalytics.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        todaySpendAnalytics: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getTodaySpendAnalytics.rejected]: (state, action) => {
      return {
        ...state,
        todaySpendAnalytics: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getYesterdaySpendAnalytics.pending]: (state, action) => {
      return {
        ...state,
        yesterdaySpendAnalytics: {
          status: status.IN_PROGRESS,
          data: {},
        },
      };
    },
    [getYesterdaySpendAnalytics.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        yesterdaySpendAnalytics: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getYesterdaySpendAnalytics.rejected]: (state, action) => {
      return {
        ...state,
        yesterdaySpendAnalytics: {
          status: status.FAILURE,
          data: {},
        },
      };
    },

    [getTotalSpend.pending]: (state, action) => {
      return {
        ...state,
        totalSpend: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getTotalSpend.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        totalSpend: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getTotalSpend.rejected]: (state, action) => {
      return {
        ...state,
        totalSpend: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getTotalCloudWiseSpend.pending]: (state, action) => {
      return {
        ...state,
        totalCloudWiseSpend: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getTotalCloudWiseSpend.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        totalCloudWiseSpend: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getTotalCloudWiseSpend.rejected]: (state, action) => {
      return {
        ...state,
        totalCloudWiseSpend: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getMonthlyCloudWiseSpend.pending]: (state, action) => {
      return {
        ...state,
        monthlyCloudWiseSpend: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getMonthlyCloudWiseSpend.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        monthlyCloudWiseSpend: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getMonthlyCloudWiseSpend.rejected]: (state, action) => {
      return {
        ...state,
        monthlyCloudWiseSpend: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getTotalBudget.pending]: (state, action) => {
      return {
        ...state,
        totalBudget: {
          status: status.IN_PROGRESS,
          data: {},
        },
      };
    },
    [getTotalBudget.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        totalBudget: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getTotalBudget.rejected]: (state, action) => {
      return {
        ...state,
        totalBudget: {
          status: status.FAILURE,
          data: {},
        },
      };
    },

    [getMonthlyStatistics.pending]: (state, action) => {
      return {
        ...state,
        monthlyStatistics: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getMonthlyStatistics.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        monthlyStatistics: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getMonthlyStatistics.rejected]: (state, action) => {
      return {
        ...state,
        monthlyStatistics: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getProductWiseCost.pending]: (state, action) => {
      return {
        ...state,
        productWiseCost: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getProductWiseCost.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        productWiseCost: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getProductWiseCost.rejected]: (state, action) => {
      return {
        ...state,
        productWiseCost: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getProductionVsOther.pending]: (state, action) => {
      return {
        ...state,
        productionVsOther: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getProductionVsOther.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        productionVsOther: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getProductionVsOther.rejected]: (state, action) => {
      return {
        ...state,
        productionVsOther: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getServiceTypeWiseCost.pending]: (state, action) => {
      return {
        ...state,
        serviceTypeWiseCost: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getServiceTypeWiseCost.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        serviceTypeWiseCost: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getServiceTypeWiseCost.rejected]: (state, action) => {
      return {
        ...state,
        serviceTypeWiseCost: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getSlaMetrics.pending]: (state, action) => {
      return {
        ...state,
        slaMetrics: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getSlaMetrics.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        slaMetrics: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getSlaMetrics.rejected]: (state, action) => {
      return {
        ...state,
        slaMetrics: {
          status: status.FAILURE,
          data: "",
        },
      };
    },

    [getProcessCentral.pending]: (state, action) => {
      return {
        ...state,
        processCentral: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getProcessCentral.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        processCentral: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getProcessCentral.rejected]: (state, action) => {
      return {
        ...state,
        processCentral: {
          status: status.FAILURE,
          data: [],
        },
      };
    },
  },
});

export default dashboardSlice.reducer;

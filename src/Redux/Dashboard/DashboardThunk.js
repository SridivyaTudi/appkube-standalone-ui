import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getCurrentHourSpendRate = createAsyncThunk(
  "dashboard/getCurrentHourSpendRate",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_CURRENT_HOUR_SPEND_RATE
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getCurrentDaySpendRate = createAsyncThunk(
  "dashboard/getCurrentDaySpendRate",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_CURRENT_DAY_SPEND_RATE
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getTodaySpendAnalytics = createAsyncThunk(
  "dashboard/getTodaySpendAnalytics",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_TODAY_SPEND_ANALYTICS
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getYesterdaySpendAnalytics = createAsyncThunk(
  "dashboard/getYesterdaySpendAnalytics",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_YESTERDAY_SPEND_ANALYTICS
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getTotalSpend = createAsyncThunk(
  "dashboard/getTotalSpend",
  async () => {
    try {
      const response = await postLoginService.get(config.GET_TOTAL_SPEND);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getTotalCloudWiseSpend = createAsyncThunk(
  "dashboard/getTotalCloudWiseSpend",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_TOTAL_CLOUD_WISE_SPEND
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getMonthlyCloudWiseSpend = createAsyncThunk(
  "dashboard/getMonthlyCloudWiseSpend",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_MONTHLY_CLOUD_WISE_SPEND
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getTotalBudget = createAsyncThunk(
  "dashboard/getTotalBudget",
  async () => {
    try {
      const response = await postLoginService.get(config.GET_TOTAL_BUDGET);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getMonthlyStatistics = createAsyncThunk(
  "dashboard/getMonthlyStatistics",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_MONTHLY_STATISTICS
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getProductWiseCost = createAsyncThunk(
  "dashboard/getProductWiseCost",
  async () => {
    try {
      const response = await postLoginService.get(config.PRODUCT_WISE_COST);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getProductionVsOther = createAsyncThunk(
  "dashboard/getProductionVsOther",
  async () => {
    try {
      const response = await postLoginService.get(config.PRODUCTION_VS_OTHERS);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getServiceTypeWiseCost = createAsyncThunk(
  "dashboard/getServiceTypeWiseCost",
  async () => {
    try {
      const response = await postLoginService.get(
        config.SERVICE_TYPE_WISE_COST
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getSlaMetrics = createAsyncThunk(
  "dashboard/getSlaMetrics",
  async () => {
    try {
      const response = await postLoginService.get(config.SLA_METRICS);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getProcessCentral = createAsyncThunk(
  "dashboard/getProcessCentral",
  async () => {
    try {
      const response = await postLoginService.get(config.PROCESS_CENTRAL);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

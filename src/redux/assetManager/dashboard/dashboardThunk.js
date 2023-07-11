import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";
import { postLoginService } from "services";

export const getCurrentHourSpendRate = createAsyncThunk(
  "dashboard/getCurrentHourSpendRate",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_CURRENT_HOUR_SPEND_RATE
      );
      return response;
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
    }
  }
);

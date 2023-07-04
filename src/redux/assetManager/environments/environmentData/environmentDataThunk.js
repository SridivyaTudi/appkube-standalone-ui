import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";
import axios from "services";

export const getEnvironmentVpcs = createAsyncThunk(
  "environmentData/getEnvironmentVpcs",
  async (params) => {
    const url = `${config.GET_ACCOUNT_SERVICES}?accountId=${accountId}`;
    try {
      const response = await axios.get(url, params);
      const vpcs = response.data;
      return vpcs;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEnvironments = createAsyncThunk(
  "environmentData/getEnvironments",
  async () => {
    const url = `${config.GET_ENVIRONMENTS}`;
    try {
      const response = await axios.get(url, params);
      const environments = response.data;
      return environments;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getDepartments = createAsyncThunk(
  "environmentData/getDepartments",
  async (params) => {
    const url = `${config.GET_DEPARTMENT_WISE_DATA}`;
    try {
      const response = await axios.get(url, params);
      const departments = response.data;
      return departments;
    } catch (error) {
      console.log(error);
    }
  }
);

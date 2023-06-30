import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";

export const getEnvironmentVpcs = createAsyncThunk(
  "environmentData/getEnvironmentVpcs",
  async (accountId) => {
    const url = `${config.GET_ACCOUNT_SERVICES}?accountId=${accountId}`
    const response = await fetch(`${url}`);
    if (response.ok) {
      const vpcs = await response.json();
      return vpcs;
    }
  }
);

export const getEnvironments= createAsyncThunk(
  "environmentData/getEnvironments",
  async (accountId) => {
    const url = `${config.GET_ENVIRONMENTS}`
    const response = await fetch(`${url}`);
    if (response.ok) {
      const environments = await response.json();
      return environments;
    }
  }
);

export const getDepartments= createAsyncThunk(
  "environmentData/getDepartments",
  async (accountId) => {
    const url = `${config.GET_DEPARTMENT_WISE_DATA}?associatedLandingZone=${accountId}`
    const response = await fetch(`${url}`);
    if (response.ok) {
      const departments = await response.json();
      return departments;
    }
  }
);
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
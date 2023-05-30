import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";

export const getEnvsAsync = createAsyncThunk(
  "environments/getEnvsAsync",
  async (orgId) => {
    const url = config.GET_ALL_ENVIRONMENT_COUNT.replace("#org-id#", orgId);
    const response = await fetch(`${url}`);
    if (response.ok) {
      const allEnvs = await response.json();
      return { allEnvs };
    }
  }
);

export const getEnvsSummary = createAsyncThunk(
  "environments/getEnvsSummary",
  async (orgId) => {
    const url = config.GET_ALL_ENVIRONMENT_SUMMARY.replace("#org-id#", orgId);
    const response = await fetch(`${url}`);
    if (response.ok) {
      const envSummary = await response.json();
      return { envSummary };
    }
  }
);

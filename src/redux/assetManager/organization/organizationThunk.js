import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../views/app-views/config";

export const organizationsAsyncThunk = createAsyncThunk(
  "organizations/getOrgsAsync",
  async () => {
    const response = await fetch(`${config.GET_ALL_ORGS}`);
    if (response.ok) {
      const allOrgs = await response.json();
      return allOrgs;
    }
  }
);

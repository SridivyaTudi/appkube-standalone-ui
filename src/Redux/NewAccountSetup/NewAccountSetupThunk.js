import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const createNewOU = createAsyncThunk(
  "organizationalUnitThunk/createNewOU",
  async (params) => {
    try {
      const response = await postLoginService.post(config.DEPARTMENTS, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addCloudEnv = createAsyncThunk(
  "organizationalUnitThunk/addCloudEnv",
  async (params) => {
    const url = config.ADD_CLOUD_ENV;
    try {
      const response = await postLoginService.post(url, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addLandingZone = createAsyncThunk(
  "organizationalUnitThunk/addLandingZone",
  async (params) => {
    const url = config.ADD_LANDING_ZONE;
    try {
      const response = await postLoginService.post(url, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

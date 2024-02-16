import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getEnvironmentCount = createAsyncThunk(
  "environments/getEnvironmentCount",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_ALL_ENVIRONMENT_COUNT
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEnvsSummary = createAsyncThunk(
  "environments/getEnvsSummary",
  async (params) => {
    try {
      const response = await postLoginService.get(
        config.GET_ALL_ENVIRONMENT_SUMMARY,
        { params }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrgWiseDepartments = createAsyncThunk(
  "environments/getOrgWiseDepartments",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_ALL_ORG_WISE_DEPARTMENTS
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductsByDepId = createAsyncThunk(
  "environments/getProductsByDepId",
  async (depId) => {
    const url = config.GET_ASSOCIATE_PRODUCT_LIST.replace(
      "#department-id#",
      depId
    );
    try {
      const response = await postLoginService.get(`${url}`);
      const products = response;
      return { products, depId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCloudWiseLandingZoneCount = createAsyncThunk(
  "environments/getCloudWiseLandingZoneCount",
  async (depId) => {
    const url = config.CLOUD_WISE_LANDINGZONE_COUNT;
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

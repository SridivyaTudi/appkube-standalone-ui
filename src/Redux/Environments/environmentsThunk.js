import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";
import { postLoginService } from "services";

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
    const url = config.GET_PRODUCTS_BY_DEPID.replace("#dep-id#", depId);
    try {
      const response = await postLoginService.get(`${url}`);
      const products = response;
      return { products, depId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getDeploymentEnvs = createAsyncThunk(
  "environments/getDeploymentEnvs",
  async () => {
    const url = config.GET_DEPLOYMENT_ENVIRONMENTS;
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";
import axios from "services";

export const getEnvsAsync = createAsyncThunk(
  "environments/getEnvsAsync",
  async (orgId) => {
    const url = config.GET_ALL_ENVIRONMENT_COUNT.replace("#org-id#", orgId);
    try {
      const response = await axios.get(`${url}`);
      const allEnvs = response.data;
      return allEnvs;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEnvsSummary = createAsyncThunk(
  "environments/getEnvsSummary",
  async (orgId) => {
    const url = config.GET_ALL_ENVIRONMENT_SUMMARY.replace("#org-id#", orgId);
    try {
      const response = await axios.get(`${url}`);
      const allEnvSummary = response.data;
      return allEnvSummary;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrgWiseDepartments = createAsyncThunk(
  "environments/getOrgWiseDepartments",
  async (orgId) => {
    const url = config.GET_ALL_ORG_WISE_DEPARTMENTS.replace("#org-id#", orgId);
    const response = await axios.get(`${url}`);
    try {
      const departmentsFilters = response.data;
      return departmentsFilters;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductsByDepId = createAsyncThunk(
  "environments/getProductsByDepId",
  async (data) => {
    if (data) {
      let { orgId, depId } = data;
      const url = config.GET_PRODUCTS_BY_DEPID.replace(
        "#org-id#",
        orgId
      ).replace("#dep-id#", depId);
      try {
        const response = await axios.get(`${url}`);
        const products = response.data;
        return { products, depId };
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export const getDeploymentEnvs = createAsyncThunk(
  "environments/getDeploymentEnvs",
  async () => {
    const url = config.GET_DEPLOYMENT_ENVIRONMENTS;
    try {
      const response = await axios.get(url);
      const deploymentEnvs = await response.data;
      return deploymentEnvs;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEnvsByFilters = createAsyncThunk(
  "environments/getEnvsByFilters",
  async (data) => {
    if (data) {
      let { params, orgId } = data;
      const url = config.GET_ALL_ENVIRONMENT_SUMMARY.replace("#org-id#", orgId);
      try {
        const response = await axios.get(`${url}`, { params });
        const envsByFilter = await response.json();
        return envsByFilter;
      } catch (error) {
        console.log(error);
      }
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";

export const getEnvsAsync = createAsyncThunk(
  "environments/getEnvsAsync",
  async (orgId) => {
    const url = config.GET_ALL_ENVIRONMENT_COUNT.replace("#org-id#", orgId);
    const response = await fetch(`${url}`);
    if (response.ok) {
      const allEnvs = await response.json();
      return allEnvs;
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
      return envSummary;
    }
  }
);

export const getDepartmentsOrgWise = createAsyncThunk(
  "environments/getDepartmentsOrgWise",
  async (orgId) => {
    const url = config.GET_ALL_ORGS;
    const response = await fetch(`${url}/${orgId}`);
    if (response.ok) {
      const departmentsFilters = await response.json();
      return departmentsFilters;
    } else {
      return Promise.reject(response.status);
    }
  }
);

export const getProductsByDepId = createAsyncThunk(
  "environments/getProductsByDepId",
  async (data) => {
    if (data) {
      const url = config.GET_PRODUCTS_BY_DEPID;
      let {orgId,depId} = data
      const response = await fetch(
        `${url}/${orgId}/departments/${depId}/products?orgId=${orgId}&depId=${depId}`
      );
      if (response.ok) {
        const products = await response.json();
        try {
          console.log({products,depId})
          return {products,depId};
        } catch (error) {
          console.log(error);
        }
      } else {
        return Promise.reject(response.status);
      }
    }
  }
);

export const getDeploymentEnvs = createAsyncThunk(
  "environments/getDeploymentEnvs",
  async (data) => {
    if (data) {
      const url = config.GET_DEPLOYMENT_ENVIRONMENTS;
      const response = await fetch(url);
      if (response.ok) {
        const deploymentEnvs = await response.json();
        try {
          return deploymentEnvs;
        } catch (error) {
          console.log(error);
        }
      } else {
        return Promise.reject(response.status);
      }
    }
  }
);

export const getEnvsByFilters = createAsyncThunk(
  "environments/getEnvsByFilters",
  async (data) => {
    if (data) {
      const url = config.GET_ENVIRONMENTS_SUMMARY_FILTERS;
      const response = await fetch(`${url}${data}`);
      if (response.ok) {
        const envsByFilter = await response.json();
        try {
          return envsByFilter;
        } catch (error) {
          console.log(error);
        }
      } else {
        return Promise.reject(response.status);
      }
    }
  }
);

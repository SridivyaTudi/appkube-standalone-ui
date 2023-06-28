import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";

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
  async (data, { getState }) => {
    if (data) {
      const url = config.GET_PRODUCTS_BY_DEPID;
      const response = await fetch(
        `${url}/${data.orgId}/departments/${data.depId}/products?orgId=${data.orgId}&depId=${data.depId}`
      );
      if (response.ok) {
        const products = await response.json();
        try {
          return products;
        } catch (error) {
          console.log(error);
        }
      } else {
        return Promise.reject(response.status);
      }
    }
  }
);

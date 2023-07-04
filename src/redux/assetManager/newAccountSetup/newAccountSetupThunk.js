import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";
import axios from "services";

export const createNewOU = createAsyncThunk(
  "organizationalUnitThunk/createNewOU",
  async (params) => {
    const url = config.DEPARTMENTS;
    try {
      const response = await axios.post(url, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrganizationalUnits = createAsyncThunk(
  "organizationalUnitThunk/getAll",
  async () => {
    const url = config.GET_ALL_ORG_WISE_DEPARTMENTS;
    try {
      const response = await axios.get(`${url}`);
      const allOrgs = response.data;
      return allOrgs;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addCloudEnv = createAsyncThunk(
  "organizationalUnitThunk/addCloundEnv",
  async (params) => {
    const url = config.ADD_CLOUD_ENV;
    try {
      const response = await axios.post(url, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

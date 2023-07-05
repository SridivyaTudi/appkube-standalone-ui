import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";
import axios from "services";
import { getCurrentOrgId } from "utils";

export const getEnvironmentDataByLandingZone = createAsyncThunk(
  "environmentData/getEnvironmentDataByLandingZone",
  async ({landingZone,currentOrgId}) => {
    const url = `${config.GET_ENVIRONMENT_DATA.replace('#org-id#',currentOrgId).replace('#landing-zone-id#',landingZone)}`;
    try {
      const response = await axios.get(url);
      const productEnclaveList = response.data;
      return productEnclaveList;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEnvironments = createAsyncThunk(
  "environmentData/getEnvironments",
  async () => {
    const url = `${config.GET_ENVIRONMENTS}`;
    try {
      const response = await axios.get(url);
      const environments = response.data;
      return environments;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getDepartments = createAsyncThunk(
  "environmentData/getDepartments",
  async (params) => {
    const url = `${config.GET_DEPARTMENT_WISE_DATA}`;
    try {
      const response = await axios.get(url, {params});
      const departments = response.data;
      return departments;
    } catch (error) {
      console.log(error);
    }
  }
);

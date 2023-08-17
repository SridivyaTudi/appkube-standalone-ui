import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getEnvironmentDataByLandingZone = createAsyncThunk(
  "environmentData/getEnvironmentDataByLandingZone",
  async (params) => {
    let url = config.GET_INFRA_TOPOLOGY_DATA.replace(
      "#landing-zone-id#",
      params.landingZone
    );
    url = url.replace("#org-id#", params.orgID);
    try {
      const response = await postLoginService.get(url);
      return response;
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
      const response = await postLoginService.get(url, { params });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSingleEnvironmentCountData = createAsyncThunk(
  "environmentData/getSingleEnvironmentCountData",
  async (params) => {
    const url = config.GET_SINGLE_ENVIRONMENT_COUNT_DATA.replace(
      "#orgId#",
      params.orgId
    )
      .replace("#cloud#", params.cloud)
      .replace("#landingZone#", params.landingZone);
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

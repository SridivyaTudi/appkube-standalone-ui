import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getEnvironmentDataByLandingZone = createAsyncThunk(
  "environmentData/getEnvironmentDataByLandingZone",
  async (params) => {
    let url = config.GET_INFRA_TOPOLOGY_DATA.replace(
      "#landing-zone-id#",
      params.landingZone
    ).replace("#org-id#", params.orgID);
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

export const GetInfraTopologyCloudElementList = createAsyncThunk(
  "environmentData/getInfraTopologyCloudElementList",
  async (params) => {
    const url = config.INFRA_TOPOLOGY_CLOUD_ELEMENT_LIST.replace(
      "#org-id#",
      params.orgID
    )
      .replace("#landing-zone-id#", params.landingZone)
      .replace("#product-enclave#", params.productEnclave);
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getInfraTopologyCategoryWiseViewData = createAsyncThunk(
  "environmentData/getInfraTopologyCategoryWiseViewData",
  async (params) => {
    const url = config.INFRA_TOPOLOGY_CATEGORY_WISE_VIEW.replace(
      "#org-id#",
      params.orgID
    )
      .replace("#landing-zone-id#", params.landingZone)
      .replace("#product-enclave#", params.productEnclave);
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getInfraTopologyDbCategories = createAsyncThunk(
  "environmentData/getInfraTopologyDbCategories",
  async () => {
    const url = config.INFRA_TOPOLOGY_DB_CATEGORIES;

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getInfraTopologyLambdaTableData = createAsyncThunk(
  "environments/getInfraTopologyLambdaTableData",
  async (params) => {
    const url = config.INFRA_TOPOLOGY_LAMBDA_TABLE_DATA.replace(
      "#element-type#",
      params.elementType
    )
      .replace("#landing-zone#", params.landingZone)
      .replace("#product-enclave#", params.productEnclave);

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

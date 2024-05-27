import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getEnvironmentDataByLandingZone = createAsyncThunk(
  "environmentData/getEnvironmentDataByLandingZone",
  async (params) => {
    let url = config.GET_INFRA_TOPOLOGY_DATA.replace(
      "#landing-zone-id#",
      params.landingZoneId
    );
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
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
      "#cloud#",
      params.cloud
    ).replace("#landingZone#", params.landingZone);
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
      "#landing-zone-id#",
      params.landingZoneId
    ).replace("#product-enclave#", params.productEnclave);
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
      "#landing-zone-id#",
      params.landingZoneId
    ).replace("#product-enclave#", params.productEnclave);
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
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

export const getGlobalServiceCategoryWiseSummary = createAsyncThunk(
  "environments/getGlobalServiceCategoryWiseSummary",
  async (params) => {
    const url = config.INFRA_TOPOLOGY_GLOBAL_SERVICES_DATA.replace(
      "#landing-zone-id#",
      params.landingZoneId
    );

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getGlobalServiceCloudElements = createAsyncThunk(
  "environments/getGlobalServiceCloudElements",
  async (params) => {
    const url =
      config.INFRA_TOPOLOGY_GLOBAL_SERVICES_CLOUD_ELEMENT_SEARCH.replace(
        "#element-type#",
        params.elementType
      );

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getEnvironmentsApplicationTableData = createAsyncThunk(
  "environments/getEnvironmentsApplicationTableData",
  async (params) => {
    const url = config.ENVIRONMENTS_APPLICATIONS_TABLE_DATA.replace(
      "#org-id#",
      params.orgId
    ).replace("#landing-zone-id#", params.landingZoneId);
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getViewServiceData = createAsyncThunk(
  "environments/getViewServiceData",
  async (params) => {
    const url = config.VIEW_SERVICE.replace("#org-id#", params.orgId).replace(
      "#landing-zone-id#",
      params.landingZoneId
    );
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

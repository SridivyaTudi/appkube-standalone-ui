import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getElementType = createAsyncThunk(
  "BIMapping/getElementType",
  async (objIds) => {
    try {
      let { departmentId, productId, productEnvId } = objIds;
      let url = config.GET_ELEMENT_TYPE.replace("#department-id#", departmentId)
        .replace("#product-id#", productId)
        .replace("#product-env-id#", productEnvId);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getElementInstancesOfGivenType = createAsyncThunk(
  "BIMapping/getElementInstancesOfGivenType",
  async (objIds) => {
    try {
      let { departmentId, productId, productEnvId, elementType } = objIds;
      let url = config.GET_ELEMENT_INSTANCES_TYPE.replace(
        "#department-id#",
        departmentId
      )
        .replace("#product-id#", productId)
        .replace("#product-env-id#", productEnvId)
        .replace("#element-type#", elementType);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getBiServicesFromProductCategory = createAsyncThunk(
  "BIMapping/getBiServicesFromProductCategory",
  async (params) => {
    try {
      let { productCategory } = params;
      let url = config.GET_BI_SERVICES_FROM_PRODUCT_CATEGORY.replace(
        "#product-category#",
        productCategory
      );

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCloudServices = createAsyncThunk(
  "BIMapping/getCloudServices",
  async (params) => {
    try {
      let { serviceCategory, productCategory } = params;
      let url = config.GET_CLOUD_SERVICES.replace(
        "#product-category#",
        productCategory
      ).replace("#service-category#", serviceCategory);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getInstancesServices = createAsyncThunk(
  "BIMapping/getInstancesServices",
  async (params) => {
    try {
      let { cloudName, elementType, landingZoneId } = params;
      let url = config.GET_INSTANCES_SERVICES.replace("#cloud-name#", cloudName)
        .replace("#element-type#", elementType)
        .replace("#landingzone-id#", landingZoneId);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createBiMapping = createAsyncThunk(
  "BIMapping/createBiMapping",
  async (params) => {
    try {
      let url = config.ADD_BI_MAPPING;
      const response = await postLoginService.post(url, params);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createDepartment = createAsyncThunk(
  "BIMapping/createDepartment",
  async (params) => {
    try {
      let url = config.ADD_DEPARTMENT;
      const response = await postLoginService.post(url, params);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLandingzone = createAsyncThunk(
  "BIMapping/getLandingzone",
  async (params) => {
    try {
      let { orgId, cloud } = params;
      let url = config.GET_LANDINGZONE.replace("#org-id#", orgId).replace(
        "#cloud#",
        cloud
      );
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const createDepartmentWithLandingZone = createAsyncThunk(
  "BIMapping/createDepartmentWithLandingZone",
  async (params) => {
    try {
      let url = config.ADD_DEPARTMENT_WITH_LANDINGZONE;
      const response = await postLoginService.post(url, params);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLandingzoneByDepartment = createAsyncThunk(
  "BIMapping/getLandingzoneByDepartment",
  async (params) => {
    try {
      let { orgId, departmentId } = params;
      let url = config.GET_LANDINGZONE_DEPARTMENT.replace(
        "#org-id#",
        orgId
      ).replace("#department-id#", departmentId);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCommonServiceModules = createAsyncThunk(
  "BIMapping/getCommonServiceModules",
  async (params) => {
    try {
      let { serviceType } = params;
      let url = config.GET_COMMON_SERVICE_MODULES.replace(
        "#service-type#",
        serviceType
      );
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getServicesFromServiceModule = createAsyncThunk(
  "BIMapping/getServicesFromServiceModule",
  async (params) => {
    try {
      let { serviceType, moduleName } = params;
      let url = config.GET_SERVICES_FROM_SERVICE_MODULE.replace(
        "#service-type#",
        serviceType
      ).replace("#service-module#", moduleName?.toLowerCase());

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getDepartments = createAsyncThunk(
  "associateApp/getDepartments",
  async (orgID) => {
    let url = config.GET_ASSOCIATE_DEPARTMENTS.replace("#org-id#", orgID);

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductList = createAsyncThunk(
  "associateApp/getProductList",
  async (depID) => {
    let url = config.GET_ASSOCIATE_PRODUCT_LIST.replace(
      "#department-id#",
      depID
    );

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductEnv = createAsyncThunk(
  "associateApp/getProductEnv",
  async (productId) => {
    let url = config.GET_ASSOCIATE_PRODUCT_ENV.replace(
      "#product-id#",
      productId
    );

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getModules = createAsyncThunk(
  "associateApp/getModules",
  async ({ departmentId, productId, productEnvId, serviceNature }) => {
    try {
      let url = config.GET_ASSOCIATE_MODULES.replace(
        "#department-id#",
        departmentId
      )
        .replace("#product-id#", productId)
        .replace("#product-env-id#", productEnvId)
        .replace("#service-nature#", serviceNature);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getModuleElements = createAsyncThunk(
  "associateApp/getModuleElements",
  async ({
    departmentId,
    productId,
    productEnvId,
    moduleId,
    serviceNature,
  }) => {
    try {
      let url = config.GET_ASSOCIATE_MODULE_ELEMENTS.replace(
        "#department-id#",
        departmentId
      )
        .replace("#product-id#", productId)
        .replace("#product-env-id#", productEnvId)
        .replace("#module-id#", moduleId)
        .replace("#service-nature#", serviceNature);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createAssociate = createAsyncThunk(
  "associateApp/createAssociate",
  async (params) => {
    try {
      let url = config.CREATE_ASSOCIATE;
      const response = await postLoginService.post(url,params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

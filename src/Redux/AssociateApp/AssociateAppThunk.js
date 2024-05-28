import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

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

export const addService = createAsyncThunk(
  "associateApp/addService",
  async (params) => {
    try {
      let url = config.CREATE_ASSOCIATE;
      const response = await postLoginService.post(url, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getModulesOf3Tier = createAsyncThunk(
  "associateApp/getModulesOf3Tier",
  async ({ departmentId, productId, productEnvId, serviceType }) => {
    try {
      let url = config.GET_ASSOCIATE_MODULES_3_TIER.replace(
        "#department-id#",
        departmentId
      )
        .replace("#product-id#", productId)
        .replace("#product-env-id#", productEnvId)
        .replace("#service-type#", serviceType);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getExistingTags = createAsyncThunk(
  "associateApp/getExistingTags",
  async ({ landingZoneId, instanceId }) => {
    try {
      let url = config.GET_ASSOCIATE_EXISTING_TAG_LIST.replace(
        "#landing-zone-id#",
        landingZoneId
      ).replace("#instance-id#", instanceId);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteExistingTag = createAsyncThunk(
  "associateApp/deleteExistingTag",
  async ({ landingZoneId, instanceId, serviceId }) => {
    try {
      let url = config.DELETE_TAG.replace("#landing-zone-id#", landingZoneId)
        .replace("#instance-id#", instanceId)
        .replace("#service-id#", serviceId);

      const response = await postLoginService.delete(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

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
    let url = config.GET_ASSOCIATE_PRODUCT_LIST.replace("#department-id#", depID);
    
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
    let url = config.GET_ASSOCIATE_PRODUCT_ENV.replace("#product-id#", productId);
    
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
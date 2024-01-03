import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AuthViews/Config";
import { postLoginService } from "Services";

export const getMFACode = createAsyncThunk(
  "settings/getMFACode",
  async (data) => {
    try {
      const response = await postLoginService.post(
        `${config.GET_MFA_CODE}`,
        data
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authMFACode = createAsyncThunk(
  "settings/authMFACode",
  async (params) => {
    try {
      const response = await postLoginService.post(
        `${config.AUTH_MFA}`,
        params
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createRole = createAsyncThunk(
  "settings/createRole",
  async (params) => {
    try {
      const response = await postLoginService.post(
        `${config.CREATE_ROLE}`,
        params
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createGroup = createAsyncThunk(
  "settings/createGroup",
  async (params) => {
    try {
      const response = await postLoginService.post(config.CREATE_GROUP, params);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "settings/deleteRole",
  async (id) => {
    try {
      let url = config.DELETE_ROLE.replace("#role-id#", id);
      const response = await postLoginService.post(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getRoleById = createAsyncThunk(
  "settings/getRoleById",
  async (id) => {
    try {
      let url = config.GET_ROLE_BY_ID.replace("#role-id#", id);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateRole = createAsyncThunk(
  "settings/updateRole",
  async (params) => {
    try {
      const response = await postLoginService.post(config.UPDATE_ROLE, params);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPolicy = createAsyncThunk(
  "settings/createPolicy",
  async (params) => {
    try {
      const response = await postLoginService.post(
        config.CREATE_POLICY,
        params
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePolicy = createAsyncThunk(
  "settings/deletePolicy",
  async (id) => {
    try {
      let url = config.DELETE_POLICY.replace("#policy-id#", id);
      const response = await postLoginService.post(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "settings/createUser",
  async (params) => {
    try {
      const response = await postLoginService.post(config.CREATE_USER, params);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "settings/deleteGroup",
  async (id) => {
    try {
      let url = config.DELETE_GROUP.replace("#group-id#", id);
      const response = await postLoginService.post(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserPermissionData = createAsyncThunk(
  "settings/getUserPermissionData",
  async (name) => {
    try {
      let url = config.GET_USER_PERMISSION_DATA_URL.replace(
        "#user-name#",
        name
      );
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getGroupById = createAsyncThunk(
  "settings/getGroupById",
  async (data) => {
    try {
      let url = config.GET_GROUP_BY_ID.replace("#role-id#", data.id).replace(
        "#user-name#",
        data.userName
      );
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

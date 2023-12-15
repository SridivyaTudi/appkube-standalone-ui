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

export const getRoles = createAsyncThunk(
  "settings/getRoles",
  async (userName) => {
    try {
      let url = config.GET_ROLES.replace("#user-name#", userName).replace(
        "#is-group#",
        false
      );
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPolicies = createAsyncThunk(
  "settings/getPolicies",
  async () => {
    try {
      const response = await postLoginService.get(config.GET_POLICIES);
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
      const response = await postLoginService.delete(url);
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
      const response = await postLoginService.post(
        `${config.UPDATE_ROLE}`,
        params
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPermissionCategory = createAsyncThunk(
  "settings/getPermissionCategory",
  async () => {
    try {
      const response = await postLoginService.get(
        config.GET_PERMISSION_CATEGORY
      );
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
      const response = await postLoginService.delete(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUsers = createAsyncThunk("settings/getUsers", async (id) => {
  try {
    let url = config.GET_USERS.replace("#owner-id#", id);
    const response = await postLoginService.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
});

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

export const getGroups = createAsyncThunk(
  "settings/getGroups",
  async (userName) => {
    try {
      let url = config.GET_GROUPS.replace("#user-name#", userName).replace(
        "#is-group#",
        true
      );
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

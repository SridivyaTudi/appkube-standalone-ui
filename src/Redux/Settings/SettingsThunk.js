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
      return error.response?.data;
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
      return error;
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
      throw new Error(error);
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

export const getUserById = createAsyncThunk(
  "settings/getUserById",
  async (id) => {
    try {
      let url = config.GET_USER_BY_ID.replace("#user-id#", id);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "settings/deleteUser",
  async (id) => {
    try {
      let url = config.DELETE_USER.replace("#user-id#", id);
      const response = await postLoginService.post(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const changePasswordOfAccount = createAsyncThunk(
  "settings/changePasswordOfAccount",
  async (data) => {
    try {
      let url = config.ACCOUNT_CHANGE_PASSWORD;
      const response = await postLoginService.post(url, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const resetPasswordOfUser = createAsyncThunk(
  "settings/resetPasswordOfUser",
  async (data) => {
    try {
      let url = config.USER_RESET_PASSWORD;
      const response = await postLoginService.post(url, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addUserToGroups = createAsyncThunk(
  "settings/addUserToGroups",
  async (data) => {
    try {
      let url = config.ADD_USER_TO_GROUPS.replace(
        "#user-name#",
        data.userName
      ).replace("#role-id#", data.roleIds);
      const response = await postLoginService.post(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const disableAuthMFACode = createAsyncThunk(
  "settings/disableAuthMFACode",
  async (params) => {
    try {
      const response = await postLoginService.post(
        config.DISABLE_AUTH_MFA,
        params
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const addUsersFromGroupDetails = createAsyncThunk(
  "settings/addUsersFromGroupDetails",
  async (params) => {
    try {
      let url = config.ADD_USERS_FROM_GROUP_DETAILS;
      const response = await postLoginService.post(url, params);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getPendingUserRequests = createAsyncThunk(
  "settings/getPendingUserRequests",
  async (orgId) => {
    try {
      let url = config.GET_PENDING_USER_REQUESTS.replace("#org-id#", orgId);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPendingUserCount = createAsyncThunk(
  "settings/getPendingUserCount",
  async (orgId) => {
    try {
      let url = config.GET_PENDING_USER_COUNT.replace("#org-id#", orgId);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const pendingUserRequestAction = createAsyncThunk(
  "settings/pendingUserRequestAction",
  async (params) => {
    try {
      let url = config.PENDING_USER_REQUEST_ACTION;
      const response = await postLoginService.post(url, params);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getConfirmedUserRequest = createAsyncThunk(
  "settings/getConfirmedUserRequest",
  async (orgId) => {
    try {
      let url = config.GET_CONFIRMED_USER_REQUESTS.replace("#org-id#", orgId);;
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

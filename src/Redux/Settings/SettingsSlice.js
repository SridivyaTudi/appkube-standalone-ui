import { createSlice } from "@reduxjs/toolkit";
import status from "Redux/Constants/CommonDS";
import {
  getMFACode,
  authMFACode,
  createRole,
  createGroup,
  getRoles,
  getPolicies,
  deleteRole,
  getRoleById,
  updateRole,
  getPermissionCategory,
  createPolicy,
  deletePolicy,
  getUsers,
  createUser,
  getGroups,
} from "./SettingsThunk";

export const settingsSlice = createSlice({
  name: "getMFACode",
  initialState: {
    MFACode: {
      status: null,
      data: {},
    },
    mfaAuth: {
      status: null,
      data: {},
    },
    roleCreation: {
      status: null,
      data: {},
    },
    groupCreation: {
      status: null,
      data: {},
    },
    allRoles: {
      status: null,
      data: [],
    },
    allPolicy: {
      status: null,
      data: [],
    },
    removeRole: {
      status: null,
      data: "",
    },
    roleDetailsById: {
      status: null,
      data: {},
    },
    roleUpdation: {
      status: null,
      data: {},
    },
    permissionCategory: {
      status: null,
      data: [],
    },
    policyCreation: {
      status: null,
      data: [],
    },
    policyList: {
      status: null,
      data: [],
    },
    removePolicy: {
      status: null,
      data: [],
    },
    allUsers: {
      status: null,
      data: [],
    },
    userCreation: {
      status: null,
      data: [],
    },
    allGroups: {
      status: null,
      data: [],
    },
  },
  reducers: {},
  extraReducers: {
    [getMFACode.pending]: (state) => {
      return {
        ...state,
        MFACode: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getMFACode.fulfilled]: (state, action) => {
      return {
        ...state,
        MFACode: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getMFACode.rejected]: (state) => {
      return {
        ...state,
        MFACode: {
          status: status.FAILURE,
        },
      };
    },

    [authMFACode.pending]: (state) => {
      return {
        ...state,
        mfaAuth: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [authMFACode.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        mfaAuth: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [authMFACode.rejected]: (state) => {
      return {
        ...state,
        mfaAuth: {
          status: status.FAILURE,
        },
      };
    },

    [createRole.pending]: (state) => {
      return {
        ...state,
        roleCreation: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createRole.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        roleCreation: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [createRole.rejected]: (state) => {
      return {
        ...state,
        roleCreation: {
          status: status.FAILURE,
        },
      };
    },

    [updateRole.pending]: (state) => {
      return {
        ...state,
        roleUpdation: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [updateRole.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        roleUpdation: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [updateRole.rejected]: (state) => {
      return {
        ...state,
        roleUpdation: {
          status: status.FAILURE,
        },
      };
    },

    [createGroup.pending]: (state) => {
      return {
        ...state,
        groupCreation: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createGroup.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        groupCreation: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [createGroup.rejected]: (state) => {
      return {
        ...state,
        groupCreation: {
          status: status.FAILURE,
        },
      };
    },

    [getRoles.pending]: (state) => {
      return {
        ...state,
        allRoles: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getRoles.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        allRoles: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getRoles.rejected]: (state) => {
      return {
        ...state,
        allRoles: {
          status: status.FAILURE,
        },
      };
    },

    [getRoleById.pending]: (state) => {
      return {
        ...state,
        roleDetailsById: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getRoleById.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        roleDetailsById: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getRoleById.rejected]: (state) => {
      return {
        ...state,
        roleDetailsById: {
          status: status.FAILURE,
        },
      };
    },

    [getPolicies.pending]: (state) => {
      return {
        ...state,
        allPolicy: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getPolicies.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        allPolicy: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getPolicies.rejected]: (state) => {
      return {
        ...state,
        allPolicy: {
          status: status.FAILURE,
        },
      };
    },

    [deleteRole.pending]: (state) => {
      return {
        ...state,
        removeRole: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [deleteRole.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        removeRole: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [deleteRole.rejected]: (state) => {
      return {
        ...state,
        removeRole: {
          status: status.FAILURE,
        },
      };
    },

    [getPermissionCategory.pending]: (state) => {
      return {
        ...state,
        permissionCategory: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getPermissionCategory.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        permissionCategory: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getPermissionCategory.rejected]: (state) => {
      return {
        ...state,
        permissionCategory: {
          status: status.FAILURE,
        },
      };
    },

    [createPolicy.pending]: (state) => {
      return {
        ...state,
        policyCreation: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createPolicy.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        policyCreation: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [createPolicy.rejected]: (state) => {
      return {
        ...state,
        policyCreation: {
          status: status.FAILURE,
        },
      };
    },

    [deletePolicy.pending]: (state) => {
      return {
        ...state,
        removePolicy: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [deletePolicy.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        removePolicy: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [deletePolicy.rejected]: (state) => {
      return {
        ...state,
        removePolicy: {
          status: status.FAILURE,
        },
      };
    },

    [getUsers.pending]: (state) => {
      return {
        ...state,
        allUsers: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        allUsers: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getUsers.rejected]: (state) => {
      return {
        ...state,
        allUsers: {
          status: status.FAILURE,
        },
      };
    },

    [createUser.pending]: (state) => {
      return {
        ...state,
        userCreation: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [createUser.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userCreation: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [createUser.rejected]: (state) => {
      return {
        ...state,
        userCreation: {
          status: status.FAILURE,
        },
      };
    },

    [getGroups.pending]: (state) => {
      return {
        ...state,
        allGroups: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getGroups.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        allGroups: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getGroups.rejected]: (state) => {
      return {
        ...state,
        allGroups: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default settingsSlice.reducer;

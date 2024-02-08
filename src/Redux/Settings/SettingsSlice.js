import { createSlice } from "@reduxjs/toolkit";
import status from "Redux/Constants/CommonDS";
import {
  getMFACode,
  authMFACode,
  createRole,
  createGroup,
  deleteRole,
  getRoleById,
  updateRole,
  createPolicy,
  deletePolicy,
  createUser,
  deleteGroup,
  getUserPermissionData,
  getGroupById,
  getUserById,
  deleteUser,
  changePasswordOfAccount,
  resetPasswordOfUser,
  addUserToGroups,
  disableAuthMFACode,
  addUsersFromGroupDetails,
  getPendingUserRequests,
  getPendingUserCount,
  pendingUserRequestAction,
  getConfirmedUserRequest,
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
    removeGroup: {
      status: null,
      data: "",
    },
    userPermissionData: {
      status: null,
      data: {},
    },
    groupDetailsById: {
      status: null,
      data: {},
    },
    userDetailsById: {
      status: null,
      data: {},
    },
    removeUser: {
      status: null,
      data: "",
    },
    accountChangePassword: {
      status: null,
      data: "",
    },
    userResetPassword: {
      status: null,
      data: "",
    },
    userToGroupsCreation: {
      status: null,
      data: "",
    },
    disableMfaAuth: {
      status: null,
      data: null,
    },
    userCreationFromGroupDetails: {
      status: null,
      data: null,
    },
    pendingUserRequests: {
      status: null,
      data: [],
    },
    pendingUserCount: {
      status: null,
      data: null,
    },
    pendingUserReqAction: {
      status: null,
      data: {},
    },
    confirmedUserRequest: {
      status: null,
      data: {},
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

    [deleteGroup.pending]: (state) => {
      return {
        ...state,
        removeGroup: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [deleteGroup.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        removeGroup: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [deleteGroup.rejected]: (state) => {
      return {
        ...state,
        removeGroup: {
          status: status.FAILURE,
        },
      };
    },

    [getUserPermissionData.pending]: (state) => {
      return {
        ...state,
        userPermissionData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getUserPermissionData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userPermissionData: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getUserPermissionData.rejected]: (state) => {
      return {
        ...state,
        userPermissionData: {
          status: status.FAILURE,
        },
      };
    },

    [getGroupById.pending]: (state) => {
      return {
        ...state,
        groupDetailsById: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getGroupById.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        groupDetailsById: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getGroupById.rejected]: (state) => {
      return {
        ...state,
        groupDetailsById: {
          status: status.FAILURE,
        },
      };
    },

    [getUserById.pending]: (state) => {
      return {
        ...state,
        userDetailsById: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getUserById.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userDetailsById: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getUserById.rejected]: (state) => {
      return {
        ...state,
        userDetailsById: {
          status: status.FAILURE,
        },
      };
    },

    [deleteUser.pending]: (state) => {
      return {
        ...state,
        removeUser: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        removeUser: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [deleteUser.rejected]: (state) => {
      return {
        ...state,
        removeUser: {
          status: status.FAILURE,
        },
      };
    },

    [changePasswordOfAccount.pending]: (state) => {
      return {
        ...state,
        accountChangePassword: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [changePasswordOfAccount.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        accountChangePassword: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [changePasswordOfAccount.rejected]: (state) => {
      return {
        ...state,
        accountChangePassword: {
          status: status.FAILURE,
        },
      };
    },

    [resetPasswordOfUser.pending]: (state) => {
      return {
        ...state,
        userResetPassword: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [resetPasswordOfUser.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userResetPassword: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [resetPasswordOfUser.rejected]: (state) => {
      return {
        ...state,
        userResetPassword: {
          status: status.FAILURE,
        },
      };
    },

    [addUserToGroups.pending]: (state) => {
      return {
        ...state,
        userToGroupsCreation: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [addUserToGroups.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userToGroupsCreation: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [addUserToGroups.rejected]: (state) => {
      return {
        ...state,
        userToGroupsCreation: {
          status: status.FAILURE,
        },
      };
    },

    [disableAuthMFACode.pending]: (state) => {
      return {
        ...state,
        disableMfaAuth: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [disableAuthMFACode.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        disableMfaAuth: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [disableAuthMFACode.rejected]: (state) => {
      return {
        ...state,
        disableMfaAuth: {
          status: status.FAILURE,
        },
      };
    },

    [addUsersFromGroupDetails.pending]: (state) => {
      return {
        ...state,
        userCreationFromGroupDetails: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [addUsersFromGroupDetails.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userCreationFromGroupDetails: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [addUsersFromGroupDetails.rejected]: (state) => {
      return {
        ...state,
        userCreationFromGroupDetails: {
          status: status.FAILURE,
        },
      };
    },

    [getPendingUserRequests.pending]: (state) => {
      return {
        ...state,
        pendingUserRequests: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getPendingUserRequests.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pendingUserRequests: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getPendingUserRequests.rejected]: (state) => {
      return {
        ...state,
        pendingUserRequests: {
          status: status.FAILURE,
        },
      };
    },

    [getPendingUserCount.pending]: (state) => {
      return {
        ...state,
        pendingUserCount: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getPendingUserCount.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pendingUserCount: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getPendingUserCount.rejected]: (state) => {
      return {
        ...state,
        pendingUserCount: {
          status: status.FAILURE,
        },
      };
    },

    [getConfirmedUserRequest.pending]: (state) => {
      return {
        ...state,
        confirmedUserRequest: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getConfirmedUserRequest.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        confirmedUserRequest: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getConfirmedUserRequest.rejected]: (state) => {
      return {
        ...state,
        confirmedUserRequest: {
          status: status.FAILURE,
        },
      };
    },

    [pendingUserRequestAction.pending]: (state) => {
      return {
        ...state,
        pendingUserReqAction: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [pendingUserRequestAction.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pendingUserReqAction: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [pendingUserRequestAction.rejected]: (state) => {
      return {
        ...state,
        pendingUserReqAction: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default settingsSlice.reducer;

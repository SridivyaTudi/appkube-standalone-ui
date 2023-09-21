import { createSlice } from "@reduxjs/toolkit";
import {
  getProductList,
  getProductEnv,
  getModules,
  getModuleElements,
  addService,
  getModulesOf3Tier,
  getExistingTags,
  deleteExistingTag,
} from "Redux/AssociateApp/AssociateAppThunk";
import status from "Redux/Constants/CommonDS";

export const AssociateAppSlice = createSlice({
  name: "associateApp",
  initialState: {
    products: {
      status: null,
      data: [],
    },
    productEnv: {
      status: null,
      data: [],
    },
    modules: {
      status: null,
      data: [],
    },
    moduleElements: {
      status: null,
      data: [],
    },
    serviceCreation: {
      status: null,
      data: [],
    },
    threeTierModules: {
      status: null,
      data: [],
    },
    existingTags: {
      status: null,
      data: [],
    },
    deleteTag: {
      status: null,
      data: {},
    },
  },

  extraReducers: {
    [getProductList.pending]: (state, action) => {
      return {
        ...state,
        products: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getProductList.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        products: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getProductList.rejected]: (state, action) => {
      return {
        ...state,
        products: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getProductEnv.pending]: (state, action) => {
      return {
        ...state,
        productEnv: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getProductEnv.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        productEnv: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getProductEnv.rejected]: (state, action) => {
      return {
        ...state,
        productEnv: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getModules.pending]: (state, action) => {
      return {
        ...state,
        modules: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getModules.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        modules: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getModules.rejected]: (state, action) => {
      return {
        ...state,
        modules: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getModuleElements.pending]: (state, action) => {
      return {
        ...state,
        moduleElements: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getModuleElements.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        moduleElements: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getModuleElements.rejected]: (state, action) => {
      return {
        ...state,
        moduleElements: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [addService.pending]: (state, action) => {
      return {
        ...state,
        serviceCreation: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [addService.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        serviceCreation: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [addService.rejected]: (state, action) => {
      return {
        ...state,
        serviceCreation: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getModulesOf3Tier.pending]: (state, action) => {
      return {
        ...state,
        threeTierModules: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getModulesOf3Tier.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        threeTierModules: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getModulesOf3Tier.rejected]: (state, action) => {
      return {
        ...state,
        threeTierModules: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [getExistingTags.pending]: (state, action) => {
      return {
        ...state,
        existingTags: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getExistingTags.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        existingTags: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getExistingTags.rejected]: (state, action) => {
      return {
        ...state,
        existingTags: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

    [deleteExistingTag.pending]: (state, action) => {
      return {
        ...state,
        deleteTag: {
          status: status.IN_PROGRESS,
          data: {},
        },
      };
    },
    [deleteExistingTag.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        deleteTag: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [deleteExistingTag.rejected]: (state, action) => {
      return {
        ...state,
        deleteTag: {
          status: status.FAILURE,
          data: {},
        },
      };
    },
  },
});

export default AssociateAppSlice.reducer;

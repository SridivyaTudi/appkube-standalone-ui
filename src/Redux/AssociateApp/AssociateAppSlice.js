import { createSlice } from "@reduxjs/toolkit";
import {
  getDepartments,
  getProductList,getProductEnv
} from "Redux/AssociateApp/AssociateAppThunk";
import status from "Redux/Constants/CommonDS";

export const AssociateAppSlice = createSlice({
  name: "associateApp",
  initialState: {
    departments: {
      status: null,
      data: [],
    },
    products: {
      status: null,
      data: [],
    },
    productEnv: {
      status:null,
      data: [],
    },
  },

  extraReducers: {
    [getDepartments.pending]: (state, action) => {
      return {
        ...state,
        departments: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getDepartments.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        departments: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getDepartments.rejected]: (state, action) => {
      return {
        ...state,
        departments: {
          status: status.FAILURE,
          data: [],
        },
      };
    },

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
  },
});

export default AssociateAppSlice.reducer;

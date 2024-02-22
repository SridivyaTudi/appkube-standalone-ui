import { createSlice } from "@reduxjs/toolkit";
import {
  getElementType,
  getElementInstancesOfGivenType,
} from "Redux/BIMapping/BIMappingThunk";
import status from "Redux/Constants/CommonDS";

export const BIMappingSlice = createSlice({
  name: "BIMapping",
  initialState: {
    elementTypeData: {
      status: null,
      data: [],
    },
    elementInstancesOfGivenType: {
      status: null,
      data: [],
    },
  },
  extraReducers: {
    [getElementType.pending]: (state) => {
      return {
        ...state,
        elementTypeData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getElementType.fulfilled]: (state, action) => {
      return {
        ...state,
        elementTypeData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getElementType.rejected]: (state) => {
      return {
        ...state,
        elementTypeData: {
          status: status.FAILURE,
        },
      };
    },

    [getElementInstancesOfGivenType.pending]: (state) => {
      return {
        ...state,
        elementInstancesOfGivenType: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getElementInstancesOfGivenType.fulfilled]: (state, action) => {
      return {
        ...state,
        elementInstancesOfGivenType: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getElementInstancesOfGivenType.rejected]: (state) => {
      return {
        ...state,
        elementInstancesOfGivenType: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default BIMappingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getEnvironmentVpcs } from "redux/assetManager/environments/environmentData/environmentDataThunk";
import status from "redux/constants/commonDS";

export const environmentDataSlice = createSlice({
  name: "environmentData",
  initialState: {
    allVpcs:{
      status: null,
      data:[]
    }
  },
  extraReducers: {
    [getEnvironmentVpcs.pending]: (state, action) => {
      return {
        ...state,
        allVpcs: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getEnvironmentVpcs.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        allVpcs: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getEnvironmentVpcs.rejected]: (state, action) => {
      return {
        ...state,
        allVpcs: {
          status: status.FAILURE,
        },
      };
    },
  },
});

export default environmentDataSlice.reducer;

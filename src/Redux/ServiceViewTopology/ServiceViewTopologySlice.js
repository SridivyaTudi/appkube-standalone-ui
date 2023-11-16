import { createSlice } from "@reduxjs/toolkit";
import { getServiceView } from "Redux/ServiceViewTopology/ServiceViewTopologyThunk";
import status from "Redux/Constants/CommonDS";

export const ServiceViewTopologySlice = createSlice({
  name: "serviceViewTopology",
  initialState: {
    serviceView: {
      status: null,
      data: [],
    },
  },

  extraReducers: {
    [getServiceView.pending]: (state, action) => {
      return {
        ...state,
        serviceView: {
          status: status.IN_PROGRESS,
          data: [],
        },
      };
    },
    [getServiceView.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        serviceView: {
          status: status.SUCCESS,
          data: payload,
        },
      };
    },
    [getServiceView.rejected]: (state, action) => {
      return {
        ...state,
        serviceView: {
          status: status.FAILURE,
          data: [],
        },
      };
    },
  },
});

export default ServiceViewTopologySlice.reducer;

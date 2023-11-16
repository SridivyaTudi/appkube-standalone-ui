import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getServiceView = createAsyncThunk(
  "serviceViewTopology/getServiceView",
  async (params) => {
    let url = config.GET_SERVICE_VIEW;

    try {
      const response = await postLoginService.get(url+params);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getDiscoveredAssets = createAsyncThunk(
  "discoveredAssets/getDiscoveredAssets",
  async (orgId) => {
    let url = config.GET_DISCOVERED_ASSETS.replace("#org-id#", orgId);

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

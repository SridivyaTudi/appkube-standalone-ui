import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getDiscoveredAssets = createAsyncThunk(
  "discoveredAssets/getDiscoveredAssets",
  async (params) => {
    let { orgId, pageNo, pageSize, filterFlag } = params;

    let url = config.GET_DISCOVERED_ASSETS.replace("#org-id#", orgId)
      .replace("#page-no#", pageNo)
      .replace("#page-size#", pageSize)
      .replace("#filter-flag#", filterFlag);

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAwsRegions = createAsyncThunk(
  "discoveredAssets/getAwsRegions",
  async (params) => {
    let url = config.GET_AWS_REGIONS;
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

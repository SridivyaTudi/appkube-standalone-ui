import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getDiscoveredAssets = createAsyncThunk(
  "discoveredAssets/getDiscoveredAssets",
  async (params) => {
    let {
      orgId,
      pageNo,
      pageSize,
      isTagged,
      lte = null,
      isTagOrUnTagOrLtePass,
    } = params;

    let url = config.GET_DISCOVERED_ASSETS.replace("#org-id#", orgId)
      .replace("#page-no#", pageNo)
      .replace("#page-size#", pageSize);

    if (isTagOrUnTagOrLtePass) {
      if (lte === false) {
        url = `${url}&lte=false`;
      } else {
        url = `${url}&isTagged=${isTagged}`;
      }
    }

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

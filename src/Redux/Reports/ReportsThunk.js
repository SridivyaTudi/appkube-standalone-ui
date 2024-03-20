import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getSpendOverview = createAsyncThunk(
  "Reports/getSpendOverview",
  async (objIds) => {
    try {
      let { serviceCategory, cloud, granularity, compareTo, orgId } = objIds;
      let url = config.GET_SPEND_OVERVIEW.replace("#org-id#", orgId)
        .replace("#service-category#", serviceCategory)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

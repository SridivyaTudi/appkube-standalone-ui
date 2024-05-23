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
      throw new Error(error);
    }
  }
);

export const getSpendOverviewComputeDetails = createAsyncThunk(
  "Reports/getSpendOverviewComputeDetails",
  async (objIds) => {
    try {
      let { orgId, serviceCategory, cloud, granularity, compareTo } = objIds;
      let url = config.GET_SPEND_OVERVIEW_COMPUTE_DETAILS.replace(
        "#org-id#",
        orgId
      )
        .replace("#service-category#", serviceCategory)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getTopUsedService = createAsyncThunk(
  "Reports/getTopUsedService",
  async (objIds) => {
    try {
      let {
        orgId,
        serviceCategory,
        cloud,
        granularity,
        compareTo,
        noOfRecords,
        order,
      } = objIds;
      let url = config.GET_TOP_USED_SERVICE.replace("#org-id#", orgId)
        .replace("#service-category#", serviceCategory)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo)
        .replace("#no-of-records#", noOfRecords)
        .replace("#order#", order);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getTopUsedServiceDetails = createAsyncThunk(
  "Reports/getTopUsedServiceDetails",
  async (objIds) => {
    try {
      let { orgId, serviceCategory, cloud, granularity, compareTo } = objIds;
      let url = config.GET_TOP_USED_SERVICE_DETAILS.replace("#org-id#", orgId)
        .replace("#service-category#", serviceCategory)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getPotentialSavings = createAsyncThunk(
  "Reports/getPotentialSavings",
  async (objIds) => {
    try {
      let { orgId, cloud, granularity, compareTo } = objIds;
      let url = config.GET_POTENTIAL_SERVICES.replace("#org-id#", orgId)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getCostTopAccounts = createAsyncThunk(
  "Reports/getCostTopAccounts",
  async (objIds) => {
    try {
      let {
        orgId,
        cloud,
        account,
        granularity,
        compareTo,
        noOfRecords,
        order,
      } = objIds;
      let url = config.GET_COST_TOP_ACCOUNTS.replace("#org-id#", orgId)
        .replace("#cloud-name#", cloud)
        .replace("#account#", account)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo)
        .replace("#no-of-records#", noOfRecords)
        .replace("#order#", order);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getSpendingTrend = createAsyncThunk(
  "Reports/getSpendingTrend",
  async (objIds) => {
    try {
      let { orgId, cloud, granularity, compareTo, forcast } = objIds;
      let url = config.GET_SPENDING_TREND.replace("#org-id#", orgId)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo)
        .replace("#forcast#", forcast);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getComputeSummary = createAsyncThunk(
  "Reports/getComputeSummary",
  async (objIds) => {
    try {
      let { orgId, cloud, granularity, compareTo, serviceCategory } = objIds;
      let url = config.GET_COMPUTE_SUMMARY.replace("#org-id#", orgId)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo)
        .replace("#service-category#", serviceCategory);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getPotentialTotalSaving = createAsyncThunk(
  "Reports/getPotentialTotalSaving",
  async (objIds) => {
    try {
      let { orgId, cloud, granularity, compareTo, serviceCategory } = objIds;
      let url = config.GET_POTENTIAL_TOTAL_SAVING.replace("#org-id#", orgId)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo)
        .replace("#service-category#", serviceCategory);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
       throw new Error(error);
    }
  }
);

export const getPotentialMonthlySaving = createAsyncThunk(
  "Reports/getPotentialMonthlySaving",
  async (objIds) => {
    try {
      let { orgId, cloud, granularity, compareTo, serviceCategory } = objIds;
      let url = config.GET_POTENTIAL_MONTHLY_SAVING.replace("#org-id#", orgId)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo)
        .replace("#service-category#", serviceCategory);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
       throw new Error(error);
    }
  }
);

export const getTopRiRecommendations = createAsyncThunk(
  "Reports/getTopRiRecommendations",
  async (objIds) => {
    try {
      let { orgId, cloud, granularity, compareTo, serviceCategory } = objIds;
      let url = config.GET_TOP_RI_RECOMMENDATIONS.replace("#org-id#", orgId)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo)
        .replace("#service-category#", serviceCategory);
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
       throw new Error(error);
    }
  }
);

export const getElementSummary = createAsyncThunk(
  "Reports/getElementSummary",
  async (objIds) => {
    try {
      let {
        orgId,
        cloud,
        granularity,
        compareTo,
        serviceCategory,
        elementType,
      } = objIds;
      let url = config.GET_ELEMENT_SUMMARY.replace("#org-id#", orgId)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo)
        .replace("#service-category#", serviceCategory)
        .replace("#element-type#", elementType);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
       throw new Error(error);
    }
  }
);

export const getElementDetails = createAsyncThunk(
  "Reports/getElementDetails",
  async (objIds) => {
    try {
      let {
        orgId,
        cloud,
        granularity,
        compareTo,
        serviceCategory,
        elementType,
      } = objIds;
      let url = config.GET_ELEMENT_DETAILS.replace("#org-id#", orgId)
        .replace("#cloud-name#", cloud)
        .replace("#granularity#", granularity)
        .replace("#compare-to#", compareTo)
        .replace("#service-category#", serviceCategory)
        .replace("#element-type#", elementType);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
       throw new Error(error);
    }
  }
);

export const getCostTopAccountsDetails = createAsyncThunk(
  "Reports/getCostTopAccountsDetails",
  async (param) => {
    try {
      const response = await postLoginService.get(
        config.GET_COST_TOP_ACCOUNTS_DETAILS.replace("#org-id#", param.orgId),
        { params: param.params }
      );
      return response;
    } catch (error) {
       throw new Error(error);
    }
  }
);

export const getCostTopAccountsByAccountId = createAsyncThunk(
  "Reports/getCostTopAccountsByAccountId",
  async (param) => {
    try {
      const response = await postLoginService.get(
        config.GET_TOP_ACCOUNTS_BY_ACCOUNT_ID.replace("#org-id#", param.orgId),
        { params: param.params }
      );
      return response;
    } catch (error) {
       throw new Error(error);
    }
  }
);

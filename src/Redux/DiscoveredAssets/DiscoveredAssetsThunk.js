import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getDiscoveredAssets = createAsyncThunk(
  "discoveredAssets/getDiscoveredAssets",
  async (params) => {
    let { orgId, filterFlag, landingZoneId } = params;

    let url = config.GET_DISCOVERED_ASSETS.replace("#org-id#", orgId)
      .replace("#filter-flag#", filterFlag)
      .replace("#landing-zone-id#", landingZoneId);
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

export const getEventsHistory = createAsyncThunk(
  "discoveredAssets/getEventsHistory",
  async (params) => {
    let { instanceId, landingZoneId } = params;

    let url = config.GET_EVENTS_HISTORY.replace(
      "#instance-id#",
      instanceId
    ).replace("#landing-zone-id#", landingZoneId);

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getLandingZoneSearch = createAsyncThunk(
  "discoveredAssets/getLandingZoneSearch",
  async (params) => {
    let { orgId } = params;

    let url = config.GET_LANDINGZONE_SEARCH.replace("#org-id#", orgId);

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAlarmList = createAsyncThunk(
  "discoveredAssets/getAlarmList",
  async (params) => {
    let { elementType, instanceId, landingZoneId } = params;

    let url = config.GET_ALARM_LIST.replace("#element-type#", elementType)
      .replace("#instance-id#", instanceId)
      .replace("#landing-zone-id#", landingZoneId);

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

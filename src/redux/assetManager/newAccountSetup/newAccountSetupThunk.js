import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";

export const createNewOU = createAsyncThunk(
  "organizationalUnitThunk/createNewOU",
  async (data) => {
    const url = config.DEPARTMENTS;
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${url}`, options);
    if (response.ok) {
      const createOuRes = await response.json();
      return { createOuRes };
    } else {
      return Promise.reject(response.status);
    }
  }
);

export const getOrganizationalUnits = createAsyncThunk(
  "organizationalUnitThunk/getAll",
  async () => {
    const url = config.GET_ALL_ORGS;
    const response = await fetch(`${url}`);
    if (response.ok) {
      const allOrgs = await response.json();
      return { allOrgs };
    } else {
      return Promise.reject(response.status);
    }
  }
);

export const addCloudEnv = createAsyncThunk(
  "organizationalUnitThunk/addCloundEnv",
  async (data) => {
    const url = config.ADD_CLOUD_ENV;
    const options = {
      method: "POST",
      body: data,
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const response = await response.json();
      return { response };
    } else {
      return Promise.reject(response.status);
    }
  }
);

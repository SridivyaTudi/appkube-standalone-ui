import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "views/app-views/config";
import axios from "axios";

export const organizationsAsyncThunk = createAsyncThunk(
  "organizations/getOrgsAsync",
  async () => {
    try {
      const response = await axios.get(`${config.GET_ALL_ORG_WISE_DEPARTMENTS}`);
      const allOrgs = response.data;
      return allOrgs;
    } catch (error) {
      console.log(error);
    }
  }
);

import { configureStore } from "@reduxjs/toolkit";
import environmentReducer from "redux/environments/environmentsSlice";
import organizationsReducer from "redux/organization/organizationSlice";
import newAccountReducer from "redux/newAccountSetup/newAccountSetupSlice";
import authReducer from "redux/auth/authSlice";
import environmentDataReducer from "redux/environmentData/environmentDataSlice";
import dashboardReducer from "redux/dashboard/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    environments: environmentReducer,
    organization: organizationsReducer,
    newAccountSetup: newAccountReducer,
    environmentData: environmentDataReducer,
    dashboard: dashboardReducer,
  },
});

export default store;

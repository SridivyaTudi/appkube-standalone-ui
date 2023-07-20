import { configureStore } from "@reduxjs/toolkit";
import environmentReducer from "redux/Environments/environmentsSlice";
import organizationsReducer from "redux/Organization/organizationSlice";
import newAccountReducer from "redux/NewAccountSetup/newAccountSetupSlice";
import authReducer from "redux/Auth/authSlice";
import environmentDataReducer from "redux/EnvironmentData/environmentDataSlice";
import dashboardReducer from "redux/Dashboard/dashboardSlice";
import settingsReducer from "redux/Settings/settingsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    environments: environmentReducer,
    organization: organizationsReducer,
    newAccountSetup: newAccountReducer,
    environmentData: environmentDataReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer
  },
});

export default store;

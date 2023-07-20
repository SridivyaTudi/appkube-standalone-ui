import { configureStore } from "@reduxjs/toolkit";
import environmentReducer from "Redux/Environments/EnvironmentsSlice";
import organizationsReducer from "Redux/Organization/OrganizationSlice";
import newAccountReducer from "Redux/NewAccountSetup/NewAccountSetupSlice";
import authReducer from "Redux/Auth/AuthSlice";
import environmentDataReducer from "Redux/EnvironmentData/EnvironmentDataSlice";
import dashboardReducer from "Redux/Dashboard/DashboardSlice";
import settingsReducer from "Redux/Settings/SettingsSlice";

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

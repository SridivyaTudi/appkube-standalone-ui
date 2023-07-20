import { configureStore } from "@reduxjs/toolkit";
import environmentReducer from "Redux/Environments/environmentsSlice";
import organizationsReducer from "Redux/Organization/organizationSlice";
import newAccountReducer from "Redux/NewAccountSetup/newAccountSetupSlice";
import authReducer from "Redux/Auth/authSlice";
import environmentDataReducer from "Redux/EnvironmentData/environmentDataSlice";
import dashboardReducer from "Redux/Dashboard/dashboardSlice";
import settingsReducer from "Redux/Settings/settingsSlice";

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

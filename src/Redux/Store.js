import { configureStore } from "@reduxjs/toolkit";
import environmentReducer from "Redux/Environments/EnvironmentsSlice";
import organizationsReducer from "Redux/Organization/OrganizationSlice";
import newAccountReducer from "Redux/NewAccountSetup/NewAccountSetupSlice";
import authReducer from "Redux/Auth/AuthSlice";
import environmentDataReducer from "Redux/EnvironmentData/EnvironmentDataSlice";
import dashboardReducer from "Redux/Dashboard/DashboardSlice";
import settingsReducer from "Redux/Settings/SettingsSlice";
import associateAppReducer from "Redux/AssociateApp/AssociateAppSlice";
import ServiceViewTopologyReducer from "Redux/ServiceViewTopology/ServiceViewTopologySlice";
import BIMapping from "Redux/BIMapping/BIMappingSlice";
import Reports from "Redux/Reports/ReportsSlice";
import DiscoveredAssetsReducer from "Redux/DiscoveredAssets/DiscoveredAssetsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    environments: environmentReducer,
    organization: organizationsReducer,
    newAccountSetup: newAccountReducer,
    environmentData: environmentDataReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
    associateApp: associateAppReducer,
    serviceTopology: ServiceViewTopologyReducer,
    biMapping: BIMapping,
    reports: Reports,
    discoveredAssets: DiscoveredAssetsReducer,
  },
});

export default store;

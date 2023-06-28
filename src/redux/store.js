import { configureStore } from "@reduxjs/toolkit";
import environmentReducer from "./assetManager/environments/environmentsSlice";
import organizationsReducer from "./assetManager/organization/organizationSlice";
import newAccountReducer from "./assetManager/newAccountSetup/newAccountSetupSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    environments: environmentReducer,
    organization: organizationsReducer,
    newAccountSetup: newAccountReducer,
  },
});

export default store;

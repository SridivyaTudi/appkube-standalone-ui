import { configureStore } from "@reduxjs/toolkit";
import environmentReducer from "redux/assetManager/environments/environmentsSlice";
import organizationsReducer from "redux/assetManager/organization/organizationSlice";
import newAccountReducer from "redux/assetManager/newAccountSetup/newAccountSetupSlice";
import authReducer from "redux/auth/authSlice";
import environmentDataReducer from "redux/assetManager/environments/environmentData/environmentDataSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    environments: environmentReducer,
    organization: organizationsReducer,
    newAccountSetup: newAccountReducer,
    environmentData:environmentDataReducer
  },
});

export default store;

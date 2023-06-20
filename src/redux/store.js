import { configureStore } from "@reduxjs/toolkit";
import environmentReducer from "./assetManager/environments/environmentsSlice";
import organizationsReducer from "./assetManager/organization/organizationSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    environments: environmentReducer,
    organization: organizationsReducer,
    auth: authReducer,
  },
});

export default store;

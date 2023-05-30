import { configureStore } from "@reduxjs/toolkit";
import environmentsReducer from "./environments/environmentsSlice";
import organizationsReducer from "./organization/organizationSlice";

export default configureStore({
  reducer: {
    environments: environmentsReducer,
    organizations: organizationsReducer,
  },
});

import React, { useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "Configs/AppConfig";
import Signin from "Views/AuthViews/SignIn";
import SignUp from "Views/AuthViews/SignUp";
import ForgetPassword from "Views/AuthViews/ForgetPassword";
import ResetPassword from "./AuthViews/ResetPassword";
import TopBar from "Components/TopBar";
import SideBar from "Components/SideBar";
import Environments from "Views/AppViews/Environments";
import Dashboard from "Views/AppViews/Dashboard";
import NewAccountSetup from "Views/AppViews/Environments/NewAccountSetup";
import EnvironmentList from "Views/AppViews/Environments/EnvironmentList";
import ProcurifyLogisticsTools from "Views/AppViews/Environments/EnvironmentList/ProcurifyLogisticsTools";
import DeployProject from "Views/AppViews/Environments/EnvironmentList/DeployProject";
import ConfigureTopology from "Views/AppViews/Environments/EnvironmentList/ConfigureTopology";
import CreateScratch from "./AppViews/Environments/EnvironmentList/CreateScratch";
import SelectYourTemplate from "./AppViews/SelectYourTemplate";
import Setting from "./AppViews/Setting";
import SetTransitions from "./AppViews/Setting/SetTransitions";
import EcsCluster from "./AppViews/Environments/EnvironmentList/DiscoveredAssets/EcsCluster";
import AssociateChartApp from "./AppViews/Environments/EnvironmentList/DiscoveredAssets/AssociateChartApp";
import DisasterRecovery from "./AppViews/Environments/EnvironmentList/DisasterRecovery";
import ApplicationStatusDashboard from "./AppViews/Dashboard/ApplicationStatusDashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "Utils";
import titles from "./PathTitles.json";
import Error from "./AppViews/Error";

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export const Views = (props) => {
  const title = props.router.location.pathname.split("/").pop();
  useEffect(() => {
    document.title = titles[title];
  });

  const user = getCurrentUser();
  if (user) {
    return (
      <div className="standalone-container">
        <TopBar />
        <SideBar />
        {/* APP LAYOUT ROUTES */}
        <Routes>
          <Route
            path={`${APP_PREFIX_PATH}`}
            element={<Navigate to={`${APP_PREFIX_PATH}/dashboard`} />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments`}
            element={<Environments />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/environmentlist`}
            element={<EnvironmentList />}
          />
          <Route
            path="*"
            element={<Navigate to={`${APP_PREFIX_PATH}/dashboard`} />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/*`}
            element={<Navigate to={`${APP_PREFIX_PATH}/dashboard`} />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/dashboard`}
            element={<Dashboard />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/aws/newaccountsetup`}
            element={<NewAccountSetup />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/azure/newaccountsetup`}
            element={<NewAccountSetup />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/gcp/newaccountsetup`}
            element={<NewAccountSetup />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/kubernetes/newaccountsetup`}
            element={<NewAccountSetup />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/procurifylogisticstools`}
            element={<ProcurifyLogisticsTools />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/deployproject`}
            element={<DeployProject />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/configuretopology`}
            element={<ConfigureTopology />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/createscratch`}
            element={<CreateScratch />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/SelectYourTemplate`}
            element={<SelectYourTemplate />}
          />
          <Route path={`${APP_PREFIX_PATH}/setting`} element={<Setting />} />
          <Route
            path={`${APP_PREFIX_PATH}/settransitions`}
            element={<SetTransitions />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/ecscluster`}
            element={<EcsCluster />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/associatechartapp`}
            element={<AssociateChartApp />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
            element={<DisasterRecovery />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/application-status-dashboard`}
            element={<ApplicationStatusDashboard />}
          />
          <Route path={`/error`} element={<Error />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
  } else {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          {/* AUTH LAYOUT ROUTES */}
          <Route
            path={`${AUTH_PREFIX_PATH}/*`}
            element={<Navigate to={`${AUTH_PREFIX_PATH}/signin`} />}
          />
          <Route path={`${AUTH_PREFIX_PATH}/signin`} element={<Signin />} />
          <Route path={`${AUTH_PREFIX_PATH}/signup`} element={<SignUp />} />
          <Route
            path={`${AUTH_PREFIX_PATH}/forgetpassword`}
            element={<ForgetPassword />}
          />
          <Route
            path={`${AUTH_PREFIX_PATH}/resetpassword`}
            element={<ResetPassword />}
          />
          <Route path="*" element={<Navigate to={`${AUTH_PREFIX_PATH}`} />} />
          <Route path={`/error`} element={<Error />} />
        </Routes>
      </>
    );
  }
};

export default withRouter(Views);

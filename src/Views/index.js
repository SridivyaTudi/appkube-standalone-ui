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
import SetTransitions from "./AppViews/Setting/Permissions/SetTransitions";
import EcsCluster from "./AppViews/Environments/EnvironmentList/DiscoveredAssets/EcsCluster";
import AssociateChartApp from "./AppViews/Environments/EnvironmentList/DiscoveredAssets/AssociateChartApp";
import ThreeTierTopology from "./AppViews/Environments/EnvironmentList/ThreeTierTopology";
import ApplicationStatusDashboard from "./AppViews/Dashboard/ApplicationStatusDashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  getCurrentUser,
  setCloudWiseLandingZoneCount,
  LOCAL_STORAGE_CONSTANTS,
} from "Utils";
import titles from "./PathTitles.json";
import Error from "./AppViews/Error";
import SOATopology from "Views/AppViews/Environments/EnvironmentList/SOATopology";
import ReportsOld from "./AppViews/Reports";
import RoleDetails from "./AppViews/Setting/Permissions/RoleDetails";
import GroupDetails from "Views/AppViews/Setting/Permissions/GroupDetails";
import AddUsers from "./AppViews/Setting/Permissions/AddUsers";
import AddRole from "./AppViews/Setting/Permissions/AddRole";
import CreateGroup from "./AppViews/Setting/Permissions/CreateGroup";
import UserProfile from "./AppViews/Setting/Permissions/UserProfile";
import CreatePolicy from "./AppViews/Setting/Permissions/CreatePolicy";
import BIMapping from "./AppViews/BIMapping";
import ProductCategory from "./AppViews/BIMapping/ProductCategory";
import Tier from "./AppViews/BIMapping/Tier";
import Soa from "./AppViews/BIMapping/Soa";
import AddDepartment from "./AppViews/BIMapping/AddDepartment";
import AddProduct from "./AppViews/BIMapping/AddProduct";
import DiscoveredAssets from "./AppViews/DiscoveredAssets";
import LoginEvents from "./AppViews/DiscoveredAssets/LoginEvents";
import Eventhistory from "./AppViews/DiscoveredAssets/Eventhistory";
import OverviewDashboard from "./AppViews/NewReports/OverviewDashboard";
import SpendOverview from "./AppViews/NewReports/OverviewDashboard/SpendOverview";
import { getCloudWiseLandingZoneCount } from "Redux/Environments/EnvironmentsThunk";
import status from "Redux/Constants/CommonDS";
import { useDispatch, useSelector } from "react-redux";
import TopUsedServices from "./AppViews/NewReports/OverviewDashboard/TopUsedServices";
import SpendingTrend from "./AppViews/NewReports/OverviewDashboard/SpendingTrend";
import CostTopAccounts from "./AppViews/NewReports/OverviewDashboard/CostTopAccounts";
import PotentialSavings from "./AppViews/NewReports/OverviewDashboard/PotentialSavings";
import BudgetDashboard from "./AppViews/NewReports/BudgetDashboard";
import ChargebackDashboard from "./AppViews/NewReports/ChargebackDashboard";
import CentralDashboard from "./AppViews/NewReports/CentralDashboard";
import ItDepartment from "./AppViews/NewReports/ChargebackDashboard/ItDepartment";
import CreateInvoice from "./AppViews/NewReports/ChargebackDashboard/CreateInvoice";
import SpendOverviewDetails from "Views/AppViews/NewReports/OverviewDashboard/SpendOverviewDetails";
import TopUsedServicesDetails from "Views/AppViews/NewReports/OverviewDashboard/TopUsedServicesDetails";

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
  const location = useLocation();
  let disptch = useDispatch();
  let cloudWiseLandingZoneCount = useSelector(
    (state) => state.environments.cloudWiseLandingZoneCount
  );

  useEffect(() => {
    setTitle();
  });

  const user = getCurrentUser();

  useEffect(() => {
    let isExistLandingZoneCounts = localStorage.getItem(
      LOCAL_STORAGE_CONSTANTS.CLOUD_WISE_LANDINGZONE_COUNT
    );
    if (user && !isExistLandingZoneCounts) {
      disptch(getCloudWiseLandingZoneCount());
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (cloudWiseLandingZoneCount.status === status.SUCCESS) {
        let landingZoneCounts = cloudWiseLandingZoneCount.data;
        if (landingZoneCounts?.length) {
          setCloudWiseLandingZoneCount(landingZoneCounts);
        }
      }
    }
  }, [cloudWiseLandingZoneCount]);

  const setTitle = () => {
    if (location) {
      let locationToArr = location.pathname.split("/");

      for (
        let locationIndex = locationToArr.length - 1;
        locationIndex >= 0;
        locationIndex--
      ) {
        const value = locationToArr[locationIndex];

        if (titles[value]) {
          document.title = titles[value];
          break;
        }
      }
    }
  };
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
            path={`${APP_PREFIX_PATH}/setting/settransitions`}
            element={<SetTransitions />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/setting/role-details/:id`}
            element={<RoleDetails />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/setting/group-details/:id`}
            element={<GroupDetails />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/setting/group-details/:id/add-users`}
            element={<AddUsers />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/setting/group-details/:id/add-role`}
            element={<AddRole />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/setting/create-group`}
            element={<CreateGroup />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/setting/user-profile/:id`}
            element={<UserProfile />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/setting/create-policy`}
            element={<CreatePolicy />}
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
            path={`${APP_PREFIX_PATH}/environments/3tier/topology`}
            element={<ThreeTierTopology />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/environments/soa/topology`}
            element={<SOATopology />}
          />
          {/* <Route
            path={`${APP_PREFIX_PATH}/environments/soa/topologyswitch`}
            element={<SOATopologySwitch />}
          /> */}
          <Route
            path={`${APP_PREFIX_PATH}/application-status-dashboard`}
            element={<ApplicationStatusDashboard />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/reports-old`}
            element={<ReportsOld />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard`}
            element={<OverviewDashboard />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview`}
            element={<SpendOverview />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/:name`}
            element={<SpendOverviewDetails />}
          />

          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services`}
            element={<TopUsedServices />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/:name`}
            element={<TopUsedServicesDetails />}
          />

          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spending-trend`}
            element={<SpendingTrend />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/cost-top-accounts`}
            element={<CostTopAccounts />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/potential-sevings`}
            element={<PotentialSavings />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/budget-dashboard`}
            element={<BudgetDashboard />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard`}
            element={<ChargebackDashboard />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard/it-department`}
            element={<ItDepartment />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard/create-invoice`}
            element={<CreateInvoice />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/central-dashboard`}
            element={<CentralDashboard />}
          />
          <Route path={`${APP_PREFIX_PATH}/bim`} element={<BIMapping />} />
          <Route
            path={`${APP_PREFIX_PATH}/bim/add-product/product-category`}
            element={<ProductCategory />}
          />
          <Route path={`${APP_PREFIX_PATH}/bim/tier`} element={<Tier />} />
          <Route path={`${APP_PREFIX_PATH}/bim/soa`} element={<Soa />} />
          <Route
            path={`${APP_PREFIX_PATH}/bim/create-department`}
            element={<AddDepartment />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/bim/add-product`}
            element={<AddProduct />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/discovered-assets`}
            element={<DiscoveredAssets />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/discovered-assets/login-events`}
            element={<LoginEvents />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/discovered-assets/events-history`}
            element={<Eventhistory />}
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

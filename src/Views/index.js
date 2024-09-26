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
import { PRODUCT_CATEGORY_ENUM, getCurrentUser } from "Utils";
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
import Lambda from "./AppViews/BIMapping/Lambda";
import AddDepartment from "./AppViews/BIMapping/AddDepartment";
import AddProduct from "./AppViews/BIMapping/AddProduct";
import DiscoveredAssets from "./AppViews/DiscoveredAssets";
import LoginEvents from "./AppViews/DiscoveredAssets/LoginEvents";
import Eventhistory from "./AppViews/DiscoveredAssets/Eventhistory";
import OverviewDashboard from "./AppViews/NewReports/OverviewDashboard";
import SpendOverview from "./AppViews/NewReports/OverviewDashboard/SpendOverview";
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
import CostCentralTopInternal from "./AppViews/NewReports/CentralDashboard/CostCentralTopInternal";
import CostCentralServicesInternal from "./AppViews/NewReports/CentralDashboard/CostCentralServicesInternal";
import CostCentralServicesInternalDetails from "./AppViews/NewReports/CentralDashboard/CostCentralServicesInternalDetails";
import ItDepartmentDetails from "./AppViews/NewReports/ChargebackDashboard/ItDepartmentDetails";
import HistoryDepartments from "./AppViews/NewReports/ChargebackDashboard/HistoryDepartments";
import BudgetAccount from "./AppViews/NewReports/BudgetDashboard/BudgetAccount";
import BudgetServicesAccount from "./AppViews/NewReports/BudgetDashboard/BudgetServicesAccount";
import BudgetAccountDetails from "./AppViews/NewReports/BudgetDashboard/BudgetAccountDetails";
import BudgetProducts from "./AppViews/NewReports/BudgetDashboard/BudgetProducts";
import BudgetDepartments from "./AppViews/NewReports/BudgetDashboard/BudgetDepartments";
import TopAccounts from "./AppViews/NewReports/OverviewDashboard/TopAccounts";
import Alerts from "./AppViews/Alerts";
import MonitorAlerts from "./AppViews/Alerts/MonitorAlerts";
import AlertPercentage from "./AppViews/Alerts/AlertPercentage";
import AlertRules from "./AppViews/Alerts/AlertRules";
import NewAlertRules from "./AppViews/Alerts/NewAlertRules";
import AlarmList from "./AppViews/DiscoveredAssets/AlarmList";
import LLM from "./AppViews/LLM";

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

  useEffect(() => {
    setTitle();
  });

  const user = getCurrentUser();

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
            path={`${APP_PREFIX_PATH}/llm`}
            element={<LLM />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments`}
            element={<Environments />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/environmentlist`}
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
            path={`${APP_PREFIX_PATH}/assets/environments/aws/newaccountsetup/:departmentId?`}
            element={<NewAccountSetup />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/azure/newaccountsetup`}
            element={<NewAccountSetup />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/gcp/newaccountsetup`}
            element={<NewAccountSetup />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/kubernetes/newaccountsetup`}
            element={<NewAccountSetup />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/procurifylogisticstools`}
            element={<ProcurifyLogisticsTools />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/deployproject`}
            element={<DeployProject />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/configuretopology`}
            element={<ConfigureTopology />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/createscratch`}
            element={<CreateScratch />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/SelectYourTemplate`}
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
            path={`${APP_PREFIX_PATH}/assets/environments/ecscluster`}
            element={<EcsCluster />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/associatechartapp`}
            element={<AssociateChartApp />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/3tier/topology`}
            element={<ThreeTierTopology />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/environments/soa/topology`}
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
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/:name/:page`}
            element={<SpendOverviewDetails />}
          />

          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services`}
            element={<TopUsedServices />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/:name`}
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
            path={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/cost-top-accounts/:accountId`}
            element={<TopAccounts />}
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
            path={`${APP_PREFIX_PATH}/new-reports/budget-dashboard/budget-account`}
            element={<BudgetAccount />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/budget-dashboard/budget-services-account`}
            element={<BudgetServicesAccount />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/budget-dashboard/budget-services-account/budget-account-details`}
            element={<BudgetAccountDetails />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/budget-dashboard/budget-products`}
            element={<BudgetProducts />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/budget-dashboard/budget-depanrtments`}
            element={<BudgetDepartments />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard`}
            element={<ChargebackDashboard />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard/department`}
            element={<ItDepartment />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard/department/department-details`}
            element={<ItDepartmentDetails />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard/history-departments`}
            element={<HistoryDepartments />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard/create-invoice`}
            element={<CreateInvoice />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/central-dashboard`}
            element={<CentralDashboard />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/central-dashboard/cost-central-top-internal`}
            element={<CostCentralTopInternal />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal`}
            element={<CostCentralServicesInternal />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal/cost-central-services-internal-details`}
            element={<CostCentralServicesInternalDetails />}
          />

          <Route path={`${APP_PREFIX_PATH}/bim`} element={<BIMapping />} />
          <Route
            path={`${APP_PREFIX_PATH}/bim/add-product/:name?/:id/:landingZoneId/:cloud/product-category`}
            element={<ProductCategory />}
          />

          <Route
            path={`${APP_PREFIX_PATH}/bim/add-product/:name?/:id/:landingZoneId/:cloud/product-category/${PRODUCT_CATEGORY_ENUM.THREE_TIER.toLowerCase().replace(
              " ",
              "-"
            )}`}
            element={<Tier />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/bim/add-product/:name?/:id/:landingZoneId/:cloud/product-category/soa`}
            element={<Soa />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/bim/add-product/:name?/:id/:landingZoneId/:cloud/product-category/${PRODUCT_CATEGORY_ENUM.LAMBDA}`}
            element={<Lambda />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/bim/create-department`}
            element={<AddDepartment />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/bim/add-product/:name?/:id/:landingZoneId/:cloud`}
            element={<AddProduct />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/discovered-assets`}
            element={<DiscoveredAssets />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/discovered-assets/login-events`}
            element={<LoginEvents />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/discovered-assets/events-history/:instanceId/:landingZoneId`}
            element={<Eventhistory />}
          />
          <Route path={`${APP_PREFIX_PATH}/alerts`} element={<Alerts />} />
          <Route
            path={`${APP_PREFIX_PATH}/alerts/monitor-alerts`}
            element={<MonitorAlerts />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/alerts/alert-percentage`}
            element={<AlertPercentage />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/alerts/alert-rules`}
            element={<AlertRules />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/alerts/new-alert-rules`}
            element={<NewAlertRules />}
          />
          <Route
            path={`${APP_PREFIX_PATH}/assets/discovered-assets/alarms/:instanceId/:landingZoneId`}
            element={<AlarmList />}
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

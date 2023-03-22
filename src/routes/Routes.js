import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Overview from '../pages/overview';

//***** Perfmanager *****//
import Dashboard from '../perfmanager/pages/dashboard';
import Catalog from '../perfmanager/pages/catalog';
import Collection from '../perfmanager/pages/collection';
import Library from '../perfmanager/pages/library';
import CollectionView from '../perfmanager/pages/collectionView';
import CatalogueManagement from '../perfmanager/pages/catalogueManagement';

//***** Assetmanager *****//
import Environments from '../assetmanager/pages/environments';
import AmazonServices from '../assetmanager/pages/amazonservices';
import Kubernetes from '../assetmanager/pages/kubernetes';
import StorageDetails from '../assetmanager/pages/StorageDetails';
import AccountSetup from '../assetmanager/pages/accountsetup';
import DepartmentWiseProducts from '../assetmanager/pages/departmentWiseProducts';
import DepartmentWiseCharts from '../assetmanager/pages/departmentWiseProducts/departmentChart';
import ProductWiseCost from '../assetmanager/pages/departmentWiseProducts/ProductWiseCost';
import ProductWiseServicesSla from '../assetmanager/pages/productWiseServicesSla';
import AddDatasource from '../assetmanager/pages/addDatasource';
import AddDatasouceCredential from '../assetmanager/pages/addDatasource/addDatasouceCredential';
import ExploreDataSourceDetail from '../assetmanager/pages/addDatasource/exploreDataSourceDetail';
import AddDataSourceProduct from '../assetmanager/pages/addDatasource/addDatasourceProduct';
import AddDatasourceInputs from '../assetmanager/pages/addDatasource/addDatasourceInputs';

//***** Alertmanager *****//
import MonitorAlerts from '../alertmanager/pages/monitorAlerts';
import AlertRuleBuilder from '../alertmanager/pages/alertRuleBuilder';
import ManageAlertRule from '../alertmanager/pages/manageAlertRule';
import AllAlerts from '../alertmanager/pages/allAlerts';
import Rules from '../alertmanager/pages/rules';
import CreateRule from '../alertmanager/pages/createRule';
import AllTickets from '../alertmanager/pages/allTickets';
import ScriptEditor from '../alertmanager/pages/scriptEditor';
import SearchAlert from '../alertmanager/pages/searchAlert';

//***** Custom Manage Dashboards *****//
import ManageDashboards from '../custom-manage-dashboards';
import ImportDashboard from '../custom-manage-dashboards/import-dashboard';
//***** analytics *****//
import Analytics from '../analytics';
import AddNewView from '../analytics/addNewView';



//***** EMS Reporting *****//
import EmsDashboard from '../emsReporting/pages/Dashboard';

//***** compliancemanager *****//
import ComplianDashboard from '../compliancemanager/pages/dashboard';
import ComplianceRulesets from '../compliancemanager/pages/ComplianceRulesets';
import ComplianceRemediation from '../compliancemanager/pages/complianceRemediation';
import CompliancePolicy from '../compliancemanager/pages/compliancePolicy';
import ComplianceHistory from '../compliancemanager/pages/complianceHistory';
import ComplianceExclusions from '../compliancemanager/pages/complianceExclusions';
import ComplianceAssessmentHistory from '../compliancemanager/pages/complianceAssessmentHistory';
import ClearHistory from '../compliancemanager/pages/clearHistory';
import ApiGateway from '../compliancemanager/pages/apiGateway';
import Script from '../compliancemanager/pages/script';
import Result from '../compliancemanager/pages/result';
import GslBuilder from '../compliancemanager/pages/gslBuilder';
import EditorGslBuilder from '../compliancemanager/pages/editorGslBuilder';

//***** workflow-engine *****//
import WorkflowDashboard from '../workflow-engine/pages/dashboard';
import CreateUsecase from '../workflow-engine/pages/createUsecase';
import MatrixView from '../workflow-engine/pages/matrixView';
import ProcurementDetail from '../workflow-engine/pages/procurement';
import ProjectOverView from '../workflow-engine/pages/projectOverView';
import ProjectWise from '../workflow-engine/pages/projectWise';
import ResourceWiseViewAllTasks from '../workflow-engine/pages/resourceWiseViewAllTasks';

//***** Logmanager *****//
import LogDashboard from '../logmanager/pages/dashboard';
import ContentsPacks from '../logmanager/pages/contentsPacks';
import Input from '../logmanager/pages/input';

//***** Servicedesk *****//
import ServicedeskDashboard from '../servicedesk/pages/dashboard';
import Tickets from '../servicedesk/pages/tickets';
import AllContacts from '../servicedesk/pages/allContacts';
import OpenTickets from '../servicedesk/pages/openTickets';
import AllCompanies from '../servicedesk/pages/allCompanies';
import TicketsDetails from '../servicedesk/pages/ticketsDetails';
import Reports from '../servicedesk/pages/reports';
import ReportHelpdesh from '../servicedesk/pages/reportHelpdesh';
import Charts from '../servicedesk/pages/charts';

//***** AppkubeCloudDatasource *****//
import DashboardPanelMetricBuilder from "../appkubeCloudDatasource/pages/dashboardPanelMetricBuilder"


export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      {/***** Perfmanager *****/}
      <Route path="/perfmanager/pages/managedashboard" element={<Dashboard />} />
      <Route path="/perfmanager/pages/catalog" element={<Catalog />} />
      <Route path="/perfmanager/pages/collection" element={<Collection />} />
      <Route path="/perfmanager/pages/library" element={<Library />} />
      <Route path="/perfmanager/pages/collectionview" element={<CollectionView />} />
      <Route path="/perfmanager/pages/cataloguemanagement" element={<CatalogueManagement />} />

      {/***** Assetmanager *****/}
      <Route path="/assetmanager/pages/environments" element={<Environments />} />
      <Route path="/assetmanager/pages/amazonservices" element={<AmazonServices />} />
      <Route path="/assetmanager/pages/kubernetes" element={<Kubernetes />} />
      <Route path="/assetmanager/pages/storage-details" element={<StorageDetails />} />
      <Route path="/assetmanager/pages/accountsetup" element={<AccountSetup />} />
      <Route path="/assetmanager/pages/department-wise-products" element={<DepartmentWiseProducts />} />
      <Route path="/assetmanager/pages/department-wise-charts" element={<DepartmentWiseCharts />} />
      <Route path="/assetmanager/pages/product-wise-cost" element={<ProductWiseCost />} />
      <Route path="/assetmanager/pages/product-wise-services-sla" element={<ProductWiseServicesSla />} />
      <Route path="/assetmanager/pages/add-data-source" element={<AddDatasource />} />
      <Route path="/assetmanager/pages/add-datasource-credential" element={<AddDatasouceCredential />} />
      <Route path="/assetmanager/pages/explore-datasource" element={<ExploreDataSourceDetail />} />
      <Route path="/assetmanager/pages/add-data-source-product" element={<AddDataSourceProduct />} />
      <Route path="/assetmanager/pages/add-data-source-inputs" element={<AddDatasourceInputs />} />

      {/***** Alertmanager *****/}
      <Route path="/alertmanager/pages/monitor-alerts" element={<MonitorAlerts />} />
      <Route path="/alertmanager/pages/alert-rule-builder" element={<AlertRuleBuilder />} />
      <Route path="/alertmanager/pages/manage-alert-rule" element={<ManageAlertRule />} />
      <Route path="/alertmanager/pages/all-alerts" element={<AllAlerts />} />
      <Route path="/alertmanager/pages/rules" element={<Rules />} />
      <Route path="/alertmanager/pages/create-rule" element={<CreateRule />} />
      <Route path="/alertmanager/pages/all-tickets" element={<AllTickets />} />
      <Route path="/alertmanager/pages/script-editor" element={<ScriptEditor />} />
      <Route path="/alertmanager/pages/search-alert" element={<SearchAlert />} />

      {/***** Custom Manage Dashboards *****/}
      <Route path="/managedashboards" element={<ManageDashboards />} />
      <Route path="/custom-manage-dashboards/import-dashboard" element={<ImportDashboard />} />
      <Route path="" />

      {/***** analytics *****/}
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/analytics/addNewView" element={<AddNewView />} />

      {/***** EMS Reporting *****/}
      <Route path="/emsReporting/pages/home" element={<EmsDashboard />} />

      {/***** compliancemanager *****/}
      <Route path="/compliancemanager/pages/dashboard" element={<ComplianDashboard />} />
      <Route path="/compliancemanager/pages/complianceRulesets" element={<ComplianceRulesets />} />
      <Route path="/compliancemanager/pages/complianceRemediation" element={<ComplianceRemediation />} />
      <Route path="/compliancemanager/pages/compliancePolicy" element={<CompliancePolicy />} />
      <Route path="/compliancemanager/pages/complianceHistory" element={<ComplianceHistory />} />
      <Route path="/compliancemanager/pages/complianceExclusions" element={<ComplianceExclusions />} />
      <Route path="/compliancemanager/pages/complianceAssessmentHistory" element={<ComplianceAssessmentHistory />} />
      <Route path="/compliancemanager/pages/clearHistory" element={<ClearHistory />} />
      <Route path="/compliancemanager/pages/apiGateway" element={<ApiGateway />} />
      <Route path="/compliancemanager/pages/script" element={<Script />} />
      <Route path="/compliancemanager/pages/result" element={<Result />} />
      <Route path="/compliancemanager/pages/gslBuilder" element={<GslBuilder />} />
      <Route path="/compliancemanager/pages/editorGslBuilder" element={<EditorGslBuilder />} />

      {/***** workflow-engine *****/}
      <Route path="/workflow-engine/pages/dashboard" element={<WorkflowDashboard />} />
      <Route path="/workflow-engine/pages/createUsecase" element={<CreateUsecase />} />
      <Route path="/workflow-engine/pages/matrixView" element={<MatrixView />} />
      <Route path="/workflow-engine/pages/procurement" element={<ProcurementDetail />} />
      <Route path="/workflow-engine/pages/projectOverView" element={<ProjectOverView />} />
      <Route path="/workflow-engine/pages/projectWise" element={<ProjectWise />} />
      <Route path="/workflow-engine/pages/resourceWiseViewAllTasks" element={<ResourceWiseViewAllTasks />} />

      {/***** Logmanager *****/}
      <Route path="/logmanager/pages/dashboard" element={<LogDashboard />} />
      <Route path="/logmanager/pages/contentspacks" element={<ContentsPacks />} />
      <Route path="/logmanager/pages/input" element={<Input />} />

       {/***** Servicedesk *****/}
       <Route path="/servicedesk/pages/dashboard" element={<ServicedeskDashboard />} />
       <Route path="/servicedesk/pages/tickets" element={<Tickets />} />
       <Route path="/servicedesk/pages/allContacts" element={<AllContacts />} />
       <Route path="/servicedesk/pages/openTickets" element={<OpenTickets />} />
       <Route path="/servicedesk/pages/allCompanies" element={<AllCompanies />} />
       <Route path="/servicedesk/pages/ticketsDetails" element={<TicketsDetails />} />
       <Route path="/servicedesk/pages/reports" element={<Reports />} />
       <Route path="/servicedesk/pages/reportHelpdesh" element={<ReportHelpdesh />} />
       <Route path="/servicedesk/pages/charts" element={<Charts />} />

       {/***** AppkubeCloudDatasource *****/}
       <Route path="/appkubeCloudDatasource/pages/dashboardPanelMetricBuilder" element={<DashboardPanelMetricBuilder />} />
    </Routes>
  );
};

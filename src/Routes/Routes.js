import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Overview from '../Pages/Overview';

//***** Perfmanager *****//
import Dashboard from '../PerfManager/Pages/Dashboard';
import Catalog from '../PerfManager/Pages/Catalog';
import Collection from '../PerfManager/Pages/Collection';
import Library from '../PerfManager/Pages/Library';
import CollectionView from '../PerfManager/Pages/CollectionView';
import CatalogueManagement from '../PerfManager/Pages/CatalogueManagement';

//***** AssetManager *****//
import Environments from '../AssetManager/Pages/Environments';
import EnvironmentList from '../AssetManager/Pages/EnvironmentList';
import EnvironmentListItem from '../AssetManager/Pages/EnvironmentList/EnvironmentListItem';
import AmazonServices from '../AssetManager/Pages/AmazonServices';
import Kubernetes from '../AssetManager/Pages/Kubernetes';
import StorageDetails from '../AssetManager/Pages/StorageDetails';
import AccountSetup from '../AssetManager/Pages/AccountSetup';
import DepartmentWiseProducts from '../AssetManager/Pages/DepartmentWiseProducts';
import DepartmentWiseCharts from '../AssetManager/Pages/DepartmentWiseProducts/DepartmentChart';
import ProductWiseCost from '../AssetManager/Pages/DepartmentWiseProducts/ProductWiseCost';
import ProductWiseServicesSla from '../AssetManager/Pages/ProductWiseServicesSla';
import AddDatasource from '../AssetManager/Pages/AddDatasource';
import AddDataSourceCredential from '../AssetManager/Pages/AddDatasource/AddDataSouceCredential';
import ExploreDataSourceDetail from '../AssetManager/Pages/AddDatasource/ExploreDataSourceDetail';
import AddDataSourceProduct from '../AssetManager/Pages/AddDatasource/AddDataSourceProduct';
import AddDatasourceInputs from '../AssetManager/Pages/AddDatasource/AddDataSourceInputs';
import DiscoveryWizard from '../AssetManager/Pages/DiscoveryWizard';
import TaggingWizard from '../AssetManager/Pages/TaggingWizard';
import AddTaggingWizard from '../AssetManager/Pages/AddTaggingWizard';

//***** AlertManager *****//
import MonitorAlerts from '../AlertManager/Pages/MonitorAlerts';
import AlertRuleBuilder from '../AlertManager/Pages/AlertRuleBuilder';
import ManageAlertRule from '../AlertManager/Pages/ManageAlertRule';
import AllAlerts from '../AlertManager/Pages/AllAlerts';
import Rules from '../AlertManager/Pages/Rules';
import CreateRule from '../AlertManager/Pages/CreateRule';
import AllTickets from '../AlertManager/Pages/AllTickets';
import ScriptEditor from '../AlertManager/Pages/ScriptEditor';
import SearchAlert from '../AlertManager/Pages/SearchAlert';

//***** Custom Manage Dashboards *****//
import ManageDashboards from '../CustomManageDashboards';
import ImportDashboard from '../CustomManageDashboards/ImportDashboard';
//***** analytics *****//
import Analytics from '../Analytics';
import AddNewView from '../Analytics/AddNewView';

//***** taskManager *****//
import TaskManager from '../TaskManager';
import AllTasks from '../TaskManager/AllTasks';
import CreateDashboard from '../TaskManager/CreateDashboard';

//***** EMS Reporting *****//
import EmsDashboard from '../EmsReporting/Pages/Dashboard';

//***** ComplianceManager *****//
import ComplianDashboard from '../ComplianceManager/Pages/Dashboard';
import ComplianceExclusions from '../ComplianceManager/Pages/ComplianceExclusions';
import ComplianceRulesets from '../ComplianceManager/Pages/ComplianceRuleSets';
import ComplianceRemediation from '../ComplianceManager/Pages/ComplianceRemediation';
import ComplianceAssessmentHistory from '../ComplianceManager/Pages/ComplianceAssessmentHistory';
import CompliancePolicy from '../ComplianceManager/Pages/CompliancePolicy';
import ComplianceHistory from '../ComplianceManager/Pages/ComplianceHistory';
import GslBuilder from '../ComplianceManager/Pages/GslBuilder';
import ApiGateway from '../ComplianceManager/Pages/ApiGateway';
import EditorGslBuilder from '../ComplianceManager/Pages/EditorGslBuilder';
import ClearHistory from '../ComplianceManager/Pages/ClearHistory';
import Script from '../ComplianceManager/Pages/Script';
import Result from '../ComplianceManager/Pages/Result';

//***** WorkflowEngine *****//
import WorkflowDashboard from '../WorkflowEngine/Pages/Dashboard';
import CreateUsecase from '../WorkflowEngine/Pages/CreateUsecase';
import MatrixView from '../WorkflowEngine/Pages/MatrixView';
import ProcurementDetail from '../WorkflowEngine/Pages/Procurement';
import ProjectOverView from '../WorkflowEngine/Pages/ProjectOverView';
import ProjectWise from '../WorkflowEngine/Pages/ProjectWise';
import ResourceWiseViewAllTasks from '../WorkflowEngine/Pages/ResourceWiseViewAllTasks';

//***** Logmanager *****//
import LogDashboard from '../LogManager/Pages/Dashboard';
import ContentsPacks from '../LogManager/Pages/ContentsPacks';
import Input from '../LogManager/Pages/Input';

//***** Servicedesk *****//
import ServicedeskDashboard from '../ServiceDesk/Pages/Dashboard';
import Tickets from '../ServiceDesk/Pages/Tickets';
import AllContacts from '../ServiceDesk/Pages/AllContacts';
import OpenTickets from '../ServiceDesk/Pages/OpenTickets';
import AllCompanies from '../ServiceDesk/Pages/AllCompanies';
import TicketsDetails from '../ServiceDesk/Pages/TicketsDetails';
import Reports from '../ServiceDesk/Pages/Reports';
import ReportHelpdesh from '../ServiceDesk/Pages/ReportHelpdesh';
import Charts from '../ServiceDesk/Pages/Charts';

//***** AppkubeCloudDatasource *****//
import DashboardPanelMetricBuilder from "../AppkubeCloudDatasource/Pages/DashboardPanelMetricBuilder"
import AmazonServicesNew from '../AssetManager/Pages/AmazonServicesNew';


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

      {/***** AssetManager *****/}
      <Route path="/assetmanager/pages/environments" element={<Environments />} />
      <Route path="/assetmanager/pages/environmentlist" element={<EnvironmentList/>}/>
      <Route path="/assetmanager/pages/environmentlistitem" element={<EnvironmentListItem/>}/>
      <Route path="/assetmanager/pages/environments/amazonservices" element={<AmazonServices />} />
      <Route path="/assetmanager/pages/environments/amazonservicesnew" element={<AmazonServicesNew />} />
      <Route path="/assetmanager/pages/kubernetes" element={<Kubernetes />} />
      <Route path="/assetmanager/pages/storagedetails" element={<StorageDetails />} />
      <Route path="/assetmanager/pages/accountsetup" element={<AccountSetup />} />
      <Route path="/assetmanager/pages/department-wise-products" element={<DepartmentWiseProducts />} />
      <Route path="/assetmanager/pages/department-wise-products/department-wise-charts" element={<DepartmentWiseCharts />} />
      <Route path="/assetmanager/pages/department-wise-products/product-wise-cost" element={<ProductWiseCost />} />
      <Route path="/assetmanager/pages/product-wise-services-sla" element={<ProductWiseServicesSla />} />
      <Route path="/assetmanager/pages/add-data-source" element={<AddDatasource />} />
      <Route path="/assetmanager/pages/add-datasource-credential" element={<AddDataSourceCredential />} />
      <Route path="/assetmanager/pages/explore-datasource" element={<ExploreDataSourceDetail />} />
      <Route path="/assetmanager/pages/add-data-source-product" element={<AddDataSourceProduct />} />
      <Route path="/assetmanager/pages/add-data-source-inputs" element={<AddDatasourceInputs />} />
      <Route path="/assetmanager/pages/discoveryWizard" element={<DiscoveryWizard />} />
      <Route path="/assetmanager/pages/taggingWizard" element={<TaggingWizard />} />
      <Route path="/assetmanager/pages/addTaggingWizard/:id/:landingZone" element={<AddTaggingWizard />} />
      

      {/***** AlertManager *****/}
      <Route path="/alertmanager/pages/monitor-alerts" element={<MonitorAlerts />} />
      <Route path="/alertmanager/pages/alert-rule-builder" element={<AlertRuleBuilder />} />
      <Route path="/alertmanager/pages/manage-alert-rule" element={<ManageAlertRule />} />
      <Route path="/alertmanager/pages/monitor-alerts/all-alerts" element={<AllAlerts />} />
      <Route path="/alertmanager/pages/monitor-alerts/rules" element={<Rules />} />
      <Route path="/alertmanager/pages/create-rule" element={<CreateRule />} />
      <Route path="/alertmanager/pages/alltickets" element={<AllTickets />} />
      <Route path="/alertmanager/pages/script-editor" element={<ScriptEditor />} />
      <Route path="/alertmanager/pages/search-alert" element={<SearchAlert />} />

      {/***** Custom Manage Dashboards *****/}
      <Route path="/managedashboards" element={<ManageDashboards />} />
      <Route path="/managedashboards/custom-manage-dashboards/import-dashboard" element={<ImportDashboard />} />

      {/***** analytics *****/}
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/analytics/addNewView" element={<AddNewView />} />

       {/***** taskManager *****/}
       <Route path="/task-manager" element={<TaskManager />} />
       <Route path='/task-manager/all-tasks' element={<AllTasks />} />
       <Route path='/task-manager/create-dashboard' element={<CreateDashboard />} />

      {/***** EMS Reporting *****/}
      <Route path="/emsReporting/pages/home" element={<EmsDashboard />} />
      
      {/***** compliancemanager *****/}
      <Route path="/compliancemanager/pages/dashboard" element={<ComplianDashboard />} />
      <Route path="/compliancemanager/pages/complianceRulesets" element={<ComplianceRulesets />} />
      <Route path="/compliancemanager/pages/complianceRemediation" element={<ComplianceRemediation />} />
      <Route path="/compliancemanager/pages/compliancepolicy" element={<CompliancePolicy />} />
      <Route path="/compliancemanager/pages/compliancehistory" element={<ComplianceHistory />} />
      <Route path="/compliancemanager/pages/complianceexclusions" element={<ComplianceExclusions />} />
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

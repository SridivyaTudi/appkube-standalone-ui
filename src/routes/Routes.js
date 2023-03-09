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
    </Routes>
  );
};

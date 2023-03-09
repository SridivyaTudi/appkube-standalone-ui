import * as React from 'react';
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
import AccountSetup from '../assetmanager/pages/accountsetup';
import AmazonServices from '../assetmanager/pages/amazonservices';
import Environments from '../assetmanager/pages/environments';
import DepartmentWiseProducts from '../assetmanager/pages/departmentWiseProducts';
import DepartmentWiseCharts from '../assetmanager/pages/departmentWiseProducts/departmentChart';
import ProductWiseCost from '../assetmanager/pages/departmentWiseProducts/ProductWiseCost';
import ProductWiseServicesSla from '../assetmanager/pages/productWiseServicesSla';
import AddDatasource from '../assetmanager/pages/addDatasource';
import AddDatasouceCredential from '../assetmanager/pages/addDatasource/addDatasouceCredential';
import ExploreDataSourceDetail from '../assetmanager/pages/addDatasource/exploreDataSourceDetail';
import AddDataSourceProduct from '../assetmanager/pages/addDatasource/addDatasourceProduct';
//***** Alertmanager *****//
import MonitorAlerts from '../alertmanager/pages/monitorAlerts';

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
      <Route path="/assetmanager/pages/accountsetup" element={<AccountSetup />} />
      <Route path="/assetmanager/pages/department-wise-products" element={<DepartmentWiseProducts />} />
      <Route path="/assetmanager/pages/product-wise-cost" element={<ProductWiseCost />} />
      <Route path="/assetmanager/pages/department-wise-charts" element={<DepartmentWiseCharts />} />
      <Route path="/assetmanager/pages/amazonservices" element={<AmazonServices />} />
      <Route path="/assetmanager/pages/add-data-source-product" element={<AddDataSourceProduct />} />
      <Route path="/assetmanager/pages/product-wise-services-sla" element={<ProductWiseServicesSla />} />
      <Route path="/assetmanager/pages/add-data-source" element={<AddDatasource />} />
      <Route path="/assetmanager/pages/add-datasource-credential" element={<AddDatasouceCredential />} />
      <Route path="/assetmanager/pages/explore-datasource" element={<ExploreDataSourceDetail />} />
      {/***** Alertmanager *****/}
      <Route path="/alertmanager/pages/monitor-alerts" element={<MonitorAlerts />} />
    </Routes>
  );
};

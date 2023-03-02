// import GrafanaComponent from './base/GrafanaCharts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Breadcrumbs from './components/breadcrumbs';
import Overview from './pages/overview';
import Environments from './assetmanager/pages/environments';
import { CustomSideMenu } from './components/header/CustomSideMenu';
import DepartmentWiseProducts from './assetmanager/pages/departmentWiseProducts';
import AccountSetup from './assetmanager/pages/accountsetup';
import AmazonServices from './assetmanager/pages/amazonservices';
import AddDatasourceProduct  from './assetmanager/pages/addDatasource/addDatasourceProduct';
import ProductWiseServicesSla from './assetmanager/pages/productWiseServicesSla';
import AddDatasource  from './assetmanager/pages/addDatasource';
import AddDatasouceCredential  from './assetmanager/pages/addDatasource/addDatasouceCredential';
import ExploreDataSourceDetail  from './assetmanager/pages/addDatasource/exploreDataSourceDetail';
import Catalog from './perfmanager/pages/catalog';


function App() {
  return (
    <div className="standalone-app">
      {/* <GrafanaComponent /> */}
      <BrowserRouter>
        <div className="main-view">
          {/* <Sidebar /> */}
          <CustomSideMenu/>
          <Header />
          <div className="scroll-canvas--dashboard monitor-main-body">
            <Breadcrumbs />
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/assetmanager/pages/environments" element={<Environments />} />
              <Route path="/assetmanager/pages/accountsetup" element={<AccountSetup />} />
              <Route path="/assetmanager/pages/department-wise-products" element={<DepartmentWiseProducts />} />
              <Route path="/assetmanager/pages/amazonservices" element={<AmazonServices />} />
              <Route path="/assetmanager/pages/add-data-source/add-data-source-product" element={<AddDatasourceProduct />} />
              <Route path="/assetmanager/pages/product-wise-services-sla" element={<ProductWiseServicesSla />} />
              <Route path="/assetmanager/pages/add-data-source" element={<AddDatasource />} />
              <Route path="/assetmanager/pages/add-data-source/addDatasouceCredential" element={<AddDatasouceCredential />} />
              <Route path="/assetmanager/pages/add-data-source/exploreDataSourceDetail" element={<ExploreDataSourceDetail />} />
              <Route path="/perfmanager/pages/catalog" element={<Catalog/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

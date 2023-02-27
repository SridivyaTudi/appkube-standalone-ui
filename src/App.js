// import GrafanaComponent from './base/GrafanaCharts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Breadcrumbs from './components/breadcrumbs';
import Overview from './pages/overview';
import Environments from './assetmanager/pages/environments';

function App() {
  return (
    <div className="grafana-app">
      {/* <GrafanaComponent /> */}
      <BrowserRouter>
        <div className="main-view">
          <Sidebar />
          <Header />
          <div className="scroll-canvas--dashboard monitor-main-body">
            <Breadcrumbs />
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/assetmanager/pages/environments" element={<Environments />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

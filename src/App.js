// import GrafanaComponent from './base/GrafanaCharts';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Breadcrumbs from './components/breadcrumbs';
import Overview from './pages/overview';
function App() {
  return (
    <div className="App">
      {/* <GrafanaComponent /> */}
      <div className="main-view">
        <Sidebar />
        <Header />
        <div className="scroll-canvas--dashboard monitor-main-body">
          <Breadcrumbs />
          <Overview />
        </div>
      </div>
    </div>
  );
}

export default App;

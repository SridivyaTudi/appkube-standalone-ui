// import GrafanaComponent from './base/GrafanaCharts';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Breadcrumbs from './components/breadcrumbs';
import Dashboard from './pages/dashboard';
function App() {
  return (
    <div className="App">
      {/* <GrafanaComponent /> */}
      <div className="main-view">
        <Sidebar />
        <Header />
        <div className="scroll-canvas--dashboard monitor-main-body">
          <Breadcrumbs />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;

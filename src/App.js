// import GrafanaComponent from './base/GrafanaCharts';
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/header";
import Breadcrumbs from "./components/breadcrumbs";
import { CustomSideMenu } from "./components/header/CustomSideMenu";
import { AllRoutes } from "./routes/Routes";

function App() {
  return (
    <div className="standalone-app">
      {/* <GrafanaComponent /> */}
      <BrowserRouter>
        <div className="main-view">
          {/* <Sidebar /> */}
          <CustomSideMenu />
          <Header />
          <div className="scroll-canvas--dashboard monitor-main-body">
            <Breadcrumbs />
            <AllRoutes />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

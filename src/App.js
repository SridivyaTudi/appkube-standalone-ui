// import GrafanaComponent from './base/GrafanaCharts';
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Components/Header";
import Breadcrumbs from "./Components/Breadcrumbs";
import { CustomSideMenu } from "./Components/Header/CustomSideMenu";
import { AllRoutes } from "./Routes/Routes";

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

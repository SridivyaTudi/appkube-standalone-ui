// import GrafanaComponent from './base/GrafanaCharts';
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Components/Header";
import Breadcrumbs from "./Components/Breadcrumbs";
import { CustomSideMenu } from "./Components/Header/CustomSideMenu";
import { AllRoutes } from "./Routes/Routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="standalone-app">
      {/* <GrafanaComponent /> */}
      <BrowserRouter>
        <div className="main-view">
          {/* <Sidebar /> */}
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
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

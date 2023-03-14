import React, { Component } from "react";
import ManageDashboards from "./manageDashboards";
import TopMenu from "../catalog/topMenu";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="perfmanager-dashboard-container">
        <div className="perfmanager-page-container">
          <div className="common-container">
            <TopMenu />
          </div>
          <div className="common-container border-bottom-0">
            <ManageDashboards />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

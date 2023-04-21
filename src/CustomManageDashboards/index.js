// Libraries
import React, { Component } from 'react';
import Playlists from './Playlists';
import ManageTab from './ManageTab';
import DashboardIcon from "../assets/img/dashboard-icon.png";

// Services & Utils
// export interface Props {
//   $scope;
//   $injector;
//   location;
// }

class ManageDashboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({
      activeTab,
    });
  };
  render() {
    const { activeTab } = this.state;
    return (
      <React.Fragment>
        <div className="custom-manage-dashboards-page-container">
          <div className="common-container border-bottom-0">
            <div className="manage-dashboard-heading">
              <div className="heading-icon">
                <img src={DashboardIcon} alt="" />
              </div>
              <div className="heading-right">
                <h3>Dashboards</h3>
                <p>Manage dashboards &amp; folders</p>
              </div>
            </div>
            <div className="manage-dashboard-radio-btns">
              <ul>
                <li>
                  <input type="radio" id="f-kpi" name="selector" />
                  <label htmlFor="f-kpi">KPI</label>
                </li>
                <li>
                  <input type="radio" id="f-log" name="selector" />
                  <label htmlFor="f-v">Log</label>
                </li>
                <li>
                  <input type="radio" id="f-schema" name="selector" />
                  <label htmlFor="f-schema">Schema</label>
                </li>
              </ul>
            </div>
            <div className="manage-dashboard-tabs">
              <ul>
                <li className={activeTab === 0 ? 'active-tab' : ''} onClick={(e) => this.setActiveTab(0)}>
                  <a>Manage</a>
                </li>
                <li className={activeTab === 1 ? 'active-tab' : ''} onClick={(e) => this.setActiveTab(1)}>
                  <a>Playlist</a>
                </li>
                <li className={activeTab === 2 ? 'active-tab' : ''} onClick={(e) => this.setActiveTab(2)}>
                  <a>Snapshots</a>
                </li>
              </ul>
            </div>
            <div className="tab-container">
              {activeTab === 0 && <ManageTab />}
              {activeTab === 1 && <Playlists />}
              {activeTab === 2 && <div></div>}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ManageDashboards;

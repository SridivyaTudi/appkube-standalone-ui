import React, {Component} from 'react';
import CreateDashboardImage from"../CustomManageDashboards/img/create-dashboard-image.png";
import ImportDashboardImage from"../CustomManageDashboards/img/import-dashboard-image.png";
//import * as React from 'react';
//import { config } from '../config';
//import { locationService } from '@grafana/runtime';

class NewDashboard extends Component {
  constructor(props) {
    super(props);
  }

  closeNewDashboard = () => {
    this.props.closeNewDashboard();
  };

  // openNewDashboard = () => {
  //   locationService.push('/components/new?orgId=1');
  // };

  render() {
    return (
      <>
        <div className="newdashboard-container">
          <div className="general-heading">
            <h4>New Dashboard</h4>
            <span className="newdashboard-close">
              <i className="fa fa-close" onClick={this.closeNewDashboard}></i>
            </span>
          </div>
          <div className="general-center-contain">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 own-dashboard">
                <div className="d-inline-block" style={{ cursor: 'pointer' }} onClick={this.openNewDashboard}>
                  <span>
                    <img src={CreateDashboardImage} alt="Create your own dashboard" />
                  </span>
                  <label>Create your own dashboard</label>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 own-dashboard">
                <a href={`/custom-manage-dashboards/import-dashboard`}>
                  <span>
                    <img src={ImportDashboardImage} alt="Import Dashboard from Catalog" />
                  </span>
                  <label>Import Dashboard from Catalog</label>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewDashboard;

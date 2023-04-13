import React, { Component } from "react";

class OperationMode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="d-inline-block width-100 account-setup-tab-contents">
        <div className="row">
          <div className="col-md-6">
            <div className="operation-card">
              <div className="d-block">
                <h4>Read-Only Mode</h4>
                <p>
                  In the Read Only mode, Appkube can be used for visualization
                  monitoring and auditing, and will not modify or actively
                  manage your cloud environments
                </p>
                <h4>Available Features in Read-Only Mode:</h4>
                <ul>
                  <li>Appkube Asset Manager Fore Visualization of Cloud</li>
                  <li>Business To Infrastructure Topology</li>
                  <li>Service SLE monitoring</li>
                  <li>Alerts</li>
                  <li>RCA Central</li>
                  <li>Audit trail</li>
                </ul>
              </div>
              <div className="text-center">
                <button className="blue-button m-r-0 m-b-0">Get Started</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="operation-card">
              <div className="d-block">
                <h4>Automation Mode</h4>
                <p>
                  In the Automation Mode, Appkube can be used to actively manage
                  Your cloud and enforce best practices
                </p>
                <h4>Available Features in Automation Mode:</h4>
                <ul>
                  <li>Appkube Asset Manager Fore Visualization of Cloud</li>
                  <li>Business To Infrastructure Topology</li>
                  <li>Service SLE monitoring</li>
                  <li>Alerts</li>
                  <li>RCA Central</li>
                  <li>Audit trail</li>
                  <li>Automation Central</li>
                  <li>DevSecOps Topology</li>
                </ul>
              </div>
              <div className="text-center">
                <button className="blue-button m-r-0 m-b-0">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OperationMode;

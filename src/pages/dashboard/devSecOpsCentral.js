import React, { Component } from 'react';

class DevSecOpsCentral extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;
    const {} = this.state;

    return (
      <div className="report-container">
        <div className="report-inner-container">
          <div className="header">
            <div className="row">
              <div className="col-md-8 col-sm-8">
                <h2>DevSecOps Central</h2>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="float-right">
                  <select>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="main-collapse-expand">
            <div className="collapse-expand">
              <div className="heading">
                <h3>DEV Central</h3>
              </div>
              <div className="contents">
                <ul className="tabs">
                  <li className="active">Volume</li>
                  <li className="">Velocity</li>
                  <li className="">Reliability</li>
                </ul>
                <div className="reports-boxes active">
                  <div className="report-box">
                    <strong>Product</strong>
                    <div className="report">
                      <span className="up">
                        <i className="fa fa-caret-up"></i>
                      </span>
                      <span>56%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Services</strong>
                    <div className="report">
                      <span className="down">
                        <i className="fa fa-caret-down"></i>
                      </span>
                      <span>21%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Release</strong>
                    <div className="report">
                      <span className="down">
                        <i className="fa fa-caret-down"></i>
                      </span>
                      <span>35%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Use Case</strong>
                    <div className="report">
                      <span className="up">
                        <i className="fa fa-caret-up"></i>
                      </span>
                      <span>40%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Bugs</strong>
                    <div className="report">
                      <span className="up">
                        <i className="fa fa-caret-up"></i>
                      </span>
                      <span>45%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Workflow</strong>
                    <div className="report">
                      <span className="down">
                        <i className="fa fa-caret-down"></i>
                      </span>
                      <span>32%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Documentation</strong>
                    <div className="report">
                      <span className="down">
                        <i className="fa fa-caret-down"></i>
                      </span>
                      <span>10%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Automation Test</strong>
                    <div className="report">
                      <span className="up">
                        <i className="fa fa-caret-up"></i>
                      </span>
                      <span>12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse-expand">
              <div className="heading">
                <h3>SEC Central</h3>
              </div>
              <div className="contents">
                <ul className="tabs">
                  <li className="active">Infra</li>
                  <li className="">APP</li>
                  <li className="">Data</li>
                </ul>
                <div className="reports-boxes active">
                  <div className="report-box">
                    <strong>Account</strong>
                    <div className="report">
                      <span className="up">
                        <i className="fa fa-caret-up"></i>
                      </span>
                      <span>56%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>VPC</strong>
                    <div className="report">
                      <span className="down">
                        <i className="fa fa-caret-down"></i>
                      </span>
                      <span>21%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Cluster</strong>
                    <div className="report">
                      <span className="down">
                        <i className="fa fa-caret-down"></i>
                      </span>
                      <span>35%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Managed Services</strong>
                    <div className="report">
                      <span className="up">
                        <i className="fa fa-caret-up"></i>
                      </span>
                      <span>40%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse-expand">
              <div className="heading">
                <h3>OPS Central</h3>
              </div>
              <div className="contents">
                <ul className="tabs">
                  <li className="active">Volume</li>
                  <li className="">Velocity</li>
                  <li className="">Reliability</li>
                </ul>
                <div className="reports-boxes active">
                  <div className="report-box">
                    <strong>New Cloud Provisioning</strong>
                    <div className="report">
                      <span className="up">
                        <i className="fa fa-caret-up"></i>
                      </span>
                      <span>56%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>New Product</strong>
                    <div className="report">
                      <span className="down">
                        <i className="fa fa-caret-down"></i>
                      </span>
                      <span>21%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Service On Boarding</strong>
                    <div className="report">
                      <span className="down">
                        <i className="fa fa-caret-down"></i>
                      </span>
                      <span>35%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>New Automation</strong>
                    <div className="report">
                      <span className="up">
                        <i className="fa fa-caret-up"></i>
                      </span>
                      <span>40%</span>
                    </div>
                  </div>
                  <div className="report-box">
                    <strong>Alert Resolved</strong>
                    <div className="report">
                      <span className="up">
                        <i className="fa fa-caret-up"></i>
                      </span>
                      <span>45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DevSecOpsCentral;

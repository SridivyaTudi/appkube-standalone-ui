import React from "react";

class Metric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="d-block panel-builder-code-menus">
          <div className="d-inline-block select-menu">
            <label>Product</label>
            <select>
              <option>Select</option>
              <option>HRMS</option>
              <option>Procurement</option>
              <option>Supply chain</option>
              <option>CMS</option>
            </select>
          </div>
          <div className="d-inline-block select-menu">
            <label>Environment</label>
            <select>
              <option>Select</option>
              <option>Prod</option>
              <option>Stage</option>
              <option>Dev</option>
              <option>Test</option>
            </select>
          </div>
          <div className="d-inline-block select-menu">
            <label>Modulds</label>
            <select>
              <option>Select</option>
              <option>Recruitment</option>
              <option>Attendance</option>
              <option>Appraisals</option>
              <option>Salary</option>
              <option>Engagement</option>
              <option>Documentation</option>
            </select>
          </div>
          <div className="d-inline-block select-menu">
            <label>App / Data Service</label>
            <select>
              <option>Select</option>
              <option>Java app</option>
              <option>RDS Postgres DB </option>
              <option>Open Search DB</option>
              <option>S3</option>
              <option>GitHub</option>
            </select>
          </div>
        </div>
        <div className="d-block panel-builder-code-form">
          <div className="d-block w-100">
            <div className="d-inline-block input-box">
              <label>Element Type</label>
              <input type="text" placeholder="EC2" />
            </div>
            <div className="d-inline-block input-box">
              <label>Instance ID</label>
              <input type="text" placeholder="6821ghhe" />
            </div>
          </div>
          {this.props.queryType ? (
            <div className="d-block w-100">
              <div className="d-inline-block input-box m-b-0">
                <label>Metric Name</label>
                <select>
                  <option>Select</option>
                  <option>HRMS</option>
                  <option>Procurement</option>
                  <option>Supply chain</option>
                  <option>CMS</option>
                </select>
              </div>
              <div className="d-inline-block input-box m-b-0">
                <label>Statistic</label>
                <select>
                  <option>Select</option>
                  <option>HRMS</option>
                  <option>Procurement</option>
                  <option>Supply chain</option>
                  <option>CMS</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="d-block w-100">
              <div className="d-inline-block input-box w-100 m-b-0">
                <input
                  type="text"
                  placeholder="Enter Your Log Query"
                  className="w-100"
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Metric;

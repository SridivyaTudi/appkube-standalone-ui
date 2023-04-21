import React from "react";

class Api extends React.Component {
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
            <div className="d-inline-block input-box">
              <label>Method</label>
              <select>
                <option>getConfigData</option>
                <option>getTopopogyData</option>
                <option>getCostData</option>
                <option>getLAData</option>
                <option>getLAStats</option>
              </select>
            </div>
          </div>
          <div className="d-block w-100">
            <div className="d-block heading-text">
              Parsing Option and Result Field
            </div>
          </div>
          <div className="d-block w-100">
            <div className="d-inline-block input-box textarea-box">
              <label>
                Rows/Root - <em>Optional</em>
              </label>
              <textarea>Rows/Root Selector</textarea>
              <label>
                Advance Options - <em>Optional</em>
              </label>
              <div className="d-block options-check">
                <span>Root returns object instead of array?</span>
                <input type={"checkbox"} className="checkbox" />
              </div>
              <div className="d-block options-check">
                <span>Is data in columnar format ?</span>
                <input type={"checkbox"} className="checkbox" />
              </div>
            </div>
            <div className="d-inline-block input-box add-column">
              <label>
                Column - <em>Optional</em>
              </label>
              <div className="d-block w-100 add-column-selector">
                <span>Selector</span>
                <input type={"text"} />
                <span>as</span>
                <input type={"text"} className="selector-input" />
                <span>Fromat as</span>
                <input type={"text"} className="selector-input" />
              </div>
              <div className="d-block w-100">
                <button className="btn add-column-btn">
                  <i class="fas fa-plus"></i> Column
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Api;

import React, { Component } from "react";

class CreateRole extends Component {
  render() {
    return (
      <div className="d-inline-block width-100 new-account-setup-tab-contents">
        <h3>Create Roles</h3>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 create-role-border">
            <h4>Create IAM Roles For Appkube</h4>
            <ul>
              <li>
                in the <strong>Access Management menu, Select Roles</strong> and
                Click <strong>Create Role</strong>
              </li>
              <li>
                in the <strong>Select Trusted Entity</strong> Window, Select{" "}
                <strong>AWS Account</strong>
              </li>
              <li>
                Under An AWS account, Select{" "}
                <strong>Another AWS Account</strong>and Enter the{" "}
                <strong>Account ID: 65790774754</strong>
              </li>
              <li>
                Under Option, Select the <strong>Required External ID</strong>{" "}
                and Enter the{" "}
                <strong>External ID: ME4@s7fv@sQsghDvsea4RE</strong>
              </li>
              <li>Make Sure Not To Select Require MFA</li>
              <li>
                Select The Following: <strong>'SecurityAudit'</strong> (AWS
                managed policy) <strong>'Appkube-readonly-policy'</strong> that
                we created before. you can sea Appkube in the filter
              </li>
              <li>
                Click on the <strong>'Next'</strong> button at the bottom of the
                page
              </li>
              <li>
                Set Role Name with Your choice (
                <strong> 'Appkube-Connect'</strong> makes sense) and click on{" "}
                <strong>'Create Role'</strong> at the bottom of the page
              </li>
              <li>
                On the search box look for the 'Role name' you set in the
                previous step, and click on it
              </li>
              <li>
                Copy the <strong>Role ARN</strong> and fill it in the Role ARN
                field
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <div className="account-setup-right-contents">
              <div className="form-group">
                <label>Display Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Optional"
                />
              </div>
              <div className="form-group">
                <label>Role ARN</label>
                <input className="form-control" type="text" placeholder="HR" />
              </div>
              <div className="form-group">
                <label>External ID</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="ME4@s7fvs@dQdghDvdsea4RE"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRole;

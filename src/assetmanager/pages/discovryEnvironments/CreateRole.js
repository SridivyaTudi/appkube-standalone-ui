import React, { Component } from "react";

class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      accessKey: "",
      secretKey: "",
      accountId: "",
      isSubmitted: false,
    };
  }

  validate = (submitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      displayName: validObj,
      accessKey: validObj,
      secretKey: validObj,
      accountId: validObj,
      isValid,
    };
    if (submitted) {
      const { displayName, accessKey, secretKey, accountId } = this.state;
      if (!displayName) {
        retData.displayName = {
          isValid: false,
          message: "Display is required",
        };
        isValid = false;
      }
      if (!accessKey) {
        retData.accessKey = {
          isValid: false,
          message: "Access key Id is required",
        };
        isValid = false;
      }
      if (!secretKey) {
        retData.secretKey = {
          isValid: false,
          message: "Secrete key Id is required",
        };
        isValid = false;
      }
      if (!accountId) {
        retData.accountId = {
          isValid: false,
          message: "Account Id is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  getRoleData = () => {
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    const { displayName, accessKey, secretKey, accountId } = this.state;
    return {
      displayName,
      accessKey,
      secretKey,
      accountId,
      isValid: errorData.isValid,
    };
  };

  render() {
    const { displayName, accessKey, secretKey, isSubmitted, accountId } =
      this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <div className="d-inline-block width-100 account-setup-tab-contents">
        <div className="row">
          <div className="col-md-9 col-sm-12">
            <div className="account-setup-left-contents">
              <div className="contents">
                <strong>Create IAM user for Synectiks Monitoring</strong>
                <ul className="m-t-1">
                  <li>
                    In the <strong>Access Management</strong> menu, select <strong>Roles</strong> and click <strong>'Create role'</strong> <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                    In the <strong>select trusted entity</strong> window, select <strong>AWS account</strong> <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                    Under An AWS account, select <strong>Another AWS account </strong> and enter the<strong>AccountId:657907747545</strong> <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                    Under Option,select the<strong>Required External ID</strong>
                    option and enter the
                    <strong>External ID: ME4@s7fvs@dQdghDvdsea4RE</strong> <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                    Make sure <strong>NOT</strong>to select
                    <strong>Require MFA</strong> <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                    Click on the <strong>'Next'</strong> button at the bottom of the page <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                    select the following policies: <i class="far fa-question-circle"></i>
                    <br></br>.<strong>‘SecurityAudit’</strong> (AWS managed
                    policy)<br></br>.<strong>‘Appkube-readonly-policy’</strong>
                    That we created before. You can search for 'Appkube' in the
                    filter
                  </li>
                  <li>
                    Click on the <strong>'Next'</strong>button at bottom of the
                    page <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                    Set Role Name with your choice (
                    <strong>'Appkube-Connect'</strong> makes sense) and click on
                    <strong>‘Create Role’ </strong> at the bottom of the page <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                    On the search box look for the 'Role name' you set in the
                    previous step, click on it. <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                    Copy the <strong>Role ARN</strong> and fill it the Role ARN
                    field <i class="far fa-question-circle"></i>
                  </li>
                  <li>
                   Click on <a>NEXT</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-12">
            <div className="account-setup-right-contents">
              <div className="form-group">
                <label>Display Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="displayName"
                  value={displayName}
                  placeholder="Account Name"
                  onChange={this.handleStateChange}
                ></input>
              </div>
              <span>{errorData.displayName.message}</span>
              <div className="form-group">
                <label>Access Key Id</label>
                <input
                  className="form-control"
                  type="text"
                  name="accessKey"
                  value={accessKey}
                  placeholder="AWS Access Key"
                  onChange={this.handleStateChange}
                ></input>
              </div>
              <span>{errorData.accessKey.message}</span>
              <div className="form-group">
                <label>Secrete Key</label>
                <input
                  className="form-control"
                  type="text"
                  name="secretKey"
                  value={secretKey}
                  placeholder="AWS Secret Key"
                  onChange={this.handleStateChange}
                ></input>
              </div>
              <div className="form-group">
                <label>Account Id</label>
                <input
                  className="form-control"
                  type="text"
                  name="accountId"
                  value={accountId}
                  placeholder="AWS Account Id"
                  onChange={this.handleStateChange}
                ></input>
              </div>
              <span>{errorData.secretKey.message}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateRole;

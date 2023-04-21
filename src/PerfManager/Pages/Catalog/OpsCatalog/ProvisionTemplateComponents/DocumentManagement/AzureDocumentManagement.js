import React from "react";

class AzureDocumentManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      stackName: "",
      awsRegion: "",
      adminEmail: "",
      appEnvironment: "",
      enablePublicURLs: "",
      passwordMinimumLength: "",
      passwordRequresLowercase: "",
      passwordRequresNumber: "",
      passwordRequresSymbols: "",
      passwordRequresUppercase: "",
      confirmChangeBefore: "",
      allowSAMCLIIAMRoleCreation: "",
      saveArgumentTosamconfig: "",
      isSubmitted: false,
      addTags: [],
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    let isValid = true;
    const retData = {
      stackName: validObj,
      awsRegion: validObj,
      adminEmail: validObj,
      appEnvironment: validObj,
      enablePublicURLs: validObj,
      passwordMinimumLength: validObj,
      passwordRequresLowercase: validObj,
      passwordRequresNumber: validObj,
      passwordRequresSymbols: validObj,
      passwordRequresUppercase: validObj,
      confirmChangeBefore: validObj,
      allowSAMCLIIAMRoleCreation: validObj,
      saveArgumentTosamconfig: validObj,
      isValid,
    };
    if (isSubmitted) {
      const {
        stackName,
        awsRegion,
        adminEmail,
        appEnvironment,
        enablePublicURLs,
        passwordMinimumLength,
        passwordRequresLowercase,
        passwordRequresNumber,
        passwordRequresSymbols,
        passwordRequresUppercase,
        confirmChangeBefore,
        allowSAMCLIIAMRoleCreation,
        saveArgumentTosamconfig,
      } = this.state;
      if (!stackName) {
        retData.stackName = {
          isValid: false,
          message: "Stack Name is required",
        };
        isValid = false;
      }
      if (!awsRegion) {
        retData.awsRegion = {
          isValid: false,
          message: "Azure Region is required",
        };
        isValid = false;
      }
      if (!adminEmail) {
        retData.adminEmail = {
          isValid: false,
          message: "Admin Email is required",
        };
        isValid = false;
      }
      if (!appEnvironment) {
        retData.appEnvironment = {
          isValid: false,
          message: "App Environment is required",
        };
        isValid = false;
      }
      if (!enablePublicURLs) {
        retData.enablePublicURLs = {
          isValid: false,
          message: "Enable Public URLs is required",
        };
        isValid = false;
      }
      if (!passwordMinimumLength) {
        retData.passwordMinimumLength = {
          isValid: false,
          message: "Password Minimum Length is required",
        };
        isValid = false;
      }
      if (!passwordRequresLowercase) {
        retData.passwordRequresLowercase = {
          isValid: false,
          message: "Password Requres Lowercase is required",
        };
        isValid = false;
      }
      if (!passwordRequresNumber) {
        retData.passwordRequresNumber = {
          isValid: false,
          message: "Password Requres Number is required",
        };
        isValid = false;
      }
      if (!passwordRequresSymbols) {
        retData.passwordRequresSymbols = {
          isValid: false,
          message: "Password Requres Symbols is required",
        };
        isValid = false;
      }
      if (!passwordRequresUppercase) {
        retData.passwordRequresUppercase = {
          isValid: false,
          message: "Password Requres Uppercase is required",
        };
        isValid = false;
      }
      if (!confirmChangeBefore) {
        retData.confirmChangeBefore = {
          isValid: false,
          message: "Confirm Change Before is required",
        };
        isValid = false;
      }
      if (!allowSAMCLIIAMRoleCreation) {
        retData.allowSAMCLIIAMRoleCreation = {
          isValid: false,
          message: "Allow SAM CLI IAM Role Creation is required",
        };
        isValid = false;
      }
      if (!saveArgumentTosamconfig) {
        retData.saveArgumentTosamconfig = {
          isValid: false,
          message: "Save Argument To Samconfig is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      const {
        stackName,
        awsRegion,
        adminEmail,
        appEnvironment,
        enablePublicURLs,
        passwordMinimumLength,
        passwordRequresLowercase,
        passwordRequresNumber,
        passwordRequresSymbols,
        passwordRequresUppercase,
        confirmChangeBefore,
        allowSAMCLIIAMRoleCreation,
        saveArgumentTosamconfig,
      } = this.state;
      localStorage.setItem(
        "viewData",
        JSON.stringify({
          stackName,
          awsRegion,
          adminEmail,
          appEnvironment,
          enablePublicURLs,
          passwordMinimumLength,
          passwordRequresLowercase,
          passwordRequresNumber,
          passwordRequresSymbols,
          passwordRequresUppercase,
          confirmChangeBefore,
          allowSAMCLIIAMRoleCreation,
          saveArgumentTosamconfig,
        })
      );
    }
  };

  displayTags = () => {
    let retData = [];
    const { addTags } = this.state;
    if (addTags && addTags.length > 0) {
      for (let i = 0; i < addTags.length; i++) {
        retData.push(
          <div className="row" key={addTags[i]}>
            <div className="col-md-3 p-r-0">
              <div className="form-group">
                <input
                  type="text"
                  name="label"
                  className="form-control"
                  placeholder="Tag Label"
                  value={addTags[i].label}
                  onChange={(e) => this.handleTagchange(e, i)}
                />
              </div>
            </div>
            <div className="col-md-3 p-r-0">
              <div className="form-group">
                <input
                  type="text"
                  name="tagvalue"
                  className="form-control"
                  placeholder="Tag Value"
                  value={addTags[i].tagvalue}
                  onChange={(e) => this.handleTagchange(e, i)}
                />
              </div>
            </div>
            <div className="col-md-3 p-r-0">
              <button
                className="remove-tags-btn"
                onClick={() => this.onClickRemoveTag(i)}
              >
                <i className="fa fa-close"></i>
              </button>
            </div>
          </div>
        );
      }
    }
    return retData;
  };

  onClickAddTag = () => {
    let { addTags } = this.state;
    addTags.push({ label: "", tagvalue: "" });
    this.setState({
      addTags,
    });
  };

  onClickRemoveTag = (index) => {
    let { addTags } = this.state;
    addTags.splice(index, 1);
    this.setState({
      addTags,
    });
  };

  handleTagchange = (event, index) => {
    const { name, value } = event.target;
    let { addTags } = this.state;
    addTags[index][name] = value;
    this.setState({
      addTags,
    });
  };

  formFields = () => {
    const { activeTab } = this.state;
    if (activeTab === 0) {
      return (
        <div className="catalogue-right-container">
          <button
            onClick={() => this.props.showMainView()}
            className="contents-close"
          >
            <i className="fa fa-close"></i>
          </button>
          <div className="contents">
            <strong>
              Document Management System with DevSecOps best practice in Azure
            </strong>
            <h3>Document Management System</h3>
            <p>
              This is demo text to get look and feel of the page, it will be
              replaced by proper content related to account creation,
            </p>
            <h3>Prerequisites</h3>
            <p>
              <strong>Stack Name:</strong> The name of the stack to deploy to
              CloudFormation; this should be unique to your account and region,
              and a good starting point would be formkiq-core-& appEnvironment;
              where appEnvironment matches your installation environment, e.g.
              prod, dev, test
            </p>
            <p>
              <strong>Azure Region:</strong> The Azure region you want to deploy
              your app to use
            </p>
            <p>
              <strong>Admin Email:</strong> The Administration Email you want
              FormKiQ to useappEnvironment: your installation environment, e.g.
              prod, dev, test; must be unique per account
            </p>
            <p>
              <strong>App Environment:</strong> your installation environment,
              e.g. prod, dev, test; must be unique per account
            </p>
            <p>
              <strong>Enable Public Url’s:</strong> Whether to Enable /public/
              urls.
            </p>
            <p>
              <strong>Password Minimum Length:</strong> The minimum Password
              Length for User Accounts
            </p>
            <p>
              <strong>Password Require Lowercase:</strong> Whether at least one
              lowercase letter is required in User
            </p>
            <p>
              <strong>Passwords Password Require Numbers:</strong> Whether at
              least one number is required in User
            </p>
            <p>
              <strong>Passwords Password Require Symbols:</strong> Whether at
              least one symbol is required in User
            </p>
            <p>
              <strong>Passwords Password Require Uppercase:</strong> Whether at
              least one uppercase letter is required in User Passwords
            </p>
            <p>
              <strong>Confirm changes before deploy:</strong> If set to yes, any
              change sets will be shown to you before execution for manual
              review; if set to no, the Azure SAM CLI will automatically deploy
              application changes
            </p>
            <p>
              <strong>Allow SAM CLI IAM role creation:</strong> FormKiQ Core’s
              Azure SAM templates create Azure IAM roles required for the Azure
              Lambda function(s) included to access Azure services; the
              permissions are passed in by the sam deploy command above, so this
              value should be set to "Y"{" "}
            </p>
            <p>
              <strong>Save arguments to samconfig.toml:</strong> if set to "Y",
              your choices will be saved to a configuration file inside the
              project, so that in the future you can just re-run sam deploy
              without parameters to deploy changes to your application
            </p>
            <div className="d-block text-right">
              <button
                className="blue-button"
                onClick={() => this.props.showMainView()}
              >
                Back
              </button>
              <button className="blue-button" onClick={() => this.setActiveTab(1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 1) {
      const {
        stackName,
        awsRegion,
        adminEmail,
        appEnvironment,
        enablePublicURLs,
        passwordMinimumLength,
        passwordRequresLowercase,
        passwordRequresNumber,
        passwordRequresSymbols,
        passwordRequresUppercase,
        confirmChangeBefore,
        allowSAMCLIIAMRoleCreation,
        saveArgumentTosamconfig,
        isSubmitted,
      } = this.state;
      const errorData = this.validate(isSubmitted);
      return (
        <div className="catalogue-right-container">
          <button
            onClick={() => this.props.showMainView()}
            className="contents-close"
          >
            <i className="fa fa-close"></i>
          </button>
          <div className="contents">
            <strong>
              Document Management System with DevSecOps best practice in Azure
            </strong>
            <h3>Document Management System</h3>
            <p>
              This Command will package and deploy your application to Azure,
              with a series of prompts
            </p>
            <div className="form-detail-group">
              <strong>Prerequisites</strong>
              <div className="form-group">
                <label>Stack Name</label>
                <input
                  type="text"
                  name="stackName"
                  className="form-control"
                  placeholder="Name of the stack to deploy"
                  value={stackName}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">{errorData.stackName.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Azure Region</label>
                <input
                  type="text"
                  name="awsRegion"
                  className="form-control"
                  placeholder="AWS Region"
                  value={awsRegion}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">{errorData.awsRegion.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Admin Email</label>
                <input
                  type="email"
                  name="adminEmail"
                  className="form-control"
                  placeholder="example@demain.com"
                  value={adminEmail}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">{errorData.adminEmail.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>App Environment</label>
                <input
                  type="text"
                  name="appEnvironment"
                  className="form-control"
                  placeholder="Installation environment"
                  value={appEnvironment}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.appEnvironment.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Enable Public URL's</label>
                <select
                  name="enablePublicURLs"
                  className="form-control"
                  value={enablePublicURLs}
                  onChange={this.handleStateChange}
                >
                  <option>Enable</option>
                  <option>Disable</option>
                </select>
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.enablePublicURLs.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Password minimum length</label>
                <input
                  type="text"
                  name="passwordMinimumLength"
                  className="form-control"
                  placeholder="insert any number"
                  value={passwordMinimumLength}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.passwordMinimumLength.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Password requres lowercase</label>
                <select
                  name="passwordRequresLowercase"
                  className="form-control"
                  value={passwordRequresLowercase}
                  onChange={this.handleStateChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.passwordRequresLowercase.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Password requres number</label>
                <select
                  name="passwordRequresNumber"
                  className="form-control"
                  value={passwordRequresNumber}
                  onChange={this.handleStateChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.passwordRequresNumber.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Password requres symbols</label>
                <select
                  name="passwordRequresSymbols"
                  className="form-control"
                  value={passwordRequresSymbols}
                  onChange={this.handleStateChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.passwordRequresSymbols.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Password requres uppercase</label>
                <select
                  name="passwordRequresUppercase"
                  className="form-control"
                  value={passwordRequresUppercase}
                  onChange={this.handleStateChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.passwordRequresUppercase.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Confirm change before</label>
                <select
                  name="confirmChangeBefore"
                  className="form-control"
                  value={confirmChangeBefore}
                  onChange={this.handleStateChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.confirmChangeBefore.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Allow SAM CLI IAM role creation</label>
                <select
                  name="allowSAMCLIIAMRoleCreation"
                  className="form-control"
                  value={allowSAMCLIIAMRoleCreation}
                  onChange={this.handleStateChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.allowSAMCLIIAMRoleCreation.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Save argument to samconfig.toml</label>
                <select
                  name="saveArgumentTosamconfig"
                  className="form-control"
                  value={saveArgumentTosamconfig}
                  onChange={this.handleStateChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.saveArgumentTosamconfig.message}
                  </span>
                )}
              </div>
            </div>

            <div className="d-block text-right">
              <button className="blue-button" onClick={() => this.setActiveTab(0)}>
                Back
              </button>
              <button className="blue-button" onClick={this.handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="catalogue-inner-tabs-container templates-container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-r-p">
            <div className="templates-filters">
              <div className="filter-search">
                <strong>Filters</strong>
                <div className="filter-input">
                  <button className="search-icon">
                    <i className="fa fa-search"></i>
                  </button>
                  <input type="text" placeholder="Search" value={""} />
                </div>
              </div>
              <div className="templates-category">
                <ul>
                  <li
                    className={activeTab === 0 ? "active" : ""}
                    onClick={() => this.setActiveTab(0)}
                  >
                    <label>Welcome</label>
                  </li>
                  <li
                    className={activeTab === 1 ? "active" : ""}
                    onClick={() => this.setActiveTab(1)}
                  >
                    <label>Documentation</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 col-l-p">
            {this.formFields()}
          </div>
        </div>
      </div>
    );
  }
}

export default AzureDocumentManagement;

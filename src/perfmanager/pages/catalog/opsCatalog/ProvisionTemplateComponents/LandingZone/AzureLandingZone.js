import React from "react";

class AzureLandingZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      logArchiveAccountId: "",
      accountEmail: "",
      auditAccountId: "",
      aftManagementAccountId: "",
      gitHubUsername: "",
      ctHomeRegion: "",
      tfBackendSecondaryRegion: "",
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
      ctManagementAccountId: validObj,
      logArchiveAccountId: validObj,
      auditAccountId: validObj,
      aftManagementAccountId: validObj,
      gitHubUsername: validObj,
      ctHomeRegion: validObj,
      tfBackendSecondaryRegion: validObj,
      isValid,
    };
    if (isSubmitted) {
      const {
        ctManagementAccountId,
        logArchiveAccountId,
        auditAccountId,
        aftManagementAccountId,
        gitHubUsername,
        ctHomeRegion,
        tfBackendSecondaryRegion,
      } = this.state;
      if (!ctManagementAccountId) {
        retData.ctManagementAccountId = {
          isValid: false,
          message: "CT Management Account ID is required",
        };
        isValid = false;
      }
      if (!logArchiveAccountId) {
        retData.logArchiveAccountId = {
          isValid: false,
          message: "Log Archive Account ID is required",
        };
        isValid = false;
      }
      if (!auditAccountId) {
        retData.auditAccountId = {
          isValid: false,
          message: "Audit Account ID is required",
        };
        isValid = false;
      }
      if (!aftManagementAccountId) {
        retData.aftManagementAccountId = {
          isValid: false,
          message: "AFT Management Account Id is required",
        };
        isValid = false;
      }
      if (!gitHubUsername) {
        retData.gitHubUsername = {
          isValid: false,
          message: "GitHub Username Id is required",
        };
        isValid = false;
      }
      if (!ctHomeRegion) {
        retData.ctHomeRegion = {
          isValid: false,
          message: "CT Home Region Id is required",
        };
        isValid = false;
      }
      if (!tfBackendSecondaryRegion) {
        retData.tfBackendSecondaryRegion = {
          isValid: false,
          message: "TC Backend Secondary Region Id is required",
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    console.log(retData);
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
        ctManagementAccountId,
        logArchiveAccountId,
        auditAccountId,
        aftManagementAccountId,
        gitHubUsername,
        ctHomeRegion,
        tfBackendSecondaryRegion,
      } = this.state;
      localStorage.setItem(
        "viewData",
        JSON.stringify({
          ctManagementAccountId,
          logArchiveAccountId,
          auditAccountId,
          aftManagementAccountId,
          gitHubUsername,
          ctHomeRegion,
          tfBackendSecondaryRegion,
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
              Create new landing zone with DevSecOps best practice in Azure
            </strong>
            <h3>Landing Zone</h3>
            <p>
              The command will package and deploy your application to Azure,
              with a series of prompts
            </p>
            <h3>Prerequisites</h3>
            <p>
              <strong>Landing Zone:</strong> The command will package and deploy
              your application to Azure, with a series of prompts
            </p>
            <div className="d-block text-right">
              <button
                className="next-btn"
                onClick={() => this.props.showMainView()}
              >
                Back
              </button>
              <button className="next-btn" onClick={() => this.setActiveTab(1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 1) {
      const {
        ctManagementAccountId,
        logArchiveAccountId,
        auditAccountId,
        aftManagementAccountId,
        gitHubUsername,
        ctHomeRegion,
        tfBackendSecondaryRegion,
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
              {" "}
              Create new landing zone with DevSecOps practice in Azure
            </strong>
            <h3>Landing Zone</h3>
            <p>
              The command will package and deploy your application to Azure,
              with a series of prompts
            </p>
            <div className="form-detail-group">
              <strong>Prerequisites</strong>
              <div className="form-group">
                <label>CT Management Account ID</label>
                <input
                  type="text"
                  name="ctManagementAccountId"
                  className="form-control"
                  placeholder="Enter value"
                  value={ctManagementAccountId}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.ctManagementAccountId.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Log Archive Account ID</label>
                <input
                  type="email"
                  name="logArchiveAccountId"
                  className="form-control"
                  placeholder="Enter value"
                  value={logArchiveAccountId}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.logArchiveAccountId.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Audit Account ID</label>
                <input
                  type="email"
                  name="auditAccountId"
                  className="form-control"
                  placeholder="Enter value"
                  value={auditAccountId}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.auditAccountId.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>AFT Management Account ID</label>
                <input
                  type="email"
                  name="aftManagementAccountId"
                  className="form-control"
                  placeholder="Enter value"
                  value={aftManagementAccountId}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.aftManagementAccountId.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>GitHub Username</label>
                <input
                  type="email"
                  name="gitHubUsername"
                  className="form-control"
                  placeholder="Enter value"
                  value={gitHubUsername}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.gitHubUsername.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>CT Home Region</label>
                <input
                  type="email"
                  name="ctHomeRegion"
                  className="form-control"
                  placeholder="Enter value"
                  value={ctHomeRegion}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.ctHomeRegion.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>TF Backend Secondary Region</label>
                <input
                  type="email"
                  name="tfBackendSecondaryRegion"
                  className="form-control"
                  placeholder="Enter value"
                  value={tfBackendSecondaryRegion}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.tfBackendSecondaryRegion.message}
                  </span>
                )}
              </div>
            </div>
            <div className="d-block text-right">
              <button className="next-btn" onClick={() => this.setActiveTab(0)}>
                Back
              </button>
              <button className="next-btn" onClick={this.handleSubmit}>
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
                    <label>Inputs</label>
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

export default AzureLandingZone;

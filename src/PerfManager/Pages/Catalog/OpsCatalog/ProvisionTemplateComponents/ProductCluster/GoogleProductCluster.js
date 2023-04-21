import React from "react";

class GoogleProductCluster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      region: "",
      clusterName: "",
      clusterVersion: "",
      vaultUser: "",
      selectNodeGroup: "",
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
      region: validObj,
      clusterName: validObj,
      clusterVersion: validObj,
      vaultUser: validObj,
      selectNodeGroup: validObj,
      isValid,
    };
    if (isSubmitted) {
      const {
        region,
        clusterName,
        clusterVersion,
        vaultUser,
        selectNodeGroup,
      } = this.state;
      if (!region) {
        retData.region = {
          isValid: false,
          message: "Region is required",
        };
        isValid = false;
      }
      if (!clusterName) {
        retData.clusterName = {
          isValid: false,
          message: "Cluster Name is required",
        };
        isValid = false;
      }
      if (!clusterVersion) {
        retData.clusterVersion = {
          isValid: false,
          message: "Cluster Version is required",
        };
        isValid = false;
      }
      if (!vaultUser) {
        retData.vaultUser = {
          isValid: false,
          message: "Vault User is required",
        };
        isValid = false;
      }
      if (!selectNodeGroup) {
        retData.selectNodeGroup = {
          isValid: false,
          message: "Select Node Group is required",
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
        region,
        clusterName,
        clusterVersion,
        vaultUser,
        selectNodeGroup,
      } = this.state;
      localStorage.setItem(
        "viewData",
        JSON.stringify({
          region,
          clusterName,
          clusterVersion,
          vaultUser,
          selectNodeGroup,
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
              Create new Product Cluster with DevSecOps best practice in Google
            </strong>
            <h3>Product Cluster</h3>
            <p>
              The command will package and deploy your application to Google,
              with a series of prompts
            </p>
            <h3>Prerequisites</h3>
            <p>
              <strong>Region:</strong> Google region code for creating resources
            </p>
            <p>
              <strong>Google Region:</strong> The Google region you want to
              deploy your app to use
            </p>
            <p>
              <strong>Cluster Name:</strong> Variable to provide your desired
              name for the cluster
            </p>
            <p>
              <strong>Cluster Version:</strong> Kubernetes version to use for
              the EKS cluster
            </p>
            <p>
              <strong>Vault User:</strong> The Google IAM Username whose
              credentials will be used to authenticate the Vault pods against
              Google
            </p>
            <p>
              <strong>EKS Managed Node Group:</strong> Auto provision and
              lifecycle management of nodes for Amazon EKS clusters
            </p>
            <p>
              <strong>Self-Managed Node Group:</strong> Needs to provide Launch
              template for Node initialization and registration
            </p>
            <p>
              <strong>Fargate Profile:</strong> With Google Fargate, you don't
              have to provision, configure, or scale groups of virtual machines
              on your own to run Pods
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
        region,
        clusterName,
        clusterVersion,
        vaultUser,
        selectNodeGroup,
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
              Create new Product Cluster with DevSecOps best practice in Google
            </strong>
            <h3>Product Cluster</h3>
            <p>
              The command will package and deploy your application to Google,
              with a series of prompts
            </p>
            <div className="form-detail-group">
              <strong>Prerequisites</strong>
              <div className="form-group">
                <label>Region</label>
                <select
                  className="form-control"
                  value={region}
                  onChange={this.handleStateChange}
                  name="region"
                >
                  <option>Select 1</option>
                  <option>Select 2</option>
                  <option>Select 3</option>
                </select>
                {errorData && !errorData.isValid && (
                  <span className="error">{errorData.region.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Cluster Name</label>
                <input
                  type="email"
                  name="clusterName"
                  className="form-control"
                  placeholder="Enter Value"
                  value={clusterName}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">{errorData.clusterName.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Cluster Version</label>
                <input
                  type="email"
                  name="clusterVersion"
                  className="form-control"
                  placeholder="Enter Value"
                  value={clusterVersion}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.clusterVersion.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Vault User</label>
                <input
                  type="email"
                  name="vaultUser"
                  className="form-control"
                  placeholder="Enter Value"
                  value={vaultUser}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">{errorData.vaultUser.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Select Node Group</label>
                <div className="form-group-checks">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="selectNodeGroup"
                      id="selectNodeGroup1"
                      value={selectNodeGroup}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="selectNodeGroup1"
                    >
                      EKS Managed Node Group
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="selectNodeGroup"
                      id="selectNodeGroup2"
                      value={selectNodeGroup}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="selectNodeGroup2"
                    >
                      Self Managed Node Group
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="selectNodeGroup"
                      id="selectNodeGroup3"
                      value={selectNodeGroup}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="selectNodeGroup3"
                    >
                      Fargate Profile
                    </label>
                  </div>
                </div>
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.selectNodeGroup.message}
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
                    <label>Account Creation</label>
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

export default GoogleProductCluster;

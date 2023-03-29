import React from "react";

class AwsProductEnclave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      webACLName: "",
      vpcName: "",
      vpcCIDR: "",
      privateSubnetCIDRBlocks: "",
      publicSubnetCIDRBlocks: "",
      apiGatewayName: "",
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
      webACLName: validObj,
      vpcName: validObj,
      vpcCIDR: validObj,
      privateSubnetCIDRBlocks: validObj,
      publicSubnetCIDRBlocks: validObj,
      apiGatewayName: validObj,
      isValid,
    };
    if (isSubmitted) {
      const {
        webACLName,
        vpcName,
        vpcCIDR,
        privateSubnetCIDRBlocks,
        publicSubnetCIDRBlocks,
        apiGatewayName,
      } = this.state;
      if (!webACLName) {
        retData.webACLName = {
          isValid: false,
          message: "Web ACL Name is required",
        };
        isValid = false;
      }
      if (!vpcName) {
        retData.vpcName = {
          isValid: false,
          message: "VPC Name is required",
        };
        isValid = false;
      }
      if (!vpcCIDR) {
        retData.vpcCIDR = {
          isValid: false,
          message: "VPC CIDR is required",
        };
        isValid = false;
      }
      if (!privateSubnetCIDRBlocks) {
        retData.privateSubnetCIDRBlocks = {
          isValid: false,
          message: "Private Subnet CIDR Blocks is required",
        };
        isValid = false;
      }
      if (!publicSubnetCIDRBlocks) {
        retData.publicSubnetCIDRBlocks = {
          isValid: false,
          message: "Public Subnet CIDR Blocks is required",
        };
        isValid = false;
      }
      if (!apiGatewayName) {
        retData.apiGatewayName = {
          isValid: false,
          message: "API Gateway Name is required",
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
        webACLName,
        vpcName,
        vpcCIDR,
        privateSubnetCIDRBlocks,
        publicSubnetCIDRBlocks,
        apiGatewayName,
      } = this.state;
      localStorage.setItem(
        "viewData",
        JSON.stringify({
          webACLName,
          vpcName,
          vpcCIDR,
          privateSubnetCIDRBlocks,
          publicSubnetCIDRBlocks,
          apiGatewayName,
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
              Create new Product Enclave with DevSecOps best practice in AWS
            </strong>
            <h3>Product Enclave</h3>
            <p>
              The command will package and deploy your application to AWS, with
              a series of prompts
            </p>
            <h3>Prerequisites</h3>
            <p>
              <strong>Product Enclave:</strong> The command will package and
              deploy your application to AWS, with a series of prompts
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
        webACLName,
        vpcName,
        vpcCIDR,
        privateSubnetCIDRBlocks,
        publicSubnetCIDRBlocks,
        apiGatewayName,
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
              Create new Product Enclave with DevSecOps practice in AWS
            </strong>
            <h3>Product Enclave</h3>
            <p>
              The command will package and deploy your application to AWS, with
              a series of prompts
            </p>
            <div className="form-detail-group">
              <strong>Prerequisites</strong>
              <div className="form-group">
                <label>Web ACL Name</label>
                <input
                  type="text"
                  name="webACLName"
                  className="form-control"
                  placeholder="Enter value"
                  value={webACLName}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">{errorData.webACLName.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>VPC Name</label>
                <input
                  type="email"
                  name="vpcName"
                  className="form-control"
                  placeholder="Enter value"
                  value={vpcName}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">{errorData.vpcName.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>VPC CIDR</label>
                <input
                  type="email"
                  name="vpcCIDR"
                  className="form-control"
                  placeholder="Enter value"
                  value={vpcCIDR}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">{errorData.vpcCIDR.message}</span>
                )}
              </div>
              <div className="form-group">
                <label>Private Subnet CIDR Blocks</label>
                <input
                  type="email"
                  name="privateSubnetCIDRBlocks"
                  className="form-control"
                  placeholder="Enter value"
                  value={privateSubnetCIDRBlocks}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.privateSubnetCIDRBlocks.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Public Subnet CIDR Blocks</label>
                <input
                  type="email"
                  name="publicSubnetCIDRBlocks"
                  className="form-control"
                  placeholder="Enter value"
                  value={publicSubnetCIDRBlocks}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.publicSubnetCIDRBlocks.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>API Gateway Name</label>
                <input
                  type="email"
                  name="apiGatewayName"
                  className="form-control"
                  placeholder="Enter value"
                  value={apiGatewayName}
                  onChange={this.handleStateChange}
                />
                {errorData && !errorData.isValid && (
                  <span className="error">
                    {errorData.apiGatewayName.message}
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

export default AwsProductEnclave;

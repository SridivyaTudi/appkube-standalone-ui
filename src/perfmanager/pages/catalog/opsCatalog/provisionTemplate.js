import React from "react";
import awsIcon from "../img/aws-2.png";
import azureIcon from "../img/azure-1.png";
import googleCloudIcon from "../img/google-cloud-1.png";
import acronisIcon from "../img/acronis.png";
import Filter from "./../filter";
import AwsProductCluster from "./ProvisionTemplateComponents/ProductCluster/AwsProductCluster";
import AzureProductCluster from "./ProvisionTemplateComponents/ProductCluster/AzureProductCluster";
import GoogleProductCluster from "./ProvisionTemplateComponents/ProductCluster/GoogleProductCluster";
import AwsDocumentManagement from "./ProvisionTemplateComponents/DocumentManagement/AwsDocumentManagement";
import AzureDocumentManagement from "./ProvisionTemplateComponents/DocumentManagement/AzureDocumentManagement";
import AwsLandingZone from "./ProvisionTemplateComponents/LandingZone/AwsLandingZone";
import AzureLandingZone from "./ProvisionTemplateComponents/LandingZone/AzureLandingZone";
import GoogleLandingZone from "./ProvisionTemplateComponents/LandingZone/GoogleLandingZone";
import AwsProductEnclave from "./ProvisionTemplateComponents/ProducEnclave/AwsProductEnclave";
import GoogleCommonServiceFIleRepo from "./ProvisionTemplateComponents/CommonServiceFIleRepo/GoogleCommonServiceFIleRepo";
import AzureProductEnclave from "./ProvisionTemplateComponents/ProducEnclave/AzureProductEnclave";
import GoogleProductEnclave from "./ProvisionTemplateComponents/ProducEnclave/GoogleProductEnclave";

class ProvisioningTemplates extends React.Component {
  componentMapping = {
    "ProductCluster-AWS": AwsProductCluster,
    "ProductCluster-Azure": AzureProductCluster,
    "ProductCluster-Google": GoogleProductCluster,
    "CommonService-AWS": AwsDocumentManagement,
    "CommonService-Azure": AzureDocumentManagement,
    "CommonService-Google": GoogleCommonServiceFIleRepo,
    "LandingZone-AWS": AwsLandingZone,
    "LandingZone-Azure": AzureLandingZone,
    "LandingZone-Google": GoogleLandingZone,
    "ProductEnclave-AWS": AwsProductEnclave,
    "ProductEnclave-Azure": AzureProductEnclave,
    "ProductEnclave-Google": GoogleProductEnclave,
  };
  constructor(props) {
    super(props);
    this.state = {
      view: "grid",
      type: "",
      associatedCloud: "",
      dashboards: this.props.data || [],

      filterData: [
        {
          name: "Cloud",
          key: "associatedCloud",
          filter: [],
        },
        {
          name: "Creds",
          key: "associatedCreds",
          filter: [],
        },
      ],
      selectedFilter: {},
    };
  }

  componentDidMount() {
    this.createFilterJson();
  }

  dashboardsView = (type) => {
    this.setState({ view: type });
  };

  showMainView = () => {
    this.setState({
      type: "",
      associatedCloud: "",
    });
  };

  createFilterJson = () => {
    let { dashboards, filterData } = this.state;
    const filterKeys = ["associatedCloud", "associatedCreds"];
    const filteredData = {};
    for (let i = 0; i < dashboards.length; i++) {
      let dashboard = dashboards[i];
      for (let j = 0; j < filterKeys.length; j++) {
        const filter = filterKeys[j];
        filteredData[filter] = filteredData[filter] || [];
        if (filteredData[filter].indexOf(dashboard[filter]) === -1) {
          filteredData[filter].push(dashboard[filter]);
        }
      }
    }
    if (
      filterKeys &&
      filterData &&
      filterData.length > 0 &&
      filterKeys.length > 0
    ) {
      for (let i = 0; i < filterData.length; i++) {
        for (let k = 0; k < filterKeys.length; k++) {
          const filter = filterKeys[k];
          for (let j = 0; j < filteredData[filter].length; j++) {
            let filters = filteredData[filter][j];
            if (filterData[i].key == filter) {
              filterData[i].filter.push({ value: filters, label: filters });
            }
          }
        }
      }
    }
    this.setState({
      filterData,
    });
  };

  renderDashboards = (dashboards) => {
    let retData = [];
    if (dashboards && dashboards.length > 0) {
      retData = [];
      for (let i = 0; i < dashboards.length; i++) {
        const { associatedCloud, name, Type, description, associatedCreds } =
          dashboards[i];
        const { view } = this.state;
        if (this.hideDashboard(associatedCreds, associatedCloud)) {
          retData.push(
            <div
              className={`col-sm-12 ${
                view === "grid" ? "col-md-6" : "col-md-12"
              }`}
              onClick={() => this.setActiveView(Type, associatedCloud)}
            >
              <div className="template-box">
                <div className="heading">
                  {associatedCloud === "AWS" && (
                    <img src={awsIcon} alt={name} />
                  )}
                  {associatedCloud === "Azure" && (
                    <img src={azureIcon} alt={name} />
                  )}
                  {associatedCloud === "Google" && (
                    <img src={googleCloudIcon} alt={name} />
                  )}
                  {associatedCloud === "Acronis" && (
                    <img src={acronisIcon} alt={name} />
                  )}
                  {name}
                </div>
                <div className="text">{description}</div>
              </div>
            </div>
          );
        }
      }
      if (retData.length === 0) {
        retData.push(
          <div style={{ paddingLeft: "20px" }}>
            No dashboard found for applied filter
          </div>
        );
      }
    } else {
      retData = [];
      retData.push(<div style={{ paddingLeft: "20px" }}>No Data Found</div>);
    }
    return retData;
  };

  hideDashboard = (associatedCreds, associatedCloud) => {
    const { selectedFilter } = this.state;
    const isassociatedCreds =
      !selectedFilter["associatedCreds"] ||
      (selectedFilter["associatedCreds"] &&
        selectedFilter["associatedCreds"].indexOf(associatedCreds) !== -1);
    const isassociatedCloud =
      !selectedFilter["associatedCloud"] ||
      (selectedFilter["associatedCloud"] &&
        selectedFilter["associatedCloud"].indexOf(associatedCloud) !== -1);
    return isassociatedCreds && isassociatedCloud;
  };

  filterValues = (e) => {
    const { value } = e.target;
    let duplicatdashboards = JSON.parse(JSON.stringify(this.props.data)) || [];
    let filtedValue = [];
    if (value) {
      for (let i = 0; i < duplicatdashboards.length; i++) {
        if (
          duplicatdashboards[i].name
            .toLowerCase()
            .indexOf(value.toLowerCase()) !== -1
        ) {
          filtedValue.push(duplicatdashboards[i]);
        }
      }
      this.setState({ dashboards: filtedValue });
    } else {
      if (this.props.data && this.props.data.length > 0) {
        this.setState({ dashboards: this.props.data });
      }
    }
  };

  formFields = () => {
    const { view, dashboards } = this.state;
    return (
      <div className="catalogue-right-container">
        <div>
          Select a template to start with. You can use filters or the seach box
          the scope.
        </div>
        <div className="templated-search">
          <div className="row">
            <div className="col-sm-10">
              <div className="search-box">
                <form>
                  <div className="form-group search-control-group m-b-0">
                    <input
                      type="text"
                      className="input-group-text"
                      onChange={(e) => this.filterValues(e)}
                      placeholder="Search Template here"
                    />
                    <button className="search-button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="btnContainer">
                <button
                  className={
                    view == "grid" ? "btn btn-grid btn-active" : "btn btn-grid"
                  }
                  onClick={() => this.dashboardsView("grid")}
                >
                  <i className="fa fa-th-large"></i>
                </button>
                <button
                  className={
                    view == "list" ? "btn btn-list btn-active" : "btn btn-list"
                  }
                  onClick={() => this.dashboardsView("list")}
                >
                  <i className="fa fa-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="templated-boxs">
          <div className="row">{this.renderDashboards(dashboards)}</div>
        </div>
      </div>
    );
  };

  setActiveView = (type, associatedCloud) => {
    this.setState({
      type,
      associatedCloud,
    });
  };

  onChangeFilter = (filters) => {
    this.setState({
      selectedFilter: filters,
    });
  };

  render() {
    const { type, associatedCloud, filterData } = this.state;
    let ActiveViewComponent = null;
    if (type !== "" && associatedCloud !== "") {
      ActiveViewComponent = this.componentMapping[`${type}-${associatedCloud}`];
    }
    return ActiveViewComponent ? (
      <ActiveViewComponent showMainView={this.showMainView} />
    ) : (
      <div className="catalogue-inner-tabs-container templates-container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-r-p">
            <Filter
              filterJsonData={filterData}
              onChangeFilter={this.onChangeFilter}
            />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 col-l-p">
            {this.formFields()}
          </div>
        </div>
      </div>
    );
  }
}

export default ProvisioningTemplates;

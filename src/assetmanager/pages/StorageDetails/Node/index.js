import React from "react";
import { images } from "../../../img";
import WebServiceWizard from "./WebServiceWizard";
import Monitor from "./Monitor";
import { CommonService } from "../../_common/common";
// import { configFun } from "../../../config";
import { RestService } from "../../_service/RestService";
// import { PLUGIN_BASE_URL } from './../../../constants';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      accountId: "",
      serviceData: props.serviceData,
      cloudName: "",
      steps: [
        {
          name: "Performance",
          component: Monitor,
          apiKey: "performance",
        },
        {
          name: "Availability",
          component: Monitor,
          apiKey: "availability",
        },
        {
          name: "Reliability",
          component: Monitor,
          apiKey: "reliability",
        },
        {
          name: "End Usage",
          component: Monitor,
          apiKey: "endUsage",
        },
        {
          name: "Security",
          component: Monitor,
          apiKey: "security",
        },
        {
          name: "Compliance",
          component: Monitor,
          apiKey: "compliance",
        },
        {
          name: "Alerts",
          component: Monitor,
          apiKey: "alerts",
        },
      ],
      dashboardData: [],
      viewJson: {},
      collapseInfo: false,
      dataSourceInstances: [],
      cloudDashBoards: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.serviceData) !==
      JSON.stringify(this.props.serviceData)
    ) {
      this.setState({
        currentStep: 0,
        serviceData: this.props.serviceData,
      });
    }
  }

  componentDidMount() {
    const accountId = CommonService.getParameterByName(
      "accountId",
      window.location.href
    );
    const cloudName = CommonService.getParameterByName(
      "cloudName",
      window.location.href
    );
    if (accountId) {
      this.setState({
        accountId,
        cloudName: cloudName ? cloudName.toLowerCase() : "",
      });
    }
    this.getCatalogues();
    this.getDataSourceInstances(accountId);
    this.getAddedDashboards();
  }

  displaylist = (list) => {
    let retData = [];
    for (let i = 0; i < list.length; i++) {
      retData.push(
        <li>
          <i className="fa fa-angle-right" aria-hidden="true"></i>
          {list[i].name}
        </li>
      );
    }
    return retData;
  };

  getCatalogues = () => {
    try {
      RestService.getData(
        `http://34.199.12.114:5057/api/catalogue/search`,
        null,
        null
      ).then(
        (response) => {
          const { cloudDashBoards } = response.details.ops;
          this.setState({
            cloudDashBoards,
          });
          if (this.state.dataSourceInstances.length > 0) {
            const dashboardData = this.manipulateCatalogueData(
              this.state.dataSourceInstances,
              cloudDashBoards
            );
            this.setState({
              dashboardData,
            });
          }
        },
        (error) => {
          console.log(
            "Performance. Search input config failed. Error: ",
            error
          );
        }
      );
    } catch (err) {
      console.log(
        "Performance. Excepiton in search input this.config. Error: ",
        err
      );
    }
  };

  getDataSourceInstances = (accountId) => {
    try {
      RestService.getData(
        `http://localhost:3000/api/datasources/accountid/${accountId}`,
        null,
        null
      ).then((response) => {
        this.setState({
          dataSourceInstances: response,
        });
        if (this.state.cloudDashBoards.length > 0) {
          const dashboardData = this.manipulateCatalogueData(
            response,
            this.state.cloudDashBoards
          );
          this.setState({
            dashboardData,
          });
        }
      });
    } catch (err) {
      console.log("Loading Asstes failed. Error: ", err);
    }
  };

  manipulateCatalogueData = (dataSources, dashboards) => {
    const { cloudName } = this.state;
    const retData = [];
    dataSources.forEach((dataSource) => {
      const name = dataSource.inputType;
      if (cloudName === dataSource.cloudType.toLowerCase()) {
        dashboards.forEach((dashboard) => {
          if (name === dashboard.associatedDataSourceType) {
            dataSource.isDashboardAdded = true;
            dataSource.dashboards = dataSource.dashboards || [];
            dataSource.dashboards.push(dashboard);
          }
        });
        retData.push(dataSource);
      }
    });
    return retData;
  };

  getAddedDashboards = () => {
    const { serviceData } = this.props;
    const serviceId = serviceData.id;
    try {
      RestService.getData(
        `${this.config.ADD_VIEW_JSON_TO_GRAFANA}?serviceId=${serviceId}`,
        null,
        null
      ).then(
        (response) => {
          this.setState({
            viewJson: response,
          });
        },
        (error) => {
          console.log(
            "Performance. Search input config failed. Error: ",
            error
          );
        }
      );
    } catch (err) {
      console.log(
        "Performance. Excepiton in search input this.config. Error: ",
        err
      );
    }
  };

  getPerformanceClass = (score) => {
    if (score >= 75) {
      return "green";
    } else if (score >= 50) {
      return "orange";
    } else if (score >= 25) {
      return "yellow";
    } else {
      return "red";
    }
  };

  render() {
    const { accountId, steps, dashboardData, viewJson, collapseInfo } =
      this.state;
    const { serviceData } = this.props;
    return (
      <div className="inner">
        <div className="heading">
          <h3>
            <span>
              <img src={images.awsLogo} alt="" />
            </span>
            Amazon Web Services
          </h3>
          <div className="breadcrumbs">
            <ul>
              <li>
                Account Number - <span>AWS-({accountId})</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="account-box">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-10 col-md-10 col-sm-10">
              <div className="breadcrumbs">
                <ul>
                  <li>
                    <span>AWS-({accountId})</span>
                  </li>
                  &nbsp;{">"}&nbsp;{serviceData.labelText}
                </ul>
              </div>
            </div>
            <div
              className="col-lg-2 col-md-2 col-sm-2"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button
                style={{ borderColor: "transparent" }}
                onClick={() =>
                  this.setState({
                    collapseInfo: !collapseInfo,
                  })
                }
              >
                <i
                  className={`fa ${
                    collapseInfo ? "fa-arrow-down" : "fa-arrow-up"
                  }`}
                ></i>
              </button>
            </div>
          </div>
        </div>
        {serviceData ? (
          <div
            className="services-displayed-here"
            style={{ display: collapseInfo ? "none" : "block" }}
          >
            <div className="row">
              <div className="col-md-6">
                <div className="services-text">
                  <label>Organisation Unit</label>
                  <span>{serviceData.organizationUnit}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="services-text">
                  <label>Associated Product</label>
                  <span>{serviceData.associatedProduct}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="services-text">
                  <label>Associated Element</label>
                  <span>{serviceData.associatedCloudElementType}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="services-text">
                  <label>Added At</label>
                  <span>Feb 01, 2021 21:30</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="services-text">
                  <label>Associated Environment</label>
                  <span>{serviceData.asscociatedEnv}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="services-text">
                  <label>Service Type</label>
                  <span>{serviceData.serviceType}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="services-text">
                  <label>Alerts</label>
                  <span>2</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="services-text">
                  <label>Service Score</label>
                  <span
                    className={`status ${this.getPerformanceClass(
                      serviceData.serviceScore
                    )}`}
                  >
                    {serviceData.serviceScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <WebServiceWizard
          steps={steps}
          {...this.props}
          dashboardData={dashboardData}
          viewJson={viewJson}
          getAddedDashboards={this.getAddedDashboards}
        />
      </div>
    );
  }
}
export default Node;

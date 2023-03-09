import * as React from "react";
import { RestService } from "../../../_service/RestService";

class VerifyInputs extends React.Component {
  config;
  constructor(props) {
    super(props);
    this.state = {
      inputName: this.props.inputName,
      configureInputs: false,
      dashboardData: [],
      dataSourceTypes: [],
      accountId: "",
      cloudName: "",
    };
    // this.config = configFun(
    //   props.meta.jsonData.apiUrl,
    //   props.meta.jsonData.mainProductUrl
    // );
  }

  componentDidMount() {
    const queryPrm = new URLSearchParams(document.location.search);
    const accountId = queryPrm.get("accountId");
    const cloudName = queryPrm.get("cloudName");
    this.setState({
      accountId,
      cloudName: cloudName ? cloudName.toLowerCase() : "",
    });
  }

  getDataSourceInstances = (accountId) => {
    try {
      RestService.getData(
        `${this.config.GRAFANA_DATASOURCE_API}/accountid/${accountId}`,
        null,
        null
      ).then((response) => {
        const dataSourceTypes = response.map((res) => res.cloudType);
        this.setState({
          dataSourceTypes: dataSourceTypes,
        });
      });
    } catch (err) {
      console.log("Loading Asstes failed. Error: ", err);
    }
  };

  configureInputs = async () => {
    this.setState({
      configureInputs: !this.state.configureInputs,
    });
  };

  setDashboardData = (data) => {
    this.setState({
      dashboardData: data,
    });
  };

  handleChange(e, dataSourceIndex, dashboardIndex) {
    const { checked } = e.target;
    const { dashboardData } = this.state;
    dashboardData[dataSourceIndex].dashboards[dashboardIndex].isChecked =
      checked;
    this.setState({
      dashboardData,
    });
  }

  getSelectedDashboards = () => {
    const { isSelected, dashboardData } = this.checkIfDashboardSelected();
    if (isSelected) {
      return dashboardData;
    }
    return false;
  };

  checkIfDashboardSelected = () => {
    const { dashboardData } = this.state;
    let isSelected = false;
    for (let i = 0; i < dashboardData.length; i++) {
      const dashboards = dashboardData[i].dashboards;
      dashboardData[i].isChecked = false;
      if (dashboards) {
        for (let j = 0; j < dashboards.length; j++) {
          if (dashboards[j].isChecked) {
            isSelected = true;
            dashboardData[i].isChecked = true;
            break;
          }
        }
      }
    }
    return {
      isSelected,
      dashboardData,
    };
  };

  displayTable = () => {
    let retData = [];
    const { dashboardData, cloudName } = this.state;
    const { apiKey, serviceData } = this.props;
    dashboardData.forEach((dataSource, dataSourceIndex) => {
      const { dashboards } = dataSource;
      const dashboardJSX = [];
      if (dashboards) {
        const associatedCloudElementType =
          serviceData.associatedCloudElementType
            ? serviceData.associatedCloudElementType.toLowerCase()
            : "";
        dashboards.forEach((dashboard, dashboardIndex) => {
          if (
            dashboard.associatedSLAType.toLowerCase() ===
              apiKey.toLowerCase() &&
            associatedCloudElementType ===
              dashboard.associatedCloudElementType.toLowerCase() &&
            cloudName === dashboard.associatedCloud.toLowerCase()
          ) {
            dashboardJSX.push(
              <tbody key={`${dataSourceIndex}-${dashboardIndex}-datasource`}>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={dashboard.isChecked}
                      onChange={(e) =>
                        this.handleChange(e, dataSourceIndex, dashboardIndex)
                      }
                    />
                  </td>
                  <td>{dashboard.name}</td>
                </tr>
              </tbody>
            );
          }
        });
      }
      retData.push(
        <table
          key={`${dataSourceIndex}-datasource`}
          className="table-tbody first-table"
          width="100%"
        >
          <tr>
            <td style={{ paddingLeft: "0", paddingRight: "0" }}>
              <table width="100%">
                <tr>
                  <td>
                    <a>{dataSource.name}</a>
                  </td>
                  <td>
                    <a>{dataSource.inputType}</a>
                  </td>
                  <td>
                    <table className="table-inner" width="100%">
                      {dashboardJSX}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      );
    });
    if (retData.length === 0) {
      retData = (
        <table className="table-tbody first-table" width="100%">
          <tr>
            <td
              style={{
                paddingLeft: "0",
                paddingRight: "0",
                textAlign: "center",
              }}
            >
              There is no dashboard available.
            </td>
          </tr>
        </table>
      );
    }
    return retData;
  };

  render() {
    const { configureInputs } = this.state;
    return (
      <div className="verify-inputs-section">
        {!configureInputs && (
          <div className="configure-inputs-section">
            <p>
              Please click below to configure inputs for Performance Monitoring
            </p>
            <button
              className="asset-blue-button"
              onClick={this.configureInputs}
            >
              Configure inputs
            </button>
          </div>
        )}
        {configureInputs && (
          <div className="configure-inputs-table">
            <table className="table-thead" width="100%">
              <tr>
                <th>Input</th>
                <th>Input Type</th>
                <th>Available Dashboards</th>
              </tr>
            </table>
            {this.displayTable()}
          </div>
        )}
      </div>
    );
  }
}

export default VerifyInputs;

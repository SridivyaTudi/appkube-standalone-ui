import * as React from "react";
import { RestService } from "../../../_service/RestService";
import { v4 } from "uuid";
import { CommonService } from "../../../_common/common";

class VerifyAndSave extends React.Component {
  config;
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: [],
      selectedDashboards: [],
      dashboardJSON: [],
      isLoading: false,
    };
    // this.config = configFun(
    //   props.meta.jsonData.apiUrl,
    //   props.meta.jsonData.mainProductUrl
    // );
  }

  setDashboardData = (data) => {
    const selectedDashboards = this.manipulateDashboardData(data);
    this.setState({
      dashboardData: data,
      selectedDashboards,
    });
    this.retriveDashboardJSONData(selectedDashboards);
  };

  manipulateDashboardData = (data) => {
    const dashboards = [];
    data.forEach((dataSource) => {
      if (dataSource.isChecked) {
        dataSource.dashboards.forEach((dashboard) => {
          if (dashboard.isChecked) {
            dashboard.datasourceName = dataSource.name;
            dashboards.push(dashboard);
          }
        });
      }
    });
    return dashboards;
  };

  displayTable = () => {
    const retData = [];
    const { dashboardData } = this.state;
    dashboardData.forEach((dataSource, dataSourceIndex) => {
      if (dataSource.isChecked) {
        const { dashboards } = dataSource;
        const dashboardJSX = [];
        dashboards.forEach((dashboard, dashboardIndex) => {
          if (dashboard.isChecked) {
            dashboardJSX.push(
              <tbody key={v4()}>
                <tr>
                  <td>
                    <input type="checkbox" checked={dashboard.isChecked} />
                  </td>
                  <td>{dashboard.name}</td>
                  {/* <td>
                                        <a>
                                            <i className="fa fa-eye"></i>
                                        </a>
                                    </td> */}
                </tr>
              </tbody>
            );
          }
        });
        retData.push(
          <table key={v4()} className="table-tbody first-table" width="100%">
            <tr>
              <td style={{ paddingLeft: "0", paddingRight: "0" }}>
                <table width="100%">
                  <tr>
                    <td>
                      <a>{dataSource.name}</a>
                    </td>
                    <td>
                      <a>{dataSource.type}</a>
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
      }
    });
    return retData;
  };

  retriveDashboardJSONData = (dashboards) => {
    const { disableSubmitButton, serviceData } = this.props;
    const accountId = CommonService.getParameterByName(
      "accountId",
      window.location.href
    );
    const dashboardJSON = [];
    if (dashboards.length > 0) {
      this.setState({
        isLoading: true,
      });
      disableSubmitButton(true);
    }
    for (let i = 0; i < dashboards.length; i++) {
      const { associatedCloudElementId } = serviceData;
      const {
        jsonLocation,
        associatedCloudElementType,
        associatedSLAType,
        associatedCloud,
        id,
        datasourceName,
      } = dashboards[i];
      if (
        datasourceName &&
        jsonLocation &&
        associatedCloudElementType &&
        associatedSLAType &&
        associatedCloud &&
        associatedCloudElementId
      ) {
        const url = `${this.config.PREVIEW_DASHBOARDS_URL}?dataSourceName=${datasourceName}&associatedCloudElementType=${associatedCloudElementType}&associatedSLAType=${associatedSLAType}&jsonLocation=${jsonLocation}&associatedCloud=${associatedCloud}&accountId=${accountId}&associatedCloudElementId=${associatedCloudElementId}`;
        try {
          RestService.getData(url, null, null).then(
            (res) => {
              disableSubmitButton(false);
              dashboardJSON.push({
                dashboardCatalogueId: id,
                ...res,
              });
              this.checkIfAllDashboardLoaded(dashboardJSON);
            },
            (err) => {
              disableSubmitButton(false);
              dashboardJSON.push(null);
              this.checkIfAllDashboardLoaded(dashboardJSON);
            }
          );
        } catch (err) {
          disableSubmitButton(false);
          console.log("Loading aws regions failed. Error: ", err);
          dashboardJSON.push(null);
          this.checkIfAllDashboardLoaded(dashboardJSON);
        }
      }
    }
  };

  checkIfAllDashboardLoaded = (dashboardJSON) => {
    const { selectedDashboards } = this.state;
    if (selectedDashboards.length === dashboardJSON.length) {
      this.setState({
        isLoading: false,
        dashboardJSON,
      });
    }
  };

  getDashboardJSONData = () => {
    if (this.state.isLoading) {
      return false;
    }
    return this.state.dashboardJSON;
  };

  render() {
    return (
      <div className="verify-inputs-section">
        <div className="configure-inputs-table verify-and-save-table">
          <div className="following-node">
            Following Dashboard's will be enabled for Performance Monitoring of
            the node
          </div>
          <table className="table-thead" width="100%">
            <tr>
              <th>Input</th>
              <th>Input Type</th>
              <th>Dashboards</th>
            </tr>
          </table>
          {this.displayTable()}
        </div>
      </div>
    );
  }
}

export default VerifyAndSave;

import React from "react";
import { RestService } from "../../../Services/RestService";
import config from "../../../config";

class PopupContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      alert: this.props.alert,
      client_url: this.props.alert.clientUrl,
      historyTableArray: [],
      iFrameLoaded: false,
      guid: this.props.alert.guid,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  async componentDidMount() {
    let guid = this.state.guid;
    try {
      await RestService.getData(
        config.GET_ALERT_ACTIVITIES + "/" + guid,
        null,
        null
      ).then((response) => {
        console.log("Response : ", response);
        this.setState({
          historyTableArray: response,
        });
      });
    } catch (err) {
      console.log("Loading company data failed. Error: ", err);
    }
  }

  historyTable = () => {
    const retData = [];
    const { historyTableArray } = this.state;
    for (let i = 0; i < historyTableArray.length; i++) {
      const historyTable = historyTableArray[i];
      retData.push(
        <tr>
          <td>{historyTable.action}</td>
          <td>{historyTable.actionDescription}</td>
          <td>{historyTable.updatedOn}</td>
        </tr>
      );
    }
    return retData;
  };

  diagnosticsTable = () => {
    const retData = [];
    const { alert } = this.state;
    retData.push(
      <tr>
        <td>
          <span>{alert.name}</span>
        </td>
        <td>
          <span className="urgent">{alert.severity}</span>
        </td>
        <td>
          <i className="fa fa-exclamation-triangle"></i>{" "}
          {alert.monitorcondition}
        </td>
        <td>{alert.alertState}</td>
        <td>{alert.affectedresource}</td>
      </tr>
    );
    return retData;
  };

  onIframeLoaded = () => {
    setTimeout(() => {
      this.setState({
        iFrameLoaded: true,
      });
    }, 500);
  };

  render() {
    const { activeTab, iFrameLoaded, alert } = this.state;
    return (
      <div className="percentage-tabs">
        <ul>
          <li
            className={activeTab === 0 ? "active-tab" : ""}
            onClick={(e) => this.setActiveTab(0)}
          >
            <a href="#">Summary</a>
          </li>
          <li
            className={activeTab === 1 ? "active-tab" : ""}
            onClick={(e) => this.setActiveTab(1)}
          >
            <a href="#">History</a>
          </li>
          <li
            className={activeTab === 2 ? "active-tab" : ""}
            onClick={(e) => this.setActiveTab(2)}
          >
            <a href="#">Diagnostics</a>
          </li>
        </ul>
        <div className="tab-container">
          {activeTab === 0 && (
            <div>
              {alert.client === "EXTERNAL SERVICE" && (
                <div style={{ textAlign: "center" }}>
                  Client is the external data source.
                </div>
              )}
              {alert.client !== "EXTERNAL SERVICE" && (
                <>
                  <div style={{ display: iFrameLoaded ? "" : "none" }}>
                    <iframe
                      style={{ width: "100%", height: "450px", border: "none" }}
                      src={this.state.client_url}
                      onLoad={this.onIframeLoaded}
                    ></iframe>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      display: iFrameLoaded ? "none" : "",
                    }}
                  >
                    Data is loading...
                  </div>
                </>
              )}
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <table style={{ width: "100%" }} className="table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Action Description</th>
                    <th>Date/Time</th>
                  </tr>
                </thead>
                <tbody>{this.historyTable()}</tbody>
              </table>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <table style={{ width: "100%" }} className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Severity</th>
                    <th>Monitor Condition</th>
                    <th>Alert State</th>
                    <th>Affected Resource</th>
                  </tr>
                </thead>
                <tbody>{this.diagnosticsTable()}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PopupContent;

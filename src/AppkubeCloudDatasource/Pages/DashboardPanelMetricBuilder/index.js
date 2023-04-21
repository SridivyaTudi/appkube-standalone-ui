import React from "react";
import queryIcon from "../../../assets/img/appkubeCloudDatasource/img/query-icon.png";
import transformatioIcon from "../../../assets/img/appkubeCloudDatasource/img/transformatio-icon.png";
import alertIcon from "../../../assets/img/appkubeCloudDatasource/img/alert-icon.png";
import QueryTab from "./QueryTab";
import TransformationTab from "./TransformationTab";
import AlertTab from "./AlertTab";
import Panel from "./SideBar/Panel";
import Field from "./SideBar/Field";
import OverRides from "./SideBar/OverRides";

class DashboardPanelMetricBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "query",
      currentSideBarTab: "panel",
    };
  }

  handleTabChange = (tab) => {
    this.setState({ currentTab: tab });
  };

  handleSideBarTabChange = (tab) => {
    this.setState({ currentSideBarTab: tab });
  };

  render() {
    const { currentTab, currentSideBarTab } = this.state;
    return (
      <div className="asset-container">
        <div className="dashboard-panel-container">
          <div className="common-container">
            <div className="d-block page-heading">
              <div className="row">
                <div className="col-lg-9 col-md-7 col-sm-12">
                  <div className="heading-left"><h4><strong>New Dashboard / Add Panel</strong></h4></div>
                </div>
                <div className="col-lg-3 col-md-5 col-sm-12">
                  <div className="heading-right">
                    <button className="panel-gray-button min-width-inherit">
                      Save
                    </button>
                    <button className="panel-gray-button min-width-inherit">
                      Discard
                    </button>
                    <button className="panel-white-button min-width-inherit close-button">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block add-panel-container">
              <div className="row">
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <div className="d-block panel-left">
                    <div className="d-block graph-panel">
                      <div className="d-flex graph-top-panel">
                        <div className="d-inline-flex buttons">
                          <button className="panel-gray-button min-width-inherit">
                            Fill
                          </button>
                          <button className="panel-gray-button min-width-inherit">
                            Fit
                          </button>
                          <button className="panel-gray-button min-width-inherit">
                            Exact
                          </button>
                        </div>
                        <div className="d-inline-flex hours-dropdown">
                          <input type="radio" />
                          <strong>Last 6 hours</strong>
                          <i class="fa fa-chevron-down"></i>
                        </div>
                        <div className="d-inline-flex arrows-buttons">
                          <button className="panel-gray-button min-width-inherit">
                            <i class="fa fa-search"></i>
                          </button>
                          <button className="panel-gray-button min-width-inherit">
                            <i class="fa fa-sync-alt"></i>
                          </button>
                          <button className="panel-gray-button min-width-inherit">
                            <i class="fa fa-chevron-down"></i>
                          </button>
                        </div>
                      </div>
                      <div className="d-block graph-panel"></div>
                    </div>
                    <div className="d-block panel-buttons">
                      <button
                        className={
                          currentTab === "query"
                            ? "panel-gray-button active"
                            : "panel-gray-button"
                        }
                        onClick={() => this.handleTabChange("query")}
                      >
                        <img src={queryIcon} alt="" />
                        Query
                        <span>10</span>
                      </button>
                      <button
                        className={
                          currentTab === "transformation"
                            ? "panel-gray-button active"
                            : "panel-gray-button"
                        }
                        onClick={() => this.handleTabChange("transformation")}
                      >
                        <img src={transformatioIcon} alt="" />
                        Transformation
                        <span>0</span>
                      </button>
                      <button
                        className={
                          currentTab === "alert"
                            ? "panel-gray-button active"
                            : "panel-gray-button"
                        }
                        onClick={() => this.handleTabChange("alert")}
                      >
                        <img src={alertIcon} alt="" />
                        Alert
                        <span>0</span>
                      </button>
                    </div>
                    {currentTab === "query" ? (
                      <QueryTab />
                    ) : currentTab === "transformation" ? (
                      <TransformationTab />
                    ) : currentTab === "alert" ? (
                      <AlertTab />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12">
                  <div className="d-block panel-right">
                    <div className="d-inline-flex buttons">
                      <button
                        className={`panel-gray-button min-width-inherit ${
                          currentSideBarTab === "panel" && "active"
                        }`}
                        onClick={() => this.handleSideBarTabChange("panel")}
                      >
                        Panel
                      </button>
                      <button
                        className={`panel-gray-button min-width-inherit ${
                          currentSideBarTab === "field" && "active"
                        }`}
                        onClick={() => this.handleSideBarTabChange("field")}
                      >
                        Field
                      </button>
                      <button
                        className={`panel-gray-button min-width-inherit ${
                          currentSideBarTab === "overrides" && "active"
                        }`}
                        onClick={() => this.handleSideBarTabChange("overrides")}
                      >
                        Overrides
                      </button>
                    </div>
                    {currentSideBarTab === "panel" ? (
                      <Panel />
                    ) : currentSideBarTab === "field" ? (
                      <Field />
                    ) : (
                      currentSideBarTab === "overrides" && <OverRides />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPanelMetricBuilder;

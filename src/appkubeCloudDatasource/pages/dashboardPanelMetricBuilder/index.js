import React from "react";
import queryIcon from "../../../assets/img/appkubeCloudDatasource/img/query-icon.png";
import transformatioIcon from "../../../assets/img/appkubeCloudDatasource/img/transformatio-icon.png";
import alertIcon from "../../../assets/img/appkubeCloudDatasource/img/alert-icon.png";
import QueryTab from "./QueryTab";
import TransformationTab from "./TransformationTab";
import AlertTab from "./AlertTab";

class DashboardPanelMetricBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "query",
    };
  }

  handleTabChange = (tab) => {
    this.setState({ currentTab: tab });
  };

  render() {
    const { currentTab } = this.state;
    return (
      <div className="asset-container">
        <div className="dashboard-panel-container">
          <div className="common-container">
            <div className="d-block page-heading">
              <div className="row">
                <div className="col-lg-9 col-md-9 col-sm-12">
                  <div className="asset-heading">New Dashboard / Add Panel</div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                  <div className="float-right">
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
                <div className="col-lg-9 col-md-9 col-sm-12">
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
                <div className="col-lg-3 col-md-3 col-sm-12">
                  <div className="d-block panel-right">
                    <div className="d-inline-flex buttons">
                      <button className="panel-gray-button min-width-inherit">
                        Panel
                      </button>
                      <button className="panel-gray-button min-width-inherit">
                        Field
                      </button>
                      <button className="panel-gray-button min-width-inherit">
                        Overrides
                      </button>
                    </div>
                    <div className="d-block menus">
                      <ul>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Setting
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Visualisation
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Display
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Series overrides
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Axes
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Legend
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Treshholds
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Time region
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Links
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Repeat options
                        </li>
                      </ul>
                    </div>
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

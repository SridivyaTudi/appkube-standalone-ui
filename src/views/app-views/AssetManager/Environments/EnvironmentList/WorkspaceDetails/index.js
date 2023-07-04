import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProcurifyIcon from "assets/img/assetmanager/procurify-icon.png";
import UserIcon from "assets/img/assetmanager/user-icon.png";
import LogisticsIcon from "assets/img/assetmanager/logistics-icon.png";
import EnvironmentsIcon from "assets/img/assetmanager/environments-icon.png";
import LockIcon from "assets/img/assetmanager/lock-icon.png";
import UsaFlag from "assets/img/assetmanager/usa-flag.png";
import RunningIcon from "assets/img/assetmanager/running-icon.png";
import Environments from "views/app-views/AssetManager/Environments/EnvironmentList/WorkspaceDetails/Environments/Environments";
import Container from "views/app-views/AssetManager/Environments/EnvironmentList/WorkspaceDetails/Environments/Container";
import Database from "views/app-views/AssetManager/Environments/EnvironmentList/WorkspaceDetails/Environments/Database";
import AccountPricing from "views/app-views/AssetManager/Environments/EnvironmentList/WorkspaceDetails/Environments/AccountPricing";

class WorkspaceDetails extends Component {
  tabMapping = [
    {
      name: "Environments",
      dataKey: "environments",
    },
    {
      name: "Container",
      dataKey: "container",
    },
    {
      name: "Database",
      dataKey: "database",
    },
    {
      name: "Account and Pricing",
      dataKey: "account",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      showSelectFilter: false,
      activeTab: 0,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { showSelectFilter, activeTab } = this.state;
    return (
      <div className="workspace-container">
        <div className="page-heading">
          <h3 className="m-b-0">Procurify-Logistics-Tool</h3>
          <button className="asset-blue-button min-width-inherit m-b-0 m-r-0">
            <Link
              style={{ color: "white" }}
              to={"/assetmanager/pages/environments/environmentlist"}
            >
              All Application
            </Link>
          </button>
        </div>
        <div className="tool-list">
          <div className="tool-box">
            <div className="list-icon">
              <img src={ProcurifyIcon} alt="client" />
            </div>
            <div className="tool-contant">
              <label>Client Name</label>
              <strong>Procurify</strong>
            </div>
          </div>
          <div className="tool-box">
            <div className="list-icon">
              <img src={UserIcon} alt="client" />
            </div>
            <div className="tool-contant">
              <label>User Count</label>
              <strong>257</strong>
            </div>
          </div>
          <div className="tool-box">
            <div className="list-icon">
              <img src={LogisticsIcon} alt="client" />
            </div>
            <div className="tool-contant">
              <label>Line Of Business</label>
              <strong>Logistics</strong>
            </div>
          </div>
          <div className="tool-box">
            <div className="list-icon">
              <img src={EnvironmentsIcon} alt="client" />
            </div>
            <div className="tool-contant">
              <label>Environments</label>
              <strong>02</strong>
            </div>
          </div>
          <div className="tool-box">
            <div className="list-icon">
              <img src={LockIcon} alt="client" />
            </div>
            <div className="tool-contant">
              <label>SSL</label>
              <strong>In build SSL</strong>
            </div>
          </div>
          <div className="icon-button">
            <i className="far fa-trash-alt"></i>
          </div>
          <div className="icon-button">
            <span>
              <i className="fas fa-sync-alt"></i>
            </span>
          </div>
        </div>
        <div className="main-information m-t-1">
          <div className="information-head">
            <h3 className="m-b-0">Main Information</h3>
            <div className="information-contant">
              <div className="branchs">
                <i className="fa-solid fa-code-commit"></i>
                <strong>02</strong>
                <span>Commits</span>
              </div>
              <div className="branchs">
                <i className="fa-solid fa-code-branch"></i>
                <strong>01</strong>
                <span>Branch</span>
              </div>
              <div className="branchs">
                <i className="fa-solid fa-tags"></i>
                <strong>31</strong>
                <span>Tags</span>
              </div>
            </div>
          </div>
          <div className="main-information-contant">
            <div className="user-head">
              <div className="row">
                <div className="col-lg-6">
                  <div className="user-left">
                    <div className="user-icon">
                      <img src={ProcurifyIcon} alt="Procurify" />
                    </div>
                    <div className="user-details">
                      <div className="title">Procurify</div>
                      <span>V 1.2.3</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="user-right">
                    <div className="button-group">
                      <div className="d-inline-block">
                        <label className="d-block">Workspace</label>
                        <button className="btn-danger min-width-inherit">
                          <i className="fa-regular fa-circle-stop p-r-5"></i> Stop
                        </button>
                      </div>
                      <div className="d-inline-block">
                        <label className="d-block">Region</label>
                        <div className=" environment-fliter">
                          <div
                            className="fliter-toggel"
                            onClick={() =>
                              this.setState({
                                showSelectFilter: !showSelectFilter,
                              })
                            }
                          >
                            <span className="p-r-5">
                              <img src={UsaFlag} alt="" />
                            </span>
                            Usa
                            <i className="fas fa-caret-down arrow-icon"></i>
                          </div>
                          <div
                            className={
                              showSelectFilter === true
                                ? "fliter-collapse active"
                                : "fliter-collapse"
                            }
                          >
                            <ul>
                              <li>1</li>
                              <li>2</li>
                              <li>3</li>
                              <li>4</li>
                              <li>5</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-status">
              <div className="user-status-timing">
                <div className="title">Status</div>
                <div className="user-text">
                  <div className="user-img">
                    <img src={RunningIcon} alt="" />
                  </div>
                  <strong>Running</strong>
                </div>
              </div>
              <div className="user-status-timing">
                <div className="title">Creation Time</div>
                <div className="user-timing">
                  <strong className="d-block">
                    Local: 10 May 2023, 06:19:21
                  </strong>
                  <strong className="d-block">
                    UTC: 12 May 2023, 21:09:07
                  </strong>
                </div>
              </div>
              <div className="user-status-timing">
                <div className="title">Deployment Time</div>
                <div className="user-timing">
                  <strong className="d-block">
                    Local: 11 May 2023, 06:19:21
                  </strong>
                  <strong className="d-block">
                    UTC: 12 May 2023, 21:09:07
                  </strong>
                </div>
              </div>
            </div>
            <div className="tag-buttons">
              <div className="tag-head">
                <h4>Tags</h4>
                <button className="asset-blue-button min-width-inherit m-b-0 m-r-0">
                  Add Tags
                </button>
              </div>
              <div className="tags-boxs">
                <div className="tag-btn">Readme</div>
                <div className="tag-btn">CI/CD Configuration</div>
                <div className="tag-btn">Add License</div>
                <div className="tag-btn">add Changelog</div>
                <div className="tag-btn">Add Contributing</div>
                <div className="tag-btn">Auto DevOp Enabled</div>
                <div className="tag-btn">Add Kubernetes Cluster</div>
                <div className="tag-btn">Add Wiki</div>
                <div className="tag-btn">Configure Integration</div>
                <div className="tag-btn">CI/CD Configuration</div>
              </div>
            </div>
          </div>
          <div className="services-panel-tabs">
            <div className="tabs-head">
              <ul>
                {this.tabMapping.map((tabData, index) => {
                  return (
                    <li
                      key={`ops-tab-${index}`}
                      className={index === activeTab ? "active" : ""}
                      onClick={() => this.setActiveTab(index)}
                    >
                      {tabData.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="tabs-content">
              {activeTab === 0 ? (
                <Environments />
              ) : activeTab === 1 ? (
                <Container />
              ) : activeTab === 2 ? (
                <Database />
              ) : activeTab === 3 ? (
                <AccountPricing />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkspaceDetails;

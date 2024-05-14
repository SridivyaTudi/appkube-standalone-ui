import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProcurifyIcon from "assets/img/assetmanager/procurify-icon.png";
import UserIcon from "assets/img/assetmanager/user-icon.png";
import LogisticsIcon from "assets/img/assetmanager/logistics-icon.png";
import EnvironmentsIcon from "assets/img/assetmanager/environments-icon.png";
import LockIcon from "assets/img/assetmanager/lock-icon.png";
import UsaFlag from "assets/img/assetmanager/usa-flag.png";
import RunningIcon from "assets/img/assetmanager/running-icon.png";
import Environments from "Views/AppViews/Environments/EnvironmentList/WorkspaceDetails/Environments/Environments";
import Container from "Views/AppViews/Environments/EnvironmentList/WorkspaceDetails/Environments/Container";
import Database from "Views/AppViews/Environments/EnvironmentList/WorkspaceDetails/Environments/Database";
import AccountPricing from "Views/AppViews/Environments/EnvironmentList/WorkspaceDetails/Environments/AccountPricing";
import { Box } from "@mui/material";

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
      <Box className="workspace-container">
        <Box className="page-heading">
          <h3 className="m-b-0">Procurify-Logistics-Tool</h3>
          <button className="asset-blue-button min-width-inherit m-b-0 m-r-0">
            <Link
              style={{ color: "white" }}
              to={"/assetmanager/pages/environments/environmentlist"}
            >
              All Application
            </Link>
          </button>
        </Box>
        <Box className="tool-list">
          <Box className="tool-box">
            <Box className="list-icon">
              <img src={ProcurifyIcon} alt="client" />
            </Box>
            <Box className="tool-contant">
              <label>Client Name</label>
              <strong>Procurify</strong>
            </Box>
          </Box>
          <Box className="tool-box">
            <Box className="list-icon">
              <img src={UserIcon} alt="client" />
            </Box>
            <Box className="tool-contant">
              <label>User Count</label>
              <strong>257</strong>
            </Box>
          </Box>
          <Box className="tool-box">
            <Box className="list-icon">
              <img src={LogisticsIcon} alt="client" />
            </Box>
            <Box className="tool-contant">
              <label>Line Of Business</label>
              <strong>Logistics</strong>
            </Box>
          </Box>
          <Box className="tool-box">
            <Box className="list-icon">
              <img src={EnvironmentsIcon} alt="client" />
            </Box>
            <Box className="tool-contant">
              <label>Environments</label>
              <strong>02</strong>
            </Box>
          </Box>
          <Box className="tool-box">
            <Box className="list-icon">
              <img src={LockIcon} alt="client" />
            </Box>
            <Box className="tool-contant">
              <label>SSL</label>
              <strong>In build SSL</strong>
            </Box>
          </Box>
          <Box className="icon-button">
            <i className="far fa-trash-alt"></i>
          </Box>
          <Box className="icon-button">
            <span>
              <i className="fas fa-sync-alt"></i>
            </span>
          </Box>
        </Box>
        <Box className="main-information m-t-1">
          <Box className="information-head">
            <h3 className="m-b-0">Main Information</h3>
            <Box className="information-contant">
              <Box className="branchs">
                <i className="fa-solid fa-code-commit"></i>
                <strong>02</strong>
                <span>Commits</span>
              </Box>
              <Box className="branchs">
                <i className="fa-solid fa-code-branch"></i>
                <strong>01</strong>
                <span>Branch</span>
              </Box>
              <Box className="branchs">
                <i className="fa-solid fa-tags"></i>
                <strong>31</strong>
                <span>Tags</span>
              </Box>
            </Box>
          </Box>
          <Box className="main-information-contant">
            <Box className="user-head">
              <Box className="row">
                <Box className="col-lg-6">
                  <Box className="user-left">
                    <Box className="user-icon">
                      <img src={ProcurifyIcon} alt="Procurify" />
                    </Box>
                    <Box className="user-details">
                      <div className="title">Procurify</div>
                      <span>V 1.2.3</span>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-lg-6">
                  <Box className="user-right">
                    <Box className="button-group">
                      <Box className="d-inline-block">
                        <label className="d-block">Workspace</label>
                        <button className="btn-danger min-width-inherit">
                          <i className="fa-regular fa-circle-stop p-r-5"></i>{" "}
                          Stop
                        </button>
                      </Box>
                      <Box className="d-inline-block">
                        <label className="d-block">Region</label>
                        <Box className=" environment-fliter">
                          <Box
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
                          </Box>
                          <Box
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
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="user-status">
              <Box className="user-status-timing">
                <div className="title">Status</div>
                <Box className="user-text">
                  <Box className="user-img">
                    <img src={RunningIcon} alt="" />
                  </Box>
                  <strong>Running</strong>
                </Box>
              </Box>
              <Box className="user-status-timing">
                <div className="title">Creation Time</div>
                <Box className="user-timing">
                  <strong className="d-block">
                    Local: 10 May 2023, 06:19:21
                  </strong>
                  <strong className="d-block">
                    UTC: 12 May 2023, 21:09:07
                  </strong>
                </Box>
              </Box>
              <Box className="user-status-timing">
                <div className="title">Deployment Time</div>
                <Box className="user-timing">
                  <strong className="d-block">
                    Local: 11 May 2023, 06:19:21
                  </strong>
                  <strong className="d-block">
                    UTC: 12 May 2023, 21:09:07
                  </strong>
                </Box>
              </Box>
            </Box>
            <Box className="tag-buttons">
              <Box className="tag-head">
                <h4>Tags</h4>
                <button className="asset-blue-button min-width-inherit m-b-0 m-r-0">
                  Add Tags
                </button>
              </Box>
              <Box className="tags-boxs">
                <Box className="tag-btn">Readme</Box>
                <Box className="tag-btn">CI/CD Configuration</Box>
                <Box className="tag-btn">Add License</Box>
                <Box className="tag-btn">add Changelog</Box>
                <Box className="tag-btn">Add Contributing</Box>
                <Box className="tag-btn">Auto DevOp Enabled</Box>
                <Box className="tag-btn">Add Kubernetes Cluster</Box>
                <Box className="tag-btn">Add Wiki</Box>
                <Box className="tag-btn">Configure Integration</Box>
                <Box className="tag-btn">CI/CD Configuration</Box>
              </Box>
            </Box>
          </Box>
          <Box className="services-panel-tabs">
            <Box className="tabs-head">
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
            </Box>
            <Box className="tabs-content">
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
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default WorkspaceDetails;

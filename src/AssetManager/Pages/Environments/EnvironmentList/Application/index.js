import React, { Component } from "react";
import AWS from "../../../../../assets/img/aws.png";
import AZURE from "../../../../../assets/img/microsoftazure.png";
import GCP from "../../../../../assets/img/google-cloud.png";
import { Link } from "react-router-dom";
import RunningIcon from "../../../../../assets/img/assetmanager/running-icon.png";
import AirAsiaIcon from "../../../../../assets/img/assetmanager/air-asia-icon.png";
import UpdatingIcon from "../../../../../assets/img/assetmanager/updating-icon.png";
import StopIcon from "../../../../../assets/img/assetmanager/stop-icon.png";
import ProcurifyIcon from "../../../../../assets/img/assetmanager/procurify-icon.png";
import FlipkartIcon from "../../../../../assets/img/assetmanager/flipkart-icon.png";
import AppleIcon from "../../../../../assets/img/assetmanager/apple-icon.png";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectFilter: false,
      showServiceViewFilter: false,
      showRecentFilter: false,
      currentAccountId: null,
      showMenuIndex: null,
    };
  }

  toggleColumnSelect = (drdName) => {
    let current = this.state[drdName];
    this.setState({
      [drdName]: !current,
    });
  };

  toggleMenu = (index) => {
    if (this.state.showMenuIndex === null) {
      this.setState({
        showMenuIndex: index,
      });
    } else {
      this.setState({
        showMenuIndex: null,
      });
    }
  };

  getAppServicesCount = (product) => {
    let count = 0;
    product.deploymentEnvironmentList.map((env) => {
      env.serviceCategoryList.map((serviceCategory) => {
        serviceCategory.serviceNameList.map((serviceName) => {
          serviceName.tagList[0].serviceList?.map((service) => {
            count++;
          });
        });
      });
    });
    return count;
  };

  getDataServicesCount = (product) => {
    let count = 0;
    product.deploymentEnvironmentList.map((env) => {
      env.serviceCategoryList.map((serviceCategory) => {
        serviceCategory.serviceNameList.map((serviceName) => {
          serviceName.tagList[1].serviceList?.map((service) => {
            count++;
          });
        });
      });
    });
    return count;
  };

  setLocalRecentService = (account) => {
    let recentEnv = JSON.parse(localStorage.getItem("recentEnv"));
    recentEnv.map((item, index) => {
      if (item.accountId === account.accountId) {
        arrayMove(recentEnv, index, 0);
      }
    });

    function arrayMove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      localStorage.setItem("recentEnv", JSON.stringify(arr));
    }
  };

  render() {
    const { showSelectFilter, showServiceViewFilter, showRecentFilter } =
      this.state;
    return (
      <div className="discovered-assets">
        <div className="discovered-assets-head">
          <h3 className="m-b-2">My Workspace</h3>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-md-8 col-sm-10">
              <div className="d-flex justify-content-center align-items-center">
                <div className="lest-view">
                  <ul>
                    <li className="active">
                      <a>
                        <i class="fas fa-list p-r-5"></i> List View
                      </a>
                    </li>
                    <li>
                      <a>
                        <i class="fas fa-th-large p-r-5"></i> Grid View
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="environment-fliter">
                  <div
                    className="fliter-toggel"
                    onClick={() =>
                      this.setState({
                        showSelectFilter: !showSelectFilter,
                      })
                    }
                  >
                    <i class="fas fa-filter fillter-icon"></i>
                    fillter
                    <i className="fas fa-caret-down arrow-icon"></i>
                  </div>
                  <div
                    className={
                      showSelectFilter === true
                        ? "fliter-collapse active"
                        : "fliter-collapse"
                    }
                  >
                    <div className="search-bar">
                      <input type="text" placeholder="Search...." />
                    </div>
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          onChange={() => this.handleChecked()}
                        />
                        OU
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          onChange={() => this.handleChecked()}
                        />
                        Status
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          onChange={() => this.handleChecked()}
                        />
                        No of Assets
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          onChange={() => this.handleChecked()}
                        />
                        Logs
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          onChange={() => this.handleChecked()}
                        />
                        Performance & Availability
                      </li>
                    </ul>
                  </div>
                  <div
                    className={
                      showSelectFilter === true
                        ? "fliters-collapse-bg active"
                        : "fliters-collapse-bg"
                    }
                    onClick={() =>
                      this.setState({
                        showSelectFilter: !showSelectFilter,
                      })
                    }
                  />
                </div>
                <button className="asset-blue-button min-width-inherit m-b-0 m-r-0">
                  <i class="fas fa-history p-r-5"></i> Recent
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-2">
              <div className="d-inline-block width-100 text-right">
                <button className="new-button min-width-inherit m-b-0 m-r-0">
                  <Link style={{color: 'white'}}
                    to={
                      "/assetsmanager/pages/environments/environmentlist/deployproject"
                    }
                  >
                    <i class="fas fa-plus-square p-r-5"></i> Create New
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead>
                <tr>
                  <th>
                    <strong>Workspace</strong>
                  </th>
                  <th>Status</th>
                  <th>Client</th>
                  <th className="ou">Line Of Business</th>
                  <th>Tags</th>
                  <th>User Count</th>
                  <th>Usage</th>
                  <th>App Services</th>
                  <th>Data Services</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a>HRMS</a>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={RunningIcon} alt="" />
                    </span>
                    <strong>Running</strong>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Procurify</strong>
                  </td>
                  <td>
                    <div className="business-btn"> Logistics</div>
                  </td>
                  <td>
                    <strong>13</strong>
                  </td>
                  <td>
                    <strong>500</strong>
                  </td>
                  <td>
                    <strong>33%</strong>
                  </td>
                  <td>
                    <strong>41</strong>
                  </td>
                  <td>
                    <strong>29</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a>EMS</a>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={RunningIcon} alt="" />
                    </span>
                    <strong>Running</strong>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>HDFC bank</strong>
                  </td>
                  <td>
                    <div className="business-btn"> Transaction</div>
                  </td>
                  <td>
                    <strong>13</strong>
                  </td>
                  <td>
                    <strong>500</strong>
                  </td>
                  <td>
                    <strong>33%</strong>
                  </td>
                  <td>
                    <strong>41</strong>
                  </td>
                  <td>
                    <strong>29</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a>PROCUREMENT</a>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={UpdatingIcon} alt="" />
                    </span>
                    <strong>Updating</strong>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Air Asia</strong>
                  </td>
                  <td>
                    <div className="business-btn"> Fleets</div>
                  </td>
                  <td>
                    <strong>13</strong>
                  </td>
                  <td>
                    <strong>500</strong>
                  </td>
                  <td>
                    <strong>33%</strong>
                  </td>
                  <td>
                    <strong>41</strong>
                  </td>
                  <td>
                    <strong>29</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a>APPCUBE</a>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={StopIcon} alt="" />
                    </span>
                    <strong>Stop</strong>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Walmart</strong>
                  </td>
                  <td>
                    <div className="business-btn"> Inventory</div>
                  </td>
                  <td>
                    <strong>13</strong>
                  </td>
                  <td>
                    <strong>500</strong>
                  </td>
                  <td>
                    <strong>33%</strong>
                  </td>
                  <td>
                    <strong>41</strong>
                  </td>
                  <td>
                    <strong>29</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a>HRMS</a>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={UpdatingIcon} alt="" />
                    </span>
                    <strong>Updating</strong>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Adobe</strong>
                  </td>
                  <td>
                    <div className="business-btn"> Frames</div>
                  </td>
                  <td>
                    <strong>13</strong>
                  </td>
                  <td>
                    <strong>500</strong>
                  </td>
                  <td>
                    <strong>33%</strong>
                  </td>
                  <td>
                    <strong>41</strong>
                  </td>
                  <td>
                    <strong>29</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a>EMS</a>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={RunningIcon} alt="" />
                    </span>
                    <strong>Running</strong>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Procurify</strong>
                  </td>
                  <td>
                    <div className="business-btn"> Banking</div>
                  </td>
                  <td>
                    <strong>13</strong>
                  </td>
                  <td>
                    <strong>500</strong>
                  </td>
                  <td>
                    <strong>33%</strong>
                  </td>
                  <td>
                    <strong>41</strong>
                  </td>
                  <td>
                    <strong>29</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a>PROCUREMENT</a>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={RunningIcon} alt="" />
                    </span>
                    <strong>Running</strong>
                  </td>
                  <td>
                    {" "}
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Flipkart</strong>
                  </td>
                  <td>
                    <div className="business-btn"> Client</div>
                  </td>
                  <td>
                    <strong>13</strong>
                  </td>
                  <td>
                    <strong>500</strong>
                  </td>
                  <td>
                    <strong>33%</strong>
                  </td>
                  <td>
                    <strong>41</strong>
                  </td>
                  <td>
                    <strong>29</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="recently-viewed-section">
          <h3 className="m-t-2 m-b-2">Recently Viewed</h3>
          <div className="recently-cards">
            <div className="recently-card">
              <div className="recently-image">
                <img src={ProcurifyIcon} alt="" />
              </div>
              <div className="recently-content">
                <div className="title">Procurify</div>
                <div className="refund-content">
                  <span>Logistics-Tool</span>
                </div>
              </div>
            </div>
            <div className="recently-card">
              <div className="recently-image">
                <img src={FlipkartIcon} alt="" />
              </div>
              <div className="recently-content">
                <div className="title">Flipkart-App</div>
                <div className="refund-content">
                  <span>Order</span>
                  <span>Refunds</span>
                </div>
              </div>
            </div>
            <div className="recently-card">
              <div className="recently-image">
                <img src={AppleIcon} alt="" />
              </div>
              <div className="recently-content">
                <div className="title">Apple-Data</div>
                <div className="refund-content">
                  <span>Security-Databese</span>
                </div>
              </div>
            </div>
            <div className="recently-card">
              <div className="recently-image">
                <img src={ProcurifyIcon} alt="" />
              </div>
              <div className="recently-content">
                <div className="title">Forbese-Tools</div>
                <div className="refund-content">
                  <span>Automation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="recently-viewed-section">
          <h3 className="m-t-2 m-b-2">Favorites</h3>
          <div className="recently-cards">
            <div className="recently-card">
              <div className="recently-image">
                <img src={ProcurifyIcon} alt="" />
              </div>
              <div className="recently-content">
                <div className="title">Procurify</div>
                <div className="refund-content">
                  <span>Logistics-Tool</span>
                </div>
              </div>
              <div className="favorites-check">
                <i class="fas fa-star"></i>
              </div>
            </div>
            <div className="recently-card">
              <div className="recently-image">
                <img src={FlipkartIcon} alt="" />
              </div>
              <div className="recently-content">
                <div className="title">Flipkart-App</div>
                <div className="refund-content">
                  <span>Order</span>
                  <span>Refunds</span>
                </div>
              </div>
              <div className="favorites-check">
                <i class="fas fa-star"></i>
              </div>
            </div>
            <div className="recently-card">
              <div className="recently-image">
                <img src={AppleIcon} alt="" />
              </div>
              <div className="recently-content">
                <div className="title">Apple-Data</div>
                <div className="refund-content">
                  <span>Security-Databese</span>
                </div>
              </div>
              <div className="favorites-check">
                <i class="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Application;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jobs from "../../../assets/img/jobs.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import Aws from "../../../assets/img/aws.png";
import Kubernetes from "../../../assets/img/kubernetes.png";
import { config } from '../../config';

const LOGOS = {
  aws: Aws,
  azure: Microsoftazure,
  gcp: GoogleCloud,
  kubernetes: Kubernetes,
};

class Environments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecentFilter: false,
      showAddNewFilter: false,
      accountList: {},
      commonData: {},
    };
  }

  componentDidMount = () => {
    this.getAccountList();
  };

  getAccountList = () => {
    fetch(config.GET_ALL_ENVS)
      .then((response) => response.json())
      .then((data) => {
        const commonData = {};
        const accounts = {};
        data.forEach((account) => {
          accounts[account.cloud] = accounts[account.cloud] || [];
          accounts[account.cloud].push(account);
          commonData[account.cloud] = commonData[account.cloud]
            ? commonData[account.cloud]
            : {
                totalBill: 0,
              };
          commonData[account.cloud].totalBill += account.totalBilling || 0;
        });
        this.setState({
          accountList: accounts,
          commonData,
        });
      });
  };

  renderEnvironmentBoxes = () => {
    const { accountList, commonData } = this.state;
    const keys = Object.keys(accountList);
    const retData = [];
    keys.forEach((env) => {
      const accounts = accountList[env];
      if (accounts.length > 0) {
        const account = accounts[0];
        const data = commonData[account.cloud];
        retData.push(
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
            <div className="services-box">
              <div className="heading">
                <span>
                  <img src={LOGOS[account.cloud.toLowerCase()]} alt="" />
                </span>
                <h3>{account.cloud}</h3>
              </div>
              <div className="table-box">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Accounts</td>
                      <td>{accounts.length}</td>
                    </tr>
                    <tr>
                      <td>Assets</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Alerts</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Total Billing</td>
                      <td>{data.totalBill}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
    });
    return retData;
  };

  handleMenuToggle = (envKey, accountIndex) => {
    const { accountList } = this.state;
    accountList[envKey][accountIndex].showMenu =
      !accountList[envKey][accountIndex].showMenu;
    this.setState({
      accountList,
    });
  };

  renderEnvironmentTable() {
    const { accountList } = this.state;
    const keys = Object.keys(accountList);
    const retData = [];
    keys.forEach((env, envIndex) => {
      const accounts = accountList[env];
      const accountsJSX = [];
      accounts.forEach((account, accountIndex) => {
        accountsJSX.push(
          <tr key={`env-${envIndex}-${accountIndex}`}>
            <td>
              <Link
                to={`/assetmanager/pages/amazonservices?accountId=${account.accountId}&cloudName=${account.cloud}`}
              >
                {account.cloud} ({account.accountId})
              </Link>
            </td>
            <td>{account.totalProductEnclave}</td>
            <td>{account.totalProducts}</td>
            <td>{account.totalAppServices}</td>
            <td>{account.totalDataServices}</td>
            <td>
              <div className="d-block text-center action-edit">
                {account.showMenu && (
                  <>
                    <div
                      className="open-create-menu-close"
                      onClick={(e) => {
                        this.handleMenuToggle(env, accountIndex);
                      }}
                    ></div>
                    <div className="text-center open-create-menu">
                      <a
                        href={`/assetmanager/pages/add-data-source?accountId=${account.accountId}&cloudName=${account.cloud}`}
                      >
                        Add New Input
                      </a>
                      <a>Add Cluster</a>
                      <a>Add Cloud Managed Services</a>
                      <a>Add Gateway Services</a>
                    </div>
                  </>
                )}

                <button
                  className="asset-white-button min-width-inherit m-r-0"
                  onClick={(e) => {
                    this.handleMenuToggle(env, accountIndex);
                  }}
                >
                  <i className="fa fa-ellipsis-h"></i>
                </button>
              </div>
            </td>
          </tr>
        );
      });
      if (accounts.length > 0) {
        const account = accounts[0];
        retData.push(
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span>
                    <img src={LOGOS[account.cloud.toLowerCase()]} alt="" />
                  </span>
                  {account.cloud}
                </th>
                <th>Product Enclave</th>
                <th>Products</th>
                <th>App Services</th>
                <th>Data Services</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{accountsJSX}</tbody>
          </table>
        );
      }
    });
    return retData;
  }

  render() {
    const { showRecentFilter, showAddNewFilter } = this.state;
    return (
      <div className="asset-container">
        <div className="environments-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Environments</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <Link className="asset-white-button min-width-inherit m-r-0">
                    <img alt="jobs" src={Jobs} style={{ maxWidth: "20px" }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 environments-services-container">
            <div className="row">{this.renderEnvironmentBoxes()}</div>
          </div>
          <div className="common-container border-bottom-0 environments-table-container">
            <div className="fliters-container">
              <div className="select-fliters">
                <div className="add-fliters">
                  <i className="fa fa-plus"></i>
                </div>
                <div className="fliter-toggel"></div>
                <i className="fa fa-angle-down"></i>
              </div>
            </div>
            <div className="recent-fliters-container m-t-1">
              <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12 ">
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12 m-b-1">
                      <div className="fliter">
                        <div
                          className="fliter-toggel"
                          onClick={() =>
                            this.setState({
                              showRecentFilter: !showRecentFilter,
                            })
                          }
                        >
                          <i className="fa fa-clock-o" />
                          <span>Recent</span>
                        </div>
                        <div
                          className={
                            showRecentFilter === true
                              ? "fliter-collapse active"
                              : "fliter-collapse"
                          }
                        >
                          <ul>
                            <li>
                              <Link to={`/assetmanager/pages/accountsetup`}>
                                <span>
                                  <img src={Aws} alt="AWS" />
                                </span>
                                <p>AWS (657907747545)</p>
                              </Link>
                            </li>
                            <li>
                              <Link to={`/assetmanager/pages/accountsetup`}>
                                <span>
                                  <img src={Aws} alt="" />
                                </span>
                                <p>AWS (655668745458)</p>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={
                            showRecentFilter === true
                              ? "fliters-collapse-bg active"
                              : "fliters-collapse-bg"
                          }
                          onClick={() =>
                            this.setState({
                              showRecentFilter: !showRecentFilter,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 m-b-1">
                      <div className="fliter">
                        <div
                          className="fliter-toggel"
                          onClick={() =>
                            this.setState({
                              showAddNewFilter: !showAddNewFilter,
                            })
                          }
                        >
                          <i className="fa fa-plus" />
                          <span>Add New Environment</span>
                        </div>
                        <div
                          className={
                            showAddNewFilter === true
                              ? "fliter-collapse active"
                              : "fliter-collapse"
                          }
                        >
                          <ul>
                            <li>
                              <Link to={`/assetmanager/pages/accountsetup`}>
                                <span>
                                  <img src={Aws} alt="Aws" />
                                </span>
                                <p>AWS Environment</p>
                              </Link>
                            </li>
                            <li>
                              <Link to={`/assetmanager/pages/accountsetup`}>
                                <span>
                                  <img
                                    src={Microsoftazure}
                                    alt="Microsoftazure"
                                  />
                                </span>
                                <p>Azure Environment</p>
                              </Link>
                            </li>
                            <li>
                              <Link to={`/assetmanager/pages/accountsetup`}>
                                <span>
                                  <img src={GoogleCloud} alt="GoogleCloud" />
                                </span>
                                <p>GCP Environment</p>
                              </Link>
                            </li>
                            <li>
                              <Link to={`/assetmanager/pages/accountsetup`}>
                                <span>
                                  <img src={Kubernetes} alt="Kubernetes" />
                                </span>
                                <p>Kubernetes</p>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={
                            showAddNewFilter === true
                              ? "fliters-collapse-bg active"
                              : "fliters-collapse-bg"
                          }
                          onClick={() =>
                            this.setState({
                              showAddNewFilter: !showAddNewFilter,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 m-b-1">
                      <div className="fliter">
                        <div className="fliter-toggel">
                          <i className="fa fa-sign-out" />
                          <span>Export</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 m-b-1">
                  <div className="search-box">
                    <form>
                    <div className="form-group search-control-group m-b-0">
                      <input
                        type="text"
                        className="input-group-text"
                        placeholder="Search"
                      />
                      <button className="btn btn-search">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="environments-table">
              {this.renderEnvironmentTable()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Environments;

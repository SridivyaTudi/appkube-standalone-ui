import React, { Component } from "react";
import AWS from "../../../assets/img/aws.png";
import AZURE from "../../../assets/img/microsoftazure.png";
import GCP from "../../../assets/img/google-cloud.png";
import Kubernetes from "../../../assets/img/kubernetes.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SelectDepartmentPopup from "../../Components/SelectDepartmentPopup";
import {
  getEnvsAsync,
  getEnvsSummary,
} from "../../../redux/environments/environmentsThunk";
import status from "../../../redux/constants/commonDS";

const LOGOS = {
  aws: AWS,
  azure: AZURE,
  gcp: GCP,
  kubernetes: Kubernetes,
};

class Environments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecentFilter: false,
      showAddNewFilter: false,
      showSelectFilter: false,
      searchkey: "",
      searchedAccountList: [],
      currentActiveTableIndex: [],
      dataFetched: false,
      allEnvData: [],
      allEnvSummary: [],
      menuSummaryShowMenu: [null, null],
    };
    this.selectDepartmentPopupModalRef = React.createRef();
  }

  onClickSelectDepartmentPopup = (link) => {
    this.selectDepartmentPopupModalRef.current.setLink(link);
    this.selectDepartmentPopupModalRef.current.toggle();
  };

  componentDidMount = () => {
    this.props.getEnvsAsync(localStorage.getItem("currentOrgId"));
    this.props.getEnvsSummary(localStorage.getItem("currentOrgId"));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.environments?.allEnvs?.status !==
        this.props.environments.allEnvs.status &&
      this.props.environments.allEnvs.status === status.SUCCESS &&
      this.props.environments?.allEnvs?.data
    ) {
      this.setState({ allEnvData: this.props.environments.allEnvs.data });
    }
    if (
      prevProps.environments?.envSummary?.status !==
        this.props.environments.envSummary.status &&
      this.props.environments.envSummary.status === status.SUCCESS &&
      this.props.environments?.envSummary?.data
    ) {
      this.setState({
        allEnvSummary: this.props.environments.envSummary.data,
        searchedAccountList: JSON.parse(
          JSON.stringify(this.props.environments.envSummary.data)
        ),
        dataFetched: true,
      });
      this.SetCurrentActiveTableIndex();
    }
  }

  SetCurrentActiveTableIndex = () => {
    this.props.environments.envSummary.data.map((item, index) => {
      let allIndex = [];
      allIndex.push(index);
      this.setState({ currentActiveTableIndex: allIndex });
    });
  };

  renderEnvironmentBoxes = () => {
    const { allEnvData } = this.state;
    const retData = [];
    allEnvData.map((env) => {
      retData.push(
        <div className="environment-box" key={env.cloud}>
          <div className="environment-title">
            <div className="environment-image">
              <img src={LOGOS[env.cloud.toLowerCase()]} alt={env.cloud} />
            </div>
            <div className="title-name">{env.cloud.toUpperCase()}</div>
          </div>
          <div className="data-contant">
            <ul>
              <li>
                <div className="data-text">
                  <span style={{ backgroundColor: "#ff9900" }}></span>
                  <p>Environments</p>
                </div>
                <label>{env.environments}</label>
              </li>
              <li>
                <div className="data-text">
                  <span style={{ backgroundColor: "#0089d6" }}></span>
                  <p>Assets</p>
                </div>
                <label>{env.assets}</label>
              </li>
              <li>
                <div className="data-text">
                  <span style={{ backgroundColor: "#da4f44" }}></span>
                  <p>Alerts</p>
                </div>
                <label>{env.alerts}</label>
              </li>
              <li>
                <div className="data-text">
                  <span style={{ backgroundColor: "#00b929" }}></span>
                  <p>Total Billing</p>
                </div>
                <label>&#65284;{env.totalBilling}</label>
              </li>
            </ul>
          </div>
        </div>
      );
    });
    return retData;
  };

  handleMenuToggle = (envKey, accountIndex) => {
    const { menuSummaryShowMenu } = this.state;
    if (menuSummaryShowMenu[0] !== null && menuSummaryShowMenu[1] !== null) {
      this.setState({ menuSummaryShowMenu: [null, null] });
    } else {
      this.setState({ menuSummaryShowMenu: [envKey, accountIndex] });
    }
  };

  handleTableToggle = (envIndex) => {
    let { currentActiveTableIndex } = this.state;
    if (!currentActiveTableIndex.includes(envIndex)) {
      currentActiveTableIndex.push(envIndex);
    } else {
      currentActiveTableIndex = currentActiveTableIndex.filter(
        (item) => item !== envIndex
      );
    }
    this.setState({
      currentActiveTableIndex,
    });
  };

  renderEnvironmentTable() {
    const { menuSummaryShowMenu, searchedAccountList } = this.state;
    const retData = [];
    searchedAccountList.map((item, envIndex) => {
      const accountsJSX = [];
      item.environmentSummaryList.map((account, accountIndex) => {
        accountsJSX.push(
          <tr key={`env-${accountIndex}-${envIndex}`}>
            <td>
              <Link
                to={`/assetmanager/pages/environments/environmentlist?accountId=${account.landingZone}&cloudName=${account.cloud}`}
                onClick={() =>
                  this.setLocalRecentService({
                    cloud: account.cloud,
                    accountId: account.landingZone,
                  })
                }
              >
                {account.cloud} ({account.landingZone})
              </Link>
            </td>
            <td>{account.productEnclave}</td>
            <td>{account.product}</td>
            <td>{account.appService}</td>
            <td>{account.dataService}</td>
            <td>
              <button
                type="button"
                className="list-icon"
                onClick={(e) => {
                  this.handleMenuToggle(envIndex, accountIndex);
                }}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              {menuSummaryShowMenu[0] === envIndex &&
              menuSummaryShowMenu[1] === accountIndex ? (
                <>
                  <div
                    className="open-create-menu-close"
                    onClick={(e) => {
                      this.handleMenuToggle(envIndex, accountIndex);
                    }}
                  ></div>
                  <div className="menu-list">
                    <ul>
                      <li className="active">
                        <a
                          href={`/assetmanager/pages/add-data-source?accountId=${account.landingZone}&cloudName=${account.cloud}`}
                        >
                          Add New datasource
                        </a>
                      </li>
                      <li>
                        <a href="#">Add Compliance</a>
                      </li>
                      <li>
                        <a href="#">Associate to OU</a>
                      </li>
                      <li>
                        <a href="#">Add New VPC</a>
                      </li>
                      <li>
                        <a href="#">Add New Product</a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <></>
              )}
            </td>
          </tr>
        );
      });
      retData.push(
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead
                className={
                  this.state.currentActiveTableIndex.includes(envIndex)
                    ? "active"
                    : ""
                }
              >
                <tr>
                  <th>
                    <i
                      className={
                        this.state.currentActiveTableIndex.includes(envIndex)
                          ? "fas fa-sort-down"
                          : "fas fa-caret-right"
                      }
                      onClick={() => {
                        this.handleTableToggle(envIndex);
                      }}
                    ></i>
                    <div className="environment-image">
                      <img src={LOGOS[item.cloud.toLowerCase()]} alt="" />
                    </div>
                    <strong>{item.cloud}</strong>
                  </th>
                  <th>Product Enclave</th>
                  <th>Products</th>
                  <th>App Services</th>
                  <th>Data Services</th>
                  <th>Action</th>
                </tr>
              </thead>
              {this.state.currentActiveTableIndex.includes(envIndex) && (
                <tbody>{accountsJSX}</tbody>
              )}
            </table>
          </div>
        </div>
      );
    });
    return retData;
  }

  handleSearchChange = (e) => {
    let value = e.target.value;
    this.setState({ searchkey: value });
    let { allEnvSummary, searchedAccountList } = this.state;
    searchedAccountList = JSON.parse(JSON.stringify(allEnvSummary));
    if (value) {
      searchedAccountList = searchedAccountList.map((cloud) => {
        cloud.environmentSummaryList = cloud.environmentSummaryList.filter(
          (item) => {
            if (
              item.landingZone.includes(value) ||
              item.cloud.includes(value.toLowerCase())
            ) {
              return item;
            }
          }
        );
        return cloud;
      });
      this.setState({ searchedAccountList });
    } else {
      this.setState({
        searchedAccountList: JSON.parse(JSON.stringify(allEnvSummary)),
      });
    }
  };

  setLocalRecentService = (account) => {
    let recentEnv = JSON.parse(localStorage.getItem("recentEnv"));
    let isDuplicate = false;

    if (recentEnv !== null) {
      recentEnv.map((item, index) => {
        if (item.accountId === account.accountId) {
          isDuplicate = true;
          arrayMove(recentEnv, index, 0);
        }
      });
    }

    function arrayMove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      localStorage.setItem("recentEnv", JSON.stringify(arr));
    }

    if (localStorage.getItem("recentEnv") === null) {
      let newItem = [
        { accountType: account.cloud, accountId: account.accountId },
      ];
      localStorage.setItem("recentEnv", JSON.stringify(newItem));
    } else if (recentEnv.length > 2 && isDuplicate === false) {
      recentEnv.pop();
      let newItem = {
        accountType: account.cloud,
        accountId: account.accountId,
      };
      recentEnv.unshift(newItem);
      localStorage.setItem("recentEnv", JSON.stringify(recentEnv));
    } else if (isDuplicate === false) {
      let newItem = {
        accountType: account.cloud,
        accountId: account.accountId,
      };
      recentEnv.push(newItem);
      localStorage.setItem("recentEnv", JSON.stringify(recentEnv));
    }
  };

  render() {
    const {
      showRecentFilter,
      showAddNewFilter,
      searchkey,
      dataFetched,
      allEnvData,
      allEnvSummary,
    } = this.state;
    return (
      <div className="environmentlist-container">
        {!dataFetched ? (
          <div className="chart-spinner text-center w-100 p-t-20 p-b-20">
            <i className="fa fa-spinner fa-spin" /> Loading...
          </div>
        ) : (
          <>
            <div className="list-heading">
              <h3>Environments</h3>
            </div>
            <div className="environment-boxs">
              {allEnvData?.length && this.renderEnvironmentBoxes()}
            </div>
            <div className="add-new-environment">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-3 col-md-3 col-sm-12">
                  <div className="environment-fliter">
                    <div
                      className="fliter-toggel"
                      onClick={() => this.onClickSelectDepartmentPopup("")}
                    >
                      <i className="fas fa-filter fillter-icon"></i>
                      fillter
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-12">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                      <div className="export-sction">
                        {JSON.parse(localStorage.getItem("recentEnv")) !==
                          null && (
                          <div className="environment-fliter">
                            <div
                              className="fliter-toggel"
                              onClick={() =>
                                this.setState({
                                  showRecentFilter: !showRecentFilter,
                                })
                              }
                            >
                              <i className="fas fa-alarm-clock fillter-icon"></i>
                              Recent
                              <i className="fas fa-caret-down arrow-icon"></i>
                            </div>
                            <div
                              className={
                                showRecentFilter === true
                                  ? "fliter-collapse  active"
                                  : "fliter-collapse"
                              }
                            >
                              <ul>
                                {JSON.parse(
                                  localStorage.getItem("recentEnv")
                                )?.map((item) => {
                                  return (
                                    <li>
                                      <Link
                                        to={`/assetmanager/pages/environments/environmentlist?accountId=${item.accountId}&cloudName=${item.accountType}`}
                                        onClick={() =>
                                          this.setLocalRecentService(item)
                                        }
                                      >
                                        <span>
                                          <img
                                            src={
                                              item.accountType === "AWS" ||
                                              item.accountType === "aws"
                                                ? AWS
                                                : item.accountType === "GCP" ||
                                                  item.accountType === "gcp"
                                                ? GCP
                                                : AZURE
                                            }
                                            alt={item.accountType}
                                          />
                                        </span>
                                        <p>({item.accountId})</p>
                                      </Link>
                                    </li>
                                  );
                                })}
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
                        )}

                        <div className="environment-fliter">
                          <div
                            className="fliter-toggel new-environment"
                            onClick={() =>
                              this.setState({
                                showAddNewFilter: !showAddNewFilter,
                              })
                            }
                          >
                            Add New Environment
                            <i className="fas fa-caret-down arrow-icon"></i>
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
                                <Link
                                  to={`/assetmanager/pages/newaccountsetup/aws`}
                                >
                                  <span className="image-box">
                                    <img src={AWS} alt="AWS" />
                                  </span>
                                  <p>Amazon Web Services</p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  // to={`/assetmanager/pages/environments/newaccountsetup/azure`}
                                >
                                  <span className="image-box">
                                    <img src={AZURE} alt="AZURE" />
                                  </span>
                                  <p>Azure Cloud</p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  // to={`/assetmanager/pages/environments/newaccountsetup/gcp`}
                                >
                                  <span className="image-box">
                                    <img src={GCP} alt="GCP" />
                                  </span>
                                  <p>Google Cloud Platform</p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  // to={`/assetmanager/pages/environments/newaccountsetup/kubernetes`}
                                >
                                  <span className="image-box">
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
                        <button className="new-button m-r-0 m-b-0">
                          <i className="fas fa-external-link-square-alt p-r-10"></i>
                          Export
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <div className="search-box">
                        <form>
                          <div className="form-group search-control-group m-b-0">
                            <input
                              type="text"
                              className="input-group-text"
                              placeholder="Search"
                              name="searchkey"
                              value={searchkey}
                              onChange={this.handleSearchChange}
                            />
                            <button className="search-btn">
                              <i className="fa fa-search" />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {allEnvSummary.length && this.renderEnvironmentTable()}
          </>
        )}
        <SelectDepartmentPopup ref={this.selectDepartmentPopupModalRef} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { environments } = state;
  return {
    environments,
  };
}

const mapDispatchToProps = {
  getEnvsAsync,
  getEnvsSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Environments);

import React, { Component } from "react";
import AWS from "../../../../assets/img/aws.png";
import AZURE from "../../../../assets/img/microsoftazure.png";
import GCP from "../../../../assets/img/google-cloud.png";
import Kubernetes from "../../../../assets/img/kubernetes.png";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import SelectDepartmentPopup from "../Components/SelectDepartmentPopup";
import {
  getEnvsAsync,
  getEnvsSummary, getDepartmentsOrgWise
} from "redux/assetManager/environments/environmentsThunk";
import status from "../../../../redux/constants/commonDS";
import { APP_PREFIX_PATH } from "../../../../configs/AppConfig";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";

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


  togglePopup = () => {
    this.setState({
      showSelectDepartmentPopup: !this.state.showSelectDepartmentPopup,
    });
  };
  componentDidMount = () => {
    let currentOrgId = localStorage.getItem("currentOrgId")
    this.props.getEnvsAsync(currentOrgId);
    this.props.getEnvsSummary(currentOrgId);
    this.props.getDepartmentsOrgWise(currentOrgId);
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
    if (
      prevProps.environments?.departmentsFilters?.status !==
      this.props.environments.departmentsFilters.status &&
      this.props.environments.departmentsFilters.status === status.SUCCESS &&
      this.props.environments?.departmentsFilters?.data
    ) {
      this.setState({
        departments: this.props.environments.departmentsFilters.data?.departments
      });
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
        <Box className="environment-box" key={env.cloud}>
          <Box className="environment-title">
            <Box className="environment-image">
              <img src={LOGOS[env.cloud.toLowerCase()]} alt={env.cloud} />
            </Box>
            <Box className="title-name">{env.cloud.toUpperCase()}</Box>
          </Box>
          <Box className="data-contant">
            <List>
              <ListItem>
                <Box className="data-text">
                  <span style={{ backgroundColor: "#ff9900" }}></span>
                  <p>Environments</p>
                </Box>
                <label>{env.environments}</label>
              </ListItem>
              <ListItem>
                <Box className="data-text">
                  <span style={{ backgroundColor: "#0089d6" }}></span>
                  <p>Assets</p>
                </Box>
                <label>{env.assets}</label>
              </ListItem>
              <ListItem>
                <Box className="data-text">
                  <span style={{ backgroundColor: "#da4f44" }}></span>
                  <p>Alerts</p>
                </Box>
                <label>{env.alerts}</label>
              </ListItem>
              <ListItem>
                <Box className="data-text">
                  <span style={{ backgroundColor: "#00b929" }}></span>
                  <p>Total Billing</p>
                </Box>
                <label>&#65284;{env.totalBilling}</label>
              </ListItem>
            </List>
          </Box>
        </Box>
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
          <TableRow key={`env-${accountIndex}-${envIndex}`}>
            <TableCell align="left">
              <Link
                to={`${APP_PREFIX_PATH}/environments/environmentlist?accountId=${account.landingZone}&cloudName=${account.cloud}`}
                onClick={() =>
                  this.setLocalRecentService({
                    cloud: account.cloud,
                    accountId: account.landingZone,
                  })
                }
              >
                {account.cloud} ({account.landingZone})
              </Link>
            </TableCell>
            <TableCell align="center">{account.productEnclave}</TableCell>
            <TableCell align="center">{account.product}</TableCell>
            <TableCell align="center">{account.appService}</TableCell>
            <TableCell align="center">{account.dataService}</TableCell>
            <TableCell align="center">
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
                  <Box className="menu-list">
                    <List>
                      <ListItem className="active">
                        <a
                          href={`/assetmanager/pages/add-data-source?accountId=${account.landingZone}&cloudName=${account.cloud}`}
                        >
                          Add New datasource
                        </a>
                      </ListItem>
                      <ListItem>
                        <a href="#">Add CompListItemance</a>
                      </ListItem>
                      <ListItem>
                        <a href="#">Associate to OU</a>
                      </ListItem>
                      <ListItem>
                        <a href="#">Add New VPC</a>
                      </ListItem>
                      <ListItem>
                        <a href="#">Add New Product</a>
                      </ListItem>
                    </List>
                  </Box>
                </>
              ) : (
                <></>
              )}
            </TableCell>
          </TableRow>
        );
      });
      retData.push(
        <div className="environment-table-section">
          <TableContainer className="table">
            <Table>
              <TableHead
                className={
                  this.state.currentActiveTableIndex.includes(envIndex)
                    ? "active"
                    : ""
                }
              >
                <TableRow>
                  <TableCell align="left">
                    <i
                      className={
                        this.state.currentActiveTableIndex.includes(envIndex)
                          ? "fa-solid fa-sort-down"
                          : "fa-solid fa-caret-right"
                      }
                      onClick={() => {
                        this.handleTableToggle(envIndex);
                      }}
                    ></i>
                    <Box className="environment-image">
                      <img src={LOGOS[item.cloud.toLowerCase()]} alt="" />
                    </Box>
                    <strong>{item.cloud}</strong>
                  </TableCell>
                  <TableCell align="center">Product Enclave</TableCell>
                  <TableCell align="center">Products</TableCell>
                  <TableCell align="center">App Services</TableCell>
                  <TableCell align="center">Data Services</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              {this.state.currentActiveTableIndex.includes(envIndex) && (
                <TableBody>{accountsJSX}</TableBody>
              )}
            </Table>
          </TableContainer>
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
      <div className="environment-container">
        {!dataFetched ? (
          <Box className="chart-spinner text-center w-100 p-t-20 p-b-20">
            <i className="fa-solid fa-spinner fa-spin" /> Loading...
          </Box>
        ) : (
          <>
            <Box className="list-heading">
              <h3>Environments</h3>
            </Box>
            <Box className="environment-boxs m-t-4">
              {allEnvData?.length && this.renderEnvironmentBoxes()}
            </Box>
            <Box className="add-new-environment">
              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  <Grid item lg={3} md={3} xs={12}>
                    <Box className="environment-fliter">
                      <Box
                        className="fliter-toggel"
                        onClick={this.togglePopup}
                      >
                        <i className="fa-solid fa-filter fillter-icon"></i>
                        fillter
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={9} md={9} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                      >
                        <Grid item lg={8} md={12} xs={12}>
                          <Box className="export-sction">
                            {JSON.parse(localStorage.getItem("recentEnv")) !==
                              null && (
                                <Box className="environment-fliter">
                                  <Box
                                    className="fliter-toggel"
                                    onClick={() =>
                                      this.setState({
                                        showRecentFilter: !showRecentFilter,
                                      })
                                    }
                                  >
                                    <i className="fa-solid fa-alarm-clock fillter-icon"></i>
                                    Recent
                                    <i className="fa-solid fa-caret-down arrow-icon"></i>
                                  </Box>
                                  <Box
                                    className={
                                      showRecentFilter === true
                                        ? "fliter-collapse  active"
                                        : "fliter-collapse"
                                    }
                                  >
                                    <List>
                                      {JSON.parse(
                                        localStorage.getItem("recentEnv")
                                      )?.map((item) => {
                                        return (
                                          <ListItem>
                                            <Link
                                              to={`${APP_PREFIX_PATH}/environments/environmentlist?accountId=${item.accountId}&cloudName=${item.accountType}`}
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
                                                      : item.accountType ===
                                                        "GCP" ||
                                                        item.accountType === "gcp"
                                                        ? GCP
                                                        : AZURE
                                                  }
                                                  alt={item.accountType}
                                                />
                                              </span>
                                              <p>({item.accountId})</p>
                                            </Link>
                                          </ListItem>
                                        );
                                      })}
                                    </List>
                                  </Box>
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
                                </Box>
                              )}
                            <Box className="environment-fliter">
                              <Box
                                className="fliter-toggel new-environment"
                                onClick={() =>
                                  this.setState({
                                    showAddNewFilter: !showAddNewFilter,
                                  })
                                }
                              >
                                Add New Environment
                                <i className="fa-solid fa-caret-down arrow-icon"></i>
                              </Box>
                              <Box
                                className={
                                  showAddNewFilter === true
                                    ? "fliter-collapse active"
                                    : "fliter-collapse"
                                }
                              >
                                <List>
                                  <ListItem>
                                    <Link
                                      to={`${APP_PREFIX_PATH}/environments/aws/newaccountsetup`}
                                    >
                                      <span className="image-box">
                                        <img src={AWS} alt="AWS" />
                                      </span>
                                      <p>Amazon Web Services</p>
                                    </Link>
                                  </ListItem>
                                  <ListItem>
                                    <Link
                                      to={`${APP_PREFIX_PATH}/environments/azure/newaccountsetup`}
                                    >
                                      <span className="image-box">
                                        <img src={AZURE} alt="AZURE" />
                                      </span>
                                      <p>Azure Cloud</p>
                                    </Link>
                                  </ListItem>
                                  <ListItem>
                                    <Link
                                      to={`${APP_PREFIX_PATH}/environments/gcp/newaccountsetup`}
                                    >
                                      <span className="image-box">
                                        <img src={GCP} alt="GCP" />
                                      </span>
                                      <p>Google Cloud Platform</p>
                                    </Link>
                                  </ListItem>
                                  <ListItem>
                                    <Link
                                      to={`${APP_PREFIX_PATH}/environments/kubernetes/newaccountsetup`}
                                    >
                                      <span className="image-box">
                                        <img
                                          src={Kubernetes}
                                          alt="Kubernetes"
                                        />
                                      </span>
                                      <p>Kubernetes</p>
                                    </Link>
                                  </ListItem>
                                </List>
                              </Box>
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
                            </Box>
                            <Button
                              className="primary-btn min-width-inherit"
                              variant="contained"
                            >
                              <i className="fas fa-external-link-square-alt p-r-10"></i>
                              Export
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item lg={4} md={12} xs={12}>
                          <Box className="search-box">
                            <Box className="form-group search-control-group m-b-0">
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
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {allEnvSummary.length && this.renderEnvironmentTable()}
          </>
        )}
        {this.state.showSelectDepartmentPopup ?
          <SelectDepartmentPopup showModal={this.state.showSelectDepartmentPopup} togglePopup={this.togglePopup} departments={this.state.departments || []} />
          : <></>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { environments, departments } = state;
  return {
    environments, departments
  };
}

const mapDispatchToProps = {
  getEnvsAsync,
  getEnvsSummary, getDepartmentsOrgWise
};

export default connect(mapStateToProps, mapDispatchToProps)(Environments);

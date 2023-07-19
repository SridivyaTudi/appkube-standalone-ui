import React, { Component } from "react";
import Aws from "assets/img/aws.png";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Microsoftazure from "assets/img/microsoftazure.png";
import config from "views/app-views/config";
import GoogleCloud from "assets/img/google-cloud.png";
import Kubernetes from "assets/img/kubernetes.png";
import { Box, Grid, List, ListItem } from "@mui/material";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import Button from "@mui/material/Button";
import status from "redux/constants/commonDS";
import { connect } from "react-redux";
import { ToastMessage } from "Toast/ToastMessage";
import { v4 } from "uuid";
import {
  getRecentVisitedEnvironments,
  setRecentVisitedEnvironments,
} from "utils";

const headers = [
  { label: "Service Name", key: "name" },
  { label: "Product", key: "product_count" },
  { label: "App Service", key: "app_count" },
  { label: "Data Service", key: "data_count" },
];
const LOGOS = {
  aws: Aws,
  azure: Microsoftazure,
  gcp: GoogleCloud,
  kubernetes: Kubernetes,
};
class CommonFilterViewSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecentFilter: false,
      showSelectFilter: false,
      showServiceViewFilter: false,
      allEnvs: [],
      ...props.data,
    };
  }

  componentDidMount = () => {
    if (this.props.envSummary.data) {
      this.setState({
        allEnvs: this.props.envSummary.data,
      });
    }
  };

  renderAccountList = () => {
    return this.state.allEnvs.map((item) => {
      return item.environmentSummaryList.map((account, innerKey) => {
        return (
          <ListItem key={v4()}>
            <Link
              to={`${APP_PREFIX_PATH}/environments/environmentlist?landingZone=${account.landingZone}&cloudName=${account.cloud}`}
              onClick={() => {
                this.setState({ showServiceViewFilter: false });
                this.props.updateAccountId(account.landingZone);
              }}
            >
              <span>
                <img
                  src={LOGOS[account.cloud.toLowerCase()]}
                  alt={account.cloud}
                />
              </span>
              <p>({account.landingZone})</p>
            </Link>
          </ListItem>
        );
      });
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      this.props.data &&
      this.props.data.vpcsDetails !== null &&
      this.props.data.vpcsDetails !== this.state.vpcsDetails
    ) {
      this.setState({ vpcsDetails: this.props.data.vpcsDetails });
    }
    if (prevProps.envSummary.status !== this.props.envSummary.status) {
      if (
        this.props.envSummary.status === status.SUCCESS &&
        this.props.envSummary.data
      ) {
        this.setState({
          allEnvs: this.props.envSummary.data,
        });
      } else if (this.props.envSummary.status === status.FAILURE) {
        ToastMessage.error("There is some issue.");
      }
    }
  };

  addAccountToRecentlyVisited = (account) => {
    const newItem = {
      accountType: account.accountType,
      accountId: account.accountId,
    };
    let recentEnv = getRecentVisitedEnvironments();
    if (recentEnv !== null) {
      recentEnv.map((item, index) => {
        if (item.accountId === account.accountId) {
          recentEnv.splice(index, 1);
        }
      });
      recentEnv.splice(0, 0, newItem);
    } else {
      recentEnv = [newItem];
    }
    recentEnv.length = recentEnv.length > 5 ? 5 : recentEnv.length;
    setRecentVisitedEnvironments(recentEnv);
  };

  renderRecentVisitedMenu = () => {
    const recentEnvs = getRecentVisitedEnvironments();
    if (recentEnvs) {
      return recentEnvs.map((item) => {
        return (
          <ListItem key={v4()}>
            <Link
              to={`${APP_PREFIX_PATH}/environments/environmentlist?landingZone=${item.accountId}&cloudName=${item.accountType}`}
              onClick={() => {
                this.addAccountToRecentlyVisited(item);
                this.props.updateCurrentAccountId(item.accountId);
              }}
            >
              <span>
                <img
                  src={LOGOS[item.accountType.toLowerCase()]}
                  alt={item.accountType}
                />
              </span>
              <p>{item.accountId}</p>
            </Link>
          </ListItem>
        );
      });
    }
    return null;
  };

  render() {
    const {
      showSelectFilter,
      showServiceViewFilter,
      showRecentFilter,
      allEnvs,
      vpcsDetails,
    } = this.state;
    return (
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box className="environment-fliter">
              <Box
                className="fliter-toggel"
                onClick={() =>
                  this.setState({
                    showSelectFilter: !showSelectFilter,
                  })
                }
              >
                <i className="fas fa-filter fillter-icon"></i>
                Select and fillter
                <i className="fas fa-caret-down arrow-icon"></i>
              </Box>
              <Box
                className={
                  showSelectFilter === true
                    ? "fliter-collapse active"
                    : "fliter-collapse"
                }
              >
                <Box className="search-bar">
                  <input type="text" placeholder="Search...." />
                </Box>
                <List>
                  <ListItem>
                    <input
                      type="checkbox"
                      // onChange={() => this.handleChecked()}
                    />
                    OU
                  </ListItem>
                  <ListItem>
                    <input
                      type="checkbox"
                      // onChange={() => this.handleChecked()}
                    />
                    Status
                  </ListItem>
                  <ListItem>
                    <input
                      type="checkbox"
                      // onChange={() => this.handleChecked()}
                    />
                    No of Assets
                  </ListItem>
                  <ListItem>
                    <input
                      type="checkbox"
                      // onChange={() => this.handleChecked()}
                    />
                    Logs
                  </ListItem>
                  <ListItem>
                    <input
                      type="checkbox"
                      // onChange={() => this.handleChecked()}
                    />
                    Performance & Availability
                  </ListItem>
                </List>
              </Box>
              <Box
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
            </Box>
            <Box className="environment-fliter">
              <Box
                className="fliter-toggel"
                onClick={() =>
                  this.setState({
                    showServiceViewFilter: !showServiceViewFilter,
                  })
                }
              >
                <i className="far fa-eye fillter-icon"></i>
                Go to Service View
                <i className="fas fa-caret-down arrow-icon"></i>
              </Box>
              <Box
                className={
                  showServiceViewFilter === true
                    ? "fliter-collapse recent-collapse active"
                    : "fliter-collapse"
                }
              >
                <List>{allEnvs.length ? this.renderAccountList() : <></>}</List>
              </Box>
              <Box
                className={
                  showServiceViewFilter === true
                    ? "fliters-collapse-bg active"
                    : "fliters-collapse-bg"
                }
                onClick={() =>
                  this.setState({
                    showServiceViewFilter: !showServiceViewFilter,
                  })
                }
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="d-inline-block width-100 text-right">
              {getRecentVisitedEnvironments() !== null && (
                <Box className="environment-fliter">
                  <Box
                    className="fliter-toggel"
                    onClick={() =>
                      this.setState({
                        showRecentFilter: !showRecentFilter,
                      })
                    }
                  >
                    <i className="far fa-clock fillter-icon"></i>
                    Recent
                    <i className="fas fa-caret-down arrow-icon"></i>
                  </Box>
                  <Box
                    className={
                      showRecentFilter === true
                        ? "fliter-collapse recent-collapse active"
                        : "fliter-collapse"
                    }
                  >
                    <List>{this.renderRecentVisitedMenu()}</List>
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

              {vpcsDetails && vpcsDetails.length ? (
                <CSVLink
                  data={vpcsDetails}
                  headers={headers}
                  filename={"vpcs.csv"}
                  target="_blank"
                >
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    <i className="fas fa-external-link-square-alt p-r-10"></i>
                    Export
                  </Button>
                </CSVLink>
              ) : (
                <></>
              )}

              <Box className="search-box">
                <Box className="form-group search-control-group m-b-0">
                  <input
                    type="text"
                    className="input-group-text"
                    placeholder="Search"
                    onChange={(e) => {
                      this.props.handleSearch(e.target.value);
                    }}
                  />
                  <button className="search-btn">
                    <i className="fa fa-search" />
                  </button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { envSummary } = state.environments;
  return { envSummary };
}

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonFilterViewSearch);

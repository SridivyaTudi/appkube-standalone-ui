import React, { Component } from "react";
import CloudManagedDetails from "./CloudManagedDetails";
import {
  IconButton,
  Box,
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
  Button,
  TableBody,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import TopologyView from "./Components/TopologyView";
import VpcDetails from "./VpcDetails";
import ClusterDetails from "./ClusterDetails";
import AssociateApp from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/AssociateApp";
import { v4 } from "uuid";
import { LOGOS } from "CommonData";
import {
  getEnvironmentDataByLandingZone,
  GetInfraTopologyCloudElementList,
} from "Redux/EnvironmentData/EnvironmentDataThunk";
import { getCurrentOrgId } from "Utils";

const queryPrm = new URLSearchParams(document.location.search);
const landingZone = queryPrm.get("landingZone");
const orgId = getCurrentOrgId();

class DiscoveredAssets extends Component {
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      breadcrumbs: {
        breadcrumbId: v4(),
        cloudName: cloudName?.toUpperCase(),
        selectedLevel1: "",
        selectedLevel2: "",
      },
      data: {},
      currentActiveNodeLabel: "",
      currentVPC: {},
      showMenu: null,
      cloudName,
      activeTierTab: "3Tier",
      isClusterShow: false,
      currentActiveNode: "",
      cloudElementsData: [],
    };
  }

  componentDidMount = () => {
    this.props.getEnvironmentDataByLandingZone({
      orgID: orgId,
      landingZone: landingZone,
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.envDataByLandingZone.status !==
        this.props.envDataByLandingZone.status &&
      this.props.envDataByLandingZone.status === status.SUCCESS
    ) {
      this.setState({ data: this.props.envDataByLandingZone.data });
    }

    if (prevState.currentActiveNode !== this.state.currentActiveNode) {
      this.props.GetInfraTopologyCloudElementList({
        orgID: orgId,
        landingZone: landingZone,
        productEnclave: this.state.currentActiveNode,
      });
    }

    if (
      prevProps.infraTopologyCloudElementList.status !==
        this.props.infraTopologyCloudElementList.status &&
      this.props.infraTopologyCloudElementList.status === status.SUCCESS
    ) {
      this.setState({
        cloudElementsData: this.props.infraTopologyCloudElementList.data,
      });
    }
  };

  toggleMenu = (index) => {
    const { showMenu } = this.state;
    if (showMenu === null) {
      this.setState({
        showMenu: index,
      });
    } else {
      this.setState({
        showMenu: null,
      });
    }
  };

  /** Render the BreadCrumbs of Topologyview. */
  renderBreadCrumbs() {
    let { breadcrumbs } = this.state;
    let { selectedLevel1, selectedLevel2, cloudName } = breadcrumbs;
    let activeClassKey =
      cloudName && selectedLevel1 && !selectedLevel2
        ? "selectedLevel1"
        : selectedLevel1 && selectedLevel2
        ? "selectedLevel2"
        : "cloudName";
    let breadCrumbsData = Object.keys(breadcrumbs);

    return breadCrumbsData.map((breadCrumb, index) => {
      if (breadcrumbs[breadCrumb] && breadCrumb !== "breadcrumbId") {
        return (
          <>
            {breadCrumb !== "cloudName" ? (
              <li key={v4()}>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
            ) : (
              <></>
            )}
            <li
              onClick={() => {
                this.onClickBreadCrumbOfTopology(breadCrumb);
              }}
              className={`${activeClassKey === breadCrumb ? "active" : ""}`}
              key={v4()}
            >
              <a>
                {breadCrumb === "cloudName" || breadCrumb === "selectedLevel1"
                  ? breadcrumbs[breadCrumb]?.toUpperCase()
                  : breadCrumb === "selectedLevel2"
                  ? `${breadcrumbs[breadCrumb][0]?.toUpperCase()}${breadcrumbs[
                      breadCrumb
                    ].slice(1)}`
                  : breadcrumbs[breadCrumb]}
              </a>
            </li>
          </>
        );
      }
    });
  }

  /** Render Table for 3 Tier Tab */
  render3TierTableData() {
    let { data } = this.state;
    const tableBodyJSX = [];
    data.productEnclaveList.map((vpc, index) => {
      tableBodyJSX.push(
        <TableRow key={v4()}>
          <TableCell align="center">{vpc.id}</TableCell>
          <TableCell align="center">{vpc.threeTier.productCount}</TableCell>
          <TableCell align="center">{vpc.threeTier.webCount}</TableCell>
          <TableCell align="center">{vpc.threeTier.appCount}</TableCell>
          <TableCell align="center">{vpc.threeTier.dataCount}</TableCell>
          <TableCell align="center">{vpc.threeTier.auxiliaryCount}</TableCell>
          <TableCell align="center">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => this.toggleMenu(index)}
              className="list-icon"
            >
              <i className="fas fa-ellipsis-v"></i>
            </IconButton>

            {this.state.showMenu === index && (
              <>
                <Box
                  className="open-create-menu-close"
                  onClick={() => this.toggleMenu(index)}
                ></Box>
                <Box className="menu-list">
                  <List>
                    <ListItem>
                      <a href="#">Add New datasource</a>
                    </ListItem>
                    <ListItem>
                      <a href="#">Add Compliance</a>
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
            )}
          </TableCell>
        </TableRow>
      );
    });
    const TableJSX = [
      <Box className="discovered-table" style={{ height: "415px" }}>
        <TableContainer className="table">
          <Table className="discovered-table-inner">
            <TableHead className="active">
              <TableRow>
                <TableCell>
                  <Box className="environment-image">
                    <img src={LOGOS["aws".toUpperCase()]} alt={"aws"} />
                  </Box>
                </TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Web Layer</TableCell>
                <TableCell>App Layer</TableCell>
                <TableCell>Data Layer</TableCell>
                <TableCell>Auxiliary</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableBodyJSX}</TableBody>
          </Table>
        </TableContainer>
      </Box>,
    ];
    return TableJSX;
  }

  /**Render Table for Soa Tab */
  renderSoaTableData() {
    let { data } = this.state;
    const tableBodyJSX = [];
    data.productEnclaveList.map((vpc, index) => {
      tableBodyJSX.push(
        <TableRow key={v4()}>
          <TableCell align="center">{vpc.id}</TableCell>
          <TableCell align="center">{vpc.soa.productCount}</TableCell>
          <TableCell align="center">{vpc.soa.appCount}</TableCell>
          <TableCell align="center">{vpc.soa.dataCount}</TableCell>
          <TableCell align="center">{vpc.soa.otherCount}</TableCell>
          <TableCell align="center">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => this.toggleMenu(index)}
              className="list-icon"
            >
              <i className="fas fa-ellipsis-v"></i>
            </IconButton>

            {this.state.showMenu === index && (
              <>
                <Box
                  className="open-create-menu-close"
                  onClick={() => this.toggleMenu(index)}
                ></Box>
                <Box className="menu-list">
                  <List>
                    <ListItem>
                      <a href="#">Add New datasource</a>
                    </ListItem>
                    <ListItem>
                      <a href="#">Add Compliance</a>
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
            )}
          </TableCell>
        </TableRow>
      );
    });
    const TableJSX = [
      <Box className="discovered-table" style={{ height: "415px" }}>
        <TableContainer className="table">
          <Table className="discovered-table-inner">
            <TableHead className="active">
              <TableRow>
                <TableCell>
                  <Box className="environment-image">
                    <img src={LOGOS.AWS} alt={"aws".toUpperCase()} />
                  </Box>
                </TableCell>
                <TableCell>Products</TableCell>
                <TableCell>App Services</TableCell>
                <TableCell>Data Services</TableCell>
                <TableCell>Other Services</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableBodyJSX}</TableBody>
          </Table>
        </TableContainer>
      </Box>,
    ];
    return TableJSX;
  }

  /** Get productEnclaveList and globalServiceList using envDataByLandingZone. */
  getEnvironmentDataByLandingZone = () => {
    const { envDataByLandingZone } = this.props;
    let checkLengthEnvData = false;
    try {
      checkLengthEnvData =
        envDataByLandingZone && Object.keys(envDataByLandingZone.data).length;
    } catch (error) {
      console.log(error);
    }
    return checkLengthEnvData
      ? {
          productEnclaveList: envDataByLandingZone.data?.productEnclaveList,
          globalServiceList: envDataByLandingZone.data?.globalServiceList,
        }
      : {};
  };

  /**
   * Prepare bread crumbs of Topology
   * @param {string} label - The label of the level-1 or level-2.
   * @param {boolean} isLevel2Data - It is checked level-2 data.
   */
  prepareBreadCrumbs(label, isLevel2Data) {
    let { breadcrumbs, currentVPC } = this.state;
    let { selectedLevel1, selectedLevel2, cloudName, breadcrumbId } =
      breadcrumbs;

    if (isLevel2Data) {
      selectedLevel2 = label;
    } else {
      selectedLevel1 = label;
      selectedLevel2 = "";
    }

    this.setState({
      breadcrumbs: { breadcrumbId, cloudName, selectedLevel1, selectedLevel2 },
    });
  }

  /**
   * Fire click event bread-crumb of Topology
   * @param {string} type - type of data, it includes cloudName,level-1 or level-2 .
   */
  onClickBreadCrumbOfTopology(type) {
    let { selectedLevel1, selectedLevel2, cloudName, breadcrumbId } =
      this.state.breadcrumbs;

    breadcrumbId = v4();
    if (type === "cloudName") {
      selectedLevel1 = "";
      selectedLevel2 = "";
    } else if (type === "selectedLevel1") selectedLevel2 = "";

    this.setState({
      breadcrumbs: { breadcrumbId, cloudName, selectedLevel1, selectedLevel2 },
    });
  }

  handleTierTabToggle = (type) => {
    this.setState({ activeTierTab: type });
  };

  setCurrentActiveNode = (node) => {
    this.setState({ currentActiveNode: node });
  };

  render() {
    const {
      currentActiveNodeLabel,
      currentVPC,
      breadcrumbs,
      activeTierTab,
      isClusterShow,
      data,
      currentActiveNode,
      cloudElementsData,
    } = this.state;
    const { envDataByLandingZone, departments } = this.props;
    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-body">
          {envDataByLandingZone.status === status.IN_PROGRESS ||
          departments.status === status.IN_PROGRESS ? (
            <Box className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20">
              <i className="fa-solid fa-spinner fa-spin" /> Loading...
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={5}>
                  <Box className="services-panel">
                    <Box className="services-panel-title bottom-border">
                      <Box className="name">Infra Topology View</Box>
                      <Box className="back-btn">
                        <i className="fa-solid fa-arrow-left"></i>
                      </Box>
                    </Box>
                    <Box className="services-panel-body">
                      {Object.keys(data).length > 0 ? (
                        <TopologyView
                          data={data}
                          parentCssClass="infra-toplogy-view"
                          setCurrentActiveNode={this.setCurrentActiveNode}
                        />
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  {!currentActiveNodeLabel ? (
                    <Box className="tier-buttons">
                      <Button
                        variant={
                          activeTierTab === "3Tier" ? "contained" : "outlined"
                        }
                        className={
                          activeTierTab === "3Tier"
                            ? "primary-btn min-width"
                            : "primary-outline-btn min-width"
                        }
                        onClick={() => this.handleTierTabToggle("3Tier")}
                      >
                        3 Tier
                      </Button>
                      <Button
                        variant={
                          activeTierTab === "Soa" ? "contained" : "outlined"
                        }
                        className={
                          activeTierTab === "Soa"
                            ? "primary-btn min-width"
                            : "primary-outline-btn min-width"
                        }
                        onClick={() => this.handleTierTabToggle("Soa")}
                      >
                        SOA
                      </Button>
                    </Box>
                  ) : (
                    <></>
                  )}

                  <Box className="global-services-fliter">
                    <Box className="heading">
                      <Box className="breadcrumbs">
                        <ul>{this.renderBreadCrumbs()}</ul>
                        {currentActiveNodeLabel.includes("vpc") ? (
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Show cluster"
                            className="checkbox primary m-l-auto m-r-0"
                            size="small"
                            onChange={() => {
                              this.setState({ isClusterShow: !isClusterShow });
                            }}
                            checked={isClusterShow}
                          />
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {activeTierTab === "3Tier" &&
                  Object.keys(data).length > 0 &&
                  !currentActiveNode ? (
                    this.render3TierTableData()
                  ) : activeTierTab === "Soa" &&
                    Object.keys(data).length > 0 ? (
                    this.renderSoaTableData()
                  ) : (
                    <></>
                  )}
                  <Box className="fliter-tabs global-service-penal">
                    {/* <ClusterDetails /> */}
                    {currentActiveNode ? <CloudManagedDetails /> : <></>}
                    {/* <VpcDetails vpc={currentVPC} /> */}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        {cloudElementsData.length ? (
          <AssociateApp data={cloudElementsData} />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { envDataByLandingZone, departments, infraTopologyCloudElementList } =
    state.environmentData;
  return { envDataByLandingZone, departments, infraTopologyCloudElementList };
}

const mapDispatchToProps = {
  getEnvironmentDataByLandingZone,
  GetInfraTopologyCloudElementList,
};
export default connect(mapStateToProps, mapDispatchToProps)(DiscoveredAssets);

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
  getInfraTopologyCategoryWiseViewData,
  getInfraTopologyDbCategories,
  getInfraTopologyLambdaTableData,
} from "Redux/EnvironmentData/EnvironmentDataThunk";
import { getCurrentOrgId } from "Utils";
import LambdaTable from "./LambdaTable";

const orgId = getCurrentOrgId();

class DiscoveredAssets extends Component {
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      breadcrumbs: [{ level: -1, name: cloudName }],
      data: {},
      currentActiveNodeLabel: "",
      currentVPC: {},
      showMenu: null,
      cloudName,
      activeTierTab: "3Tier",
      isClusterShow: false,
      currentActiveNode: "",
      currentActiveNodeId: "",
      cloudElementsData: [],
      topologyCategoryWiseData: [],
      currentActiveTopologyCategory: "",
      selectedCategoryCloudElementsData: [],
      ecsMetaData: {},
      eksMetaData: {},
      lambdaTableData: [],
    };
  }

  componentDidMount = () => {
    const queryPrm = new URLSearchParams(document.location.search);
    const landingZone = queryPrm.get("landingZone");
    this.props.getEnvironmentDataByLandingZone({
      orgID: orgId,
      landingZone: landingZone,
    });
    this.props.getInfraTopologyDbCategories();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const queryPrm = new URLSearchParams(document.location.search);
    const landingZone = queryPrm.get("landingZone");

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
      this.props.getInfraTopologyCategoryWiseViewData({
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
      this.setState(
        {
          cloudElementsData: this.props.infraTopologyCloudElementList.data,
        },
        () => {
          this.setCurrentTopologyCategory(
            this.props.infraTopologyCloudElementList.data[0].elementType
          );
        }
      );
    }

    if (
      prevProps.infraTopologyCategoryWiseData.status !==
        this.props.infraTopologyCategoryWiseData.status &&
      this.props.infraTopologyCategoryWiseData.status === status.SUCCESS
    ) {
      let eksData;
      let ecsData;
      this.props.infraTopologyCategoryWiseData.data.map((item) => {
        if (item.elementType === "ECS") {
          const newKey = "noOfEcs";
          const newValue = item.totalRecord;
          const newObject = { [newKey]: newValue, ...item.metadata };
          ecsData = newObject;
        }
        if (item.elementType === "EKS") {
          const newKey = "noOfEks";
          const newValue = item.totalRecord;
          const newObject = { [newKey]: newValue, ...item.metadata };
          eksData = newObject;
        }
      });
      this.setState({
        topologyCategoryWiseData: this.props.infraTopologyCategoryWiseData.data,
        currentActiveTopologyCategory:
          this.props.infraTopologyCategoryWiseData.data[0].elementType,
        ecsMetaData: ecsData,
        eksMetaData: eksData,
      });
    }

    if (
      prevProps.infraTopologyLambdaTable.status !==
        this.props.infraTopologyLambdaTable.status &&
      this.props.infraTopologyLambdaTable.status === status.SUCCESS
    ) {
      const lambdaData = [];
      this.props.infraTopologyLambdaTable.data.map((item) => {
        if (item.configJson) {
          lambdaData.push({
            functionName: item.instanceName,
            responseTime: item.configJson?.responseTime,
            duration: item.configJson?.duration,
            invocations: item.configJson?.invocations,
            throttles: item.configJson?.throttles,
            errors: item.configJson?.errors,
            latency: item.configJson?.latency,
            networkReceived: item.configJson?.networkReceived,
            requests: item.configJson?.requests,
            product: item.configJson?.product,
            environment: item.configJson?.environment,
            actions: "",
          });
        }
      });
      this.setState({ lambdaTableData: lambdaData });
    }
  };

  setCurrentTopologyCategory = (category) => {
    const { cloudElementsData, currentActiveNodeId } = this.state;
    this.setState({ currentActiveTopologyCategory: category });
    if (category === "Lambda") {
      this.setState({ selectedCategoryCloudElementsData: [] });
      const queryPrm = new URLSearchParams(document.location.search);
      const landingZone = queryPrm.get("landingZoneId");
      this.props.getInfraTopologyLambdaTableData({
        elementType: category,
        landingZone: landingZone,
        productEnclave: currentActiveNodeId,
      });
    } else {
      const newArray = [];
      cloudElementsData.map((item) => {
        if (item.elementType === category) {
          newArray.push(item);
        }
      });
      this.setState({ selectedCategoryCloudElementsData: newArray });
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

    return breadcrumbs.map((item, index) => {
      return (
        <>
          <li
            className={`${index === breadcrumbs.length - 1 ? "active" : ""}`}
            key={v4()}
          >
            <a>{item.name.toUpperCase()}</a>
          </li>
          {index !== breadcrumbs.length - 1 ? (
            <li key={v4()}>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
          ) : (
            <></>
          )}
        </>
      );
    });
  }

  handleTierTabToggle = (type) => {
    this.setState({ activeTierTab: type });
  };

  setCurrentActiveNode = (node, nodeLevelData, nodeID) => {
    const { breadcrumbs } = this.state;
    let dupIndex = null;
    breadcrumbs.map((item, index) => {
      if (item.level === nodeLevelData[0]) {
        dupIndex = index;
      }
    });
    if (dupIndex) {
      breadcrumbs[dupIndex].name = node;
      breadcrumbs[dupIndex].level = nodeLevelData[0];
    } else {
      breadcrumbs.push({ level: nodeLevelData[0], name: node });
    }
    this.setState({
      currentActiveNode: node,
      currentActiveNodeId: nodeID,
      breadcrumbs,
    });
    this.renderCloudManagedDetails();
  };

  /** Render Table for 3 Tier Tab */
  render3TierTableData() {
    let { data } = this.state;
    const tableBodyJSX = [];
    data.productEnclaveList.map((vpc, index) => {
      tableBodyJSX.push(
        <TableRow key={v4()}>
          <TableCell align="center">{vpc.instanceId}</TableCell>
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
                    <img
                      src={
                        LOGOS[this.getLandingZoneOrCloudName().cloudName]
                          ? LOGOS[this.getLandingZoneOrCloudName().cloudName]
                          : ""
                      }
                      alt={this.getLandingZoneOrCloudName().cloudName}
                    />
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

  renderCloudManagedDetails = () => {
    return (
      <CloudManagedDetails
        setCurrentTopologyCategory={this.setCurrentTopologyCategory}
      />
    );
  };

  getLandingZoneOrCloudName = () => {
    const queryPrm = new URLSearchParams(document.location.search);
    const landingZone = queryPrm.get("landingZone");
    const cloudName = queryPrm.get("cloudName")?.toUpperCase();
    return { cloudName, landingZone };
  };

  render() {
    const {
      activeTierTab,
      isClusterShow,
      data,
      currentActiveNode,
      selectedCategoryCloudElementsData,
      eksMetaData,
      ecsMetaData,
      currentActiveTopologyCategory,
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
                  {!currentActiveNode ? (
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
                        {currentActiveNode ? (
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Show cluster"
                            className="checkbox primary m-l-auto m-r-0"
                            size="small"
                            onChange={(e) => {
                              this.setState({ isClusterShow: !isClusterShow });
                              if (e.target.checked) {
                                this.setCurrentTopologyCategory("EKS");
                              } else {
                                this.setCurrentTopologyCategory(
                                  this.props.infraTopologyCloudElementList
                                    .data[0].elementType
                                );
                              }
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
                    Object.keys(data).length > 0 &&
                    !currentActiveNode ? (
                    this.renderSoaTableData()
                  ) : (
                    <></>
                  )}
                  <Box className="fliter-tabs global-service-penal">
                    {isClusterShow ? (
                      <ClusterDetails
                        eksData={eksMetaData}
                        ecsData={ecsMetaData}
                        setCategory={this.setCurrentTopologyCategory}
                      />
                    ) : (
                      <></>
                    )}
                    {currentActiveNode && !isClusterShow ? (
                      <>
                        {this.props.infraTopologyCloudElementList.status ===
                        status.IN_PROGRESS ? (
                          <Box className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20">
                            <i className="fa-solid fa-spinner fa-spin" />
                            Loading...
                          </Box>
                        ) : (
                          this.renderCloudManagedDetails()
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {/* <VpcDetails vpc={currentVPC} /> */}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        {currentActiveTopologyCategory === "Lambda" ? (
          <>
            {this.props.infraTopologyLambdaTable.status ===
              status.IN_PROGRESS ||
            this.props.infraTopologyCloudElementList.status ===
              status.IN_PROGRESS ? (
              <Box className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20">
                <i className="fa-solid fa-spinner fa-spin" /> Loading...
              </Box>
            ) : (
              <LambdaTable tableData={this.state.lambdaTableData} />
            )}
          </>
        ) : this.props.infraTopologyCloudElementList.status ===
          status.IN_PROGRESS ? (
          <Box className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20">
            <i className="fa-solid fa-spinner fa-spin" />
            Loading...
          </Box>
        ) : (
          <AssociateApp data={selectedCategoryCloudElementsData} />
        )}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const {
    envDataByLandingZone,
    departments,
    infraTopologyCloudElementList,
    infraTopologyCategoryWiseData,
    infraTopologyLambdaTable,
  } = state.environmentData;
  return {
    envDataByLandingZone,
    departments,
    infraTopologyCloudElementList,
    infraTopologyCategoryWiseData,
    infraTopologyLambdaTable,
  };
}

const mapDispatchToProps = {
  getEnvironmentDataByLandingZone,
  GetInfraTopologyCloudElementList,
  getInfraTopologyCategoryWiseViewData,
  getInfraTopologyDbCategories,
  getInfraTopologyLambdaTableData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveredAssets);

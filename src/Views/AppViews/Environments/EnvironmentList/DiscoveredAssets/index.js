import React, { Component, Fragment } from "react";
import CloudManagedDetails from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/CloudManagedDetails";
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
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import TopologyView from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/Components/TopologyView";
import ClusterDetails from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/ClusterDetails";
import AssociateApp from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/AssociateApp";
import { v4 } from "uuid";
import { API_ERROR_MESSAGE, LOGOS, NO_DATA_FOUND } from "CommonData";
import {
  getEnvironmentDataByLandingZone,
  GetInfraTopologyCloudElementList,
  getInfraTopologyCategoryWiseViewData,
  getInfraTopologyDbCategories,
  getInfraTopologyLambdaTableData,
  getGlobalServiceCategoryWiseSummary,
  getGlobalServiceCloudElements,
} from "Redux/EnvironmentData/EnvironmentDataThunk";
import LambdaTable from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/LambdaTable";
import Loader from "Components/Loader";
import GlobalServicesSummaryTable from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/GlobalServicesSummaryTable";
import { PRODUCT_CATEGORY_ENUM, getSelectedInfraTopologyView } from "Utils";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ExcludeLambdaTableOfGlobalService from "./Components/ExcludeLambdaTableOfGlobalService";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

class DiscoveredAssets extends Component {
  constructor(props) {
    super(props);
    const { cloudName } = this.getUrlDetails();
    this.state = {
      breadcrumbs: [{ level: -1, name: cloudName }],
      data: {},
      currentActiveNodeLabel: "",
      currentVPC: {},
      showMenu: null,
      cloudName,
      activeTierTab: PRODUCT_CATEGORY_ENUM.THREE_TIER,
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
      globalServicesSummaryData: [],
      currentActiveGlobalServiceCategory: "",
      selectedCategoryGlobalServicesData: [],
      excludeLambdaTableData: [],
    };
  }

  componentDidMount = () => {
    const { landingZoneId } = this.getUrlDetails();
    this.props.getEnvironmentDataByLandingZone({ landingZoneId });
    this.props.getInfraTopologyDbCategories();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { landingZoneId } = this.getUrlDetails();
    if (
      prevProps.envDataByLandingZone.status !==
        this.props.envDataByLandingZone.status &&
      this.props.envDataByLandingZone.status === status.SUCCESS
    ) {
      let { cloudName } = this.getUrlDetails();

      let resEnvData = this.props.envDataByLandingZone.data;
      if (resEnvData) {
        this.setState({
          data: { ...resEnvData, label: "Account ID", image: LOGOS[cloudName] },
        });
      }
    }

    if (prevState.currentActiveNode !== this.state.currentActiveNode) {
      if (this.state.currentActiveNode === "Global Services") {
        this.props.getGlobalServiceCategoryWiseSummary({ landingZoneId });
      } else {
        const { currentActiveNode: productEnclave } = this.state;
        this.props.GetInfraTopologyCloudElementList({
          landingZoneId,
          productEnclave,
        });
        this.props.getInfraTopologyCategoryWiseViewData({
          landingZoneId,
          productEnclave,
        });
      }
    }

    if (
      prevProps.infraTopologyCloudElementList.status !==
        this.props.infraTopologyCloudElementList.status &&
      this.props.infraTopologyCloudElementList.status === status.SUCCESS
    ) {
      const { data } = this.props.infraTopologyCloudElementList;
      this.setState(
        {
          cloudElementsData: data,
        },
        () => {
          if (data.length) {
            let previousViewDetails = getSelectedInfraTopologyView();

            this.setCurrentTopologyCategory(
              previousViewDetails?.elementType || data[0].elementType
            );
          } else {
            this.setState({ selectedCategoryCloudElementsData: [] });
          }
        }
      );
    }

    if (
      prevProps.infraTopologyCategoryWiseData.status !==
        this.props.infraTopologyCategoryWiseData.status &&
      this.props.infraTopologyCategoryWiseData.status === status.SUCCESS
    ) {
      let eksMetaData;
      let ecsMetaData;
      const { data } = this.props.infraTopologyCategoryWiseData;
      data.forEach((item) => {
        if (item.elementType === "ECS") {
          const newKey = "noOfEcs";
          const newValue = item.totalRecord;
          const newObject = { [newKey]: newValue, ...item.metadata };
          ecsMetaData = newObject;
        }
        if (item.elementType === "EKS") {
          const newKey = "noOfEks";
          const newValue = item.totalRecord;
          const newObject = { [newKey]: newValue, ...item.metadata };
          eksMetaData = newObject;
        }
      });

      this.setState({
        topologyCategoryWiseData: data,
        ecsMetaData,
        eksMetaData,
        currentActiveTopologyCategory: data.length ? data[0].elementType : "",
      });
    }

    if (
      prevProps.infraTopologyLambdaTable.status !==
        this.props.infraTopologyLambdaTable.status &&
      this.props.infraTopologyLambdaTable.status === status.SUCCESS
    ) {
      const lambdaTableData = [];
      this.props.infraTopologyLambdaTable.data.forEach((item) => {
        if (item.configJson) {
          lambdaTableData.push({
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
            id: item.id,
          });
        }
      });
      this.setState({ lambdaTableData });
    }

    if (
      prevProps.globalServiceData.status !==
        this.props.globalServiceData.status &&
      this.props.globalServiceData.status === status.SUCCESS
    ) {
      const { data } = this.props.globalServiceData;

      if (data?.length) {
        this.setState({
          globalServicesSummaryData: data,
          currentActiveGlobalServiceCategory: data[0].elementType,
        });
      }
    }

    if (
      prevProps.globalServicesCloudElements.status !==
        this.props.globalServicesCloudElements.status &&
      this.props.globalServicesCloudElements.status === status.SUCCESS
    ) {
      let globalServicesCloudElements =
        this.props.globalServicesCloudElements.data;
      let { currentActiveGlobalServiceCategory } = this.state;
      if (globalServicesCloudElements?.length) {
        const lambdaTableData = [];
        const excludeLambdaTableData = [];
        globalServicesCloudElements.forEach((item) => {
          if (
            item.configJson &&
            currentActiveGlobalServiceCategory?.toUpperCase() === "LAMBDA"
          ) {
            lambdaTableData.push({
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
              id: item.id,
            });
          }
          if (
            currentActiveGlobalServiceCategory &&
            currentActiveGlobalServiceCategory?.toUpperCase() !== "LAMBDA"
          ) {
            excludeLambdaTableData.push(item);
          }
        });
        this.setState({ lambdaTableData, excludeLambdaTableData });
      }
    }
  };

  setCurrentTopologyCategory = (category) => {
    let {
      cloudElementsData,
      currentActiveNodeId: productEnclave,
      selectedCategoryCloudElementsData,
    } = this.state;
    const { landingZoneId: landingZone } = this.getUrlDetails();

    selectedCategoryCloudElementsData = [];

    if (category?.toUpperCase() === "LAMBDA") {
      this.props.getInfraTopologyLambdaTableData({
        elementType: category,
        landingZone,
        productEnclave,
      });
    } else {
      cloudElementsData.forEach((item) => {
        if (item.elementType === category) {
          selectedCategoryCloudElementsData.push(item);
        }
      });
    }

    this.setState({
      selectedCategoryCloudElementsData,
      currentActiveTopologyCategory: category,
      currentActiveGlobalServiceCategory: "",
      excludeLambdaTableData: [],
    });
  };

  setCurrentGlobalDataCategory = (category) => {
    this.setState({
      currentActiveGlobalServiceCategory: category,
      currentActiveTopologyCategory: "",
    });
    this.props.getGlobalServiceCloudElements({ elementType: category });
  };

  toggleMenu = (index, anchorEl) => {
    let { showMenu } = this.state;
    showMenu = showMenu === null ? index : null;
    this.setState({ showMenu, anchorEl });
  };

  /** Render the BreadCrumbs of Topologyview. */
  renderBreadCrumbs() {
    let { breadcrumbs } = this.state;

    return breadcrumbs.map((item, index) => {
      return (
        <Fragment key={v4()}>
          <li
            className={`${index === breadcrumbs.length - 1 ? "active" : ""}`}
            key={v4()}
          >
            <p>{item?.name?.toUpperCase()}</p>
          </li>
          {index !== breadcrumbs.length - 1 ? (
            <li key={v4()}>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
          ) : (
            <></>
          )}
        </Fragment>
      );
    });
  }

  handleTierTabToggle = (activeTierTab) => {
    this.setState({ activeTierTab });
  };

  setCurrentActiveNode = (node, nodeLevelData, nodeID) => {
    const { breadcrumbs } = this.state;
    let dupIndex = null;
    breadcrumbs.forEach((item, index) => {
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

  renderDropDownData = () => {
    return [
      "Add New datasource",
      "Add Compliance",
      "Associate to OU",
      "Add New VPC",
      "Add New Product",
    ].map((data, index) => {
      return (
        <MenuItem key={index}>
          {" "}
          <i className="fa-solid fa-circle-dot"></i>
          {data}
        </MenuItem>
      );
    });
  };

  /** Render Table for 3 Tier Tab */
  render3TierTableData() {
    let {
      data: { productEnclaveList },
      showMenu,
    } = this.state;
    const { cloudName } = this.getUrlDetails();

    const tableBodyJSX = [];
    productEnclaveList?.forEach((vpc, index) => {
      tableBodyJSX.push(
        <TableRow >
          <TableCell align="center" className="vpcid">
            <HtmlTooltip className="table-tooltip" title={vpc.instanceId}>
              <span>{vpc.instanceId}</span>
            </HtmlTooltip>
          </TableCell>
          <TableCell align="center">{vpc.threeTier.productCount}</TableCell>
          <TableCell align="center">{vpc.threeTier.webCount}</TableCell>
          <TableCell align="center">{vpc.threeTier.appCount}</TableCell>
          <TableCell align="center">{vpc.threeTier.dataCount}</TableCell>
          <TableCell align="center">{vpc.threeTier.auxiliaryCount}</TableCell>
          <TableCell align="center">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => this.toggleMenu(index,e.currentTarget)}
              className="list-icon"
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              className="common-list-menu"
              id={`basic-menu-${index}`}
              anchorEl={this.state.anchorEl}
              open={showMenu === index}
              onClose={() => this.toggleMenu(null,null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {this.renderDropDownData()}
            </Menu>

            
          </TableCell>
        </TableRow>
      );
    });
    const TableJSX = [
      <Box className="discovered-table" style={{ height: "425px" }}>
        <TableContainer className="table">
          <Table className="discovered-table-inner">
            <TableHead className="active">
              <TableRow>
                <TableCell>
                  <Box className="environment-image">
                    <img
                      src={LOGOS[cloudName] ? LOGOS[cloudName] : ""}
                      alt={cloudName}
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
    let {
      data: { productEnclaveList },
      showMenu,
    } = this.state;
    const { cloudName } = this.getUrlDetails();
    const tableBodyJSX = [];
    productEnclaveList?.forEach((vpc, index) => {
      tableBodyJSX.push(
        <TableRow key={v4()}>
          <TableCell align="center" className="vpcid">
            {" "}
            <HtmlTooltip className="table-tooltip" title={vpc.instanceId}>
              <span>{vpc.instanceId}</span>
            </HtmlTooltip>
          </TableCell>
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

            {showMenu === index && (
              <>
                <Box
                  className="open-create-menu-close"
                  onClick={() => this.toggleMenu(index)}
                  key={v4()}
                ></Box>
                <Box className="menu-list" key={v4()}>
                  <List>
                    <ListItem>
                      <span>Add New datasource</span>
                    </ListItem>
                    <ListItem>
                      <span>Add Compliance</span>
                    </ListItem>
                    <ListItem>
                      <span>Associate to OU</span>
                    </ListItem>
                    <ListItem>
                      <span>Add New VPC</span>
                    </ListItem>
                    <ListItem>
                      <span>Add New Product</span>
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
      <Box className="discovered-table" style={{ height: "425px" }} key={v4()}>
        <TableContainer className="table">
          <Table className="discovered-table-inner">
            <TableHead className="active">
              <TableRow>
                <TableCell>
                  <Box className="environment-image">
                    <img
                      src={LOGOS[cloudName] ? LOGOS[cloudName] : ""}
                      alt={cloudName}
                    />
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
    let { infraTopologyCategoryWiseData } = this.props;
    if (!infraTopologyCategoryWiseData.data?.length) {
      return (
        <Box
          className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20"
          key={v4()}
        >
          <h4>
            {" "}
            {infraTopologyCategoryWiseData.status === status.FAILURE
              ? API_ERROR_MESSAGE
              : NO_DATA_FOUND}{" "}
          </h4>
        </Box>
      );
    }
    return (
      <CloudManagedDetails
        setCurrentTopologyCategory={this.setCurrentTopologyCategory}
      />
    );
  };

  getUrlDetails = () => {
    const queryPrm = new URLSearchParams(document.location.search);
    const landingZone = queryPrm.get("landingZone");
    const cloudName = queryPrm.get("cloudName")?.toUpperCase();
    const landingZoneId = queryPrm.get("landingZoneId");
    return { cloudName, landingZone, landingZoneId };
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
      cloudElementsData,
      currentActiveGlobalServiceCategory,
      globalServicesSummaryData,
      lambdaTableData,
      excludeLambdaTableData,
    } = this.state;
    const {
      envDataByLandingZone,
      departments,
      infraTopologyCloudElementList,
      infraTopologyLambdaTable,
      globalServicesCloudElements,
    } = this.props;

    const dataObjLength = data && Object.keys(data).length;
    const currentActiveNodeNotNull =
      !currentActiveNode && currentActiveNode !== "Global Services";

    const soa3TierBtnCondition = dataObjLength && currentActiveNodeNotNull;

    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-body">
          {[envDataByLandingZone.status, departments.status].includes(
            status.IN_PROGRESS
          ) ? (
            <Loader className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20" />
          ) : (
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                // rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={5}>
                  <Box className="services-panel">
                    <Box className="services-panel-title bottom-border">
                      <Box className="name">Infra Topology View</Box>
                      {/* <Box className="back-btn">
                        <i className="fa-solid fa-arrow-left"></i>
                      </Box> */}
                    </Box>
                    <Box className="services-panel-body">
                      {dataObjLength ? (
                        <TopologyView
                          data={data}
                          parentCssClass="infra-toplogy-view"
                          setCurrentActiveNode={this.setCurrentActiveNode}
                        />
                      ) : (
                        <Box className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20">
                          <h4>
                            {envDataByLandingZone.status === status.FAILURE
                              ? API_ERROR_MESSAGE
                              : NO_DATA_FOUND}{" "}
                          </h4>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  {!currentActiveNode ? (
                    <Box className="tier-buttons">
                      <Button
                        variant={
                          activeTierTab === PRODUCT_CATEGORY_ENUM.THREE_TIER
                            ? "contained"
                            : "outlined"
                        }
                        className={
                          activeTierTab === PRODUCT_CATEGORY_ENUM.THREE_TIER
                            ? "primary-btn min-width"
                            : "primary-outline-btn min-width"
                        }
                        onClick={() =>
                          this.handleTierTabToggle(
                            PRODUCT_CATEGORY_ENUM.THREE_TIER
                          )
                        }
                      >
                        3 Tier
                      </Button>
                      <Button
                        variant={
                          activeTierTab === PRODUCT_CATEGORY_ENUM.SOA
                            ? "contained"
                            : "outlined"
                        }
                        className={
                          activeTierTab === PRODUCT_CATEGORY_ENUM.SOA
                            ? "primary-btn min-width"
                            : "primary-outline-btn min-width"
                        }
                        onClick={() =>
                          this.handleTierTabToggle(PRODUCT_CATEGORY_ENUM.SOA)
                        }
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
                              this.setCurrentTopologyCategory(
                                e.target.checked
                                  ? "EKS"
                                  : infraTopologyCloudElementList.data[0]
                                      ?.elementType
                              );
                            }}
                            checked={isClusterShow}
                          />
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {soa3TierBtnCondition ? (
                    activeTierTab === PRODUCT_CATEGORY_ENUM.THREE_TIER ? (
                      this.render3TierTableData()
                    ) : activeTierTab === PRODUCT_CATEGORY_ENUM.SOA ? (
                      this.renderSoaTableData()
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                  <Box className="fliter-tabs global-service-penal">
                    {isClusterShow ? (
                      <ClusterDetails
                        eksData={eksMetaData || {}}
                        ecsData={ecsMetaData || {}}
                        setCategory={this.setCurrentTopologyCategory}
                      />
                    ) : (
                      <></>
                    )}
                    {currentActiveNode &&
                    currentActiveNode !== "Global Services" &&
                    !isClusterShow ? (
                      <>
                        {infraTopologyCloudElementList.status ===
                        status.IN_PROGRESS ? (
                          <Loader className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20" />
                        ) : (
                          this.renderCloudManagedDetails(cloudElementsData)
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {currentActiveNode === "Global Services" &&
                    globalServicesSummaryData.length ? (
                      <GlobalServicesSummaryTable
                        data={globalServicesSummaryData}
                        setCurrentGlobalDataCategory={
                          this.setCurrentGlobalDataCategory
                        }
                      />
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        {currentActiveTopologyCategory === "LAMBDA" ? (
          <>
            {[
              infraTopologyLambdaTable.status,
              infraTopologyCloudElementList.status,
            ].includes(status.IN_PROGRESS) ? (
              <Loader className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20" />
            ) : (
              <LambdaTable tableData={lambdaTableData} title={"LAMBDA"} />
            )}
          </>
        ) : infraTopologyCloudElementList.status === status.IN_PROGRESS ? (
          <Loader className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20" />
        ) : currentActiveNode && currentActiveNode !== "Global Services" ? (
          <AssociateApp data={selectedCategoryCloudElementsData} />
        ) : (
          <></>
        )}
        {currentActiveGlobalServiceCategory &&
        currentActiveNode &&
        currentActiveNode === "Global Services" ? (
          globalServicesCloudElements.status === status.IN_PROGRESS ? (
            <Loader className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20" />
          ) : currentActiveGlobalServiceCategory?.toUpperCase() === "LAMBDA" ? (
            <LambdaTable
              tableData={lambdaTableData}
              title={currentActiveGlobalServiceCategory}
            />
          ) : (
            <ExcludeLambdaTableOfGlobalService
              tableData={excludeLambdaTableData}
              title={currentActiveGlobalServiceCategory}
            />
          )
        ) : (
          <></>
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
    globalServiceData,
    globalServicesCloudElements,
  } = state.environmentData;
  return {
    envDataByLandingZone,
    departments,
    infraTopologyCloudElementList,
    infraTopologyCategoryWiseData,
    infraTopologyLambdaTable,
    globalServiceData,
    globalServicesCloudElements,
  };
}

const mapDispatchToProps = {
  getEnvironmentDataByLandingZone,
  GetInfraTopologyCloudElementList,
  getInfraTopologyCategoryWiseViewData,
  getInfraTopologyDbCategories,
  getInfraTopologyLambdaTableData,
  getGlobalServiceCategoryWiseSummary,
  getGlobalServiceCloudElements,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveredAssets);

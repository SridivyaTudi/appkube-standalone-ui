import React, { Component } from "react";
import VpcServicesIcon from "assets/img/assetmanager/vpc-services-icon.png";
import ClusterIcon from "assets/img/assetmanager/cluster-icon.png";
import CommonFilterViewSearch from "../CommonFilterViewSearch";
import GlobalSerivces from "./GlobalServices";
import GatewayDetails from "./GatewayDetails";
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
} from "@mui/material";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import TopologyView from "./Components/TopologyView";
import VpcDetails from "./VpcDetails";
import ClusterDetails from "./ClusterDetails";
import { v4 } from "uuid";
import { LOGOS } from "CommonData";
const TABLE_LEVEL_1 = {
  APP: "App",
  DATA: "Data",
};

const TOPOLOGY_VIEW_TYPE = {
  VPC: "vpc",
  CLUSTER: "cluster",
  GLOBAL_SERVICE: "globalService",
};

class DiscoveredAssets extends Component {
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      display_detail: true,
      cloudAssets: [],
      breadcrumbs: {
        cloudName: cloudName?.toUpperCase(),
        selectedLevel1: "",
        selectedLevel2: "",
        breadcrumbId: v4(),
      },
      searchString: "",
      accountId: queryPrm.get("landingZone"),
      dataOfTableLevel1: [],
      dataOfLevel1: {},
      currentActiveNodeLabel: "",
      currentVPC: {},
      showMenu: null,
      cloudName,
    };
  }

  componentDidMount = () => {
    let { productEnclaveList, globalServiceList } =
      this.getEnvironmentDataByLandingZone();
    if (productEnclaveList?.length || globalServiceList?.length) {
      this.prepareDataTableLevel1(productEnclaveList);
      this.prepareDataTopologyViewComponent(
        productEnclaveList,
        globalServiceList
      );
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.envDataByLandingZone.status !==
        this.props.envDataByLandingZone.status &&
      this.props.envDataByLandingZone.status === status.SUCCESS
    ) {
      let { productEnclaveList, globalServiceList } =
        this.getEnvironmentDataByLandingZone();
      if (productEnclaveList) {
        this.prepareDataTableLevel1(productEnclaveList);
        this.prepareDataTopologyViewComponent(
          productEnclaveList,
          globalServiceList
        );
      }
    }
  };

  showHideDetail = () => {
    const { display_detail } = this.state;
    this.setState({
      display_detail: !display_detail,
    });
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
    let breadCrumbsData = Object.keys(breadcrumbs);
    return breadCrumbsData.map((breadCrumb, index) => {
      if (breadcrumbs[breadCrumb] && breadCrumb !== "breadcrumbId") {
        return (
          <>
            {index > 0 ? (
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
              key={v4()}
            >
              <a>
                {index == 1
                  ? breadcrumbs[breadCrumb]?.toUpperCase()
                  : index == 2
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

  /** Render table level-1 data . */
  renderTableLevel1Data() {
    let { dataOfTableLevel1 } = this.state;
    return dataOfTableLevel1.map((vpc, index) => {
      return (
        <TableRow key={v4()}>
          <TableCell align="center">{vpc.name}</TableCell>
          <TableCell align="center">{vpc.product_count}</TableCell>
          <TableCell align="center">{vpc.app_count}</TableCell>
          <TableCell align="center">{vpc.data_count}</TableCell>
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
                    <ListItem className="active">
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
  }

  /** Render the table level-1 html. */
  renderTableLevel1Html() {
    let { dataOfTableLevel1, cloudName } = this.state;
    if (!dataOfTableLevel1.length) return null;
    const cloudLogo = LOGOS[cloudName.toUpperCase()];
    return (
      <Box
        className="environment-table-section discovered-table"
        style={{ height: "465px" }}
      >
        <Box className="table discovered-assets-table">
          <TableContainer>
            <Table className="overview">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box className="environment-image">
                      <img src={cloudLogo} alt={cloudName} />
                    </Box>
                  </TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>App Services</TableCell>
                  <TableCell>Data Services</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <tbody>{this.renderTableLevel1Data()}</tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }

  /** Search vpcs data. */
  filterVpcsData(searchString) {
    let { productEnclaveList, globalServiceList } =
      this.getEnvironmentDataByLandingZone();

    if (productEnclaveList) {
      this.prepareDataTableLevel1(productEnclaveList, searchString);
    }
    this.setState({ searchString });
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

  /** Prepare specific format table level1 data. */
  prepareDataTableLevel1 = (envData, searchStr = "") => {
    let vpcs = [];
    for (let envIndex = 0; envIndex < envData.length; envIndex++) {
      let details = {
        name: "",
        product_count: 0,
        app_count: 0,
        data_count: 0,
      };
      details.name = envData[envIndex].name;
      const hostingTypeList = envData[envIndex].hostingTypeList;
      hostingTypeList.forEach((hostingType) => {
        const categories = hostingType.category;
        categories.forEach((category) => {
          if (category.category === TABLE_LEVEL_1.APP) {
            details.app_count += category.elementList.length;
          } else if (category.category === TABLE_LEVEL_1.DATA) {
            details.data_count += category.elementList.length;
          }
        });
      });
      vpcs.push(details);
    }
    if (searchStr) {
      vpcs = vpcs.filter((vpc) =>
        vpc.name.toLowerCase().includes(searchStr.toLowerCase())
      );
    }
    this.setState({
      dataOfTableLevel1: vpcs,
    });
  };

  /** Prepare specific format data of topology view data. */
  prepareDataTopologyViewComponent = (envData) => {
    const { cloudName, accountId } = this.state;
    let formatData = {
      label: "Account ID",
      subLabel: accountId,
      image: LOGOS[cloudName.toUpperCase()],
      children: [[], []],
    };
    let prepareData = [];

    for (let envIndex = 0; envIndex < envData.length; envIndex++) {
      let obj = {
        label: envData[envIndex].name,
        id: envData[envIndex].id,
        type: TOPOLOGY_VIEW_TYPE.VPC,
        image: VpcServicesIcon,
        children: [],
      };
      const hostingTypeList = envData[envIndex].hostingTypeList;
      hostingTypeList.forEach((hostingType) => {
        obj.children.push({
          label: hostingType.hostingType,
          id: "",
          image: ClusterIcon,
          type: TOPOLOGY_VIEW_TYPE.CLUSTER,
          children: [],
        });
      });
      prepareData.push(obj);
    }
    formatData.children = [prepareData, []];
    this.setState({ dataOfLevel1: formatData });
  };

  /** Get landingZone from url. */
  getLandingZone = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const landingZone = urlParams.get("landingZone");
    return landingZone;
  };

  getCurrentActiveTreeLevel = (label, isLevel2Data = 0) => {
    this.setState({ currentActiveNodeLabel: label });
    const currentVPC =
      this.props.envDataByLandingZone.data.productEnclaveList.filter(
        (item) => item.name === label
      );
    if (currentVPC.length) {
      this.setState({ currentVPC: currentVPC[0] });
    }
    this.prepareBreadCrumbs(label, isLevel2Data);
  };

  /**
   * Prepare bread crumbs of Topology
   * @param {string} label - The label of the level-1 or level-2.
   * @param {boolean} isLevel2Data - It is checked level-2 data.
   */
  prepareBreadCrumbs(label, isLevel2Data) {
    let { breadcrumbs, currentVPC } = this.state;
    let { selectedLevel1, selectedLevel2, cloudName } = breadcrumbs;

    if (isLevel2Data) {
      selectedLevel2 = label;
    } else {
      selectedLevel1 = label;
      selectedLevel2 = "";
    }

    this.setState({
      breadcrumbs: { cloudName, selectedLevel1, selectedLevel2 },
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
      breadcrumbs: { cloudName, selectedLevel1, selectedLevel2, breadcrumbId },
    });
  }

  render() {
    const {
      dataOfTableLevel1,
      dataOfLevel1,
      currentActiveNodeLabel,
      currentVPC,
      cloudName,
      breadcrumbs,
    } = this.state;
    const { envDataByLandingZone, departments } = this.props;
    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-head">
          <CommonFilterViewSearch
            data={{ vpcsDetails: dataOfTableLevel1 }}
            handleSearch={(string) => {
              this.filterVpcsData(string);
            }}
            updateAccountId={(accountId) => {
              this.props.updateCloudNameAndLandingZone(cloudName, accountId);
            }}
            accountList={this.props.accountList}
            updateCurrentAccountId={this.props.updateCurrentAccountId}
          />
        </Box>
        <Box className="discovered-assets-body">
          {envDataByLandingZone.status === status.IN_PROGRESS ||
          departments.status === status.IN_PROGRESS ? (
            <Box className="chart-spinner discovered-loading  text-center width-100 p-t-20 p-b-20">
              <i className="fa-solid fa-spinner fa-spin" /> Loading...
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <TopologyView
                  data={dataOfLevel1}
                  setLevel={this.getCurrentActiveTreeLevel}
                  selectedBreadCrumbs={breadcrumbs}
                />
                <Grid item xs={5}>
                  <Box className="global-services-fliter">
                    <Box className="heading">
                      <Box className="breadcrumbs">
                        <ul>{this.renderBreadCrumbs()}</ul>
                      </Box>
                    </Box>
                  </Box>
                  {!currentActiveNodeLabel ? (
                    this.renderTableLevel1Html()
                  ) : (
                    <></>
                  )}
                  <Box className="fliter-tabs global-service-penal">
                    {currentActiveNodeLabel.includes("cluster") ? (
                      <ClusterDetails />
                    ) : currentActiveNodeLabel.includes("vpc") ? (
                      <VpcDetails vpc={currentVPC} />
                    ) : currentActiveNodeLabel.includes("gateway") ? (
                      <GatewayDetails vpc={currentVPC} />
                    ) : currentActiveNodeLabel.includes("cloudManaged") ? (
                      <CloudManagedDetails />
                    ) : currentActiveNodeLabel.includes("globalServices") ? (
                      <GlobalSerivces />
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { envDataByLandingZone, departments } = state.environmentData;
  return { envDataByLandingZone, departments };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(DiscoveredAssets);

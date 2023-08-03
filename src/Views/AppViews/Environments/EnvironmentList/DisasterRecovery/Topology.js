import React, { Component } from "react";
import VpcServicesIcon from "assets/img/assetmanager/vpc-services-icon.png";
import Hrms from "assets/img/assetmanager/hrms.png";
import chartWebLayerIcon from "assets/img/assetmanager/chart-web-layer-icon.png";
import chartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import dataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import chartAuxiliaryLayerIcon from "assets/img/assetmanager/chart-auxiliary-layer-icon.png";
import balancingIcon from "assets/img/assetmanager/balancing-icon.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import amazonEc2 from "assets/img/assetmanager/amazon-ec2.png";

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
  TableBody,
  Button,
} from "@mui/material";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import TopologyView from "./TopologyView";
// import VpcDetails from "./VpcDetails";
// import ClusterDetails from "./ClusterDetails";
// import AssociateApp from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/AssociateApp";
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

let topologyData = {
  label: "HRMS",
  image: Hrms,
  children: [
    [
      {
        label: "Web Layer",
        id: null,
        type: "WebLayer",
        image: chartWebLayerIcon,
        children: [],
      },
      {
        label: "App Layer",
        id: null,
        type: "AppLayer",
        image: chartAppLayerIcon,
        children: [],
      },
      {
        label: "Data Layer",
        id: null,
        type: "DataLayer",
        image: dataServiceSvgrepo,
        children: [],
      },
      {
        label: "Auxiliary Layer",
        id: null,
        type: "AuxiliaryLayer",
        image: chartAuxiliaryLayerIcon,
        children: [],
      },
    ],
    [],
  ],
};
let resourceData = {
  web_layer: [
    {
      name: "CPU Utilization",
      number: "44%",
    },
    {
      name: "Network In",
      number: "1000 MB",
    },
    {
      name: "Network Out",
      number: "1000 MB",
    },
    {
      name: "Disk Read Bytes",
      number: "500 MB",
    },
    {
      name: "Disk Write Bytes",
      number: "100 MB",
    },
    {
      name: "Status Check Failed",
      number: "142",
    },
    {
      name: "Status Check Failed Instance",
      number: "142",
    },
    {
      name: "Status Check Failed System",
      number: "142",
    },
    {
      name: "CPU Credit Balance",
      number: "100",
    },
    {
      name: "CPU Credit Usage",
      number: "10",
    },
  ],
  data_layer: [
    {
      name: "CPU Utilization",
      number: "50%",
    },
    {
      name: "Data Connections",
      number: "100",
    },
    {
      name: "Free Storage Space",
      number: "50 GB",
    },
    {
      name: "ReadOPS",
      number: "500 IOPS",
    },
    {
      name: "Write OPS",
      number: "300 OPS",
    },
    {
      name: "Read latency",
      number: "5 ms",
    },
    {
      name: "Write latency",
      number: "3 MS",
    },
    {
      name: "NR Throughput",
      number: "10 MB/s",
    },
    {
      name: "NT Throughput",
      number: "5 MB/s",
    },
    {
      name: "Replica lag",
      number: "0 sec",
    },
  ],
  auxiliary_layer: [
    {
      name: "No. Of Messages Published",
      number: "1000",
    },
    {
      name: "No. Of Notification Delivered",
      number: "900",
    },
    {
      name: "No. Of Notification Failed",
      number: "20",
    },
    {
      name: "No. Of Notification Filtered",
      number: "50",
    },
    {
      name: "Public Size",
      number: "1 KB",
    },
    {
      name: "Publish Throughput",
      number: "10 M/s",
    },
    {
      name: "No Of  Subs Confirmed",
      number: "50",
    },
    {
      name: "No Of  Subs Pending",
      number: "5",
    },
    {
      name: "No Of  Subs Deleted",
      number: "10",
    },
    {
      name: "Sms month to date spent USD",
      number: "$5.00",
    },
  ],
};
class Topology extends Component {
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      display_detail: true,
      cloudAssets: [],
      breadcrumbs: {
        breadcrumbId: v4(),
        cloudName: cloudName?.toUpperCase(),
        selectedLevel1: "",
        selectedLevel2: "",
      },
      searchString: "",
      accountId: queryPrm.get("landingZone"),
      dataOfTableLevel1: [],
      dataOfLevel1: topologyData,
      currentActiveNodeLabel: "",
      currentVPC: {},
      showMenu: null,
      cloudName,
      activeTierTab: "3Tier",
      isClusterShow: false,
      resources: resourceData,
      selectedResource: "",
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
    this.setState({ dataOfLevel1: topologyData, resources: resourceData });
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

  /** Render table level-1 data . */
  renderTableLevel1Data() {
    let { dataOfTableLevel1 } = this.state;
    return dataOfTableLevel1.map((vpc, index) => {
      return (
        <TableRow key={v4()}>
          <TableCell align="center">{vpc.name}</TableCell>
          <TableCell align="center">{vpc.product_count}</TableCell>
          <TableCell align="center">{vpc.app_count}</TableCell>
          <TableCell align="center">{vpc.app_count}</TableCell>
          <TableCell align="center">{vpc.data_count}</TableCell>
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
  }

  /** Render table level-2 data . */
  renderTableLevel2Data() {
    let { dataOfTableLevel1 } = this.state;
    return dataOfTableLevel1.map((vpc, index) => {
      return (
        <TableRow key={v4()}>
          <TableCell align="center">{vpc.name}</TableCell>
          <TableCell align="center">{vpc.product_count}</TableCell>
          <TableCell align="center">{vpc.app_count}</TableCell>
          <TableCell align="center">{vpc.data_count}</TableCell>
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
  }

  /** Render the table level-1 html. */
  renderTableLevel1Html() {
    let { dataOfTableLevel1, cloudName } = this.state;
    if (!dataOfTableLevel1.length) return null;
    const cloudLogo = LOGOS[cloudName?.toUpperCase()];
    return (
      <Box
        className="environment-table-section discovered-table"
        style={{ height: "415px" }}
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
                  <TableCell>Web Layer</TableCell>
                  <TableCell>App Layer</TableCell>
                  <TableCell>Data Layer</TableCell>
                  <TableCell>Auxiliary</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.renderTableLevel1Data()}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }

  /** Render the table level-2 html. */
  renderTableLevel2Html() {
    let { dataOfTableLevel1, cloudName } = this.state;
    if (!dataOfTableLevel1.length) return null;
    const cloudLogo = LOGOS[cloudName.toUpperCase()];
    return (
      <Box
        className="environment-table-section discovered-table"
        style={{ height: "415px" }}
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
                  <TableCell>Other Services</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.renderTableLevel2Data()}</TableBody>
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
      image: LOGOS?.[cloudName?.toUpperCase()],
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
    this.setState({
      selectedResource: label?.toLowerCase().replace(" layer", ""),
    });
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

  renderResources = () => {
    let { resources, selectedResource } = this.state;
    selectedResource = selectedResource === "app" ? "web" : selectedResource;
    return (
      resources[`${selectedResource}_layer`]?.length &&
      resources[`${selectedResource}_layer`].map((resource) => {
        return (
          <Box className="card-box">
            <Box className="d-block text-center width-100">
              <strong>{resource.number}</strong>
              <span>{resource.name}</span>
            </Box>
          </Box>
        );
      })
    );
  };

  renderResourcesContainer = () => {
    let { selectedResource } = this.state;
    let resourceName = selectedResource === 'data' ? 'RDS' : selectedResource === 'auxiliary' ? 'SNS' : 'EC2'
    return (
      selectedResource && (
        <Box className="resources-cards">
          <div className="heading">Selected {resourceName} Resources</div>
          <Box className="resources">
            <Box className="resources-inner">{this.renderResources()}</Box>
          </Box>
        </Box>
      )
    );
  };
  render() {
    const { dataOfLevel1, breadcrumbs, selectedResource } = this.state;

    return (
      <>
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
            <Grid item xs={7}>
              <Box className="cloud-managed-cards">
                {!selectedResource ? (
                  <Box className="cloud-managed-cards-scroll">
                    <Box className="service-card active">
                      <Box className="service-icon">
                        <img src={chartWebLayerIcon} alt="serviceicon" />
                      </Box>
                      <Box className="service-contant">
                        <label>Web layer</label>
                        <strong>01</strong>
                      </Box>
                    </Box>
                    <Box className="service-card active">
                      <Box className="service-icon">
                        <img src={chartWebLayerIcon} alt="serviceicon" />
                      </Box>
                      <Box className="service-contant">
                        <label>App layer</label>
                        <strong>05</strong>
                      </Box>
                    </Box>
                    <Box className="service-card active">
                      <Box className="service-icon">
                        <img src={chartWebLayerIcon} alt="serviceicon" />
                      </Box>
                      <Box className="service-contant">
                        <label>Data layer</label>
                        <strong>02</strong>
                      </Box>
                    </Box>
                    <Box className="service-card active">
                      <Box className="service-icon">
                        <img src={chartWebLayerIcon} alt="serviceicon" />
                      </Box>
                      <Box className="service-contant">
                        <label>Auxiliary layer</label>
                        <strong>03</strong>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box className="application-balancer">
                    <Button
                      className="primary-btn min-width"
                      variant="contained"
                    >
                      <p>
                        <img src={balancingIcon} alt="" />{" "}
                      </p>{" "}
                      Application Load Balancer
                    </Button>
                    <Box className="balancer-boxs">
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {this.renderResourcesContainer()}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { envDataByLandingZone, departments } = state.environmentData;
  return { envDataByLandingZone, departments };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Topology);

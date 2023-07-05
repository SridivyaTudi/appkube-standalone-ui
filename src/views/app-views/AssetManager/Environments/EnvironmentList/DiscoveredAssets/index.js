import React, { Component } from "react";
// import { images } from "../../../../../img";
import Aws from "assets/img/aws.png";
import VpcServicesIcon from "assets/img/assetmanager/vpc-services-icon.png";
import ClusterIcon from "assets/img/assetmanager/cluster-icon.png";
import GlobalIcon4 from "assets/img/assetmanager/global-icon4.png";
import GlobalIcon5 from "assets/img/assetmanager/global-icon5.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CommonFilterViewSearch from "views/app-views/AssetManager/Environments/EnvironmentList/CommonFilterViewSearch";
import ServicesNameLogo from "views/app-views/AssetManager/Environments/EnvironmentList/ServicesNameLogo";
import DataLakeTable from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/DataLakeTable";
import ServiceMeshTable from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/ServiceMeshTable";
import AllTable from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/AllTable";
import AppTable from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/AppTable";
import DataTable from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/DataTable";
import dummyData from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/dummy.json";

import EksCluster from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/EksCluster";
import EcsCluster from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/EcsCluster";
import WafResources from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/WafResources";
import GlobalSerivces from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/GlobalServices";
import EKS from "assets/img/assetmanager/global-icon4.png";
import ECS from "assets/img/assetmanager/global-icon5.png";
import Glue from "assets/img/assetmanager/cloud-managed-icon8.png";
import Athena from "assets/img/assetmanager/cloud-managed-icon10.png";
import Kinesys from "assets/img/assetmanager/cloud-managed-icon11.png";
import Redshift from "assets/img/assetmanager/cloud-managed-icon12.png";
import IAM from "assets/img/assetmanager/cloud-managed-icon13.png";
import S3 from "assets/img/assetmanager/cloud-managed-icon2.png";
import LakeFormation from "assets/img/assetmanager/cloud-managed-icon14.png";
import Sagemaker from "assets/img/assetmanager/cloud-managed-icon15.png";
import Quicksight from "assets/img/assetmanager/cloud-managed-icon16.png";
import EMRStudio from "assets/img/assetmanager/cloud-managed-icon17.png";
import Waf from "assets/img/assetmanager/global-icon6.png";
import API from "assets/img/assetmanager/global-icon7.png";
import LB from "assets/img/assetmanager/global-icon3.png";
import {
  Button,
  IconButton,
  Box,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
} from "@mui/material";
import status from "redux/constants/commonDS";
import { connect } from "react-redux";
import { getUUID } from "utils";
import TopologyView from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/Components/TopologyView";
import { ArcherContainer, ArcherElement } from "react-archer";

const servicesTreeCondition = {
  service: ["cluster", "product", "vpc", "clusterId", "vpcId", "productId"],
  vpc: ["vpcId", "cluster", "product", "clusterId", "productId"],
  cluster: ["vpcId", "product", "clusterId", "productId"],
  product: ["productId", "product"],
};
const breadcrumbResetCondition = {
  service: ["vpc", "cluster", "product"],
  vpc: ["cluster", "product"],
  cluster: ["product"],
  product: [],
};
const nextTypes = {
  service: "vpc",
  vpc: "cluster",
  cluster: "product",
  product: "",
};
let transformScale = 0;
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
  tableMapping = [
    {
      name: "All",
      dataKey: "all",
      component: AllTable,
    },
    {
      name: "App",
      dataKey: "app",
      component: AppTable,
    },
    {
      name: "Data",
      dataKey: "data",
      component: DataTable,
    },
    {
      name: "Datalake",
      dataKey: "datalake",
      component: DataLakeTable,
    },
    {
      name: "ServiceMesh",
      dataKey: "servicemesh",
      component: ServiceMeshTable,
    },
  ];
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      display_detail: true,
      displaygetEnvironmentData: null,
      cloudAssets: [],
      toggleNode: {
        vpc: true,
        cluster: false,
        product: false,
        vpcId: null,
        clusterId: null,
        productId: null,
        globalService: false,
      },
      breadcrumbs: [
        {
          id: "service",
          name: cloudName,
          type: "service",
          serviceIndexs: {},
        },
      ],
      showSelectFilter: false,
      showServiceViewFilter: false,
      activeTab: 0,
      searchString: "",
      accountId: queryPrm.get("landingZone"),
      currentActiveCluster: "eksCluster",

      clusterServicesImages: [EKS, ECS],
      managedServicesImages: [
        Glue,
        Athena,
        Kinesys,
        Redshift,
        IAM,
        S3,
        LakeFormation,
        Sagemaker,
        Quicksight,
        EMRStudio,
      ],
      GatewayServicesImages: [Waf, API, LB],
      dataOfTableLevel1: [],
      dataOfLevel1:{}
    };
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.envDataByLandingZone.status !==
        this.props.envDataByLandingZone.status &&
      this.props.envDataByLandingZone.status === status.SUCCESS
    ) {
      let { productEnclaveList, globalServiceList } = this.getEnvironmentDataByLandingZone();
      if (productEnclaveList) {
        this.prepareDataTableLevel1(productEnclaveList);
        this.prepareDataTopologyViewComponent(productEnclaveList, globalServiceList);
      }
     
     
    }
  };

  showHideDetail = () => {
    const { display_detail } = this.state;
    this.setState({
      display_detail: !display_detail,
    });
  };

  displayAwsData() {
    const { displaygetEnvironmentData } = this.state;
    let retData = [];
    let row = displaygetEnvironmentData;
    if (row.cloudType.toLowerCase() === "AWS".toLowerCase()) {
      const { display_detail } = this.state;
      retData.push(
        <Box>
          <Box className="heading">
            <span>
              <img src={"images.awsLogo"} alt="" />
            </span>
            <h2>Amazon Web Services</h2>
            <Box className="icon float-right" onClick={this.showHideDetail}>
              <i
                className={display_detail ? "fa fa-minus" : "fa fa-plus"}
                aria-hidden="true"
              ></i>
            </Box>
          </Box>
          {display_detail && (
            <Box className="service-content">
              <Box className="row">
                <Box className="col-lg-6 col-md-6 col-sm-12">
                  <Box className="row">
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">Account Holder Name</Box>
                    </Box>
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">
                        <span>{row.name}</span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-lg-6 col-md-6 col-sm-12">
                  <Box className="row">
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">Organisation</Box>
                    </Box>
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">
                        <span>
                          {row.organizationName && row.organizationName}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-lg-6 col-md-6 col-sm-12">
                  <Box className="row">
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">Account Number</Box>
                    </Box>
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">
                        <span>{row.accountId}</span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-lg-6 col-md-6 col-sm-12">
                  <Box className="row">
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">Organisation Unit</Box>
                    </Box>
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">
                        <span>
                          {row.organizationalUnit &&
                            row.organizationalUnit.name}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-lg-6 col-md-6 col-sm-12">
                  <Box className="row">
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">
                        Total Online Instances
                      </Box>
                    </Box>
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">0</Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-lg-6 col-md-6 col-sm-12">
                  <Box className="row">
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">
                        Full Protection Security Group
                      </Box>
                    </Box>
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">0</Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-lg-6 col-md-6 col-sm-12">
                  <Box className="row">
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">Cloud Guard ID</Box>
                    </Box>
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">
                        e5b82995-c0fc-729d-a67b-926r81a5963d
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-lg-6 col-md-6 col-sm-12">
                  <Box className="row">
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">
                        Read Only Security Group
                      </Box>
                    </Box>
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">0</Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="col-lg-6 col-md-6 col-sm-12">
                  <Box className="row">
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">Added At</Box>
                    </Box>
                    <Box className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <Box className="services-added">{row.createdOn}</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      );
    }

    return retData;
  }

  prepareBreadCrumbs(data, index, type) {
    let tempBreadData = [];
    let { breadcrumbs } = this.state;
    if (breadcrumbs.filter((breadcrumb) => breadcrumb.type === type).length) {
      if (breadcrumbs.filter((breadcrumb) => breadcrumb.id === index).length) {
        tempBreadData = breadcrumbs;
      } else {
        tempBreadData = breadcrumbs.filter(
          (breadcrumb) => breadcrumb.type !== type
        );
        tempBreadData = [...tempBreadData, data];
      }
    } else {
      tempBreadData = [...breadcrumbs, data];
    }
    breadcrumbResetCondition[type].forEach((keyType) => {
      tempBreadData = tempBreadData.filter(
        (breadcrumb) => breadcrumb.type !== keyType
      );
    });
    return tempBreadData;
  }

  toggleColumnSelect = (drdName) => {
    let current = this.state[drdName];
    this.setState({
      [drdName]: !current,
    });
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  getCloudName() {
    const queryPrm = new URLSearchParams(document.location.search);
    return (
      ServicesNameLogo.ServicesName[queryPrm.get("cloudName").toUpperCase()] ||
      ""
    );
  }

  getBreadCrumbs() {
    return this.state.breadcrumbs.map((data, index) => {
      return (
        <>
          {index > 0 ? (
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
          ) : (
            <></>
          )}
          <li
            onClick={() => {
              if (this.state.breadcrumbs.length > 1) {
                this.handleToggleNode(
                  data.serviceIndexs,
                  data.type === "service" ? "vpc" : "",
                  data.type,
                  data.type === "service" ? false : true,
                  (data.type && nextTypes[data.type]) || ""
                );
              }
            }}
          >
            <a>{data.name}</a>
          </li>
        </>
      );
    });
  }

  renderVpcsDetails() {
    let { dataOfTableLevel1 } = this.state;
    return dataOfTableLevel1.map((vpc, index) => {
      return (
        <TableRow key={index}>
          <TableCell align="center">{vpc.name}</TableCell>
          <TableCell align="center">{vpc.product_count}</TableCell>
          <TableCell align="center">{vpc.app_count}</TableCell>
          <TableCell align="center">{vpc.data_count}</TableCell>
          <TableCell align="center">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={this.toggleMenu}
              className="list-icon"
            >
              <i className="fas fa-ellipsis-v"></i>
            </IconButton>
            <Box className="open-create-menu-close"></Box>
            {this.state.showMenu === true && (
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
            )}
          </TableCell>
        </TableRow>
      );
    });
  }

  renderTableLevel1() {
    let { dataOfTableLevel1 } = this.state;
    if (!dataOfTableLevel1.length) return null;
    return (
      <Box
        className="environment-table-section discovered-table"
        style={{ height: "537px" }}
      >
        <Box className="table discovered-assets-table">
          <TableContainer>
            <Table className="overview">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box className="environment-image">
                      <img src={Aws} />
                    </Box>
                  </TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>App Services</TableCell>
                  <TableCell>Data Services</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <tbody>{this.renderVpcsDetails()}</tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }

  filterVpcsData(searchString) {
    let { allVpcsDetails, vpcsDetails } = this.props;
    vpcsDetails =
      searchString != ""
        ? allVpcsDetails.filter((vpc) =>
            vpc.name.toLowerCase().includes(searchString.toLowerCase())
          )
        : allVpcsDetails;
    this.setState({ searchString });
    this.props.handleSearchVpcs(vpcsDetails);
  }

  changeActiveCluster = (cluster) => {
    this.setState({ currentActiveCluster: cluster });
  };


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
          productEnclaveList: envDataByLandingZone.data.productEnclaveList,
          globalServiceList: envDataByLandingZone.data.globalServiceList,
        }
      : {};
  };

  prepareDataTableLevel1 = (envData) => {
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
    this.setState({
      dataOfTableLevel1: vpcs,
    });
  };

  prepareDataTopologyViewComponent = (envData,globalData = []) => {
    let formatData = {
      label: "Account ID",
      subLabel: this.getLandingZone(),
      image: "",
      children: [[], []],
    };
    let prepareData = [];

    for (let envIndex = 0; envIndex < envData.length; envIndex++) {
      let obj = {
        label: envData[envIndex].name,
        id: envData[envIndex].id,
        type: TOPOLOGY_VIEW_TYPE.VPC,
        image: "",
        children: [],
      };
      const hostingTypeList = envData[envIndex].hostingTypeList;
      hostingTypeList.forEach((hostingType) => {
        obj.children.push({
          label: hostingType.hostingType,
          id: "",
          image: "",
          type: TOPOLOGY_VIEW_TYPE.CLUSTER,
          children: [],
        });
      });
      prepareData.push(obj);
    }
    formatData.children = [prepareData,[]];
    this.setState({ dataOfLevel1:formatData})
  };

  getLandingZone = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const landingZone = urlParams.get("landingZone");
    return landingZone;
  };


  render() {
    const { activeTab, currentActiveCluster, toggleNode, dataOfTableLevel1,dataOfLevel1 } =
      this.state;
    const { envDataByLandingZone, departments } = this.props;
    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-head">
          <CommonFilterViewSearch
            data={{ dataOfTableLevel1 }}
            handleSearch={(string) => {
              // this.filterVpcsData(string);
            }}
            updateAccountId={(accountId) => {
              this.setState({ accountId });
              this.props.updateCloudName(
                new URLSearchParams(document.location.search).get("cloudName"),
                accountId
              );
            }}
            accountList={this.props.accountList}
            updateCurrentAccountId={this.props.updateCurrentAccountId}
          />
        </Box>
        <Box className="discovered-assets-body">
          {envDataByLandingZone.status === status.IN_PROGRESS ||
          departments.status === status.IN_PROGRESS ? (
            <Box className="chart-spinner text-center width-100 p-t-20 p-b-20">
              <i className="fa-solid fa-spinner fa-spin" /> Loading...
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <TopologyView data={dataOfLevel1} />
                <Grid item xs={5}>
                  {this.renderTableLevel1()}
                  <Box
                    className="fliter-tabs"
                    style={{
                      display: `${
                        this.state.breadcrumbs.length === 4 ? "block" : "none"
                      }`,
                    }}
                  >
                    <Box className="global-services-fliter">
                      <Box className="heading">
                        <Box className="breadcrumbs">
                          <ul>{this.getBreadCrumbs()}</ul>
                        </Box>
                        <button type="button" className="btn btn-ellipsis">
                          <i className="fa-solid fa-ellipsis-v"></i>
                        </button>
                      </Box>
                      <Box className="fliter-inputs">
                        <Box className="search-control">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder=""
                          />
                        </Box>
                        <Box className="search-control">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder=""
                          />
                        </Box>
                        <Box className="search-control">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder=""
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      className="environment-table-section"
                      style={{ height: "373px" }}
                    >
                      <Box className="table discovered-assets-table">
                        <TableContainer>
                          <Table className="overview">
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">
                                  Performance
                                </TableCell>
                                <TableCell align="center">
                                  Availability
                                </TableCell>
                                <TableCell align="center">Security</TableCell>
                                <TableCell align="center">
                                  Data Protection
                                </TableCell>
                                <TableCell align="center">User Exp</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <strong>
                                    <a href="#">EMS</a>
                                  </strong>
                                </TableCell>
                                <TableCell align="center">
                                  <Box className="box red">2</Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box className="box orange">3</Box>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <strong>
                                    <a href="#">Supply Chain</a>
                                  </strong>
                                </TableCell>
                                <TableCell align="center">
                                  <Box className="box red">2</Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </Box>
                                </TableCell>
                                <TableCell align="center">
                                  <Box className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </Box>
                                </TableCell>
                                <TableCell align="center"></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <strong>
                                    <a href="#">Procurement</a>
                                  </strong>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box red">2</div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box orange">3</div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    className="fliter-tabs global-service-penal"
                    style={{
                      display: `${
                        this.state.breadcrumbs.length === 3 ? "block" : "none"
                      }`,
                    }}
                  >
                    <Box className="global-services-fliter">
                      <Box className="heading">
                        <Box className="breadcrumbs">
                          <ul>{this.getBreadCrumbs()}</ul>
                        </Box>
                      </Box>
                    </Box>
                    {toggleNode.clusterId === 0 ? (
                      <>
                        <Box className="environment-boxs m-t-4">
                          <Box
                            className="environment-box"
                            onClick={() =>
                              this.changeActiveCluster("eksCluster")
                            }
                            style={{
                              border:
                                currentActiveCluster === "eksCluster"
                                  ? "2px solid #416bff"
                                  : "2px solid #fff",
                            }}
                          >
                            <Box className="environment-title">
                              <Box className="environment-image">
                                <img src={GlobalIcon4} alt="" />
                              </Box>
                              <Box className="title-name">EKS-Cluster</Box>
                            </Box>
                            <Box className="data-contant">
                              <List>
                                {dummyData.eksCluster.map((item) => {
                                  return (
                                    <ListItem>
                                      <Box className="data-text">
                                        <span
                                          style={{
                                            backgroundColor:
                                              item.backgroundColor,
                                          }}
                                        ></span>
                                        <p>{item.name}</p>
                                      </Box>
                                      <label>{item.value}</label>
                                    </ListItem>
                                  );
                                })}
                              </List>
                            </Box>
                          </Box>
                          <Box
                            className="environment-box"
                            onClick={() =>
                              this.changeActiveCluster("ecsCluster")
                            }
                            style={{
                              border:
                                currentActiveCluster === "ecsCluster"
                                  ? "2px solid #416bff"
                                  : "2px solid #fff",
                            }}
                          >
                            <Box className="environment-title">
                              <Box className="environment-image">
                                <img src={GlobalIcon5} alt="" />
                              </Box>
                              <Box className="title-name">ECS-Cluster</Box>
                            </Box>
                            <Box className="data-contant">
                              <List>
                                {dummyData.ecsCluster.map((item) => {
                                  return (
                                    <ListItem>
                                      <Box className="data-text">
                                        <span
                                          style={{
                                            backgroundColor:
                                              item.backgroundColor,
                                          }}
                                        ></span>
                                        <p>{item.name}</p>
                                      </Box>
                                      <label>{item.value}</label>
                                    </ListItem>
                                  );
                                })}
                              </List>
                            </Box>
                          </Box>
                        </Box>
                        {currentActiveCluster === "eksCluster" && (
                          <EksCluster />
                        )}
                        {currentActiveCluster === "ecsCluster" && (
                          <EcsCluster />
                        )}
                      </>
                    ) : toggleNode.clusterId === 1 ? (
                      <Box className="services-panel-tabs">
                        <Box className="tabs-head">
                          <List>
                            {this.tableMapping.map((tabData, index) => {
                              return (
                                <ListItem
                                  key={`ops-tab-${index}`}
                                  className={
                                    index === activeTab ? "active" : ""
                                  }
                                  onClick={() => this.setActiveTab(index)}
                                >
                                  {tabData.name}
                                </ListItem>
                              );
                            })}
                          </List>
                        </Box>
                        <Box className="tabs-content">
                          {activeTab === 0 ? (
                            <AllTable />
                          ) : activeTab === 1 ? (
                            <AppTable />
                          ) : activeTab === 2 ? (
                            <DataTable />
                          ) : activeTab === 3 ? (
                            <DataLakeTable />
                          ) : activeTab === 4 ? (
                            <ServiceMeshTable />
                          ) : (
                            <></>
                          )}
                        </Box>
                      </Box>
                    ) : (
                      <WafResources />
                    )}
                  </Box>

                  <Box
                    className="fliter-tabs global-service-penal"
                    style={{
                      display: `${
                        this.state.breadcrumbs.length === 2 ? "block" : "none"
                      }`,
                    }}
                  >
                    <Box className="cloud-managed-section">
                      <h4>Cluster</h4>
                      <Box className="cloud-managed-cards">
                        <Box className="cloud-managed-cards-scroll">
                          {dummyData.clusterServices.map((item, index) => {
                            return (
                              <Box className="service-card active">
                                <Box className="service-icon">
                                  <img
                                    src={
                                      this.state.clusterServicesImages[index]
                                    }
                                    alt="serviceicon"
                                  />
                                </Box>
                                <Box className="service-contant">
                                  <label>{item.name}</label>
                                  <strong>{item.value}</strong>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                      <h4>Cloud Managed Services</h4>
                      <Box className="cloud-managed-cards">
                        <Box className="cloud-managed-cards-scroll">
                          {dummyData.managedServices.map((item, index) => {
                            return (
                              <Box className="service-card active">
                                <Box className="service-icon">
                                  <img
                                    src={
                                      this.state.managedServicesImages[index]
                                    }
                                    alt="serviceicon"
                                  />
                                </Box>
                                <Box className="service-contant">
                                  <label>{item.name}</label>
                                  <strong>{item.value}</strong>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                      <h4>Gateway Services</h4>
                      <Box className="cloud-managed-cards">
                        <Box className="cloud-managed-cards-scroll">
                          {dummyData.GatewayServices.map((item, index) => {
                            return (
                              <Box className="service-card active">
                                <Box className="service-icon">
                                  <img
                                    src={
                                      this.state.GatewayServicesImages[index]
                                    }
                                    alt="serviceicon"
                                  />
                                </Box>
                                <Box className="service-contant">
                                  <label>{item.name}</label>
                                  <strong>{item.value}</strong>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    </Box>

                    {/* <Box
                      className="global-services-fliter"
                      style={{
                        height: "533px",
                        boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.04)",
                      }}>
                      <Box className="heading">
                        <Box className="breadcrumbs">
                          <ul>{this.getBreadCrumbs()}</ul>
                        </Box>
                      </Box>
                      <Box className="fliter-inputs">
                        <Box className="search-control">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder=""
                          />
                        </Box>
                        <Box className="search-control">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder=""
                          />
                        </Box>
                        <Box className="search-control">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder=""
                          />
                        </Box>
                      </Box>
                    </Box> */}
                  </Box>
                  {toggleNode.globalService && <GlobalSerivces />}
                  <Box className="fliter-tabs" style={{ display: "none" }}>
                    <Box className="global-services-fliter">
                      <Box className="heading">
                        <Box className="breadcrumbs">
                          <List>
                            <ListItem>
                              <a href="#">AWS</a>
                            </ListItem>
                            <ListItem>
                              <i className="fa-solid fa-chevron-right"></i>
                            </ListItem>
                            <ListItem>
                              <a href="#">VPC 1</a>
                            </ListItem>
                            <ListItem>
                              <i className="fa-solid fa-chevron-right"></i>
                            </ListItem>
                            <ListItem>
                              <a href="#">Cluster 1</a>
                            </ListItem>
                            <ListItem>
                              <i className="fa-solid fa-chevron-right"></i>
                            </ListItem>
                            <ListItem>
                              <span>App Services</span>
                            </ListItem>
                          </List>
                        </Box>
                        <button type="button" className="btn btn-ellipsis">
                          <i className="fa-solid fa-ellipsis-v"></i>
                        </button>
                      </Box>
                      <Box className="fliter-inputs">
                        <Box className="search-control">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder=""
                          />
                        </Box>
                        <Box className="search-control">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder=""
                          />
                        </Box>
                        <Box className="search-control">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder=""
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      className="environment-table-section"
                      style={{ height: "373px" }}
                    >
                      <Box className="table discovered-assets-table">
                        <TableContainer>
                          <Table className="overview">
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">
                                  Performance
                                </TableCell>
                                <TableCell align="center">
                                  Availability
                                </TableCell>
                                <TableCell align="center">Security</TableCell>
                                <TableCell align="center">
                                  Data Protection
                                </TableCell>
                                <TableCell align="center">User Exp</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  <strong>
                                    <a href="#">EMS</a>
                                  </strong>
                                  <i className="fa-solid fa-caret-right m-l-1"></i>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box red">2</div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box orange">3</div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <strong>
                                    <a href="#">Supply Chain</a>
                                  </strong>
                                  <i className="fa-solid fa-caret-right m-l-1"></i>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box red">2</div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box orange">3</div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  <strong>
                                    <a href="#">Procurement</a>
                                  </strong>
                                  <i className="fa-solid fa-caret-right m-l-1"></i>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box red">2</div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box green">
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="box orange">3</div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Box>
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

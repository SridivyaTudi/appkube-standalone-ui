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
import { ArcherContainer, ArcherElement } from "react-archer";
import EksCluster from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/EksCluster";
import EcsCluster from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/EcsCluster";
import WafResources from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/WafResources";
import GlobalSerivces from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/GlobalServices";
import EKS from "assets/img/assetmanager/global-icon4.png";
import ECS from "assets/img/assetmanager/global-icon5.png";
import SQS from "assets/img/assetmanager/cloud-managed-icon3.png";
import SNS from "assets/img/assetmanager/cloud-managed-icon4.png";
import Redshift from "assets/img/assetmanager/cloud-managed-icon5.png";
import RDS from "assets/img/assetmanager/cloud-managed-icon6.png";
import AppMesh from "assets/img/assetmanager/cloud-managed-icon7.png";
import Kinesis from "assets/img/assetmanager/cloud-managed-icon8.png";
import TimeSeries from "assets/img/assetmanager/cloud-managed-icon9.png";
import Athena from "assets/img/assetmanager/cloud-managed-icon10.png";
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
      treeDataNew: {},
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
      accountId: queryPrm.get("accountId"),
      currentActiveCluster: "eksCluster",
      serivceImages: [
        EKS,
        ECS,
        SQS,
        SNS,
        Redshift,
        RDS,
        AppMesh,
        Kinesis,
        TimeSeries,
        Athena,
      ],
    };
  }

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

  renderVPCData() {
    if (this.props.treeData && this.props.treeData.length) {
      return this.props.treeData.map((vpc, vpcIndex) => {
        return (
          <ArcherElement
            id={`vpc_${vpcIndex}`}
            relations={[
              {
                targetId:
                  vpcIndex === this.state.toggleNode.vpcId &&
                  this.state.toggleNode.clusterId >= 0
                    ? `cluster_${this.state.toggleNode.clusterId}`
                    : "",
                targetAnchor: "left",
                sourceAnchor: "right",
                style: {
                  strokeColor: "#a5a5d7",
                  strokeWidth: 1.5,
                  lineStyle: "curve",
                },
              },
            ]}
          >
            <li
              key={vpcIndex}
              className={`${
                vpcIndex === this.state.toggleNode.vpcId ? "active " : ""
              }`}
              id={`${
                vpcIndex === this.state.toggleNode.vpcId &&
                this.state.breadcrumbs.length === 2
                  ? "custom_location"
                  : ""
              }`}
              onClick={(e) => {
                this.handleToggleNode(
                  { vpcId: vpcIndex },
                  vpc.name,
                  "vpc",
                  true,
                  "cluster"
                );
              }}
            >
              <span id={`vpc_${vpcIndex}`}>
                <img src={VpcServicesIcon} alt="" />
              </span>
              {this.getServiceName(vpc.name, "vpc")}
            </li>
          </ArcherElement>
        );
      });
    }
  }

  prepareBreadCrumbs(data, index, type) {
    let tempBreadData = [];
    if (
      this.state.breadcrumbs.filter((breadcrumb) => breadcrumb.type === type)
        .length
    ) {
      if (
        this.state.breadcrumbs.filter((breadcrumb) => breadcrumb.id === index)
          .length
      ) {
        tempBreadData = this.state.breadcrumbs;
      } else {
        tempBreadData = this.state.breadcrumbs.filter(
          (breadcrumb) => breadcrumb.type !== type
        );
        tempBreadData = [...tempBreadData, data];
      }
    } else {
      tempBreadData = [...this.state.breadcrumbs, data];
    }
    breadcrumbResetCondition[type].forEach((keyType) => {
      tempBreadData = tempBreadData.filter(
        (breadcrumb) => breadcrumb.type !== keyType
      );
    });
    return tempBreadData;
  }

  renderClusters(index) {
    if (
      this.state.toggleNode.vpc &&
      this.props.treeData[index].clusters &&
      this.props.treeData[index].clusters.length
    ) {
      return this.props.treeData[index].clusters.map(
        (cluster, clusterIndex) => {
          return (
            <ArcherElement
              id={`cluster_${clusterIndex}`}
              relations={[
                {
                  targetId:
                    clusterIndex === this.state.toggleNode.clusterId &&
                    this.state.toggleNode.productId >= 0
                      ? `product_${this.state.toggleNode.productId}`
                      : "",
                  targetAnchor: "left",
                  sourceAnchor: "right",
                  style: {
                    strokeColor: "#a5a5d7",
                    strokeWidth: 1.5,
                    lineStyle: "curve",
                  },
                },
              ]}
            >
              <li
                key={clusterIndex}
                onClick={(e) => {
                  this.handleToggleNode(
                    { vpcId: index, clusterId: clusterIndex },
                    cluster.name,
                    "cluster",
                    true,
                    "product"
                  );
                }}
                className={`${
                  clusterIndex === this.state.toggleNode.clusterId
                    ? "active"
                    : ""
                }`}
                id={`${
                  clusterIndex === this.state.toggleNode.clusterId &&
                  this.state.breadcrumbs.length === 3
                    ? "custom_location"
                    : ""
                }`}
              >
                <span id={`cluster_${clusterIndex}`}>
                  <img src={ClusterIcon} alt="" />
                </span>
                {this.getServiceName(cluster.name, "cluster")}
              </li>
            </ArcherElement>
          );
        }
      );
    }
  }

  renderProducts(vpcIndex, clusterIndex) {
    if (
      this.state.toggleNode.cluster &&
      this.props.treeData[vpcIndex].clusters[clusterIndex].products &&
      this.props.treeData[vpcIndex].clusters[clusterIndex].products.length
    ) {
      return this.props.treeData[vpcIndex].clusters[clusterIndex].products.map(
        (product, productIndex) => {
          return (
            <ArcherElement id={`product_${productIndex}`}>
              <label
                className={`${
                  productIndex === this.state.toggleNode.productId
                    ? "active"
                    : ""
                }`}
                key={productIndex}
                onClick={() => {
                  this.handleToggleNode(
                    {
                      vpcId: vpcIndex,
                      clusterId: clusterIndex,
                      productId: productIndex,
                    },
                    product.name,
                    "product",
                    true
                  );
                }}
                id={`${
                  productIndex === this.state.toggleNode.productId &&
                  this.state.breadcrumbs.length === 4
                    ? "custom_location"
                    : ""
                }`}
              >
                {this.getServiceName(product.name, "product")}
              </label>
            </ArcherElement>
          );
        }
      );
    }
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
    return (
      this.state.breadcrumbs &&
      this.state.breadcrumbs.map((data, index) => {
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
      })
    );
  }

  getServiceName(name, type) {
    if (type === "vpc") {
      return name ? name.toUpperCase() : "";
    } else {
      let firstChar = name ? name.charAt(0).toUpperCase() : "";
      let otherStr = name ? name.toLowerCase().slice(1) : "";
      let string = firstChar + otherStr;
      return string;
    }
  }

  handleToggleNode(
    serviceIndexs,
    name,
    type,
    isBreadCumbEdit = false,
    nextType
  ) {
    let { toggleNode, breadcrumbs } = this.state;
    servicesTreeCondition[type].forEach((key) => {
      if (type === "service") {
        toggleNode[key] = key.endsWith("Id")
          ? null
          : key.startsWith(name)
          ? true
          : false;
      } else {
        toggleNode[key] = key.endsWith("Id")
          ? key in serviceIndexs
            ? serviceIndexs[key]
            : null
          : key === type || key === nextType
          ? true
          : false;
      }
    });

    if (isBreadCumbEdit) {
      breadcrumbs = this.prepareBreadCrumbs(
        {
          id: type + "_" + serviceIndexs[`${type}Id`],
          name: this.getServiceName(name, type),
          type: type,
          serviceIndexs: serviceIndexs,
        },
        type + "_" + serviceIndexs[`${type}Id`],
        type
      );
    } else {
      breadcrumbResetCondition[type].forEach((keyType) => {
        breadcrumbs = breadcrumbs.filter(
          (breadcrumb) => breadcrumb.type !== keyType
        );
      });
    }
    toggleNode["globalService"] = false;
    this.setState({ toggleNode, breadcrumbs });
  }

  renderVpcsDetails() {
    return this.props.vpcsDetails.map((vpc, index) => {
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

  generateVpcDetailsTable() {
    return (
      <Box className="environment-table-section" style={{ height: "395px" }}>
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
              <tbody>
                {this.props.vpcsDetails && this.props.vpcsDetails.length ? (
                  this.renderVpcsDetails()
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }

  filterVpcsData(searchString) {
    let { vpcsDetailsBackUp, vpcsDetails } = this.state;
    vpcsDetails =
      searchString != ""
        ? vpcsDetailsBackUp.filter((vpc) =>
            vpc.name.toLowerCase().includes(searchString.toLowerCase())
          )
        : vpcsDetailsBackUp;
    this.setState({ searchString, vpcsDetails });
  }

  changeActiveCluster = (cluster) => {
    this.setState({ currentActiveCluster: cluster });
  };

  render() {
    const { activeTab, currentActiveCluster, toggleNode } = this.state;
    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-head">
          <CommonFilterViewSearch
            data={{ vpcsDetails: this.state.vpcsDetails }}
            handleSearch={(string) => {
              this.filterVpcsData(string);
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
          {this.props.isLoderData ? (
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
                <Grid item xs={7}>
                  <Box className="services-panel">
                    <Box className="services-panel-title bottom-border">
                      <Box className="name">Topology View</Box>
                      <Box className="back-btn">
                        <i className="fa-solid fa-arrow-left"></i>
                      </Box>
                    </Box>
                    <Box className="services-panel-body">
                      {this.props.treeData && this.props.treeData.length ? (
                        <ArcherContainer
                          style={{ width: "100%", height: "100%" }}
                        >
                          <TransformWrapper
                            onTransformed={(instance) => {
                              transformScale = instance && instance.state.scale;
                              this.setState({ scale: true });
                            }}
                          >
                            {({
                              zoomIn,
                              zoomOut,
                              instance,
                              zoomToElement,
                              ...rest
                            }) => {
                              transformScale = instance.transformState.scale;
                              return (
                                <React.Fragment>
                                  <div className="gmnoprint">
                                    <div className="gmnoprint-plus-minus">
                                      <button
                                        className="btn btn-plus"
                                        onClick={() => zoomIn()}
                                      >
                                        <i className="fa-solid fa-plus"></i>
                                      </button>
                                      <button
                                        className="btn btn-minus"
                                        onClick={() => zoomOut()}
                                      >
                                        <i className="fa-solid fa-minus"></i>
                                      </button>
                                    </div>
                                    <div
                                      className="gmnoprint-map"
                                      onClick={() => {
                                        zoomToElement(
                                          "custom_location",
                                          transformScale
                                        );
                                      }}
                                    >
                                      <button className="btn btn-map">
                                        <i className="fa-solid fa-map-marker-alt"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <TransformComponent
                                    wrapperStyle={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                    contentStyle={{
                                      width: "100%",
                                      height: "100%",
                                      display: "block",
                                      paddingTop: "120px",
                                      // display: "flex",
                                      // alignItems: "center",
                                      // justifyContent: "flex-start",
                                      transform: "translate(0px, 0px) scale(0)",
                                    }}
                                  >
                                    <ArcherElement
                                      id="root"
                                      relations={[
                                        {
                                          targetId:
                                            this.state.toggleNode.vpcId >= 0 &&
                                            !this.state.toggleNode.globalService
                                              ? `vpc_${this.state.toggleNode.vpcId}`
                                              : this.state.toggleNode
                                                  .globalService
                                              ? "globalService"
                                              : "",
                                          targetAnchor: "left",
                                          sourceAnchor: "right",
                                          style: {
                                            strokeColor: "#a5a5d7",
                                            strokeWidth: 1.5,
                                          },
                                        },
                                      ]}
                                    >
                                      <div
                                        className="services-text-box active"
                                        id={`${
                                          this.state.breadcrumbs.length === 1
                                            ? "custom_location"
                                            : ""
                                        }`}
                                        onClick={(e) => {
                                          this.handleToggleNode(
                                            {},
                                            "vpc",
                                            "service",
                                            false
                                          );
                                        }}
                                      >
                                        <span id="custom_location_1">
                                          {this.getCloudName()}
                                        </span>
                                      </div>
                                    </ArcherElement>
                                    <div
                                      className={` ${
                                        this.props.treeData &&
                                        this.props.treeData.length
                                          ? "global-servies"
                                          : ""
                                      }`}
                                    >
                                      <ul>
                                        {this.state.toggleNode.vpc ? (
                                          this.renderVPCData()
                                        ) : (
                                          <></>
                                        )}
                                      </ul>
                                      <ArcherElement id="globalService">
                                        <div
                                          className="global-servies-menu m-t-2"
                                          onClick={(e) => {
                                            this.handleToggleNode(
                                              {},
                                              "vpc",
                                              "service",
                                              false
                                            );
                                            this.setState({
                                              toggleNode: {
                                                ...this.state.toggleNode,
                                                globalService:
                                                  !this.state.toggleNode
                                                    .globalService,
                                              },
                                            });
                                          }}
                                        >
                                          <label
                                            className={`${
                                              this.state.toggleNode
                                                .globalService
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            <span>
                                              <img
                                                src={VpcServicesIcon}
                                                alt=""
                                              />
                                            </span>
                                            Global servies
                                          </label>
                                        </div>
                                      </ArcherElement>
                                    </div>

                                    <div
                                      className={` ${
                                        this.state.toggleNode.cluster
                                          ? "global-servies cluster-servies"
                                          : ""
                                      }`}
                                      style={{
                                        marginTop: "0",
                                        marginBottom: "0",
                                        transform: "translateY(0%)",
                                      }}
                                    >
                                      <ul>
                                        {this.state.toggleNode.cluster ? (
                                          this.renderClusters(
                                            this.state.toggleNode.vpcId
                                          )
                                        ) : (
                                          <></>
                                        )}
                                      </ul>
                                      <div
                                        className="global-servies-menu"
                                        style={{ display: "none" }}
                                      >
                                        <label className="active">
                                          Cloud Management Services
                                        </label>
                                        <label>Gateway Services</label>
                                      </div>
                                    </div>
                                    <div
                                      className={`${
                                        this.state.toggleNode.product
                                          ? "global-servies app-servies"
                                          : ""
                                      }`}
                                    >
                                      <div className="global-servies-menu">
                                        {this.state.toggleNode.product ? (
                                          this.renderProducts(
                                            this.state.toggleNode.vpcId,
                                            this.state.toggleNode.clusterId
                                          )
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div
                                        className="global-servies-menu "
                                        style={{ display: "none" }}
                                      >
                                        <label className="active">
                                          Cloud Management Services
                                        </label>
                                        <label>Gateway Services</label>
                                      </div>
                                    </div>
                                  </TransformComponent>
                                </React.Fragment>
                              );
                            }}
                          </TransformWrapper>
                        </ArcherContainer>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  {this.state.breadcrumbs &&
                  this.state.breadcrumbs.length === 1 &&
                  this.props.vpcsDetails &&
                  this.props.vpcsDetails.length &&
                  !this.state.toggleNode.globalService ? (
                    this.generateVpcDetailsTable()
                  ) : (
                    <></>
                  )}
                  <Box
                    className="fliter-tabs"
                    style={{
                      display: `${
                        this.state.breadcrumbs &&
                        this.state.breadcrumbs.length === 4
                          ? "block"
                          : "none"
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
                        this.state.breadcrumbs &&
                        this.state.breadcrumbs.length === 3
                          ? "block"
                          : "none"
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
                        this.state.breadcrumbs &&
                        this.state.breadcrumbs.length === 2
                          ? "block"
                          : "none"
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
                                    src={this.state.serivceImages[index]}
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
                                    src={this.state.serivceImages[index]}
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
                                    src={this.state.serivceImages[index]}
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

export default DiscoveredAssets;

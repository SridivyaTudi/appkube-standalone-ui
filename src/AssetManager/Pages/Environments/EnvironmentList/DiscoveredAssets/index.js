import React, { Component } from "react";
import { images } from "../../../../img";
import Aws from "../../../../../assets/img/aws.png";
import VpcServicesIcon from "../../../../../assets/img/assetmanager/vpc-services-icon.png";
import ClusterIcon from "../../../../../assets/img/assetmanager/cluster-icon.png";
import GlobalIcon4 from "../../../../../assets/img/assetmanager/global-icon4.png";
import GlobalIcon5 from "../../../../../assets/img/assetmanager/global-icon5.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CommonFilterViewSearch from "../CommonFilterViewSearch";
import ServicesNameLogo from "../ServicesNameLogo";
import DataLakeTable from "./DataLakeTable";
import ServiceMeshTable from "./ServiceMeshTable";
import AllTable from "./AllTable";
import AppTable from "./AppTable";
import DataTable from "./DataTable";
import dummyData from "./dummy.json";
import { ArcherContainer, ArcherElement } from "react-archer";
import EksCluster from "./EksCluster";
import EcsCluster from "./EcsCluster";
import WafResources from "./WafResources";
import GlobalSerivces from "./GlobalServices";

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
        <div>
          <div className="heading">
            <span>
              <img src={images.awsLogo} alt="" />
            </span>
            <h2>Amazon Web Services</h2>
            <div className="icon float-right" onClick={this.showHideDetail}>
              <i
                className={display_detail ? "fa fa-minus" : "fa fa-plus"}
                aria-hidden="true"
              ></i>
            </div>
          </div>
          {display_detail && (
            <div className="service-content">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Account Holder Name</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        <span>{row.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Organisation</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        <span>
                          {row.organizationName && row.organizationName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Account Number</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        <span>{row.accountId}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Organisation Unit</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        <span>
                          {row.organizationalUnit &&
                            row.organizationalUnit.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        Total Online Instances
                      </div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">0</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        Full Protection Security Group
                      </div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">0</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Cloud Guard ID</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        e5b82995-c0fc-729d-a67b-926r81a5963d
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        Read Only Security Group
                      </div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">0</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Added At</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">{row.createdOn}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
    return ServicesNameLogo.ServicesName[queryPrm.get("cloudName")] || "";
  }

  getBreadCrumbs() {
    return (
      this.state.breadcrumbs &&
      this.state.breadcrumbs.map((data, index) => {
        return (
          <>
            {index > 0 ? (
              <li>
                <i className="far fa-chevron-right"></i>
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
        <tr key={index}>
          <td>{vpc.name}</td>
          <td>{vpc.product_count}</td>
          <td>{vpc.app_count}</td>
          <td>{vpc.data_count}</td>
          <td>
            <button
              type="button"
              onClick={this.toggleMenu}
              className="list-icon"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
            {this.state.showMenu === true && (
              <div className="menu-list">
                <ul>
                  <li className="active">
                    <a href="#">Add New datasource</a>
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
            )}
          </td>
        </tr>
      );
    });
  }

  generateVpcDetailsTable() {
    return (
      <div className="environment-table-section" style={{ height: "395px" }}>
        <div className="table discovered-assets-table">
          <table className="overview">
            <thead>
              <tr>
                <th>
                  <div className="environment-image">
                    <img src={Aws} />
                  </div>
                </th>
                <th>Products</th>
                <th>App Services</th>
                <th>Data Services</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.vpcsDetails && this.props.vpcsDetails.length ? (
                this.renderVpcsDetails()
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
      <div className="discovered-assets">
        <div className="discovered-assets-head">
          <CommonFilterViewSearch
            data={{ vpcsDetails: this.state.vpcsDetails }}
            handleSearch={(string) => {
              this.filterVpcsData(string);
            }}
            updateAccountId={(accountId) => {
              this.setState({ accountId });
              this.props.updateCloudName(
                new URLSearchParams(document.location.search).get("cloudName")
              );
            }}
          />
        </div>
        <div className="discovered-assets-body">
          {this.props.isLoderData ? (
            <div className="chart-spinner text-center w-100 p-t-20 p-b-20">
              <i className="fa fa-spinner fa-spin" /> Loading...
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-7 col-md-12 col-sm-12">
                <div className="services-panel">
                  <div className="services-panel-title bottom-border">
                    <div className="name">Topology View</div>
                    <div className="back-btn"><i class="fas fa-arrow-to-left"></i></div>
                  </div>
                  <div className="services-panel-body">
                    <TransformWrapper
                      onTransformed={(instance) => {
                        transformScale = instance && instance.state.scale;
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
                                  <i className="fal fa-plus"></i>
                                </button>
                                <button
                                  className="btn btn-minus"
                                  onClick={() => zoomOut()}
                                >
                                  <i className="fal fa-minus"></i>
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
                                  <i className="fal fa-map-marker-alt"></i>
                                </button>
                              </div>
                            </div>

                            <TransformComponent
                              wrapperStyle={{ width: "100%", height: "100%" }}
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
                              <ArcherContainer>
                                <ArcherElement
                                  id="root"
                                  relations={[
                                    {
                                      targetId:
                                        this.state.toggleNode.vpcId >= 0 &&
                                        !this.state.toggleNode.globalService
                                          ? `vpc_${this.state.toggleNode.vpcId}`
                                          : this.state.toggleNode.globalService
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
                                          this.state.toggleNode.globalService
                                            ? "active"
                                            : ""
                                        }`}
                                      >
                                        <span>
                                          <img src={VpcServicesIcon} alt="" />
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
                              </ArcherContainer>
                            </TransformComponent>
                          </React.Fragment>
                        );
                      }}
                    </TransformWrapper>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12">
                {this.state.breadcrumbs &&
                this.state.breadcrumbs.length === 1 &&
                this.props.vpcsDetails &&
                this.props.vpcsDetails.length &&
                !this.state.toggleNode.globalService ? (
                  this.generateVpcDetailsTable()
                ) : (
                  <></>
                )}
                <div
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
                  <div className="global-services-fliter">
                    <div className="heading">
                      <div className="breadcrumbs">
                        <ul>{this.getBreadCrumbs()}</ul>
                      </div>
                      <button type="button" className="btn btn-ellipsis">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                    <div className="fliter-inputs">
                      <div className="search-control">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder=""
                        />
                      </div>
                      <div className="search-control">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder=""
                        />
                      </div>
                      <div className="search-control">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="environment-table-section"
                    style={{ height: "373px" }}
                  >
                    <div className="table  discovered-assets-table">
                      <table className="overview">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Performance</th>
                            <th>Availability</th>
                            <th>Security</th>
                            <th>Data Protection</th>
                            <th>User Exp</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong>
                                <a href="#">EMS</a>
                              </strong>
                            </td>
                            <td>
                              <div className="box red">2</div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box orange">3</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>
                                <a href="#">Supply Chain</a>
                              </strong>
                            </td>
                            <td>
                              <div className="box red">2</div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>
                              <strong>
                                <a href="#">Procurement</a>
                              </strong>
                            </td>
                            <td>
                              <div className="box red">2</div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box orange">3</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
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
                  <div className="global-services-fliter">
                    <div className="heading">
                      <div className="breadcrumbs">
                        <ul>{this.getBreadCrumbs()}</ul>
                      </div>
                    </div>
                  </div>
                  {toggleNode.clusterId === 0 ? (
                    <>
                      <div className="environment-boxs m-t-2">
                        <div
                          className="environment-box"
                          onClick={() => this.changeActiveCluster("eksCluster")}
                          style={{
                            border:
                              currentActiveCluster === "eksCluster"
                                ? "2px solid #416bff"
                                : "2px solid #fff",
                          }}
                        >
                          <div className="environment-title">
                            <div className="environment-image">
                              <img src={GlobalIcon4} alt="" />
                            </div>
                            <div className="title-name">EKS-Cluster</div>
                          </div>
                          <div className="data-contant">
                            <ul>
                              {dummyData.eksCluster.map((item) => {
                                return (
                                  <li>
                                    <div className="data-text">
                                      <span
                                        style={{
                                          backgroundColor: item.backgroundColor,
                                        }}
                                      ></span>
                                      <p>{item.name}</p>
                                    </div>
                                    <label>{item.value}</label>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                        <div
                          className="environment-box"
                          onClick={() => this.changeActiveCluster("ecsCluster")}
                          style={{
                            border:
                              currentActiveCluster === "ecsCluster"
                                ? "2px solid #416bff"
                                : "2px solid #fff",
                          }}
                        >
                          <div className="environment-title">
                            <div className="environment-image">
                              <img src={GlobalIcon5} alt="" />
                            </div>
                            <div className="title-name">ECS-Cluster</div>
                          </div>
                          <div className="data-contant">
                            <ul>
                              {dummyData.ecsCluster.map((item) => {
                                return (
                                  <li>
                                    <div className="data-text">
                                      <span
                                        style={{
                                          backgroundColor: item.backgroundColor,
                                        }}
                                      ></span>
                                      <p>{item.name}</p>
                                    </div>
                                    <label>{item.value}</label>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {currentActiveCluster === "eksCluster" && <EksCluster />}
                      {currentActiveCluster === "ecsCluster" && <EcsCluster />}
                    </>
                  ) : toggleNode.clusterId === 1 ? (
                    <AllTable />
                  ) : (
                    <WafResources />
                  )}
                  <div className="services-panel-tabs">
                    {/* <div className="tabs-head">
                      <ul>
                        {this.tableMapping.map((tabData, index) => {
                          return (
                            <li
                              key={`ops-tab-${index}`}
                              className={index === activeTab ? "active" : ""}
                              onClick={(e) => this.setActiveTab(index)}
                            >
                              {tabData.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div> */}
                    {/* <div className="tabs-content">
                      {this.tableMapping.map((tabData, index) => {
                        if (activeTab === index) {
                          return <tabData.component data={[tabData.dataKey]} />;
                        } else {
                          return <></>;
                        }
                      })}
                    </div> */}
                  </div>
                </div>
                <div
                  className="fliter-tabs"
                  style={{
                    display: `${
                      this.state.breadcrumbs &&
                      this.state.breadcrumbs.length === 2
                        ? "block"
                        : "none"
                    }`,
                  }}
                >
                  <div
                    className="global-services-fliter"
                    style={{
                      height: "533px",
                      boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <div className="heading">
                      <div className="breadcrumbs">
                        <ul>{this.getBreadCrumbs()}</ul>
                      </div>
                    </div>
                    <div className="fliter-inputs">
                      <div className="search-control">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder=""
                        />
                      </div>
                      <div className="search-control">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder=""
                        />
                      </div>
                      <div className="search-control">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {toggleNode.globalService && <GlobalSerivces />}
                <div className="fliter-tabs" style={{ display: "none" }}>
                  <div className="global-services-fliter">
                    <div className="heading">
                      <div className="breadcrumbs">
                        <ul>
                          <li>
                            <a href="#">AWS</a>
                          </li>
                          <li>
                            <i className="far fa-chevron-right"></i>
                          </li>
                          <li>
                            <a href="#">VPC 1</a>
                          </li>
                          <li>
                            <i className="far fa-chevron-right"></i>
                          </li>
                          <li>
                            <a href="#">Cluster 1</a>
                          </li>
                          <li>
                            <i className="far fa-chevron-right"></i>
                          </li>
                          <li>
                            <span>App Services</span>
                          </li>
                        </ul>
                      </div>
                      <button type="button" className="btn btn-ellipsis">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                    <div className="fliter-inputs">
                      <div className="search-control">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder=""
                        />
                      </div>
                      <div className="search-control">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder=""
                        />
                      </div>
                      <div className="search-control">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="environment-table-section"
                    style={{ height: "373px" }}
                  >
                    <div className="table discovered-assets-table">
                      <table className="overview">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Performance</th>
                            <th>Availability</th>
                            <th>Security</th>
                            <th>Data Protection</th>
                            <th>User Exp</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong>
                                <a href="#">EMS</a>
                              </strong>
                              <i className="fas fa-caret-right m-l-1"></i>
                            </td>
                            <td>
                              <div className="box red">2</div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box orange">3</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>
                                <a href="#">Supply Chain</a>
                              </strong>
                              <i className="fas fa-caret-right m-l-1"></i>
                            </td>
                            <td>
                              <div className="box red">2</div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box orange">3</div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>
                                <a href="#">Procurement</a>
                              </strong>
                              <i className="fas fa-caret-right m-l-1"></i>
                            </td>
                            <td>
                              <div className="box red">2</div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box green">
                                <i className="far fa-check"></i>
                              </div>
                            </td>
                            <td>
                              <div className="box orange">3</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DiscoveredAssets;

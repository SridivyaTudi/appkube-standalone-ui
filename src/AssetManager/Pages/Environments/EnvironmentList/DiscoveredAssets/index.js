import React, { Component } from "react";
import { images } from "../../../../img";
import Aws from "../../../../../assets/img/aws.png";
import Microsoftazure from "../../../../../assets/img/microsoftazure.png";
import VpcServicesIcon from "../../../../../assets/img/assetmanager/vpc-services-icon.png";
import ClusterIcon from "../../../../../assets/img/assetmanager/cluster-icon.png";
import GlobalIcon1 from "../../../../../assets/img/assetmanager/global-icon1.png";
import GlobalIcon2 from "../../../../../assets/img/assetmanager/global-icon2.png";
import GlobalIcon3 from "../../../../../assets/img/assetmanager/global-icon3.png";
import GlobalIcon4 from "../../../../../assets/img/assetmanager/global-icon4.png";
import GlobalIcon5 from "../../../../../assets/img/assetmanager/global-icon5.png";
import GlobalIcon6 from "../../../../../assets/img/assetmanager/global-icon6.png";
import GlobalIcon7 from "../../../../../assets/img/assetmanager/global-icon7.png";
import { Link } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { type } from "@testing-library/user-event/dist/type";
import { CSVLink } from "react-csv";
import CommonFilterViewSearch from "../CommonFilterViewSearch";
import ServicesNameLogo from "../ServicesNameLogo";
import DataLakeTable from"./DataLakeTable";
import ServiceMeshTable from "./ServiceMeshTable";
import AllTable from "./AllTable";
import AppTable from "./AppTable";
import DataTable from "./DataTable";

const headers = [
  { label: "Service Name", key: "name" },
  { label: "Product", key: "product_count" },
  { label: "App Service", key: "app_count" },
  { label: "Data Service", key: "data_count" },
];
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
            onClick={() => {
              this.handleToggleNode(
                { vpcId: vpcIndex },
                vpc.name,
                "vpc",
                true,
                "cluster"
              );
              // this.setState({
              //   toggleNode: {
              //     ...this.state.toggleNode,
              //     vpcId: vpcIndex,
              //     clusters: true,
              //     products: false,
              //     clusterId: null,
              //     productId: null,
              //   },
              //   breadcrumbs: this.prepareBreadCrumbs(
              //     { id: "VPC" + "_" + vpcIndex, name: vpc.name, type: "VPC" },
              //     "VPC" + "_" + vpcIndex,
              //     "VPC"
              //   ),
              // });
            }}
          >
            <span>
              <img src={VpcServicesIcon} alt="" />
            </span>
            {this.getServiceName(vpc.name, "vpc")}
          </li>
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
            <li
              key={clusterIndex}
              onClick={() => {
                this.handleToggleNode(
                  { vpcId: index, clusterId: clusterIndex },
                  cluster.name,
                  "cluster",
                  true,
                  "product"
                );
                // this.setState({
                //   toggleNode: {
                //     ...this.state.toggleNode,
                //     vpcId: index,
                //     clusterId: clusterIndex,
                //     products: true,
                //   },
                //   breadcrumbs: this.prepareBreadCrumbs(
                //     {
                //       id: "cluster" + "_" + clusterIndex,
                //       name: cluster.name,
                //       type: "cluster",
                //     },
                //     "cluster" + "_" + clusterIndex,
                //     "cluster"
                //   ),
                // });
              }}
              className={`${
                clusterIndex === this.state.toggleNode.clusterId ? "active" : ""
              }`}
              id={`${
                clusterIndex === this.state.toggleNode.clusterId &&
                this.state.breadcrumbs.length === 3
                  ? "custom_location"
                  : ""
              }`}
            >
              <span>
                <img src={ClusterIcon} alt="" />
              </span>
              {this.getServiceName(cluster.name, "cluster")}
            </li>
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
            <label
              className={`${
                productIndex === this.state.toggleNode.productId ? "active" : ""
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

                // this.setState({
                //   toggleNode: {
                //     ...this.state.toggleNode,
                //     productId: productIndex,
                //     products: true,
                //   },
                //   breadcrumbs: this.prepareBreadCrumbs(
                //     {
                //       id: "product" + "_" + productIndex,
                //       name: product.name,
                //       type: "product",
                //     },
                //     "product" + "_" + productIndex,
                //     "product"
                //   ),
                // });
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
  render() {
    const { servicesPanelShow, activeTab } = this.state;
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

          {/* <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="environment-fliter">
                <div
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
                </div>
                <div
                  className={
                    showSelectFilter === true
                      ? "fliter-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <div className="search-bar">
                    <input type="text" placeholder="Search...." />
                  </div>
                  <ul>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      OU
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      Status
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      No of Assets
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      Logs
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      Performance & Availability
                    </li>
                  </ul>
                </div>
                <div
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
              </div>
              <div className="environment-fliter">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showServiceViewFilter: !showServiceViewFilter,
                    })
                  }
                >
                  <i className="far fa-eye fillter-icon"></i>
                  Service View
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div
                  className={
                    showServiceViewFilter === true
                      ? "fliter-collapse recent-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <ul>
                    <li>
                      <Link to={`/assetmanager/pages/accountsetup`}>
                        <span>
                          <img src={Aws} alt="AWS" />
                        </span>
                        <p>(657907747545)</p>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/assetmanager/pages/accountsetup`}>
                        <span>
                          <img src={Aws} alt="" />
                        </span>
                        <p>(655668745458)</p>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/assetmanager/pages/accountsetup`}>
                        <span>
                          <img src={Microsoftazure} alt="" />
                        </span>
                        <p>(655668745458)</p>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
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
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="d-inline-block width-100 text-right">
                {this.state.vpcsDetails && this.state.vpcsDetails.length ? (
                  <CSVLink
                    data={this.state.vpcsDetails}
                    headers={headers}
                    filename={"vpcs.csv"}
                    target="_blank"
                  >
                    <button className="new-button">
                      <i className="fas fa-external-link-square-alt p-r-10"></i>
                      Export
                    </button>
                  </CSVLink>
                ) : (
                  <></>
                )}
                <div className="search-box">
                  <div className="form-group search-control-group m-b-0">
                    <input
                      type="text"
                      className="input-group-text"
                      placeholder="Search"
                      onChange={(e) => {
                        this.filterVpcsData(e.target.value);
                      }}
                    />
                    <button className="search-btn">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
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
                  </div>
                  {/* <div className="services-panel-body">
                  <div className="gmnoprint">
                    <div className="gmnoprint-plus-minus">
                      <button className="btn btn-plus">
                        <i className="fal fa-plus"></i>
                      </button>
                      <button className="btn btn-minus">
                        <i className="fal fa-minus"></i>
                      </button>
                    </div>
                    <div className="gmnoprint-map">
                      <button className="btn btn-map">
                        <i className="fal fa-map-marker-alt"></i>
                      </button>
                    </div>
                  </div>
                  <div className="services-inner-body">
                    <div className="services-text-box active">Amazon Web Services</div>
                    <div className="global-servies">
                      <ul>
                        <li>
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          VPC 1
                        </li>
                        <li className="active">
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          VPC 2
                        </li>
                        <li>
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          VPC 3
                        </li>
                        <li>
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          VPC 4
                        </li>
                      </ul>
                      <div className="global-servies-menu">
                        <label className="active">
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          Global servies
                        </label>
                      </div>
                    </div>
                    <div className="global-servies cluster-servies">
                      <ul>
                        <li>
                          <span>
                            <img src={ClusterIcon} alt="" />
                          </span>
                          Cluster 1
                        </li>
                        <li className="active">
                          <span>
                            <img src={ClusterIcon} alt="" />
                          </span>
                          Cluster 2
                        </li>
                        <li>
                          <span>
                            <img src={ClusterIcon} alt="" />
                          </span>
                          Cluster 3
                        </li>
                        <li>
                          <span>
                            <img src={ClusterIcon} alt="" />
                          </span>
                          Cluster 4
                        </li>
                      </ul>
                      <div className="global-servies-menu">
                        <label className="active">Cloud Management Services</label>
                        <label>Gateway Services</label>
                      </div>
                    </div>
                    <div className="global-servies app-servies">
                      <div className="global-servies-menu">
                        <label className="active">App Services</label>
                        <label>Data Services</label>
                      </div>
                    </div>
                  </div>
                </div> */}
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
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                paddingTop: "120px",
                                display: "flex",
                                transform: "translate(0px, 0px) scale(0)",
                              }}
                            >
                              <div
                                className="services-text-box active"
                                id={`${
                                  this.state.breadcrumbs.length === 1
                                    ? "custom_location"
                                    : ""
                                }`}
                                onClick={() => {
                                  this.handleToggleNode(
                                    {},
                                    "vpc",
                                    "service",
                                    false
                                  );
                                }}
                              >
                                {this.getCloudName()}
                              </div>
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
                                <div
                                  className="global-servies-menu m-t-2"
                                  onClick={() => {
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
                                          !this.state.toggleNode.globalService,
                                      },
                                    });
                                  }}
                                  // style={{ display: "none" }}
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
                                className={` ${
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
                        <ul>
                          {this.getBreadCrumbs()}
                          {/* <li>
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
                        </li> */}
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

                {/* <div
                className="environment-table-section"
                style={{ height: "395px" }}
              >
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
                    <tbody> */}

                {/* <tr>
                        <td>VPC 1</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button
                            type="button"
                            onClick={this.toggleMenu}
                            className="list-icon"
                          >
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                          {this.state.showMenu == true && (
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
                      </tr> */}
                {/* <tr>
                        <td>VPC 2</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button type="button" className="list-icon">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>VPC 3</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button type="button" className="list-icon">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>VPC 4</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button type="button" className="list-icon">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Global Service</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button type="button" className="list-icon">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                        </td>
                      </tr> */}
                {/* </tbody>
                  </table>
                </div>
              </div> */}
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
                        <ul>
                          {this.getBreadCrumbs()}
                          {/* <li>
                          <a href="#">AWS</a>
                        </li>
                        <li>
                          <i className="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <span>Global Services</span>
                        </li> */}
                        </ul>
                      </div>
                      {/* <button type="button" className="btn btn-ellipsis">
                        <i className="fas fa-ellipsis-v"></i>
                      </button> */}
                    </div>
                    {/* <div className="fliter-inputs">
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
                    </div> */}
                  </div>
                  <div className="environment-boxs m-t-2">
                    <div className="environment-box">
                      <div className="environment-title">
                        <div className="environment-image">
                          <img src={GlobalIcon4} alt="" />
                        </div>
                        <div className="title-name">EKS-Cluster</div>
                      </div>
                      <div className="data-contant">
                        <ul>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#ff9900" }}
                              ></span>
                              <p>No of EKS</p>
                            </div>
                            <label>20</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#0089d6" }}
                              ></span>
                              <p>CPU Ultilization</p>
                            </div>
                            <label>65%</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#da4f44" }}
                              ></span>
                              <p>Memory</p>
                            </div>
                            <label>96%</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#383874" }}
                              ></span>
                              <p>Network Bytes</p>
                            </div>
                            <label>2000</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#ff708b" }}
                              ></span>
                              <p>Network Bytes Out</p>
                            </div>
                            <label>3500</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#416bff" }}
                              ></span>
                              <p>CPU Reservation</p>
                            </div>
                            <label>70%</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#006bb9" }}
                              ></span>
                              <p>Memory Reservation</p>
                            </div>
                            <label>60%</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="environment-box">
                      <div className="environment-title">
                        <div className="environment-image">
                          <img src={GlobalIcon5} alt="" />
                        </div>
                        <div className="title-name">ECS-Cluster</div>
                      </div>
                      <div className="data-contant">
                        <ul>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#ff9900" }}
                              ></span>
                              <p>No of EKS</p>
                            </div>
                            <label>20</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#0089d6" }}
                              ></span>
                              <p>CPU Ultilization</p>
                            </div>
                            <label>65%</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#da4f44" }}
                              ></span>
                              <p>Memory</p>
                            </div>
                            <label>96%</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#383874" }}
                              ></span>
                              <p>Network Bytes</p>
                            </div>
                            <label>2000</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#ff708b" }}
                              ></span>
                              <p>Network Bytes Out</p>
                            </div>
                            <label>3500</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#416bff" }}
                              ></span>
                              <p>CPU Reservation</p>
                            </div>
                            <label>70%</label>
                          </li>
                          <li>
                            <div className="data-text">
                              <span
                                style={{ backgroundColor: "#006bb9" }}
                              ></span>
                              <p>Memory Reservation</p>
                            </div>
                            <label>60%</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="resources-section">
                    <h4>EKS Resources</h4>
                    <div className="account-list-conitant">
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>$96k</strong>
                          <p>Total Cost</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>540k</strong>
                          <p>Total function</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>43k</strong>
                          <p>Error Rate</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>365</strong>
                          <p>Throttle</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>199</strong>
                          <p>Latency</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>142</strong>
                          <p>Trends</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>450k</strong>
                          <p>Failure Function</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>450k</strong>
                          <p>Total Buckets</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>41MB</strong>
                          <p>Used CPU</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>152</strong>
                          <p>Net Received</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>142</strong>
                          <p>Request</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>450</strong>
                          <p>Memory Used</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="performance-section">
                    <div className="performance-head">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-5">
                          <h4>EKS Performance</h4>
                        </div>
                        <div className="col-lg-7">
                          <div className="head-right">
                            <button className="light-blue-button m-b-0">
                              <i class="far fa-stream p-r-10"></i>
                              fillter
                            </button>
                            <button className="light-blue-outline m-b-0 m-r-0">
                              Explore
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="environment-table-section">
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
                                  <a href="#">S3</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>
                                  <a href="#">Attendence</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  {" "}
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>
                                  <a href="#">Free</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  {" "}
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>
                                  <a href="#">Exam</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  {" "}
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="services-panel-tabs">
                    <div className="tabs-head">
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
                    </div>
                    <div className="tabs-content">
                      {this.tableMapping.map((tabData, index) => {
                        if (activeTab === index) {
                          return <tabData.component data={[tabData.dataKey]} />;
                        } else {
                          return <></>;
                        }
                      })}
                    </div>
                  </div>
                  <div className="global-service-cards">
                    <div className="service-card active">
                      <div className="service-icon">
                        <img src={GlobalIcon6} alt="serviceicon" />
                      </div>
                      <div className="service-contant">
                        <label>WAF-Service</label>
                        <strong>235</strong>
                      </div>
                    </div>
                    <div className="service-card">
                      <div className="service-icon">
                        <img src={GlobalIcon7} alt="serviceicon" />
                      </div>
                      <div className="service-contant">
                        <label>API Gateway</label>
                        <strong>03</strong>
                      </div>
                    </div>
                    <div className="service-card">
                      <div className="service-icon">
                        <img src={GlobalIcon3} alt="serviceicon" />
                      </div>
                      <div className="service-contant">
                        <label>Load Balancer</label>
                        <strong>19</strong>
                      </div>
                    </div>
                  </div>
                  <div className="resources-section">
                    <h4>WAF Resources</h4>
                    <div className="account-list-conitant">
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>$96k</strong>
                          <p>Total Cost</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>540k</strong>
                          <p>Total function</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>43k</strong>
                          <p>Error Rate</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>365</strong>
                          <p>Throttle</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>199</strong>
                          <p>Latency</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>142</strong>
                          <p>Trends</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>450k</strong>
                          <p>Failure Function</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>450k</strong>
                          <p>Total Buckets</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>41MB</strong>
                          <p>Used CPU</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>152</strong>
                          <p>Net Received</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>142</strong>
                          <p>Request</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>450</strong>
                          <p>Memory Used</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="performance-section">
                    <div className="performance-head">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-5">
                          <h4>Lambda Performance</h4>
                        </div>
                        <div className="col-lg-7">
                          <div className="head-right">
                            <button className="light-blue-button m-b-0">
                              <i class="far fa-stream p-r-10"></i>
                              fillter
                            </button>
                            <button className="light-blue-outline m-b-0 m-r-0">
                              Explore
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="environment-table-section">
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
                                  <a href="#">S3</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>
                                  <a href="#">Attendence</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  {" "}
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>
                                  <a href="#">Free</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  {" "}
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>
                                  <a href="#">Exam</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  {" "}
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
                        <ul>
                          {this.getBreadCrumbs()}
                          {/* <li>
                          <a href="#">AWS</a>
                        </li>
                        <li>
                          <i className="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <span>VPC 1</span>
                        </li> */}
                        </ul>
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
                <div
                  className="global-service-penal"
                  style={{
                    display: `${
                      this.state.toggleNode.globalService ? "block" : "none"
                    }`,
                  }}
                >
                  <div className="global-services-fliter">
                    <div className="fliter-tabs">
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
                                <span>App Services</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="global-service-cards">
                    <div className="service-card active">
                      <div className="service-icon">
                        <img src={GlobalIcon1} alt="serviceicon" />
                      </div>
                      <div className="service-contant">
                        <label>S3</label>
                        <strong>235</strong>
                      </div>
                    </div>
                    <div className="service-card">
                      <div className="service-icon">
                        <img src={GlobalIcon2} alt="serviceicon" />
                      </div>
                      <div className="service-contant">
                        <label>API Gateway</label>
                        <strong>03</strong>
                      </div>
                    </div>
                    <div className="service-card">
                      <div className="service-icon">
                        <img src={GlobalIcon3} alt="serviceicon" />
                      </div>
                      <div className="service-contant">
                        <label>Lambda</label>
                        <strong>19</strong>
                      </div>
                    </div>
                  </div>
                  <div className="resources-section">
                    <h4>S3 Resources</h4>
                    <div className="account-list-conitant">
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>$96k</strong>
                          <p>Total Cost</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>540k</strong>
                          <p>Total function</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>43k</strong>
                          <p>Error Rate</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>365</strong>
                          <p>Throttle</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>199</strong>
                          <p>Latency</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>142</strong>
                          <p>Trends</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>450k</strong>
                          <p>Failure Function</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>450k</strong>
                          <p>Total Buckets</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>41MB</strong>
                          <p>Used CPU</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>152</strong>
                          <p>Net Received</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>142</strong>
                          <p>Request</p>
                        </div>
                      </div>
                      <div className="account-list-details">
                        <div className="d-block">
                          <strong>450</strong>
                          <p>Memory Used</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="performance-section">
                    <div className="performance-head">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-5">
                          <h4>S3 Performance</h4>
                        </div>
                        <div className="col-lg-7">
                          <div className="head-right">
                            <button className="light-blue-button m-b-0">
                              <i class="far fa-stream p-r-10"></i>
                              fillter
                            </button>
                            <button className="light-blue-outline m-b-0 m-r-0">
                              Explore
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="environment-table-section">
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
                                  <a href="#">S3</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>
                                  <a href="#">Attendence</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  {" "}
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>
                                  <a href="#">Free</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  {" "}
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>
                                  <a href="#">Exam</a>
                                </strong>
                                <i className="fas fa-caret-right m-l-1"></i>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box orange">
                                  {" "}
                                  <i class="fas fa-sort-up"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box red">
                                  <i class="far fa-stop-circle"></i>
                                </div>
                              </td>
                              <td>
                                <div className="box green">
                                  <i className="far fa-check"></i>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
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

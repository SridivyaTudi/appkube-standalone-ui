import React, { Component } from "react";
import { images } from "../../../../img";
import Aws from "../../../../../assets/img/aws.png";
import Microsoftazure from "../../../../../assets/img/microsoftazure.png";
import VpcServicesIcon from "../../../../../assets/img/assetmanager/vpc-services-icon.png";
import ClusterIcon from "../../../../../assets/img/assetmanager/cluster-icon.png";
import { Link } from "react-router-dom";
import S3Table from "./S3Table";
import CdnTable from "./CdnTable";
import WafTable from "./WafTable";
import { RestService } from "../../../_service/RestService";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { type } from "@testing-library/user-event/dist/type";

class DiscoveredAssets extends Component {
  tableMapping = [
    {
      name: "S3",
      dataKey: "s3",
      component: S3Table,
    },
    {
      name: "CDN",
      dataKey: "cdn",
      component: CdnTable,
    },
    {
      name: "WAF",
      dataKey: "waf",
      component: WafTable,
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
        VPCS: true,
        clusters: false,
        products: false,
        vpcId: null,
        clusterId: null,
        productId: null,
      },
      breadcrumbs: [
        {
          id: "service",
          name: cloudName,
          type: "service",
        },
      ],
      showSelectFilter: false,
      showServiceViewFilter: false,
      activeTab: 0,
    };
  }

  getServicesData = async (accountId) => {
    try {
      await RestService.getData(
        `http://34.199.12.114:5057/api/account-services/search?accountId=${accountId}`,
        null,
        null
      ).then((response) => {
        this.setState({
          treeData: response[0].account_services_json.vpcs,
        });
      });
    } catch (err) {
      console.log("Loading accounts failed. Error: ", err);
    }
  };

  submitPage = () => {};

  showHideDetail = () => {
    const { display_detail } = this.state;
    this.setState({
      display_detail: !display_detail,
    });
  };

  componentDidMount() {
    const queryPrm = new URLSearchParams(document.location.search);
    const accountId = queryPrm.get("accountId");
    const cloudName = queryPrm.get("cloudName");
    this.getServicesData(accountId);
  }

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
    if (this.state.treeData && this.state.treeData.length) {
      return this.state.treeData.map((vpc, vpcIndex) => {
        return (
          <li
            key={vpcIndex}
            className={`${
              vpcIndex == this.state.toggleNode.vpcId ? "active" : ""
            }`}
            onClick={() => {
              this.setState({
                toggleNode: {
                  ...this.state.toggleNode,
                  vpcId: vpcIndex,
                  clusters: true,
                  products: false,
                  clusterId: null,
                  productId: null,
                },
                breadcrumbs: this.prepareBreadCrumbs(
                  { id: "VPC" + "_" + vpcIndex, name: vpc.name, type: "VPC" },
                  "VPC" + "_" + vpcIndex,
                  "VPC"
                ),
              });
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
      this.state.breadcrumbs.filter((breadcrumb) => breadcrumb.type == type)
        .length
    ) {
      if (
        this.state.breadcrumbs.filter((breadcrumb) => breadcrumb.id == index)
          .length
      ) {
        tempBreadData = this.state.breadcrumbs;
      } else {
        tempBreadData = this.state.breadcrumbs.filter(
          (breadcrumb) => breadcrumb.type != type
        );
        tempBreadData = [...tempBreadData, data];
      }
    } else {
      tempBreadData = [...this.state.breadcrumbs, data];
    }
    return tempBreadData;
  }
  renderClusters(index) {
    if (
      this.state.toggleNode.VPCS &&
      this.state.treeData[index].clusters &&
      this.state.treeData[index].clusters.length
    ) {
      return this.state.treeData[index].clusters.map(
        (cluster, clusterIndex) => {
          return (
            <li
              key={clusterIndex}
              onClick={() => {
                this.setState({
                  toggleNode: {
                    ...this.state.toggleNode,
                    vpcId: index,
                    clusterId: clusterIndex,
                    products: true,
                  },
                  breadcrumbs: this.prepareBreadCrumbs(
                    {
                      id: "cluster" + "_" + clusterIndex,
                      name: cluster.name,
                      type: "cluster",
                    },
                    "cluster" + "_" + clusterIndex,
                    "cluster"
                  ),
                });
              }}
              className={`${
                clusterIndex == this.state.toggleNode.clusterId ? "active" : ""
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
      this.state.toggleNode.clusters &&
      this.state.treeData[vpcIndex].clusters[clusterIndex].products &&
      this.state.treeData[vpcIndex].clusters[clusterIndex].products.length
    ) {
      return this.state.treeData[vpcIndex].clusters[clusterIndex].products.map(
        (product, productIndex) => {
          return (
            <label
              className={`${
                productIndex == this.state.toggleNode.productId ? "active" : ""
              }`}
              key={productIndex}
              onClick={() => {
                this.setState({
                  toggleNode: {
                    ...this.state.toggleNode,
                    productId: productIndex,
                    products: true,
                  },
                  breadcrumbs: this.prepareBreadCrumbs(
                    {
                      id: "product" + "_" + productIndex,
                      name: product.name,
                      type: "product",
                    },
                    "product" + "_" + productIndex,
                    "product"
                  ),
                });
              }}
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
    return queryPrm.get("cloudName") || "";
  }
  getBreadCrumbs() {
    return (
      this.state.breadcrumbs &&
      this.state.breadcrumbs.map((data, index) => {
        return (
          <>
            {index > 0 ? (
              <li>
                <i class="far fa-chevron-right"></i>
              </li>
            ) : (
              <></>
            )}

            <li>
              <a>{data.name}</a>
            </li>
          </>
        );
      })
    );
  }
  getServiceName(name, type) {
    if (type == "vpc") {
      return name ? name.toUpperCase() : "";
    } else {
      let firstChar = name ? name.charAt(0).toUpperCase() : "";
      let otherStr = name ? name.toLowerCase().slice(1) : "";
      let string = firstChar + otherStr
      return string;
    }
  }
  handleToggleNode(type,index){
    // this.setState({
    //   toggleNode: {
    //     ...this.state.toggleNode,
    //     productId: productIndex,
    //     products: true,
    //   },
    // });
  }
  render() {
    const { showSelectFilter, showServiceViewFilter, activeTab } = this.state;
    return (
      <div className="discovered-assets">
        <div className="discovered-assets-head">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="environment-fliter">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showSelectFilter: !showSelectFilter,
                    })
                  }
                >
                  <i class="fas fa-filter fillter-icon"></i>
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
                  <i class="far fa-eye fillter-icon"></i>
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
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="d-inline-block width-100 text-right">
                <button class="new-button m-b-0">
                  <i className="fas fa-external-link-square-alt p-r-10"></i>
                  Export
                </button>
                <div className="search-box">
                  <div className="form-group search-control-group m-b-0">
                    <input
                      type="text"
                      className="input-group-text"
                      placeholder="Search"
                    />
                    <button className="search-btn">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="discovered-assets-body">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="services-panel">
                <div className="services-panel-title bottom-border">
                  <div className="name">Topology View</div>
                </div>
                {/* <div className="services-panel-body">
                  <div className="gmnoprint">
                    <div className="gmnoprint-plus-minus">
                      <button className="btn btn-plus">
                        <i class="fal fa-plus"></i>
                      </button>
                      <button className="btn btn-minus">
                        <i class="fal fa-minus"></i>
                      </button>
                    </div>
                    <div className="gmnoprint-map">
                      <button className="btn btn-map">
                        <i class="fal fa-map-marker-alt"></i>
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
                  <TransformWrapper>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                        <div className="gmnoprint">
                          <div className="gmnoprint-plus-minus">
                            <button
                              className="btn btn-plus"
                              onClick={() => zoomIn()}
                            >
                              <i class="fal fa-plus"></i>
                            </button>
                            <button
                              className="btn btn-minus"
                              onClick={() => zoomOut()}
                            >
                              <i class="fal fa-minus"></i>
                            </button>
                          </div>
                          <div className="gmnoprint-map">
                            <button className="btn btn-map">
                              <i class="fal fa-map-marker-alt"></i>
                            </button>
                          </div>
                        </div>
                        <TransformComponent
                          wrapperStyle={{ width: "100%", height: "100%" }}
                          contentStyle={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            paddingTop: "120px",
                            display: "flex",
                            transform: "translate(0px, 0px) scale(0)",
                          }}
                        >
                          <div
                            className="services-text-box active"
                            onClick={() => {
                              this.setState({
                                toggleNode: {
                                  ...this.state.toggleNode,
                                  VPCS: true,
                                  clusters: false,
                                  products: false,
                                  clusterId: null,
                                  vpcId: null,
                                  productId: null,
                                },
                                breadcrumbs: this.state.breadcrumbs.filter(
                                  (breadcrumb) => breadcrumb.id == "service"
                                ),
                              });
                            }}
                          >
                            {this.getCloudName()}
                          </div>
                          <div
                            className={` ${
                              this.state.treeData && this.state.treeData.length
                                ? "global-servies"
                                : ""
                            }`}
                          >
                            <ul>
                              {this.state.toggleNode.VPCS ? (
                                this.renderVPCData()
                              ) : (
                                <></>
                              )}
                            </ul>
                            <div
                              className="global-servies-menu"
                              style={{ display: "none" }}
                            >
                              <label className="active">
                                <span>
                                  <img src={VpcServicesIcon} alt="" />
                                </span>
                                Global servies
                              </label>
                            </div>
                          </div>
                          <div
                            className={` ${
                              this.state.toggleNode.clusters
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
                              {this.state.toggleNode.clusters ? (
                                this.renderClusters(this.state.toggleNode.vpcId)
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
                              this.state.toggleNode.products
                                ? "global-servies app-servies"
                                : ""
                            }`}
                          >
                            <div className="global-servies-menu">
                              {this.state.toggleNode.products ? (
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
                    )}
                  </TransformWrapper>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12">
              <div className="fliter-tabs">
                <div className="global-services-fliter">
                  <div className="heading">
                    <div className="breadcrumbs">
                      <ul>
                        {this.getBreadCrumbs()}
                        {/* <li>
                          <a href="#">AWS</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <a href="#">VPC 1</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <a href="#">Cluster 1</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <span>App Services</span>
                        </li> */}
                      </ul>
                    </div>
                    <button type="button" className="btn btn-ellipsis">
                      <i class="fas fa-ellipsis-v"></i>
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
                  <div className="table">
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
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
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
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
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
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
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
                className="environment-table-section"
                style={{ height: "395px" }}
              >
                <div className="table">
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
                      <tr>
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
                            <i class="fas fa-ellipsis-v"></i>
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
                      </tr>
                      <tr>
                        <td>VPC 2</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button type="button" className="list-icon">
                            <i class="fas fa-ellipsis-v"></i>
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
                            <i class="fas fa-ellipsis-v"></i>
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
                            <i class="fas fa-ellipsis-v"></i>
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
                            <i class="fas fa-ellipsis-v"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="fliter-tabs">
                <div className="global-services-fliter">
                  <div className="heading">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <a href="#">AWS</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <span>Global Services</span>
                        </li>
                      </ul>
                    </div>
                    <button type="button" className="btn btn-ellipsis">
                      <i class="fas fa-ellipsis-v"></i>
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
              </div>
              <div className="fliter-tabs">
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
                        <li>
                          <a href="#">AWS</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <span>VPC 1</span>
                        </li>
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
              <div className="fliter-tabs">
                <div className="global-services-fliter">
                  <div className="heading">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <a href="#">AWS</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <a href="#">VPC 1</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <a href="#">Cluster 1</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <span>App Services</span>
                        </li>
                      </ul>
                    </div>
                    <button type="button" className="btn btn-ellipsis">
                      <i class="fas fa-ellipsis-v"></i>
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
                  <div className="table">
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
                            <i class="fas fa-caret-right m-l-1"></i>
                          </td>
                          <td>
                            <div className="box red">2</div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
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
                            <i class="fas fa-caret-right m-l-1"></i>
                          </td>
                          <td>
                            <div className="box red">2</div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
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
                            <i class="fas fa-caret-right m-l-1"></i>
                          </td>
                          <td>
                            <div className="box red">2</div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
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
        </div>
      </div>
    );
  }
}

export default DiscoveredAssets;

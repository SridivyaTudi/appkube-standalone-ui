import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../img";
import { RestService } from "../_service/RestService";
import VpcServicesIcon from "../../../assets/img/assetmanager/vpc-services-icon.png";
import ClusterIcon from "../../../assets/img/assetmanager/cluster-icon.png";
import Aws from "../../../assets/img/aws.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

class AmazonServicesNew extends React.Component {
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
        productId:null
      },
    };

    // this.steps = [
    //   {
    //     name: "Discovered Assets",
    //     component: <DiscoveredAssets {...props} />,
    //   },
    //   {
    //     name: "Applications",
    //     component: <Applications {...props} />,
    //   },
    //   {
    //     name: "Billing",
    //     component: <Billing {...props} />,
    //   },
    //   {
    //     name: "Threat and Security Events",
    //     component: <ThreatAndSecurityEvents {...props} />,
    //   },
    //   {
    //     name: "Compliance Policies",
    //     component: <CompliancePolicies {...props} />,
    //   },
    //   {
    //     name: "Alerts",
    //     component: <Alerts {...props} />,
    //   },
    //   {
    //     name: "Inputs",
    //     component: <Inputs {...props} />,
    //   },
    // ];
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
                  clusters:true,
                  products: false,
                },
              });
            }}
          >
            <span>
              <img src={VpcServicesIcon} alt="" />
            </span>
            {vpc.name}
          </li>
        );
      });
    }
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
                    products:true,
                  },
                });
              }}
              className={`${
                clusterIndex == this.state.toggleNode.clusterId ? "active" : ""
              }`}
            >
              <span>
                <img src={ClusterIcon} alt="" />
              </span>
              {cluster.name}
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
            <label  className={`${
              productIndex == this.state.toggleNode.productId ? "active" : ""
            }`} key={productIndex}   onClick={() => {
                this.setState({
                  toggleNode: {
                    ...this.state.toggleNode,
                    productId:productIndex,
                    products:true,
                  },
                })}}>
              {product.name}
            </label>
          );
        }
      );
    }
  }
  
  render() {
    return (
      <div className="asset-container">
        <div className="services-panel">
          <div className="services-panel-title bottom-border">
            <div className="image">
              <img src={Aws} />
            </div>
            <div className="name">Amazon Web Services</div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <TransformWrapper >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <React.Fragment>
                    <div className="services-panel-body">
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
                          paddingTop: "50px",
                          display: "flex",
                          transform: "translate(0px, 0px) scale(0)",
                        }}
                      >
                        <div
                          className="services-text-box active"
                          onClick={() => {
                            this.setState({
                              toggleNode: {...this.state.toggleNode, VPCS: true,clusters:false },
                            });
                          }}
                        >
                          Amazon Web Services
                        </div>
                        <div
                          className={` ${
                            this.state.treeData && this.state.treeData.length
                              ? "global-servies"
                              : ""
                          }`}
                          style={{
                            marginTop: "0",
                            marginBottom: "0",
                            transform: "translateY(0%)",
                          }}
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
                          style={{
                            marginTop: "0",
                            marginBottom: "0",
                            transform: "translateY(0%)",
                          }}
                        >
                          <div
                            className="global-servies-menu"
                            style={{
                              marginTop: "0px",
                            }}
                          >
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
                    </div>
                  </React.Fragment>
                )}
              </TransformWrapper>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AmazonServicesNew;

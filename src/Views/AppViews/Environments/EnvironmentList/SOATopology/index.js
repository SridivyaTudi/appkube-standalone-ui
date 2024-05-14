import React, { Component } from "react";
import DrTopology from "Views/AppViews/Environments/EnvironmentList/ThreeTierTopology/DrTopology";
import { Box, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import TopologyView from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/Components/TopologyView";
import Container from "Views/AppViews/Environments/EnvironmentList/SOATopology/Components/Container";
import Lambda from "./Components/Lambda";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SslTableComponent from "Views/AppViews/Environments/EnvironmentList/SOATopologySwitch/SslTable";
import APIGatewayComponent from "Views/AppViews/Environments/EnvironmentList/SOATopologySwitch/APIGateway";
import LoadBalancerComponent from "Views/AppViews/Environments/EnvironmentList/SOATopologySwitch/LoadBalancer";
import ClusterComponent from "Views/AppViews/Environments/EnvironmentList/SOATopologySwitch/Cluster";
import IngressComponent from "Views/AppViews/Environments/EnvironmentList/SOATopologySwitch/Ingress";
import ServiceMeshComponent from "Views/AppViews/Environments/EnvironmentList/SOATopologySwitch/ServiceMesh";
import JavaSpringbootComponent from "Views/AppViews/Environments/EnvironmentList/SOATopologySwitch/JavaSpringboot";
import FunctionComponent from "../SOATopologySwitch/Function";
import PostgresqlComponent from "../SOATopologySwitch/Postgresql";
import OpensearchComponent from "../SOATopologySwitch/Opensearch";
import { getServiceView } from "Redux/ServiceViewTopology/ServiceViewTopologyThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import TabsMenu from "../TabsMenu";
import ServiceIcon from "assets/img/assetmanager/ems.png";
import { removeActiveTabInEnvironmentData } from "Utils";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
class SOATopology extends Component {
  tabMapping = [
    {
      name: "Topology",
      dataKey: "Topology",
    },
    {
      name: "DR Topology",
      dataKey: "DRTopology",
    },
    {
      name: "IOT Topology",
      dataKey: "IotTopology",
    },
    {
      name: "Lake Topology",
      dataKey: "LakeTopology",
    },
    {
      name: "Mesh Topology",
      dataKey: "MeshTopology",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isActivityViewDetails: false,
      activeServiceTopology: "",
      activeServiceChildTopology: "",
      toggleView: true,
      serviceViewData: {},
    };
  }

  componentDidMount = () => {
    const { landingZoneId, departmentName, environmentName, productName } =
      this.getUrlDetails();
    try {
      let params = `landingZoneId=${landingZoneId}&productName=${productName.replace(
        "%20",
        ""
      )}&departmentName=${departmentName.replace(
        "%20",
        ""
      )}&env=${environmentName.replace("%20", "")}&productType=SOA`;
      this.props.getServiceView(params);
    } catch (error) {
      console.error(error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.serviceView.status !== this.props.serviceView.status &&
      this.props.serviceView.status === status.SUCCESS
    ) {
      let responseServiceView = this.props.serviceView.data;

      if (responseServiceView && Object.keys(responseServiceView).length) {
        this.manipulateServiceViewData(responseServiceView);
      }
    }
  }
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  /** Get url details. */
  getUrlDetails() {
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    const landingZoneId = queryPrm.get("landingZoneId");
    const landingZone = queryPrm.get("landingZone");
    const productName = queryPrm.get("productName");
    const departmentName = queryPrm.get("departmentName");
    const environmentName = queryPrm.get("environmentName");

    return {
      landingZone,
      landingZoneId,
      cloudName,
      departmentName,
      environmentName,
      productName,
    };
  }

  setCurrentActiveNode = (node, nodeLevelData, nodeID) => {
    let { activeServiceTopology, activeServiceChildTopology } = this.state;
    let level1 = ["Common Service", "Business Service"];

    if (level1.includes(node)) {
      activeServiceTopology = "";
      activeServiceChildTopology = "";
    } else {
      if (nodeLevelData.length === 4 || !level1.includes(node)) {
        if (nodeLevelData[2]) {
          let firstLevelIndex = parseInt(nodeLevelData[1].split(".")[1]);
          activeServiceTopology =
            firstLevelIndex === 0 ? "container" : "lambda";
        }
      }
    }

    this.setState({ activeServiceTopology, activeServiceChildTopology });
  };

  /** Manipulate Service View Data.
   * @param {Object} data - The data of the service view.
   */
  manipulateServiceViewData = (data = {}) => {
    let { application = "", businessServices = [], commonServices = [] } = data;

    let serviceViewData = {
      landingZone: application,
      image: ServiceIcon,
      productEnclaveList: [
        {
          id: v4(),
          instanceName: "Business Service",
          instanceId: "Business Service",
          image: "",
          productEnclaveList: [],
          globalServiceList: [],
        },
        {
          id: v4(),
          instanceName: "Common Service",
          instanceId: "Common Service",
          productEnclaveList: [],
          globalServiceList: [],
        },
      ],
      globalServiceList: [],
    };

    if (businessServices?.length || commonServices?.length) {
      let businessServicesModules = [];
      let commonServicesModules = [];
      businessServices.forEach((service, index) => {
        let isModuleNameExist = businessServicesModules.find(
          (module) => module.moduleName === service.moduleName
        );

        if (!isModuleNameExist) {
          businessServicesModules.push({
            ...service,
            instanceId: service.moduleName,
            instanceName: service.moduleName,
            id: service.id + "_business_" + index,
            productEnclaveList: this.manipulateProductData(
              businessServices,
              service.moduleName
            ),
            globalServiceList: [],
          });
        }
      });

      commonServices.forEach((service, index) => {
        let isModuleNameExist = commonServicesModules.find(
          (module) => module.moduleName === service.moduleName
        );
        if (!isModuleNameExist) {
          commonServicesModules.push({
            ...service,
            instanceId: service.moduleName,
            instanceName: service.moduleName,
            id: service.id + "_common_" + index,
            productEnclaveList: this.manipulateProductData(
              commonServices,
              service.moduleName
            ),
            globalServiceList: [],
          });
        }
      });
      serviceViewData.productEnclaveList[0].productEnclaveList =
        businessServicesModules;
      serviceViewData.productEnclaveList[1].productEnclaveList =
        commonServicesModules;
    } else {
      serviceViewData = {};
    }

    this.setState({ serviceViewData });
  };

  manipulateProductData = (data, moduleName) => {
    let products = [];
    if (data?.length) {
      data.forEach((product) => {
        if (product.moduleName === moduleName) {
          products.push({
            ...product,
            instanceId: product.serviceName,
            productEnclaveList: [],
            globalServiceList: [],
          });
        }
      });
    }
    return products;
  };
  renderComponent = () => {
    let { activeServiceChildTopology } = this.state;
    return activeServiceChildTopology === "SSL" ? (
      <SslTableComponent />
    ) : activeServiceChildTopology === "APIGateway" ? (
      <APIGatewayComponent />
    ) : activeServiceChildTopology === "LoadBalancer" ? (
      <LoadBalancerComponent />
    ) : activeServiceChildTopology === "Cluster" ? (
      <ClusterComponent />
    ) : activeServiceChildTopology === "Ingress" ? (
      <IngressComponent />
    ) : activeServiceChildTopology === "ServiceMesh" ? (
      <ServiceMeshComponent />
    ) : activeServiceChildTopology === "JavaSpringbot" ? (
      <JavaSpringbootComponent />
    ) : activeServiceChildTopology === "PostgreSQL" ? (
      <PostgresqlComponent />
    ) : activeServiceChildTopology === "Opensearch" ? (
      <OpensearchComponent />
    ) : activeServiceChildTopology === "Function" ? (
      <FunctionComponent />
    ) : (
      <></>
    );
  };

  renderTopologyTitle = () => {
    return (
      <Box className="services-panel-title bottom-border">
        <Box className="name">Service View Topology </Box>
      </Box>
    );
  };

  renderToggleViewIconBtn = () => {
    let { toggleView } = this.state;
    return (
      <IconButton
        size="small"
        className="open-close"
        onClick={() => this.setState({ toggleView: !toggleView })}
      >
        <KeyboardArrowLeftIcon fontSize="inherit" />
      </IconButton>
    );
  };

  renderTopologyView = () => {
    const { activeServiceChildTopology, toggleView, serviceViewData } =
      this.state;
    const serviceViewDataLength = Object.keys(serviceViewData).length;
    let { serviceView } = this.props;
    return (
      <Grid item xs={6} style={{ display: `${toggleView ? "" : "none"}` }}>
        <Box className="services-panel">
          {this.renderTopologyTitle()}

          {[serviceView.status].includes(status.IN_PROGRESS) ? (
            <Loader className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20" />
          ) : (
            <Box className="services-panel-body">
              {activeServiceChildTopology ? (
                this.renderToggleViewIconBtn()
              ) : (
                <></>
              )}
              {serviceViewDataLength ? (
                <TopologyView
                  data={serviceViewData}
                  parentCssClass="infra-toplogy-view"
                  setCurrentActiveNode={this.setCurrentActiveNode}
                />
              ) : (
                <></>
              )}
            </Box>
          )}
        </Box>
        {toggleView ? this.renderComponent() : ""}
      </Grid>
    );
  };

  renderWithOutToggleView = () => {
    let { toggleView } = this.state;
    return (
      <Grid item xs={6} style={{ display: `${toggleView ? "none" : "block"}` }}>
        {this.renderComponent()}
      </Grid>
    );
  };

  renderContainerOrLambdaComponent = () => {
    const { activeServiceTopology, activeServiceChildTopology, toggleView } =
      this.state;
    return activeServiceTopology === "container" ? (
      <Container
        toggleView={toggleView}
        activeServiceChildTopology={activeServiceChildTopology}
        setCurrentActiveNode={(activeServiceChildTopology, toggleView) => {
          this.setState({
            activeServiceChildTopology,
            toggleView,
          });
        }}
      />
    ) : activeServiceTopology === "lambda" ? (
      <Lambda
        toggleView={toggleView}
        activeServiceChildTopology={activeServiceChildTopology}
        setCurrentActiveNode={(activeServiceChildTopology, toggleView) => {
          this.setState({
            activeServiceChildTopology,
            toggleView,
          });
        }}
      />
    ) : (
      <></>
    );
  };
  render() {
    const { activeTab } = this.state;
    const { landingZone, landingZoneId, cloudName, productName } =
      this.getUrlDetails();

    return (
      <Box className="disaster-recovery-container environment-container">
        <Box className="list-heading">
          <HtmlTooltip className="table-tooltip" title={productName}>
            <h3>{productName}</h3>
          </HtmlTooltip>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <HtmlTooltip
                  className="table-tooltip"
                  title={<span>Environments</span>}
                >
                  <Link
                    to={`${APP_PREFIX_PATH}/assets/environments`}
                    onClick={() => removeActiveTabInEnvironmentData()}
                  >
                    Environments
                  </Link>
                </HtmlTooltip>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <HtmlTooltip
                  className="table-tooltip"
                  title={
                    <>
                      {cloudName} &nbsp;(
                      {landingZone})
                    </>
                  }
                >
                  <Link
                    to={`${APP_PREFIX_PATH}/assets/environments/environmentlist?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}`}
                  >
                    {cloudName} &nbsp;(
                    {landingZone})
                  </Link>
                </HtmlTooltip>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">
                <HtmlTooltip className="table-tooltip" title={productName}>
                  <span>{productName}</span>
                </HtmlTooltip>
              </li>
            </ul>
          </Box>
        </Box>
        <Box className="services-panel-tabs">
          <Box className="tabs-head text-center ">
            <TabsMenu
              tabs={this.tabMapping}
              setActiveTab={this.setActiveTab}
              activeTab={activeTab}
              breakWidth={767}
              key={v4()}
            />
          </Box>
          <Box className="tabs-content">
            <Box
              className={`environment-container p-0`}
              style={{ display: `${activeTab === 0 ? "block" : "none"}` }}
            >
              <Box className="discovered-assets">
                <Box className="discovered-assets-body">
                  <Grid
                    container
                    // rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    {this.renderTopologyView()}
                    {this.renderContainerOrLambdaComponent()}
                    {this.renderWithOutToggleView()}
                  </Grid>
                </Box>
              </Box>
            </Box>

            {activeTab === 1 && (
              <DrTopology
                redirectViewDetails={() => {
                  this.setState({ isActivityViewDetails: true });
                }}
              />
            )}
            {activeTab === 2 && <Box>IOT Topology</Box>}
            {activeTab === 3 && <Box>Lake Topology</Box>}
            {activeTab === 4 && <Box>Mesh Topology</Box>}
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  const { serviceView } = state.serviceTopology;
  return { serviceView };
};

const mapDispatchToProps = {
  getServiceView,
};

export default connect(mapStateToProps, mapDispatchToProps)(SOATopology);

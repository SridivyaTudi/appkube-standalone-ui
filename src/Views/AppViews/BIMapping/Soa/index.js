import React, { Component } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import ChartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import DataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";
import deployed1 from "../../../../assets/img/bimapping/deployed1.png";
import deployed4 from "../../../../assets/img/bimapping/deployed4.png";
import deployed5 from "../../../../assets/img/bimapping/deployed5.png";
import Aws from "../../../../assets/img/aws.png";
import LoadBalancer from "./components/LoadBalancer";
import Ingress from "./components/Ingress";
import Service from "./components/Service";
import AppTopology from "./components/AppTopology";
import LoadBalancerIcon from "../../../../assets/img/bimapping/load-balancer-icon.png";
import IngressIcon from "../../../../assets/img/bimapping/ingress-icon.png";
import ServiceIcon from "../../../../assets/img/bimapping/service-icon.png";
import StarIcon from "../../../../assets/img/bimapping/star-icon.png";
import { v4 } from "uuid";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import TitleIconWithInfoOfCard from "Components/TitleIconWithInfoOfCard";
import VerticalTitleAndIconOfCard from "Components/VerticalTitleAndIconOfCard";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import {
  getBiServicesFromProductCategory,
  getCloudServices,
  getInstancesServices,
} from "Redux/BIMapping/BIMappingThunk";
import { PRODUCT_CATEGORY_ENUM, SERVICES_CATEGORY_OF_SOA_ENUM } from "Utils";
import { connect } from "react-redux";
let serviceTableData = [
  {
    name: "MockDB",
    port: 80,
  },
  {
    name: "DummyWebServer",
    port: 443,
  },
  {
    name: "SimulatedQueue",
    port: 443,
  },
  {
    name: "PseudoAnalytics",
    port: 21,
  },
  {
    name: "PhantomCache",
    port: 53,
  },
];
class Soa extends Component {
  tabMapping = [
    {
      image: LoadBalancerIcon,
      name: "Load Balancer",
      dataKey: "loadbalancer",
      type: ["loadbalancer"],
    },
    {
      image: IngressIcon,
      name: "Ingress",
      dataKey: "ingress",
      type: ["ingress"],
    },
    {
      image: ServiceIcon,
      name: "Service",
      dataKey: "service",
      type: ["service"],
    },
    {
      image: StarIcon,
      name: "App Topology",
      dataKey: "apptopology",
      type: ["apptopology"],
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      currentActiveNode: "",
      activeLayer: "",
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
      activeTabEks: 0,
      deployedInstances: [],
      selectedServiceData: {
        app: "",
        data: "",
        other: "",
      },
      selectedInstance: -1,
      selectedDeployedInstance: "",
      selectedService: [],
      savedData: [],
      savedService: {
        app: false,
        data: false,
        other: false,
      },
      dropDownServiceData: {
        appService: [],
        dataService: [],
        otherService: [],
      },
      instancesServices: [],
    };
  }

  componentDidMount = () => {
    window.addEventListener("load", this.redirectPage);
    this.props.getCloudServices();
    this.props.getBiServicesFromProductCategory({
      productCategory: PRODUCT_CATEGORY_ENUM.SOA,
    });
  };

  componentWillUnmount() {
    window.removeEventListener("load", this.redirectPage);
  }

  redirectPage = () => {
    let { name } = this.getUrlDetails();
    this.props.navigate(`${APP_PREFIX_PATH}/bim/add-product/${name}`);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.biServicesFromProductCategory.status !==
        this.props.biServicesFromProductCategory.status &&
      this.props.biServicesFromProductCategory.status === status.SUCCESS &&
      this.props.biServicesFromProductCategory?.data
    ) {
      let data = this.props.biServicesFromProductCategory?.data || [];
      this.manipulateServiceData(data);
    }

    if (
      prevProps.cloudServices.status !== this.props.cloudServices.status &&
      this.props.cloudServices.status === status.SUCCESS &&
      this.props.cloudServices?.data
    ) {
      let deployedInstances = this.props.cloudServices?.data || [];
      this.setState({ deployedInstances });
    }

    if (
      prevProps.instancesServices.status !==
        this.props.instancesServices.status &&
      this.props.instancesServices.status === status.SUCCESS &&
      this.props.instancesServices?.data
    ) {
      let instancesServices = this.props.instancesServices?.data || [];
      this.setState({ instancesServices });
    }
  }

  manipulateServiceData = (data) => {
    let {
      dropDownServiceData: { appService, dataService, otherService },
    } = this.state;
    let SERVICES_CATEGORY = SERVICES_CATEGORY_OF_SOA_ENUM;

    data.forEach((service) => {
      if (service.serviceCategory === SERVICES_CATEGORY.OTHER) {
        otherService.push(service);
      } else if (service.serviceCategory === SERVICES_CATEGORY.APP) {
        appService.push(service);
      } else if (service.serviceCategory === SERVICES_CATEGORY.DATA) {
        dataService.push(service);
      }
    });

    this.setState({
      dropDownServiceData: { appService, dataService, otherService },
    });
  };

  setActiveTab = (activeTabEks) => {
    this.setState({ activeTabEks });
  };

  toggleAppService = () => {
    let { savedService } = this.state;
    if (!savedService.app) {
      this.setState({
        isSelectSpringBootOpen: !this.state.isSelectSpringBootOpen,
      });
    }
  };
  toggleDataLayer = () => {
    let { savedService } = this.state;
    if (savedService.app && !savedService.data) {
      this.setState({
        isSelectMySQLOpen: !this.state.isSelectMySQLOpen,
      });
    }
  };
  toggleOtherServices = () => {
    let { savedService } = this.state;
    if (savedService.data && !savedService.other) {
      this.setState({
        isSelectRedisOpen: !this.state.isSelectRedisOpen,
      });
    }
  };

  renderDeployedInstances = () => {
    let { deployedInstances, selectedDeployedInstance } = this.state;
    let cloudStatus = this.props.cloudServices?.status;
    if (cloudStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      if (deployedInstances?.length) {
        return deployedInstances.map((instance) => {
          let deployInstances = {
            label: instance.elementType,
            image: instance.image || deployed1,
            active: instance.id === selectedDeployedInstance ? "active" : "",
          };
          return (
            <VerticalTitleAndIconOfCard
              data={deployInstances}
              onClickCard={(title) =>
                this.onClickDeployedCard(
                  instance.id,
                  instance.name,
                  instance.elementType
                )
              }
            />
          );
        });
      } else {
        return this.renderNoDataHtml("There are no data available.");
      }
    }
  };

  renderDeployedInstanceWrapper = () => {
    let { isShowDepolyedSection } = this.state;
    if (isShowDepolyedSection) {
      return (
        <Box className="deployed-section">
          <Box className="deployed-head">
            <h4 className="m-t-0">Deployed to</h4>
          </Box>
          <Box className="deployed-content">
            <Box className="deployed-cards">
              {this.renderDeployedInstances()}
            </Box>
          </Box>
        </Box>
      );
    }
  };

  renderSelectedInstance = () => {
    let { selectedDeployedInstance, selectedInstance, instancesServices } =
      this.state;
    let instanceStatus = this.props.instancesServices?.status;
    if (instanceStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      if (instancesServices?.length) {
        return instancesServices.map((instance, index) => {
          const data = [
            {
              backgroundColor: "#FFBA69",
              label: "ID",
              value: instance.instanceId,
              style: { borderBottom: "none" },
            },
            {
              backgroundColor: "#8676FF",
              label: "Name : ",
              value: instance.instanceName,
              style: { borderBottom: "none" },
            },
            {
              backgroundColor: "#FF2D2E",
              label: "VPC Id: ",
              value: instance.productEnclaveInstanceId,
              style: { borderBottom: "none" },
            },
          ];
          let instanceData = {
            image: Aws,
            title: instance.elementType,
            data,
            active: selectedInstance === instance.id ? "active" : "",
            style: { width: "150px", minHeight: "150px" },
          };
          return (
            <Box className="bimapping-instance-cards">
              <TitleIconWithInfoOfCard
                cardDetails={instanceData}
                onClickCard={(details) => this.onClickInstance(instance.id)}
              />
            </Box>
          );
        });
      } else {
        return this.renderNoDataHtml("There are no data available.");
      }
    }
  };

  renderSelectedInstanceWrapper = () => {
    let { selectedDeployedInstance } = this.state;
    return selectedDeployedInstance ? (
      <Box className="deployed-section m-t-4">
        <Box className="deployed-head">
          <h4 className="m-t-0">Select Instance</h4>
        </Box>
        <Box className="deployed-content">
          <Box className="environment-boxs">
            {this.renderSelectedInstance()}
          </Box>
        </Box>
      </Box>
    ) : (
      <></>
    );
  };

  onClickServiceDropDown = (key, value) => {
    let { selectedServiceData } = this.state;
    selectedServiceData[key] = value;

    this.setState({
      selectedServiceData,
      isShowDepolyedSection: true,
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
    });
  };

  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="center" component="th" scope="row">
            Servicename
          </TableCell>
          <TableCell align="center">Port Details</TableCell>
          <TableCell align="center">Department URL</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  renderTableBody = () => {
    let { selectedService } = this.state;
    return (
      <TableBody>
        {serviceTableData.map((service, index) => {
          return (
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  className="check-box"
                  size="small"
                  id={index}
                  onChange={this.handleCheckBox}
                  checked={selectedService.includes(index)}
                />
                <span
                  onClick={() =>
                    this.handleCheckBox({
                      target: {
                        id: index,
                        checked: !selectedService.includes(index),
                      },
                    })
                  }
                >
                  {service.name}
                </span>
              </TableCell>
              <TableCell align="center">{service.port}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedService } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedService.push(+id);
    } else {
      selectedService = selectedService.filter((value) => value !== +id);
    }

    this.setState({ selectedService });
  };

  onClickSave = () => {
    let {
      savedService,
      savedData,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      isShowDepolyedSection,
    } = this.state;
    let serviceName = "";

    if (!savedService.app) {
      savedService.app = true;
      serviceName = "app";
    } else if (!savedService.data) {
      savedService.data = true;
      serviceName = "data";
    } else if (!savedService.other) {
      savedService.other = true;
      serviceName = "other";
      this.props.navigate(`${APP_PREFIX_PATH}/bim`);
    }

    savedData.push({
      serviceName,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
    });

    selectedInstance = -1;
    selectedDeployedInstance = "";
    selectedService = [];
    isShowDepolyedSection = false;

    this.setState({
      savedService,
      savedData,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      isShowDepolyedSection,
    });
  };

  onClickInstance = (selectedInstance) => {
    this.setState({ selectedInstance });
  };

  onClickDeployedCard = (selectedDeployedInstance, cloudName, elementType) => {
    this.props.getInstancesServices({ cloudName, elementType });
    this.setState({
      selectedDeployedInstance,
      selectedInstance: -1,
      activeTabEks: 0,
    });
  };

  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  };

  renderNoDataHtml = (text) => {
    return (
      <Box className="group-loader  h-100  m-r-auto m-l-auto  p-t-20 p-b-20">
        <h5 className="m-t-0 m-b-0">{text}</h5>
      </Box>
    );
  };

  /** Get url details. */
  getUrlDetails() {
    let name = this.props.params.name;
    return { name };
  }
  render() {
    let {
      isSelectSpringBootOpen,
      isSelectMySQLOpen,
      isSelectRedisOpen,
      selectedServiceData,
      activeTabEks,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      dropDownServiceData,savedService
    } = this.state;
    let { biServicesFromProductCategory, createProductFormData } = this.props;
    return (
      <Box className="bimapping-container">
        <Box className="global-services-fliter">
          <Box className="heading">
            <Box className="breadcrumbs">
              <ul>
                <li>
                  <p>BI-Mapping</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>
                  <p>Add Product</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>

                <li className="active">
                  <p>Product Category</p>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
        <Box className="tier-container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Box className="topology-panel">
                <Box className="topology-panel-body">
                  <h4 className="m-t-0 m-b-0">Module : Admission</h4>
                  {biServicesFromProductCategory.status ===
                  status.IN_PROGRESS ? (
                    this.renderLoder()
                  ) : (
                    <Box className="topology-inner-content">
                      <Box className="content-left">
                        <List>
                          <ListItem>
                            <Box className="button-box">
                              <span>
                                <img src={ChartAppLayerIcon} alt="" />
                              </span>
                              <p>App Service</p>
                            </Box>
                            <span>
                              <img src={RightArrow} alt="" />
                            </span>
                          </ListItem>
                          <ListItem>
                            <Box className="button-box">
                              <span>
                                <img src={DataServiceSvgrepo} alt="" />
                              </span>
                              <p>Data Service</p>
                            </Box>
                            <span>
                              <img src={RightArrow} alt="" />
                            </span>
                          </ListItem>
                          <ListItem>
                            <Box className="button-box">
                              <span>
                                <img src={DataServiceSvgrepo} alt="" />
                              </span>
                              <p>Other Service</p>
                            </Box>
                            <span>
                              <img src={RightArrow} alt="" />
                            </span>
                          </ListItem>
                        </List>
                      </Box>
                      <Box className="content-middle">
                        <List>
                          <ListItem>
                            <Box className="application-balancer">
                              <Button
                                className="secondary-btn min-width"
                                variant="contained"
                              >
                                SSL
                              </Button>
                              <Box className="balancer-boxs">
                                <Box className="balancer-box">
                                  <span>
                                    <img src={bottomArrow} alt="" />
                                  </span>
                                </Box>
                              </Box>
                            </Box>
                          </ListItem>
                          <ListItem className={`active`}>
                            <Box className="application-balancer">
                              <Button
                                className="secondary-btn min-width"
                                variant="contained"
                              >
                                API Gateway
                              </Button>
                              <Box className="balancer-boxs">
                                <Box className="balancer-box">
                                  <span>
                                    <img src={bottomArrow} alt="" />
                                  </span>
                                </Box>
                              </Box>
                            </Box>
                          </ListItem>
                          <ListItem
                            className={`  ${
                              dropDownServiceData.appService.includes(
                                selectedServiceData.app
                              )
                                ? "active"
                                : ""
                            }`}
                          >
                            <Box className="application-balancer">
                              <Box className="mapping-fliter">
                                <Box
                                  className="fliter-toggel"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    this.toggleAppService();
                                  }}
                                >
                                  {selectedServiceData.app.name || "Select"}
                                  <i className="fa-solid fa-caret-down arrow-icon"></i>
                                </Box>
                                <Box
                                  className={
                                    isSelectSpringBootOpen
                                      ? "fliter-collapse active"
                                      : "fliter-collapse"
                                  }
                                >
                                  <List>
                                    {dropDownServiceData.appService.map(
                                      (service) => (
                                        <ListItem
                                          className={`${
                                            selectedServiceData.app.id ===
                                            service.id
                                              ? "active"
                                              : ""
                                          }`}
                                          key={v4()}
                                          onClick={() =>
                                            this.onClickServiceDropDown("app", {
                                              id: service.id,
                                              name: service.name,
                                            })
                                          }
                                        >
                                          <i className="fa-solid fa-circle-dot"></i>
                                          {service.name}
                                        </ListItem>
                                      )
                                    )}
                                  </List>
                                </Box>
                                <div
                                  className={
                                    isSelectSpringBootOpen
                                      ? "fliters-collapse-bg active"
                                      : "fliters-collapse-bg"
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    this.toggleAppService();
                                  }}
                                />
                              </Box>
                              <Box className="balancer-boxs">
                                <Box className="balancer-box">
                                  <span>
                                    <img src={bottomArrow} alt="" />
                                  </span>
                                </Box>
                              </Box>
                            </Box>
                          </ListItem>
                          <ListItem
                            className={`${
                              dropDownServiceData.dataService.includes(
                                selectedServiceData.data
                              )
                                ? "active"
                                : ""
                            }`}
                          >
                            <Box className="application-balancer">
                              <Box className="mapping-fliter">
                                <Box
                                  className="fliter-toggel"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    this.toggleDataLayer();
                                  }}
                                >
                                  {selectedServiceData.data || "Select"}
                                  <i className="fa-solid fa-caret-down arrow-icon"></i>
                                </Box>
                                <Box
                                  className={
                                    isSelectMySQLOpen
                                      ? "fliter-collapse active"
                                      : "fliter-collapse"
                                  }
                                >
                                  <List>
                                    {dropDownServiceData.dataService.map(
                                      (service) => (
                                        <ListItem
                                          className={`${
                                            selectedServiceData.data ===
                                            service.name
                                              ? "active"
                                              : ""
                                          }`}
                                          key={v4()}
                                          onClick={() =>
                                            this.onClickServiceDropDown(
                                              "data",
                                              service.name
                                            )
                                          }
                                        >
                                          <i className="fa-solid fa-circle-dot"></i>
                                          {service.name}
                                        </ListItem>
                                      )
                                    )}
                                  </List>
                                </Box>
                                <div
                                  className={
                                    isSelectMySQLOpen
                                      ? "fliters-collapse-bg active"
                                      : "fliters-collapse-bg"
                                  }
                                  onClick={this.toggleDataLayer}
                                />
                              </Box>
                              <Box className="balancer-boxs">
                                <Box className="balancer-box">
                                  <span>
                                    <img src={bottomArrow} alt="" />
                                  </span>
                                </Box>
                              </Box>
                            </Box>
                          </ListItem>
                          <ListItem
                            className={`  ${
                              dropDownServiceData.otherService.includes(
                                selectedServiceData.other
                              )
                                ? "active"
                                : ""
                            }
                          }`}
                          >
                            <Box className="mapping-fliter">
                              <Box
                                className="fliter-toggel"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.toggleOtherServices();
                                }}
                              >
                                {selectedServiceData.other || "Select"}
                                <i className="fa-solid fa-caret-down arrow-icon"></i>
                              </Box>
                              <Box
                                className={
                                  isSelectRedisOpen
                                    ? "fliter-collapse active"
                                    : "fliter-collapse"
                                }
                              >
                                <List>
                                  {dropDownServiceData.otherService.map(
                                    (service) => (
                                      <ListItem
                                        className={`${
                                          selectedServiceData.other ===
                                          service.name
                                            ? "active"
                                            : ""
                                        }`}
                                        key={v4()}
                                        onClick={() =>
                                          this.onClickServiceDropDown(
                                            "other",
                                            service.name
                                          )
                                        }
                                      >
                                        <i className="fa-solid fa-circle-dot"></i>
                                        {service.name}
                                      </ListItem>
                                    )
                                  )}
                                </List>
                              </Box>
                              <div
                                className={
                                  isSelectRedisOpen
                                    ? "fliters-collapse-bg active"
                                    : "fliters-collapse-bg"
                                }
                                onClick={this.toggleOtherServices}
                              />
                            </Box>
                          </ListItem>
                        </List>
                        <Box className="check-icons-box">
                          <List>
                            <ListItem>
                              <i className="fa-sharp fa-solid fa-circle-check"></i>
                            </ListItem>
                            {Object.keys(selectedServiceData).map((key) => {
                              return selectedServiceData[key] !== "" &&
                                savedService[key] ? (
                                <ListItem>
                                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                                </ListItem>
                              ) : (
                                <></>
                              );
                            })}
                          </List>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="nginx-cards">
                {this.renderDeployedInstanceWrapper()}
                {this.renderSelectedInstanceWrapper()}
              </Box>
            </Grid>
          </Grid>
          {selectedInstance >= 0 ? (
            selectedDeployedInstance === "EkS" ? (
              <Box className="nginx-section">
                <Box className="tabs">
                  <List className="tabs-menu">
                    {this.tabMapping.map((tabData, index) => {
                      return (
                        <ListItem
                          key={`ops-tab-${index}`}
                          className={index === activeTabEks ? "active" : ""}
                          onClick={() => this.setActiveTab(index)}
                        >
                          <Box className="m-r-2">
                            <img src={tabData.image} alt="" />
                          </Box>
                          {tabData.name}
                        </ListItem>
                      );
                    })}
                  </List>
                  <Box className="tabs-content">
                    {activeTabEks === 0 ? (
                      <LoadBalancer
                        setNextTab={(activeTabEks) => {
                          this.setState({ activeTabEks });
                        }}
                      />
                    ) : activeTabEks === 1 ? (
                      <Ingress
                        setNextTab={(activeTabEks) => {
                          this.setState({ activeTabEks });
                        }}
                      />
                    ) : activeTabEks === 2 ? (
                      <Service
                        setNextTab={(activeTabEks) => {
                          this.setState({ activeTabEks });
                        }}
                      />
                    ) : activeTabEks === 3 ? (
                      <AppTopology />
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              </Box>
            ) : (
              <>
                <Box className="tier-table-section m-t-4">
                  <TableContainer className="table">
                    <Table className="overview">
                      {this.renderTableHead()}
                      {this.renderTableBody()}
                    </Table>
                  </TableContainer>
                </Box>
              </>
            )
          ) : (
            <></>
          )}

          {selectedInstance >= 0 ? (
            <Box justifyContent={"center"} className="text-center m-t-4">
              <Button
                className={` ${
                  selectedService.length || activeTabEks === 3 ? "" : "info-btn"
                } primary-btn min-width-inherit`}
                variant="contained"
                onClick={() =>
                  selectedService.length || activeTabEks === 3 ? (
                    this.onClickSave()
                  ) : (
                    <></>
                  )
                }
              >
                Save
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const {
    biServicesFromProductCategory,
    createProductFormData,
    cloudServices,
    instancesServices,
  } = state.biMapping;
  return {
    biServicesFromProductCategory,
    createProductFormData,
    cloudServices,
    instancesServices,
  };
}

const mapDispatchToProps = {
  getBiServicesFromProductCategory,
  getCloudServices,
  getInstancesServices,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Soa));

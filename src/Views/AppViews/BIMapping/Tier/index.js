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
import ChartWebLayerIcon from "assets/img/assetmanager/chart-web-layer-icon.png";
import ChartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import DataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";
import deployed1 from "assets/img/bimapping/deployed1.png";

import Aws from "assets/img/aws.png";
import { v4 } from "uuid";
import LoadBalancer from "../Soa/components/LoadBalancer";
import Ingress from "../Soa/components/Ingress";
import Service from "../Soa/components/Service";
import AppTopology from "../Soa/components/AppTopology";
import LoadBalancerIcon from "assets/img/bimapping/load-balancer-icon.png";
import IngressIcon from "assets/img/bimapping/ingress-icon.png";
import ServiceIcon from "assets/img/bimapping/service-icon.png";
import StarIcon from "assets/img/bimapping/star-icon.png";
import TitleIconWithInfoOfCard from "Components/TitleIconWithInfoOfCard";
import VerticalTitleAndIconOfCard from "Components/VerticalTitleAndIconOfCard";
import {
  getBiServicesFromProductCategory,
  getCloudServices,
  getInstancesServices,
} from "Redux/BIMapping/BIMappingThunk";
import {
  PRODUCT_CATEGORY_ENUM,
  SERVICES_CATEGORY_OF_THREE_TIER_ENUM,
  getSingleValueFromLocalStorage,
  setSingleValueInLocalStorage,
  removeSingleValueFromLocalStorage,
} from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

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

class Tier extends Component {
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
      isSelectNginxOpen: false,
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
      cloudServices: [],
      savedData: [],
      selectedLayer: {
        web: "",
        app: "",
        data: "",
        aux: "",
      },
      isShowDepolyedSection: false,
      selectedInstance: -1,
      selectedDeployedInstance: "",
      selectedService: [],
      savedLayer: {
        web: false,
        app: false,
        data: false,
        aux: false,
      },
      dropDownLayersData: {
        webLayer: [],
        appLayer: [],
        dataLayer: [],
        auxLayer: [],
      },
      activeTabEks: 0,
      instancesServices: [],
    };
  }

  componentDidMount = () => {
    window.addEventListener("load", this.redirectPage);
    window.addEventListener("beforeunload", () => {
      setSingleValueInLocalStorage(
        "departmentName",
        this.props?.createProductFormData?.departmentName
      );
    });

    this.props.getBiServicesFromProductCategory({
      productCategory: PRODUCT_CATEGORY_ENUM.THREE_TIER,
    });
  };

  componentWillUnmount() {
    window.removeEventListener("load", this.redirectPage);
  }

  redirectPage = () => {
    let departMentName = getSingleValueFromLocalStorage("departmentName");
    removeSingleValueFromLocalStorage("departmentName");
    this.props.navigate(`${APP_PREFIX_PATH}/bim/add-product/${departMentName}`);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.biServicesFromProductCategory.status !==
        this.props.biServicesFromProductCategory.status &&
      this.props.biServicesFromProductCategory.status === status.SUCCESS &&
      this.props.biServicesFromProductCategory?.data
    ) {
      let data = this.props.biServicesFromProductCategory?.data || [];
      if (data.length) {
        this.manipulateLayersData(data);
      }
    }

    if (
      prevProps.cloudServices.status !== this.props.cloudServices.status &&
      this.props.cloudServices.status === status.SUCCESS &&
      this.props.cloudServices?.data
    ) {
      let cloudServices = this.props.cloudServices?.data || [];
      this.setState({ cloudServices });
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

  manipulateLayersData = (data) => {
    let {
      dropDownLayersData: { webLayer, appLayer, auxLayer, dataLayer },
    } = this.state;
    let SERVICES_CATEGORY = SERVICES_CATEGORY_OF_THREE_TIER_ENUM;

    data.forEach((service) => {
      if (service.serviceCategory === SERVICES_CATEGORY.WEB) {
        webLayer.push(service);
      } else if (service.serviceCategory === SERVICES_CATEGORY.APP) {
        appLayer.push(service);
      } else if (service.serviceCategory === SERVICES_CATEGORY.DATA) {
        dataLayer.push(service);
      } else if (service.serviceCategory === SERVICES_CATEGORY.AUX) {
        auxLayer.push(service);
      }
    });

    this.setState({
      dropDownLayersData: { webLayer, appLayer, auxLayer, dataLayer },
    });
  };

  toggleWebLayer = () => {
    let { savedLayer } = this.state;
    if (!savedLayer.web) {
      this.setState({
        isSelectNginxOpen: !this.state.isSelectNginxOpen,
      });
    }
  };

  toggleAppLayer = () => {
    let { savedLayer } = this.state;

    if (savedLayer.web && !savedLayer.app) {
      this.setState({
        isSelectSpringBootOpen: !this.state.isSelectSpringBootOpen,
      });
    }
  };

  toggleDataLayer = () => {
    let { savedLayer } = this.state;

    if (!savedLayer.data && savedLayer.app) {
      this.setState({
        isSelectMySQLOpen: !this.state.isSelectMySQLOpen,
      });
    }
  };

  toggleAuxLayer = () => {
    let { savedLayer } = this.state;
    if (savedLayer.data && !savedLayer.aux) {
      this.setState({
        isSelectRedisOpen: !this.state.isSelectRedisOpen,
      });
    }
  };

  renderDeployedInstances = () => {
    let { cloudServices, selectedDeployedInstance } = this.state;
    let cloudStatus = this.props.cloudServices?.status;
    if (cloudStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      if (cloudServices?.length) {
        return cloudServices.map((instance) => {
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

  onClickDeployedCard = (selectedDeployedInstance, cloudName, elementType) => {
    this.props.getInstancesServices({ cloudName, elementType });
    this.setState({
      selectedDeployedInstance,
      selectedInstance: -1,
      activeTabEks: 0,
    });
  };

  renderSelectedInstance = () => {
    let { selectedInstance, instancesServices } = this.state;
    let instanceStatus = this.props.instancesServices?.status;

    if (instanceStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      if (instancesServices?.length) {
        return instancesServices.map((instance, index) => {
          let data = [
            {
              backgroundColor: "#FFBA69",
              label: "ID",
              value: instance.instanceId,
              style: { borderBottom: "none" },
            },
            {
              backgroundColor: "#8676FF",
              label: "Key",
              value: instance.instanceName,
              style: { borderBottom: "none" },
            },
            {
              backgroundColor: "#FF2D2E",
              label: "Value",
              value: "-",
              style: { borderBottom: "none" },
            },
          ];
  
          let instanceData = {
            image: Aws,
            title: instance.elementType,
            data,
            active: selectedInstance === instance.id ? "active" : "",
            rowSeperatedByline: false,
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

  onClickLayerDropDown = (key, value) => {
    let { selectedLayer } = this.state;
    selectedLayer[key] = value;

    this.props.getCloudServices();

    this.setState({
      selectedLayer,
      isShowDepolyedSection: true,
      isSelectNginxOpen: false,
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
      selectedDeployedInstance: "",
      selectedInstance: -1,
      selectedDeployedInstance: "",
    });
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

  onClickSave = () => {
    let {
      savedLayer,
      savedData,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      isShowDepolyedSection,
    } = this.state;
    let layerName = "";

    if (!savedLayer.web) {
      savedLayer.web = true;
      layerName = "web";
    } else if (!savedLayer.app) {
      savedLayer.app = true;
      layerName = "app";
    } else if (!savedLayer.data) {
      savedLayer.data = true;
      layerName = "data";
    } else if (!savedLayer.aux) {
      savedLayer.aux = true;
      layerName = "aux";
    }

    savedData.push({
      layerName,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
    });

    selectedInstance = -1;
    selectedDeployedInstance = "";
    selectedService = [];
    isShowDepolyedSection = false;

    this.setState({
      savedLayer,
      savedData,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      isShowDepolyedSection,
    });
  };

  setActiveTab = (activeTabEks) => {
    this.setState({ activeTabEks });
  };

  onClickInstance = (selectedInstance) => {
    this.setState({ selectedInstance });
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
  render() {
    let {
      isSelectNginxOpen,
      isSelectSpringBootOpen,
      isSelectMySQLOpen,
      isSelectRedisOpen,
      selectedLayer,
      selectedInstance,
      selectedService,
      selectedDeployedInstance,
      activeTabEks,
      dropDownLayersData,
    } = this.state;
    let { biServicesFromProductCategory, createProductFormData } = this.props;
    return (
      <Box className="bimapping-container">
        <Box className="global-services-fliter">
          <Box className="heading">
            <Box className="breadcrumbs">
              <ul>
                <li>
                  <p>Synectiks</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>
                  <p>{createProductFormData?.departmentName}</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>
                  <p>{createProductFormData?.productName}</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">
                  <p>3 Tier</p>
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
                                <img src={ChartWebLayerIcon} alt="" />
                              </span>
                              <p>Web Layer</p>
                            </Box>
                            <span>
                              <img src={RightArrow} alt="" />
                            </span>
                          </ListItem>
                          <ListItem>
                            <Box className="button-box">
                              <span>
                                <img src={ChartAppLayerIcon} alt="" />
                              </span>
                              <p>App Layer</p>
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
                              <p>Data Layer</p>
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
                              <p>AUX Layer</p>
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
                          <ListItem>
                            <Box className="application-balancer">
                              <Box className="mapping-fliter">
                                <Box
                                  className="fliter-toggel"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    this.toggleWebLayer();
                                  }}
                                >
                                  {selectedLayer.web || "Select"}
                                  <i className="fa-solid fa-caret-down arrow-icon"></i>
                                </Box>
                                <Box
                                  className={
                                    isSelectNginxOpen
                                      ? "fliter-collapse active"
                                      : "fliter-collapse"
                                  }
                                >
                                  <List>
                                    {dropDownLayersData.webLayer.map(
                                      (layer) => (
                                        <ListItem
                                          key={v4()}
                                          className={`${
                                            selectedLayer.web === layer.name
                                              ? "active"
                                              : ""
                                          }`}
                                          onClick={() =>
                                            this.onClickLayerDropDown(
                                              "web",
                                              layer.name
                                            )
                                          }
                                        >
                                          <i className="fa-solid fa-circle-dot"></i>{" "}
                                          {layer.name}
                                        </ListItem>
                                      )
                                    )}
                                  </List>
                                </Box>
                                <div
                                  className={
                                    isSelectNginxOpen
                                      ? "fliters-collapse-bg active"
                                      : "fliters-collapse-bg"
                                  }
                                  onClick={(e) => {
                                    this.toggleWebLayer();
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
                            className={`  ${
                              dropDownLayersData.appLayer.includes(
                                selectedLayer.app
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
                                    this.toggleAppLayer();
                                  }}
                                >
                                  {selectedLayer.app || "Select"}
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
                                    {dropDownLayersData.appLayer.map(
                                      (layer) => (
                                        <ListItem
                                          key={v4()}
                                          onClick={() =>
                                            this.onClickLayerDropDown(
                                              "app",
                                              layer.name
                                            )
                                          }
                                          className={`${
                                            selectedLayer.app === layer.name
                                              ? "active"
                                              : ""
                                          }`}
                                        >
                                          <i className="fa-solid fa-circle-dot"></i>
                                          {layer.name}
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
                                    this.toggleAppLayer();
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
                            className={`  ${
                              dropDownLayersData.dataLayer.includes(
                                selectedLayer.data
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
                                  {selectedLayer.data || "Select"}
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
                                    {dropDownLayersData.dataLayer.map(
                                      (layer) => (
                                        <ListItem
                                          key={v4()}
                                          onClick={() =>
                                            this.onClickLayerDropDown(
                                              "data",
                                              layer.name
                                            )
                                          }
                                          className={`${
                                            selectedLayer.data === layer.name
                                              ? "active"
                                              : ""
                                          }`}
                                        >
                                          <i className="fa-solid fa-circle-dot"></i>
                                          {layer.name}
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
                                  onClick={(e) => {
                                    this.toggleDataLayer();
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
                            className={`  ${
                              dropDownLayersData.auxLayer.includes(
                                selectedLayer.aux
                              )
                                ? "active"
                                : ""
                            }`}
                          >
                            <Box className="mapping-fliter">
                              <Box
                                className="fliter-toggel"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.toggleAuxLayer();
                                }}
                              >
                                {selectedLayer.aux || "Select"}
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
                                  {dropDownLayersData.auxLayer.map((layer) => (
                                    <ListItem
                                      key={v4()}
                                      onClick={() =>
                                        this.onClickLayerDropDown(
                                          "aux",
                                          layer.name
                                        )
                                      }
                                      className={`${
                                        selectedLayer.aux === layer.name
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <i className="fa-solid fa-circle-dot"></i>
                                      {layer.name}
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                              <div
                                className={
                                  isSelectRedisOpen
                                    ? "fliters-collapse-bg active"
                                    : "fliters-collapse-bg"
                                }
                                onClick={(e) => {
                                  this.toggleAuxLayer();
                                }}
                              />
                            </Box>
                          </ListItem>
                        </List>
                        <Box className="check-icons-box">
                          <List>
                            {Object.keys(selectedLayer).map((key) => {
                              return selectedLayer[key] !== "" ? (
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
                      <Box className="content-right">
                        <List>
                          <ListItem>
                            <Box className="add-button">
                              <i className="fa-solid fa-plus"></i>
                            </Box>
                          </ListItem>
                          <ListItem>
                            <Box className="add-button">
                              <i className="fa-solid fa-plus"></i>
                            </Box>
                          </ListItem>
                        </List>
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
)(navigateRouter(Tier));

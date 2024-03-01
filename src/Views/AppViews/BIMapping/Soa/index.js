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
  IconButton,
} from "@mui/material";
import ChartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import DataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";
import deployed1 from "../../../../assets/img/bimapping/deployed1.png";
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
import {
  PRODUCT_CATEGORY_ENUM,
  SERVICES_CATEGORY_OF_SOA_ENUM,
  ADD_PRODUCT_ENUMS,
} from "Utils";
import { connect } from "react-redux";
import CommonTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ManagementInfo from "../Soa/components/ManagementInfo";
import ConfigInfo from "../Soa/components/ConfigInfo";
const HtmlTooltip = styled(({ className, ...props }) => (
  <CommonTooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
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
  tabMappingECS = [
    {
      name: "Management Info",
      dataKey: "managementinfo",
      type: ["managementinfo"],
    },
    {
      name: "Config Info",
      dataKey: "configinfo",
      type: ["configinfo"],
    },
  ];
  showManagementInfoTab = [
    ADD_PRODUCT_ENUMS.EC2,
    ADD_PRODUCT_ENUMS.EKS,
    ADD_PRODUCT_ENUMS.ECS,
    ADD_PRODUCT_ENUMS.LAMBDA,
    ADD_PRODUCT_ENUMS.S3,
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
      cloudElementType: "",
      clickConfigInfoIdAddEntry: "",
      clickManInfoIdAddEntry: "",
      activeTabEcs: 0,
      cloudName: "",
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

  setActiveTab = (id, isECS = 0) => {
    let { activeTabEcs, activeTabEks } = this.state;
    if (isECS) {
      activeTabEcs = id;
    } else {
      activeTabEks = id;
    }
    this.setState({ activeTabEcs, activeTabEks });
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
    let { selectedInstance, instancesServices } = this.state;
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
      cloudElementType,
      cloudName,
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
      cloudElementType,
      cloudName,
      serviceName,
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
    this.setState({ selectedInstance, selectedService: [] });
  };

  onClickDeployedCard = (selectedDeployedInstance, cloudName, elementType) => {
    this.props.getInstancesServices({ cloudName, elementType });
    this.setState({
      selectedDeployedInstance,
      selectedInstance: -1,
      activeTabEks: 0,
      cloudElementType: elementType,
      cloudName,
    });
  };

  onClickEditBtn = (serviceName) => {
    let { savedData, savedService, isShowDepolyedSection } = this.state;

    let findSaveData = savedData.find(
      (data) => data.serviceName === serviceName
    );

    if (findSaveData) {
      let {
        selectedInstance,
        selectedDeployedInstance,
        selectedService,
        cloudElementType: elementType,
        cloudName,
      } = findSaveData;
      this.props.getInstancesServices({ cloudName, elementType });

      Object.keys(savedService).forEach((key) => {
        if (serviceName === key) {
          savedService[serviceName] = false;
        } else {
          savedService[key] = true;
        }
      });

      isShowDepolyedSection = true;

      this.setState({
        selectedInstance,
        selectedDeployedInstance,
        selectedService,
        savedService,
        cloudElementType: elementType,
        isShowDepolyedSection,
      });
    }
  };

  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 m-r-auto m-l-auto ">
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
      selectedService,
      dropDownServiceData,
      savedService,
      cloudElementType,
      activeTabEcs,
      clickConfigInfoIdAddEntry,
      clickManInfoIdAddEntry,
      isShowDepolyedSection,
    } = this.state;
    let { biServicesFromProductCategory, createProductFormData } = this.props;
    let { name } = this.getUrlDetails();
    let isShowManagementInfoTab = this.showManagementInfoTab.includes(
      cloudElementType?.toUpperCase()
    );
    let isSaveEnable =
      selectedService.length || activeTabEks === 3 || isShowManagementInfoTab;
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Soa</h3>
          <Box className="breadcrumbs">
            <ul>
              <li onClick={() => this.props.navigate("/app/bim")}>
                BI-Mapping
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li
                onClick={() =>
                  this.props.navigate(`/app/bim/add-product/${name}`)
                }
              >
                Add Product
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li
                onClick={() =>
                  this.props.navigate(
                    `/app/bim/add-product/${name}/product-category`
                  )
                }
              >
                Product Category
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Service-Mapping</li>
            </ul>
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
                  <h4 className="m-t-0 m-b-0">
                    MODULE : {createProductFormData.moduleName}
                  </h4>
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
                                          <HtmlTooltip
                                            className="table-tooltip"
                                            title={service.name}
                                          >
                                            <p>{service.name}</p>
                                          </HtmlTooltip>
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
                                          <HtmlTooltip
                                            className="table-tooltip"
                                            title={service.name}
                                          >
                                            <p>{service.name}</p>
                                          </HtmlTooltip>
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
                                        <HtmlTooltip
                                          className="table-tooltip"
                                          title={service.name}
                                        >
                                          <p>{service.name}</p>
                                        </HtmlTooltip>
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
                              <Box className="d-flex align-items-center">
                                <IconButton className="check-icon">
                                  <i class="fas fa-check"></i>
                                </IconButton>
                                <IconButton className="edit-icon">
                                  <i class="fas fa-edit"></i>
                                </IconButton>
                              </Box>
                            </ListItem>

                            {Object.keys(selectedServiceData).map((key) => {
                              return (
                                <ListItem>
                                  <Box className="d-flex align-items-center">
                                    {selectedServiceData[key] !== "" &&
                                    savedService[key] ? (
                                      <>
                                        <IconButton className="check-icon">
                                          <i class="fas fa-check"></i>
                                        </IconButton>
                                        <IconButton
                                          className="edit-icon"
                                          onClick={() => {
                                            this.onClickEditBtn(key);
                                          }}
                                        >
                                          <i class="fas fa-edit"></i>
                                        </IconButton>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </Box>
                                </ListItem>
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
              {isShowDepolyedSection ? (
                <Box className="nginx-cards">
                  {this.renderDeployedInstanceWrapper()}
                  {this.renderSelectedInstanceWrapper()}
                </Box>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
          {selectedInstance >= 0 ? (
            cloudElementType?.toUpperCase() === ADD_PRODUCT_ENUMS.CDN ? (
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
            ) : isShowManagementInfoTab ? (
              <Box className="nginx-section">
                <Box className="tabs">
                  <List className="tabs-menu">
                    {this.tabMappingECS.map((tabData, index) => {
                      return (
                        <ListItem
                          key={`ops-tab-${index}`}
                          className={index === activeTabEcs ? "active" : ""}
                          onClick={() => this.setActiveTab(index, 1)}
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
                    <ManagementInfo
                      setNextTab={(activeTabEcs) => {
                        this.setState({ activeTabEcs });
                      }}
                      selectedCloudElement={cloudElementType?.toUpperCase()}
                      onClickAddEntryBtn={clickManInfoIdAddEntry}
                      style={{ display: activeTabEcs === 0 ? "" : "none" }}
                    />

                    <ConfigInfo
                      setNextTab={(activeTabEcs) => {
                        this.setState({ activeTabEcs });
                      }}
                      selectedCloudElement={cloudElementType?.toUpperCase()}
                      onClickAddEntryBtn={clickConfigInfoIdAddEntry}
                      style={{ display: activeTabEcs === 1 ? "" : "none" }}
                    />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box className="tier-table-section m-t-4">
                <TableContainer className="table">
                  <Table className="overview">
                    {this.renderTableHead()}
                    {this.renderTableBody()}
                  </Table>
                </TableContainer>
              </Box>
            )
          ) : (
            <></>
          )}

          {selectedInstance >= 0 ? (
            <Box className="width-100 m-t-3">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4} alignItems={"flex-start"}>
                  {isShowManagementInfoTab ? (
                    <Button
                      className={` primary-btn min-width-inherit`}
                      variant="contained"
                      onClick={() => {
                        let {
                          clickConfigInfoIdAddEntry,
                          clickManInfoIdAddEntry,
                        } = this.state;

                        if (activeTabEcs === 0) {
                          clickManInfoIdAddEntry = v4();
                        } else {
                          clickConfigInfoIdAddEntry = v4();
                        }
                        this.setState({
                          clickConfigInfoIdAddEntry,
                          clickManInfoIdAddEntry,
                        });
                      }}
                    >
                      <i className="fa-sharp fa-solid fa-plus m-r-1"></i>
                      Add Entry
                    </Button>
                  ) : (
                    <></>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <Box className="d-block text-center">
                    <Button
                      className={` ${
                        isSaveEnable ? "" : "info-btn"
                      } primary-btn min-width-inherit`}
                      variant="contained"
                      onClick={() =>
                        isSaveEnable ? this.onClickSave() : <></>
                      }
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
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

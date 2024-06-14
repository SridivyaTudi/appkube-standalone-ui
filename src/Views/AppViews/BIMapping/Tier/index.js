import React, { Component } from "react";
import { Box, Button, Grid, List, ListItem, IconButton } from "@mui/material";
import ChartWebLayerIcon from "assets/img/assetmanager/chart-web-layer-icon.png";
import ChartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import DataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";
import deployed1 from "assets/img/bimapping/deployed1.png";
import LoadingButton from "@mui/lab/LoadingButton";
import { v4 } from "uuid";
import LoadBalancerIcon from "assets/img/bimapping/load-balancer-icon.png";
import IngressIcon from "assets/img/bimapping/ingress-icon.png";
import ServiceIcon from "assets/img/bimapping/service-icon.png";
import StarIcon from "assets/img/bimapping/star-icon.png";
import VerticalTitleAndIconOfCard from "Components/VerticalTitleAndIconOfCard";
import {
  getBiServicesFromProductCategory,
  getCloudServices,
  getInstancesServices,
  createBiMapping,
} from "Redux/BIMapping/BIMappingThunk";
import {
  PRODUCT_CATEGORY_ENUM,
  SERVICES_CATEGORY_OF_THREE_TIER_ENUM,
  ADD_PRODUCT_ENUMS,
  getCurrentOrgId,
} from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import ManagementInfo from "../Soa/components/ManagementInfo";
import ConfigInfo from "../Soa/components/ConfigInfo";
import CommonTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { setProductIntoDepartment } from "Redux/BIMapping/BIMappingSlice";
import InstanceListCards from "Views/AppViews/BIMapping/Components/InstanceListCards";
import { ToastMessage } from "Toast/ToastMessage";
import { LOGOS, STATUS } from "CommonData";

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

const LAYERS = [
  {
    name: "Web Layer",
    icon: ChartWebLayerIcon,
  },
  {
    name: "App Layer",
    icon: ChartAppLayerIcon,
  },
  {
    name: "Data Layer",
    icon: DataServiceSvgrepo,
  },
  {
    name: "AUX Layer",
    icon: DataServiceSvgrepo,
  },
];

const orgId = getCurrentOrgId();
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
      isSelectNginxOpen: false,
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
      cloudServices: [],
      savedData: [],
      selectedLayer: {
        SSL: "",
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
        SSL: false,
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
      cloudElementType: "",
      activeTabEcs: 0,
      cloudName: "",
      editStatus: false,
      managementInfo: [],
      configInfo: [],
      activeServiceCategory: "",
      skipSteps: {
        SSL: false,
        web: false,
        app: false,
        data: false,
        aux: false,
      },
    };
  }

  componentDidMount = () => {
    window.addEventListener("load", this.redirectPage);
    this.props.getBiServicesFromProductCategory({
      productCategory: PRODUCT_CATEGORY_ENUM.THREE_TIER,
    });
    this.previousDataView();
  };

  // Redux data view
  previousDataView = () => {
    let { createProductFormData } = this.props;

    if (createProductFormData["3_tierData"]) {
      try {
        let { savedLayer, savedData, selectedLayer, skipSteps } =
          createProductFormData["3_tierData"];
        this.setState({
          savedLayer: JSON.parse(JSON.stringify(savedLayer)),
          savedData: JSON.parse(JSON.stringify(savedData)),
          selectedLayer: JSON.parse(JSON.stringify(selectedLayer)),
          skipSteps: JSON.parse(JSON.stringify(skipSteps)),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      let { cloud } = this.getUrlDetails();
      this.onClickDeployedCard(
        ADD_PRODUCT_ENUMS.SSL,
        cloud,
        ADD_PRODUCT_ENUMS.SSL
      );
    }
  };

  componentWillUnmount() {
    window.removeEventListener("load", this.redirectPage);
  }

  // Redirect of the page
  redirectPage = () => {
    let { name, id, landingZoneId, cloud } = this.getUrlDetails();
    this.props.navigate(
      `${APP_PREFIX_PATH}/bim/add-product/${name}/${id}/${landingZoneId}/${cloud}`
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.biServicesFromProductCategory.status !==
        this.props.biServicesFromProductCategory.status &&
      this.props.biServicesFromProductCategory.status === status.SUCCESS &&
      this.props.biServicesFromProductCategory?.data
    ) {
      let data = this.props.biServicesFromProductCategory?.data || [];
      this.manipulateLayersData(data);
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

    if (
      prevProps.creationBiMapping.status !==
        this.props.creationBiMapping.status &&
      this.props.creationBiMapping.status === status.SUCCESS
    ) {
      if (this.props.creationBiMapping?.data) {
        let response = this.props.creationBiMapping?.data;
        if (response) {
          ToastMessage.success("Product added in department.");
          this.props.navigate(`${APP_PREFIX_PATH}/bim`);
        }
      } else {
        let resetData = {
          SSL: false,
          web: false,
          app: false,
          data: false,
          aux: false,
        };
        this.setState({
          skipSteps: resetData,
          savedLayer: resetData,
        });
        ToastMessage.error("Creation Of Add BI-mapping Failed.");
      }
    }
  }

  // Manipulate layers data.
  manipulateLayersData = (data) => {
    let {
      dropDownLayersData: { webLayer, appLayer, auxLayer, dataLayer },
    } = this.state;
    let SERVICES_CATEGORY = SERVICES_CATEGORY_OF_THREE_TIER_ENUM;
    webLayer = [];
    appLayer = [];
    auxLayer = [];
    dataLayer = [];
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

  // Toggle web layer  dropdown.
  toggleWebLayer = () => {
    let { savedLayer } = this.state;
    if (savedLayer.SSL && !savedLayer.web) {
      this.setState({
        isSelectNginxOpen: !this.state.isSelectNginxOpen,
      });
    }
  };

  // Toggle app layer dropdown.
  toggleAppLayer = () => {
    let { savedLayer } = this.state;

    if (savedLayer.web && !savedLayer.app) {
      this.setState({
        isSelectSpringBootOpen: !this.state.isSelectSpringBootOpen,
      });
    }
  };

  // Toggle data layer dropdown.
  toggleDataLayer = () => {
    let { savedLayer } = this.state;

    if (!savedLayer.data && savedLayer.app) {
      this.setState({
        isSelectMySQLOpen: !this.state.isSelectMySQLOpen,
      });
    }
  };

  // Toggle aux layer dropdown.
  toggleAuxLayer = () => {
    let { savedLayer } = this.state;
    if (savedLayer.data && !savedLayer.aux) {
      this.setState({
        isSelectRedisOpen: !this.state.isSelectRedisOpen,
      });
    }
  };

  // Render Deployed cards
  renderDeployedInstances = () => {
    let { cloudServices, selectedDeployedInstance } = this.state;

    let cloudStatus = this.props.cloudServices?.status;
    let instanceStatus =
      this.props.instancesServices?.status !== status.IN_PROGRESS;
    if (cloudStatus === status.IN_PROGRESS) {
      return this.renderLoder("deployed-cards-loader");
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
              onClickCard={(title) => {
                if (instanceStatus) {
                  this.onClickDeployedCard(
                    instance.id,
                    instance.name,
                    instance.elementType
                  );
                }
              }}
            />
          );
        });
      } else {
        return this.renderNoDataHtml("There are no data available.");
      }
    }
  };

  // Click on deployed card
  onClickDeployedCard = (selectedDeployedInstance, cloudName, elementType) => {
    let { landingZoneId } = this.getUrlDetails();
    let { selectedLayer } = this.state;

    if (selectedDeployedInstance === ADD_PRODUCT_ENUMS.SSL) {
      selectedLayer[ADD_PRODUCT_ENUMS.SSL] = ADD_PRODUCT_ENUMS.SSL;
    }

    this.props.getInstancesServices({
      cloudName,
      elementType,
      landingZoneId,
    });

    this.setState({
      selectedDeployedInstance,
      selectedInstance: -1,
      activeTabEks: 0,
      cloudElementType: elementType,
      cloudName,
      selectedLayer,
    });
  };

  // Render Instance list
  renderSelectedInstance = () => {
    let { selectedInstance, instancesServices } = this.state;
    let instanceStatus = this.props.instancesServices?.status;

    if (instanceStatus === status.IN_PROGRESS) {
      return this.renderLoder("instance-cards-loder");
    } else {
      if (instancesServices?.length) {
        let preparedData = instancesServices.map((instance, index) => {
          let data = [
            {
              backgroundColor: "#FFBA69",
              label: "ID :",
              value: instance.instanceId,
              style: { borderBottom: "none" },
            },
            {
              backgroundColor: "#8676FF",
              label: "Name :",
              value: instance.instanceName,
              style: { borderBottom: "none" },
            },
            {
              backgroundColor: "#FF2D2E",
              label: "VPC Id :",
              value: instance.productEnclaveInstanceId,
              style: { borderBottom: "none" },
            },
          ];

          let instanceData = {
            image: LOGOS[instance?.cloud?.toUpperCase()],
            title: instance.elementType,
            data,
            id: instance.id,
            active: selectedInstance === instance.id ? "active" : "",
            rowSeperatedByline: false,
            // style: { width: "150px", minHeight: "150px" },
          };
          return instanceData;
        });

        return (
          <InstanceListCards
            cards={preparedData}
            onClickCard={(details) => this.onClickInstance(details.id)}
          />
        );
      } else {
        return this.renderNoDataHtml("There are no data available.");
      }
    }
  };

  // Render Selected Instance section
  renderSelectedInstanceWrapper = () => {
    let { selectedDeployedInstance, isShowDepolyedSection } = this.state;

    return selectedDeployedInstance ? (
      <Box
        className={`deployed-section ${isShowDepolyedSection ? "m-t-4" : ""} `}
      >
        <Box
          className="deployed-head m-b-3 d-flex align-items-center"
          justifyContent={"space-between"}
        >
          <h4 className="m-t-0 m-b-0">Select Instance</h4>
        </Box>
        <Box className="deployed-content">
          <Box className="instance-list-cards">
            {this.renderSelectedInstance()}
          </Box>
        </Box>
      </Box>
    ) : (
      <></>
    );
  };

  // Render Deployed section
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

  // Click on layer drop down
  onClickLayerDropDown = (key, value) => {
    let { selectedLayer, activeServiceCategory } = this.state;
    selectedLayer[key] = value;

    if (activeServiceCategory !== key) {
      this.props.getCloudServices({
        serviceCategory: key,
        productCategory: PRODUCT_CATEGORY_ENUM.THREE_TIER,
      });
      activeServiceCategory = key;
    }

    this.setState({
      selectedLayer,
      isShowDepolyedSection: true,
      isSelectNginxOpen: false,
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
      selectedDeployedInstance: "",
      selectedInstance: -1,
      cloudElementType: "",
      activeServiceCategory,
    });
  };

  // Click on save btn
  onClickSave = (isSkipStep = 0) => {
    let {
      savedLayer,
      savedData,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      isShowDepolyedSection,
      cloudElementType,
      cloudName,
      selectedLayer,
      configInfo,
      managementInfo,
      editStatus,
      skipSteps,
    } = this.state;
    let { createProductFormData } = this.props;
    let layerName = "";
    let skipArr = Object.keys(skipSteps) || [];
    let isAllSkipStep = true;

    skipArr.forEach((skip) => {
      if (!skipSteps[skip]) {
        isAllSkipStep = false;
      }
    });
    let saveBtnCheck =
      savedLayer.SSL &&
      savedLayer.web &&
      savedLayer.app &&
      savedLayer.data &&
      savedLayer.aux &&
      !isSkipStep;
    if (saveBtnCheck) {
      if (isAllSkipStep) {
        ToastMessage.error("Please save the at least one layer.");
        return 0;
      } else {
        this.addBiMappingAPICall(savedData);
      }
    } else {
      if (!savedLayer.SSL) {
        savedLayer.SSL = true;
        layerName = "SSL";
      } else if (!savedLayer.web) {
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
      let currentSaveData = {
        layerName,
        selectedInstance,
        selectedDeployedInstance,
        selectedService,
        cloudElementType,
        cloudName,
        configInfo,
        managementInfo,
      };

      if (isSkipStep) {
        currentSaveData["selectedInstance"] = -1;
        currentSaveData["selectedDeployedInstance"] = "";
        currentSaveData["selectedService"] = [];
        currentSaveData["configInfo"] = [];
        currentSaveData["managementInfo"] = [];
        selectedLayer[layerName] = "";
      }

      if (editStatus) {
        savedData = savedData.map((previousData) => {
          if (previousData.layerName === layerName) {
            return currentSaveData;
          }
          return previousData;
        });
      } else {
        savedData.push(currentSaveData);
      }

      selectedInstance = -1;
      selectedDeployedInstance = "";
      selectedService = [];
      isShowDepolyedSection = false;
      configInfo = [];
      managementInfo = [];
    }

    skipSteps[layerName] = isSkipStep > 0 ? true : false;

    this.setState({
      savedLayer,
      savedData,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      isShowDepolyedSection,
      configInfo,
      managementInfo,
      editStatus: false,
      activeTabEcs: 0,
      skipSteps,
    });
    let passData = JSON.parse(
      JSON.stringify({
        ...createProductFormData,
        "3_tierData": { savedLayer, savedData, selectedLayer, skipSteps },
        soaData: null,
      })
    );

    this.props.setProductIntoDepartment(passData);
  };

  // set active tab
  setActiveTab = (id, isECS = 0) => {
    let { activeTabEcs, activeTabEks } = this.state;
    if (isECS) {
      activeTabEcs = id;
    } else {
      activeTabEks = id;
    }
    this.setState({ activeTabEcs, activeTabEks });
  };

  // On click instance
  onClickInstance = (selectedInstance) => {
    this.setState({ selectedInstance, configInfo: [], managementInfo: [] });
  };

  // Render loder
  renderLoder = (customClass) => {
    return (
      <Box className={`d-blck text-center ${customClass}`}>
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  };

  // when data is no found , then render the this html
  renderNoDataHtml = (text) => {
    return (
      <Box className="group-loader instance-cards-loder text-center">
        <h5 className="m-t-0 m-b-0 d-inline-block">{text}</h5>
      </Box>
    );
  };

  /** Get url details. */
  getUrlDetails() {
    let name = this.props.params.name;
    let id = this.props.params.id;
    let landingZoneId = this.props.params.landingZoneId;
    let cloud = this.props.params.cloud;

    return { name, id, landingZoneId, cloud };
  }

  // Click on edit btn.
  onClickEditBtn = (layerName) => {
    let {
      savedData,
      savedLayer,
      isShowDepolyedSection,
      selectedLayer,
      skipSteps,
    } = this.state;
    let { createProductFormData } = this.props;

    let layers = createProductFormData["3_tierData"]?.selectedLayer;
    if (layers) {
      selectedLayer = JSON.parse(JSON.stringify(layers));
    }

    let findSaveData = savedData.find((data) => data.layerName === layerName);

    if (findSaveData) {
      let {
        selectedInstance,
        selectedDeployedInstance,
        selectedService,
        cloudElementType: elementType,
        cloudName,
        managementInfo,
        configInfo,
        layerName,
      } = findSaveData;
      let { landingZoneId } = this.getUrlDetails();

      this.props.getInstancesServices({
        cloudName,
        elementType,
        landingZoneId,
      });

      Object.keys(savedLayer).forEach((key) => {
        if (layerName === key) {
          savedLayer[layerName] = false;
        } else {
          let previousEditData = savedData.find(
            (data) => data.layerName === key
          );
          if (previousEditData) {
            savedLayer[key] = true;
          }
        }
      });

      if (layerName === ADD_PRODUCT_ENUMS.SSL) {
        isShowDepolyedSection = false;
        selectedLayer[ADD_PRODUCT_ENUMS.SSL] = ADD_PRODUCT_ENUMS.SSL;
        selectedDeployedInstance = ADD_PRODUCT_ENUMS.SSL;
      } else {
        if (!skipSteps[layerName]) {
          isShowDepolyedSection = true;
          this.onClickLayerDropDown(layerName, selectedLayer[layerName]);
        } else {
          isShowDepolyedSection = false;
        }
      }

      this.setState({
        selectedInstance,
        selectedDeployedInstance,
        selectedService,
        savedLayer,
        cloudElementType: elementType,
        isShowDepolyedSection,
        managementInfo,
        configInfo,
        layerName,
        selectedLayer,
      });
    }
  };

  // Add BI-mapping API call
  addBiMappingAPICall = (savedData) => {
    let { id } = this.getUrlDetails();
    let { selectedLayer } = this.state;
    let {
      createProductFormData: { productName, environment },
    } = this.props;
    let params = {
      org: {
        id: +orgId,
        dep: {
          id: +id,
          product: {
            name: productName,
            type: PRODUCT_CATEGORY_ENUM.THREE_TIER,
            productEnv: {
              name: environment,
              service: savedData.map((service) => {
                return {
                  name: selectedLayer[service.layerName],
                  type: service.layerName?.toUpperCase(),
                  cloudElementMapping: {
                    id: service.selectedInstance,
                    managementInfo: service.managementInfo.map((management) => {
                      let { endPoint, query } = management;

                      let formatData = {
                        key: endPoint,
                        value: query,
                      };
                      return formatData;
                    }),
                    configInfo: service.configInfo.map((config) => {
                      let { endPoint, query } = config;

                      let formatData = {
                        key: endPoint,
                        value: query,
                      };
                      return formatData;
                    }),
                  },
                };
              }),
            },
          },
        },
      },
    };

    this.props.createBiMapping(params);
  };

  // Render heading
  renderHeading = () => {
    let { name, id, landingZoneId, cloud } = this.getUrlDetails();
    return (
      <Box className="list-heading">
        <h3>3 Tier</h3>
        <Box className="breadcrumbs">
          <ul>
            <li onClick={() => this.props.navigate(`${APP_PREFIX_PATH}/bim`)}>
              BI-Mapping
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li
              onClick={() =>
                this.props.navigate(
                  `${APP_PREFIX_PATH}/bim/add-product/${name}/${id}/${landingZoneId}/${cloud}`
                )
              }
            >
              Add Product
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li className="active">Product Category</li>
          </ul>
        </Box>
      </Box>
    );
  };

  // Render all layers
  renderAllLayers = () => {
    return (
      <Box className="content-left">
        <List>
          {LAYERS.map((layer) => {
            return (
              <ListItem key={v4()}>
                <Box className="button-box">
                  <span>
                    <img src={layer.icon} alt="" />
                  </span>
                  <p>{layer.name}</p>
                </Box>
                <span>
                  <img src={RightArrow} alt="" />
                </span>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  };

  // Render all layers of dropDowns
  renderAllLayersOfDropDowns = () => {
    let {
      isSelectNginxOpen,
      isSelectSpringBootOpen,
      isSelectMySQLOpen,
      isSelectRedisOpen,
      selectedLayer,
      dropDownLayersData,
      savedLayer,
      skipSteps,
    } = this.state;
    return (
      <Box className="content-middle">
        <List>
          <ListItem className={`${!savedLayer.SSL ? "active" : ""}`}>
            <Box className="application-balancer">
              <Button className="secondary-btn min-width" variant="contained">
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
                    {dropDownLayersData.webLayer.map((layer) => (
                      <ListItem
                        key={v4()}
                        className={`${
                          layer?.status?.toUpperCase() === STATUS.ACTIVE
                            ? ""
                            : "disabled"
                        } ${selectedLayer.web === layer.name ? "active" : ""}`}
                        onClick={() =>
                          layer?.status?.toUpperCase() === STATUS.ACTIVE ? (
                            this.onClickLayerDropDown("web", layer.name)
                          ) : (
                            <></>
                          )
                        }
                      >
                        <i className="fa-solid fa-circle-dot"></i>{" "}
                        <HtmlTooltip
                          className="table-tooltip"
                          title={
                            layer?.status?.toUpperCase() === STATUS.ACTIVE
                              ? layer.name
                              : "Un-Supported"
                          }
                        >
                          <p>{layer.name}</p>
                        </HtmlTooltip>
                      </ListItem>
                    ))}
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
              dropDownLayersData.appLayer.includes(selectedLayer.app)
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
                    {dropDownLayersData.appLayer.map((layer) => (
                      <ListItem
                        key={v4()}
                        onClick={() =>
                          layer?.status?.toUpperCase() === STATUS.ACTIVE ? (
                            this.onClickLayerDropDown("app", layer.name)
                          ) : (
                            <></>
                          )
                        }
                        className={`${
                          layer?.status?.toUpperCase() === STATUS.ACTIVE
                            ? ""
                            : "disabled"
                        } ${selectedLayer.app === layer.name ? "active" : ""}`}
                      >
                        <i className="fa-solid fa-circle-dot"></i>
                        <HtmlTooltip
                          className="table-tooltip"
                          title={
                            layer?.status?.toUpperCase() === STATUS.ACTIVE
                              ? layer.name
                              : "Un-Supported"
                          }
                        >
                          <p>{layer.name}</p>
                        </HtmlTooltip>
                      </ListItem>
                    ))}
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
              dropDownLayersData.dataLayer.includes(selectedLayer.data)
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
                    {dropDownLayersData.dataLayer.map((layer) => (
                      <ListItem
                        key={v4()}
                        onClick={() =>
                          layer?.status?.toUpperCase() === STATUS.ACTIVE ? (
                            this.onClickLayerDropDown("data", layer.name)
                          ) : (
                            <></>
                          )
                        }
                        className={`${
                          layer?.status?.toUpperCase() === STATUS.ACTIVE
                            ? ""
                            : "disabled"
                        } ${selectedLayer.data === layer.name ? "active" : ""}`}
                      >
                        <i className="fa-solid fa-circle-dot"></i>
                        <HtmlTooltip
                          className="table-tooltip"
                          title={
                            layer?.status?.toUpperCase() === STATUS.ACTIVE
                              ? layer.name
                              : "Un-Supported"
                          }
                        >
                          <p>{layer.name}</p>
                        </HtmlTooltip>
                      </ListItem>
                    ))}
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
              dropDownLayersData.auxLayer.includes(selectedLayer.aux)
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
                        layer?.status?.toUpperCase() === STATUS.ACTIVE ? (
                          this.onClickLayerDropDown("aux", layer.name)
                        ) : (
                          <></>
                        )
                      }
                      className={`${
                        layer?.status?.toUpperCase() === STATUS.ACTIVE
                          ? ""
                          : "disabled"
                      } ${selectedLayer.aux === layer.name ? "active" : ""}`}
                    >
                      <i className="fa-solid fa-circle-dot"></i>
                      <HtmlTooltip
                        className="table-tooltip"
                        title={
                          layer?.status?.toUpperCase() === STATUS.ACTIVE
                            ? layer.name
                            : "Un-Supported"
                        }
                      >
                        <p>{layer.name}</p>
                      </HtmlTooltip>
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
              return (
                <ListItem key={v4()}>
                  <Box
                    className={`d-flex align-items-center edit-icons  ${
                      this.state.editStatus ? "delete-icons" : ""
                    }`}
                  >
                    {(selectedLayer[key] !== "" && savedLayer[key]) ||
                    (skipSteps[key] && savedLayer[key]) ? (
                      <>
                        {skipSteps[key] ? (
                          <></>
                        ) : (
                          <IconButton className="check-icon">
                            <i class="fas fa-check"></i>
                          </IconButton>
                        )}

                        <IconButton
                          className="edit-icon"
                          onClick={() => {
                            this.onClickEditBtn(key);
                            this.setState({
                              editStatus: true,
                            });
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
    );
  };

  render() {
    let {
      selectedInstance,
      activeTabEcs,
      isShowDepolyedSection,
      selectedDeployedInstance,
      editStatus,
      configInfo,
      managementInfo,
      savedLayer,
    } = this.state;
    let { biServicesFromProductCategory, creationBiMapping } = this.props;
    let isSaveBtnShow =
      savedLayer.SSL &&
      savedLayer.web &&
      savedLayer.app &&
      savedLayer.data &&
      savedLayer.aux;
    return (
      <Box className="bimapping-container">
        {this.renderHeading()}
        <Box className="tier-container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className="topology-panel">
                <Box className="topology-panel-body">
                  {biServicesFromProductCategory.status ===
                  status.IN_PROGRESS ? (
                    this.renderLoder("topology-loder")
                  ) : (
                    <Box className="topology-inner-content">
                      {this.renderAllLayers()}
                      {this.renderAllLayersOfDropDowns()}
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              {isShowDepolyedSection ||
              selectedDeployedInstance === ADD_PRODUCT_ENUMS.SSL ? (
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
            <>
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
                      style={{
                        display: activeTabEcs === 0 ? "block" : "none",
                      }}
                      setManagentInfo={(managementInfo) => {
                        this.setState({ managementInfo });
                      }}
                      currentActiveData={editStatus ? managementInfo : null}
                    />

                    <ConfigInfo
                      setNextTab={(activeTabEcs) => {
                        this.setState({ activeTabEcs });
                      }}
                      style={{
                        display: activeTabEcs === 1 ? "block" : "none",
                      }}
                      setConfigInfo={(configInfo) => {
                        this.setState({ configInfo });
                      }}
                      currentActiveData={editStatus ? configInfo : null}
                    />
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <></>
          )}
          <Box className="width-100 m-t-3">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>
                <Box className="d-block text-center">
                  {selectedInstance >= 0 || isSaveBtnShow ? (
                    <LoadingButton
                      className={`primary-btn min-width-inherit  m-r-3`}
                      variant="contained"
                      disabled={creationBiMapping.status === status.IN_PROGRESS}
                      loading={creationBiMapping.status === status.IN_PROGRESS}
                      onClick={() => this.onClickSave()}
                    >
                      Save
                    </LoadingButton>
                  ) : (
                    <></>
                  )}
                  {isSaveBtnShow ? (
                    <></>
                  ) : (
                    <LoadingButton
                      className="primary-btn min-width"
                      variant="contained"
                      onClick={() => this.onClickSave(1)}
                    >
                      Skip
                    </LoadingButton>
                  )}
                </Box>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Box>
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
    creationBiMapping,
  } = state.biMapping;
  return {
    biServicesFromProductCategory,
    createProductFormData,
    cloudServices,
    instancesServices,
    creationBiMapping,
  };
}

const mapDispatchToProps = {
  getBiServicesFromProductCategory,
  getCloudServices,
  getInstancesServices,
  setProductIntoDepartment,
  createBiMapping,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Tier));

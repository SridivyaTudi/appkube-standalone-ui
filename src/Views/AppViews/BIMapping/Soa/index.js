import React, { Component } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
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
import LoadBalancerIcon from "../../../../assets/img/bimapping/load-balancer-icon.png";
import IngressIcon from "../../../../assets/img/bimapping/ingress-icon.png";
import ServiceIcon from "../../../../assets/img/bimapping/service-icon.png";
import StarIcon from "../../../../assets/img/bimapping/star-icon.png";
import { v4 } from "uuid";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import VerticalTitleAndIconOfCard from "Components/VerticalTitleAndIconOfCard";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import {
  getBiServicesFromProductCategory,
  getCloudServices,
  getInstancesServices,
  createBiMapping,
  getServicesFromServiceModule,
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
import { setProductIntoDepartment } from "Redux/BIMapping/BIMappingSlice";
import InstanceListCards from "Views/AppViews/BIMapping/Components/InstanceListCards";
import { ToastMessage } from "Toast/ToastMessage";
import LoadingButton from "@mui/lab/LoadingButton";
import { LOGOS, SERVICE_TYPE } from "CommonData";

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

const SERVICES = [
  {
    name: "App Service",
    icon: ChartAppLayerIcon,
  },
  {
    name: "Data Service",
    icon: DataServiceSvgrepo,
  },
  {
    name: "Other Service",
    icon: DataServiceSvgrepo,
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
      editStatus: false,
      configInfo: [],
      managementInfo: [],
      tempSoaData: [],
      activeServiceCategory: "",
      commonServiceModules: [],
    };
  }

  componentDidMount = () => {
    window.addEventListener("load", this.redirectPage);
    let { serviceType, moduleName } = this.props.createProductFormData;
    if (serviceType === SERVICE_TYPE.COMMON.toLowerCase()) {
      this.props.getServicesFromServiceModule({ serviceType, moduleName });
    } else {
      this.props.getBiServicesFromProductCategory({
        productCategory: PRODUCT_CATEGORY_ENUM.SOA,
      });
    }

    this.manipulateCommonServiceData(
      this.props.commonServiceModulesData?.data || []
    ).then(() => this.previousDataView());
  };

  componentWillUnmount() {
    window.removeEventListener("load", this.redirectPage);
  }

  // Redirect page
  redirectPage = () => {
    let { name, id, landingZoneId } = this.getUrlDetails();
    this.props.navigate(
      `${APP_PREFIX_PATH}/bim/add-product/${name}/${id}/${landingZoneId}`
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
      this.manipulateServiceData(data);
    }

    if (
      prevProps.servicesFromServiceModuleData.status !==
        this.props.servicesFromServiceModuleData.status &&
      this.props.servicesFromServiceModuleData.status === status.SUCCESS &&
      this.props.servicesFromServiceModuleData?.data
    ) {
      let data = this.props.servicesFromServiceModuleData?.data || [];
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

    if (
      prevProps.creationBiMapping.status !==
        this.props.creationBiMapping.status &&
      this.props.creationBiMapping.status === status.SUCCESS
    ) {
      if (this.props.creationBiMapping?.data) {
        ToastMessage.success("Created Product of BI-Mapping.");
        let { name, id } = this.getUrlDetails();
        this.props.navigate(
          `/app/bim/add-product/${name}/${id}/product-category`
        );
      } else {
        ToastMessage.error("Creation Of Add BI-mapping Failed.");
      }
    }

    if (
      prevProps.commonServiceModulesData.status !==
        this.props.commonServiceModulesData.status &&
      this.props.commonServiceModulesData.status === status.SUCCESS
    ) {
      if (this.props.commonServiceModulesData?.data) {
        this.manipulateCommonServiceData(
          this.props.commonServiceModulesData?.data
        );
      }
    }
  }
  // Manipulate service data
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

  // Set active tab
  setActiveTab = (id, isECS = 0) => {
    let { activeTabEcs, activeTabEks } = this.state;
    if (isECS) {
      activeTabEcs = id;
    } else {
      activeTabEks = id;
    }
    this.setState({ activeTabEcs, activeTabEks });
  };

  // Toggle app service dropdown.
  toggleAppService = () => {
    let { savedService } = this.state;
    if (!savedService.app) {
      this.setState({
        isSelectSpringBootOpen: !this.state.isSelectSpringBootOpen,
      });
    }
  };

  // Toggle data service dropdown.
  toggleDataLayer = () => {
    let { savedService } = this.state;
    if (savedService.app && !savedService.data) {
      this.setState({
        isSelectMySQLOpen: !this.state.isSelectMySQLOpen,
      });
    }
  };

  // Toggle other service dropdown.
  toggleOtherServices = () => {
    let { savedService } = this.state;
    if (savedService.data && !savedService.other) {
      this.setState({
        isSelectRedisOpen: !this.state.isSelectRedisOpen,
      });
    }
  };

  // Render Deployed cards
  renderDeployedInstances = () => {
    let { deployedInstances, selectedDeployedInstance } = this.state;
    let cloudStatus = this.props.cloudServices?.status;
    let instanceStatus =
      this.props.instancesServices?.status !== status.IN_PROGRESS;
    if (cloudStatus === status.IN_PROGRESS) {
      return this.renderLoder("deployed-cards-loader");
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
                instanceStatus ? (
                  this.onClickDeployedCard(
                    instance.id,
                    instance.name,
                    instance.elementType
                  )
                ) : (
                  <></>
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

  // Render Instance list
  renderSelectedInstance = () => {
    let { selectedInstance, instancesServices } = this.state;
    let instanceStatus = this.props.instancesServices?.status;

    if (instanceStatus === status.IN_PROGRESS) {
      return this.renderLoder("instance-cards-loder");
    } else {
      if (instancesServices?.length) {
        let preparedData = instancesServices.map((instance, index) => {
          const data = [
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
    let { selectedDeployedInstance } = this.state;
    return selectedDeployedInstance ? (
      <Box className="deployed-section m-t-4">
        <Box className="deployed-head">
          <h4 className="m-t-0">Select Instance</h4>
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

  // Click on service dropdown.
  onClickServiceDropDown = (key, value) => {
    let { selectedServiceData, activeServiceCategory } = this.state;
    selectedServiceData[key] = value;

    if (activeServiceCategory !== key) {
      this.props.getCloudServices({
        serviceCategory: key,
        productCategory: PRODUCT_CATEGORY_ENUM.SOA,
      });
      activeServiceCategory = key;
    }

    this.setState({
      selectedServiceData,
      isShowDepolyedSection: true,
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
      activeServiceCategory,
    });
  };

  // Render table of head.
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

  // Render table of body.
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

  // Redux data view
  previousDataView = () => {
    let { createProductFormData } = this.props;
    let { commonServiceModules } = this.state;

    let editId = createProductFormData["editServiceId"];
    let soaData = createProductFormData["soaData"];

    if (commonServiceModules.includes(editId)) {
      soaData.forEach((soa, index) => {
        if (soa.currentCommonService === editId) {
          editId = index;
        }
      });
    }

    if (editId >= 0 && soaData[editId]?.values) {
      try {
        let { savedService, savedData, selectedService, selectedServiceData } =
          soaData[editId]?.values;

        this.setState({
          savedService: JSON.parse(JSON.stringify(savedService)),
          savedData: JSON.parse(JSON.stringify(savedData)),
          selectedService: JSON.parse(JSON.stringify(selectedService)),
          selectedServiceData: JSON.parse(JSON.stringify(selectedServiceData)),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Click on save btn
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
      selectedServiceData,
      configInfo,
      managementInfo,
      editStatus,
      commonServiceModules,
    } = this.state;
    let { createProductFormData } = this.props;
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
    }
    let currentData = {
      serviceName,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      cloudElementType,
      cloudName,
      configInfo,
      managementInfo,
    };
    if (editStatus) {
      savedData = savedData.map((previousData) => {
        if (previousData.serviceName === serviceName) {
          return currentData;
        }
        return previousData;
      });
    } else {
      savedData.push(currentData);
    }

    selectedInstance = -1;
    selectedDeployedInstance = "";
    selectedService = [];
    isShowDepolyedSection = false;
    configInfo = [];
    managementInfo = [];
    this.setState({
      savedService,
      savedData,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      isShowDepolyedSection,
      configInfo,
      managementInfo,
    });

    if (savedService.other) {
      let appendSoaData = {
        savedService,
        savedData,
        selectedService,
        selectedServiceData,
      };
      let soaData = JSON.parse(
        JSON.stringify(createProductFormData.soaData || [])
      );
      let editId = createProductFormData["editServiceId"];
      if (commonServiceModules.includes(editId)) {
        soaData.forEach((soa, index) => {
          if (soa.currentCommonService === editId) {
            editId = index;
          }
        });
      }

      let currentCommonService =
        createProductFormData.serviceType === "common"
          ? createProductFormData.currentCommonService
          : "";
      if (editStatus && editId >= 0) {
        soaData[editId].values = appendSoaData;
      } else {
        if (soaData.length) {
          soaData.push({
            module: createProductFormData.moduleName,
            values: appendSoaData,
            service: createProductFormData.serviceType,
            currentCommonService,
          });
        } else {
          soaData = [
            {
              module: createProductFormData.moduleName,
              values: appendSoaData,
              service: createProductFormData.serviceType,
              currentCommonService,
            },
          ];
        }
      }

      let passData = JSON.parse(
        JSON.stringify({
          ...createProductFormData,
          soaData,
          "3_tierData": null,
          currentCommonService: "",
          moduleName: "",
        })
      );
      this.props.setProductIntoDepartment(passData);
      let { name, id, landingZoneId } = this.getUrlDetails();
      this.props.navigate(
        `/app/bim/add-product/${name}/${id}/${landingZoneId}/product-category`
      );
    }
  };

  // On click instance
  onClickInstance = (selectedInstance) => {
    this.setState({ selectedInstance, configInfo: [], managementInfo: [] });
  };

  // Click on deployed card
  onClickDeployedCard = (selectedDeployedInstance, cloudName, elementType) => {
    let { landingZoneId } = this.getUrlDetails();
    this.props.getInstancesServices({ cloudName, elementType,landingZoneId });
    this.setState({
      selectedDeployedInstance,
      selectedInstance: -1,
      activeTabEks: 0,
      cloudElementType: elementType,
      cloudName,
    });
  };

  // Click on edit btn.
  onClickEditBtn = (serviceName) => {
    let { savedData, savedService, activeServiceCategory } = this.state;
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
        managementInfo,
        configInfo,
      } = findSaveData;
      this.props.getCloudServices({
        serviceCategory: serviceName,
        productCategory: PRODUCT_CATEGORY_ENUM.SOA,
      });
      activeServiceCategory = serviceName;
      this.props.getInstancesServices({ cloudName, elementType });

      Object.keys(savedService).forEach((key) => {
        if (serviceName === key) {
          savedService[serviceName] = false;
        } else {
          let previousEditData = savedData.find(
            (data) => data.serviceName === key
          );
          if (previousEditData) {
            savedService[key] = true;
          }
        }
      });

      this.setState({
        selectedInstance,
        selectedDeployedInstance,
        selectedService,
        savedService,
        cloudElementType: elementType,
        isShowDepolyedSection: true,
        managementInfo,
        configInfo,
        activeServiceCategory,
      });
    }
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
    return { name, id, landingZoneId };
  }

  // Render heading
  renderHeading = () => {
    let { name, id, landingZoneId } = this.getUrlDetails();
    return (
      <Box className="list-heading">
        <h3>Soa</h3>
        <Box className="breadcrumbs">
          <ul>
            <li onClick={() => this.props.navigate("/app/bim")}>BI-Mapping</li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li
              onClick={() =>
                this.props.navigate(
                  `/app/bim/add-product/${name}/${id}/${landingZoneId}`
                )
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
                  `/app/bim/add-product/${name}/${id}/${landingZoneId}/product-category`
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
    );
  };

  // Render all services
  renderAllServices = () => {
    return (
      <Box className="content-left">
        <List>
          {SERVICES.map((service) => {
            return (
              <ListItem key={v4()}>
                <Box className="button-box">
                  <span>
                    <img src={service.icon} alt="" />
                  </span>
                  <p>{service.name}</p>
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

  // Render all services of dropDowns
  renderAllServicesOfDropDowns = () => {
    let {
      isSelectSpringBootOpen,
      isSelectMySQLOpen,
      isSelectRedisOpen,
      selectedServiceData,
      dropDownServiceData,
      savedService,
    } = this.state;
    return (
      <Box className="content-middle">
        <List>
          <ListItem>
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
          <ListItem className={`active`}>
            <Box className="application-balancer">
              <Button className="secondary-btn min-width" variant="contained">
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
              dropDownServiceData.appService.includes(selectedServiceData.app)
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
                  {selectedServiceData.app || "Select"}
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
                    {dropDownServiceData.appService.map((service) => (
                      <ListItem
                        className={`${
                          selectedServiceData.app === service.name
                            ? "active"
                            : ""
                        }`}
                        key={v4()}
                        onClick={() =>
                          this.onClickServiceDropDown("app", service.name)
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
              dropDownServiceData.dataService.includes(selectedServiceData.data)
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
                    {dropDownServiceData.dataService.map((service) => (
                      <ListItem
                        className={`${
                          selectedServiceData.data === service.name
                            ? "active"
                            : ""
                        }`}
                        key={v4()}
                        onClick={() =>
                          this.onClickServiceDropDown("data", service.name)
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
                    ))}
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
                  {dropDownServiceData.otherService.map((service) => (
                    <ListItem
                      className={`${
                        selectedServiceData.other === service.name
                          ? "active"
                          : ""
                      }`}
                      key={v4()}
                      onClick={() =>
                        this.onClickServiceDropDown("other", service.name)
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
                  ))}
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
                  <Box
                    className={`d-flex align-items-center   ${
                      this.state.editStatus ? "delete-icons" : ""
                    }`}
                  >
                    {selectedServiceData[key] !== "" && savedService[key] ? (
                      <>
                        <IconButton className="check-icon">
                          <i class="fas fa-check"></i>
                        </IconButton>
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

  manipulateCommonServiceData = async (data) => {
    let commonServiceModules = [];
    if (data?.length) {
      data.forEach((details) => {
        if (!commonServiceModules.includes(details.serviceModule)) {
          commonServiceModules.push(details.serviceModule);
        }
      });
    }

    this.setState({ commonServiceModules });
  };

  render() {
    let {
      selectedInstance,
      cloudElementType,
      activeTabEcs,
      clickConfigInfoIdAddEntry,
      clickManInfoIdAddEntry,
      isShowDepolyedSection,
      configInfo,
      managementInfo,
      editStatus,
    } = this.state;
    let {
      biServicesFromProductCategory,
      createProductFormData,
      creationBiMapping,
    } = this.props;
    console.log(createProductFormData);
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
                  <h4 className="m-t-0 m-b-0">
                    MODULE : {createProductFormData.moduleName}
                  </h4>
                  {biServicesFromProductCategory.status ===
                  status.IN_PROGRESS ? (
                    this.renderLoder("topology-loder")
                  ) : (
                    <Box className="topology-inner-content">
                      {this.renderAllServices()}
                      {this.renderAllServicesOfDropDowns()}
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
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
                      setNextTab={(activeTabEcs) => {
                        this.setState({ activeTabEcs });
                      }}
                      onClickAddEntryBtn={clickManInfoIdAddEntry}
                      style={{ display: activeTabEcs === 0 ? "" : "none" }}
                      setManagentInfo={(managementInfo) => {
                        this.setState({ managementInfo });
                      }}
                      currentActiveData={editStatus ? managementInfo : null}
                    />

                    <ConfigInfo
                      setNextTab={(activeTabEcs) => {
                        this.setState({ activeTabEcs });
                      }}
                      selectedCloudElement={cloudElementType?.toUpperCase()}
                      onClickAddEntryBtn={clickConfigInfoIdAddEntry}
                      style={{ display: activeTabEcs === 1 ? "" : "none" }}
                      setConfigInfo={(configInfo) => {
                        this.setState({ configInfo });
                      }}
                      currentActiveData={editStatus ? configInfo : null}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className="width-100 m-t-3">
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={4} alignItems={"flex-start"}>
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
                  </Grid>
                  <Grid item xs={4}>
                    <Box className="d-block text-center">
                      <LoadingButton
                        className={` primary-btn min-width-inherit`}
                        variant="contained"
                        onClick={this.onClickSave}
                        disabled={
                          creationBiMapping.status === status.IN_PROGRESS
                        }
                        loading={
                          creationBiMapping.status === status.IN_PROGRESS
                        }
                      >
                        Save
                      </LoadingButton>
                    </Box>
                  </Grid>
                  <Grid item xs={4}></Grid>
                </Grid>
              </Box>
            </>
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
    creationBiMapping,
    commonServiceModulesData,
    servicesFromServiceModuleData,
  } = state.biMapping;
  return {
    biServicesFromProductCategory,
    createProductFormData,
    cloudServices,
    instancesServices,
    creationBiMapping,
    commonServiceModulesData,
    servicesFromServiceModuleData,
  };
}

const mapDispatchToProps = {
  getBiServicesFromProductCategory,
  getCloudServices,
  getInstancesServices,
  setProductIntoDepartment,
  createBiMapping,
  getServicesFromServiceModule,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Soa));

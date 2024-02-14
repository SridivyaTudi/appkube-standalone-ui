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
import deployed4 from "assets/img/bimapping/deployed4.png";
import deployed5 from "assets/img/bimapping/deployed5.png";
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

let dropDownLayersData = {
  webLayer: [
    "NGINX",
    "Varnish",
    "HA Proxy",
    "Apache Tomcat",
    "Microsoft IAS",
    "Traefik",
  ],
  appLayer: [
    "Java Spring Boot API",
    "NodeJs API Service",
    "Golang API Service",
    "Python API Service",
    "Laravel API Service",
    "Ruby API Service",
  ],
  dataLayer: [
    "MySQL",
    "Postgresql",
    "Oracle",
    "Dynamo",
    "MongoDB",
    "IndexDB",
    "Casandra",
  ],
  auxLayer: ["Redis", "MemCache", "Elasticsearch", "Open search"],
};

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
      deployedInstances: [
        {
          key: "EC2",
          name: "EC2",
          image: deployed1,
        },
        {
          key: "ECS",
          name: "ECS",
          image: deployed1,
        },
        {
          key: "EkS",
          name: "EkS",
          image: deployed1,
        },
        {
          key: "Lambda",
          name: "Lambda",
          image: deployed4,
        },
        {
          key: "CM",
          name: "CM",
          image: deployed5,
        },
      ],
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
      activeTabEks: 0,
    };
  }

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
    let { deployedInstances, selectedDeployedInstance } = this.state;
    return deployedInstances.map((instance) => {
      let deployInstances = {
        label: instance.name,
        image: instance.image,
        active: instance.name === selectedDeployedInstance ? "active" : "",
      };
      return (
        <VerticalTitleAndIconOfCard
          data={deployInstances}
          onClickCard={(title) => this.onClickDeployedCard(title)}
        />
      );
    });
  };

  onClickDeployedCard = (selectedDeployedInstance) => {
    this.setState({
      selectedDeployedInstance,
      selectedInstance: -1,
      activeTabEks: 0,
    });
  };

  renderSelectedInstance = () => {
    let { selectedDeployedInstance, selectedInstance } = this.state;
    const data = [
      {
        backgroundColor: "#FFBA69",
        label: "ID",
        value: "123456",
        style: { borderBottom: "none" },
      },
      {
        backgroundColor: "#8676FF",
        label: "Key",
        value: "Name",
        style: { borderBottom: "none" },
      },
      {
        backgroundColor: "#FF2D2E",
        label: "Value",
        value: "Kick",
        style: { borderBottom: "none" },
      },
    ];
    return [...Array(10)].map((instance, index) => {
      let instanceData = {
        image: Aws,
        title: selectedDeployedInstance,
        data,
        active: selectedInstance === index ? "active" : "",
        rowSeperatedByline: false,
        style: { width: "150px", minHeight: "150px" },
      };
      return (
        <TitleIconWithInfoOfCard
          cardDetails={instanceData}
          onClickCard={(details) => this.onClickInstance(index)}
        />
      );
    });
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
    this.setState({
      selectedLayer,
      isShowDepolyedSection: true,
      isSelectNginxOpen: false,
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
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
    } = this.state;
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
                  <p>HR</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>
                  <p>HRMS</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">
                  <p>3Tier</p>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
        {/* <Box className="list-heading">
          <h3>3 Tier</h3>
          <Link to={`/app/bim/add-product`}>
            <Button
              className="primary-btn min-width-inherit"
              variant="contained"
            >
              Back
            </Button>
          </Link>
        </Box> */}
        <Box className="tier-container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Box className="topology-panel">
                <Box className="topology-panel-body">
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
                        <ListItem
                          className={`  ${
                            dropDownLayersData.webLayer.includes(
                              selectedLayer.web
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
                                  {dropDownLayersData.webLayer.map((name) => (
                                    <ListItem
                                      key={v4()}
                                      className={`${
                                        selectedLayer.web === name
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        this.onClickLayerDropDown("web", name)
                                      }
                                    >
                                      <i className="fa-solid fa-circle-dot"></i>{" "}
                                      {name}
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
                                  {dropDownLayersData.appLayer.map((name) => (
                                    <ListItem
                                      key={v4()}
                                      onClick={() =>
                                        this.onClickLayerDropDown("app", name)
                                      }
                                      className={`${
                                        selectedLayer.app === name
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <i className="fa-solid fa-circle-dot"></i>
                                      {name}
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
                                  {dropDownLayersData.dataLayer.map((name) => (
                                    <ListItem
                                      key={v4()}
                                      onClick={() =>
                                        this.onClickLayerDropDown("data", name)
                                      }
                                      className={`${
                                        selectedLayer.data === name
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <i className="fa-solid fa-circle-dot"></i>
                                      {name}
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
                                {dropDownLayersData.auxLayer.map((name) => (
                                  <ListItem
                                    key={v4()}
                                    onClick={() =>
                                      this.onClickLayerDropDown("aux", name)
                                    }
                                    className={`${
                                      selectedLayer.aux === name ? "active" : ""
                                    }`}
                                  >
                                    <i className="fa-solid fa-circle-dot"></i>
                                    {name}
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

export default Tier;

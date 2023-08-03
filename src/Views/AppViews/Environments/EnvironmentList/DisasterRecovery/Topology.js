import React, { Component } from "react";
import VpcServicesIcon from "assets/img/assetmanager/vpc-services-icon.png";
import Hrms from "assets/img/assetmanager/hrms.png";
import chartWebLayerIcon from "assets/img/assetmanager/chart-web-layer-icon.png";
import chartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import dataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import chartAuxiliaryLayerIcon from "assets/img/assetmanager/chart-auxiliary-layer-icon.png";
import balancingIcon from "assets/img/assetmanager/balancing-icon.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import amazonEc2 from "assets/img/assetmanager/amazon-ec2.png";

import {
  IconButton,
  Box,
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
  TableBody,
  Button,
} from "@mui/material";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import TopologyView from "./TopologyView";
// import VpcDetails from "./VpcDetails";
// import ClusterDetails from "./ClusterDetails";
// import AssociateApp from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/AssociateApp";
import { v4 } from "uuid";
import { LOGOS } from "CommonData";

let topologyData = {
  label: "HRMS",
  image: Hrms,
  children: [
    [
      {
        label: "Web Layer",
        id: null,
        type: "WebLayer",
        image: chartWebLayerIcon,
        children: [],
      },
      {
        label: "App Layer",
        id: null,
        type: "AppLayer",
        image: chartAppLayerIcon,
        children: [],
      },
      {
        label: "Data Layer",
        id: null,
        type: "DataLayer",
        image: dataServiceSvgrepo,
        children: [],
      },
      {
        label: "Auxiliary Layer",
        id: null,
        type: "AuxiliaryLayer",
        image: chartAuxiliaryLayerIcon,
        children: [],
      },
    ],
    [],
  ],
};
let resourceData = {
  web_layer: [
    {
      name: "CPU Utilization",
      number: "44%",
    },
    {
      name: "Network In",
      number: "1000 MB",
    },
    {
      name: "Network Out",
      number: "1000 MB",
    },
    {
      name: "Disk Read Bytes",
      number: "500 MB",
    },
    {
      name: "Disk Write Bytes",
      number: "100 MB",
    },
    {
      name: "Status Check Failed",
      number: "142",
    },
    {
      name: "Status Check Failed Instance",
      number: "142",
    },
    {
      name: "Status Check Failed System",
      number: "142",
    },
    {
      name: "CPU Credit Balance",
      number: "100",
    },
    {
      name: "CPU Credit Usage",
      number: "10",
    },
  ],
  data_layer: [
    {
      name: "CPU Utilization",
      number: "50%",
    },
    {
      name: "Data Connections",
      number: "100",
    },
    {
      name: "Free Storage Space",
      number: "50 GB",
    },
    {
      name: "ReadOPS",
      number: "500 IOPS",
    },
    {
      name: "Write OPS",
      number: "300 OPS",
    },
    {
      name: "Read latency",
      number: "5 ms",
    },
    {
      name: "Write latency",
      number: "3 MS",
    },
    {
      name: "NR Throughput",
      number: "10 MB/s",
    },
    {
      name: "NT Throughput",
      number: "5 MB/s",
    },
    {
      name: "Replica lag",
      number: "0 sec",
    },
  ],
  auxiliary_layer: [
    {
      name: "No. Of Messages Published",
      number: "1000",
    },
    {
      name: "No. Of Notification Delivered",
      number: "900",
    },
    {
      name: "No. Of Notification Failed",
      number: "20",
    },
    {
      name: "No. Of Notification Filtered",
      number: "50",
    },
    {
      name: "Public Size",
      number: "1 KB",
    },
    {
      name: "Publish Throughput",
      number: "10 M/s",
    },
    {
      name: "No Of  Subs Confirmed",
      number: "50",
    },
    {
      name: "No Of  Subs Pending",
      number: "5",
    },
    {
      name: "No Of  Subs Deleted",
      number: "10",
    },
    {
      name: "Sms month to date spent USD",
      number: "$5.00",
    },
  ],
};
class Topology extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOfLevel1: topologyData,
      resources: resourceData,
      selectedResource: "",
    };
  }

  componentDidMount = () => {
    this.setState({ dataOfLevel1: topologyData, resources: resourceData });
  };

  getCurrentActiveTreeLevel = (label, isLevel2Data = 0) => {
    this.setState({
      selectedResource: label?.toLowerCase().replace(" layer", ""),
    });
  };

  // Render resources
  renderResources = () => {
    let { resources, selectedResource } = this.state;
    selectedResource = selectedResource === "app" ? "web" : selectedResource;
    return (
      resources[`${selectedResource}_layer`]?.length &&
      resources[`${selectedResource}_layer`].map((resource) => {
        return (
          <Box className="card-box">
            <Box className="d-block text-center width-100">
              <strong>{resource.number}</strong>
              <span>{resource.name}</span>
            </Box>
          </Box>
        );
      })
    );
  };

  // Render resources container
  renderResourcesWrapper = () => {
    let { selectedResource } = this.state;
    let resourceName =
      selectedResource === "data"
        ? "RDS"
        : selectedResource === "auxiliary"
        ? "SNS"
        : "EC2";
    return (
      selectedResource && (
        <Box className="resources-cards">
          <div className="heading">Selected {resourceName} Resources</div>
          <Box className="resources">
            <Box className="resources-inner">{this.renderResources()}</Box>
          </Box>
        </Box>
      )
    );
  };
  render() {
    const { dataOfLevel1, breadcrumbs, selectedResource } = this.state;
    return (
      <>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <TopologyView
              data={dataOfLevel1}
              setLevel={this.getCurrentActiveTreeLevel}
              selectedBreadCrumbs={breadcrumbs}
            />
            <Grid item xs={7}>
              <Box className="cloud-managed-cards">
                {!selectedResource ? (
                  <Box className="cloud-managed-cards-scroll">
                    <Box className="service-card active">
                      <Box className="service-icon">
                        <img src={chartWebLayerIcon} alt="serviceicon" />
                      </Box>
                      <Box className="service-contant">
                        <label>Web layer</label>
                        <strong>01</strong>
                      </Box>
                    </Box>
                    <Box className="service-card active">
                      <Box className="service-icon">
                        <img src={chartWebLayerIcon} alt="serviceicon" />
                      </Box>
                      <Box className="service-contant">
                        <label>App layer</label>
                        <strong>05</strong>
                      </Box>
                    </Box>
                    <Box className="service-card active">
                      <Box className="service-icon">
                        <img src={chartWebLayerIcon} alt="serviceicon" />
                      </Box>
                      <Box className="service-contant">
                        <label>Data layer</label>
                        <strong>02</strong>
                      </Box>
                    </Box>
                    <Box className="service-card active">
                      <Box className="service-icon">
                        <img src={chartWebLayerIcon} alt="serviceicon" />
                      </Box>
                      <Box className="service-contant">
                        <label>Auxiliary layer</label>
                        <strong>03</strong>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box className="application-balancer">
                    <Button
                      className="primary-btn min-width"
                      variant="contained"
                    >
                      <p>
                        <img src={balancingIcon} alt="" />{" "}
                      </p>{" "}
                      Application Load Balancer
                    </Button>
                    <Box className="balancer-boxs">
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {this.renderResourcesWrapper()}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { envDataByLandingZone, departments } = state.environmentData;
  return { envDataByLandingZone, departments };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Topology);

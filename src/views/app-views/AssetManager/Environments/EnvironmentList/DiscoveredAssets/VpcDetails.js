import React from "react";
import { Box } from "@mui/material";
import dummyData from "./dummy.json";
import EKS from "assets/img/assetmanager/global-icon4.png";
import ECS from "assets/img/assetmanager/global-icon5.png";
import Glue from "assets/img/assetmanager/cloud-managed-icon8.png";
import Athena from "assets/img/assetmanager/cloud-managed-icon10.png";
import Kinesys from "assets/img/assetmanager/cloud-managed-icon11.png";
import Redshift from "assets/img/assetmanager/cloud-managed-icon12.png";
import IAM from "assets/img/assetmanager/cloud-managed-icon13.png";
import S3 from "assets/img/assetmanager/cloud-managed-icon2.png";
import LakeFormation from "assets/img/assetmanager/cloud-managed-icon14.png";
import Sagemaker from "assets/img/assetmanager/cloud-managed-icon15.png";
import Quicksight from "assets/img/assetmanager/cloud-managed-icon16.png";
import EMRStudio from "assets/img/assetmanager/cloud-managed-icon17.png";
import Waf from "assets/img/assetmanager/global-icon6.png";
import API from "assets/img/assetmanager/global-icon7.png";
import LB from "assets/img/assetmanager/global-icon3.png";

class VpcDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clusterServicesImages: [EKS, ECS],
      managedServicesImages: [
        Glue,
        Athena,
        Kinesys,
        Redshift,
        IAM,
        S3,
        LakeFormation,
        Sagemaker,
        Quicksight,
        EMRStudio,
      ],
      GatewayServicesImages: [Waf, API, LB],
    };
  }

  renderClusterServices = () => {
    const clusterJSX = [];
    dummyData.clusterServices.map((item, index) => {
      clusterJSX.push(
        <Box className="service-card active">
          <Box className="service-icon">
            <img
              src={this.state.clusterServicesImages[index]}
              alt="serviceicon"
            />
          </Box>
          <Box className="service-contant">
            <label>{item.name}</label>
            <strong>{item.value}</strong>
          </Box>
        </Box>
      );
    });
    return clusterJSX;
  };

  renderCloudManagedServices = () => {
    const JSX = [];
    dummyData.managedServices.map((item, index) => {
      JSX.push(
        <Box className="service-card active">
          <Box className="service-icon">
            <img
              src={this.state.managedServicesImages[index]}
              alt="serviceicon"
            />
          </Box>
          <Box className="service-contant">
            <label>{item.name}</label>
            <strong>{item.value}</strong>
          </Box>
        </Box>
      );
    });
    return JSX;
  };

  renderGatewayServices = () => {
    const JSX = [];
    dummyData.GatewayServices.map((item, index) => {
      JSX.push(
        <Box className="service-card active">
          <Box className="service-icon">
            <img
              src={this.state.GatewayServicesImages[index]}
              alt="serviceicon"
            />
          </Box>
          <Box className="service-contant">
            <label>{item.name}</label>
            <strong>{item.value}</strong>
          </Box>
        </Box>
      );
    });
    return JSX;
  };

  render() {
    return (
      <>
        <Box className="fliter-tabs global-service-penal">
          <Box className="cloud-managed-section">
            <h4>Cluster</h4>
            <Box className="cloud-managed-cards">
              <Box className="cloud-managed-cards-scroll">
                {this.renderClusterServices()}
              </Box>
            </Box>
            <h4>Cloud Managed Services</h4>
            <Box className="cloud-managed-cards">
              <Box className="cloud-managed-cards-scroll">
                {this.renderCloudManagedServices()}
              </Box>
            </Box>
            <h4>Gateway Services</h4>
            <Box className="cloud-managed-cards">
              <Box className="cloud-managed-cards-scroll">
                {this.renderGatewayServices()}
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

export default VpcDetails;

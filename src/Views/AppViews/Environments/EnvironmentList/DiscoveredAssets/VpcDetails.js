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
import Waf from "assets/img/assetmanager/global-icon6.png";
import API from "assets/img/assetmanager/global-icon7.png";
import LB from "assets/img/assetmanager/global-icon3.png";
import { v4  } from 'uuid';

const Images = {
  EKS: EKS,
  ECS: ECS,
  WAF: Waf,
  API: API,
  LB: LB,
  Glue: Glue,
  Athena: Athena,
  Kinesys: Kinesys,
  Redshift: Redshift,
  IAM: IAM,
  S3: S3,
  LakeFormation: LakeFormation,
  Sagemaker: Sagemaker,
  Quicksight: Quicksight,
  Quicksight: Quicksight,
};

class VpcDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GatewayServicesImages: [Waf, API, LB],
      dataList: [],
    };
  }

  componentDidMount = () => {
    this.setState({ dataList: this.props.vpc.hostingTypeList });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.vpc.hostingTypeList !== this.props.vpc.hostingTypeList) {
      this.setState({ dataList: this.props.vpc.hostingTypeList });
    }
  };

  renderData = () => {
    const { dataList } = this.state;
    const JSX = [];
    if (dataList?.length) {
      dataList.map((item) => {
        const text = item.hostingType;
        const result = text.replace(/([A-Z])/g, " $1");
        const capitalizedTitle =
          result.charAt(0).toUpperCase() + result.slice(1);
        JSX.push(
          <>
            <h4>{capitalizedTitle + " Services"}</h4>
            <Box className="cloud-managed-cards">
              <Box className="cloud-managed-cards-scroll">
                {this.renderServices(item.category)}
              </Box>
            </Box>
          </>
        );
      });
    }
    return JSX;
  };

  renderServices = (categoryList) => {
    const clusterJSX = [];
    categoryList.map((item) => {
      clusterJSX.push(
        <Box className="service-card active" key={v4()}>
          <Box className="service-icon">
            <img src={Images[item.elementType]} alt="serviceicon" />
          </Box>
          <Box className="service-contant">
            <label>{item.elementType}</label>
            <strong>{item.elementList.length}</strong>
          </Box>
        </Box>
      );
    });
    return clusterJSX;
  };

  renderCloudManagedServices = () => {
    const JSX = [];
    dummyData.managedServices.map((item) => {
      JSX.push(
        <Box className="service-card active" key={v4()}>
          <Box className="service-icon">
            <img src={Images[item.name]} alt="serviceicon" />
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
    dummyData.GatewayServices.map((item) => {
      JSX.push(
        <Box className="service-card active" key={v4()}>
          <Box className="service-icon">
            <img src={Images[item.name]} alt="serviceicon" />
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
            {this.renderData()}
            {/* <h4>Cloud Managed Services</h4>
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
            </Box> */}
          </Box>
        </Box>
      </>
    );
  }
}

export default VpcDetails;

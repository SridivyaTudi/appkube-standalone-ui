import React, { Component } from "react";
import { Box } from "@mui/material";
import Lambda from "assets/img/assetmanager/cloud-managed-icon1.png";
import S3 from "assets/img/assetmanager/cloud-managed-icon2.png";
import SQS from "assets/img/assetmanager/cloud-managed-icon3.png";
import SNS from "assets/img/assetmanager/cloud-managed-icon4.png";
import Redshift from "assets/img/assetmanager/cloud-managed-icon5.png";
import RDS from "assets/img/assetmanager/cloud-managed-icon6.png";
import AppMesh from "assets/img/assetmanager/cloud-managed-icon7.png";
import Kinesis from "assets/img/assetmanager/cloud-managed-icon8.png";
import TimeSeries from "assets/img/assetmanager/cloud-managed-icon9.png";
import Athena from "assets/img/assetmanager/cloud-managed-icon10.png";
import dummyData from "views/app-views/Environments/EnvironmentList/DiscoveredAssets/dummy.json";

class SearchDb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serivceImages: [
        Lambda,
        S3,
        SQS,
        SNS,
        Redshift,
        RDS,
        AppMesh,
        Kinesis,
        TimeSeries,
        Athena,
      ],
    };
  }
  render() {
    return (
      <Box className="cloud-managed-cards">
        <Box className="cloud-managed-cards-scroll">
          {dummyData.SearchDbServices.map((item, index) => {
            return (
              <Box className="service-card active">
                <Box className="service-icon">
                  <img
                    src={this.state.serivceImages[index]}
                    alt="serviceicon"
                  />
                </Box>
                <Box className="service-contant">
                  <label>{item.name}</label>
                  <strong>{item.value}</strong>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}

export default SearchDb;

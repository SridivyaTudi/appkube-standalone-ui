import React, { Component } from "react";
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
import { Box } from "@mui/material";
import { connect } from "react-redux";

class AllTable extends Component {
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
      activeService: 0,
    };
  }

  renderTable = (data) => {
    const { activeService } = this.state;
    const JSX = [];
    data.map((item, index) => {
      JSX.push(
        <Box
          className={`service-card ${activeService === index ? "active" : ""}`}
          onClick={() => {
            this.setState({ activeService: index });
          }}
        >
          <Box className="service-icon">
            <img src={this.state.serivceImages[index]} alt="serviceicon" />
          </Box>
          <Box className="service-contant">
            <label>{item.elementType}</label>
            <strong>{item.totalRecord}</strong>
          </Box>
        </Box>
      );
    });
    return JSX;
  };

  render() {
    return (
      <>
        <Box className="cloud-managed-section">
          <h4> Cloud Managed Services</h4>
          <Box className="cloud-managed-cards">
            <Box className="cloud-managed-cards-scroll">
              {this.props.infraTopologyCategoryWiseData.data?.length ? (
                this.renderTable(this.props.infraTopologyCategoryWiseData.data)
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { infraTopologyCategoryWiseData } = state.environmentData;
  return { infraTopologyCategoryWiseData };
};

export default connect(mapStateToProps)(AllTable);

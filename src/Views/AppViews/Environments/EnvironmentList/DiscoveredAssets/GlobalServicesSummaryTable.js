import React from "react";
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
import { v4 } from "uuid";
import TitleIconAndCountOfCard from "Components/TitleIconAndCountOfCard";

class GlobalServicesSummaryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: 0,
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

  componentDidMount = () => {
    this.props.setCurrentGlobalDataCategory(this.props.data[0].elementType);
  };

  renderTable = (data) => {
    const { activeCategory } = this.state;
    const JSX = [];
    const childJSX = [];
    data.forEach((item, index) => {
      let cuttentItem = {
        active: activeCategory === index ? "active" : "",
        image: this.state.serivceImages[index],
        title: item.elementType,
        count: item.totalRecord,
      };
      childJSX.push(
        <TitleIconAndCountOfCard
          data={cuttentItem}
          onClickCard={(data) => {
            this.onClickCurrentGlobalDataCategory(index, item.elementType);
          }}
          key={v4()}
        />
      );
    });
    if (data.length) {
      JSX.push(
        <Box className="cloud-managed-cards global-sarvices-card" key={v4()} style={{marginTop:25}}>
          <Box className="cloud-managed-cards-scroll">{childJSX}</Box>
        </Box>
      );
    }
    if (JSX.length) {
      return JSX;
    } else {
      return [
        <Box className="cloud-managed-cards global-sarvices-card" key={v4()}>
          <Box className="cloud-managed-cards-scroll">
            <p style={{ fontSize: "16px",  color: "#000" }}>
              No Data Available!
            </p>
          </Box>
        </Box>,
      ];
    }
  };

  onClickCurrentGlobalDataCategory = (activeCategory, elementType) => {
    this.setState({ activeCategory });
    this.props.setCurrentGlobalDataCategory(elementType);
  };
  render() {
    return (
      <Box className="global-service-penal">
        <Box className="services-panel-tabs">
          <Box className="tabs-content">
            <Box className="cloud-managed-section">
              {this.renderTable(this.props.data)}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default GlobalServicesSummaryTable;

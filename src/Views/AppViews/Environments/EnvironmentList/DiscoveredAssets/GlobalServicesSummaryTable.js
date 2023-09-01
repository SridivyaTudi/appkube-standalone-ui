import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
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

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
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

  renderTable = (data) => {
    const { activeCategory } = this.state;
    const JSX = [];
    const childJSX = [];
    data.map((item, index) => {
      childJSX.push(
        <Box
          className={`service-card ${activeCategory === index ? "active" : ""}`}
          onClick={() => {
            this.setState({ activeCategory: index });
          }}
        >
          <Box className="service-icon">
            <img src={this.state.serivceImages[index]} alt="serviceicon" />
          </Box>
          <Box className="service-contant">
            <HtmlTooltip className="table-tooltip" title={item.elementType}>
              <label>{item.elementType}</label>
            </HtmlTooltip>
            <strong>{item.totalRecord}</strong>
          </Box>
        </Box>
      );
    });
    if (data.length) {
      JSX.push(
        <Box className="cloud-managed-cards">
          <Box className="cloud-managed-cards-scroll">{childJSX}</Box>
        </Box>
      );
    }
    if (JSX.length) {
      return JSX;
    } else {
      return [
        <Box className="cloud-managed-cards">
          <Box className="cloud-managed-cards-scroll">
            <p style={{ fontSize: "16px", margin: "22% auto", color: "#000" }}>
              No Data Available!
            </p>
          </Box>
        </Box>,
      ];
    }
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

import React from "react";
import { Box, List, ListItem } from "@mui/material";
import AllTable from "./AllTable";
import AppTable from "./AppTable";
import DataTable from "./DataTable";
import DataLakeTable from "./DataLakeTable";
import ServiceMeshTable from "./ServiceMeshTable";
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
import { connect } from "react-redux";

class CloudManagedDetails extends React.Component {
  tableMapping = [
    {
      name: "All",
      dataKey: "all",
    },
    {
      name: "App",
      dataKey: "app",
      component: AppTable,
    },
    {
      name: "Data",
      dataKey: "data",
      component: DataTable,
    },
    {
      name: "Datalake",
      dataKey: "datalake",
      component: DataLakeTable,
    },
    {
      name: "ServiceMesh",
      dataKey: "servicemesh",
      component: ServiceMeshTable,
    },
  ];
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
      activeTab: 0,
      activeCategory: 0,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  renderTable = (data) => {
    const { activeCategory } = this.state;
    const JSX = [];
    data.map((item, index) => {
      JSX.push(
        <Box
          className={`service-card ${activeCategory === index ? "active" : ""}`}
          onClick={() => {
            this.setState({ activeCategory: index });
            this.props.setCurrentTopologyCategory(item.elementType);
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
    const { activeTab } = this.state;
    return (
      <Box className="global-service-penal">
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <List>
              {this.tableMapping.map((tabData, index) => {
                return (
                  <ListItem
                    key={`ops-tab-${index}`}
                    className={index === activeTab ? "active" : ""}
                    onClick={() => this.setActiveTab(index)}
                  >
                    {tabData.name}
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box className="tabs-content">
            <Box className="cloud-managed-section">
              <h4>Cloud Managed Services</h4>
              <Box className="cloud-managed-cards">
                {activeTab === 0 ? (
                  <Box className="cloud-managed-cards-scroll">
                    {this.props.infraTopologyCategoryWiseData.data?.length ? (
                      this.renderTable(
                        this.props.infraTopologyCategoryWiseData.data
                      )
                    ) : (
                      <></>
                    )}
                  </Box>
                ) : activeTab === 1 ? (
                  <AppTable />
                ) : activeTab === 2 ? (
                  <DataTable />
                ) : activeTab === 3 ? (
                  <DataLakeTable />
                ) : activeTab === 4 ? (
                  <ServiceMeshTable />
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  const { infraTopologyCategoryWiseData } = state.environmentData;
  return { infraTopologyCategoryWiseData };
};

export default connect(mapStateToProps)(CloudManagedDetails);

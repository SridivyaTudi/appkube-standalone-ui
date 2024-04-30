import React, { Component } from "react";
import { Box, Button, Grid, ListItem } from "@mui/material";
import { v4 } from "uuid";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import AlertFilterSection from "../Components/AlertFilterSection";
let filterData = [
  {
    name: "Region",
    value: "US East 2",
  },
  {
    name: "AWS Account",
    value: "AWS (657",
  },
  {
    name: "Product Enclave ",
    value: "8 VPC",
  },
  {
    name: "Element Type",
    value: "EC2",
  },

  {
    name: "App",
    value: "Data",
  },
  {
    name: "Element Type",
    value: "EKS",
  },
];
class MonitorAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: filterData,
    };
  }
  setActiveTab = (activeTab) => {
    this.setState({ activeTab, selectedFilters: filterData }, () => {
      const discoveredData = this.props.discoveredAssetsData?.data || [];
      this.manipulateDiscoveredData(discoveredData);
    });
  };
  render() {
    const { activeTab, selectedFilters, assestsData } = this.state;
    return (
      <Box className="alert-container">
        <Box className="list-heading">
          <h3>Monitor All Alerts</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() =>
                  this.props.navigate(`${APP_PREFIX_PATH}/app/alerts`)
                }
              >
                Home
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Monitor | Alerts</li>
            </ul>
          </Box>
        </Box>
        <Box>
          <AlertFilterSection
           data={selectedFilters}
           onClickCloseIcon={(id) => this.onClickCloseIcon(id)}
           onClickClearFilter={() => this.setState({ selectedFilters: [] })}
           />
        </Box>
      </Box>
    );
  }
}

export default MonitorAlerts;

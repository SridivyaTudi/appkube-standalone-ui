import React, { Component } from "react";
import { Box, Button, Grid, List, ListItem } from "@mui/material";
import { v4 } from "uuid";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import AlertFilterSection from "../Components/AlertFilterSection";
import AlertTable from "../Components/AlertTable";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { filter } from "d3";
let tableData = [
  {
    name: "Percentage CPU 1",
    ticketID: 1029221,
    ticketStatus: "Generated",
    Severity: "Critical",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "percentage-status",
  },
  {
    name: "Percentage CPU 2",
    ticketID: 102922,
    ticketStatus: "Generated",
    Severity: "Medium",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "medium",
  },
  {
    name: "Percentage CPU 3",
    ticketID: 102922,
    ticketStatus: "Generated",
    Severity: "Low",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "low",
  },
  {
    name: "Percentage CPU 4",
    ticketID: 102922,
    ticketStatus: "Generated",
    Severity: "high",
    alertState: "Open",
    stateClass: "Medium",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "high",
  },
  {
    name: "Percentage CPU 1",
    ticketID: 1029221,
    ticketStatus: "Generated",
    Severity: "Critical",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "percentage-status",
  },
  {
    name: "Percentage CPU 2",
    ticketID: 102922,
    ticketStatus: "Generated",
    Severity: "Medium",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "medium",
  },
  {
    name: "Percentage CPU 3",
    ticketID: 102922,
    ticketStatus: "Generated",
    Severity: "Low",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "low",
  },
  {
    name: "Percentage CPU 4",
    ticketID: 102922,
    ticketStatus: "Generated",
    Severity: "Medium",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "medium",
  },
  {
    name: "Percentage CPU 1",
    ticketID: 1029221,
    ticketStatus: "Generated",
    Severity: "High",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "high",
  },
  {
    name: "Percentage CPU 2",
    ticketID: 102922,
    ticketStatus: "Generated",
    Severity: "High",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "high",
  },
  {
    name: "Percentage CPU 3",
    ticketID: 102922,
    ticketStatus: "Generated",
    Severity: "Low",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "low",
  },
  {
    name: "Percentage CPU 4",
    ticketID: 102922,
    ticketStatus: "Generated",
    Severity: "Medium",
    alertState: "Open",
    affectedResource: "Prod_DB_SYN14",
    triggeredTime: "2024-03-08; 15:45",
    assignedWorkflow: "Alert Management",
    actions: "",
    stateClass: "medium",
  },
];

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
      assestsData: tableData,
      isBulkActionDropDownOpen: false,
    };
  }
  setActiveTab = (activeTab) => {
    this.setState({ activeTab, selectedFilters: filterData }, () => {
      const discoveredData = this.props.discoveredAssetsData?.data || [];
      this.manipulateDiscoveredData(discoveredData);
    });
  };
  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { assestsData, searchedKey } = this.state;
    let data = tableData || [];
    if (data?.length) {
      if (value) {
        assestsData = data.filter((tableData) => {
          if (tableData?.name.toLowerCase().includes(value.toLowerCase())) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        assestsData = data;
      }
      this.setState({ assestsData, searchedKey: value });
    }
  };

  toggleBulkAction = () => {
    this.setState({
      isBulkActionDropDownOpen: !this.state.isBulkActionDropDownOpen,
    });
  };
  renderDropDownData = () => {
    let { selectedTimeFrame, selectedDates } = this.state;
    return [
      "Delete",
      "Archive",
      "Processed",
      "Create Ticket",
      "Execute Workfolw",
    ].map((data, index) => {
      return (
        <ListItem key={index}>
          {" "}
          <i className="fa-solid fa-circle-dot"></i>
          {data}
        </ListItem>
      );
    });
  };
  render() {
    const {
      searchedKey,
      selectedFilters,
      assestsData,
      isBulkActionDropDownOpen,
    } = this.state;
    return (
      <Box className="alert-container">
        <Box className="list-heading">
          <h3>Monitor All Alerts</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() => this.props.navigate(`${APP_PREFIX_PATH}/alerts`)}
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
        <Box className="m-t-4">
          <AlertFilterSection
            data={selectedFilters}
            onClickCloseIcon={(id) =>
              this.setState({
                selectedFilters: selectedFilters.filter(
                  (filter, index) => index !== id
                ),
              })
            }
            onClickClearFilter={() => this.setState({ selectedFilters: [] })}
          />
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">All Alerts</h4>
            <Box className="d-flex">
              <Box className="search m-r-2">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchedKey}
                  onChange={this.handleSearchChange}
                  autoFocus="autoFocus"
                />
              </Box>
              <Box className="fliter-button">
                <Button
                  className="light-btn p-l-15 p-r-15"
                  onClick={this.toggleBulkAction}
                >
                  Bulk Action
                </Button>
                {isBulkActionDropDownOpen && (
                  <div
                    className={
                      isBulkActionDropDownOpen
                        ? "fliter-collapse active"
                        : "fliter-collapse"
                    }
                  >
                    <List>{this.renderDropDownData()}</List>
                  </div>
                )}

                <div
                  className={
                    isBulkActionDropDownOpen
                      ? "fliters-collapse-bg active"
                      : "fliters-collapse-bg"
                  }
                  onClick={this.toggleBulkAction}
                />
              </Box>
            </Box>
          </Box>
          <AlertTable
            data={assestsData}
            //loderStatus={discoveredAssetsData?.status === status.IN_PROGRESS}
          />
        </Box>
      </Box>
    );
  }
}

export default navigateRouter(MonitorAlerts);

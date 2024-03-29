import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import AwsComponent from "./AwsComponent";
import AzureComponent from "./AzureComponent";
import GcpComponent from "./GcpComponent";
import { connect } from "react-redux";
import { getSpendOverview } from "Redux/Reports/ReportsThunk";
import { GRANULARITY_DROPDOWN_DATA, GRANULARITY_TYPE } from "CommonData";
import { v4 } from "uuid";

export class OverviewDashboard extends Component {
  tabMapping = [
    {
      name: "AWS",
      dataKey: "aws",
      index: 0,
    },
    {
      name: "AZURE",
      dataKey: "azure",
      index: 1,
    },
    {
      name: "GCP",
      dataKey: "gcp",
      index: 2,
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isSelectDepartmentOpen: false,
      selectedGranularity: GRANULARITY_TYPE.QUARTERLY.toLowerCase(),
    };
  }
  componentWillUnmount() {
    this.removeTooltipElement();
  }

  removeTooltipElement = () => {
    try {
      const elements = document.getElementsByClassName("chart-tooltip");
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  // Render tabs
  renderTabMenu = () => {
    const { activeTab } = this.state;
    return (
      <List className="tabs-menu">
        {this.tabMapping.map((tabData, index) => {
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
    );
  };

  // Render active tab component
  renderActiveTabOfComponent = () => {
    const { activeTab, selectedGranularity } = this.state;
    return (
      <Box className="tabs-content">
        {activeTab === 0 ? (
          <AwsComponent selectedGranularity={selectedGranularity} />
        ) : activeTab === 1 ? (
          <AzureComponent selectedGranularity={selectedGranularity} />
        ) : activeTab === 2 ? (
          <GcpComponent selectedGranularity={selectedGranularity} />
        ) : (
          <></>
        )}
      </Box>
    );
  };

  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
    });
  };

  renderDropDownData = () => {
    let { selectedGranularity } = this.state;
    return GRANULARITY_DROPDOWN_DATA.map((data) => {
      return (
        <ListItem
          onClick={() => this.onClickDropDown(data.key)}
          key={v4()}
          className={`${data.key === selectedGranularity ? "active" : ""}`}
        >
          <i className="fa-solid fa-circle-dot"></i>
          {data.value}
        </ListItem>
      );
    });
  };

  onClickDropDown = (selectedGranularity) => {
    if (selectedGranularity !== this.state.selectedGranularity) {
      this.setState({ selectedGranularity, isSelectDepartmentOpen: false });
    }
  };

  getSelectedGranularity = () => {
    let { selectedGranularity } = this.state;
    let findValue = GRANULARITY_DROPDOWN_DATA.find(
      (data) => data.key === selectedGranularity
    );

    return findValue.value || "";
  };

  render() {
    const { isSelectDepartmentOpen } = this.state;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>AWS Overview Dashboard</h3>
          <Box className="fliter-button">
            <Button
              className="light-btn p-l-15 p-r-15"
              onClick={this.toggleSelectDepartment}
            >
              <i class="fas fa-calendar-minus m-r-2"></i>{" "}
              {this.getSelectedGranularity()}
            </Button>
            {this.state.isSelectDepartmentOpen === true && (
              <div
                className={
                  isSelectDepartmentOpen
                    ? "fliter-collapse active"
                    : "fliter-collapse"
                }
              >
                <List>{this.renderDropDownData()}</List>
              </div>
            )}

            <div
              className={
                isSelectDepartmentOpen
                  ? "fliters-collapse-bg active"
                  : "fliters-collapse-bg"
              }
              onClick={this.toggleSelectDepartment}
            />
          </Box>
        </Box>
        <Box className="reports-tab-section">
          <Box className="tabs">{this.renderTabMenu()}</Box>
          {this.renderActiveTabOfComponent()}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  getSpendOverview,
};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewDashboard);

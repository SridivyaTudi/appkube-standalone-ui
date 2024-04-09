import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import Compute from "./Compute";
import Storage from "./Storage";
import Database from "./Database";
import Network from "./Network";
import Other from "./Other";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { GRANULARITY_DROPDOWN_DATA, GRANULARITY_TYPE } from "CommonData";
import { v4 } from "uuid";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class SpendOverview extends Component {
  tabMapping = [
    {
      name: "Compute",
      dataKey: "compute",
      index: 0,
    },
    {
      name: "Storage",
      dataKey: "storage",
      index: 1,
    },
    {
      name: "Database",
      dataKey: "database",
      index: 2,
    },
    {
      name: "Network",
      dataKey: "network",
      index: 3,
    },
    {
      name: "Other",
      dataKey: "other",
      index: 4,
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      showSelectFilterModal: false,
      isGranularityDropDownOpen: false,
      selectedGranularity: GRANULARITY_TYPE.QUARTERLY.toLowerCase(),
    };
  }
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
          <Compute selectedGranularity={selectedGranularity} />
        ) : activeTab === 1 ? (
          <Storage selectedGranularity={selectedGranularity} />
        ) : activeTab === 2 ? (
          <Database selectedGranularity={selectedGranularity} />
        ) : activeTab === 3 ? (
          <Network selectedGranularity={selectedGranularity} />
        ) : activeTab === 4 ? (
          <Other selectedGranularity={selectedGranularity} />
        ) : (
          <></>
        )}
      </Box>
    );
  };

  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
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

  toggleGranularity = () => {
    this.setState({
      isGranularityDropDownOpen: !this.state.isGranularityDropDownOpen,
    });
  };

  getSelectedGranularity = () => {
    let { selectedGranularity } = this.state;
    let findValue = GRANULARITY_DROPDOWN_DATA.find(
      (data) => data.key === selectedGranularity
    );

    return findValue.value || "";
  };

  onClickDropDown = (selectedGranularity) => {
    if (selectedGranularity !== this.state.selectedGranularity) {
      this.setState({ selectedGranularity, isGranularityDropDownOpen: false });
    }
  };
  render() {
    const { showSelectFilterModal, isGranularityDropDownOpen } = this.state;

    return (
      <>
        <Box className="new-reports-container">
          <Box className="list-heading">
            <h3>Spend Overview</h3>
            <Box className="breadcrumbs">
              <ul>
                <li
                  onClick={() =>
                    this.props.navigate(
                      `${APP_PREFIX_PATH}/new-reports/over-view-dashboard`
                    )
                  }
                >
                  Overview Dashboard
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">spend-overview</li>
              </ul>
            </Box>
          </Box>
          <Box className="reports-tab-section">
            <Box className="tabs">
              {this.renderTabMenu()}
              <Box className="d-flex ">
                <Button
                  className="light-btn p-l-15 p-r-15 m-r-3"
                  onClick={this.handleSelectFilterModal}
                >
                  <i className="fas fa-filter m-r-2"></i> Filter
                </Button>
                <Box className="fliter-button">
                  <Button
                    className="light-btn p-l-15 p-r-15"
                    onClick={this.toggleGranularity}
                  >
                    <i className="fas fa-calendar-minus m-r-2"></i>{" "}
                    {this.getSelectedGranularity()}
                  </Button>
                  {isGranularityDropDownOpen && (
                    <div
                      className={
                        isGranularityDropDownOpen
                          ? "fliter-collapse active"
                          : "fliter-collapse"
                      }
                    >
                      <List>{this.renderDropDownData()}</List>
                    </div>
                  )}

                  <div
                    className={
                      isGranularityDropDownOpen
                        ? "fliters-collapse-bg active"
                        : "fliters-collapse-bg"
                    }
                    onClick={this.toggleGranularity}
                  />
                </Box>
              </Box>
            </Box>
            {this.renderActiveTabOfComponent()}
          </Box>
        </Box>
        {showSelectFilterModal ? (
          <SelectFilterModal
            showModal={showSelectFilterModal}
            handleSelectFilterModal={this.handleSelectFilterModal}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default navigateRouter(SpendOverview);

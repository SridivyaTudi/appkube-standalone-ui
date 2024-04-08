import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import Compute from "./Compute";
import Storage from "./Storage";
import Network from "./Network";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { GRANULARITY_DROPDOWN_DATA, GRANULARITY_TYPE } from "CommonData";
import { v4 } from "uuid";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class PotentialSavings extends Component {
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
      name: "Network",
      dataKey: "network",
      index: 2,
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      showSelectFilterModal: false,
      isSelectDepartmentOpen: false,
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
          <Network selectedGranularity={selectedGranularity} />
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

  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
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
      this.setState({ selectedGranularity, isSelectDepartmentOpen: false });
    }
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
  render() {
    const { showSelectFilterModal, isSelectDepartmentOpen } = this.state;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3> Potential savings</h3>
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
              <li className="active"> Potential savings</li>
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
          </Box>
          {this.renderActiveTabOfComponent()}
        </Box>
        {showSelectFilterModal ? (
          <SelectFilterModal
            showModal={showSelectFilterModal}
            handleSelectFilterModal={this.handleSelectFilterModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default navigateRouter(PotentialSavings);

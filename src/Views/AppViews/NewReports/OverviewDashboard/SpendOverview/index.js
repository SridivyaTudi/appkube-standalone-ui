import React, { Component } from "react";
import { Box, Button, List, ListItem, IconButton } from "@mui/material";
import Compute from "./Compute";
import Storage from "./Storage";
import Database from "./Database";
import Network from "./Network";
import Other from "./Other";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
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
    const { activeTab } = this.state;
    return (
      <Box className="tabs-content">
        {activeTab === 0 ? (
          <Compute />
        ) : activeTab === 1 ? (
          <Storage />
        ) : activeTab === 2 ? (
          <Database />
        ) : activeTab === 3 ? (
          <Network />
        ) : activeTab === 4 ? (
          <Other />
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

  render() {
    const { showSelectFilterModal } = this.state;

    return (
      <>
        <Box className="new-reports-container">
          <Box className="list-heading">
            <h3>Spend Overview</h3>
            <Box className="breadcrumbs">
              <ul>
                <li>Overview Dashboard</li>
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
                <Button className="light-btn p-l-15 p-r-15">
                  <i className="fas fa-calendar-minus m-r-2"></i> Last Month
                </Button>
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

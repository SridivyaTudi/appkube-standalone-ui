import React, { Component } from "react";
import { v4 } from "uuid";
import { Box } from "@mui/material";

class AssetsEnvironmentTab extends Component {
  setActiveTab = (activeTab) => {
    try {
      this.props.setActiveTab(activeTab);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let { activeTab, data } = this.props;
    return (
      data?.length &&
      data.map((tabData, index) => {
        return (
          <Box
            key={v4()}
            className={`assets-sevice-tab ${
              index === activeTab ? "active" : ""
            }`}
            onClick={() => this.setActiveTab(index)}
          >
            <Box className="service-image">
              <img src={tabData.image} alt="" />
            </Box>
            <label>{tabData.label}</label>
          </Box>
        );
      })
    );
  }
}

export default AssetsEnvironmentTab;

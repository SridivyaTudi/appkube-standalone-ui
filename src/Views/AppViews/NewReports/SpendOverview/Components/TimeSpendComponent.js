import React, { Component } from "react";
import { Box, Grid, Button, List, ListItem } from "@mui/material";
import DollerIcon from "assets/img/report/doller-icon.png";

class TimeSpendComponent extends Component {
  render() {
    return (
      <Box className="spend-control-cards">
        <Box className="time-spend-card">
          <Box className="spend-icon">
            <img src={DollerIcon} alt="" />
          </Box>
          <Box className="time-spend-content">
            <label>Last Month Spend</label>
            <strong>$90,000</strong>
            <Box className="d-flex align-items-center">
              <span>
                <i class="fas fa-long-arrow-down"></i> 5 &#37;
              </span>
              <p className="m-b-0 m-t-0">vs Last Month</p>
            </Box>
          </Box>
        </Box>
        <Box className="time-spend-card">
          <Box className="spend-icon">
            <img src={DollerIcon} alt="" />
          </Box>
          <Box className="time-spend-content">
            <label>Month to date spend</label>
            <strong>$70,000</strong>
            {/* <Box className="d-flex align-items-center">
              <span>
                <i class="fas fa-long-arrow-down"></i> 5 &#37;
              </span>
              <p className="m-b-0 m-t-0">vs Last Month</p>
            </Box> */}
          </Box>
        </Box>
        <Box className="time-spend-card">
          <Box className="spend-icon">
            <img src={DollerIcon} alt="" />
          </Box>
          <Box className="time-spend-content">
            <label>Forecasted Spend</label>
            <strong>$90,000</strong>
            <Box className="d-flex align-items-center">
              <span>
                <i class="fas fa-long-arrow-down"></i> 5 &#37;
              </span>
              <p className="m-b-0 m-t-0">vs Last Month</p>
            </Box>
          </Box>
        </Box>
        <Box className="time-spend-card">
          <Box className="spend-icon">
            <img src={DollerIcon} alt="" />
          </Box>
          <Box className="time-spend-content">
            <label>Avg Daily Spend</label>
            <strong>$90,000</strong>
            <Box className="d-flex align-items-center">
              <span>
                <i class="fas fa-long-arrow-down"></i> 5 &#37;
              </span>
              <p className="m-b-0 m-t-0">vs Last Month</p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default TimeSpendComponent;

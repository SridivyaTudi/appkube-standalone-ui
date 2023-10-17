import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import JavaSpringbot from "assets/img/assetmanager/java-springbot.png";

class JavaSpringbootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Box className="nginx-cards">
        <Box className="title">
          <Box className="head-left">
            <Box className="environment-image">
              <img src={JavaSpringbot} alt="" />
            </Box>
            <Box className="name">Java Springboot</Box>
          </Box>
          <Box className="head-right">
            <Button className="primary-btn min-width" variant="contained">
              View Explorer
            </Button>
          </Box>
        </Box>
        <Box className="nginx-content gateway-content">
          <Box className="autoscaling-cards">
            <Box className="card-box">
              <span>Total Request</span>
              <strong>10,000</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Failed Request</span>
              <strong>200</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>CPU Usage</span>
              <strong>30%</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Memory Usage</span>
              <strong>256 MB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Thread Count</span>
              <strong>50</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>GC Minor</span>
              <strong>500</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default JavaSpringbootComponent;

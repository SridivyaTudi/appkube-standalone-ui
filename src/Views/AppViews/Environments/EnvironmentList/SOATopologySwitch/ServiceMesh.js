import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import ServiceMesh from "assets/img/assetmanager/service-mesh.png";

class ServiceMeshComponent extends Component {
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
              <span>
                <img src={ServiceMesh} alt="" />
              </span>
            </Box>
            <Box className="name">Service mesh</Box>
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
              <span>Success Rate</span>
              <strong>98%</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Request Count</span>
              <strong>10,000</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Latency</span>
              <strong>P50: 20 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>5xx Errors</span>
              <strong>12</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Retry Rate</span>
              <strong>5%</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Circuit Breaker State </span>
              <strong>10</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default ServiceMeshComponent;

import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import Nglnx from "assets/img/assetmanager/nglnx.png";

class FunctionComponent extends Component {
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
              <img src={Nglnx} alt="" />
            </Box>
            <Box className="name">Function</Box>
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
              <span>Request Count</span>
              <strong>10,000</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Integration Count</span>
              <strong>7000</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>4xx Errors</span>
              <strong>100</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Latency</span>
              <strong>50 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Integration Latency</span>
              <strong>30 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Data Transfer IN</span>
              <strong>50 MB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default FunctionComponent;

import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import Ingress from "assets/img/assetmanager/ingress.png";

class IngressComponent extends Component {
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
              <span> <img src={Ingress} alt="" /></span>
            </Box>
            <Box className="name">Ingress</Box>
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
              <span>Controller Request</span>
              <strong>5,000</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Controller Response Time</span>
              <strong>P50: 20 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Controller Response Time</span>
              <strong>P90: 40 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Controller Latency</span>
              <strong>P90: 20 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Controller Latency</span>
              <strong>P99: 50 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Controller Request Rate</span>
              <strong>100 req/sec</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Resource Error Rate</span>
              <strong>1%</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Resource Latency</span>
              <strong>P50: 5 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Resource Latency</span>
              <strong>P90: 10 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Controller Traffic Volume</span>
              <strong>10 MB/sec</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>CPU Usage</span>
              <strong>30 %</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Memory Usage</span>
              <strong>100 MB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Resource Latency</span>
              <strong>P99: 20 ms</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Resource Traffic Volume</span>
              <strong>5 MB/sec </strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Resource uptime</span>
              <strong>99.9%</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default IngressComponent;

import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import LoadBalancer from "assets/img/assetmanager/load-balancer.png";

class LoadBalancerComponent extends Component {
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
                <img src={LoadBalancer} alt="" />
              </span>
            </Box>
            <Box className="name">Load balancer</Box>
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
              <span>Load balancer</span>
              <strong>18</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Port Allocation Error Count</span>
              <strong>1,875</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>TCP Target reset count</span>
              <strong>285</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Active Flow Count TCP</span>
              <strong>1652</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Healthy Host</span>
              <strong>12</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>UnHealthy Host</span>
              <strong>07</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>TCP Client reset count</span>
              <strong>365</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>TCP Elb reset count</span>
              <strong>658</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>New Flow Count TCP</span>
              <strong>587</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>TLS New Connection</span>
              <strong>1562</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>TLS Active Connection</span>
              <strong>1742</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>TCP Procesed Bytes</span>
              <strong>1875</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default LoadBalancerComponent;

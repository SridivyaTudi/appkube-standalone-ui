import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import Cluster from "assets/img/assetmanager/cluster.png";

class ClusterComponent extends Component {
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
                <img src={Cluster} alt="" />
              </span>
            </Box>
            <Box className="name">Cluster</Box>
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
              <span>CPU Reservation</span>
              <strong>30%</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Memory Reservation</span>
              <strong>256 MB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Running Task</span>
              <strong>10</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Memory Utilization</span>
              <strong>70</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Data Transfer IN</span>
              <strong>10 MB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Data Transfer OUT</span>
              <strong>20 MB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Task Failures</span>
              <strong>2</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Pending Tasks</span>
              <strong>3</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>CPU Utilization</span>
              <strong>50%</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Active Connections</span>
              <strong>100</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>New Connections</span>
              <strong>20</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Container Health</span>
              <strong>99.9%</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default ClusterComponent;

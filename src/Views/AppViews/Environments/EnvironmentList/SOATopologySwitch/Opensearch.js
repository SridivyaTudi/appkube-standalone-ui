import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import Nglnx from "assets/img/assetmanager/nglnx.png";
import Opensearch from "assets/img/assetmanager/opensearch.png";
class OpensearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Box className="nginx-cards opensearch-cards">
      <Box className="title">
        <Box className="head-left">
          <Box className="icon">
            <img src={Opensearch} alt="" />
          </Box>
          <Box className="name">Opensearch</Box>
        </Box>
        <Box className="head-right">
          <Button
            className="primary-btn min-width"
            variant="contained"
          >
            View Explorer
          </Button>
        </Box>
      </Box>
      <Box className="nginx-content">
        <Box className="autoscaling-cards">
          <Box className="card-box">
            <span>Latency</span>
            <strong>512GB</strong>
          </Box>
          <Box className="card-box">
            <span>Throughput</span>
            <strong>512GB</strong>
          </Box>
          <Box className="card-box">
            <span>Resources Utilization</span>
            <strong>512GB</strong>
          </Box>
          <Box className="card-box">
            <span>Query Performance </span>
            <strong>156</strong>
          </Box>
          <Box className="card-box">
            <span>Cache Hit Rate</span>
            <strong>156</strong>
          </Box>
          <Box className="card-box">
            <span>Up Times</span>
            <strong>12356</strong>
          </Box>
          <Box className="card-box">
            <span>Failover</span>
            <strong>156</strong>
          </Box>
          <Box className="card-box">
            <span>Replications </span>
            <strong>12356</strong>
          </Box>
          <Box className="card-box">
            <span>Back Up</span>
            <strong>156</strong>
          </Box>
          <Box className="card-box">
            <span>Restore</span>
            <strong>12356</strong>
          </Box>
          <Box className="card-box">
            <span>Error Rates</span>
            <strong>156</strong>
          </Box>
          <Box className="card-box">
            <span>Data Protection </span>
            <strong>12356</strong>
          </Box>
        </Box>
      </Box>
    </Box>
    );
  }
}
export default OpensearchComponent;

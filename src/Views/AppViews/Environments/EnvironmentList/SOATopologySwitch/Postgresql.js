import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import Nglnx from "assets/img/assetmanager/nglnx.png";
import PostgreSql from "assets/img/assetmanager/postgresql.png";
class PostgresqlComponent extends Component {
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
            <img src={PostgreSql} alt="" />
          </Box>
          <Box className="name">Postgre SQL</Box>
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
            <span>Concurrency</span>
            <strong>156</strong>
          </Box>
          <Box className="card-box">
            <span>Failover</span>
            <strong>12356</strong>
          </Box>
          <Box className="card-box">
            <span>Error</span>
            <strong>156</strong>
          </Box>
          <Box className="card-box">
            <span>RPO </span>
            <strong>12356</strong>
          </Box>
          <Box className="card-box">
            <span>RTO</span>
            <strong>156</strong>
          </Box>
          <Box className="card-box">
            <span>Response Time</span>
            <strong>12356</strong>
          </Box>
          <Box className="card-box">
            <span>Load Handling</span>
            <strong>156</strong>
          </Box>
          <Box className="card-box">
            <span>Incident response </span>
            <strong>12356</strong>
          </Box>
        </Box>
      </Box>
    </Box>
    );
  }
}
export default PostgresqlComponent;

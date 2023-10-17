import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import PostgreSqiDark from "assets/img/assetmanager/postgre-sqi-dark.png";
class PostgresqlComponent extends Component {
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
              <img src={PostgreSqiDark} alt="" />
            </Box>
            <Box className="name">Postgre SQl</Box>
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
              <span>CPU Utilization</span>
              <strong>256GB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Memory Usage</span>
              <strong>256GB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Storage</span>
              <strong>512GB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Active Connection </span>
              <strong>1024</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Idle Connection</span>
              <strong>1024</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Error Count</span>
              <strong>2698</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Latency</span>
              <strong>235 </strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>THroughtput </span>
              <strong>434 GB/S </strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Read Iops</span>
              <strong>750</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Write Iops</span>
              <strong>450</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Replication lag</span>
              <strong>569</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Index size </span>
              <strong>50GB</strong>
              <p>Compared to $21,490 last year</p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default PostgresqlComponent;

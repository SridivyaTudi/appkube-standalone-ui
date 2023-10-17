import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import FunctionImg from "assets/img/assetmanager/function-img.png";

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
              <span>
                <img src={FunctionImg} alt="" />
              </span>
            </Box>
            <Box className="name">Lambda</Box>
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
              <span>Function</span>
              <Box className="lambda-price">
                <strong>18,6875 </strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Errors</span>
              <Box className="lambda-price">
                <strong>2,875 </strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Throttles</span>
              <Box className="lambda-price">
                <strong>285 </strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Trends</span>
              <Box className="lambda-price">
                <strong>123 </strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Failure Function</span>
              <Box className="lambda-price">
                <strong>15 </strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>CPU Used</span>
              <Box className="lambda-price">
                <strong>256MB </strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Request</span>
              <Box className="lambda-price">
                <strong>16522 </strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Memory Used</span>
              <Box className="lambda-price">
                <strong>512MB </strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>****</span>
              <Box className="lambda-price">
                <strong>12,875 </strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Latency</span>
              <Box className="lambda-price">
                <strong>365</strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>Net Received</span>
              <Box className="lambda-price">
                <strong>1562</strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
            <Box className="card-box">
              <span>----</span>
              <Box className="lambda-price">
                <strong>12,875</strong>
                <span>10%</span>
              </Box>
              <p>Compared to $21,490 last year</p>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default FunctionComponent;

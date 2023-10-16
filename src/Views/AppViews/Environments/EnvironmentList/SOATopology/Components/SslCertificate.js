import { Component } from "react";
import { Box, Grid, Button, List, ListItem } from "@mui/material";
import Aws from "assets/img/aws.png";
class SSLCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="certificate-cards">
        <Box className="title">
          <Box className="environment-image">
            <img src={Aws} alt="" />
          </Box>
          <Box className="name">Certificate</Box>
        </Box>
        <Box className="certificate-content">
          <Box className="overview-content">
            <Box className="heading">Overview</Box>
            <p className="overview-text">
              ACM is a service for easily managing SSL/TLS certificates on AWS.
              It automates certificate provisioning, renewal, and integration
              with AWS resources like Load Balancers and CloudFront. ACM ensures
              strong security with HSM storage and offers a free tier.
            </p>
          </Box>
          <Box className="certificate-status">
            <Box className="heading">Certificate status</Box>
            <List>
              <ListItem>
                <Box className="status-content">
                  <label className="d-block">Identifier</label>
                  <span className="d-block">A696rthy</span>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="status-content ">
                  <label className="d-block">Status</label>
                  <Box className="status">
                    <i className="fa-solid fa-check"></i>
                    Issued
                  </Box>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="status-content ">
                  <label className="d-block">ARN</label>
                  <span className="d-block">ARN:AWS:US-east</span>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="status-content ">
                  <label className="d-block">Type</label>
                  <span className="d-block">Amazon Issued</span>
                </Box>
              </ListItem>
            </List>
          </Box>
          <Box className="certificate-status">
            <Box className="heading">Details</Box>
            <List>
              <ListItem>
                <Box className="status-content">
                  <label className="d-block">Identifier</label>
                  <span className="d-block">A696rthy</span>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="status-content ">
                  <label className="d-block">Signature Algorithm</label>
                  <span>A696rthy</span>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="status-content ">
                  <label className="d-block">Public Key info</label>
                  <span className="d-block">A696rthy</span>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="status-content ">
                  <label className="d-block">Expiry Date</label>
                  <span className="d-block">20/02/2023</span>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="status-content ">
                  <label className="d-block">Issue Date</label>
                  <span className="d-block">21/02/2021</span>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="status-content ">
                  <label className="d-block">Renewal Date</label>
                  <span className="d-block">21/02/2023</span>
                </Box>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default SSLCertificate;

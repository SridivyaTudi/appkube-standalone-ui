import React, { Component } from "react";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";
import OprationMode1 from "assets/img/assetmanager/opration-mode1.png";
import OprationMode2 from "assets/img/assetmanager/opration-mode2.png";
import AccountPolicy from "Views/AppViews/Environments/NewAccountSetup/AccountPolicy";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export class NewAccountSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: "read_mode",
      accountPolicy: false,
    };
  }

  render() {
    const { accountPolicy, service } = this.state;
    return accountPolicy ? (
      <AccountPolicy
        service={service}
        previousStep={() => {
          this.setState({ accountPolicy: false });
        }}
      />
    ) : (
      <Box className="new-account-container">
        <Box className="page-heading">
          <h3>New AWS Acoount Setup</h3>
          <Link
            className="close-btn"
            to={`${APP_PREFIX_PATH}/assets/environments`}
          >
            <i className="fa-solid fa-xmark"></i>
          </Link>
        </Box>
        <Box className="opration-mode-section text-center">
          <Box className="opration-head-section">
            <h4>Operation Mode</h4>
            <p>
              Use our pre-existing template or you can create your own code or
              migrate your project to get started
            </p>
          </Box>
          <Box className="opration-cards">
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Grid item xs={6}>
                  <Box
                    className={`opration-card ${
                      service === "read_mode" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ service: "read_mode" });
                    }}
                  >
                    <Box className="card-images">
                      <img src={OprationMode1} alt="opration" />
                    </Box>
                    <div className="card-title">Read-Only Mode</div>
                    <p>
                      in the Read only, Appkube can be used visualization,
                      monitoring and auditing, and will not modify or actively
                      manage your cloud environment
                    </p>
                    <Box className="available-features">
                      <label>Available Features in Read-Only Mode:</label>
                      <ul>
                        <li>
                          Appkube Asset Manager for visualization of Cloud
                        </li>
                        <li>Business To Infrastructure Topology</li>
                        <li>Service SLE monitoring</li>
                        <li>Alerts</li>
                        <li>RCA Central</li>
                        <li>Audit trail</li>
                      </ul>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    className={`opration-card ${
                      service === "automation_mode" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ service: "automation_mode" });
                    }}
                  >
                    <Box className="card-images">
                      <img src={OprationMode2} alt="opration" />
                    </Box>
                    <div className="card-title">Automation Mode</div>
                    <p>
                      in the Automation Mode, Appkube can be used to actively
                      manage your cloud and enforce best practices
                    </p>
                    <Box className="available-features">
                      <label>Available Features in Automation Mode:</label>
                      <ul>
                        <li>
                          Appkube Asset Manager for visualization of Cloud
                        </li>
                        <li>Business To Infrastructure Topology</li>
                        <li>Service SLE monitoring</li>
                        <li>Alerts</li>
                        <li>RCA Central</li>
                        <li>Audit trail</li>
                        <li>Automation Central</li>
                        <li>DevSecOps Tooling</li>
                      </ul>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="d-block get-started-button">
            <Button
              className="primary-btn width-25"
              style={{ color: "white" }}
              onClick={() => {
                this.setState({ accountPolicy: true });
              }}
            >
              Get started
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default NewAccountSetup;

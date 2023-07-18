import React, { Component } from "react";
import OprationMode1 from "assets/img/assetmanager/opration-mode1.png";
import OprationMode2 from "assets/img/assetmanager/opration-mode2.png";
import AccountPolicy from "views/app-views/Environments/NewAccountSetup/AccountPolicy";
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
    return this.state.accountPolicy ? (
      <AccountPolicy
        service={this.state.service}
        previousStep={() => {
          this.setState({ accountPolicy: false });
        }}
      />
    ) : (
      <div className="new-account-container">
        <div className="page-heading">
          <h3>New AWS Acoount Setup</h3>
        </div>
        <div className="opration-mode-section text-center">
          <div className="opration-head-section">
            <h4>Operation Mode</h4>
            <p>
              Use our pre-existing template or you can create your own code or
              migrate your project to get started
            </p>
          </div>
          <div className="opration-cards">
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Grid item xs={6}>
                  <div
                    className={`opration-card ${
                      this.state.service == "read_mode" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ service: "read_mode" });
                    }}
                  >
                    <div className="card-images">
                      <img src={OprationMode1} alt="opration" />
                    </div>
                    <div className="card-title">Read-Only Mode</div>
                    <p>
                      in the Read only, Appkube can be used visualization,
                      monitoring and auditing, and will not modify or actively
                      manage your cloud environment
                    </p>
                    <div className="available-features">
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
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    className={`opration-card ${
                      this.state.service == "automation_mode" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ service: "automation_mode" });
                    }}
                  >
                    <div className="card-images">
                      <img src={OprationMode2} alt="opration" />
                    </div>
                    <div className="card-title">Automation Mode</div>
                    <p>
                      in the Automation Mode, Appkube can be used to actively
                      manage your cloud and enforce best practices
                    </p>
                    <div className="available-features">
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
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
          <div className="d-block get-started-button">
            <Button
              className="primary-btn width-25"
              style={{ color: "white" }}
              onClick={() => {
                this.setState({ accountPolicy: true });
              }}
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAccountSetup;

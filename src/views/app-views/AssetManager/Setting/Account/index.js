import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import OprationMode1 from "assets/img/assetmanager/opration-mode1.png";
import OprationMode2 from "assets/img/assetmanager/opration-mode2.png";

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: "read_mode",
      accountPolicy: false,
    };
  }

  render() {
    const {} = this.state;
    return (
      <Box className="account-container">
        <Box className="head">
          <h4>Keep your Account Secure</h4>
          <p>
            Use our pre-existing template or you can create your own code or
            migrate your project to get started
          </p>
          <Box className="cards">
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
                    className={`card ${
                      this.state.service == "read_mode" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ service: "read_mode" });
                    }}
                  >
                    <Box className="card-images">
                      <img src={OprationMode1} alt="opration" />
                    </Box>
                    <h5 className="card-title">Change Password</h5>
                    <p className="card-text">
                      After a successful account password update, you will need
                      to log in with the new account password.
                    </p>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    className={`card ${
                      this.state.service == "automation_mode" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ service: "automation_mode" });
                    }}
                  >
                    <Box className="card-images">
                      <img src={OprationMode2} alt="opration" />
                    </Box>
                    <Box className="card-title">Two-Factor Authentication</Box>
                    <p className="card-text">
                      Two-factor authentication (2FA) adds an extra layer of
                      security to your account. In addition to username and
                      password
                    </p>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="d-block get-started-button">
            <Button className="primary-btn width-25" style={{ color: "white" }}>
              Get started
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default Account;

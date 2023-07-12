import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import ChangePasswordImg from "assets/img/setting/change-password.png";
import TwoFactorImg from "assets/img/setting/two-factor.png";
import ChangePasswordModal from "./Components/ChangePasswordModal";
import AuthenticationModal from "./Components/AuthenticationModal";

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: "read_mode",
      showChangePasswordModal: false,
      showAuthenticationModal: false,
    };
  }

  handleChangePasswordModal = () => {
    this.setState({
      showChangePasswordModal: !this.state.showChangePasswordModal,
    });
  };

  handleAuthenticationModal = () => {
    this.setState({
      showAuthenticationModal: !this.state.showAuthenticationModal,
    });
  };

  render() {
    const { service, showChangePasswordModal, showAuthenticationModal } =
      this.state;
    return (
      <Box className="account-container">
        <Box className="head">
          <h4>Keep your Account Secure</h4>
          <p>
            Use our pre-existing template or you can create your own code or
            migrate your project to get started
          </p>
        </Box>
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
                  className={`card ${service == "read_mode" ? "active" : ""}`}
                  onClick={() => {
                    this.setState({ service: "read_mode" });
                  }}
                >
                  <Box className="card-image">
                    <img src={ChangePasswordImg} alt="Change Password" />
                  </Box>
                  <h5 className="card-title">Change Password</h5>
                  <p className="card-text">
                    After a successful account password update, you will need to
                    log in with the new account password.
                  </p>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  className={`card ${
                    service == "automation_mode" ? "active" : ""
                  }`}
                  onClick={() => {
                    this.setState({ service: "automation_mode" });
                  }}
                >
                  <Box className="card-image">
                    <img src={TwoFactorImg} alt="Two-Factor Authentication" />
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
        <Box className="d-block bottom-button">
          {service == "read_mode" && (
            <Button
              className="primary-btn width-25"
              onClick={this.handleChangePasswordModal}
            >
              Change Password
            </Button>
          )}
          {service == "automation_mode" && (
            <Button
              className="primary-btn width-25"
              onClick={this.handleAuthenticationModal}
            >
              T2F Auth
            </Button>
          )}
        </Box>
        {showChangePasswordModal ? (
          <ChangePasswordModal
            showModal={ChangePasswordModal}
            handleChangePasswordModal={this.handleChangePasswordModal}
          />
        ) : (
          <></>
        )}
        {showAuthenticationModal ? (
          <AuthenticationModal
            showModal={AuthenticationModal}
            handleAuthenticationModal={this.handleAuthenticationModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
export default Account;

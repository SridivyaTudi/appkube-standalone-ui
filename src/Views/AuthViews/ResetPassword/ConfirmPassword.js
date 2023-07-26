import React, { Component } from "react";
import ConfirmPasswordImage from "assets/img/login/confirm-password-image.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { AUTH_PREFIX_PATH } from "Configs/AppConfig";
import Button from "@mui/material/Button";

class ConfirmPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: "",
      },
      formErrors: {
        email: "",
        password: "",
      },
      sendEmail: false,
    };
  }
  render() {
    const { formData, formErrors } = this.state;
    return (
      <Box className="resetpassword-container">
        <Box className="forget-left">
          <Box className="forget-left-content">
            <Box className="d-block width-100 back-btn m-b-0">
              <Button
                className="secondary-text-btn min-width-inherit"
                to={`${AUTH_PREFIX_PATH}/signin`}
                variant="outlined"
                component={Link}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </Button>
              <span>Back to log in</span>
            </Box>
            <Box className="confirm-password-left">
              <Box>
                <Box className="d-block width-100 forget-text m-b-0">
                  <h2>Password Reset</h2>
                  <p>
                    Your password has been successfully reset. Click below to
                    log in.
                  </p>
                </Box>
                <Box className="d-flex width-100 next-step">
                  <Button
                    className="primary-btn"
                    onClick={this.handleSignIn}
                    variant="contained"
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="forget-right">
          <img src={ConfirmPasswordImage} alt="forget-image" />
        </Box>
      </Box>
    );
  }
}

export default ConfirmPassword;

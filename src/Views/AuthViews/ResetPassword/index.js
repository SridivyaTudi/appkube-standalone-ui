import React, { Component } from "react";
import ForgotPasswordImage from "assets/img/login/forgot-password-image.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { AUTH_PREFIX_PATH } from "Configs/AppConfig";
import Button from "@mui/material/Button";
import ConfirmPasswordImage from "assets/img/login/confirm-password-image.png";

class ResetPassword extends Component {
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
      imageVisibility: false,
      toggleScreen: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { formData, formErrors } = this.state;

    if (name === "email") {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!value) {
        formErrors[name] = "Email is required!";
        formData[name] = value;
      } else if (!regex.test(value)) {
        formErrors[name] = "Please enter valid email!";
        formData[name] = value;
      } else {
        formErrors[name] = "";
        formData[name] = value;
      }
    } else {
      if (!value) {
        formErrors[name] = "Password is required!";
        formData[name] = value;
      } else {
        formErrors[name] = "";
        formData[name] = value;
      }
    }

    this.setState({ formData, formErrors });
  };

  handleSignIn = () => {
    // const valid = this.validateForm();
    // console.log(valid);

    this.setState({ toggleScreen: true, imageVisibility: true });
  };

  validateForm = () => {
    const { formData, formErrors } = this.state;
    let valid = true;
    if (!formData.email) {
      formErrors.email = "Email is required!";
      valid = false;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      formErrors.email = "Please enter valid email!";
      valid = false;
    } else {
      formErrors.email = "";
      valid = true;
    }
    this.setState({ formErrors });
    return valid;
  };

  render() {
    const { formData, formErrors, toggleScreen, imageVisibility } = this.state;
    return (
      <Box className="resetpassword-container">
        <Box className="forget-left">
          {!toggleScreen ? (
            <Box className="forget-left-content">
              <Box className="d-block width-100 back-btn">
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
              <Box className="d-block width-100 forget-text">
                <h2>Reset Password</h2>
                <p>
                  Forgotten your password? No problem! Quickly regain access to
                  your account with a secure password reset.
                </p>
                <p>
                  Get back to effortlessly monitoring your systems in just a few
                  clicks.
                </p>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12}>
                    <Box className="input-group">
                      <label className="d-block">Enter a New password </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter your New password here"
                        onChange={this.handleInputChange}
                        autoComplete="on"
                      />
                      <i className="fa-sharp fa-regular fa-eye"></i>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="input-group">
                      <label className="d-block">Re enter your password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Re enter your password here"
                        onChange={this.handleInputChange}
                        autoComplete="on"
                      />
                      <i className="fa-sharp fa-regular fa-eye"></i>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="d-flex width-100 next-step">
                <Button
                  className="primary-btn min-width-inherit"
                  onClick={this.handleSignIn}
                  variant="contained"
                >
                  Confirm
                  {/* <Link to={`${AUTH_PREFIX_PATH}/confirmpassword`}> </Link> */}
                </Button>
              </Box>
            </Box>
          ) : (
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
          )}
        </Box>
        {imageVisibility ? (
          <Box className="forget-right">
            <img src={ConfirmPasswordImage} alt="forget-image" />
          </Box>
        ) : (
          <>
            <Box className="forget-right">
              <img src={ForgotPasswordImage} alt="forget-image" />
            </Box>
          </>
        )}
      </Box>
    );
  }
}

export default ResetPassword;

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
        confirmPassword: "",
        password: "",
        //showPassword: false,
      },
      formErrors: {
        confirmPassword: "",
        password: "",
      },
      isSubmit: false,
      sendEmail: false,
      imageVisibility: false,
      toggleScreen: false,
      showPassword: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { formData, formErrors } = this.state;
   
    
      formData[name] = value;
    

    this.setState({ formData, formErrors });
  };

  handleSignIn = () => {
    const valid = this.validateForm(true);
    this.setState({
      isSubmit: true,
    });
    if (valid.isValid) {
      this.setState({ toggleScreen: true, imageVisibility: true });
    }
  };

  validateForm = (isSubmit) => {
    const { formData } = this.state;
    // debugger;
    const errors = {
      confirmPassword: "",
      password: "",
    };
    let isValid = true;
    if (isSubmit) {
      

      if (!formData.password) {
        errors.password = "Please enter password";
        isValid = false;
      } else {
        errors.password = "";
      }

      if (formData.confirmPassword !==formData.password) {
        errors.confirmPassword = "Password does not matched";
        isValid = false;
      } else {
        errors.confirmPassword = "";
      }
    }
    return { isValid, errors };
  };

  render() {
    const { formData, formErrors, toggleScreen, imageVisibility, errors, isSubmit, showPassword } =
      this.state;
    const errorData = this.validateForm(isSubmit);
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
                         type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={formData.password}
                        placeholder="Enter your New password here"
                        onChange={this.handleInputChange}
                        autoComplete="on"
                      />
                      <p> {errorData.errors.password}</p>
                     
                      {errorData.password ? (
                        <p className="m-b-0">{errors.password}</p>
                      ) : (
                        <></>
                      )}
                      <i
                        className={`fa-sharp fa-regular fa-eye${
                          showPassword ? "" : "-slash"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.setState({
                            showPassword: !this.state.showPassword,
                          });
                        }}
                      ></i>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="input-group">
                      <label className="d-block">Re enter your password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Re enter your password here"
                        value={formData.confirmPassword}
                        onChange={this.handleInputChange}
                        autoComplete="on"
                      />
                      <p>{errorData.errors.confirmPassword}</p>
                         
                      {errorData.confirmPassword ? (
                        <p className="m-b-0">{errors.password}</p>
                      ) : (
                        <></>
                      )}
                      <i
                        className={`fa-sharp fa-regular fa-eye${
                          showPassword ? "" : "-slash"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.setState({
                            showPassword: !this.state.showPassword,
                          });
                        }}
                      ></i>
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
                    <Button className="primary-btn" variant="contained">
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

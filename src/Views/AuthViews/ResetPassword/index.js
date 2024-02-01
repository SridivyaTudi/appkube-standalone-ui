import React, { Component } from "react";
import ForgotPasswordImage from "assets/img/login/forgot-password-image.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { AUTH_PREFIX_PATH } from "Configs/AppConfig";
import Button from "@mui/material/Button";
import ConfirmPasswordImage from "assets/img/login/confirm-password-image.png";
import { resetPassword } from "Redux/Auth/AuthThunk";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastMessage } from "Toast/ToastMessage";
import PasswordStrength from "Components/PasswordStrength";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        otp: "",
        newPassword: "",
        password: "",
      },
      formErrors: {
        newPassword: "",
        password: "",
        otp: "",
      },
      isSubmit: false,
      sendEmail: false,
      imageVisibility: false,
      toggleScreen: false,
      showPassword: false,
      showconfirmPassword: false,
      isValidPassword: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.resetPwd.status !== this.props.resetPwd.status &&
      this.props.resetPwd.status === status.SUCCESS
    ) {
      if (this.props.resetPwd.data?.code === 200) {
        this.setState({ toggleScreen: true, imageVisibility: true });
      }
      if (this.props.resetPwd.data?.code === 417) {
        ToastMessage.error(this.props.resetPwd.data?.message || "Invalid OTP!");
      }
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { formData, formErrors } = this.state;
    formData[name] = value;
    this.setState({ formData, formErrors });
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const valid = this.validateForm(true);
    this.setState({
      isSubmit: true,
    });
    if (valid.isValid) {
      const data = {
        userName: this.props.userName,
        token: formData.otp,
        oldPassword: formData.password,
        newPassword: formData.newPassword,
      };
      this.props.resetPassword(data);
    }
  };

  validateForm = (isSubmit) => {
    const { formData,isValidPassword } = this.state;
    const errors = {
      newPassword: "",
      password: "",
      otp: "",
    };
    let isValid = true;
    if (isSubmit) {
      if (!formData.otp) {
        errors.otp = "Please enter OTP!";
        isValid = false;
      } else {
        errors.otp = "";
      }

      if (!formData.password) {
        errors.password = "Please enter password";
        isValid = false;
      } else if (!isValidPassword) {
        errors.password = "Please enter strong password";
        isValid = false;
      } else {
        errors.password = "";
      }

      if (formData.newPassword !== formData.password) {
        errors.newPassword = "Password does not matched";
        isValid = false;
      } else {
        errors.newPassword = "";
      }
    }

    return { isValid, errors };
  };

  render() {
    const {
      formData,
      toggleScreen,
      imageVisibility,
      errors,
      isSubmit,
      showPassword,
      showconfirmPassword,
    } = this.state;
    const errorData = this.validateForm(isSubmit);
    return (
      <Box className="resetpassword-container">
        <Box className="forget-left">
          {!toggleScreen ? (
            <form onSubmit={this.handleSignIn}>
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
                    Forgotten your password? No problem! Quickly regain access
                    to your account with a secure password reset.
                  </p>
                  <p>
                    Get back to effortlessly monitoring your systems in just a
                    few clicks.
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
                        <label className="d-block" htmlFor="otp">
                          Enter OTP
                        </label>
                        <input
                          id="otp"
                          type="text"
                          className="form-control"
                          name="otp"
                          value={formData.otp}
                          placeholder="Enter OTP received in your email"
                          onChange={this.handleInputChange}
                          autoComplete="on"
                        />
                        <p> {errorData.errors.otp}</p>
                        {errorData.otp ? (
                          <p className="m-b-0">{errors.otp}</p>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="input-group">
                        <label className="d-block" htmlFor="password">
                          Enter a New password{" "}
                        </label>
                        <input
                          id="password"
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
                    <PasswordStrength
                      password={formData.password}
                      checkIsValidPassword={(isValidPassword) => {
                        this.setState({ isValidPassword });
                      }}
                    />

                    <Grid item xs={12}>
                      <Box className="input-group">
                        <label className="d-block" htmlFor="newPassword">
                          Re enter your password
                        </label>
                        <input
                          id="newPassword"
                          type={showconfirmPassword ? "text" : "password"}
                          className="form-control"
                          name="newPassword"
                          placeholder="Re enter your password here"
                          value={formData.newPassword}
                          onChange={this.handleInputChange}
                          autoComplete="on"
                        />
                        <p>{errorData.errors.newPassword}</p>

                        {errorData.newPassword ? (
                          <p className="m-b-0">{errors.newPassword}</p>
                        ) : (
                          <></>
                        )}
                        <i
                          className={`fa-sharp fa-regular fa-eye${
                            showconfirmPassword ? "" : "-slash"
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            this.setState({
                              showconfirmPassword:
                                !this.state.showconfirmPassword,
                            });
                          }}
                        ></i>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="d-flex width-100 next-step">
                  <LoadingButton
                    loading={
                      this.props.resetPwd.status === status.IN_PROGRESS
                        ? true
                        : false
                    }
                    className="primary-btn min-width-inherit"
                    onClick={this.handleSignIn}
                    variant="contained"
                    type="submit"
                  >
                    Confirm
                  </LoadingButton>
                </Box>
              </Box>
            </form>
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
                      variant="contained"
                      to={`${AUTH_PREFIX_PATH}/signin`}
                      component={Link}
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
            <img src={ConfirmPasswordImage} alt="Confirm Password" />
          </Box>
        ) : (
          <>
            <Box className="forget-right">
              <img src={ForgotPasswordImage} alt="forget Password" />
            </Box>
          </>
        )}
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  const { resetPwd } = state.auth;
  return { resetPwd };
};

const mapDispatchToProps = {
  resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

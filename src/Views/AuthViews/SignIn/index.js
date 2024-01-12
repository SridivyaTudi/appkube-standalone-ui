import React, { Component } from "react";
import SigninBanner from "assets/img/login/signin-banner.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, Navigate } from "react-router-dom";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "Configs/AppConfig";
import {
  setCurrentUser,
  setCurrentOrgId,
  setCurrentOrgName,
  getSavedUserName,
  setUserName,
  deleteUserName,
} from "Utils";
import { login, authMFACode } from "Redux/Auth/AuthThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { ToastMessage } from "Toast/ToastMessage";
import AuthenticationImg from "assets/img/login/authentication-img.png";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        userName: "",
        password: "",
        otp: "",
      },
      showPassword: false,
      rememberMe: false,
      userLoggedIn: false,
      isSubmit: false,
      showAuthenticationSection: false,
    };
  }

  componentDidMount = () => {
    const { formData } = this.state;
    let savedUserName = getSavedUserName();
    if (savedUserName) {
      formData.userName = savedUserName;
    }
    this.setState({ formData });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.loggedInUser.status !== prevProps.loggedInUser.status) {
      if (this.props.loggedInUser.status === status.SUCCESS) {
        let userInfo = this.props.loggedInUser.data?.info;
        if (userInfo) {
          if (userInfo.user?.isMfaEnable === "YES") {
            this.setState({ showAuthenticationSection: true, isSubmit: false });
          } else {
            this.setLoginDetails();
          }
        } else {
          ToastMessage.error("User login failed!");
        }
      }
    }

    if (
      prevProps.mfaAuth.status !== this.props.mfaAuth.status &&
      this.props.mfaAuth.status === status.SUCCESS
    ) {
      if (this.props.mfaAuth.data.object === true) {
        this.setLoginDetails();
      } else {
        ToastMessage.error(
          this.props.mfaAuth.data?.message || "OTP validation failed!"
        );
      }
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  handleCheckboxChange = (e) => {
    this.setState({ rememberMe: e.target.checked });
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const { rememberMe, formData } = this.state;
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);

    if (isValid) {
      if (rememberMe) {
        setUserName(formData.userName);
      } else {
        deleteUserName();
      }

      const { userName, password } = this.state.formData;
      this.props.login({ userName, password });
    }
  };

  validateForm = (isSubmit) => {
    const { formData, showAuthenticationSection } = this.state;
    const errors = {
      userName: "",
      password: "",
      otp: "",
    };
    let isValid = true;
    if (isSubmit) {
      if (!formData.userName) {
        errors.userName = "Username is required!";
        isValid = false;
      } else {
        errors.userName = "";
      }

      if (!formData.password) {
        errors.password = "Password is required!";
        isValid = false;
      } else {
        errors.password = "";
      }

      if (showAuthenticationSection) {
        if (!formData.otp) {
          errors.otp = "Otp is required!";
          isValid = false;
        } else {
          errors.otp = "";
        }
      }
    }
    return { isValid, errors };
  };

  handleOtpValidate = (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);

    if (isValid) {
      let { formData } = this.state;
      const params = {
        userName: formData.userName,
        token: formData.otp,
        mfaKey: "",
      };
      this.props.authMFACode(params);
    }
  };

  setLoginDetails = () => {
    let isExistCmdbOrgId =
      this.props.loggedInUser.data.info?.user?.organization?.cmdbOrgId;
    if (isExistCmdbOrgId) {
      setCurrentUser(this.props.loggedInUser.data);
      setCurrentOrgId(
        this.props.loggedInUser.data.info.user.organization.cmdbOrgId
      );
      setCurrentOrgName(
        this.props.loggedInUser.data.info.user.organization.name
      );
      this.setState({
        userLoggedIn: true,
      });
    } else {
      ToastMessage.error("We can't find cmdbOrgId.");
    }
  };
  render() {
    const {
      formData,
      showPassword,
      rememberMe,
      isSubmit,
      userLoggedIn,
      showAuthenticationSection,
    } = this.state;
    const { errors } = this.validateForm(isSubmit);
    return (
      <>
        {userLoggedIn ? (
          <Navigate to={`${APP_PREFIX_PATH}/dashboard`} />
        ) : (
          <Box className="sign-container">
            <Box className="sign-left">
              <Box className="sign-left-content">
                <span className="d-flex width-100">Appkube</span>
                <h1 className="d-flex width-100 m-t-0 m-b-0">
                  Manage your project and team in easy way
                </h1>
                <Box className="d-flex width-100 banner-image">
                  <img src={SigninBanner} alt="SigninBanner" />
                </Box>
              </Box>
            </Box>
            <Box className="sign-right">
              <Box className="sign-right-content">
                <form
                  onSubmit={(e) =>
                    showAuthenticationSection
                      ? this.handleOtpValidate(e)
                      : this.handleSignIn(e)
                  }
                >
                  {showAuthenticationSection ? (
                    <Box className="authentication-section">
                      <Box className="authentication-image text-center ">
                        <img src={AuthenticationImg} alt="AuthenticationImg" />
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid item xs={12}>
                            <Box className="input-group">
                              <label className="d-block" htmlFor="password">
                                Enter Your 2FA Authentication Code
                              </label>
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="otp"
                                placeholder="6-digit verification code"
                                autoComplete="on"
                                onChange={this.handleInputChange}
                                id="otp"
                                value={formData.otp || ""}
                              />
                              {errors.otp ? (
                                <p className="m-b-0 p-l-5">{errors.otp}</p>
                              ) : (
                                <></>
                              )}
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <LoadingButton
                              className="primary-btn width-100"
                              variant="contained"
                              disabled={
                                this.props.mfaAuth.status === status.IN_PROGRESS
                              }
                              loading={
                                this.props.mfaAuth.status === status.IN_PROGRESS
                              }
                              onClick={this.handleOtpValidate}
                            >
                              Sign In
                            </LoadingButton>
                          </Grid>
                          <Grid item xs={12}>
                            <Box className="next-step ">
                              <p className="m-l-0 d-block text-center">
                                Doesn't have on account?
                                <Link to={`${AUTH_PREFIX_PATH}/signup`}>
                                  Sign up Now
                                </Link>
                              </p>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Box className="d-flex width-100 heading">
                        Sign up to <strong>Appkube</strong>
                      </Box>
                      <Box className="d-block width-100 google-btn">
                        <Button className="primary-btn" variant="contained">
                          Sign up with google
                        </Button>
                      </Box>
                      <Box className="d-block width-100 or-contant text-center">
                        <span>or</span>
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid item xs={12}>
                            <Box className="input-group">
                              <label className="d-block" htmlFor="userName">
                                Username
                              </label>
                              <input
                                type="userName"
                                className="form-control"
                                name="userName"
                                placeholder="Input your Username here"
                                value={
                                  formData.userName || getSavedUserName() || ""
                                }
                                onChange={this.handleInputChange}
                                id="userName"
                              />
                              {errors.userName ? (
                                <p className="m-b-0 p-l-5">{errors.userName}</p>
                              ) : (
                                <></>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid item xs={12}>
                            <Box className="input-group">
                              <label className="d-block" htmlFor="password">
                                Password
                              </label>
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                placeholder="Input your password here"
                                value={formData.password}
                                onChange={this.handleInputChange}
                                autoComplete="on"
                                id="password"
                              />
                              {errors.password ? (
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
                      <Box className="remember-content width-100">
                        <Box className="d-flex width-100 align-items-center">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Remember me"
                            className="checkbox primary"
                            size="small"
                            onChange={this.handleCheckboxChange}
                            value={rememberMe}
                          />
                          <Link to={`${AUTH_PREFIX_PATH}/forgetpassword`}>
                            Forgot Password?
                          </Link>
                        </Box>
                      </Box>
                      <Box className="d-flex width-100 next-step">
                        <LoadingButton
                          disabled={
                            this.props.loggedInUser?.status ===
                            status.IN_PROGRESS
                          }
                          loading={
                            this.props.loggedInUser?.status ===
                            status.IN_PROGRESS
                          }
                          onClick={this.handleSignIn}
                          className="primary-btn"
                          variant="contained"
                          type="submit"
                          // loadingPosition={"start"}
                        >
                          Sign In
                        </LoadingButton>
                        <p>
                          Doesn't have on account?
                          <Link to={`${AUTH_PREFIX_PATH}/signup`}>
                            Sign up Now
                          </Link>
                        </p>
                      </Box>
                    </>
                  )}
                </form>
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedInUser, mfaAuth } = state.auth;
  return {
    loggedInUser,
    mfaAuth,
  };
};

const mapDispatchToProps = {
  login,
  authMFACode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

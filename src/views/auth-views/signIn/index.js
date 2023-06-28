import React, { Component } from "react";
import SigninBanner from "../../../assets/img/login/signin-banner.png";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, Navigate } from "react-router-dom";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "../../../configs/AppConfig";
import { setCurrentUser, setCurrentOrgId } from "../../../utils";
import { login } from "../../../redux/auth/authThunk";
import { connect } from "react-redux";
import status from "../../../redux/constants/commonDS";
import { ToastMessage } from "../../../Toast/ToastMessage";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        userName: "",
        password: "",
      },
      showPassword: false,
      rememberMe: false,
      userLoggedIn: false,
      isSubmit: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.loggedInUser.status !== prevProps.loggedInUser.status) {
      if (this.props.loggedInUser.status === status.SUCCESS) {
        if (this.props.loggedInUser.data.info) {
          setCurrentUser(this.props.loggedInUser.data);
          setCurrentOrgId(
            this.props.loggedInUser.data.info.user.organization.cmdbOrgId
          );
          this.setState({
            userLoggedIn: true,
          });
        } else {
          ToastMessage.error("User login failed!");
        }
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

  handleSignIn = () => {
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);
    if (isValid) {
      const { userName, password } = this.state.formData;
      this.props.login({ userName, password });
    }
  };

  validateForm = (isSubmit) => {
    const { formData } = this.state;
    const errors = {
      userName: "",
      password: "",
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
    }
    return { isValid, errors };
  };

  render() {
    const { formData, showPassword, rememberMe, isSubmit, userLoggedIn } =
      this.state;
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
                        <label className="d-block">Username</label>
                        <input
                          type="userName"
                          className="form-control"
                          name="userName"
                          placeholder="Input your Username here"
                          value={formData.userName}
                          onChange={this.handleInputChange}
                        />
                        {errors.userName ? (
                          <p className="m-b-0">{errors.userName}</p>
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
                        <label className="d-block">Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="password"
                          placeholder="Input your password here"
                          value={formData.password}
                          onChange={this.handleInputChange}
                          autoComplete="on"
                        />
                        {errors.password ? (
                          <p className="m-b-0">{errors.password}</p>
                        ) : (
                          <></>
                        )}
                        <i
                          className={`fa-sharp fa-regular fa-eye${showPassword ? "" : "-slash"
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
                      this.props.loggedInUser?.status === status.IN_PROGRESS
                    }
                    loading={
                      this.props.loggedInUser?.status === status.IN_PROGRESS
                    }
                    loadingPosition="start"
                    onClick={this.handleSignIn}
                    className="primary-btn"
                    variant="contained"
                  >
                    Sign In
                  </LoadingButton>
                  <p>
                    Doesn't have on account?
                    <Link to={`${AUTH_PREFIX_PATH}/signup`}>Sign up Now</Link>
                  </p>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedInUser } = state.auth;
  return {
    loggedInUser,
  };
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

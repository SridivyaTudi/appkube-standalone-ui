import React, { Component } from "react";
import SigninBanner from "../../../assets/img/login/signin-banner.png";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, Navigate } from "react-router-dom";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "../../../configs/AppConfig";
import { setCurrentUser } from "../../../utils";
import { signInUserAPI } from "../../../redux/auth/authThunk";
import { connect } from "react-redux";
import status from "../../../redux/constants/commonDS";
import { ToastMessage } from "../../../Toast/ToastMessage";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: "",
      },
      passwordView: true,
      rememberMe: false,
      userLoggedIn: false,
      isSubmit: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.auth?.signInUser !== prevProps.auth.signInUser &&
      this.props.auth.signInUser.status === status.SUCCESS
    ) {
      setCurrentUser("sagar");
      this.setState({ userLoggedIn: true });
    }

    if (
      this.props.auth?.signInUser !== prevProps.auth.signInUser &&
      this.props.auth.signInUser.status === status.FAILURE
    ) {
      ToastMessage("User login failed!", "unsuccess");
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
    const { valid } = this.validateForm(true);
    const { email, password } = this.state.formData;
    if (valid) {
      this.props.signInUserAPI({ email, password });
    }
  };

  validateForm = (isSubmit) => {
    const { formData } = this.state;
    const errors = {
      email: "",
      password: "",
    };
    let valid = true;
    if (isSubmit) {
      if (!formData.email) {
        errors.email = "Email/Username is required!";
        valid = false;
      } else {
        errors.email = "";
      }

      if (!formData.password) {
        errors.password = "Password is required!";
        valid = false;
      } else {
        errors.password = "";
      }
    }
    return { valid, errors };
  };

  render() {
    const { formData, passwordView, rememberMe, isSubmit } = this.state;
    const { errors } = this.validateForm(isSubmit);
    return (
      <>
        {this.state.userLoggedIn ? (
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
                  <button className="blue-button">Sign up with google</button>
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
                        <label className="d-block">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Input your email here"
                          value={formData.email}
                          onChange={this.handleInputChange}
                          autoComplete="on"
                        />
                        {errors && errors.email ? (
                          <p className="m-b-0">{errors.email}</p>
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
                          type={passwordView ? "password" : "text"}
                          className="form-control"
                          name="password"
                          placeholder="Input your password here"
                          value={formData.password}
                          onChange={this.handleInputChange}
                          autoComplete="on"
                        />
                        {errors && errors?.password ? (
                          <p className="m-b-0">{errors.password}</p>
                        ) : (
                          <></>
                        )}
                        <i
                          className={`fa-sharp fa-regular fa-eye${
                            passwordView ? "-slash" : ""
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            this.setState({
                              passwordView: !this.state.passwordView,
                            });
                          }}
                        ></i>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="remember-content width-100">
                  <Box className="d-flex width-100 align-items-center">
                    <Checkbox
                      className="checkbox primary"
                      size="small"
                      onChange={this.handleCheckboxChange}
                      value={rememberMe}
                    />
                    <p>Remember me</p>
                    <Link to={`${AUTH_PREFIX_PATH}/forgetpassword`}>
                      Forgot Password?
                    </Link>
                  </Box>
                </Box>
                <Box className="d-flex width-100 next-step">
                  <button
                    className={`blue-button ${
                      this.props.auth.signInUser.status === status.IN_PROGRESS
                        ? "btn-disabled"
                        : ""
                    }`}
                    onClick={this.handleSignIn}
                  >
                    {this.props.auth.signInUser.status ===
                    status.IN_PROGRESS ? (
                      <i className="fa-solid fa-spinner fa-spin" />
                    ) : (
                      <></>
                    )}
                    Sign In
                  </button>
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
  const { auth } = state;
  return {
    auth,
  };
};

const mapDispatchToProps = {
  signInUserAPI,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

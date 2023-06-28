import React, { Component } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import SigninBanner from "../../../assets/img/login/signin-banner.png";
import SignupBanner1 from "../../../assets/img/login/signup-banner1.png";
import SignupBanner2 from "../../../assets/img/login/signup-banner2.png";
import ProfileIcon from "../../../assets/img/login/profile-icon.png";
import { AUTH_PREFIX_PATH } from "../../../configs/AppConfig";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { navigateRouter } from "../../../utils/navigate/navigateRouter";
import { signUpUserAPI } from "../../../redux/auth/authThunk";
import { connect } from "react-redux";
import { ToastMessage } from "../../../Toast/ToastMessage";
import status from "../../../redux/constants/commonDS";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveStep: 0,
      formData: {
        fullName: "",
        userName: "",
        email: "",
        password: "",
        companyName: "",
        companyLocation: "",
      },
      loadingData: false,
      termsOfService: false,
      passwordView: true,
      profileImg: ProfileIcon,
      isSubmit: 0,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.auth !== prevProps.auth) {
      this.handleSignUp();
    }
  };

  handleSignUp = () => {
    if (this.props.auth.signUpUserAPI?.status === status.SUCCESS) {
      ToastMessage.success("New user registered!");
      this.setState({ loadingData: false });
      this.props.navigate(`${AUTH_PREFIX_PATH}/signin`);
    } else {
      ToastMessage.error("User registration failed!");
      this.setState({ loadingData: false });
      
    }
  };

  handleCurrentActiveStep = (stepCount) => {
    this.setState({ isSubmit: stepCount });
    const { valid } = this.validateForm(stepCount);
    if (valid && this.state.termsOfService) {
      this.setState({ currentActiveStep: stepCount });
    }
  };

  validateForm = (isSubmit) => {
    const { formData, currentActiveStep } = this.state;
    let valid = true;
    let errors = {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      companyName: "",
      companyLocation: "",
    };

    if (isSubmit === 1 && currentActiveStep === 0) {
      if (!formData.fullName) {
        errors.fullName = "Full name is required!";
        valid = false;
      } else {
        errors.fullName = "";
      }

      if (!formData.userName) {
        errors.userName = "Username is required!";
        valid = false;
      } else {
        errors.userName = "";
      }

      if (!formData.email) {
        errors.email = "Email is required!";
        valid = false;
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
      ) {
        errors.email = "Please enter valid email!";
        valid = false;
      } else {
        errors.email = "";
      }

      if (!formData.password) {
        errors.password = "Password is required!";
        valid = false;
      } else if (
        !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
          formData.password
        )
      ) {
        errors.password = "Please enter valid password!";
        valid = false;
      } else {
        errors.password = "";
      }
    }

    if (isSubmit === 2 && currentActiveStep === 1) {
      if (!formData.companyName) {
        errors.companyName = "Company name is required!";
        valid = false;
      } else {
        errors.companyName = "";
      }

      if (!formData.companyLocation) {
        errors.companyLocation = "Please select company location!";
        valid = false;
      } else {
        errors.companyLocation = "";
      }
    }

    return { valid, errors };
  };

  handleTermsChange = (e) => {
    this.setState({ termsOfService: e.target.checked });
  };

  handleInputChange = (e) => {
    let { formData } = this.state;
    const { name, value } = e.target;
    formData[name] = value;

    this.setState({ formData });
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  signUpSubmit = () => {
    this.setState({ loadingData: true });
    this.props.signUpUserAPI({
      userName: this.state.formData.userName,
      password: this.state.formData.password,
      active: true,
      email: this.state.formData.email,
      organization: this.state.formData.companyLocation,
    });
  };

  render() {
    const {
      currentActiveStep,
      formData,
      termsOfService,
      passwordView,
      isSubmit,
    } = this.state;
    const { errors } = this.validateForm(isSubmit);
    return (
      <Box className="sign-container">
        <Box className={`sign-step ${currentActiveStep === 0 ? "active" : ""}`}>
          <Box className="sign-left">
            <Box className="sign-left-content">
              <span className="d-flex width-100">Appkube</span>
              <h2 className="d-flex width-100 m-t-0 m-b-0">
                Manage your project and team in easy way
              </h2>
              <Box className="d-flex width-100 banner-image">
                <img src={SigninBanner} alt="SigninBanner" />
              </Box>
            </Box>
          </Box>
          <Box className="sign-right">
            <Box className="sign-right-content">
              <List className="steps-container">
                <ListItem className="active">
                  <span>step 1</span>
                </ListItem>
                <ListItem className="">
                  <span>step 2</span>
                </ListItem>
                <ListItem>
                  <span>step 3</span>
                </ListItem>
              </List>
              <Box className="d-flex width-100 heading">
                Sign up to <strong>Appkube</strong>
              </Box>
              <Box className="d-block width-100 google-btn">
                <Button
                  className="primary-btn"
                  variant="contained"
                >
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
                  <Grid item xs={6}>
                    <Box className="input-group">
                      <label className="d-block">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Input your full name here"
                        name="fullName"
                        value={formData.fullName}
                        onChange={this.handleInputChange}
                      />
                      {errors.fullName ? (
                        <p className="m-b-0">{errors.fullName}</p>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className="input-group">
                      <label className="d-block">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Input your username here"
                        name="userName"
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
                      <label className="d-block">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Input your email here"
                        name="email"
                        value={formData.email}
                        onChange={this.handleInputChange}
                      />
                      {errors.email ? (
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
                        placeholder="Input your password here"
                        name="password"
                        value={formData.password}
                        onChange={this.handleInputChange}
                      />
                      {errors.password ? (
                        <p className="m-b-0">{errors.password}</p>
                      ) : (
                        <></>
                      )}
                      <i
                        className={`fa-sharp fa-regular fa-eye${passwordView ? "-slash" : ""
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
              <Box className="remember-content">
                <Box className="d-flex align-items-center">
                  <Checkbox
                    className="checkbox primary"
                    size="small"
                    checked={termsOfService}
                    onChange={this.handleTermsChange}
                  />
                  <p>I have read and agree to the trems of Service</p>
                </Box>
                {!termsOfService && this.state.isSubmit ? (
                  <p className="m-b-0 error-text">
                    You must agree with the terms and conditions.
                  </p>
                ) : (
                  <></>
                )}
              </Box>
              <Box className="d-flex width-100 next-step">

                <Button
                  className="primary-btn"
                  onClick={() => this.handleCurrentActiveStep(1)}
                  variant="contained"
                >
                  Next
                </Button>
                <p>
                  Already have on account?
                  <Link to={`${AUTH_PREFIX_PATH}/signin`}>Sign In Now</Link>
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={`sign-step ${currentActiveStep === 1 ? "active" : ""}`}>
          <Box className="sign-left">
            <Box className="sign-left-content">
              <span className="d-flex width-100">Appkube</span>
              <h2 className="d-flex width-100 m-t-0 m-b-0">
                Manage your project and team in easy way
              </h2>
              <Box className="d-flex width-100 banner-image">
                <img src={SignupBanner1} alt="SigninBanner" />
              </Box>
            </Box>
          </Box>
          <Box className="sign-right">
            <Box className="sign-right-content">
              <List className="steps-container">
                <ListItem className="active">
                  <span>step 1</span>
                </ListItem>
                <ListItem className="active">
                  <span>step 2</span>
                </ListItem>
                <ListItem>
                  <span>step 3</span>
                </ListItem>
              </List>
              <Box className="d-flex width-100 heading">
                Complete your company profile
                <span>
                  Thousands of businesses such as yours easily manage their
                  project and their teams
                </span>
              </Box>
              <Box className="select-profile">
                <Box className="profile-image">
                  <img src={this.state.profileImg} alt="profile" />
                </Box>
                <Box className="company-content">
                  <p>Select your company profile picture</p>
                  <input
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="input"
                    onChange={this.imageHandler}
                    hidden
                  />
                  <Box className="label">
                    <label className="image-upload" htmlFor="input">
                      <a className="width-25 blue-button">Browse</a>
                    </label>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12}>
                    <Box className="input-group">
                      <label className="d-block">Your Company Name</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Input your name here"
                        name="companyName"
                        value={formData.companyName}
                        onChange={this.handleInputChange}
                      />
                      {errors.companyName ? (
                        <p className="m-b-0">{errors.companyName}</p>
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
                      <label className="d-block text-left p-b-5">
                        Your Company Location
                      </label>
                      <select
                        name="companyLocation"
                        id="companyLocation"
                        value={formData.companyLocation}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Input your location here</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                      </select>
                      {errors.companyLocation ? (
                        <p className="m-b-0">{errors.companyLocation}</p>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="d-flex width-100 next-step">

                <Button
                  className="primary-btn"
                  onClick={() => this.handleCurrentActiveStep(2)}
                  variant="contained"
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={`sign-step ${currentActiveStep === 2 ? "active" : ""}`}>
          <Box className="sign-left">
            <Box className="sign-left-content">
              <span className="d-flex width-100">Appkube</span>
              <h2 className="d-flex width-100 m-t-0 m-b-0">
                Manage your project and team in easy way
              </h2>
              <Box className="d-flex width-100 banner-image">
                <img
                  src={SignupBanner2}
                  alt="SigninBanner"
                  style={{ maxHeight: "450px" }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="sign-right">
            <Box className="sign-right-content">
              <List className="steps-container">
                <ListItem className="active">
                  <span>step 1</span>
                </ListItem>
                <ListItem className="active">
                  <span>step 2</span>
                </ListItem>
                <ListItem className="active">
                  <span>step 3</span>
                </ListItem>
              </List>
              <Box className="d-flex width-100 heading">
                Registration Complete
                <span>
                  Thousands of businesses such as yours easily manage their
                  project and their teams
                </span>
              </Box>
              <Box className="d-flex width-100 next-step">
                <LoadingButton
                  onClick={() =>
                    !this.state.loadingData ? this.signUpSubmit() : <></>
                  }
                  className="primary-btn"
                  variant="contained"
                  disabled={this.state.loadingData ? true : false}
                  loading={
                    this.props.loadingData?.status === status.IN_PROGRESS
                  }
                  loadingPosition="start"
                >
                  Continue To Sign In
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth,
  };
}

const mapDispatchToProps = {
  signUpUserAPI,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(SignUp));

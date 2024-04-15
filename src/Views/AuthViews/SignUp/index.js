import React, { Component } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SigninBanner from "assets/img/login/signin-banner.png";
import SignupBanner1 from "assets/img/login/signup-banner1.png";
import SignupBanner2 from "assets/img/login/signup-banner2.png";
import ProfileIcon from "assets/img/login/profile-icon.png";
import { AUTH_PREFIX_PATH } from "Configs/AppConfig";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { signUp } from "Redux/Auth/AuthThunk";
import { connect } from "react-redux";
import { ToastMessage } from "Toast/ToastMessage";
import status from "Redux/Constants/CommonDS";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import RequestPopup from "./Components/RequestPopup";
import PasswordStrength from "Components/PasswordStrength";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { generateRandomPassword, isAlphaNumeric, isAlphabet } from "Utils";
import { REGEX_TYPE } from "CommonData";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    color: "#FFFFFF",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #16161E",
  },
}));
class SignUp extends Component {
  steps = {
    STEP1: 0,
    STEP2: 1,
    STEP3: 2,
  };
  apiConstants = {
    ADMIN: "ADMIN",
    CMDB: "CMDB",
  };

  constructor(props) {
    super(props);
    this.state = {
      activeStep: this.steps.STEP1,
      step1: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        termsOfService: false,
      },
      step2: {
        companyName: "",
        companyLocation: "",
        profileImg: ProfileIcon,
        file: null,
      },
      passwordView: true,
      submittedSteps: [false, false, false],
      showRequestPopup: false,
      isValidPassword: false,
    };
  }

  togglePopup = () => {
    this.setState({
      showRequestPopup: !this.state.showRequestPopup,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.signUpUser.status !== prevProps.signUpUser.status) {
      if (this.props.signUpUser.status === status.SUCCESS) {
        let signUpResponse = this.props.signUpUser.data;
        if (signUpResponse?.id) {
          ToastMessage.success("New user registered!");
          this.setActiveStep("", this.steps.STEP3);
        } else {
          if (signUpResponse?.code === 418) {
            this.togglePopup();
          } else {
            ToastMessage.error(
              signUpResponse?.message || "User registration failed!"
            );
          }
        }
      } else if (this.props.signUpUser.status === status.FAILURE) {
        ToastMessage.error("User registration failed!");
      }
    }
  };

  setActiveStep = (e, newStep, dontValidate) => {
    if (e) {
      e.preventDefault();
    }

    const { submittedSteps, activeStep } = this.state;
    submittedSteps[activeStep] = true;
    this.setState({
      submittedSteps,
    });
    const { isValid } = this.validateForm(activeStep, submittedSteps);
    if (isValid || dontValidate) {
      this.setState({
        activeStep: newStep,
      });
    }
  };

  validateForm = (activeStep, submittedSteps) => {
    const { step1, step2, isValidPassword } = this.state;
    let isValid = true;
    let errors = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      termsOfService: "",
      companyName: "",
    };

    let emailRegex = REGEX_TYPE.EMAIL;
    if (activeStep === this.steps.STEP1 && submittedSteps[this.steps.STEP1]) {
      let firstNameNotMatchPolicy = [
        !isAlphabet(step1.firstName),
        step1.firstName.trim().length > 50,
      ].includes(true);

      if (!step1.firstName.trim()) {
        errors.firstName = "The first name is required!";
        isValid = false;
      } else if (firstNameNotMatchPolicy) {
        errors.firstName =
          "The first name should be a maximum of 50 alphabets characters.";
        isValid = false;
      } else {
        errors.firstName = "";
      }

      let lastNameNotMatchPolicy = [
        !isAlphabet(step1.lastName),
        step1.lastName.trim().length > 50,
      ].includes(true);

      if (!step1.lastName.trim()) {
        errors.lastName = "The last name is required!";
        isValid = false;
      } else if (lastNameNotMatchPolicy) {
        errors.lastName =
          "The last name should be a maximum of 50 alphabets characters.";
        isValid = false;
      } else {
        errors.lastName = "";
      }
      let userNameNotMatchPolicy = [
        !isAlphaNumeric(step1.userName),
        step1.userName.length < 8,
        step1.userName.length > 50,
      ].includes(true);

      if (!step1.userName.trim()) {
        errors.userName = "Username is required!";
        isValid = false;
      } else if (userNameNotMatchPolicy) {
        errors.userName =
          "Username should be between 8 and 50 alphanumeric characters.";
        isValid = false;
      } else {
        errors.userName = "";
      }

      if (!step1.email.trim()) {
        errors.email = "Email is required!";
        isValid = false;
      } else if (!emailRegex.test(step1.email)) {
        errors.email = "Please enter valid email!";
        isValid = false;
      } else {
        errors.email = "";
      }

      if (!step1.password.trim()) {
        errors.password = "Password is required!";
        isValid = false;
      } else if (!isValidPassword) {
        errors.password = "Please enter strong password";
        isValid = false;
      } else {
        errors.password = "";
      }

      if (!step1.termsOfService) {
        errors.termsOfService = "You must agree with the terms and conditions.";
        isValid = false;
      } else {
        errors.termsOfService = "";
      }
    }
    if (activeStep === this.steps.STEP2 && submittedSteps[this.steps.STEP2]) {
      let companyNameNotMatchPolicy = [
        !isAlphaNumeric(step2.companyName),
        step2.companyName.length > 50,
      ].includes(true);

      if (!step2.companyName) {
        errors.companyName = "Company name is required!";
        isValid = false;
      } else if (companyNameNotMatchPolicy) {
        errors.companyName =
          "Company Name should be a maximum of 50 characters.";
        isValid = false;
      } else {
        errors.companyName = "";
      }
    }

    return { isValid, errors };
  };

  handleTermsChange = (e) => {
    const { step1 } = this.state;
    step1.termsOfService = e.target.checked;
    this.setState({ step1 });
  };

  handleStep1Changes = (e) => {
    let { step1 } = this.state;
    const { name, value } = e.target;
    step1[name] = value;
    this.setState({ step1 });
  };

  handleStep2Changes = (e) => {
    let { step2 } = this.state;
    const { name, value } = e.target;
    step2[name] = value;
    this.setState({ step2 });
  };

  onChangeCompanyProfileImage = (e) => {
    const reader = new FileReader();
    const { step2 } = this.state;
    reader.onload = () => {
      if (reader.readyState === 2) {
        step2.profileImg = reader.result;
        step2.file = e.target.files[0];
        this.setState({ step2 });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  signUpSubmit = () => {
    const { submittedSteps, activeStep, step1, step2 } = this.state;
    submittedSteps[activeStep] = true;
    this.setState({
      submittedSteps,
    });
    const { isValid } = this.validateForm(activeStep, submittedSteps);
    if (isValid) {
      let { ADMIN, CMDB } = this.apiConstants;
      let form = new FormData();
      form.append("firstName", step1.firstName);
      form.append("lastName", step1.lastName);
      form.append("username", step1.userName);
      form.append("organization", step2.companyName);
      form.append("email", step1.email);
      form.append("type", ADMIN);
      form.append("targetService", CMDB);
      form.append("password", step1.password);
      form.append("errorOnOrgFound", true);
      if (step2.file) {
        form.append("orgProfileFile", step2.file);
      }
      this.props.signUp(form);
    }
  };

  generatePassword = () => {
    const { step1 } = this.state;
    let pwd = generateRandomPassword();
    step1["password"] = pwd;
    this.setState({ step1 });
  };
  render() {
    const {
      activeStep,
      submittedSteps,
      step1,
      step2,
      passwordView,
      showRequestPopup,
    } = this.state;
    const { errors } = this.validateForm(activeStep, submittedSteps);
    return (
      <Box className="sign-container">
        <Box className="sign-step">
          <Box className="sign-left">
            <Box className="sign-left-content">
              <span className="d-flex width-100">Appkube</span>
              <h2 className="d-flex width-100 m-t-0 m-b-0">
                Manage your project and team in easy way
              </h2>
              <Box className="d-flex width-100 banner-image">
                <img
                  src={
                    (activeStep === this.steps.STEP1 && SigninBanner) ||
                    (activeStep === this.steps.STEP2 && SignupBanner1) ||
                    (activeStep === this.steps.STEP3 && SignupBanner2)
                  }
                  alt="SignupBanner"
                  style={{
                    maxHeight: `${activeStep === this.steps.STEP3 && "450px"}`,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="sign-right">
            <Box className="sign-right-content">
              <Box className="d-block width-100 back-btn">
                {activeStep === this.steps.STEP1 && (
                  <Button
                    className="secondary-text-btn min-width-inherit"
                    to={`${AUTH_PREFIX_PATH}/signin`}
                    variant="outlined"
                    component={Link}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </Button>
                )}
                {activeStep === this.steps.STEP2 && (
                  <Button
                    className="secondary-text-btn min-width-inherit"
                    variant="outlined"
                    onClick={(e) =>
                      this.setActiveStep(e, this.steps.STEP1, true)
                    }
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </Button>
                )}
                {activeStep === this.steps.STEP3 && (
                  <Button
                    className="secondary-text-btn min-width-inherit"
                    variant="outlined"
                    disabled={true}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </Button>
                )}
                <span>Appkube</span>
              </Box>
              <List className="steps-container">
                <ListItem
                  className={
                    activeStep === this.steps.STEP1
                      ? "active"
                      : "" || (activeStep === this.steps.STEP2) === true
                      ? "active"
                      : "" || (activeStep === this.steps.STEP3) === true
                      ? "active"
                      : ""
                  }
                >
                  <span>step 1</span>
                </ListItem>
                <ListItem
                  className={
                    activeStep === this.steps.STEP2
                      ? "active"
                      : "" || (activeStep === this.steps.STEP3) === true
                      ? "active"
                      : ""
                  }
                >
                  <span>step 2</span>
                </ListItem>
                <ListItem
                  className={activeStep === this.steps.STEP3 ? "active" : ""}
                >
                  <span>step 3</span>
                </ListItem>
              </List>
              <Box className="d-flex width-100 heading">
                {activeStep === this.steps.STEP1 && (
                  <>
                    Sign up to <strong>Appkube</strong>
                  </>
                )}
                {activeStep === this.steps.STEP2 && (
                  <>
                    Complete your company profile
                    <span>
                      Thousands of businesses such as yours easily manage their
                      project and their teams
                    </span>
                  </>
                )}
                {activeStep === this.steps.STEP3 && (
                  <>
                    Registration Complete
                    <span>
                      Thousands of businesses such as yours easily manage their
                      project and their teams
                    </span>
                  </>
                )}
              </Box>
              <form onSubmit={this.setActiveStep}>
                {activeStep === this.steps.STEP1 && (
                  <>
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
                        <Grid item xs={6}>
                          <Box className="input-group">
                            <label className="d-block" htmlFor="firstName">
                              First Name
                            </label>
                            <input
                              id="firstName"
                              type="text"
                              className="form-control"
                              placeholder="Input your first name here"
                              name="firstName"
                              value={step1.firstName}
                              onChange={this.handleStep1Changes}
                            />
                            {submittedSteps[this.steps.STEP1] &&
                            errors.firstName ? (
                              <p className="m-b-0">{errors.firstName}</p>
                            ) : (
                              <></>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className="input-group">
                            <label className="d-block" htmlFor="lastName">
                              Last Name
                            </label>
                            <input
                              id="lastName"
                              type="text"
                              className="form-control"
                              placeholder="Input your last name here"
                              name="lastName"
                              value={step1.lastName}
                              onChange={this.handleStep1Changes}
                            />
                            {submittedSteps[this.steps.STEP1] &&
                            errors.lastName ? (
                              <p className="m-b-0">{errors.lastName}</p>
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
                            <label className="d-block" htmlFor="userName">
                              Username / Login ID
                            </label>
                            <input
                              id="userName"
                              type="text"
                              className="form-control"
                              placeholder="Username / Login ID"
                              name="userName"
                              value={step1.userName}
                              onChange={this.handleStep1Changes}
                            />
                            {submittedSteps[this.steps.STEP1] &&
                            errors.userName ? (
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
                            <label className="d-block" htmlFor="email">
                              Email
                            </label>
                            <input
                              id="email"
                              type="email"
                              className="form-control"
                              placeholder="Input your email here"
                              name="email"
                              value={step1.email}
                              onChange={this.handleStep1Changes}
                            />
                            {submittedSteps[this.steps.STEP1] &&
                            errors.email ? (
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
                            <label className="d-block" htmlFor="passwordView">
                              Password
                            </label>
                            <input
                              id="passwordView"
                              type={passwordView ? "password" : "text"}
                              className="form-control"
                              placeholder="Input your password here"
                              name="password"
                              value={step1.password}
                              onChange={this.handleStep1Changes}
                            />

                            {submittedSteps[this.steps.STEP1] &&
                            errors.password ? (
                              <p className="m-b-0">{errors.password}</p>
                            ) : (
                              <></>
                            )}

                           <button className="eye-icon">
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
                           </button>
                            <span
                              className="input-group-text rotate"
                              onClick={this.generatePassword}
                            >
                              <HtmlTooltip
                                className="popup-tooltip"
                                title={
                                  <React.Fragment>
                                    <List>
                                      <ListItem>
                                        Generate a new secure 12-digit password
                                      </ListItem>
                                    </List>
                                  </React.Fragment>
                                }
                              >
                                <i className="fa-solid fa-arrows-rotate"></i>
                              </HtmlTooltip>
                            </span>
                          </Box>
                        </Grid>
                        <PasswordStrength
                          password={step1.password}
                          checkIsValidPassword={(isValidPassword) => {
                            this.setState({ isValidPassword });
                          }}
                        />
                      </Grid>
                    </Box>
                    <Box className="remember-content">
                      <Box className="d-flex align-items-center">
                        <FormControlLabel
                          control={<Checkbox checked={step1.termsOfService} />}
                          label="I have read and agree to the trems of Service"
                          className="checkbox primary"
                          size="small"
                          onChange={this.handleTermsChange}
                        />
                      </Box>
                      {submittedSteps[this.steps.STEP1] &&
                      errors.termsOfService ? (
                        <p className="m-b-0 error-text">
                          {errors.termsOfService}
                        </p>
                      ) : (
                        <></>
                      )}
                    </Box>
                    <Box className="d-flex width-100 next-step">
                      <Button
                        className="primary-btn"
                        onClick={(e) => this.setActiveStep(e, this.steps.STEP2)}
                        variant="contained"
                        type="submit"
                      >
                        Next
                      </Button>
                      <p>
                        Already have on account?
                        <Link to={`${AUTH_PREFIX_PATH}/signin`}>
                          Sign In Now
                        </Link>
                      </p>
                    </Box>
                  </>
                )}
                {activeStep === this.steps.STEP2 && (
                  <>
                    <Box className="select-profile">
                      <Box className="profile-image">
                        <img src={step2.profileImg} alt="profile" />
                      </Box>
                      <Box className="company-content">
                        <p>Select your company profile picture</p>
                        <input
                          type="file"
                          accept="image/*"
                          name="image-upload"
                          id="input"
                          onChange={this.onChangeCompanyProfileImage}
                          hidden
                        />
                        <Box className="label">
                          <label className="image-upload" htmlFor="input">
                            <span className="width-25 blue-button">Browse</span>
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
                            <label className="d-block" htmlFor="companyName">
                              Your Company Name
                            </label>
                            <input
                              id="companyName"
                              type="text"
                              className="form-control"
                              placeholder="Input your name here"
                              name="companyName"
                              value={step2.companyName}
                              onChange={this.handleStep2Changes}
                            />
                            {submittedSteps[this.steps.STEP2] &&
                            errors.companyName ? (
                              <p className="m-b-0">{errors.companyName}</p>
                            ) : (
                              <></>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="d-flex width-100 next-step">
                      <LoadingButton
                        type="submit"
                        onClick={this.signUpSubmit}
                        className="primary-btn"
                        variant="contained"
                        disabled={
                          this.props.signUpUser.status === status.IN_PROGRESS
                        }
                        loading={
                          this.props.signUpUser.status === status.IN_PROGRESS
                        }
                      >
                        Next
                      </LoadingButton>
                    </Box>
                  </>
                )}
                {activeStep === this.steps.STEP3 && (
                  <>
                    <Box className="d-flex width-100 next-step">
                      <LoadingButton
                        type="submit"
                        className="primary-btn"
                        variant="contained"
                        onClick={() =>
                          this.props.navigate(`${AUTH_PREFIX_PATH}/signin`)
                        }
                      >
                        Continue To Sign In
                      </LoadingButton>
                    </Box>
                  </>
                )}
              </form>
            </Box>
          </Box>
        </Box>
        {showRequestPopup ? (
          <RequestPopup
            showModal={showRequestPopup}
            togglePopup={this.togglePopup}
            companyName={step2.companyName}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { signUpUser } = state.auth;
  return {
    signUpUser,
  };
}

const mapDispatchToProps = {
  signUp,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(SignUp));

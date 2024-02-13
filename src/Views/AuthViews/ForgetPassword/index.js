import React, { Component } from "react";
import ForgotPasswordImage from "assets/img/login/forgot-password-image.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { AUTH_PREFIX_PATH } from "Configs/AppConfig";
import Button from "@mui/material/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { forgotPassword } from "Redux/Auth/AuthThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import LoadingButton from "@mui/lab/LoadingButton";
import ResetPassword from "../ResetPassword";
import { ToastMessage } from "Toast/ToastMessage";

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
      },
      sendEmail: false,
      toggleScreen: false,
      isSubmit: false,
      showPassword: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.forgotPwd.status !== this.props.forgotPwd.status &&
      this.props.forgotPwd.status === status.SUCCESS
    ) {
      if (this.props.forgotPwd.data?.code === 200) {
        this.setState({ toggleScreen: !this.state.toggleScreen });
      } else if (this.props.forgotPwd.data?.code === 417) {
        ToastMessage.error(
          this.props.forgotPwd.data?.message || "User not found!"
        );
      } else if (this.props.forgotPwd.data?.code === 418) {
        ToastMessage.error("Mail not found!");
      } else {
        ToastMessage.error(this.props.forgotPwd.data?.title || "Forget password action failed.");
      }
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  handleSignIn = (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });
    const { valid } = this.validateForm(true);
    if (valid) {
      // this.props.router.navigate(`${AUTH_PREFIX_PATH}/resetpassword`);
      this.props.forgotPassword(this.state.formData.username);
    }
  };

  validateForm = (isSubmit) => {
    const { formData } = this.state;
    let valid;
    let formErrors = {};
    if (isSubmit) {
      if (!formData.username) {
        formErrors.username = "Username is required!";
        valid = false;
      } else {
        formErrors.username = "";
        valid = true;
      }
    }

    return { valid, formErrors };
  };

  render() {
    const { formData, isSubmit, toggleScreen } = this.state;
    const { formErrors } = this.validateForm(isSubmit);
    return (
      <>
        {!toggleScreen ? (
          <Box className="forget-container">
            <Box className="forget-left">
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
                  <span>Appkube</span>
                </Box>
                <Box className="d-block width-100 forget-text">
                  <h2>Forget Password</h2>
                  <p>
                    Enter the username address you used when you joines we'll
                    send you instructions to reset your password.
                  </p>
                  <p>
                    For security reasone, we do Not store your password. So rest
                    assured thet we will never send your password via email.
                  </p>
                </Box>
                <form className="width-100" onSubmit={this.handleSignIn}>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12}>
                        <Box className="input-group">
                          <label className="d-block" htmlFor="username">
                            Username
                          </label>
                          <input
                            id="username"
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Input your username here"
                            value={formData.username}
                            onChange={this.handleInputChange}
                            autoComplete="on"
                          />
                          {formErrors.username ? (
                            <p className="m-b-0">{formErrors.username}</p>
                          ) : (
                            <></>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="d-flex width-100 next-step">
                    <LoadingButton
                      loading={
                        this.props.forgotPwd.status === status.IN_PROGRESS
                          ? true
                          : false
                      }
                      className="primary-btn"
                      onClick={this.handleSignIn}
                      variant="contained"
                    >
                      Reset your password
                    </LoadingButton>
                  </Box>
                </form>
              </Box>
            </Box>
            <Box className="forget-right">
              <img src={ForgotPasswordImage} alt="forget-password" />
            </Box>
          </Box>
        ) : (
          <ResetPassword userName={this.state.formData.username} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { forgotPwd } = state.auth;
  return { forgotPwd };
};

const mapDispatchToProps = {
  forgotPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ForgetPassword));

import React, { Component } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, Button, List, ListItem } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PasswordStrength from "Components/PasswordStrength";
import TwoFactorImg from "assets/img/setting/two-factor.svg";
import AuthenticationModal from "./Components/AuthenticationModal";
import { styled } from "@mui/material/styles";
import status from "Redux/Constants/CommonDS";
import { generateRandomPassword, getCurrentUser } from "Utils";
import { changePasswordOfAccount } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import { ToastMessage } from "Toast/ToastMessage";
import DisabledAuthenticationModal from "./Components/DisabledAuthenticationModal";

export class Account extends Component {
  user = { username: "", email: "", profileImage: "", isMfaEnable: null };
  constructor(props) {
    super(props);
    this.state = {
      currentPasswordHidden: true,
      newPasswordHidden: true,
      confirmPasswordHidden: true,
      formData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      service: "read_mode",
      showChangePasswordModal: false,
      showAuthenticationModal: false,
      showDisabledAuthenticationModal: false,
      isMfaEnable: "",
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.setState({ isMfaEnable: this.user.isMfaEnable });
  };

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.accountChangePassword.status !==
        this.props.accountChangePassword.status &&
      this.props.accountChangePassword.status === status.SUCCESS
    ) {
      if (this.props.accountChangePassword.data) {
        this.setState({
          formData: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          },
          isSubmit: false,
          currentPasswordHidden: true,
          newPasswordHidden: true,
          confirmPasswordHidden: true,
        });
        ToastMessage.success("Changed password successfully!");
      } else {
        ToastMessage.error("Change password action failed!");
      }
    }
  };
  handleChangePasswordModal = () => {
    this.setState({
      showChangePasswordModal: !this.state.showChangePasswordModal,
    });
  };

  handleAuthenticationModal = () => {
    this.setState({
      showAuthenticationModal: !this.state.showAuthenticationModal,
    });
  };

  handleDisabledAuthenticationModal = () => {
    this.setState({
      showDisabledAuthenticationModal:
        !this.state.showDisabledAuthenticationModal,
    });
  };

  validate = (isSubmit) => {
    const { formData, isValidPassword } = this.state;
    let isValid;
    let errors;
    if (isSubmit) {
      isValid = true;
      if (!formData.currentPassword && !this.props.isCurrentPasswordHide) {
        errors = {
          ...errors,
          currentPassword: "Current password is required!",
        };
        isValid = false;
      } else {
        errors = { ...errors, currentPassword: "" };
      }

      if (!formData.newPassword) {
        errors = { ...errors, newPassword: "New Password is required!" };
        isValid = false;
      } else if (!isValidPassword) {
        errors = {
          ...errors,
          newPassword: "Please enter strong password.",
        };
        isValid = false;
      } else {
        errors = { ...errors, newPassword: "" };
      }

      if (!formData.confirmPassword) {
        errors = {
          ...errors,
          confirmPassword: "Confirm Password is required!",
        };
        isValid = false;
      } else if (formData.confirmPassword !== formData.newPassword) {
        errors = {
          ...errors,
          confirmPassword:
            "New password and confirm password should be matched !",
        };
        isValid = false;
      }
    }
    return { isValid, errors };
  };

  /** Handles input change
   * @param {event} e - Input event on user input
   */
  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  /** Generates random password on user click */
  generatePassword = () => {
    const { formData } = this.state;

    formData["newPassword"] = generateRandomPassword()
    this.setState({ formData });
  };

  handleSubmitPassword = () => {
    this.setState({ isSubmit: true }, () => {
      let { isValid } = this.validate(this.state.isSubmit);
      let {
        formData: { currentPassword, newPassword },
      } = this.state;

      if (isValid) {
        this.props.changePasswordOfAccount({
          userName: this.user.username,
          oldPassword: currentPassword,
          newPassword,
        });
      }
    });
  };

  /**
   * @param {string} field - Field name on which user clicked toggle switch
   */
  togglePasswordView = (field) => {
    this.setState({ [field]: !this.state[field] });
  };
  render() {
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
    const {
      currentPasswordHidden,
      confirmPasswordHidden,
      newPasswordHidden,
      formData,
      isSubmit,
      showAuthenticationModal,
      showDisabledAuthenticationModal,
      isMfaEnable,
    } = this.state;
    let { userResetPassword, accountChangePassword, isCurrentPasswordHide } =
      this.props;
    let passwordStatus = isCurrentPasswordHide
      ? userResetPassword?.status === status.IN_PROGRESS
      : accountChangePassword?.status === status.IN_PROGRESS;
    const { errors } = this.validate(isSubmit);
    return (
      <Box className="account-container">
        <Box className="cards">
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} md={6} lg={6}>
                <Box className="card">
                  <Box className="password-container">
                    <h5>Change Password</h5>
                    <p>
                      Password Must Contain at least 1 letter, 1 number, and 1
                      symbol. Minimum length is 12 characters.
                    </p>
                    <form>
                      <Box className="form-group">
                        <label htmlFor="CurrentPassword" className="form-label">
                          Current Password
                        </label>
                        <input
                          type={currentPasswordHidden ? "password" : "text"}
                          className="form-control"
                          id="currentPassword"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={this.handleInputChange}
                          autoComplete="off"
                        />
                        <span
                          className="input-group-text"
                          onClick={() =>
                            this.togglePasswordView("currentPasswordHidden")
                          }
                        >
                          <i
                            className={
                              currentPasswordHidden
                                ? "fa-regular fa-eye-slash"
                                : "fa-sharp fa-regular fa-eye"
                            }
                          ></i>
                        </span>
                        <span
                          className="red"
                          style={{ fontSize: "12px", marginTop: "5px" }}
                        >
                          {isSubmit && errors && errors.currentPassword
                            ? errors.currentPassword
                            : ""}
                        </span>
                      </Box>

                      <Box className="form-group">
                        <label htmlFor="NewPassword" className="form-label">
                          New Password
                        </label>
                        <input
                          type={newPasswordHidden ? "password" : "text"}
                          className="form-control"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          autoComplete="off"
                          onChange={this.handleInputChange}
                        />
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
                        <span
                          className="input-group-text"
                          onClick={() =>
                            this.togglePasswordView("newPasswordHidden")
                          }
                        >
                          <i
                            className={
                              newPasswordHidden
                                ? "fa-regular fa-eye-slash"
                                : "fa-sharp fa-regular fa-eye"
                            }
                          ></i>
                        </span>
                        <span
                          className="red"
                          style={{ fontSize: "12px", marginTop: "5px" }}
                        >
                          {isSubmit && errors && errors.newPassword
                            ? errors.newPassword
                            : ""}
                        </span>
                      </Box>
                      <Box className="form-group">
                        <label
                          htmlFor="Confirm Password"
                          className="form-label"
                        >
                          Confirm Password
                        </label>
                        <input
                          type={confirmPasswordHidden ? "password" : "text"}
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={this.handleInputChange}
                          autoComplete="off"
                        />
                        <span
                          className="input-group-text"
                          onClick={() =>
                            this.togglePasswordView("confirmPasswordHidden")
                          }
                        >
                          <i
                            className={
                              confirmPasswordHidden
                                ? "fa-regular fa-eye-slash"
                                : "fa-sharp fa-regular fa-eye"
                            }
                          ></i>
                        </span>
                        <span
                          className="red"
                          style={{ fontSize: "12px", marginTop: "5px" }}
                        >
                          {isSubmit && errors && errors.confirmPassword
                            ? errors.confirmPassword
                            : ""}
                        </span>
                      </Box>
                      <PasswordStrength
                        password={formData.newPassword}
                        checkIsValidPassword={(isValidPassword) => {
                          this.setState({ isValidPassword });
                        }}
                      />
                    </form>
                    <Box className="d-block text-center m-t-2">
                      <LoadingButton
                        className="primary-btn min-width"
                        variant="contained"
                        disabled={passwordStatus}
                        loading={passwordStatus}
                        onClick={this.handleSubmitPassword}
                      >
                        Submit New Password
                      </LoadingButton>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} mg={6} lg={6}>
                <Box className="card">
                  <Box className="card-title">Two-Factor Authentication</Box>
                  <p className="card-text">
                    Two-factor authentication (2FA) adds an extra layer of
                    security to your account. In addition to username and
                    password
                  </p>
                  <Box className="text-center">
                    <Box className="card-image">
                      <img src={TwoFactorImg} alt="Two-Factor Authentication" />
                    </Box>
                    <Box className="card-title">Secure your account</Box>
                    <p className="card-text">
                      Enable two factor authentication to add an extra layer of
                      security
                    </p>
                    <Box className="card-btn">
                      <Button
                        className={
                          isMfaEnable === "YES"
                            ? "disabled width-25"
                            : "primary-btn width-25"
                        }
                        // disabled={this.user.isMfaEnable === "YES"}
                        onClick={() =>
                          isMfaEnable === "YES"
                            ? this.handleDisabledAuthenticationModal()
                            : this.handleAuthenticationModal()
                        }
                      >
                        {isMfaEnable === "YES" ? "Disable " : ""} 2FA
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {showAuthenticationModal ? (
          <AuthenticationModal
            showModal={showAuthenticationModal}
            handleAuthenticationModal={this.handleAuthenticationModal}
            setMFAEnable={(isMfaEnable) => {
              if (isMfaEnable) {
                this.setState({ isMfaEnable });
              }
            }}
          />
        ) : (
          <></>
        )}
        {showDisabledAuthenticationModal ? (
          <DisabledAuthenticationModal
            showModal={showDisabledAuthenticationModal}
            handleDisabledAuthenticationModal={(e, isMfaEnable) => {
              if (isMfaEnable) {
                this.setState({ isMfaEnable });
              }
              this.handleDisabledAuthenticationModal(e);
            }}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  const { accountChangePassword } = state.settings;
  return {
    accountChangePassword,
  };
};

const mapDispatchToProps = {
  changePasswordOfAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

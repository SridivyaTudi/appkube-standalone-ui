import React, { Component } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import { Box, Grid, Button, Card, List, ListItem } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PasswordStrength from "Components/PasswordStrength";
import ChangePasswordImg from "assets/img/setting/change-password.png";
import TwoFactorImg from "assets/img/setting/two-factor.svg";
import ChangePasswordModal from "./Components/ChangePasswordModal";
import AuthenticationModal from "./Components/AuthenticationModal";
import { styled } from "@mui/material/styles";
import status from "Redux/Constants/CommonDS";

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPasswordHidden: true,
      formData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      service: "read_mode",
      showChangePasswordModal: false,
      showAuthenticationModal: false,
    };
  }

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
      newPassword,
      confirmPassword,
      formData,
      isSubmit,
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
                      {this.props.isCurrentPasswordHide ? (
                        <></>
                      ) : (
                        <Box className="form-group">
                          <label
                            htmlFor="CurrentPassword"
                            className="form-label"
                          >
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
                      )}

                      <Box className="form-group">
                        <label htmlFor="NewPassword" className="form-label">
                          New Password
                        </label>
                        <input
                          type={newPassword ? "password" : "text"}
                          className="form-control"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          autoComplete="off"
                          onChange={this.handleInputChange}
                        />
                        <span
                          className="input-group-text rotate"
                          onClick={this.generateRandomPassword}
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
                          onClick={() => this.togglePasswordView("newPassword")}
                        >
                          <i
                            className={
                              newPassword
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
                          type={confirmPassword ? "password" : "text"}
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
                            this.togglePasswordView("confirmPassword")
                          }
                        >
                          <i
                            className={
                              confirmPassword
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
                  Enable two factor authentication to add an extra layer of security
                  </p>
                  <Box className="card-btn">
                    <Button className="primary-btn width-25">T2F Auth</Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      // <Box className="account-container">
      //   <Box className="head">
      //     <h4>Keep your Account Secure</h4>
      //     <p>
      //       Use our pre-existing template or you can create your own code or
      //       migrate your project to get started
      //     </p>
      //   </Box>
      //   <Box className="cards">
      //     <Box sx={{ width: "100%" }}>
      //       <Grid
      //         container
      //         rowSpacing={1}
      //         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      //         alignItems={"center"}
      //         justifyContent={"flex-start"}
      //       >
      //         <Grid item xs={6}>
      //           <Box
      //             className={`card ${service === "read_mode" ? "active" : ""}`}
      //             onClick={() => {
      //               this.setState({ service: "read_mode" });
      //             }}
      //           >
      //             <Box className="card-image">
      //               <img src={ChangePasswordImg} alt="Change Password" />
      //             </Box>
      //             <h5 className="card-title">Change Password</h5>
      //             <p className="card-text">
      //               After a successful account password update, you will need to
      //               log in with the new account password.
      //             </p>
      //           </Box>
      //         </Grid>
      //         <Grid item xs={6}>
      //           <Box
      //             className={`card ${
      //               service === "automation_mode" ? "active" : ""
      //             }`}
      //             onClick={() => {
      //               this.setState({ service: "automation_mode" });
      //             }}
      //           >
      //             <Box className="card-image">
      //               <img src={TwoFactorImg} alt="Two-Factor Authentication" />
      //             </Box>
      //             <Box className="card-title">Two-Factor Authentication</Box>
      //             <p className="card-text">
      //               Two-factor authentication (2FA) adds an extra layer of
      //               security to your account. In addition to username and
      //               password
      //             </p>
      //           </Box>
      //         </Grid>
      //       </Grid>
      //     </Box>
      //   </Box>
      //   <Box className="d-block bottom-button">
      //     {service === "read_mode" && (
      //       <Button
      //         className="primary-btn width-25"
      //         onClick={this.handleChangePasswordModal}
      //       >
      //         Change Password
      //       </Button>
      //     )}
      //     {service === "automation_mode" && (
      //       <Button
      //         className="primary-btn width-25"
      //         onClick={this.handleAuthenticationModal}
      //       >
      //         T2F Auth
      //       </Button>
      //     )}
      //   </Box>
      //   {showChangePasswordModal ? (
      //     <ChangePasswordModal
      //       showModal={showChangePasswordModal}
      //       handleChangePasswordModal={this.handleChangePasswordModal}
      //     />
      //   ) : (
      //     <></>
      //   )}
      //   {showAuthenticationModal ? (
      //     <AuthenticationModal
      //       showModal={showAuthenticationModal}
      //       handleAuthenticationModal={this.handleAuthenticationModal}
      //     />
      //   ) : (
      //     <></>
      //   )}
      // </Box>;
    );
  }
}
export default Account;

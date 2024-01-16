import LoadingButton from "@mui/lab/LoadingButton";
import { Box, List, ListItem } from "@mui/material/";
import PasswordStrength from "Components/PasswordStrength";
import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { resetPasswordOfUser } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { getCurrentUser } from "Utils";
import { ToastMessage } from "Toast/ToastMessage";

class ChangePasswordModal extends Component {
  user = { id: "", username: "" };
  constructor(props) {
    super(props);
    this.state = {
      currentPasswordHidden: true,
      newPassword: true,
      confirmPassword: true,
      formData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      pwdStrength: 0,
      isSubmit: false,
      isValidPassword: false,
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.userResetPassword.status !==
        this.props.userResetPassword.status &&
      this.props.userResetPassword.status === status.SUCCESS
    ) {
      if (this.props.userResetPassword.data) {
        this.props.handleChangePasswordModal();
        ToastMessage.success("Password reset successfully!");
      } else {
        ToastMessage.error("Reset password action failed!");
      }
    }
  };

  /**
   * @param {string} field - Field name on which user clicked toggle switch
   */
  togglePasswordView = (field) => {
    this.setState({ [field]: !this.state[field] });
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
  generateRandomPassword = () => {
    const { formData } = this.state;
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;
    let pwd = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      pwd += chars.substring(randomNumber, randomNumber + 1);
    }
    formData["newPassword"] = pwd;
    this.setState({ formData });
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

  handleSubmitPassword = () => {
    this.setState({ isSubmit: true }, () => {
      let { isValid } = this.validate(this.state.isSubmit);
      let {
        formData: { newPassword },
      } = this.state;

      if (isValid) {
        if (this.props.isCurrentPasswordHide) {
          this.props.resetPasswordOfUser({
            userName: this.user.username,
            ownerId: this.user.id,
            newPassword,
          });
        }
      }
    });
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
    const { errors } = this.validate(isSubmit);
    let { userResetPassword, accountChangePassword, isCurrentPasswordHide } =
      this.props;
    let passwordStatus = isCurrentPasswordHide
      ? userResetPassword?.status === status.IN_PROGRESS
      : accountChangePassword?.status === status.IN_PROGRESS;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleChangePasswordModal}
        className="setting-modal-container"
      >
        <ModalHeader tag="div">
          <h5>Change Password</h5>
          <p>
            Password Must Contain at least 1 letter, 1 number, and 1 symbol.
            Minimum length is 12 characters.
          </p>
        </ModalHeader>
        <ModalBody>
          <form>
            {this.props.isCurrentPasswordHide ? (
              <></>
            ) : (
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
              <label htmlFor="Confirm Password" className="form-label">
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
                onClick={() => this.togglePasswordView("confirmPassword")}
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
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
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
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  const { userResetPassword } = state.settings;
  return {
    userResetPassword,
  };
};

const mapDispatchToProps = {
  resetPasswordOfUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordModal);

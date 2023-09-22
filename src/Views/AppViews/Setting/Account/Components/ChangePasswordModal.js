import LoadingButton from "@mui/lab/LoadingButton";
import { Box, List, ListItem } from "@mui/material/";
import PasswordStrength from "Components/PasswordStrength";
import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

class ChangePasswordModal extends Component {
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
      isValidPassword:false
    };
  }

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
    const { currentPasswordHidden, newPassword, confirmPassword, formData } =
      this.state;
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
                onClick={() => this.togglePasswordView("currentPasswordHidden")}
              >
                <i
                  className={
                    currentPasswordHidden
                      ? "fa-regular fa-eye-slash"
                      : "fa-sharp fa-regular fa-eye"
                  }
                ></i>
              </span>
            </Box>
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
              onClick={this.props.handleChangePasswordModal}
            >
              Submit New Password
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ChangePasswordModal;

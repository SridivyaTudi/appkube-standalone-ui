import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { v4 } from "uuid";

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
    this.setState({ formData }, () => {
      this.checkPasswordStrength();
    });
  };

  /** Checkes new entered password strength */
  checkPasswordStrength = (isConfirrmPasswordField = 0) => {
    const { formData } = this.state;

    const password = isConfirrmPasswordField ? formData.confirmPassword : formData.newPassword;
    let strength = 0;

    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;
    }
    if (password.match(/([0-9])/)) {
      strength += 1;
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
    }
    if (password.length > 7) {
      strength += 1;
    }

    this.setState({ pwdStrength: strength }, () => {
      this.renderPasswordStrength();
    });
  };

  /** Renders bars according to password strength */
  renderPasswordStrength = () => {
    const { pwdStrength } = this.state;
    const JSX = [];
    for (let i = 0; i < 4; i++) {
      if (pwdStrength <= 2 && i <= pwdStrength - 1) {
        JSX.push(<span key={v4()} className={"good"}></span>);
      } else if (pwdStrength > 2 && i <= pwdStrength - 1) {
        JSX.push(<span key={v4()} className={"strong"}></span>);
      } else {
        JSX.push(<span key={v4()}></span>);
      }
    }
    return JSX;
  };

  render() {
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
                onChange={(e) => {
                  this.handleInputChange(e);
                  this.checkPasswordStrength();
                }}
              />
              <span
                className="input-group-text rotate"
                onClick={this.generateRandomPassword}
              >
                <i className="fa-solid fa-arrows-rotate"></i>
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
                onChange={(e) => {
                  this.handleInputChange(e);
                  this.checkPasswordStrength(1);
                }}
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
            <Box className="password-strength-group m-b-10">
              {this.renderPasswordStrength()}
            </Box>
            <p className="strength-text">
              We Strongly suggest that you create strong password
            </p>
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

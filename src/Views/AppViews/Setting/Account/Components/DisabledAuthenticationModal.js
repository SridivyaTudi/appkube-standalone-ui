import React, { Component } from "react";
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import lockImg from "../../../../../assets/img/setting/Light.png";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { disableAuthMFACode } from "Redux/Settings/SettingsThunk";
import { getCurrentUser, setCurrentUser } from "Utils";
import { ToastMessage } from "Toast/ToastMessage";
class DisabledAuthenticationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordHidden: true,
      formData: {
        userName: "",
        password: "",
      },
      isSubmit: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.disableMfaAuth.status !== this.props.disableMfaAuth.status &&
      this.props.disableMfaAuth.status === status.SUCCESS
    ) {
      if (this.props.disableMfaAuth.data.type === "SUCCESS") {
        this.updateMfaStatus();
        this.props.handleDisabledAuthenticationModal("", "NO");
        ToastMessage.success("2FA Disabled Successfully");
      } else {
        ToastMessage.error("OTP validation failed!");
      }
    }
  };

  /**
   * @param {string} field - Field name on which user clicked toggle switch
   */
  togglePasswordView = (field) => {
    this.setState({ [field]: !this.state[field] });
  };

  validate = (isSubmit) => {
    const { formData } = this.state;
    let isValid;
    let errors;
    if (isSubmit) {
      isValid = true;
      if (!formData.userName) {
        errors = {
          ...errors,
          userName: "Username is required!",
        };
        isValid = false;
      } else {
        errors = { ...errors, userName: "" };
      }

      if (!formData.password) {
        errors = { ...errors, password: "Password is required!" };
        isValid = false;
      } else {
        errors = { ...errors, password: "" };
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

  onClickSubmit = () => {
    this.setState({ isSubmit: true }, () => {
      let { isValid } = this.validate(this.state.isSubmit);
      let { formData } = this.state;

      if (isValid) {
        this.props.disableAuthMFACode(formData);
      }
    });
  };

  updateMfaStatus = () => {
    let { authz, info } = getCurrentUser();
    if (info) {
      if (info.user.isMfaEnable) {
        info.user.isMfaEnable = "NO";
        let userDetails = { authz, info };
        this.user = userDetails;
        setCurrentUser(userDetails);
      }
    }
  };
  render() {
    let { passwordHidden, formData, isSubmit } = this.state;
    const { errors } = this.validate(isSubmit);
    let disableAuthMFAStatus =
      this.props.disableMfaAuth?.status === status.IN_PROGRESS;

    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleDisabledAuthenticationModal}
        className="authDisabled-modal-container"
      >
        <ModalHeader tag="div">
          <Box className="autodisabled-info">
            <Box className="icon">
              <img src={lockImg} alt="" />
            </Box>
          </Box>

          <Box className="heading">
            <span className="d-block">You are about to disable 2FA</span>
          </Box>
        </ModalHeader>
        <ModalBody>
          <Box className="form-group m-b-15">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              type="userName"
              className="form-control"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={this.handleInputChange}
            />
            <span
              className="red"
              style={{ fontSize: "12px", marginTop: "5px" }}
            >
              {isSubmit && errors && errors.userName ? errors.userName : ""}
            </span>
          </Box>
          <Box className="form-group m-b-15">
            <label htmlFor="CurrentPassword" className="form-label">
              Current Password
            </label>
            <input
              type={passwordHidden ? "password" : "text"}
              className="form-control"
              id="currentPassword"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={this.handleInputChange}
            />
            <span
              className="input-group-text"
              onClick={() => this.togglePasswordView("passwordHidden")}
            >
              <i
                className={
                  passwordHidden
                    ? "fa-regular fa-eye-slash"
                    : "fa-sharp fa-regular fa-eye"
                }
              ></i>
            </span>
            <span
              className="red"
              style={{ fontSize: "12px", marginTop: "5px" }}
            >
              {isSubmit && errors && errors.password ? errors.password : ""}
            </span>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box className="d-block text-center submit-btn">
            <LoadingButton
              className="primary-btn  width-75"
              variant="contained"
              disabled={disableAuthMFAStatus}
              loading={disableAuthMFAStatus}
              onClick={this.onClickSubmit}
            >
              Submit
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  const { disableMfaAuth } = state.settings;
  return {
    disableMfaAuth,
  };
};

const mapDispatchToProps = {
  disableAuthMFACode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisabledAuthenticationModal);

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, ListItem } from "@mui/material/";
import { Component } from "react";
import { List, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Carrier from "assets/img/setting/carrier.png";
import OTPInput from "react-otp-input";
import { getMFACode, authMFACode } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { ToastMessage } from "Toast/ToastMessage";
import { getCurrentUser, setCurrentUser } from "Utils";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 18,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 16,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#384CFF",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 8,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 18 / 2,
    opacity: 1,
    backgroundColor: "#B7B7B7",
    boxSizing: "border-box",
  },
}));

class AuthenticationModal extends Component {
  steps = {
    STEP1: 0,
    STEP2: 1,
    STEP3: 2,
    STEP4: 3,
  };
  user = { username: "", email: "", profileImage: "", isMfaEnable: null };
  constructor(props) {
    super(props);
    this.state = {
      activeStep: this.steps.STEP1,
      otp: "",
      formData: {
        userName: "",
        password: "",
      },
      hidePassword: true,
      isSubmit: false,
      mfaImage: "",
      mfaKey: "",
      twoFASwitch: false,
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.MFACode.status !== this.props.MFACode.status &&
      this.props.MFACode.status === status.SUCCESS
    ) {
      if (this.props.MFACode.data.code === 200) {
        this.setState({ activeStep: this.steps.STEP2 });
        this.setState({
          mfaImage: this.props.MFACode.data.object,
          mfaKey: this.props.MFACode.data.mfaKey,
        });
      } else {
        ToastMessage.error(
          this.props.MFACode?.data?.message || "Authentication Failed!"
        );
      }
    }

    if (
      prevProps.mfaAuth.status !== this.props.mfaAuth.status &&
      this.props.mfaAuth.status === status.SUCCESS
    ) {
      if (this.props.mfaAuth.data?.object === true) {
        this.updateMfaStatus();
        this.props.setMFAEnable("YES");
        this.setActiveStep(this.steps.STEP4);
      } else {
        let message = this.props.mfaAuth.data?.message
        console.log(this.props.mfaAuth.data)
        ToastMessage.error(message || "OTP validation failed!");
      }
    }
  };

  setActiveStep = (step) => {
    this.setState({
      activeStep: step,
    });
  };

  setOtp = (otp) => {
    this.setState({ otp: otp });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  validate = (isSubmit) => {
    const { formData } = this.state;
    let isValid;
    let errors;
    if (isSubmit) {
      isValid = true;
      if (!formData.userName) {
        errors = { ...errors, userName: "Email or Username is required!" };
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

  handleUserCredSubmit = () => {
    const { formData } = this.state;
    this.setState({ isSubmit: true }, () => {
      const { isValid } = this.validate(true);
      if (isValid) {
        this.props.getMFACode(formData);
      }
    });
  };

  handleOtpValidate = () => {
    const params = {
      userName: this.state.formData.userName,
      token: this.state.otp,
      mfaKey: this.state.mfaKey,
    };

    this.props.authMFACode(params);
  };

  toggle2FASwitch = (e) => {
    this.setState({ twoFASwitch: e.target.checked });
  };

  updateMfaStatus = () => {
    let { authz, info } = getCurrentUser();
    if (info) {
      if (info.user.isMfaEnable) {
        info.user.isMfaEnable = "YES";
        let userDetails = { authz, info };
        this.user = userDetails;
        setCurrentUser(userDetails);
      }
    }
  };

  render() {
    const {
      activeStep,
      otp,
      formData,
      hidePassword,
      isSubmit,
      mfaImage,
      twoFASwitch,
    } = this.state;
    const { errors } = this.validate(isSubmit);
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleAuthenticationModal}
        className="setting-modal-container"
      >
        {activeStep === this.steps.STEP1 && (
          <>
            <form>
              <ModalHeader tag="div">
                <h5>Two Factor Authentication</h5>
              </ModalHeader>
              <ModalBody>
                <Box className="form-group m-b-15">
                  <label htmlFor="userName" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    value={FormData.userName}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                  <span
                    className="red"
                    style={{ fontSize: "12px", marginTop: "5px" }}
                  >
                    {isSubmit && errors && errors.userName
                      ? errors.userName
                      : ""}
                  </span>
                </Box>
                <Box className="form-group m-b-15">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type={hidePassword ? "password" : "text"}
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                  <span
                    className="input-group-text"
                    onClick={() => {
                      this.setState({ hidePassword: !this.state.hidePassword });
                    }}
                  >
                    <i
                      className={
                        hidePassword
                          ? "fa-regular fa-eye-slash"
                          : "fa-sharp fa-regular fa-eye"
                      }
                    ></i>
                  </span>
                  <span
                    className="red"
                    style={{ fontSize: "12px", marginTop: "5px" }}
                  >
                    {isSubmit && errors && errors.password
                      ? errors.password
                      : ""}
                  </span>
                </Box>
                <h4 className="m-b-0 m-t-4">Two Factor Authentication</h4>
                <p className="m-t-1">
                  Two Factor Authentication is a enchained security measure.
                  Once enabled, you will require two types of identification
                  when you log into AppKube
                </p>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AntSwitch
                    inputProps={{
                      "aria-label": "ant design",
                    }}
                    onChange={this.toggle2FASwitch}
                    value={twoFASwitch}
                  />
                </Stack>
              </ModalBody>
              <ModalFooter className="footer-top-br">
                <Box className="d-block text-center">
                  <LoadingButton
                    className="primary-btn min-width"
                    disabled={
                      this.props.MFACode.status === status.IN_PROGRESS ||
                      !twoFASwitch
                    }
                    loading={this.props.MFACode.status === status.IN_PROGRESS}
                    variant="contained"
                    onClick={this.handleUserCredSubmit}
                  >
                    Next
                  </LoadingButton>
                </Box>
              </ModalFooter>
            </form>
          </>
        )}
        {activeStep === this.steps.STEP2 && (
          <>
            <ModalHeader tag="div" style={{ justifyContent: "center" }}>
              <h5 className="text-center">Two Factor Authentication</h5>
            </ModalHeader>
            <ModalBody>
              <Box className="scanner-image">
                <img src={"data:image/jpeg;base64," + mfaImage} alt="" />
              </Box>
              <List className="list-contents">
                <ListItem>
                  <span>1.</span> Get Authy from the <span>App Store </span>
                  or <span>Play Store</span>
                </ListItem>
                <ListItem>
                  <span>2.</span> In the app, after login or creating your
                  account, select <strong>Set up account</strong>
                </ListItem>
                <ListItem>
                  <span>3.</span> Choose <strong>Scan Barcode</strong>
                </ListItem>
              </List>
            </ModalBody>
            <ModalFooter className="footer-top-br">
              <Box className="d-block text-center">
                <LoadingButton
                  className="primary-outline-btn min-width m-r-3"
                  variant="outlined"
                  onClick={() => {
                    this.props.handleAuthenticationModal();
                  }}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  className="primary-btn min-width"
                  variant="contained"
                  onClick={() => this.setActiveStep(this.steps.STEP3)}
                >
                  Next
                </LoadingButton>
              </Box>
            </ModalFooter>
          </>
        )}
        {activeStep === this.steps.STEP3 && (
          <>
            <ModalHeader tag="div" style={{ justifyContent: "center" }}>
              <h5 className="text-center">Set up Authenticator</h5>
            </ModalHeader>
            <ModalBody>
              <Box className="digit-code">
                <p className="m-b-0 m-t-0">
                  Enter the 6-digit code you see in the app
                </p>
                <Box className="digit-input">
                  <OTPInput
                    value={otp}
                    onChange={this.setOtp}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    inputStyle="form-control"
                    renderInput={(props) => <input {...props} />}
                  />
                </Box>
                <Box className="d-block width-100 text-center">
                  <LoadingButton
                    className="primary-btn min-width"
                    variant="contained"
                    disabled={this.props.mfaAuth.status === status.IN_PROGRESS}
                    loading={this.props.mfaAuth.status === status.IN_PROGRESS}
                    onClick={this.handleOtpValidate}
                  >
                    Validate
                  </LoadingButton>
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter className="footer-top-br">
              <Box className="d-block text-right">
                <LoadingButton
                  className="primary-outline-btn min-width m-r-3"
                  variant="outlined"
                  onClick={() => {
                    this.props.handleAuthenticationModal();
                  }}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  className="secondary-btn min-width"
                  variant="contained"
                  onClick={() => this.setActiveStep(this.steps.STEP2)}
                >
                  Back
                </LoadingButton>
              </Box>
            </ModalFooter>
          </>
        )}
        {activeStep === this.steps.STEP4 && (
          <>
            <ModalBody>
              <Box className="text-center">
                <Box className="scanner-image">
                  <img src={Carrier} alt="" />
                </Box>
                <h3>Done!</h3>
                <p>
                  Two-factor authentication has been set. From now on you will
                  use authy to sign in your AppKube Account
                </p>
              </Box>
            </ModalBody>
          </>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { MFACode, mfaAuth } = state.settings;
  return { MFACode, mfaAuth };
};

const mapDispatchToProps = {
  getMFACode,
  authMFACode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationModal);

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, FormControlLabel, ListItem } from "@mui/material/";
import { Component } from "react";
import { List, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Scanner from "assets/img/setting/scanner.png";
import Carrier from "assets/img/setting/carrier.png";

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

export class AuthenticationModal extends Component {
  steps = {
    STEP1: 0,
    STEP2: 1,
    STEP3: 2,
    STEP4: 3,
  };
  constructor(props) {
    super(props);
    this.state = {
      activeStep: this.steps.STEP1,
    };
  }

  setActiveStep = (step) => {
    this.setState({
      activeStep: step,
    });
  };

  render() {
    const { activeStep } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleAuthenticationModal}
        className="setting-modal-container"
      >
        {activeStep === this.steps.STEP1 && (
          <>
            <ModalHeader tag="div">
              <h5>Two Factor Authentication</h5>
            </ModalHeader>
            <ModalBody>
              <Box className="form-group m-b-15">
                <label for="CurrentPassword" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="CurrentPassword"
                  value={"Admin@synectiks.com"}
                />
              </Box>
              <Box className="form-group m-b-15">
                <label for="NewPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="NewPassword"
                  value={"NewPassword"}
                />
                <span className="input-group-text">
                  <i className="fa-regular fa-eye-slash"></i>
                </span>
              </Box>
              <h4 className="m-b-0 m-t-4">Two Factor Authentication</h4>
              <p className="m-t-1">
                Two Factor Authentication is a enchained security measure. Once
                enabled, you will require two types of identification when you
                log into AppKube
              </p>
              <Stack direction="row" spacing={1} alignItems="center">
                <AntSwitch
                  inputProps={{
                    "aria-label": "ant design",
                  }}
                />
                <Typography>{"Off"}</Typography>
              </Stack>
            </ModalBody>
            <ModalFooter className="footer-top-br">
              <Box className="d-block text-center">
                <LoadingButton
                  className="primary-btn min-width"
                  loadingPosition="start"
                  variant="contained"
                  onClick={() => this.setActiveStep(this.steps.STEP2)}
                >
                  Next
                </LoadingButton>
              </Box>
            </ModalFooter>
          </>
        )}
        {activeStep === this.steps.STEP2 && (
          <>
            <ModalHeader tag="div" style={{ justifyContent: "center" }}>
              <h5 className="text-center">Two Factor Authentication</h5>
            </ModalHeader>
            <ModalBody>
              <Box className="scanner-image">
                <img src={Scanner} alt="" />
              </Box>
              <List className="list-contents">
                <ListItem>
                  <span>1.</span> Get Authy from the <a href="#">App Store</a>{" "}
                  or <a href="#">Play Store</a>
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
                  loadingPosition="start"
                  variant="outlined"
                  onClick={() => {
                    this.props.handleAuthenticationModal();
                  }}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  className="primary-btn min-width"
                  loadingPosition="start"
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
                <Box class="digit-input">
                  <input
                    type="text"
                    id="first"
                    className="form-control"
                    maxlength="1"
                    value={"7"}
                  />
                  <input
                    type="text"
                    id="sec"
                    className="form-control"
                    maxlength="1"
                    value={"2"}
                  />
                  <input
                    type="text"
                    id="third"
                    className="form-control"
                    maxlength="1"
                    value={"1"}
                  />
                  <input
                    type="text"
                    id="fourth"
                    className="form-control"
                    maxlength="1"
                    value={"3"}
                  />
                  <input
                    type="text"
                    id="fifth"
                    className="form-control"
                    maxlength="1"
                    value={"0"}
                  />
                  <input
                    type="text"
                    id="six"
                    className="form-control"
                    maxlength="1"
                    value={"9"}
                  />
                </Box>
                <Box className="d-block width-100 text-center">
                  <LoadingButton
                    className="primary-btn min-width"
                    loadingPosition="start"
                    variant="contained"
                    onClick={() => this.setActiveStep(this.steps.STEP4)}
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
                  loadingPosition="start"
                  variant="outlined"
                  onClick={() => {
                    this.props.handleAuthenticationModal();
                  }}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  className="secondary-btn min-width"
                  loadingPosition="start"
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

export default AuthenticationModal;

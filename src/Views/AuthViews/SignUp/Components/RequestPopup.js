import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { Box, Grid, Button } from "@mui/material";
import RequestPopupImg from "../../../../assets/img/login/request-popup-img.png";
import { connect } from "react-redux";
import { sentEmailToCompanyAdmin } from "Redux/Auth/AuthThunk";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import status from "Redux/Constants/CommonDS";
import { ToastMessage } from "Toast/ToastMessage";
import { AUTH_PREFIX_PATH } from "Configs/AppConfig";
import LoadingButton from "@mui/lab/LoadingButton";
import { REGEX_TYPE } from "CommonData";
class RequestPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isSubmit: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.sentEmailToAdmin.status !== prevProps.sentEmailToAdmin.status
    ) {
      if (this.props.sentEmailToAdmin.status === status.SUCCESS) {
        let sentEmailToAdminResponse = this.props.sentEmailToAdmin.data;

        if (sentEmailToAdminResponse?.code === 201) {
          this.props.navigate(`${AUTH_PREFIX_PATH}/signin`);
          ToastMessage.success("An email has been sent to the company admin.");
        } else {
          ToastMessage.error(sentEmailToAdminResponse.message);
        }
      } else if (this.props.sentEmailToAdmin.status === status.FAILURE) {
        ToastMessage.error(this.props.sentEmailToAdmin?.data?.message);
      }
    }
  };

  // handle email changes
  handleChanges = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // validate email
  validateForm = () => {
    const { email, isSubmit } = this.state;
    let isValid = true;
    let emailRegex = REGEX_TYPE.EMAIL;
    let errors = {
      email: "",
    };
    if (isSubmit) {
      if (!email.trim()) {
        errors.email = "Email is required!";
        isValid = false;
      } else if (!emailRegex.test(email)) {
        errors.email = "Please enter valid email!";
        isValid = false;
      } else {
        errors.email = "";
      }
    }

    return { isValid, errors };
  };

  // Fire click sent request
  onClickSentRequest = () => {
    this.setState({ isSubmit: true }, () => {
      let { isSubmit, email } = this.state;
      const { isValid } = this.validateForm(isSubmit);

      if (isValid) {
        let formData = new FormData();

        try {
          formData.append("organization", this.props.companyName);
          formData.append("email", email);

          this.props.sentEmailToCompanyAdmin(formData);
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  render() {
    const { isSubmit, email } = this.state;
    const { errors } = this.validateForm(isSubmit);
    const { sentEmailToAdmin, showModal } = this.props;
    return (
      <Modal
        isOpen={showModal}
        toggle={this.props.togglePopup}
        className="select-account-modal-container"
      >
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "420px" }}
        >
          <Box className="request-popup-content d-block text-center p-t-10">
            <Box className="popup-image d-block text-center">
              <img src={RequestPopupImg} alt="" />
            </Box>
            <h2>Oh no!</h2>
            <p>
              This company is already registered with another user as the
              administrator. Please contact the current administrator or enter
              their email address below to request access.
            </p>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                alignItems={"center"}
                display={"flex"}
                justifyContent={"center"}
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Box className="input-group m-b-10">
                    <label
                      className="d-block text-left p-l-0 m-b-10"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      placeholder="user@example.com"
                      name="email"
                      onChange={this.handleChanges}
                      value={email}
                    />
                    {errors.email ? (
                      <p className="red m-b-0 m-t-0 p-l-0 p-r-0 text-left">
                        {errors.email}
                      </p>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <Button
              className="danger-btn min-width-inherit  m-r-2"
              variant="contained"
              onClick={this.props.togglePopup}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              onClick={this.onClickSentRequest}
              className="primary-btn min-width-inherit"
              variant="contained"
              disabled={sentEmailToAdmin.status === status.IN_PROGRESS}
              loading={sentEmailToAdmin.status === status.IN_PROGRESS}
              loadingPosition="start"
            >
              Sent Request
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  const { sentEmailToAdmin } = state.auth;
  return {
    sentEmailToAdmin,
  };
}

const mapDispatchToProps = {
  sentEmailToCompanyAdmin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(RequestPopup));

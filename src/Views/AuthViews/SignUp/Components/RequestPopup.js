import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Box, Grid } from "@mui/material";
import RequestPopupImg from "../../../../assets/img/login/request-popup-img.png";

class RequestPopup extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
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
            <Box sx={{ width: "100%"}} >
              <Grid
                container alignItems={"center"} display={"flex"} justifyContent={"center"}
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Box className="input-group m-b-10">
                    <label className="d-block text-left p-l-0 m-b-10" htmlFor="companyName">
                    Email Address
                    </label>
                    <input
                      id="companyName"
                      type="email"
                      className="form-control"
                      placeholder="user@example.com"
                      name="companyName"
                    />
                    
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br p-b-10">
          <Box className="d-block text-center">
            <Button
              className="primary-btn min-width-inherit"
              variant="contained"
              onClick={() => {
                this.props.togglePopup();
              }}
            >
              Sent Request
            </Button>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default RequestPopup;

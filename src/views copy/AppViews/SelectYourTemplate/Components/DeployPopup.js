import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, FormControlLabel } from "@mui/material/";
import Checkbox from "@mui/material/Checkbox";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ApplicationSuccessfullyPopup from "./ApplicationSuccessfullyPopup";

export class DeployPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApplictionPopup: false,
    };
  }

  handleApplictionPopup = () => {
    this.setState({
      showApplictionPopup: !this.state.showApplictionPopup,
    });
  };
  render() {
    const { showApplictionPopup } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container deploy-modal"
      >
        <ModalHeader style={{ borderBottom: "none" }}>
          <h5>Deploy</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => {
              this.props.handleDeployoPopup();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", height: "350px" }}
        >
          <Box className="deploy-modal-contant">
            <Grid container spacing={0}>
              <Grid item xs={6} className="border-right p-l-15 p-r-15">
                <Box className="form-group">
                  <label>Department Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="HRMS"
                  />
                </Box>
                <Box className="form-group">
                  <label>Prodect Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="HR"
                  />
                </Box>
                <Box className="checkbox-group form-group">
                  <label>Services</label>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    <Grid item xs={6}>
                      <FormControlLabel
                        className="service-check-box m-b-0 m-r-0 d-flex
                  align-items-center"
                        control={<Checkbox size="small" />}
                        label="Development"
                      />
                      <FormControlLabel
                        className="service-check-box m-b-0 m-r-0 d-flex
                        align-items-center"
                        control={<Checkbox size="small" />}
                        label="Test"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        className="service-check-box m-b-0 m-r-0 d-flex
                        align-items-center"
                        control={<Checkbox size="small" />}
                        label=" Stage"
                      />
                      <FormControlLabel
                        className="service-check-box m-b-0 m-r-0 d-flex
                        align-items-center"
                        control={<Checkbox size="small" />}
                        label="Production"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={6} className="p-l-15 p-r-15">
                <Box className="form-group">
                  <label>Select AWS Account</label>
                  <select name="number" id="number" className="form-control">
                    <option value="1234546547654">1234546547654</option>
                    <option value="1234546547655">1234546547655</option>
                    <option value="1234546547656">1234546547656</option>
                    <option value="1234546547657">1234546547657</option>
                  </select>
                </Box>
                <Box className="form-group">
                  <label>Select AWS Account</label>
                  <select name="number" id="number" className="form-control">
                    <option value="1234546547654">1234546547654</option>
                    <option value="1234546547655">1234546547655</option>
                    <option value="1234546547656">1234546547656</option>
                    <option value="1234546547657">1234546547657</option>
                  </select>
                </Box>
                <Box className="form-group">
                  <label>Git repository URL</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter url"
                  />
                </Box>
                <Box className="form-group">
                  <label>Custom URL</label>
                  <Box className="d-flex">
                    <input
                      className="custom-url"
                      type="text"
                      placeholder=""
                      style={{ width: 160 }}
                    />
                    <p>.appkube.com</p>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <LoadingButton
              className="secondary-btn m-r-2"
              variant="contained"
              onClick={() => {
                this.props.handleDeployoPopup();
              }}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              onClick={() => {
                this.props.handleDeployoPopup();
              }}
              className="primary-btn min-width"
              loadingPosition="start"
              variant="contained"
            >
              Create
            </LoadingButton>
          </Box>
          {showApplictionPopup ? (
            <ApplicationSuccessfullyPopup
              showModal={ApplicationSuccessfullyPopup}
              handleApplictionPopup={this.handleApplictionPopup}
            />
          ) : (
            <></>
          )}
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeployPopup;

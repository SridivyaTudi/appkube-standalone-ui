import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton, Button, ListItem, Grid, Card } from "@mui/material/";
import { Component } from "react";
import { List, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import Aws from "assets/img/aws.png";
import { v4 } from "uuid";

class SelectLendingZonePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //  Reset state and close modal
  handleCloseModal = () => {
    this.props.handleShowSelectLendingModal();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="select-lendingzone-modal-container "
      >
        <ModalHeader tag="div">
          <h5>
            Select Lending Zone
            <IconButton
              onClick={this.handleCloseModal}
              variant="outlined"
              aria-label="delete"
              size="small"
              className="close-btn"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </h5>
        </ModalHeader>

        <ModalBody>
          <Box className="select-landing-cards">
            <Grid
              container
              rowSpacing={1.5}
              columnSpacing={{ xs: 1.5 }}
              alignItems={"center"}
              className="p-b-10"
            >
              <Grid item xl={4} lg={4} md={4} xs={6}>
                <Card className="select-landing-card">
                  <Box className="card-content text-center">
                    <Box className="card-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="card-title">Landing-Zone :</Box>
                  </Box>
                  <Box className="card-footer">
                    <Box className="footer-left-content">
                      <span className="d-block">new department with lz</span>
                      <label className="d-block">102 </label>
                    </Box>
                    <Box className="footer-right-content">
                      <span className="d-block text-right">Assets</span>
                      <label className="d-block text-right">0</label>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={6}>
                <Card className="select-landing-card">
                  <Box className="card-content text-center">
                    <Box className="card-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="card-title">Landing-Zone :</Box>
                  </Box>
                  <Box className="card-footer">
                    <Box className="footer-left-content">
                      <span className="d-block">new department with lz</span>
                      <label className="d-block">102 </label>
                    </Box>
                    <Box className="footer-right-content">
                      <span className="d-block text-right">Assets</span>
                      <label className="d-block text-right">0</label>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={6}>
                <Card className="select-landing-card">
                  <Box className="card-content text-center">
                    <Box className="card-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="card-title">Landing-Zone :</Box>
                  </Box>
                  <Box className="card-footer">
                    <Box className="footer-left-content">
                      <span className="d-block">new department with lz</span>
                      <label className="d-block">102 </label>
                    </Box>
                    <Box className="footer-right-content">
                      <span className="d-block text-right">Assets</span>
                      <label className="d-block text-right">0</label>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={6}>
                <Card className="select-landing-card">
                  <Box className="card-content text-center">
                    <Box className="card-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="card-title">Landing-Zone :</Box>
                  </Box>
                  <Box className="card-footer">
                    <Box className="footer-left-content">
                      <span className="d-block">new department with lz</span>
                      <label className="d-block">102 </label>
                    </Box>
                    <Box className="footer-right-content">
                      <span className="d-block text-right">Assets</span>
                      <label className="d-block text-right">0</label>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={6}>
                <Card className="select-landing-card">
                  <Box className="card-content text-center">
                    <Box className="card-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="card-title">Landing-Zone :</Box>
                  </Box>
                  <Box className="card-footer">
                    <Box className="footer-left-content">
                      <span className="d-block">new department with lz</span>
                      <label className="d-block">102 </label>
                    </Box>
                    <Box className="footer-right-content">
                      <span className="d-block text-right">Assets</span>
                      <label className="d-block text-right">0</label>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={6}>
                <Card className="select-landing-card">
                  <Box className="card-content text-center">
                    <Box className="card-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="card-title">Landing-Zone :</Box>
                  </Box>
                  <Box className="card-footer">
                    <Box className="footer-left-content">
                      <span className="d-block">new department with lz</span>
                      <label className="d-block">102 </label>
                    </Box>
                    <Box className="footer-right-content">
                      <span className="d-block text-right">Assets</span>
                      <label className="d-block text-right">0</label>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={6}>
                <Card className="select-landing-card">
                  <Box className="card-content text-center">
                    <Box className="card-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="card-title">Landing-Zone :</Box>
                  </Box>
                  <Box className="card-footer">
                    <Box className="footer-left-content">
                      <span className="d-block">new department with lz</span>
                      <label className="d-block">102 </label>
                    </Box>
                    <Box className="footer-right-content">
                      <span className="d-block text-right">Assets</span>
                      <label className="d-block text-right">0</label>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={6}>
                <Card className="select-landing-card">
                  <Box className="card-content text-center">
                    <Box className="card-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="card-title">Landing-Zone :</Box>
                  </Box>
                  <Box className="card-footer">
                    <Box className="footer-left-content">
                      <span className="d-block">new department with lz</span>
                      <label className="d-block">102 </label>
                    </Box>
                    <Box className="footer-right-content">
                      <span className="d-block text-right">Assets</span>
                      <label className="d-block text-right">0</label>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={6}>
                <Card className="select-landing-card">
                  <Box className="card-content text-center">
                    <Box className="card-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="card-title">Landing-Zone :</Box>
                  </Box>
                  <Box className="card-footer">
                    <Box className="footer-left-content">
                      <span className="d-block">new department with lz</span>
                      <label className="d-block">102 </label>
                    </Box>
                    <Box className="footer-right-content">
                      <span className="d-block text-right">Assets</span>
                      <label className="d-block text-right">0</label>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </ModalBody>
        <ModalFooter className=" m-t-3 p-0">
          <Box className="d-block text-right">
            <Button
              className="danger-btn min-width-inherit m-r-2"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              className="primary-btn min-width-inherit "
              variant="contained"
              onClick={this.handleCloseModal}
            >
              Select
            </Button>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SelectLendingZonePopup;

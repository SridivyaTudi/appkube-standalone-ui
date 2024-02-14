import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, List, ListItem } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
class AssetsMainFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddNewEnvironmentShown: false,
    };
  }

  toggleAddNewEnvironmentMenu = () => {
    this.setState({
      isAddNewEnvironmentShown: !this.state.isAddNewEnvironmentShown,
    });
  };

  renderAddNewEnvironmentList = () => {
    return (
      <>
        <ListItem>
          <p>Amazon Web Services</p>
        </ListItem>
        <ListItem>
          <p>Azure Cloud</p>
        </ListItem>
        <ListItem>
          <p>Google Cloud Platform</p>
        </ListItem>
        <ListItem>
          <p>Kubernetes</p>
        </ListItem>
      </>
    );
  };
  render() {
    const {
      isRecentVisitedEnvMenuOpen,
      isAddNewEnvironmentShown,
      searchedKey,
      showFilterPopup,
      filters,
    } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleAssetsMainFilterModal}
        className="assets-fillter-modal-container"
      >
        <ModalBody>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Region
                      <i className="fa-solid fa-caret-down arrow-icon"></i>
                    </Box>
                    <Box
                      className={
                        isAddNewEnvironmentShown
                          ? "fliter-collapse active"
                          : "fliter-collapse"
                      }
                    >
                      <List>{this.renderAddNewEnvironmentList()}</List>
                    </Box>
                  </>

                  <div
                    className={
                      isAddNewEnvironmentShown
                        ? "fliters-collapse-bg active"
                        : "fliters-collapse-bg"
                    }
                    onClick={this.toggleAddNewEnvironmentMenu}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br m-t-3">
          <Box className="d-block text-center">
            <LoadingButton
              className="danger-btn min-width-inherit m-r-2"
              variant="contained"
              onClick={this.props.handleAssetsMainFilterModal}
            >
              Clear
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width-inherit "
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AssetsMainFilterModal;

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Grid,
  List,
  ListItem,
  Checkbox,
  IconButton,
} from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
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
          <Checkbox
            className="check-box"
            size="small"
            onChange={(e) => {
              // this.handleCheckBox(e);
            }}
          />
          <p>China (Hong Kong)</p>
        </ListItem>
        <ListItem>
          <Checkbox
            className="check-box"
            size="small"
            onChange={(e) => {
              // this.handleCheckBox(e);
            }}
          />
          <p>East US</p>
        </ListItem>
        <ListItem>
          <Checkbox
            className="check-box"
            size="small"
            onChange={(e) => {
              // this.handleCheckBox(e);
            }}
          />
          <p>East US 2</p>
        </ListItem>
        <ListItem>
          <Checkbox
            className="check-box"
            size="small"
            onChange={(e) => {
              // this.handleCheckBox(e);
            }}
          />
          <p>France Central</p>
        </ListItem>
        <ListItem>
          <Checkbox
            className="check-box"
            size="small"
            onChange={(e) => {
              // this.handleCheckBox(e);
            }}
          />
          <p>Germany West Central</p>
        </ListItem>
        <ListItem>
          <Checkbox
            className="check-box"
            size="small"
            onChange={(e) => {
              // this.handleCheckBox(e);
            }}
          />
          <p>India (Mumbai)</p>
        </ListItem>
        <ListItem>
          <Checkbox
            className="check-box"
            size="small"
            onChange={(e) => {
              // this.handleCheckBox(e);
            }}
          />
          <p>Indonesia ( Jakarta)</p>
        </ListItem>
      </>
    );
  };
  render() {
    const { isAddNewEnvironmentShown } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.togglePopup}
        className="assets-fillter-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            Log Setup for 95dse45ss{" "}
            <IconButton
              onClick={this.props.togglePopup}
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
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      AWS Account
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Product Enclave
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Element Type
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      App / Data
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Resource Type
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Node
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Namespace
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Tags
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Resource State
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Data Source
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              <Grid item lg={4} md={3} xs={12}>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Service
                      <i class="fas fa-angle-down arrow-icon"></i>
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
              onClick={this.props.togglePopup}
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

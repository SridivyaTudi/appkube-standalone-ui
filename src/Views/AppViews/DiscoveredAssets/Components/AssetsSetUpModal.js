import LoadingButton from "@mui/lab/LoadingButton";
import { Box, List, ListItem, IconButton } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import AssetsSetUpSuccessModal from "./AssetsSetUpSuccessModal";
class AssetsSetUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAssetsSetUpSuccessModal: false,
    };
  }

  toggleAssetsSetUpSuccess = () => {
    this.setState({
      showAssetsSetUpSuccessModal: !this.state.showAssetsSetUpSuccessModal,
    });
  };
  render() {
    const { showAssetsSetUpSuccessModal } = this.state;
    return (
      <>
        {showAssetsSetUpSuccessModal ? (
          <AssetsSetUpSuccessModal
            showModal={showAssetsSetUpSuccessModal}
            toggleAssetsSetUpSuccess={() => {
              this.toggleAssetsSetUpSuccess();
              this.props.toggleAssetsSetUp();
            }}
          />
        ) : (
          <Modal
            isOpen={this.props.showModal}
            toggle={this.props.toggleAssetsSetUp}
            className="assets-setup-modal-container"
          >
            <ModalHeader tag="div">
              <h5>
                {" "}
                <i class="fas fa-cog m-r-1"></i> Log Setup for 95dse45ss
              </h5>
              <IconButton
                onClick={this.props.toggleAssetsSetUp}
                variant="outlined"
                aria-label="delete"
                size="small"
                className="close-btn"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </ModalHeader>
            <ModalBody>
              <List>
                <ListItem>Cloudwatch Agent will be installed</ListItem>
                <ListItem>IAM Role setup</ListItem>
                <ListItem>
                  Cloudwatch agent server policy to cloudwatch log group
                </ListItem>
                <ListItem>Port 22,443 will be enabled</ListItem>
              </List>
            </ModalBody>
            <ModalFooter className="footer-top-br m-t-3">
              <Box className="d-block text-center">
                <LoadingButton
                  onClick={this.toggleAssetsSetUpSuccess}
                  className="primary-btn min-width-inherit "
                  variant="contained"
                >
                  Set Up
                </LoadingButton>
              </Box>
            </ModalFooter>
          </Modal>
        )}
      </>
    );
  }
}

export default AssetsSetUpModal;

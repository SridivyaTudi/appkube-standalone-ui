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
class AssetsSetUpSuccessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.toggleAssetsSetUpSuccess}
        className="assets-setup-modal-container"
      >
        <ModalHeader tag="div">
          <h5> Success</h5>
          <IconButton
            onClick={this.props.toggleAssetsSetUpSuccess}
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
            <ListItem>Log Group Name : cwagentlogssgz</ListItem>
            <ListItem>Log stream (Instance ID) : i-080601388ff78c3d</ListItem>
          </List>
        </ModalBody>
        <ModalFooter className="footer-top-br m-t-3">
          <Box className="d-block text-center">
            <LoadingButton
              className="primary-btn min-width-inherit "
              variant="contained"
              onClick={this.props.toggleAssetsSetUpSuccess}
            >
              Done
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AssetsSetUpSuccessModal;

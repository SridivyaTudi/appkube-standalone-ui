import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class AddPermitionControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleAddPermitionControlModal}
        className="setting-modal-container permissions-modal"
      >
        <ModalHeader tag="div">
         
        </ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-right">
            <LoadingButton
              className="primary-outline-btn min-width m-r-2"
              variant="outlined"
              onClick={this.props.handleAddPermitionControlModal}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width"
              variant="contained"
              onClick={this.props.handleAddPermitionControlModal}
            >
              Create
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddPermitionControlModal;

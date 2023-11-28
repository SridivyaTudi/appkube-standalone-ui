import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

class CreateAddPolicyControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleCreateAddPolicyControlModal}
        className="add-policy-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            Choose Policy
            <button onClick={this.props.handleCreateAddPolicyControlModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </h5>
        </ModalHeader>
        <ModalBody>
          <Box className="top-search">
            <input
              type="text"
              className="form-control"
              placeholder="Search policy"
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-right">
            <LoadingButton
              className="primary-btn min-width"
              variant="contained"
              onClick={this.props.handleCreateAddPolicyControlModal}
            >
              Send Invitation
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateAddPolicyControlModal;

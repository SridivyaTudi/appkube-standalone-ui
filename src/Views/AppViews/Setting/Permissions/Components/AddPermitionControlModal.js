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
        className="setting-modal-container add-permition-modal"
      >
        <ModalHeader tag="div">
          <h5>Environment</h5>
          <Box className="d-inline-block">
            <input type="checkbox" />
          </Box>
        </ModalHeader>
        <ModalBody>
          <h5>List of Environment Permissions</h5>
          <Box className="form-group">
            <label htmlFor="createLanding" className="form-label">
              Create Landing Zone
            </label>
            <input type="checkbox" id="createLanding" />
          </Box>
          <Box className="form-group">
            <label htmlFor="deleteLanding" className="form-label">
              Delete Landing Zone
            </label>
            <input type="checkbox" id="deleteLanding" />
          </Box>
          <Box className="form-group">
            <label htmlFor="editLanding" className="form-label">
              Edit Landing Zone
            </label>
            <input type="checkbox" id="editLanding" />
          </Box>
          <Box className="form-group">
            <label htmlFor="createProduct" className="form-label">
              Create Product Enclave
            </label>
            <input type="checkbox" id="createProduct" />
          </Box>
          <Box className="form-group">
            <label htmlFor="replicateLanding" className="form-label">
              Replicate Landing Zone
            </label>
            <input type="checkbox" id="replicateLanding" />
          </Box>
          <Box className="form-group">
            <label htmlFor="clone" className="form-label">
              Clone Landing Zone
            </label>
            <input type="checkbox" id="clone" />
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <LoadingButton
              className="primary-btn min-width"
              variant="contained"
              onClick={this.props.handleAddPermitionControlModal}
            >
              Add Permission
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddPermitionControlModal;

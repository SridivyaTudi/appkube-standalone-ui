import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";

class CloudElementInstancePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //  Reset state and close modal
  handleCloseModal = () => {
    this.props.handleShowInstanceModal();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="setting-modal-container permissions-modal"
      >
        <ModalHeader tag="div">
          <h5>
            Service Details
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
          {this.props.data?.length ? (
            this.props.data.map((details) => {
              return (
                <Box className={`service-card `} key={v4()}>
                  <Box>
                    <label>
                      {details.label} - {details.value}
                    </label>
                  </Box>
                </Box>
              );
            })
          ) : (
            <></>
          )}
        </ModalBody>
      </Modal>
    );
  }
}

export default CloudElementInstancePopup;

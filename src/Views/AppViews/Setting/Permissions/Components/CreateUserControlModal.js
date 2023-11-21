import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DeleteIcon from "../../../../../assets/img/setting/delete-icon.png";

class CreateUserControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleCreateUserControlModal}
        className="invite-user-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            Invite Users
            <button onClick={this.props.handleCreateUserControlModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </h5>
        </ModalHeader>
        <ModalBody>
          <Box className="users-content">
            <Box className="title">
              <label className="form-label">Email Address</label>
              <label className="form-label">Name (Optional)</label>
            </Box>

            <Box className="form-group">
              <Box className="d-inline-block">
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="roleName"
                  placeholder="user@example.com"
                />
              </Box>
              <Box className="d-inline-block">
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="roleName"
                  placeholder="user"
                />
              </Box>
              <Box className="d-inline-block delete-icon">
                <img src={DeleteIcon} alt="" />
              </Box>
            </Box>
            <Box className="form-group">
              <Box className="d-inline-block">
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="roleName"
                  placeholder="user@example.com"
                />
              </Box>
              <Box className="d-inline-block">
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="roleName"
                  placeholder="user"
                />
              </Box>
              <Box className="d-inline-block delete-icon">
                <img src={DeleteIcon} alt="" />
              </Box>
            </Box>
            <Box className="form-group">
              <Box className="d-inline-block">
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="roleName"
                  placeholder="user@example.com"
                />
              </Box>
              <Box className="d-inline-block">
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="roleName"
                  placeholder="user"
                />
              </Box>
              <Box className="d-inline-block delete-icon">
                <img src={DeleteIcon} alt="" />
              </Box>
            </Box>
            <Box className="form-group">
              <Box className="d-inline-block">
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="roleName"
                  placeholder="user@example.com"
                />
              </Box>
              <Box className="d-inline-block">
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="roleName"
                  placeholder="user"
                />
              </Box>
              <Box className="d-inline-block delete-icon">
                <img src={DeleteIcon} alt="" />
              </Box>
            </Box>
            <Box className="add-user">
              <IconButton className="add-icon">
                <i class="fa-sharp fa-solid fa-plus"></i>
              </IconButton>
              Add Another person
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-right">
            <LoadingButton
              className="primary-btn min-width"
              variant="contained"
              onClick={this.props.handleCreateUserControlModal}
            >
              Send Invitation
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateUserControlModal;

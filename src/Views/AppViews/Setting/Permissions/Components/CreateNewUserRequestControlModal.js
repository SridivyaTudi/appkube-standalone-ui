import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import {
  Box,
  IconButton,
  List,
  ListItem,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

class CreateNewUserRequestControlModal extends Component {
  handleCloseModal = () => {
    this.setState({
      name: "",
      description: "",
      isSubmit: false,
      selectedPolicy: [],
    });
    this.props.handleCreateNewUserRequestControlModal();
  };
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="new-user-request-modal-container"
      >
        <ModalHeader tag="div">
          <h5 className="d-block">User Request (02)</h5>
          <IconButton
            onClick={this.handleCloseModal}
            variant="outlined"
            aria-label="delete"
            size="small"
            className="close-btn"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </ModalHeader>
        <ModalBody>
          <Box className="user-list">
            <List>
              <ListItem>
                <Box className="d-flex align-items-center  user-details">
                  <span>S</span>
                  <Box className="user-mail">
                    <strong>Satyapatak@gmail.com </strong> Want to access
                  </Box>
                </Box>
                <Box className="user-buttons">
                  <Button className="danger-outline-btn  min-width m-r-3">
                    Deny
                  </Button>
                  <Button className="primary-btn min-width">Approve</Button>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="d-flex align-items-center  user-details">
                  <span>A</span>
                  <Box className="user-mail">
                    <strong>Ahmed@gmail.com </strong> Want to access
                  </Box>
                </Box>
                <Box className="user-buttons">
                  <Button className="danger-outline-btn  min-width m-r-3">
                    Deny
                  </Button>
                  <Button className="primary-btn min-width">Approve</Button>
                </Box>
              </ListItem>
            </List>
          </Box>
          <h4 className="m-t-0">Recently Added Users</h4>
          <TableContainer className="new-user-request-table">
            <Table sx={{ minWidth: 500 }} className="table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Group Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <span className="d-inline-block">Y</span>
                    Yahiyaalikhan@synectiks.com
                  </TableCell>
                  <TableCell>DevSecOps</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="d-inline-block">G</span>
                    Ghousemohammed@synectiks.com
                  </TableCell>
                  <TableCell>DevSecOps</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="d-inline-block">U</span>
                    Uttam@synectiks.com
                  </TableCell>
                  <TableCell>DevSecOps</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="d-inline-block">A</span>
                    Amarnath@synectiks.com
                  </TableCell>
                  <TableCell>DevSecOps</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="d-inline-block">M</span>
                    Masoodkhan@synectiks.com
                  </TableCell>
                  <TableCell>DevSecOps</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="d-inline-block">A</span>
                    Ahmed@gmail.com
                  </TableCell>
                  <TableCell>DevSecOps</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="d-inline-block">j</span>
                    Jamesherry@synectiks.com
                  </TableCell>
                  <TableCell>DevSecOps</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="d-inline-block">Y</span>
                    Yahiyaalikhan@synectiks.com
                  </TableCell>
                  <TableCell>DevSecOps</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateNewUserRequestControlModal;

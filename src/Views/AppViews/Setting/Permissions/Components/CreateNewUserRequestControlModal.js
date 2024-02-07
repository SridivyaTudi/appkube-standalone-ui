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
import { v4 } from "uuid";

let users = [
  {
    email: "Yahiyaalikhan@synectiks.com",
    role: "DevSecOps",
  },
  {
    email: "Ghousemohammed@synectiks.com",
    role: "DevSecOps",
  },
  {
    email: "Uttam@synectiks.com",
    role: "DevSecOps",
  },
  {
    email: "Amarnath@synectiks.com",
    role: "DevSecOps",
  },

  {
    email: "Masoodkhan@synectiks.com",
    role: "DevSecOps",
  },
  {
    email: "Ahmed@gmail.com",
    role: "DevSecOps",
  },
  {
    email: "Jamesherry@synectiks.com",
    role: "DevSecOps",
  },
  {
    email: "Yahiyaalikhan@synectiks.com",
    role: "DevSecOps",
  },
];

let requestUsersData = [
  {
    email: "Satyapatak@gmail.com",
    role: "DevSecOps",
  },
  {
    email: "Ahmed@gmail.com",
    role: "DevSecOps",
  },
];

class CreateNewUserRequestControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestUsers: requestUsersData,
      addedUser: users,
    };
  }
  handleCloseModal = () => {
    this.setState({
      name: "",
      description: "",
      isSubmit: false,
      selectedPolicy: [],
    });
    this.props.handleCreateNewUserRequestControlModal();
  };

  // Render head of table
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Group Name</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { addedUser } = this.state;
    return (
      <TableBody>
        {addedUser?.length ? (
          addedUser.map((row, index) => (
            <TableRow key={v4()}>
              <TableCell>
                <span className="d-inline-block">
                  {row.email?.charAt(0).toUpperCase()}
                </span>
                {row.email}
              </TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow key={v4()}>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">There are no data available.</h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  // Request user list
  renderRequestUsers = () => {
    const { requestUsers } = this.state;
    return (
      <List>
        {requestUsers.length ? (
          requestUsers.map((user) => {
            return (
              <ListItem key={v4()}>
                <Box className="d-flex align-items-center  user-details">
                  <span>{user.email?.charAt(0).toUpperCase()}</span>
                  <Box className="user-mail">
                    <strong>{user.email} </strong> Want to access
                  </Box>
                </Box>
                <Box className="user-buttons">
                  <Button className="danger-outline-btn  min-width m-r-3">
                    Deny
                  </Button>
                  <Button className="primary-btn min-width">Approve</Button>
                </Box>
              </ListItem>
            );
          })
        ) : (
          <></>
        )}
      </List>
    );
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
          <Box className="user-list">{this.renderRequestUsers()}</Box>
          <h4 className="m-t-0">Recently Added Users</h4>
          <TableContainer className="new-user-request-table">
            <Table sx={{ minWidth: 500 }} className="table">
              {this.renderTableHead()}
              {this.renderTableBody()}
            </Table>
          </TableContainer>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateNewUserRequestControlModal;

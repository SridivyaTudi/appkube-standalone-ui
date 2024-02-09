import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  IconButton,
  List,
  ListItem,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import {
  getPendingUserRequests,
  pendingUserRequestAction,
  getConfirmedUserRequest,
  getPendingUserCount,
} from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { getCurrentUser } from "Utils";
import { ToastMessage } from "Toast/ToastMessage";

class CreateNewUserRequestControlModal extends Component {
  user = { username: "", email: "", profileImage: "", organization: {} };
  ACTION_STATUS = {
    APPROVE: "approve",
    DENY: "deny",
  };
  constructor(props) {
    super(props);
    this.state = {
      requestUsers: [],
      confirmedUsers: [],
      userActionStatus: {
        ownerId: 0,
        status: "",
        userName: "",
      },
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.getUsersData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.pendingUserRequests.status !==
      prevProps.pendingUserRequests.status
    ) {
      if (this.props.pendingUserRequests.status === status.SUCCESS) {
        if (this.props.pendingUserRequests?.data) {
          let requestUsers =
            this.props.pendingUserRequests?.data?.pendingUsers || [];

          this.setState({ requestUsers });
        }
      }
    }

    if (
      this.props.confirmedUserRequest.status !==
      prevProps.confirmedUserRequest.status
    ) {
      if (this.props.confirmedUserRequest.status === status.SUCCESS) {
        if (this.props.confirmedUserRequest?.data) {
          let confirmedUsers =
            this.props.confirmedUserRequest?.data?.confirmedUsers || [];
          this.setState({ confirmedUsers });
        }
      }
    }

    if (
      this.props.pendingUserReqAction.status !==
      prevProps.pendingUserReqAction.status
    ) {
      if (this.props.pendingUserReqAction.status === status.SUCCESS) {
        let response = this.props.pendingUserReqAction?.data;
        if (response?.code === 200) {
          this.getUsersData();
          const orgId = this.getCurrentOrgId();
          if (orgId) {
            this.props.getPendingUserCount(orgId);
          }

          this.setState({
            userActionStatus: {
              ownerId: 0,
              status: "",
              userName: "",
            },
          });
          ToastMessage.success(response?.message);
        } else {
          ToastMessage.error(response?.message || "User request action failed");
        }
      }
    }
  };

  getUsersData = () => {
    const orgId = this.getCurrentOrgId();
    if (orgId) {
      this.props.getPendingUserRequests(orgId);
      this.props.getConfirmedUserRequest(orgId);
    }
  };

  getCurrentOrgId = () => this.user.organization?.id;

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
    const { confirmedUsers } = this.state;
    const confirmedUserStatus =
      this.props.confirmedUserRequest?.status === status.IN_PROGRESS;
    if (confirmedUserStatus) {
      return this.renderLoder();
    } else {
      return (
        <TableBody>
          {confirmedUsers?.length ? (
            confirmedUsers.map((row, index) => (
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
            <Box className="d-block text-center w-100 h-100 m-r-auto m-l-auto p-t-20 p-b-20 ">
              <h5>There are no data available.</h5>
            </Box>
          )}
        </TableBody>
      );
    }
  };

  // Request user list
  renderRequestUsers = () => {
    const { requestUsers } = this.state;
    let { pendingUserRequests } = this.props;
    let userListStatus = pendingUserRequests.status;
    const { APPROVE, DENY } = this.ACTION_STATUS;
    if (userListStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return (
        <List>
          {requestUsers.length ? (
            requestUsers.map((user, index) => {
              let { isApprove, isDeny } = this.isLoadingAction(user.id);
              return (
                <ListItem key={v4()}>
                  <Box className="d-flex align-items-center  user-details">
                    <span>{user.username?.charAt(0).toUpperCase()}</span>
                    <Box className="user-mail">
                      <strong>{user.username} </strong> want to access
                    </Box>
                  </Box>
                  <Box className="user-buttons">
                    <LoadingButton
                      className="danger-outline-btn  min-width m-r-3"
                      disabled={isDeny}
                      loading={isDeny}
                      onClick={(e) => {
                        this.onClickApproveOrRejectBtn(e, {
                          ownerId: user.id,
                          status: DENY,
                          userName: user.username,
                        });
                      }}
                    >
                      Deny
                    </LoadingButton>

                    <LoadingButton
                      className="primary-btn min-width"
                      disabled={isApprove}
                      loading={isApprove}
                      onClick={(e) =>
                        this.onClickApproveOrRejectBtn(e, {
                          ownerId: user.id,
                          status: APPROVE,
                          userName: user.username,
                        })
                      }
                    >
                      Approve
                    </LoadingButton>
                  </Box>
                </ListItem>
              );
            })
          ) : (
            <Box className="d-block text-center w-100 h-100 m-r-auto m-l-auto p-t-20 p-b-20 ">
              <h5>There are no data available.</h5>
            </Box>
          )}
        </List>
      );
    }
  };

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-block text-center w-100 h-100 m-r-auto m-l-auto ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  onClickApproveOrRejectBtn = (e, userActionStatus) => {
    e.preventDefault();
    this.setState({ userActionStatus }, () => {
      this.props.pendingUserRequestAction(userActionStatus);
    });
  };

  isLoadingAction = (currentId) => {
    let { userActionStatus: U_A_S } = this.state;
    const { APPROVE, DENY } = this.ACTION_STATUS;
    let { pendingUserReqAction: P_U_R_A } = this.props;
    let currentStatus = P_U_R_A?.status === status.IN_PROGRESS;

    let isApprove =
      currentStatus && U_A_S.status === APPROVE && U_A_S.ownerId === currentId;
    let isDeny =
      currentStatus && U_A_S.status === DENY && U_A_S.ownerId === currentId;

    return {
      isApprove,
      isDeny,
    };
  };
  render() {
    let { requestUsers } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="new-user-request-modal-container"
      >
        <ModalHeader tag="div">
          <h5 className="d-block">User Request ({requestUsers.length})</h5>
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
const mapStateToProps = (state) => {
  const { pendingUserRequests, pendingUserReqAction, confirmedUserRequest } =
    state.settings;
  return {
    pendingUserRequests,
    pendingUserReqAction,
    confirmedUserRequest,
  };
};

const mapDispatchToProps = {
  getPendingUserRequests,
  pendingUserRequestAction,
  getConfirmedUserRequest,
  getPendingUserCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewUserRequestControlModal);

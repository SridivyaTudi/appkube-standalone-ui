import React, { Component } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  Button,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import NoteIcon from "assets/img/setting/note-icon.png";
import AuthenticationModal from "Views/AppViews/Setting/Account/Components/AuthenticationModal";
import status from "Redux/Constants/CommonDS";
import { getFormattedDate } from "Utils";
import { connect } from "react-redux";

export class SecurityCredentials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuthenticationModal: false,
      userDetails: {},
    };
  }

  componentDidMount = () => {
    this.setRowsStateOrReturn();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.userDetailsById.status !== prevProps.userDetailsById.status
    ) {
      if (this.props.userDetailsById.status === status.SUCCESS) {
        this.setRowsStateOrReturn();
      }
    }
  };

  setRowsStateOrReturn = (isStateSet = 1) => {
    let userDetails = this.props.userDetailsById.data || {};
    if (userDetails) {
      if (isStateSet) {
        this.setState({ userDetails });
      } else {
        return userDetails;
      }
    }
  };
  handleAuthenticationModal = () => {
    this.setState({
      showAuthenticationModal: !this.state.showAuthenticationModal,
    });
  };

  render() {
    const { showAuthenticationModal, userDetails } = this.state;

    return (
      <Box className="credentials-content">
        <Box className="credentials-box">
          <Box className="head">
            <h4>Appkube Sign in</h4>
          </Box>
          <Box className="credentials-details">
            <label>Password Update</label>
            <span>
              {userDetails.updatedAt
                ? getFormattedDate(userDetails.updatedAt)
                : "-"}
            </span>
            <label>Last Sign in</label>
            <p>
              {userDetails.lastLoginAt
                ? getFormattedDate(userDetails.lastLoginAt)
                : "-"}
            </p>
          </Box>
        </Box>
        <Box className="multi-authentication-section">
          <Box className="setting-common-searchbar">
            <Grid container alignItems={"center"}>
              <Grid item xs={6}>
                <h4 className="m-t-0 m-b-0">Multi-factor authentication</h4>
              </Grid>
              <Grid item xs={6}>
                <List>
                  <ListItem>
                    <Button
                      className="danger-btn min-width-inherit"
                      variant="contained"
                    >
                      Remove
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      className="primary-btn min-width-inherit"
                      variant="contained"
                      onClick={this.handleAuthenticationModal}
                    >
                      Setup MFA
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
          <Box className="environment-table-section">
            <TableContainer className="table">
              <Table className="overview">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">MFA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      <Box className="billing-section">
                        <Box className="billing-details">
                          <Box className="d-flex align-items-center">
                            <Box className="note-icon">
                              <img src={NoteIcon} alt="" />
                            </Box>
                            <span>Please Authenticate.</span>
                          </Box>
                          <Box className="close-icon">
                            <i className="fas fa-times"></i>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        {showAuthenticationModal ? (
          <AuthenticationModal
            showModal={showAuthenticationModal}
            handleAuthenticationModal={this.handleAuthenticationModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { userDetailsById } = state.settings;
  return { userDetailsById };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecurityCredentials);

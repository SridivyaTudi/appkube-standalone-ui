import React, { Component } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import NoteIcon from "assets/img/setting/note-icon.png";
import AuthenticationModal from "Views/AppViews/Setting/Account/Components/AuthenticationModal";

export class SecurityCredentials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuthenticationModal: false,
    };
  }
  handleAuthenticationModal = () => {
    this.setState({
      showAuthenticationModal: !this.state.showAuthenticationModal,
    });
  };
  render() {
    const { showAuthenticationModal } = this.state;

    return (
      <Box className="credentials-content">
        <Box className="credentials-box">
          <Box className="head">
            <h4>Appkube Sign in</h4>
          </Box>
          <Box className="credentials-details">
            <label>Password Update</label>
            <span>Update 26days ago (18:20 PM 11-12-2023)</span>
            <label>Last Sign in</label>
            <p>Sign in 5 days ago (18:20 PM 11-12-2023)</p>
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
                            <i class="fas fa-times"></i>
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

export default SecurityCredentials;

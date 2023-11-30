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

export class SecurityCredentials extends Component {
  render() {
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
          <Box className="d-block">
            <Grid
              container
              alignItems={"center"}
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <h4>Multi-factor authentication</h4>
              </Grid>
              <Grid item xs={6}>
                <Box className="overview-buttons">
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
                      >
                        <Link to={``}> Setup MFA</Link>
                      </Button>
                    </ListItem>
                  </List>
                </Box>
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
                           
                            <span>Billing details will be displayed here</span>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
        </Box>
      </Box>
    );
  }
}

export default SecurityCredentials;

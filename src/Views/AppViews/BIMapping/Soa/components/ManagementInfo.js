import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

class ManagementInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      country: "",
    };
  }
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  handleChange = (event) => {
    this.setState({
      country: event.target.value,
    });
  };
  render() {
    return (
      <Box className="tier-table-section">
        <TableContainer className="table">
          <Table className="overview">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" scope="row">
                  key
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  value
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  subkey
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  subvalue
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">Hosted on</TableCell>
                <TableCell align="center">
                  <Box className="region">
                    <FormControl
                      className="Region-fliter"
                      sx={{ m: 1, minWidth: 100 }}
                    >
                      <Select
                        className="fliter-toggel"
                        value={this.state.country}
                        onChange={this.handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Lambda	</MenuItem>
                        <MenuItem value={10}>Eks</MenuItem>
                        <MenuItem value={20}>Ecs</MenuItem>
                        <MenuItem value={30}>Ec2</MenuItem>
                        <MenuItem value={40}>S3</MenuItem>
                        									
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
                <TableCell align="center">Instance ID </TableCell>
                <TableCell align="center">user input</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Management Endpoint</TableCell>
                <TableCell align="center">
                  <Box className="region">
                    <FormControl
                      className="Region-fliter"
                      sx={{ m: 1, minWidth: 100 }}
                    >
                      <Select
                        className="fliter-toggel"
                        value={this.state.country}
                        onChange={this.handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Lambda	</MenuItem>
                        <MenuItem value={10}>Eks</MenuItem>
                        <MenuItem value={20}>Ecs</MenuItem>
                        <MenuItem value={30}>Ec2</MenuItem>
                        <MenuItem value={40}>S3</MenuItem>
                        									
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
                <TableCell align="center">Instance ID </TableCell>
                <TableCell align="center">user input</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Prometheus Endpoint	</TableCell>
                <TableCell align="center">
                  <Box className="region">
                    <FormControl
                      className="Region-fliter"
                      sx={{ m: 1, minWidth: 100 }}
                    >
                      <Select
                        className="fliter-toggel"
                        value={this.state.country}
                        onChange={this.handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Lambda	</MenuItem>
                        <MenuItem value={10}>Eks</MenuItem>
                        <MenuItem value={20}>Ecs</MenuItem>
                        <MenuItem value={30}>Ec2</MenuItem>
                        <MenuItem value={40}>S3</MenuItem>
                        									
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
                <TableCell align="center">Instance ID </TableCell>
                <TableCell align="center">user input</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Log Location</TableCell>
                <TableCell align="center">
                  <Box className="region">
                    <FormControl
                      className="Region-fliter"
                      sx={{ m: 1, minWidth: 100 }}
                    >
                      <Select
                        className="fliter-toggel"
                        value={this.state.country}
                        onChange={this.handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Lambda	</MenuItem>
                        <MenuItem value={10}>Eks</MenuItem>
                        <MenuItem value={20}>Ecs</MenuItem>
                        <MenuItem value={30}>Ec2</MenuItem>
                        <MenuItem value={40}>S3</MenuItem>
                        									
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
                <TableCell align="center">Instance ID </TableCell>
                <TableCell align="center">user input</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default ManagementInfo;

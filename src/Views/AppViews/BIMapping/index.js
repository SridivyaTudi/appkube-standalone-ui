import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import Aws from "../../../assets/img/aws.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import Kubernetes from "../../../assets/img/kubernetes.png";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";

class BIMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectDepartmentOpen: false,
    };
  }
  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
    });
  };
  render() {
    const { isSelectDepartmentOpen } = this.state;
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Organization Unit</h3>
          <Box className="mapping-fliter">
            <Button
              onClick={this.toggleSelectDepartment}
              className="primary-outline-btn min-width"
              variant="outlined"
            >
              Create
            </Button>
            {this.state.isSelectDepartmentOpen === true && (
              <div
                className={
                  isSelectDepartmentOpen
                    ? "fliter-collapse active"
                    : "fliter-collapse"
                }
              >
                <List>
                  <ListItem>
                    <Link to={`/app/bim/create-department`}>
                      <i className="fa-solid fa-circle-dot"></i>Create
                      Department
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to={""}>
                      <i className="fa-solid fa-circle-dot"></i>Add Products
                    </Link>
                  </ListItem>
                </List>
              </div>
            )}
          </Box>
        </Box>
        <Box className="environment-table">
          <TableContainer className="table">
            <Table>
              <TableHead className="active">
                <TableRow>
                  <TableCell align="left">Organization Name</TableCell>
                  <TableCell align="center">
                    <Box className="environment-image">
                      <img src={Aws} alt="" />
                    </Box>
                    AWS
                  </TableCell>
                  <TableCell align="center">
                    <Box className="environment-image">
                      <img src={Microsoftazure} alt="" />
                    </Box>
                    Azure
                  </TableCell>
                  <TableCell align="center">
                    <Box className="environment-image">
                      <img src={GoogleCloud} alt="" />
                    </Box>
                    GCP
                  </TableCell>
                  <TableCell align="center">
                    <Box className="environment-image">
                      <img src={Kubernetes} alt="" />
                    </Box>
                    Kubernetes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <Link to={""}>Synectiks</Link>
                  </TableCell>
                  <TableCell align="center">01</TableCell>
                  <TableCell align="center">01</TableCell>
                  <TableCell align="center">02</TableCell>
                  <TableCell align="center">00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }
}

export default BIMapping;

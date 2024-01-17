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

class CreateDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
 
  render() {
    const {  } = this.state;
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Create Department</h3>
        </Box>
      </Box>
    );
  }
}

export default CreateDepartment;

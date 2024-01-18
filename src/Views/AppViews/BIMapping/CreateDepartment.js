import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "../../../assets/img/bimapping/add-icon.png";

class CreateDepartment extends Component {
  render() {
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Create Department</h3>
        </Box>
        <Box className="create-department-container">
          <Box className="create-department-content">
            <Box className="add-department d-flex align-items-center">
            <Box className="icon-box">
              <img src={AddIcon} alt="" />
            </Box>
            <Box className=""></Box>
            </Box>
          </Box>
          <Box justifyContent={"center"} className="d-flex align-items-center wizard-step-button">
            <Button className="primary-outline-btn m-r-2" variant="outlined">
              Previous
            </Button>
            <Button className="primary-btn" variant="contained">
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default CreateDepartment;

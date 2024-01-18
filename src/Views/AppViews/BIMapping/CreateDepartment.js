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
            <Box className="create-department-inner-content">
              <Box className="add-department d-flex align-items-center">
                <Box className="icon-box m-r-2">
                  <img src={AddIcon} alt="" />
                </Box>
                <Box className="department-text d-inline-block">
                  <label className="d-block">Create Department</label>
                  <span className="d-block">
                    A new department will be created
                  </span>
                </Box>
              </Box>
              <Box className="basic-information">
                <Box className="d-flex align-items-center">
                  <Box className="check-box">
                    <i className="fa-solid fa-check"></i>
                  </Box>
                  <Box className="information-text">
                    <label className="d-block">Basic Information</label>
                    <span className="d-block">
                      Choose a department name and product assign environment
                    </span>
                  </Box>
                </Box>
                <Box className="arrow-icon">
                  <i className="fa-solid fa-caret-down "></i>
                </Box>
              </Box>
              <Box className="information-form">
                <Box className="form-group ">
                  <label htmlFor="roleName" className="form-label">
                  Department Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="HR"
                  />
                </Box>
                <Box className="form-group m-t-3">
                  <label htmlFor="description" className="form-label">
                  Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control "
                    id="description"
                    name="description"
                    style={{
                      height: "120px",
                      lineHeight: "18px",
                      paddingRight: "15px",
                    }}
                    placeholder="Enter Description"
                  />
                 
                </Box>
              </Box>
            </Box>
            <Box
              justifyContent={"center"}
              className="d-flex align-items-center wizard-step-button"
            >
              <Button className="primary-outline-btn m-r-2" variant="outlined">
                Previous
              </Button>
              <Button className="primary-btn" variant="contained">
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default CreateDepartment;

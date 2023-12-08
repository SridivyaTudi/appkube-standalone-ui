import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import AccordionView from "../Components/AccordionView";
let accessPolicyData = [
  {
    name: "Permission Set",
    chlidren: [
      {
        name: "Environment",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment" },
          { name: "Create Product Environment" },
        ],
      },
      {
        name: "Product",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment" },
          { name: "Create Product Environment" },
        ],
      },
      {
        name: "SHR",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment" },
          { name: "Create Product Environment" },
        ],
      },
      {
        name: "DevSecOps",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment" },
          { name: "Create Product Environment" },
        ],
      },
    ],
  },
];
class Policies extends Component {
  render() {
    return (
      <>
        <Box className="d-flex Justify-content-between align-items-center search-box">
          <Box className="d-flex width-100 ">
            <Box className="search">
              <input type="text" className="input" placeholder="Search User" />
              <button className="button">
                <SearchOutlinedIcon />
              </button>
            </Box>
            <Link to={`/app/setting/create-policy`}>
              <Button className="primary-btn min-width">Create Policy</Button>
            </Link>
          </Box>
          <Button className="danger-btn min-width-inherit" variant="contained">
            Delete
          </Button>
        </Box>
        <Box className="setting-table">
          <AccordionView data={accessPolicyData} />
        </Box>
      </>
    );
  }
}

export default Policies;

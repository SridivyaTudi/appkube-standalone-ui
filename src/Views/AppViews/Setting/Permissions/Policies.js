import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

class Policies extends Component {
  render() {
    return (
      <Box className="d-flex Justify-content-between align-items-center search-box">
        <Box className="d-flex width-100 ">
          <Box className="search">
            <input type="text" className="input" placeholder="Search User" />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
          <Button className="primary-btn min-width">Create Policy</Button>
        </Box>
        <Button className="danger-btn min-width-inherit" variant="contained">
          Delete
        </Button>
      </Box>
    );
  }
}

export default Policies;

import React, { Component } from "react";
import { Box } from "@mui/material";
import ErrorImg from "assets/img/error-img.png";

class Error extends Component {
  render() {
    return (
      <Box className="error-container">
        <Box className="error-left">
          <Box className="error-contant-left">
            <h1>404</h1>
            <h3>OPPS! PAGE NOT FOUND</h3>
            <p>
              Sorry. the page you're looking for doesn't exit. if you think
              something is broken. report a problem.
            </p>
          </Box>
        </Box>
        <Box className="error-right">
          <Box className="error-contant-right">
            <img src={ErrorImg} alt="" />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Error;

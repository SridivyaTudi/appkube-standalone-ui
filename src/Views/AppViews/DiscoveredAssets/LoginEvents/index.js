import React, { Component } from "react";
import { Box, Button } from "@mui/material";

class LoginEvents extends Component {
  render() {
    return (
      <Box className="discovered-assets-container">
        <Box className="assets-heading">
          <h3 className="m-b-0">ASSETS MANAGEMENT</h3>
          <Button className="primary-btn min-width-inherit" variant="contained">
            Back
          </Button>
        </Box>
        <Box className="global-services-fliter">
          <Box className="heading">Log Events</Box>
        </Box>
      </Box>
    );
  }
}

export default LoginEvents;

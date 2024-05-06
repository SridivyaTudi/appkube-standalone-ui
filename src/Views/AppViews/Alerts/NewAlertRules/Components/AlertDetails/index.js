import React, { Component } from "react";
import { Box, Button } from "@mui/material";

class AlertDetails extends Component {
  render() {
    return (
      <Box className="alert-details">
        <Box className="alert-detail-head">
          <label>Name this Alert Rule</label>
          <Button className="primary-btn min-width" variant="contained" disabled>
            Save Rule
          </Button>
        </Box>
        <Box className="alert-details-name">
          <input
            type="text"
            placeholder="Untitled Rule"
            className="input-group-text"
          />
        </Box>
        <Box className="alert-details-description">
          <label>Description</label>
          <textarea style={{minHeight: 330}} placeholder="Specify alert rule description"></textarea>
        </Box>
      </Box>
    );
  }
}

export default AlertDetails;

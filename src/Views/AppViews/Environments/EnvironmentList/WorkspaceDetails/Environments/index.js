import React, { Component } from "react";
import CommonFilterViewSearch from "Views/AppViews/Environments/EnvironmentList/CommonFilterViewSearch";
import { Box } from "@mui/material";

class Environments extends Component {
  render() {
    return (
      <Box className="environmentlist-container">
        <Box className="discovered-assets">
          <Box className="discovered-assets-head">
            <CommonFilterViewSearch />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Environments;

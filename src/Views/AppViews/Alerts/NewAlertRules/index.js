import React, { Component } from "react";
import { Box } from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class NewAlertRules extends Component {
  render() {
    return (
      <Box className="alert-container">
        <Box className="list-heading">
          <h3>Alerts Rule builder</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() => this.props.navigate(`${APP_PREFIX_PATH}/alerts`)}
              >
                Home
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Alerts | Rules</li>
            </ul>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default NewAlertRules;

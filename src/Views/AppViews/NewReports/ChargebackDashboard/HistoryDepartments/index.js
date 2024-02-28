import React, { Component } from "react";
import { Box, IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
class HistoryDepartments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    let {} = this.state;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>
            <Link to={`/app/new-reports/over-view-dashboard`}>
              <IconButton className="m-r-2">
                <i class="fas fa-long-arrow-left"></i>
              </IconButton>
            </Link>
            Chargeback Dashboard
          </h3>
          <Box className="d-flex align-items-center">
            <Button variant="outlined"  className="primary-outline-btn min-width-inherit m-r-3 p-l-15 p-r-15">
             View
            </Button>
            <Button className="primary-btn min-width-inherit m-r-3 p-l-15 p-r-15">
              Home
            </Button>
          </Box>
        </Box>
        <Box className="history-departments-container m-t-3">
          <h4 className="m-t-0 m-b-0">Invoice</h4>
        </Box>
      </Box>
    );
  }
}

export default HistoryDepartments;

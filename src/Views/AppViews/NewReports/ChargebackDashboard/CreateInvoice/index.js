import React, { Component } from "react";
import { Box, IconButton } from "@mui/material";
import {Link} from "react-router-dom";

class CreateInvoice extends Component {
  render() {
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>
            <Link to={`/app/new-reports/over-view-dashboard`}>
              <IconButton className="m-r-2">
                <i class="fas fa-long-arrow-left"></i>
              </IconButton>
            </Link>
            Create Invoice
          </h3>
        </Box>
        <Box className="create-invoice-container m-t-3">
          <h4 className="m-t-0 m-b-0">Create Invoice</h4>
        </Box>
      </Box>
    );
  }
}

export default CreateInvoice;

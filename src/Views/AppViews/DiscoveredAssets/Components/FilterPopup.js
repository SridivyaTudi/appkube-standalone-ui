import React, { Component } from "react";
import { Box, IconButton } from "@mui/material";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { v4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
let filterData = [
  {
    name: "Region",
    value: "US East 2",
  },
  {
    name: "AWS Account",
    value: "AWS (657",
  },
  {
    name: "Product Enclave ",
    value: "8 VPC",
  },
  {
    name: "Element Type",
    value: "EC2",
  },
  {
    name: "App",
    value: "Data",
  },
];
export class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.togglePopup}
        className="select-account-modal-container"
      >
        <ModalHeader className="border-bottom">
          Filter
          <IconButton
            variant="outlined"
            aria-label="delete"
            size="small"
            className="close-btn"
            onClick={() => {
              this.props.togglePopup();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "300px" }}
        >
          <Box sx={{ width: "100%" }} className="modal-filters">
            {this.props.data?.length ? (
              this.props.data.map((filter, index) => {
                return (
                  <Box className="filter-box" key={v4()}>
                    <Box className="d-flex  align-items-center m-r-3">
                      <label>{filter.name} &#58; </label>
                      <span> {filter.value} </span>
                    </Box>
                    <CloseIcon
                      fontSize="inherit"
                      className="close-btn"
                      onClick={() => this.props.onClickCloseIcon(index)}
                    />
                  </Box>
                );
              })
            ) : (
              <Box className="d-block text-center w-100 h-100 m-r-auto m-l-auto p-t-20 p-b-20 ">
                <h5>There are no data available.</h5>
              </Box>
            )}
          </Box>
        </ModalBody>
      </Modal>
    );
  }
}
export default Notification;

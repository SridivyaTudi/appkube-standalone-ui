import React, { Component } from "react";
import { Box, Grid } from "@mui/material";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { v4 } from "uuid";
import LoadingButton from "@mui/lab/LoadingButton";
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
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => {
              this.props.togglePopup();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "300px" }}
        >
          <Box sx={{ width: "100%" }} className="modal-filters">
            {filterData.map((filter, index) => {
              return (
                <Box className="filter-box" key={v4()}>
                  <Box className="d-flex  align-items-center m-r-3">
                    <label>{filter.name} &#58; </label>
                    <span> {filter.value} </span>
                  </Box>
                  <CloseIcon
                    fontSize="inherit"
                    className="close-btn"
                    //   onClick={() => this.onClickCloseIcon(index)}
                  />
                </Box>
              );
            })}
          </Box>
        </ModalBody>
      </Modal>
    );
  }
}
export default Notification;

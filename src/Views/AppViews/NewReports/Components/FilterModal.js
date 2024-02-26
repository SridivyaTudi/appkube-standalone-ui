import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Box, IconButton } from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
class FilterModal extends Component {
  toggle = () => {
    this.props.togglePopup();
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.showModal}
          toggle={this.toggle}
          className="report-filter-modal-container"
        >
          <ModalHeader tag="div" className="border-bottom">
            <h5>
              Filter
              <IconButton
                onClick={this.props.handleFilterModal}
                variant="outlined"
                aria-label="delete"
                size="small"
                className="close-btn"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </h5>
          </ModalHeader>
          <ModalBody>
            <Box className="search">
              <button className="button">
                <SearchOutlinedIcon />
              </button>
              <input
                type="text"
                className="input"
                placeholder="Select Ragions"
                //value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
            </Box>
            <Box className="search  m-t-3">
              <button className="button">
                <SearchOutlinedIcon />
              </button>
              <input
                type="text"
                className="input"
                placeholder="Select PVCs"
                //value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
            </Box>
            <Box className="search  m-t-3">
              <button className="button">
                <SearchOutlinedIcon />
              </button>
              <input
                type="text"
                className="input"
                placeholder="Select Tagname"
                //value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
            </Box>
            <Box className="search  m-t-3">
              <button className="button">
                <SearchOutlinedIcon />
              </button>
              <input
                type="text"
                className="input"
                placeholder="Select Accounts"
                //value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
            </Box>
            <Box className="search  m-t-3">
              <button className="button">
                <SearchOutlinedIcon />
              </button>
              <input
                type="text"
                className="input"
                placeholder="Select Products"
                //value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
            </Box>
          </ModalBody>
          <ModalFooter className="footer-top-br m-t-3">
            <Box className="d-block text-center">
              <LoadingButton
                className="primary-outline-btn min-width m-r-3"
                variant="outlined"
                // disabled={showLoader}
                // loading={showLoader}
                onClick={this.onClickYes}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                className="primary-btn min-width"
                variant="contained"
                onClick={this.onClickNo}
                // disabled={showLoader}
              >
                Apply
              </LoadingButton>
            </Box>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default FilterModal;

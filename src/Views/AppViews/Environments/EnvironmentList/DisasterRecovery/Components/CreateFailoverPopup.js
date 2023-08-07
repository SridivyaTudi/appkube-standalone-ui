import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Grid, Button, Box, List, ListItem } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateFailoverPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dateUpdate: false,
    };
  }

  toggle = () => {
    this.props.toggleStepsStartedPopup();
  };

  setDateRange = () => {
    // const { dateUpdate } = this.state;
    // this.setState({
    //   dateUpdate: dateUpdate,
    // });
  };

  render() {
    const { dateUpdate } = this.state;
    return (
      <>
        <Modal
          isOpen={this.props.showModal}
          toggle={this.toggle}
          className="create-failover-modal-container"
        >
          <ModalHeader className="m-b-1 border-bottom">
            Create Request for Failover
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => {
                this.props.toggleStepsStartedPopup();
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </ModalHeader>
          <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
            <div className="account-form">
              <Box className="form-group">
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Write Request Title"
                />
              </Box>
              <Box className="form-group">
                <label>DR schedule</label>
                <DatePicker
                  className="form-control"
                  selectsRange={false}
                  // value={dateUpdate}
                  // onChange={this.setDateUpdate()}
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                />
              </Box>
              <Box className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control textarea"
                  name="description"
                  placeholder="Write Description"
                />
              </Box>
              <Box className="form-group">
                <label>Initial Status</label>
              </Box>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="d-block text-right">
              <Button
                className="secondary-btn min-width m-r-2"
                variant="contained"
                onClick={this.props.toggleCreateFailoverPopup}
              >
                Cancel
              </Button>
              <Button
                className="primary-btn min-width"
                variant="contained"
                onClick={this.props.toggleCreateFailoverPopup}
              >
                Create Request
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default CreateFailoverPopup;

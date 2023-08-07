import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Grid, Button, Box, List, ListItem } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import profileImg from "assets/img/assetmanager/profile-img.png";

class CreateFailoverPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dateUpdate: false,
    };
  }

  toggle = () => {
    this.props.toggleCreateFailoverPopup();
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
                this.props.toggleCreateFailoverPopup();
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
                  withPortal
                  showTimeSelect
                  selected={false}
                  className="form-control date widht-100"
                  dateFormat="MMMM d, yyyy h:mm aa"
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
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                  alignItems="flex-start"
                >
                  <Grid item xs={6}>
                    <Box className="status-box">
                      <div className="icon">
                        <i className="fa-solid fa-sort-up"></i>
                      </div>
                      <span>New</span>
                      <div className="arrows">
                        <i className="fa-solid fa-sort-up"></i>
                        <i className="fa-solid fa-sort-down"></i>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className="status-box">
                      <div className="image">
                        <img src={profileImg} alt="Robert William" />
                      </div>
                      <span>
                        Robert William <strong>(you)</strong>
                      </span>
                    </Box>
                  </Grid>
                </Grid>
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

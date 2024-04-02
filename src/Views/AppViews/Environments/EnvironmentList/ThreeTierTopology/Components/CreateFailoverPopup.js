import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Grid, Button, Box, IconButton  } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import profileImg from "assets/img/assetmanager/profile-img.png";

class CreateFailoverPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dateUpdate: false,
      formData: {
        title: "",
        schedule: "",
        description: "",
      },
      isSubmit: false,
    };
  }

  toggle = () => {
    this.props.toggleCreateFailoverPopup();
  };
  /**
   * handle date changes
   * @param {Date Object} schedule - Receive Date Object
   */
  handleDatechange = (schedule) => {
    let { formData } = this.state;
    formData["schedule"] = schedule;
    this.setState({
      formData,
    });
  };

  /**
   * handle date changes
   * @param {Object} event - Event Object
   */
  handleChange = (event) => {
    const { name, value } = event.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  /**
   * Validate form
   * @param {Object} event - Event Object
   * @param {Boolean} isSubmit - When submit btn,then receive 1 else 0
   */
  validate = (isSubmit) => {
    const { formData } = this.state;
    let isValid;
    let errors;
    if (isSubmit) {
      isValid = true;

      if (!formData.title) {
        errors = { ...errors, title: "Request title is required!" };
        isValid = false;
      } else {
        errors = { ...errors, title: "" };
      }

      if (!formData.schedule) {
        errors = { ...errors, schedule: "DR schedule is required!" };
        isValid = false;
      } else {
        errors = { ...errors, schedule: "" };
      }

      if (!formData.description) {
        errors = { ...errors, description: "Description is required!" };
        isValid = false;
      } else if (formData.description.length > 255) {
        errors.description =
          "Description should be a maximum of 255 characters.";
        isValid = false;
      } else {
        errors = { ...errors, description: "" };
      }
    }
    return { isValid, errors };
  };

  /**
   * Create request submit
   */
  handleSubmit = () => {
    this.setState({ isSubmit: true }, () => {
      const { isValid } = this.validate(true);
      if (isValid) {
        this.toggle();
      }
    });
  };

  render() {
    const {
      formData: { title, schedule, description },
      isSubmit,
    } = this.state;
    const { errors } = this.validate(isSubmit);
    return (
      <>
        <Modal
          isOpen={this.props.showModal}
          toggle={this.toggle}
          className="create-failover-modal-container"
        >
          <ModalHeader className="m-b-1 border-bottom">
            Create Request for Failover
            <IconButton
             variant="outlined"
             aria-label="delete"
             size="small"
             className="close-btn"
             
              onClick={this.props.toggleCreateFailoverPopup}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </ModalHeader>
          <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
            <div className="account-form">
              <Box className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Write Request Title"
                  value={title}
                  onChange={this.handleChange}
                  id="title"
                />
                <span
                  className="red"
                  style={{ fontSize: "12px", marginTop: "5px" }}
                >
                  {isSubmit && errors && errors.title ? errors.title : ""}
                </span>
              </Box>
              <Box className="form-group">
                <label htmlFor="schedule">DR schedule</label>
                <DatePicker
                  withPortal
                  showTimeSelect
                  selected={schedule}
                  className="form-control date widht-100"
                  dateFormat="hh:mm:ss dd/MM/yyyy"
                  id="schedule"
                  onChange={this.handleDatechange}
                  placeholderText="08:00:00 10/07/2013"
                />
                <span
                  className="red"
                  style={{ fontSize: "12px", marginTop: "5px" }}
                >
                  {isSubmit && errors && errors.schedule ? errors.schedule : ""}
                </span>
              </Box>
              <Box className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control textarea"
                  name="description"
                  maxLength={255}
                  placeholder="Write Description"
                  id="description"
                  onChange={this.handleChange}
                  value={description}
                ></textarea>
                <span
                  className="red"
                  style={{ fontSize: "12px", marginTop: "5px" }}
                >
                  {isSubmit && errors && errors.description
                    ? errors.description
                    : ""}
                </span>
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
                onClick={this.handleSubmit}
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

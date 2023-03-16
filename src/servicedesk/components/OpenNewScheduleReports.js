import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Customselectbox from "./Customselectbox";
import CustomTextbox from "./CustomTextbox";

class OpenNewScheduleReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      generateReport: "",
      day: "",
      time: "",
      email: "",
      subject: "",
      description: "",
      isSubmitted: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (
      errorData.generateReport.isValid &&
      errorData.day.isValid &&
      errorData.time.isValid &&
      errorData.email.isValid &&
      errorData.subject.isValid &&
      errorData.description.isValid
    ) {
      const { generateReport, day, time, email, subject, description } =
        this.state;

      const sendData = {
        generateReport,
        day,
        email,
        time,
        subject,
        description,
      };
      console.log(sendData);
    }
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const retData = {
      generateReport: validObj,
      day: validObj,
      time: validObj,
      email: validObj,
      subject: validObj,
      description: validObj,
    };
    if (isSubmitted) {
      const { generateReport, day, time, email, subject, description } =
        this.state;
      if (!generateReport) {
        retData.generateReport = {
          isValid: false,
          message: "Generate Report Name is required",
        };
      }
      if (!day) {
        retData.day = {
          isValid: false,
          message: "Day is required",
        };
      }
      if (!time) {
        retData.time = {
          isValid: false,
          message: "Time is required",
        };
      }
      if (!email) {
        retData.email = {
          isValid: false,
          message: "Email is required",
        };
      }
      if (!subject) {
        retData.subject = {
          isValid: false,
          message: "Subject is required",
        };
      }
      if (!description) {
        retData.description = {
          isValid: false,
          message: "Description is required",
        };
      }
    }
    return retData;
  };

  render() {
    const {
      modal,
      generateReport,
      day,
      time,
      email,
      subject,
      description,
      isSubmitted,
    } = this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className="modal-container servicdesk-modal-container"
      >
        <button className="close-btn" onClick={this.handleClose}>
          X
        </button>
        <ModalBody
          style={{
            height: "calc(75vh - 50px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="d-block width-100 contact-popup-container new-ticket-container">
            <div className="d-block p-b-20 heading">
              <div className="d-block width-100">
                <h4 className="d-block">Schedule Reports</h4>
                <span className="d-block">Helpdesk In-Depth</span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label htmlFor="GenerateReport">Generate Report</label>
                  <Customselectbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="generateReport"
                    id="generateReport"
                    name="generateReport"
                    value={generateReport}
                    arrayData={{ 0: "Daily", 1: "Weekly", 2: "Month" }}
                    onChange={this.handleStateChange}
                    isValid={errorData.generateReport.isValid}
                    message={errorData.generateReport.message}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label htmlFor="On">On</label>
                  <Customselectbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="day"
                    id="day"
                    name="day"
                    value={day}
                    arrayData={{
                      0: "1st",
                      1: "2nd",
                      2: "3rd",
                      3: "4th",
                      4: "5th",
                      5: "6th",
                      6: "Last day",
                    }}
                    onChange={this.handleStateChange}
                    isValid={errorData.day.isValid}
                    message={errorData.day.message}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label htmlFor="from">At</label>
                  <Customselectbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="time"
                    id="time"
                    name="time"
                    value={time}
                    arrayData={{
                      0: "01:00",
                      1: "02:00",
                      2: "03:00",
                      3: "04:00",
                      4: "05:00",
                      5: "06:00",
                    }}
                    onChange={this.handleStateChange}
                    isValid={errorData.time.isValid}
                    message={errorData.time.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="Email">Email</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="Email"
                    id="email"
                    placeholder="Write Email Id."
                    name="email"
                    value={email}
                    onChange={this.handleStateChange}
                    isValid={errorData.email.isValid}
                    message={errorData.email.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="Subject">Subject</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="Subject"
                    id="subject"
                    placeholder="Write subject of the report."
                    name="subject"
                    value={subject}
                    onChange={this.handleStateChange}
                    isValid={errorData.subject.isValid}
                    message={errorData.subject.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="Description">Description</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="Description"
                    id="description"
                    placeholder="Write something that describe the reports."
                    name="description"
                    value={description}
                    onChange={this.handleStateChange}
                    isValid={errorData.description.isValid}
                    message={errorData.description.message}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="d-block text-center p-t-20 contact-popup-buttons">
                  <button className="cancel" onClick={this.handleClose}>
                    Cancel
                  </button>
                  <button className="save" onClick={this.handleSubmit}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default OpenNewScheduleReports;

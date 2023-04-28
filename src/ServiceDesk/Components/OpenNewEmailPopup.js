import React from "react";
import { Modal, ModalBody } from "reactstrap";
import CustomTextbox from "./CustomTextbox";
import Customselectbox from "./Customselectbox";
import CustomTextareabox from "./CustomTextareabox";
import Multiselect from "./Multiselect/multiselects/multiselect.component";
import config from "../../config";
import { RestService } from "../../Services/RestService";
import AlertMessage from "./AlertMessage";
import axios from "axios";

class MySelectObj {
  id;
  name;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class OpenNewEmailPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlertOpen: false,
      message: null,
      severity: null,
      modal: false,
      from: "",
      to: "",
      subject: "",
      description: "",
      priority: "",
      status: "",
      tags: "",
      isSubmitted: false,
      option: [
        { name: "abc@a.com", value: "abc@a.com" },
        { name: "xyz@x.com", value: "xyz@x.com" },
        { name: "abc@d.com", value: "abc@d.com" },
        { name: "xyz@y.com", value: "xyz@y.com" },
        { name: "adc@a.com", value: "adc@a.com" },
        { name: "xpz@x.com", value: "xpz@x.com" },
      ],
      toOptions: [
        { name: "dipti@gmail.com", value: "dipti@gmail.com" },
        { name: "shatish@gmail.com", value: "shatish@gmail.com" },
        { name: "jasmin@gmail.com", value: "jasmin@gmail.com" },
        { name: "sunil@gmail.com", value: "sunil@gmail.com" },
        { name: "infotech@tech.com", value: "infotech@tech.com" },
      ],
      toEmails: [],
      fromEmails: [],
      ticketId: null,
      ticketListObj: [],
      orgTicketList: [],
    };
  }

  async componentDidMount() {
    try {
      await RestService.getData(config.GET_ALL_TICKET_URL, null, null).then(
        (response) => {
          let ary = [];
          let obj = new MySelectObj("", "Select Ticket");
          ary.push(obj);
          for (let i = 0; i < response.length; i++) {
            obj = new MySelectObj(response[i].id, response[i].subject);
            ary.push(obj);
          }
          this.setState({
            ticketListObj: ary,
            orgTicketList: response,
          });
        }
      );
    } catch (err) {
      console.log("Loading company data failed. Error: ", err);
    }
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (
      errorData.fromEmails.isValid &&
      errorData.toEmails.isValid &&
      errorData.subject.isValid &&
      errorData.description.isValid &&
      errorData.priority.isValid &&
      errorData.status.isValid &&
      errorData.tags.isValid
    ) {
      const {
        fromEmails,
        toEmails,
        subject,
        description,
        priority,
        status,
        tags,
        ticketId,
      } = this.state;
      let from = [];
      let i;
      for (i in fromEmails) {
        from.push(fromEmails[i].value);
      }
      let to = [];
      let j;
      for (j in toEmails) {
        to.push(toEmails[j].value);
      }

      let priorityValue = "";
      if (priority == 0) {
        priorityValue = "Low";
      } else if (priority == 1) {
        priorityValue = "Medium";
      } else if (priority == 2) {
        priorityValue = "High";
      }
      let statusValue;
      if (status == 0) {
        statusValue = "Closed";
      } else {
        statusValue = "Open";
      }
      let formData = new FormData();
      formData.append("from", from.toString());
      formData.append("to", to.toString());
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("priority", priorityValue);
      formData.append("status", statusValue);
      formData.append("tags", tags);
      formData.append("ticketId", ticketId);
      console.log("Email Object ", formData);

      axios
        .post(config.SEND_EMAIL_URL, formData, {})
        .then((response) => {
          if (response.data != null) {
            this.setState({
              severity: config.SEVERITY_SUCCESS,
              message: config.SEND_EMAIL_SUCCESS,
              isAlertOpen: true,
            });
          } else {
            this.setState({
              severity: config.SEVERITY_ERROR,
              message: config.SEND_EMAIL_ERROR,
              isAlertOpen: true,
            });
          }
          console.log("response data", response.data);
        })
        .catch((err) => console.log(err));
    }
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const retData = {
      from: validObj,
      to: validObj,
      subject: validObj,
      description: validObj,
      priority: validObj,
      status: validObj,
      tags: validObj,
      ticketId: validObj,
      fromEmails: validObj,
      toEmails: validObj,
    };
    if (isSubmitted) {
      const {
        subject,
        description,
        priority,
        status,
        tags,
        ticketId,
        fromEmails,
        toEmails,
      } = this.state;
      if (!ticketId) {
        retData.ticketId = {
          isValid: false,
          message: "Please select ticket",
        };
      }
      if (fromEmails.length == 0) {
        retData.fromEmails = {
          isValid: false,
          message: "Email Sender name is required",
        };
      }
      if (toEmails.length == 0) {
        retData.toEmails = {
          isValid: false,
          message: "Email Forworder name is required",
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
      if (!priority) {
        retData.priority = {
          isValid: false,
          message: "Priority is required",
        };
      }
      if (!status) {
        retData.status = {
          isValid: false,
          message: "Status is required",
        };
      }
      if (!tags) {
        retData.tags = {
          isValid: false,
          message: "Tags is required",
        };
      }
    }
    return retData;
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  onChangeEmail = (selectedValues, type) => {
    if (type === "from") {
      this.setState({
        fromEmails: selectedValues,
      });
    } else if (type === "to") {
      this.setState({
        toEmails: selectedValues,
      });
    }
  };

  getAdHocItem = (value) => {
    return { name: value, value: value };
  };
  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
    });
  };

  render() {
    const {
      modal,
      subject,
      description,
      priority,
      status,
      tags,
      isSubmitted,
      ticketId,
      ticketListObj,
    } = this.state;
    const errorData = this.validate(isSubmitted);
    const state = this.state;
    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className="modal-container servicdesk-modal-container"
      >
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={state.isAlertOpen}
          severity={state.severity}
          msg={state.message}
        ></AlertMessage>
        <button className="close-btn" onClick={this.handleClose}>
        <i className="fal fa-times"></i>
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
                <h4 className="d-block">Send an Email</h4>
                <span className="d-block">
                  When you hit send, the Contact will receive an email and a
                  Ticket will be associated with Them
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="from">From*</label>
                  <Multiselect
                    placeholder="RK Fabrication Company (support@ramkaumr1578.maxamis.com)"
                    options={this.state.option}
                    onSelect={(selectedValues, item) =>
                      this.onChangeEmail(selectedValues, "from")
                    }
                    onRemove={(selectedValues, item) =>
                      this.onChangeEmail(selectedValues, "from")
                    }
                    closeIcon="close"
                    displayValue="name"
                    getAdHocItem={this.getAdHocItem}
                  />
                  <span style={{ color: "red" }}>
                    {errorData.fromEmails.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="description">To*</label>
                  {/* <Multiselect
                    options={this.state.toOptions}
                    preselectedValues={toEmails}
                    onSelect={(selectedValues, item) => this.onChangeEmail(selectedValues, 'to')}
                    onRemove={(selectedValues, item) => this.onChangeEmail(selectedValues, 'to')}
                    closeIcon="close"
                    displayValue="name"
                    getAdHocItem={this.getAdHocItem}
                  /> */}
                  <span style={{ color: "red" }}>
                    {errorData.toEmails.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="contact">Ticket *</label>
                  <Customselectbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="ticketId"
                    id="ticketId"
                    name="ticketId"
                    value={ticketId}
                    arrayData={ticketListObj}
                    onChange={this.handleStateChange}
                    isValid={errorData.ticketId.isValid}
                    message={errorData.ticketId.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="subject">
                    Subject*
                    <span className="float-right">
                      <button className="add-conatct">Recently used</button>
                    </span>
                  </label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="subject"
                    id="subject"
                    placeholder=""
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
                  <label htmlFor="description">Description*</label>
                  <CustomTextareabox
                    containerClass="form-group-inner"
                    rows={5}
                    inputClass="form-control textarea"
                    htmlFor="description"
                    id="description"
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
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label htmlFor="priority">Priority*</label>
                  <Customselectbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="priority"
                    id="priority"
                    name="priority"
                    value={priority}
                    arrayData={[
                      { id: -1, name: "Select priority" },
                      { id: 0, name: "Low" },
                      { id: 1, name: "Medium" },
                      { id: 0, name: "High" },
                    ]}
                    onChange={this.handleStateChange}
                    isValid={errorData.priority.isValid}
                    message={errorData.priority.message}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label htmlFor="status">Status*</label>
                  <Customselectbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="status"
                    id="status"
                    name="status"
                    value={status}
                    arrayData={[
                      { id: -1, name: "Select Status" },
                      { id: 0, name: "Closed" },
                      { id: 1, name: "open" },
                    ]}
                    onChange={this.handleStateChange}
                    isValid={errorData.status.isValid}
                    message={errorData.status.message}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="tags"
                    id="tags"
                    name="tags"
                    value={tags}
                    onChange={this.handleStateChange}
                    isValid={errorData.tags.isValid}
                    message={errorData.tags.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="d-block text-right p-t-20 contact-popup-buttons">
                  <button className="cancel" onClick={this.handleClose}>
                    Cancel
                  </button>
                  <button className="save create" onClick={this.handleSubmit}>
                    Send
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

export default OpenNewEmailPopup;

import React from "react";
import { Modal, ModalBody } from "reactstrap";
import CustomTextbox from "./CustomTextbox";
import Customselectbox from "./Customselectbox";
import CustomTextareabox from "./CustomTextareabox";
import { config } from "../config";
import axios from "axios";
import { RestService } from "../pages/_service/RestService";
import AlertMessage from "./AlertMessage";

class MySelectObj {
  id;
  name;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class OpenEditTicketPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlertOpen: false,
      message: null,
      severity: null,
      modal: false,
      ticketId: null,
      requesterContact: "",
      subject: "",
      type: "",
      subjectText: "",
      priority: "",
      assignValue: "",
      description: "",
      tags: "",
      isSubmitted: false,
      contacts: [{ index: "", value: "" }],
      totalContact: 1,
      contactNameAndEmailList: [],
      allContacts: [],
      primaryEmailList: [],
      assignType: "",
      assignedContact: "",
      AgentNameList: [],
      allAgents: [],
      assignedAgent: "",
    };
  }

  async componentDidMount() {
    try {
      await RestService.getData(config.GET_ALL_CONTACT_URL, null, null).then(
        (response) => {
          let ary = [];
          let primaryEmailAry = [];
          let obj = new MySelectObj("", "Select Contact");
          let primaryEmailObj = new MySelectObj("", "Select Contact");
          primaryEmailAry.push(primaryEmailObj);
          ary.push(obj);
          for (let i = 0; i < response.length; i++) {
            obj = new MySelectObj(response[i].id, response[i].primaryEmail);
            primaryEmailObj = new MySelectObj(
              response[i].id,
              response[i].primaryEmail
            );
            ary.push(obj);
            primaryEmailAry.push(primaryEmailObj);
          }
          this.setState({
            contactNameAndEmailList: ary,
            allContacts: response,
            primaryEmailList: primaryEmailAry,
          });
        }
      );
    } catch (err) {
      console.log("Loading company data failed. Error: ", err);
    }

    try {
      await RestService.getData(config.GET_ALL_AGENT_URL, null, null).then(
        (response) => {
          let ary = [];
          let obj = new MySelectObj("", "Select Agent");
          ary.push(obj);
          for (let i = 0; i < response.length; i++) {
            obj = new MySelectObj(response[i].id, response[i].name);
            ary.push(obj);
          }
          this.setState({
            AgentNameList: ary,
            allAgents: response,
          });
        }
      );
    } catch (err) {
      console.log("Loading company data failed. Error: ", err);
    }
  }

  fetchData = () => {
    RestService.getData(
      config.SERVICEDESK_API_URL + "/api/contacts",
      null,
      null
    ).then((response) => {
      console.log("contact list : ", response);
      let obj = null;
      this.setState({
        conatctFullNameList: obj,
      });
    });
  };

  getTicketByID = async (id) => {
    let res;
    try {
      await RestService.getData(
        config.GET_TICKET_BY_ID + "/" + id,
        null,
        null
      ).then((response) => {
        console.log("response", response);
        res = response;
      });
    } catch (err) {
      console.log("Loading Ticket data failed. Error: ", err);
    }
    return res;
  };

  toggle = async (selectedTicket) => {
    console.log("Selected Ticket :::: ", selectedTicket);
    this.setState({
      modal: !this.state.modal,
    });
    try {
      await RestService.getData(
        config.GET_TICKET_BY_ID + "/" + selectedTicket.id,
        null,
        null
      ).then((response) => {
        console.log("response", response);

        this.setState({
          ticketId: response.id,
          requesterContact: response.requesterId,
          subjectText: response.subject,
          type: response.type,
          priority: response.priority,
          assignType: response.assignedToUserType,
          tags: response.tag,
          description: response.description,
        });
        if (response.assignedToUserType.toLowerCase() == "contact") {
          this.setState({
            assignedContact: response.assignedToId,
          });
        } else if (response.assignedToUserType.toLowerCase() == "agent") {
          this.setState({
            assignedAgent: response.assignedToId,
          });
        }
      });
    } catch (err) {
      console.log("Loading Ticket data failed. Error: ", err);
    }
    this.setState({
      ticketId: selectedTicket.id,
      // requesterContact:
    });
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (
      errorData.type.isValid &&
      errorData.subjectText.isValid &&
      errorData.priority.isValid &&
      errorData.description.isValid &&
      errorData.tags.isValid &&
      errorData.requesterContact.isValid &&
      errorData.assignType.isValid &&
      (errorData.assignedAgent.isValid || errorData.assignedContact.isValid)
    ) {
      const {
        ticketId,
        subjectText,
        priority,
        type,
        description,
        tags,
        requesterContact,
        assignedAgent,
        assignType,
        assignedContact,
      } = this.state;
      let assignedToId;
      if (assignType == "contact") {
        assignedToId = assignedContact;
      } else if (assignType == "agent") {
        assignedToId = assignedAgent;
      }
      let associatedEntityName;
      let associatedEntityId;
      let alertName;
      if (this.props.guid == undefined) {
        associatedEntityName = "";
        associatedEntityId = null;
      } else {
        associatedEntityName = "alert";
        associatedEntityId = this.props.guid;
        alertName = this.props.alertName;
      }

      let data = {
        type: type,
        subject: subjectText,
        priority: priority,
        description: description,
        tag: tags,
        assignedToUserType: assignType,
        requesterUserType: "contact",
        requesterId: requesterContact,
        assignedToId: assignedToId,
        associatedEntityName: associatedEntityName,
        associatedEntityId: associatedEntityId,
        alertName: alertName,
      };

      let formData = new FormData();
      formData.append("id", ticketId);
      formData.append("type", type);
      formData.append("subject", subjectText);
      formData.append("priority", priority);
      formData.append("description", description);
      formData.append("tag", tags);
      formData.append("assignedToUserType", assignType);
      formData.append("requesterUserType", "contact");
      formData.append("requesterId", requesterContact);
      formData.append("assignedToId", assignedToId);
      formData.append("associatedEntityName", associatedEntityName);
      formData.append("associatedEntityId", associatedEntityId);
      formData.append("alertName", alertName);

      console.log("Send Data : ", data);
      axios
        .post(config.UPDATE_TICKET_URL, formData, {})
        .then((response) => {
          console.log("after updated res :: ", response);
          if (response.data != null) {
            this.props.onSaveUpdate(response.data);
            this.setState({
              severity: config.SEVERITY_SUCCESS,
              message: config.UPDATE_TICKET_SUCCESS,
              isAlertOpen: true,
            });
          } else {
            this.setState({
              severity: config.SEVERITY_ERROR,
              message: config.ADD_TICKET_ERROR,
              isAlertOpen: true,
            });
          }
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
      subject: validObj,
      type: validObj,
      subjectText: validObj,
      priority: validObj,
      description: validObj,
      tags: validObj,
      requesterContact: validObj,
      assignType: validObj,
      assignedAgent: validObj,
      assignedContact: validObj,
    };
    if (isSubmitted) {
      const {
        type,
        subjectText,
        priority,
        description,
        tags,
        requesterContact,
        assignType,
        assignedAgent,
        assignedContact,
      } = this.state;
      if (!requesterContact) {
        retData.requesterContact = {
          isValid: false,
          message: "Contact is required",
        };
      }
      if (assignType == "contact") {
        if (!assignedContact) {
          retData.assignedContact = {
            isValid: false,
            message: "Please select assign type",
          };
        }
      } else if (assignType == "agent") {
        if (!assignedAgent) {
          retData.assignedAgent = {
            isValid: false,
            message: "Agent is required",
          };
        }
      }
      if (!type) {
        retData.type = {
          isValid: false,
          message: "Type is required",
        };
      }
      if (!subjectText) {
        retData.subjectText = {
          isValid: false,
          message: "Subject Detail required",
        };
      }
      if (!priority) {
        retData.priority = {
          isValid: false,
          message: "Priority is required",
        };
      }
      if (!assignType) {
        retData.assignType = {
          isValid: false,
          message: "Please select contact or agent",
        };
      }
      if (!description) {
        retData.description = {
          isValid: false,
          message: "Description is required",
        };
      }
      if (!tags) {
        retData.tags = {
          isValid: false,
          message: "Tag is required",
        };
      }
    }
    return retData;
  };

  validateContacts = (isSubmitted) => {
    const retData = [];
    const { contacts } = this.state;
    const length = contacts.length;
    let isValid = true;
    for (let i = 0; i < length; i++) {
      retData.push({
        isValid: true,
        message: "",
      });
    }
    if (isSubmitted) {
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          if (contacts[i].value == "") {
            retData[i] = {
              isValid: false,
              message: "Contact Name is required",
            };
          }
        }
      }
      isValid = false;
    }
    return {
      errorList: retData,
      isValid,
    };
  };

  handleStateChange = (e) => {
    const { name, value, id } = e.target;
    let data = [];
    if (name == "contact") {
      for (let i = 0; i < this.state.contacts.length; i++) {
        if (id == i) {
          data.push({ index: i, value: value });
        } else {
          data.push(this.state.contacts[i]);
        }
      }
      this.setState({
        contacts: data,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  addContact = () => {
    let optionArray = this.state.contacts;
    optionArray.push({ index: "", value: "" });
    this.setState({
      contacts: optionArray,
    });
  };

  displayContact = () => {
    const { isSubmitted, contacts } = this.state;
    const contactValidation = this.validateContacts(isSubmitted);
    const errorList = contactValidation.errorList;
    let retData = [];
    for (let i = 0; i < contacts.length; i++) {
      const error = errorList[i];
      retData.push(
        <Customselectbox
          containerClass="form-group-inner p-b-10"
          inputClass="form-control"
          htmlFor="contact"
          id={i}
          name="requesterContact"
          value={contacts[i].value}
          arrayData={[
            { id: 0, name: "ABC" },
            { id: 1, name: "DEF" },
            { id: 2, name: "GHI" },
          ]}
          onChange={this.handleStateChange}
          isValid={error.isValid}
          message={error.message}
        />
      );
    }
    return retData;
  };

  handleSelectBox = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
    });
  };

  render() {
    const {
      contactNameAndEmailList,
      modal,
      requesterContact,
      type,
      subjectText,
      priority,
      description,
      tags,
      isSubmitted,
      assignType,
      assignedAgent,
      AgentNameList,
      assignedContact,
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
                <h4 className="d-block">New Ticket</h4>
                <span className="d-block">
                  The Contact will receive an Email about this Ticket
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="contact">Contact*(Requester)</label>
                  {/* {this.displayContact()} */}
                  <Customselectbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="requesterContact"
                    id="requesterContact"
                    name="requesterContact"
                    value={requesterContact}
                    arrayData={contactNameAndEmailList}
                    onChange={this.handleStateChange}
                    isValid={errorData.requesterContact.isValid}
                    message={errorData.requesterContact.message}
                  />
                  <div className="d-block text-right p-t-5"></div>
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
                    htmlFor="subjectText"
                    id="subjectText"
                    placeholder=""
                    name="subjectText"
                    value={subjectText}
                    onChange={this.handleStateChange}
                    isValid={errorData.subjectText.isValid}
                    message={errorData.subjectText.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="type">Type*</label>
                  <Customselectbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="type"
                    id="type"
                    name="type"
                    value={type}
                    arrayData={[
                      { id: "A", name: "A" },
                      { id: "B", name: "B" },
                      { id: "C", name: "C" },
                    ]}
                    onChange={this.handleSelectBox}
                    isValid={errorData.type.isValid}
                    message={errorData.type.message}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
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
                      { id: "Low", name: "Low" },
                      { id: "High", name: "High" },
                      { id: "Medium", name: "Medium" },
                    ]}
                    onChange={this.handleSelectBox}
                    isValid={errorData.priority.isValid}
                    message={errorData.priority.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <div className="d-inline-block form-check create-author">
                    {assignType == "contact" ? (
                      <input
                        type="radio"
                        checked
                        name="assignType"
                        value="contact"
                        className="form-check-input contact_radio_button"
                        onChange={this.handleStateChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        name="assignType"
                        value="contact"
                        className="form-check-input contact_radio_button"
                        onChange={this.handleStateChange}
                      />
                    )}
                    <label className="form-check-label" htmlFor="Contact">
                      Contact
                    </label>
                    {/* <input type="radio" name="assignType"  value="contact" className="form-check-input contact_radio_button" onChange={this.handleStateChange} /><label className="form-check-label" htmlFor="Contact">Contact</label> */}
                    {assignType == "contact" && (
                      <div>
                        <label htmlFor="assign">
                          Assign to Contacts*{assignedContact}
                        </label>
                        <Customselectbox
                          containerClass="form-group-inner"
                          inputClass="form-control"
                          htmlFor="assignedContact"
                          id="assignedContact"
                          name="assignedContact"
                          value={assignedContact}
                          arrayData={contactNameAndEmailList}
                          onChange={this.handleStateChange}
                          isValid={errorData.assignedContact.isValid}
                          message={errorData.assignedContact.message}
                        />
                      </div>
                    )}
                  </div>
                  <div className="d-inline-block form-check create-author">
                    {assignType == "agent" ? (
                      <input
                        type="radio"
                        checked
                        name="assignType"
                        value="agent"
                        className="form-check-input contact_radio_button"
                        onChange={this.handleStateChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        name="assignType"
                        value="agent"
                        className="form-check-input contact_radio_button"
                        onChange={this.handleStateChange}
                      />
                    )}
                    <label className="form-check-label" htmlFor="Agent">
                      Agent
                    </label>
                    {assignType == "agent" && (
                      <div>
                        <label htmlFor="assign">Assign to Agent*</label>
                        <Customselectbox
                          containerClass="form-group-inner"
                          inputClass="form-control"
                          htmlFor="assignedAgent"
                          id="assignedAgent"
                          name="assignedAgent"
                          value={assignedAgent}
                          arrayData={AgentNameList}
                          onChange={this.handleStateChange}
                          isValid={errorData.assignedAgent.isValid}
                          message={errorData.assignedAgent.message}
                        />
                      </div>
                    )}
                  </div>
                  <span style={{ color: "red" }}>
                    {errorData.assignType.message}
                  </span>
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
              <div className="col-lg-12 col-md-12 col-sm-12">
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
                    Update
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

export default OpenEditTicketPopup;

import React from "react";
import OpenNewContactPopup from "../../Components/OpenNewContactPopup";
import OpenNewCompanyPopup from "../../Components/OpenNewCompanyPopup";
import OpenNewEmailPopup from "../../Components/OpenNewEmailPopup";
import OpenNewTicketPopup from "../../Components/OpenNewTicketPopup";
import OpenNewAgentPopup from "../../Components/OpenNewAgentPopup";
import OpenClosePopup from "../../Components/OpenClosePopup";
import OpenDeletePopup from "../../Components/OpenDeletePopup";
import OpenMergePopup from "../../Components/OpenMergePopup";
import Rbac from "../Rbac/Rbac";

class TicketsDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateMenu: false,
      openPropertiesForm: false,
      openContactDetailsPopup: false,
      openAddNotePopup: false,
      openReplyPopup: false,
      openForwardPopup: false,
    };
    this.openNewContactRef = React.createRef();
    this.openNewCompanyRef = React.createRef();
    this.openNewEmailRef = React.createRef();
    this.openNewTicketRef = React.createRef();
    this.openNewAgentRef = React.createRef();
    this.openCloseRef = React.createRef();
    this.openDeleteRef = React.createRef();
    this.openMergeRef = React.createRef();
  }

  onClickOpenSubLink = () => {
    let menu = !this.state.openCreateMenu;
    this.setState({
      openCreateMenu: menu,
    });
  };

  onClickOpenProperties = () => {
    let form = !this.state.openPropertiesForm;
    this.setState({
      openPropertiesForm: form,
    });
  };

  onClickOpencontactDetails = () => {
    let contactDetails = !this.state.openContactDetailsPopup;
    this.setState({
      openContactDetailsPopup: contactDetails,
    });
  };

  onClickOpenAddNotePopup = () => {
    let addNote = !this.state.openAddNotePopup;
    this.setState({
      openAddNotePopup: addNote,
    });
  };

  onClickOpenReplyPopup = () => {
    let reply = !this.state.openReplyPopup;
    this.setState({
      openReplyPopup: reply,
    });
  };

  onClickOpenForwardPopup = () => {
    let forward = !this.state.openForwardPopup;
    this.setState({
      openForwardPopup: forward,
    });
  };

  onClickOpenNewContact = (e) => {
    this.openNewContactRef.current.toggle();
  };

  onClickOpenNewCompany = (e) => {
    this.openNewCompanyRef.current.toggle();
  };

  onClickOpenNewAgent = (e) => {
    this.openNewAgentRef.current.toggle();
  };

  onClickOpenNewEmail = (e) => {
    this.openNewEmailRef.current.toggle();
  };

  onClickOpenNewTicket = (e) => {
    this.openNewTicketRef.current.toggle();
  };

  onClickOpenClosePopup = (e) => {
    this.openCloseRef.current.toggle();
  };

  onClickOpenDeletePopup = (e) => {
    this.openDeleteRef.current.toggle();
  };

  onClickOpenMergePopup = (e) => {
    this.openMergeRef.current.toggle();
  };

  render() {
    const {
      openCreateMenu,
      openPropertiesForm,
      openContactDetailsPopup,
      openAddNotePopup,
      openReplyPopup,
      openForwardPopup,
    } = this.state;
    return (
      <div className="servicedesk-dashboard-container">
        <div className="servicedesk-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <div className="page-heading">
                  <h1>Ticket Details</h1>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-right">
                <Rbac childName="CreateLink-TicketPlugin">
                  <a
                    href="#"
                    onClick={this.onClickOpenSubLink}
                    className="blue-button m-r-0 m-b-0 min-width-inherit width-auto create-btn"
                  >
                    Create
                  </a>
                </Rbac>
                {openCreateMenu == true && (
                  <div>
                    <div
                      className="open-full-screen"
                      onClick={this.onClickOpenSubLink}
                    ></div>
                    <div className="text-center open-create-menu">
                      <Rbac childName="CreateTicket-TicketPlugin">
                        <a onClick={this.onClickOpenNewTicket}>Ticket</a>
                      </Rbac>
                      <Rbac childName="CreateEmail-TicketPlugin">
                        <a onClick={this.onClickOpenNewEmail}>Email</a>
                      </Rbac>
                      <Rbac childName="CreateContact-TicketPlugin">
                        <a onClick={this.onClickOpenNewContact}>Contact</a>
                      </Rbac>
                      <Rbac childName="CreateCompany-TicketPlugin">
                        <a onClick={this.onClickOpenNewCompany}>Company</a>
                      </Rbac>
                      <Rbac childName="CreateAgent-TicketPlugin">
                        <a onClick={this.onClickOpenNewAgent}>Agent</a>
                      </Rbac>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="ticket-buttons">
              <button className="white-button">
                <i className="fa fa-ellipsis-v"></i>
              </button>
              <div className="group-buttons">
                <button
                  className="blue-button"
                  onClick={this.onClickOpenReplyPopup}
                >
                  Reply
                </button>
                <button
                  className="blue-button"
                  onClick={this.onClickOpenAddNotePopup}
                >
                  Add Note
                </button>
                <button
                  className="blue-button"
                  onClick={this.onClickOpenForwardPopup}
                >
                  Forward
                </button>
                <button
                  className="blue-button"
                  onClick={this.onClickOpenClosePopup}
                >
                  Close
                </button>
                <button
                  className="blue-button"
                  onClick={this.onClickOpenMergePopup}
                >
                  Merge
                </button>
                <button
                  className="blue-button"
                  onClick={this.onClickOpenDeletePopup}
                >
                  Detele
                </button>
                <button className="blue-button">Log Time</button>
                <button className="blue-button">Edit</button>
                <button className="blue-button">Print</button>
              </div>
              <div className="float-right properties-box">
                <button
                  className="blue-button m-r-0"
                  onClick={this.onClickOpenProperties}
                >
                  Properties
                </button>
                {openPropertiesForm == true && (
                  <div className="properties-form">
                    <div className="form-group">
                      <label htmlFor="Type">Type</label>
                      <select className="form-group-inner">
                        <option>Question</option>
                        <option>Question</option>
                        <option>Question</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="Status">Status*</label>
                      <select className="form-group-inner">
                        <option>Open</option>
                        <option>Open</option>
                        <option>Open</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="Priority">Priority</label>
                      <select className="form-group-inner">
                        <option>Medium</option>
                        <option>Medium</option>
                        <option>Medium</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="AssignTo">Assign to</label>
                      <select className="form-group-inner">
                        <option>Escalations / --</option>
                        <option>Escalations / --</option>
                        <option>Escalations / --</option>
                      </select>
                    </div>
                    <div className="form-group text-center">
                      <button className="blue-button m-r-0 m-b-0">
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {openAddNotePopup == true && (
                <div className="add-note-popup">
                  <div className="add-note-popup-bg"></div>
                  <div className="add-note-popup-inner">
                    <div className="form-group">
                      <label htmlFor="AddNote">Add Note</label>
                      <textarea className="input-group-text"></textarea>
                      <div className="formatting-options">
                        <a href="#">
                          <i className="fa fa-font"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-font"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-font"></i>
                        </a>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        className="blue-button m-b-0"
                        onClick={this.onClickOpenAddNotePopup}
                      >
                        Save
                      </button>
                      <button
                        className="white-button m-b-0"
                        onClick={this.onClickOpenAddNotePopup}
                      >
                        Discard draft
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {openReplyPopup == true && (
                <div className="reply-popup">
                  <div className="reply-popup-bg"></div>
                  <div className="reply-popup-inner">
                    <div className="d-inline-block replyto">
                      <i className="fa fa-reply"></i>
                      <strong className="d-inline-block">To</strong>
                      <div className="d-inline-block replyto-email">
                        George Roberts
                        <span>(george.roberts@mail.com)</span>
                        <i className="fa fa-times"></i>
                      </div>
                    </div>
                    <div className="float-right reply-to-links">
                      <a href="#">Cc</a>
                      <a href="#">Bcc</a>
                    </div>
                    <div className="subject-text">
                      <strong>Subject:</strong> Subject title of the mail
                    </div>
                    <div className="reply-ticket-detail-box">
                      <div className="ticket-detail-box">
                        <div className="ticket-detail-head">
                          <div className="row">
                            <div className="col-lg-7 col-sm-12">
                              <div
                                className="head-image"
                                onClick={this.onClickOpencontactDetails}
                              ></div>

                              {openContactDetailsPopup == true && (
                                <div className="contact-details-popup">
                                  <div className="head">
                                    <h4>Contact Details</h4>
                                    <a href="#">Edit</a>
                                  </div>
                                  <div className="contact-details">
                                    <div className="contact-profile">
                                      <div className="profile-image"></div>
                                      <div className="profile-name">
                                        Ingredia Nutrisha
                                      </div>
                                    </div>
                                    <div className="contact-detail">
                                      <span>Email ID</span>
                                      <p>support@nutrisha.com</p>
                                    </div>
                                    <div className="contact-detail">
                                      <span>Work Phone</span>
                                      <p>(+1) 852 200 5712</p>
                                    </div>
                                    <div className="contact-detail">
                                      <span>Time Logs</span>
                                    </div>
                                    <div className="contact-detail">
                                      <span>To - Do</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="head-text">
                                <p>
                                  <strong>
                                    Need to cange my shipping Address
                                  </strong>
                                </p>
                                <p>
                                  <span>Ingredia Nutrisha</span> reported in
                                  Issue
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-5 col-sm-12 text-right head-right-text">
                              <div className="head-time-text">
                                a day ago ( Wed 08 2018 at 08:15AM )
                              </div>
                              <button className="white-button">
                                <i className="fa fa-ellipsis-v"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="ticket-detail-text-box">
                          <strong>Hi,</strong>
                          <p>
                            I have to leave the city for a week and I’m afraid
                            nobody will be there to collect my order (#248) when
                            it arrives. Is there a way me I can change my
                            shopping address?
                          </p>
                          <span>Thanks.</span>
                        </div>
                      </div>
                      <div className="ticket-detail-box">
                        <div className="ticket-detail-head">
                          <div className="row">
                            <div className="col-lg-7 col-sm-12">
                              <div className="head-image"></div>
                              <div className="head-text">
                                <p>
                                  <strong>Customer Service</strong>
                                </p>
                                <p>
                                  Replied to{" "}
                                  <a href="#">nutrisha.21@maxamis.com</a>
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-5 col-sm-12 text-right head-right-text">
                              <div className="head-time-text">
                                a day ago ( Wed 08 2018 at 08:15AM )
                              </div>
                              <button className="white-button">
                                <i className="fa fa-ellipsis-v"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="ticket-detail-text-box">
                          <strong>Hi Ingredia,</strong>
                          <p>
                            You can change your shipping address as long as your
                            order has not been dispatched for delivary.
                            <br />
                            Follow these steps to change the details of your
                            order -
                          </p>
                          <ul>
                            <li>01. Go to my Orders.</li>
                            <li>
                              02. Click on the edit details icon for order which
                              you’d like update.
                            </li>
                            <li>
                              03. Update the required and click save changes.
                            </li>
                            <li>04. Click done after you’ve finished.</li>
                          </ul>
                          <p>
                            I hope this wes helpful. If you have further doubts,
                            feel free to reach out to me.
                          </p>
                          <span>Nutrisha.</span>
                        </div>
                      </div>
                      <div className="ticket-detail-box">
                        <div className="ticket-detail-head">
                          <div className="row">
                            <div className="col-lg-7 col-sm-12">
                              <div className="head-image"></div>
                              <div className="head-text">
                                <p>
                                  <strong>Ingredia Nutrisha</strong> Replied to{" "}
                                  <a href="#">nutrisha.21@maxamis.com</a>
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-5 col-sm-12 text-right head-right-text">
                              <div className="head-time-text">
                                a day ago ( Wed 08 2018 at 08:15AM )
                              </div>
                              <button className="white-button">
                                <i className="fa fa-ellipsis-v"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="ticket-detail-text-box">
                          <strong>Hi Nutrisha,</strong>
                          <p>Thank you so Much.</p>
                          <span>Ingredia Nutrisha</span>
                        </div>
                      </div>
                      <div className="formatting-options">
                        <a href="#">
                          <i className="fa fa-font"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-font"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-font"></i>
                        </a>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        className="blue-button m-b-0"
                        onClick={this.onClickOpenReplyPopup}
                      >
                        Save
                      </button>
                      <button
                        className="white-button m-b-0"
                        onClick={this.onClickOpenReplyPopup}
                      >
                        Discard draft
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {openForwardPopup == true && (
                <div className="reply-popup">
                  <div className="reply-popup-bg"></div>
                  <div className="reply-popup-inner">
                    <div className="d-inline-block replyto">
                      <strong className="d-inline-block">To</strong>
                      <div className="d-inline-block replyto-email">
                        Charles Hill
                        <span>(charles.hill@mail.com)</span>
                        <i className="fa fa-times"></i>
                      </div>
                    </div>
                    <div className="float-right reply-to-links">
                      <a href="#">Cc</a>
                      <a href="#">Bcc</a>
                    </div>
                    <div className="subject-text">
                      <strong>Subject:</strong> Need to change my shipping
                      Address
                    </div>
                    <div className="reply-ticket-detail-box">
                      <div className="forwarded-message">
                        <span>---------- Forwarded message ---------</span>
                        <ul>
                          <li>
                            <strong>Form:</strong> chris.watkins@mail.com
                          </li>
                          <li>
                            <strong>To:</strong> patricia.williamson@mail.com
                          </li>
                          <li>
                            <strong>Date:</strong> 06 August 2020 at 1:00 PM
                          </li>
                        </ul>
                      </div>
                      <div className="ticket-detail-box">
                        <div className="ticket-detail-head">
                          <div className="row">
                            <div className="col-lg-7 col-sm-12">
                              <div
                                className="head-image"
                                onClick={this.onClickOpencontactDetails}
                              ></div>

                              {openContactDetailsPopup == true && (
                                <div className="contact-details-popup">
                                  <div className="head">
                                    <h4>Contact Details</h4>
                                    <a href="#">Edit</a>
                                  </div>
                                  <div className="contact-details">
                                    <div className="contact-profile">
                                      <div className="profile-image"></div>
                                      <div className="profile-name">
                                        Ingredia Nutrisha
                                      </div>
                                    </div>
                                    <div className="contact-detail">
                                      <span>Email ID</span>
                                      <p>support@nutrisha.com</p>
                                    </div>
                                    <div className="contact-detail">
                                      <span>Work Phone</span>
                                      <p>(+1) 852 200 5712</p>
                                    </div>
                                    <div className="contact-detail">
                                      <span>Time Logs</span>
                                    </div>
                                    <div className="contact-detail">
                                      <span>To - Do</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="head-text">
                                <p>
                                  <strong>
                                    Need to cange my shipping Address
                                  </strong>
                                </p>
                                <p>
                                  <span>Ingredia Nutrisha</span> reported in
                                  Issue
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-5 col-sm-12 text-right head-right-text">
                              <div className="head-time-text">
                                a day ago ( Wed 08 2018 at 08:15AM )
                              </div>
                              <button className="white-button">
                                <i className="fa fa-ellipsis-v"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="ticket-detail-text-box">
                          <strong>Hi,</strong>
                          <p>
                            I have to leave the city for a week and I’m afraid
                            nobody will be there to collect my order (#248) when
                            it arrives. Is there a way me I can change my
                            shopping address?
                          </p>
                          <span>Thanks.</span>
                        </div>
                      </div>

                      <div className="formatting-options">
                        <a href="#">
                          <i className="fa fa-font"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-font"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-font"></i>
                        </a>
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        className="blue-button m-b-0"
                        onClick={this.onClickOpenForwardPopup}
                      >
                        Save
                      </button>
                      <button
                        className="white-button m-b-0"
                        onClick={this.onClickOpenForwardPopup}
                      >
                        Discard draft
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="ticket-detail-box">
              <div className="ticket-detail-head">
                <div className="row">
                  <div className="col-lg-7 col-sm-12">
                    <div
                      className="head-image"
                      onClick={this.onClickOpencontactDetails}
                    ></div>

                    {openContactDetailsPopup == true && (
                      <div className="contact-details-popup">
                        <div className="head">
                          <h4>Contact Details</h4>
                          <a href="#">Edit</a>
                        </div>
                        <div className="contact-details">
                          <div className="contact-profile">
                            <div className="profile-image"></div>
                            <div className="profile-name">
                              Ingredia Nutrisha
                            </div>
                          </div>
                          <div className="contact-detail">
                            <span>Email ID</span>
                            <p>support@nutrisha.com</p>
                          </div>
                          <div className="contact-detail">
                            <span>Work Phone</span>
                            <p>(+1) 852 200 5712</p>
                          </div>
                          <div className="contact-detail">
                            <span>Time Logs</span>
                          </div>
                          <div className="contact-detail">
                            <span>To - Do</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="head-text">
                      <p>
                        <strong>Need to cange my shipping Address</strong>
                      </p>
                      <p>
                        <span>Ingredia Nutrisha</span> reported in Issue
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-5 col-sm-12 text-right head-right-text">
                    <div className="head-time-text">
                      a day ago ( Wed 08 2018 at 08:15AM )
                    </div>
                    <button className="white-button">
                      <i className="fa fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ticket-detail-text-box">
                <strong>Hi,</strong>
                <p>
                  I have to leave the city for a week and I’m afraid nobody will
                  be there to collect my order (#248) when it arrives. Is there
                  a way me I can change my shopping address?
                </p>
                <span>Thanks.</span>
              </div>
            </div>
            <div className="ticket-detail-box">
              <div className="ticket-detail-head">
                <div className="row">
                  <div className="col-lg-7 col-sm-12">
                    <div className="head-image"></div>
                    <div className="head-text">
                      <p>
                        <strong>Customer Service</strong>
                      </p>
                      <p>
                        Replied to <a href="#">nutrisha.21@maxamis.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-5 col-sm-12 text-right head-right-text">
                    <div className="head-time-text">
                      a day ago ( Wed 08 2018 at 08:15AM )
                    </div>
                    <button className="white-button">
                      <i className="fa fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ticket-detail-text-box">
                <strong>Hi Ingredia,</strong>
                <p>
                  You can change your shipping address as long as your order has
                  not been dispatched for delivary.
                  <br />
                  Follow these steps to change the details of your order -
                </p>
                <ul>
                  <li>01. Go to my Orders.</li>
                  <li>
                    02. Click on the edit details icon for order which you’d
                    like update.
                  </li>
                  <li>03. Update the required and click save changes.</li>
                  <li>04. Click done after you’ve finished.</li>
                </ul>
                <p>
                  I hope this wes helpful. If you have further doubts, feel free
                  to reach out to me.
                </p>
                <span>Nutrisha.</span>
              </div>
            </div>
            <div className="ticket-detail-box">
              <div className="ticket-detail-head">
                <div className="row">
                  <div className="col-lg-7 col-sm-12">
                    <div className="head-image"></div>
                    <div className="head-text">
                      <p>
                        <strong>Ingredia Nutrisha</strong> Replied to{" "}
                        <a href="#">nutrisha.21@maxamis.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-5 col-sm-12 text-right head-right-text">
                    <div className="head-time-text">
                      a day ago ( Wed 08 2018 at 08:15AM )
                    </div>
                    <button className="white-button">
                      <i className="fa fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ticket-detail-text-box">
                <strong>Hi Nutrisha,</strong>
                <p>Thank you so Much.</p>
                <span>Ingredia Nutrisha</span>
              </div>
            </div>
            <div className="ticket-detail-box">
              <div className="ticket-detail-head">
                <div className="row">
                  <div className="col-lg-7 col-sm-12">
                    <div className="head-image"></div>
                    <div className="head-text">
                      <p>
                        <strong>Ingredia Nutrisha</strong> Replied this
                        Conversation
                      </p>
                      <p>Survey response for Default survey to Anne Richard</p>
                    </div>
                  </div>
                  <div className="col-lg-5 col-sm-12 text-right head-right-text">
                    <div className="head-time-text">
                      a day ago ( Wed 08 2018 at 08:15AM )
                    </div>
                    <button className="white-button">
                      <i className="fa fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ticket-detail-text-box">
                <p>
                  How would you rate your overall satification for the
                  resolution provided by the agent?
                </p>
                <span>Extremely Satisfied.</span>
              </div>
            </div>
            <div className="ticket-detail-box">
              <div className="ticket-detail-head">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="head-image"></div>
                    <div className="head-text">
                      <p>
                        From: <strong>RK Fabrication</strong>{" "}
                        (support@rkfabrication1574.com)
                      </p>
                      <p>
                        To: <span>nutrisha.21@maxamis.com</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ticket-detail-text-box">
                <strong>Hi,</strong>
                <p>
                  I have to leave the city for a week and I’m afraid nobody will
                  be there to collect my order (#248) when it arrives. Is there
                  a way me I can change my shopping address?
                </p>
                <span>Thanks.</span>
              </div>
            </div>
          </div>
        </div>
        <OpenNewContactPopup ref={this.openNewContactRef} />
        <OpenNewCompanyPopup ref={this.openNewCompanyRef} />
        <OpenNewEmailPopup ref={this.openNewEmailRef} />
        <OpenNewTicketPopup ref={this.openNewTicketRef} />
        <OpenNewAgentPopup ref={this.openNewAgentRef} />
        <OpenClosePopup ref={this.openCloseRef} />
        <OpenDeletePopup ref={this.openDeleteRef} />
        <OpenMergePopup ref={this.openMergeRef} />
      </div>
    );
  }
}

export default TicketsDetails;

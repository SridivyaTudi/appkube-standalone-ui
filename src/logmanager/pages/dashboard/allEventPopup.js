import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class AllEventsPopup extends React.Component {
  steps;
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeTab: 0,
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

  setActiveTab = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  render() {
    const { modal, activeTab } = this.state;
    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className="modal-container logmanager-modal-container"
      >
        <ModalHeader toggle={this.toggle}>
          All Events | <span>Manage Rules</span>
        </ModalHeader>
        <ModalBody
          style={{
            height: "calc(60vh - 50px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="d-block width-100 stream-popup-container">
            <div className="message-tabs-container">
              <span>Load a message to test Rule</span>
              <div className="messages-tabs">
                <ul>
                  <li
                    className={activeTab === 0 ? "active-tab" : ""}
                    onClick={(e) => this.setActiveTab(0)}
                  >
                    <a href="#">Recwnt Messages</a>
                  </li>
                  <li
                    className={activeTab === 1 ? "active-tab" : ""}
                    onClick={(e) => this.setActiveTab(1)}
                  >
                    <a href="#">Message ID</a>
                  </li>
                </ul>
                <div className="tab-container">
                  {activeTab === 0 && (
                    <div>
                      <div className="lod-messages">
                        Select an input from the list below and click "Lod
                        messages" to load the most recent message received by
                        this input within the last hour.
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <select className="input-group-text">
                              <option value="">Select input</option>
                              <option value="abc">ABC</option>
                              <option value="def">DEF</option>
                              <option value="hij">HIJ</option>
                              <option value="klm">KLM</option>
                            </select>
                            <button className="blue-button">
                              Load Messages
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div>
                      <div className="lod-messages">
                        Please provide the id and index of the message that you
                        want to load in this form.
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <select className="input-group-text">
                              <option value="">Message ID</option>
                              <option value="abc">ABC</option>
                              <option value="def">DEF</option>
                              <option value="hij">HIJ</option>
                              <option value="klm">KLM</option>
                            </select>
                            <select className="input-group-text">
                              <option value="">Index</option>
                              <option value="abc">ABC</option>
                              <option value="def">DEF</option>
                              <option value="hij">HIJ</option>
                              <option value="klm">KLM</option>
                            </select>
                            <button className="blue-button">
                              Load Messages
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="rules-defined">
              <div className="manage-rules">
                <div className="row">
                  <div className="col-lg-10 col-md-10 col-sm-12">
                    <h4>Manage Stream Rules</h4>
                    <span>
                      Please load a message to check if it would match against
                      these rules and therefore be routed into this stream.
                    </span>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12">
                    <button className="blue-button">Add Rules</button>
                  </div>
                </div>
              </div>
              <div className="check-group">
                <input type="radio" value="1" name="gender" />
                <label>
                  Stream containing all events created by synectics Log
                  Managment
                </label>
              </div>
              <div className="check-group">
                <input type="radio" value="2" name="gender" />
                <label>
                  Stream containing all events created by synectics Log
                  Managment
                </label>
              </div>
              <div className="no-rules-defined">
                <i className="fa fa-info-circle"></i>
                <span>No rules defined</span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="d-block text-right p-t-20 contact-popup-buttons">
                  <button className="cancel" onClick={this.handleClose}>
                    Cancel
                  </button>
                  <button className="save">Save</button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default AllEventsPopup;

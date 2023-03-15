import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';

class OpenMergePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
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

  render() {
    const { modal } = this.state;
    return (
      <Modal isOpen={modal} toggle={this.toggle} className="modal-container servicdesk-modal-container">
        <button className="close-btn" onClick={this.handleClose}>
          X
        </button>
        <ModalBody style={{ height: 'calc(65vh - 20px)', overflowY: 'auto', overflowX: 'hidden' }}>
          <div className="ticket-details-popup-container">
            <div className="d-block p-b-20 heading">
              <div className="d-block width-100">
                <h4 className="d-block">Merge Ticket</h4>
              </div>
            </div>
            <div className="merge-ticket-container">
              <div className="d-block ticket-heading">
                1 ticket selected, secondary ticket will be added to primary ticket.
              </div>
              <div className="d-block ticket-box">
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-sm-2">
                    <button className="blue-button">Remove</button>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-7">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 heading">
                        <h5>213444 Ticket details</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 text">
                        <span>Group:</span>
                        <p>Esclations</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 text">
                        <span>Agent:</span>
                        <p>John</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 text">
                        <span>Agent responded:</span>
                        <p>7 days ago</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 text">
                        <span>Overdue by:</span>
                        <p>4 days</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3">
                    <div className="form-check">
                      <input type="radio" name="MakePrimary" value="MakePrimary" className="form-check-input" />
                      <label className="form-check-label" htmlFor="MakePrimary">
                        Make Primary
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block p-t-10">
                <div className="row">
                  <div className="col-lg-9 col-md-9 col-sm-9">
                    <div className="form-group">
                      <input type="text" placeholder="Search contact's tickets" className="input-group-text" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3">
                    <div className="form-group">
                      <select className="input-group-text">
                        <option value="1">Contact</option>
                        <option value="2">Subject</option>
                        <option value="3">ID</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block ticket-box">
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-sm-2">
                    <button className="blue-button">Remove</button>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-7">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 heading">
                        <h5>213444 Ticket details</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 text">
                        <span>Group:</span>
                        <p>Esclations</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 text">
                        <span>Agent:</span>
                        <p>John</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 text">
                        <span>Agent responded:</span>
                        <p>3 days ago</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 text">
                        <span>Overdue by:</span>
                        <p>2 days</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3">
                    <div className="form-check">
                      <input type="radio" name="MakePrimary" value="MakePrimary" className="form-check-input" />
                      <label className="form-check-label" htmlFor="MakePrimary">
                        Make Primary
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-block p-t-20">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="d-block form-check recipient">
                      <input type="checkbox" className="form-check-input" id="recipient" />
                      <label className="form-check-label" htmlFor="recipient">
                        CC to Secondary ticket recipient.
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="d-block text-right">
                      <button className="white-button cancel" onClick={this.handleClose}>
                        Cancel
                      </button>
                      <button className="blue-button m-r-0">Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
export default OpenMergePopup;
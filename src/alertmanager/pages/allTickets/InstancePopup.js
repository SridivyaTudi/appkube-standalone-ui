import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

export class InstancePopup extends Component {
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

  setActiveTab = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  render() {
    const state = this.state;
    return (
      <Modal isOpen={state.modal} toggle={this.toggle} className="modal-container alert-modal-container">
        <ModalHeader toggle={this.toggle}>#144 - Instance ID: I-3545frds489</ModalHeader>
        <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: 'hidden' }}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={`${state.activeTab === 0 ? 'active' : ''}`}
                onClick={() => {
                  this.setActiveTab(0);
                }}
              >
                Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${state.activeTab === 1 ? 'active' : ''}`}
                onClick={() => {
                  this.setActiveTab(1);
                }}
              >
                Activity Log
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={state.activeTab}>
            <TabPane tabId={0}>
              <div className="m-l-2">
                <div className="row m-b-1">
                  <div className="col-sm-3 bold-label gray-label">#Ticket</div>
                  <div className="col-sm-6 bold-label gray-label">144</div>
                </div>
                <div className="row m-b-1">
                  <div className="col-sm-3 bold-label gray-label">User</div>
                  <div className="col-sm-6 gray-label">Unassigned</div>
                </div>
                <div className="row m-b-1">
                  <div className="col-sm-3 bold-label gray-label">Last updated at</div>
                  <div className="col-sm-6 gray-label">01/04/2020, 13:38:00</div>
                </div>
                <div className="row m-b-1">
                  <div className="col-sm-3 bold-label gray-label">Description</div>
                  <div className="col-sm-6 gray-label">
                    AWS EC2 Instance stopped
                    <br />
                    Instance ID: I-3546frds4894
                  </div>
                </div>
                <div className="row m-b-1">
                  <div className="col-sm-3 bold-label gray-label">Severity</div>
                  <div className="col-sm-6 gray-label">
                    <div className="severity-critical bold-label colored-label">Critical</div>
                  </div>
                </div>
                <div className="row m-b-1">
                  <div className="col-sm-3 bold-label gray-label">Action</div>
                  <div className="col-sm-6 gray-label">No action taken</div>
                </div>
                <div className="row m-b-1">
                  <div className="col-sm-3 bold-label gray-label">Result</div>
                  <div className="col-sm-6 gray-label">--</div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId={1}></TabPane>
            <div>
              <button className="btn btn-secondary m-l-2 m-t-2">Close Ticket</button>
            </div>
          </TabContent>
        </ModalBody>
      </Modal>
    );
  }
}

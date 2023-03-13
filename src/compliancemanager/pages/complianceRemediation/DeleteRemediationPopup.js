import React, {Component} from 'react';
//import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteRemediationPopup extends Component{
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

  render() {
    const state = this.state;
    return (
      <Modal isOpen={state.modal} toggle={this.toggle} className="modal-container assessments-modal-container">
        <ModalHeader toggle={this.toggle}>Delete Remediation</ModalHeader>
        <ModalBody style={{ overflowY: 'auto', overflowX: 'hidden' }}>
          <p>
            You are about to delete Remediation for cloud account '*' and ruleset 'AWS CIS Foundations v. 1.0.0', are
            you sure?
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="d-block text-center">
            <button className="blue-button m-r-0 m-b-0">Delete</button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
export default DeleteRemediationPopup;

import React, {Component} from 'react';
//import * as React from 'react';
import { Modal, ModalBody } from 'reactstrap';

export class DeleteTabPopup extends Component {
  steps;
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

  deleteData = () => {
    this.props.deleteDataFromSidebar();
    this.toggle();
  };

  render() {
    const { modal } = this.state;
    const { deleteContent, isLoading } = this.props;
    return (
      <Modal isOpen={modal} toggle={this.toggle} className="modal-container analytics-modal-container">
        <h4 className="warning-heading">
          <i className="fa fa-exclamation-circle"></i>Warning
        </h4>
        <ModalBody style={{ height: 'calc(30vh - 50px)', overflowY: 'auto', overflowX: 'hidden' }}>
          <div className="d-block width-100 warning-content">
            <p>{deleteContent}</p>
          </div>
          <div className="d-block text-center p-t-20">
            <button className="asset-gray-button cancel" onClick={this.handleClose}>
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={this.deleteData}
              className={`asset-blue-button m-r-0 continue ${isLoading ? 'disabled' : ''}`}
            >
              Continue
            </button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default DeleteTabPopup;

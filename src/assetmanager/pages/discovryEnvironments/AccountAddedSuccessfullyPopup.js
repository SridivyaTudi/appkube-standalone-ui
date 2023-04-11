import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SuccessfullyPopupIcon from'../../../assets/img/successfully-popup-icon.png';

export class AccountAddedSuccessfullyPopup extends Component {
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
      <Modal
        onClick={this.props.toggle}
        style={{ borderRadius: "0px" }}
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className="modal-container discovry-enronment-container"
      >
        <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
         <div className="added-successfully-contant">
            <div className="d-block text-center">
            <img src={SuccessfullyPopupIcon} alt="" />
            <p className="m-t-1"> <strong>Account added Successfully</strong></p>
            </div>
         </div>
        </ModalBody>
        
      </Modal>
    );
  }
}

export default AccountAddedSuccessfullyPopup;

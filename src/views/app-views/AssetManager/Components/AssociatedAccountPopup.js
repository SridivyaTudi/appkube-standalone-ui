import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import featuredIcon from "../../../../assets/img/featured-icon.png";
import CreateNewOuPopup from "./CreateNewOuPopup";

class AssociatedAccountPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
    };
    this.createNewOuModalRef = React.createRef();
  }

  onClickCreateNewOu = () => {
    this.createNewOuModalRef.current.toggle();
    this.toggle();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const state = this.state;
    return (
      <>
        <Modal
          isOpen={state.modal}
          toggle={this.toggle}
          className="select-account-modal-container"
        >
          <ModalHeader>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.toggle}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </ModalHeader>
          <ModalBody>
            <p className="text-center m-b-0" style={{ marginTop: '-30px' }}>
              <img src={featuredIcon} alt="" />
            </p>
            <h4 className="text-center m-b-0 m-t-2">You don't have any associated OU account</h4>
            <p className="text-center">
              It seems that we do not currently have any associated OU account in our records. if you require further assistance, please reach out to our customer support team.
            </p>
          </ModalBody>
          <ModalFooter className="footer-top-bar">
            <div className="d-block text-center">
              <button
                className="white-outline"
              >
                Contact Support
              </button>
              <button
                className="blue-button"
                onClick={() => this.onClickCreateNewOu("")}
              >
                Create New OU
              </button>
            </div>
          </ModalFooter>
        </Modal>
        <CreateNewOuPopup ref={this.createNewOuModalRef} addModalOpen={() => {
          this.onClickCreateNewOu('')
        }} newDepartmentAppend={this.props.newDepartmentAppend} />
      </>
    );
  }
}
export default AssociatedAccountPopup;

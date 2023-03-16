import React from "react";
import { Modal, ModalBody } from "reactstrap";
import CustomTextareabox from "./CustomTextareabox";

class OpenClosePopup extends React.Component {
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
  render() {
    const { modal } = this.state;
    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className="modal-container servicdesk-modal-container"
      >
        <button className="close-btn" onClick={this.handleClose}>
          X
        </button>
        <ModalBody
          style={{
            height: "calc(52vh - 20px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="ticket-details-popup-container">
            <div className="d-block p-b-20 heading">
              <div className="d-block width-100">
                <h4 className="d-block">Close ticket</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="description">
                    Write comment for closing this ticket.
                  </label>
                  <CustomTextareabox
                    containerClass="form-group-inner"
                    inputClass="form-control textarea"
                    htmlFor="comment"
                    id="comment"
                    name="comment"
                    value=""
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="d-block text-center p-t-20">
                  <button className="blue-button">Confirm</button>
                  <button
                    className="white-button cancel"
                    onClick={this.handleClose}
                  >
                    Cancel
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

export default OpenClosePopup;

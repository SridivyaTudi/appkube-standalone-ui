import React from "react";
import { Modal, ModalBody } from "reactstrap";

class OpenDeletePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      openSuccessfully: false,
      openSuccessfullyHide: true,
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

  onClickOpenSuccessfully = () => {
    let successfully = !this.state.openSuccessfully;
    let successfullyHide = !this.state.openSuccessfullyHide;
    this.setState({
      openSuccessfully: successfully,
      openSuccessfullyHide: successfullyHide,
    });
  };

  render() {
    const { modal, openSuccessfully, openSuccessfullyHide } = this.state;
    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className="modal-container servicdesk-modal-container"
      >
        <button className="close-btn" onClick={this.handleClose}>
        <i class="fal fa-times"></i>
        </button>
        <ModalBody
          style={{
            height: "calc(25vh - 20px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="ticket-details-popup-container">
            {openSuccessfullyHide == true && (
              <div className="d-block width-100">
                <div className="d-block p-b-20 heading">
                  <div className="d-block width-100">
                    <h4 className="d-block">
                      Are you sure you want to delete this ticket?
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="d-block text-center p-t-20">
                      <button
                        className="blue-button"
                        onClick={this.onClickOpenSuccessfully}
                      >
                        Yes
                      </button>
                      <button
                        className="blue-button cancel"
                        onClick={this.handleClose}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {openSuccessfully == true && (
              <div className="d-block width-100 successfully-heading">
                <strong className="d-block text-center">
                  You have successfully deleted this ticket.
                </strong>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default OpenDeletePopup;

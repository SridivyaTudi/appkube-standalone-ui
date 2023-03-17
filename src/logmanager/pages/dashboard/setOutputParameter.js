import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class SetOutputPopup extends React.Component {
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
        className="modal-container logmanager-modal-container"
      >
        <ModalHeader toggle={this.toggle}>
          All Events | <span>Manage Output</span>
        </ModalHeader>
        <ModalBody
          style={{
            height: "calc(60vh - 50px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="d-block width-100 stream-popup-container">
            <div className="popup-parameters-container">
              <span>Set your output Parameters here</span>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-lg-7 col-md-7 col-sm-7">
                        <select className="input-group-text">
                          <option value="">Select Output Type</option>
                          <option value="stdout">STDOUT Output</option>
                          <option value="gelf">GELF Outputs</option>
                        </select>
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5 p-l-0 p-r-0">
                        <button className="blue-button m-r-0 m-b-0">
                          Lunch New Output
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-lg-7 col-md-7 col-sm-7">
                        <select className="input-group-text">
                          <option value="">Select existing Output</option>
                          <option value="">No output Available</option>
                        </select>
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5 p-l-0 p-r-0">
                        <button className="blue-button m-r-0 m-b-0">
                          Assign existing output
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rules-defined">
                <div className="no-rules-defined">
                  <i className="fa fa-info-circle"></i>
                  <span>No rules defined</span>
                </div>
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

export default SetOutputPopup;

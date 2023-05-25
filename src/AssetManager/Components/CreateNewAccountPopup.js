import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./SelectAccountPopup.css";

class CreateNewAccountPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  setLink = (link) => {
    this.setState({
      link,
    });
  };

  render() {
    const state = this.state;
    return (
      <Modal
        isOpen={state.modal}
        toggle={this.toggle}
        className="select-account-modal-container"
      >
        <ModalHeader>
          Create New OU
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.toggle}
          >
            <i class="fal fa-times"></i>
          </button>
        </ModalHeader>
        <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name OF OU"
            />
          </div>
          <h4 className="text-left m-b-1">Select The Account Or OU Below</h4>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-left">
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>HR</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Production</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>HR</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Production</label>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <div className="d-block text-center">
            {/* {state.link && (
              
            )} */}
            <button className="gray-button m-r-1 m-b-0" onClick={this.toggle}>
              Clear
            </button>
            <Link
              to={`${state.link}`}
              onClick={this.toggle}
              className="new-button m-b-0"
            >
              Add
            </Link>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CreateNewAccountPopup;

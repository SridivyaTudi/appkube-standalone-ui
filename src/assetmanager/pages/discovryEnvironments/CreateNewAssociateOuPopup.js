import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class CreateNewAssociateOuPopup extends Component {
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

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  render() {
    const state = this.state;
    return (
      <Modal style={{ borderRadius: "0px" }}
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className="modal-container discovry-enronment-container" 
      >
        <ModalHeader>
          <strong>Create New Organizational Unit</strong>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.props.toggle}
          >
            <i class="fal fa-times"></i>
          </button>
        </ModalHeader>
        <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
          <div className="form-group">
            <label>Display Name</label>
            <input
              className="input-group-text"
              type="text"
              name="displayName"
            //   value={displayName}
              placeholder="Name of OU"
              onChange={this.handleStateChange}
            ></input>
          </div>
          <p>Select the Account or OU below</p>
          <div className="select-synectiks">
          <div onClick={this.toggleMenu} className="open-close-menu">
              <div className="caret-right"></div>
              {/* <div className="caret-down"></div> */}
              <strong>Synectiks</strong>
            </div>
            {this.state.showMenu == true && (
              <div className="menu-list">
                <ul>
                  <li>
                    <a href="#">
                      <strong>Finance</strong>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <strong>IT Networking</strong>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <strong>Monitoring</strong>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-block ">
            <button
              className="blue-button m-r-2 m-b-0"
              onClick={this.props.toggle}
            >
              Cancel
            </button>
            <button
              className="blue-button m-r-0 m-b-0"
              onClick={this.props.toggle}
            >
              create
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateNewAssociateOuPopup;

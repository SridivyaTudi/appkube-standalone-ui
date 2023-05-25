import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./SelectAccountPopup.css";

class SelectDepartmentPopup extends Component {
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
          Filter
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
          <h4 className="text-left m-b-1">Select Department</h4>
          <div className="row border-bottom">
            <div className="col-lg-4 col-md-4 col-sm-12 text-left">
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>HR</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Production</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 text-left">
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Finance</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Marketing</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 text-left">
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>IT</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Operations</label>
              </div>
            </div>
          </div>
          <h4 className="text-left m-b-1 m-t-1">Select Production</h4>
          <div className="row border-bottom">
            <div className="col-lg-4 col-md-4 col-sm-12 text-left">
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>HRMS</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>CMS</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 text-left">
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Procurement</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>HMS</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 text-left">
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>WeDesk</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>AppCube</label>
              </div>
            </div>
          </div>
          <h4 className="text-left m-b-1 m-t-1">Select Environment</h4>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12 text-left">
              <div className="environment-box active">
                <div className="d-block">
                  <div className="envir-image department"></div>
                  <div className="environment-title">Department</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 text-left">
              <div className="environment-box">
                <div className="d-block">
                  <div className="envir-image testing"></div>
                  <div className="environment-title">Testing</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 text-left">
              <div className="environment-box">
                <div className="d-block">
                  <div className="envir-image stage"></div>
                  <div className="environment-title">Stage</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 text-left">
              <div className="environment-box">
                <div className="d-block">
                  <div className="envir-image production"></div>
                  <div className="environment-title">Production</div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <div className="d-block text-center">
            <button className="gray-button m-r-1 m-b-0" onClick={this.toggle}>
              Clear
            </button>
            <Link
              to={`${state.link}`}
              onClick={this.toggle}
              className="new-button m-b-0"
            >
              Submit
            </Link>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
export default SelectDepartmentPopup;

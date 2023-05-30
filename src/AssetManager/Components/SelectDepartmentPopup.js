import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./SelectAccountPopup.css";

const departments = [
  "HR",
  "Finance",
  "IT",
  "Production",
  "Marketing",
  "Operations",
];

const production = ["HRMS", "Procurement", "WeDesk", "CMS", "AppCube", "HMS"];

const environments = [
  { img: "department", name: "Department" },
  { img: "testing", name: "Testing" },
  { img: "stage", name: "Stage" },
  { img: "production", name: "Production" },
];

class SelectDepartmentPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
      selectedDepartments: [],
      selectedProductions: [],
      selectedEnvs: [],
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      selectedDepartments: [],
      selectedProductions: [],
      selectedEnvs: [],
    });
  };

  setLink = (link) => {
    this.setState({
      link,
    });
  };

  handleCheckChange = (e, type) => {
    const { value, checked } = e.target;
    let { selectedDepartments, selectedProductions } = this.state;
    if (type === "dep") {
      if (checked) {
        this.setState((prevState) => ({
          selectedDepartments: [...prevState.selectedDepartments, value],
        }));
      } else {
        let newChecked = selectedDepartments.filter((item) => item !== value);
        this.setState({
          selectedDepartments: newChecked,
          selectedProductions: [],
          selectedEnvs: [],
        });
      }
    } else if (type === "prod") {
      if (checked) {
        this.setState((prevState) => ({
          selectedProductions: [...prevState.selectedProductions, value],
        }));
      } else {
        let newChecked = selectedProductions.filter((item) => item !== value);
        this.setState({ selectedProductions: newChecked });
      }
    }
  };

  handleEnvChange = (name) => {
    const { selectedEnvs } = this.state;
    let isDuplicate = selectedEnvs.map((item) => {
      if (item === name) {
        return true;
      } else {
        return false;
      }
    });
    if (isDuplicate === false) {
      this.setState((prevState) => ({
        selectedEnvs: [...prevState.selectedEnvs, name],
      }));
    } else {
      console.log(selectedEnvs);
    }
  };

  render() {
    const { selectedProductions, selectedDepartments, selectedEnvs } =
      this.state;
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
            {departments.map((item) => {
              return (
                <div className="col-lg-4 col-md-4 col-sm-12 text-left">
                  <div className="d-flex align-items-center p-b-10">
                    <input
                      type="checkbox"
                      value={item}
                      onChange={(e) => this.handleCheckChange(e, "dep")}
                    />
                    <label>{item}</label>
                  </div>
                </div>
              );
            })}
          </div>
          {selectedDepartments.length ? (
            <>
              <h4 className="text-left m-b-1 m-t-1">Select Production</h4>
              <div className="row border-bottom">
                {production.map((item) => {
                  return (
                    <div className="col-lg-4 col-md-4 col-sm-12 text-left">
                      <div className="d-flex align-items-center p-b-10">
                        <input
                          type="checkbox"
                          value={item}
                          onChange={(e) => this.handleCheckChange(e, "prod")}
                        />
                        <label>{item}</label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <></>
          )}

          {selectedProductions.length && selectedDepartments.length ? (
            <>
              <h4 className="text-left m-b-1 m-t-1">Select Environment</h4>
              <div className="row">
                {environments.map((item) => {
                  return (
                    <div className="col-lg-3 col-md-4 col-sm-12 text-left">
                      <div
                        onClick={() => this.handleEnvChange(item.name)}
                        className={`environment-box active`}
                      >
                        <div className="d-block">
                          <div className={`envir-image ${item.img}`}></div>
                          <div className="environment-title">{item.name}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <div className="d-block text-center">
            <button className="gray-button m-r-1 m-b-0" onClick={this.toggle}>
              Clear
            </button>
            {selectedEnvs.length ? (
              <Link
                to={`${state.link}`}
                onClick={this.toggle}
                className="new-button m-b-0"
              >
                Submit
              </Link>
            ) : (
              <></>
            )}
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
export default SelectDepartmentPopup;

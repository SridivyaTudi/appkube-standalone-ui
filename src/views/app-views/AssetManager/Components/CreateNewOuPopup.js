import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import config from "../../config";
import { RestService } from "../../Services/RestService";
import { ToastMessage } from "../../../../Toast/ToastMessage";

class CreateNewOuPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
      initailValidationFlag: false,
      loadingData: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      name: null,
      description: null,
      initailValidationFlag: false,
    });
  };

  createDepartMent = () => {
    this.setState({ loadingData: true });
    let organizationId = 1;
    if (localStorage.getItem("currentOrgId")) {
      organizationId = localStorage.getItem("currentOrgId");
    }
    let postData = {
      name: this.state.name,
      description: this.state.description,
      organization: {
        id: organizationId,
      },
    };
    RestService.postData(config.ADD_DEPARTMENT, postData).then((response) => {
      ToastMessage("Organizational Unit Successfully created.", "success");
      this.setState({
        newDepartment: "",
        departments: [response].concat(this.state.departments),
        initailFlag: true,
        loadingData: false,
      });
      this.props.newDepartmentAppend(response, this.state.description);
      this.toggle();
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
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label className="label">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Synectiks01"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />

            <span className="red">
              {(!this.state.name && !this.state.description) ||
              this.state.initailValidationFlag
                ? this.state.name == ""
                  ? "Name of Ou is required"
                  : ""
                : this.state.name == ""
                ? "Name of Ou is required"
                : ""}
            </span>
          </div>
          <div className="form-group">
            <label className="label">Description</label>
            <textarea
              className="form-control"
              placeholder="director is a senior exqcutive responsible for overseeing the strategic department."
              onChange={(e) => {
                this.setState({ description: e.target.value });
              }}
            >
              {this.state.description}
            </textarea>

            <span className="red">
              {(!this.state.name && !this.state.description) ||
              this.state.initailValidationFlag
                ? this.state.description == ""
                  ? "Desciption of Ou is required"
                  : ""
                : this.state.description == ""
                ? "Desciption of Ou is required"
                : ""}
            </span>
          </div>
        </ModalBody>
        <ModalFooter className="footer-top-bar">
          <div className="d-block text-right">
            <button
              className="gray-outline"
              onClick={() => {
                this.setState({
                  initailValidationFlag: false,
                  name: "",
                  description: "",
                });
                this.toggle();
              }}
            >
              Cancel
            </button>
            <button
              className={
                this.state.loadingData ? "blue-button disabled" : "blue-button"
              }
              onClick={() => {
                if (
                  !this.state.name &&
                  !this.state.description &&
                  !this.state.initailValidationFlag
                ) {
                  this.setState({
                    initailValidationFlag: true,
                    name: "",
                    description: "",
                  });
                } else if (this.state.name) {
                  if (
                    this.state.name != "" &&
                    this.state.description != "" &&
                    !this.state.loadingData
                  ) {
                    this.createDepartMent();
                  }
                }
              }}
            >
              {this.state.loadingData ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                ""
              )}{" "}
              Create
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CreateNewOuPopup;

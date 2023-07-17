import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastMessage } from "../../../../../Toast/ToastMessage";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { getCurrentOrgId } from "utils";
import { createNewOU } from "redux/newAccountSetup/newAccountSetupThunk";
import { connect } from "react-redux";
import status from "redux/constants/commonDS";

class CreateNewOuPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      formData: {
        name: "",
        description: "",
      },
    };
  }

  createDepartMent = () => {
    this.setState({
      isSubmit: true,
    });
    const { isValid } = this.validate(true);
    const { formData } = this.state;
    if (isValid) {
      let organizationId;
      if (getCurrentOrgId()) {
        organizationId = getCurrentOrgId();
      }
      let postData = {
        name: formData.name,
        organizationId: Number(organizationId),
      };
      this.props.createNewOU(postData);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.createOu.status !== this.props.createOu.status) {
      if (this.props.createOu.status === status.SUCCESS) {
        ToastMessage.success("Organizational Unit Successfully created!");
        this.props.newDepartmentAppend(
          this.props.createOu.data,
          this.state.description
        );
        this.props.toggleCreateNewOuPopup();
        this.setState({
          isSubmit: false,
          formData: {
            name: "",
            description: "",
          },
        });
      } else if (this.props.createOu.status === status.FAILURE) {
        ToastMessage.error("Organizational Unit Creation failed!");
      }
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  validate = (isSubmit) => {
    let isValid = true;
    const { formData } = this.state;
    let errors = {};
    if (isSubmit) {
      if (!formData.name) {
        isValid = false;
        errors = { ...errors, name: "OU Name is required!" };
      } else {
        errors = { ...errors, name: "" };
      }

      if (!formData.description) {
        isValid = false;
        errors = { ...errors, description: "OU Description is required!" };
      } else {
        errors = { ...errors, description: "" };
      }
    }
    return { errors, isValid };
  };

  render() {
    const { formData, isSubmit } = this.state;
    const { isValid, errors } = this.validate(isSubmit);
    return (
      <Modal
        isOpen={this.props.toggleCreateNewOuPopupShow}
        toggle={this.props.toggleCreateNewOuPopup}
        className="select-account-modal-container"
      >
        <ModalHeader>
          Create New OU
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.props.toggleCreateNewOuPopup}
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
              name="name"
              placeholder="Synectiks01"
              value={formData.name}
              onChange={this.handleInput}
            />
            <span className="red">
              {isSubmit && !isValid && errors.name ? errors.name : ""}
            </span>
          </div>
          <div className="form-group">
            <label className="label">Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="director is a senior exqcutive responsible for overseeing the strategic department."
              value={formData.description}
              onChange={this.handleInput}
            >
              {this.state.description}
            </textarea>
            <span className="red">
              {isSubmit && !isValid && errors.description
                ? errors.description
                : ""}
            </span>
          </div>
        </ModalBody>
        <ModalFooter className="footer-top-bar">
          <div className="d-block text-right">
            <Button
              className="secondary-text-btn m-r-2"
              variant="contained"
              onClick={this.props.toggleCreateNewOuPopup}
            >
              Cancel
            </Button>
            <LoadingButton
              disabled={
                this.props.createOu.status === status.IN_PROGRESS ? true : false
              }
              loading={
                this.props.createOu.status === status.IN_PROGRESS ? true : false
              }
              className="primary-btn"
              loadingPosition="start"
              variant="contained"
              onClick={this.createDepartMent}
            >
              Create
            </LoadingButton>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { newAccountSetup } = state;
  return newAccountSetup;
};

const mapDispatchToProps = {
  createNewOU,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewOuPopup);

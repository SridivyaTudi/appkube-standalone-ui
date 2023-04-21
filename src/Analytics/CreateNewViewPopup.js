import React, {Component} from 'react';
//import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import  CustomTextbox from '../Analytics/Components/CustomTextbox';
import CustomTextarea  from '../Analytics/Components/CustomTextarea';
//import { locationService } from '@grafana/runtime';
export class CreateNewViewPopup extends Component {
  steps;
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewName: '',
      description: '',
      isSubmitted: false,
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

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: '',
    };
    let isValid = true;
    const retData = {
      viewName: validObj,
      description: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { viewName, description } = this.state;
      if (!viewName) {
        retData.viewName = {
          isValid: false,
          message: 'Name is required',
        };
        isValid = false;
      }
      if (!description) {
        retData.description = {
          isValid: false,
          message: 'Description is required',
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      const { viewName, description } = this.state;
      localStorage.setItem('viewData', JSON.stringify({ viewName, description }));
      //locationService.push('/analytics/new/dashboard');
      // window.location.assign('/analytics/f/new');
    }
  };

  render() {
    const { modal, viewName, description, isSubmitted } = this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <Modal isOpen={modal} toggle={this.toggle} className="modal-container analytics-modal-container">
        <ModalHeader>
          Creating New View
          <button type="button" className="close" aria-label="Close" onClick={this.toggle}>
          <i class="fal fa-times"></i>
          </button>
        </ModalHeader>
        <ModalBody style={{ height: 'calc(54vh - 50px)', overflowY: 'auto', overflowX: 'hidden' }}>
          <div className="d-block width-100">
            <div className="form-group">
              <label htmlFor="viewName">View Name</label>
              <CustomTextbox
                containerClass="position-relative"
                inputClass="input-group-text"
                htmlFor="viewName"
                id="viewName"
                placeholder=""
                name="viewName"
                value={viewName}
                onChange={this.handleStateChange}
                isValid={errorData.viewName.isValid}
                message={errorData.viewName.message}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <CustomTextarea
                containerClass="position-relative"
                inputClass="input-group-text"
                htmlFor="description"
                id="description"
                placeholder=""
                name="description"
                value={description}
                onChange={this.handleStateChange}
                isValid={errorData.description.isValid}
                message={errorData.description.message}
              />
            </div>
            <div className="d-block text-right">
              <button className="asset-gray-button cancel" onClick={this.handleClose}>
                Cancel
              </button>
              <button className="asset-blue-button m-r-0 continue" onClick={this.handleSubmit}>
                Continue
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
export default CreateNewViewPopup;

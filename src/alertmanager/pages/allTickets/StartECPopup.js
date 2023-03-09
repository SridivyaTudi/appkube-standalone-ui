import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';

export class StartECPopup extends Component {
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
    const state = this.state;
    return (
      <Modal isOpen={state.modal} toggle={this.toggle} className="modal-container alert-modal-container">
        <button className="close-btn" onClick={this.handleClose}>
          X
        </button>
        <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: 'hidden' }}>
          <div className="d-block width-100 contact-popup-container select-resource-container">
            <div className="d-block width-100 p-b-20 heading">
              <h4 className="d-block">Start EC2</h4>
              <span className="d-block">
                This Job executes start EC2 action whenever a CloudWatch Events alert with "Instance Stopped" message is
                received
              </span>
            </div>

            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="enablejob" />
              <label className="form-check-label" htmlFor="enablejob">
                Enable Job
              </label>
            </div>
            <div className="bold-label gray-label">If following conditions are met</div>
            <select className="form-control col-sm-9 m-t-1">
              <option>Default select</option>
            </select>
            <div className="form-row m-t-1">
              <div className="form-group filter-control-group col-sm-3">
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group filter-control-group col-sm-3">
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group filter-control-group col-sm-3">
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="col-sm-3 pointer-label">
                <i className="fa fa-times"></i>
              </div>
            </div>
            <div className="form-row m-t-1">
              <div className="form-group filter-control-group col-sm-3">
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group filter-control-group col-sm-3">
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group filter-control-group col-sm-3">
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="col-sm-3 pointer-label">
                <i className="fa fa-times"></i>
              </div>
            </div>
            <div className="m-t-1 m-b-2">
              <button className="btn btn-secondary">Add new condition</button>
            </div>
            <div className="bold-label gray-label">Then</div>
            <div className="gray-label m-b-2">
              Execute an action
              <select className="form-control" style={{ width: '200px', display: 'inline-block', margin: '0px 10px' }}>
                <option>Start EC2 Instance</option>
              </select>
              Automatically
              <select className="form-control" style={{ width: '200px', display: 'inline-block', margin: '0px 10px' }}>
                <option value="">20 min</option>
              </select>
              after alert is created.
            </div>
            <div className="d-block text-right p-t-20 contact-popup-buttons">
              <button className="cancel" onClick={this.handleClose}>
                Cancel
              </button>
              <button className="save">Create &amp; Enable</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

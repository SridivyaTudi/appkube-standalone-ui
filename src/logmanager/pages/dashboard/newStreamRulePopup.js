import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class NewStreamRulePopup extends React.Component {
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
        <ModalHeader>
          New Stream Rule
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.toggle}
          >
            <span aria-hidden="true">x</span>
          </button>
        </ModalHeader>
        <ModalBody
          style={{
            height: "calc(60vh - 50px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="d-block width-100 stream-popup-container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="field">Field</label>
                  <input
                    type="text"
                    id="field"
                    name="field"
                    className="input-group-text"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select className="input-group-text">
                    <option value="match exactly">Match Exactly</option>
                    <option value="match regular expression">
                      Match regular expression
                    </option>
                    <option value="greaterthan">Grater than</option>
                    <option value="smallerthan">Smaller than</option>
                    <option value="field presence">Field Presence</option>
                    <option value="contain">Contain</option>
                    <option value="always match">Always match</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="value">Value</label>
                  <input
                    type="text"
                    id="value"
                    name="value"
                    className="input-group-text"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-check p-b-15">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="Inverted"
                  />
                  <label className="form-check-label" htmlFor="Inverted">
                    Inverted
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="input-group-text"
                    placeholder="Optional"
                  />
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

export default NewStreamRulePopup;

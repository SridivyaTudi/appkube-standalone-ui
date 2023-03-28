import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class EditRemediationPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      Rule: false,
      cloudAccount: false,
      Entity: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChangeOpenRuleData(e) {
    const value = e.target.checked;
    this.setState({
      Rule: value,
    });
  }

  onChangeOpenCloudData(e) {
    const value = e.target.checked;
    this.setState({
      cloudAccount: value,
    });
  }

  onChangeOpenEntityData(e) {
    const value = e.target.checked;
    this.setState({
      Entity: value,
    });
  }

  render() {
    const state = this.state;
    return (
      <Modal
        isOpen={state.modal}
        toggle={this.toggle}
        className="modal-container assessments-modal-container"
      >
        <ModalHeader>
          Create New Remediation
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.toggle}
          >
           <i class="fal fa-times"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{
            height: "calc(74vh - 110px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="form-group">
            <label htmlFor="rulesetGroup" className="d-block">
              Ruleset&nbsp;&nbsp;&nbsp;
              <i className="fa fa-info-circle"></i>
            </label>
            <select className="form-control d-block" id="rulesetGroup">
              <option>Select Ruleset</option>
              <option>AWS CCPA Fremework</option>
              <option>AWS CIS Foundation V.1.0.0</option>
              <option>AWS CIS Foundation V.1.0.1</option>
              <option>AWS CIS Foundation V.1.0.2</option>
              <option>AWS CIS Foundation V.1.0.3</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => {
                this.onChangeOpenRuleData(e);
              }}
              checked={this.state.Rule}
            />
            Excluded by Rule
            {this.state.Rule == true && (
              <div className="d-block select-rule">
                <select className="form-control d-block" id="ruleGroup">
                  <option>Select Rule</option>
                  <option>Avoid the use of "root" account</option>
                  <option>CloudTrail must enable log file validation</option>
                  <option>Enforce password policy</option>
                  <option>Ensure CloudTrail is enable in all regions</option>
                  <option>
                    Credential reports was generated in the last 24 hours
                  </option>
                </select>
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              onChange={(e) => {
                this.onChangeOpenCloudData(e);
              }}
              className="checkbox"
              checked={this.state.cloudAccount}
            />
            Excluded by Cloud Account
            {this.state.cloudAccount == true && (
              <div className="d-block select-rule">
                <select className="form-control d-block" id="ruleGroup">
                  <option>Select Account</option>
                  <option>AWS (0123456)</option>
                  <option>AWS (0123456789)</option>
                  <option>AWS (0123456323232)</option>
                </select>
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => {
                this.onChangeOpenEntityData(e);
              }}
              checked={this.state.Entity}
            />
            Excluded by Entity
            {this.state.Entity == true && (
              <div className="d-block select-rule">
                <div className="d-inline-block width-50">
                  <div className="d-inline-block radio p-r-10">
                    <input type="radio" />
                  </div>
                  <div className="d-inline-block radio-input">
                    <label htmlFor="rulesetGroup" className="d-block">
                      Entity Name
                    </label>
                    <input
                      type="text"
                      className="input-group-text d-block"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="d-inline-block width-50">
                  <div className="d-inline-block radio p-r-10">
                    <input type="radio" />
                  </div>
                  <div className="d-inline-block radio-input">
                    <label htmlFor="rulesetGroup" className="d-block">
                      Entity ID
                    </label>
                    <input
                      type="text"
                      className="input-group-text d-block"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="rulesetGroup" className="d-block">
              Add Cloud Bot&nbsp;&nbsp;&nbsp;
              <i className="fa fa-info-circle"></i>
            </label>
            <select className="form-control d-block" id="rulesetGroup">
              <option>Select Cloud Bot</option>
              <option>Custom</option>
              <option>Ami_set_to_private</option>
              <option>CloudTrail_enable</option>
              <option>CloudTrail_send_to_cloudWatch</option>
              <option>Config_enable</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="commentsGroup" className="d-block">
              Comments
            </label>
            <textarea className="input-group-text d-block"></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-block text-center">
            <button className="blue-button m-r-0 m-b-0">SAVE</button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditRemediationPopup;

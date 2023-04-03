import React from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AssetssmentPopup extends React.Component {
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

  render() {
    const state = this.state;
    return (
      <Modal
        isOpen={state.modal}
        toggle={this.toggle}
        className="modal-container assessments-modal-container"
      >
        <ModalHeader>
          Run Assessments
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
          <p>
            You are about to run 'AWS HIPAA' ruleset on 'AWS account'. Are you
            sure?
          </p>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <div className="d-block text-center" onClick={this.toggle}>
            <Link
              to={`/compliancemanager/pages/complianceassessmenthistory`}
              className="blue-button m-r-0 m-b-0"
            >
              RUN
            </Link>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AssetssmentPopup;

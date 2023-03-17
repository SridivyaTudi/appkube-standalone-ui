import React from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./UnimplementedFeaturePopup.css";

class UnimplementedFeaturePopup extends React.Component {
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
        className="modal-container unimplemented-modal-container"
      >
        <ModalHeader toggle={this.toggle}>Unimplemented Feature</ModalHeader>
        <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
          <p>
            The feature you are asking is not implemented yet. Do you want to
            continue?
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="d-block text-center">
            {state.link && (
              <Link
                to={`${config.basePath}${state.link}`}
                onClick={this.toggle}
                className="alert-blue-button m-b-0"
              >
                Continue
              </Link>
            )}
            <button
              className="alert-gray-button m-r-0 m-b-0"
              onClick={this.toggle}
            >
              Close
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default UnimplementedFeaturePopup;

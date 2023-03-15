import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class DiscardPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      index: -1,
      text: "",
    };
  }

  toggle = (index, text) => {
    this.setState({
      modal: !this.state.modal,
      index,
      text,
    });
  };

  onClickYes = () => {
    this.props.onRemoveEntity(this.state.index);
    this.setState({
      modal: false,
      index: -1,
      text: "",
    });
  };

  render() {
    const { modal, text } = this.state;
    return (
      <Modal
        isOpen={modal}
        toggle={() => this.toggle(-1, "")}
        className="modal-container assessments-modal-container"
      >
        <ModalHeader toggle={() => this.toggle(-1, "")}>
          Discard Changes
        </ModalHeader>
        <ModalBody
          style={{
            height: "calc(10vh - 20px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div>Remove '{text}', Are you sure?</div>
        </ModalBody>
        <ModalFooter>
          <div className="text-right">
            <button
              onClick={() => this.toggle(-1, "")}
              className="gray-button m-b-0"
            >
              CANCEL
            </button>
            <button
              className="blue-button m-r-0 m-b-0"
              onClick={this.onClickYes}
            >
              YES
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DiscardPopup;

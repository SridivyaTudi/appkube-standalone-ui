import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

class ApiKeySourcePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      discardLabel: this.props.valueOfDiscard,
      source: { value: "" },
      operator: { value: "" },
      value: "",
    };
  }

  toggle = (source, operator) => {
    this.setState({
      modal: !this.state.modal,
      source,
      operator,
    });
  };

  render() {
    const { modal, source, operator, value } = this.state;
    return (
      <Modal
        isOpen={modal}
        toggle={() => this.toggle("", "")}
        className="modal-container assessments-modal-container"
      >
        <ModalBody
          style={{
            height: "calc(20vh - 20px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="d-block form-group">
            <label className="d-inline-block">
              {source.value} {operator.value}{" "}
            </label>
            <div className="d-inline-block width-50">
              <span className="d-inline-block text">'</span>
              <input
                type="text"
                onChange={(e) => {
                  this.setState({ value: e.target.value });
                }}
                className="d-inline-block input-group-text width-auto"
                value={value}
                placeholder="20"
              />
              <span className="d-inline-block text">'</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <div className="text-right">
            <button
              onClick={() => this.toggle("", "")}
              className="gray-button m-b-0"
            >
              CANCEL
            </button>
            <button
              className="blue-button m-r-0 m-b-0"
              onClick={() =>
                this.props.addApikeySourceFunction(operator, value)
              }
            >
              ADD
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ApiKeySourcePopup;

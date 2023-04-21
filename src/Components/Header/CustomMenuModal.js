import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export class CustomMenuModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  onClickContinue = () => {
    this.setState({
      isOpen: false,
    });
    this.props.onClickContinue();
  };

  onClickCancel = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        title="Unimplemented Feature"
        icon="exclamation-triangle"
      >
        <div align={"center"} spacing={"md"}>
          <h4>
            The feature you are asking is not implemented yet. Do you want to
            continue?
          </h4>
          <div justify="center">
            <Button variant="primary" onClick={this.onClickContinue}>
              Continue
            </Button>
            <Button variant="secondary" onClick={this.onClickCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

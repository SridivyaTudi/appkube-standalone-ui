import * as React from "react";
import { Modal, ModalBody } from "reactstrap";
import previewDashboard from "../img/preview-dashboard.png";

class Diagonostics extends React.Component {
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
        className="modal-container perfmanager-modal-container preview-dashboard-popup"
      >
        <ModalBody style={{ maxHeight: "550px" }}>
          <button className="nabtn-close" onClick={this.toggle}>
            <i className="fa fa-close"></i>
          </button>
          <button className="nabtn-left">
            <i className="fa fa-angle-left"></i>
          </button>
          <button className="nabtn-right">
            <i className="fa fa-angle-right"></i>
          </button>
          <div className="slider-content">
            <div className="item-image active">
              <img src={previewDashboard} alt="" />
            </div>
            <div className="item-image">
              <img src={previewDashboard} alt="" />
            </div>
            <div className="item-image">
              <img src={previewDashboard} alt="" />
            </div>
            <div className="item-image">
              <img src={previewDashboard} alt="" />
            </div>
          </div>
          <ul className="slider-buttons">
            <li className="button active"></li>
            <li className="button"></li>
            <li className="button"></li>
            <li className="button"></li>
          </ul>
        </ModalBody>
      </Modal>
    );
  }
}

export default Diagonostics;

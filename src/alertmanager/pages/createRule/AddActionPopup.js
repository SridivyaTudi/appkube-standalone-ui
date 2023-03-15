import * as React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class AddActionPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: 0,
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
        className="modal-container alert-modal-container"
      >
        <ModalHeader toggle={this.toggle}>
          Select an action group to attach to this alert rule
        </ModalHeader>
        <ModalBody
          style={{
            height: "calc(100vh - 210px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="select-resource-container">
            <div className="italic-label gray-label">
              For metric and log alerts, action groups selected must be in the
              alert rule's subscription. For activity log alerts, action groups
              can be selected from subscriptions other than the alert rule's
              subscription.
            </div>
            <div className="form-row m-t-1">
              <div className="form-group filter-control-group col-md-12 col-sm-12">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-search"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="filter alerts"
                  />
                </div>
              </div>
            </div>
            <div className="row data-block m-t-2 m-b-3">
              <div className="col-sm-12">
                <table className="alert-data-table m-t-1">
                  <tbody>
                    <tr>
                      <th className="bold-label gray-label">
                        Action group name
                      </th>
                      <th className="gray-label bold-label">Contain action</th>
                    </tr>
                    <tr className="gray-label">
                      <td className="colored-label">
                        <input type="checkbox" /> Email to admin
                      </td>
                      <td className="">1 Email</td>
                    </tr>
                    <tr className="gray-label">
                      <td className="colored-label">
                        <input type="checkbox" /> Slack notification
                      </td>
                      <td className="">1 Slack notification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="m-t-3 m-b-2">
              <button className="btn btn-secondary">Done</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddActionPopup;

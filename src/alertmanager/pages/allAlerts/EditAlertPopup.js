import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { RestService } from "../_service/RestService";
import { config } from "../../config";
import AlertMessage from "../../components/AlertMessage";

class EditAlertPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isAlertOpen: false,
      message: null,
      severity: null,
      guid: null,
      id: null,
      alertState: "",
    };

    this.updateAlert = this.updateAlert.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }

  toggle = (selectedAlert) => {
    let alertState = "";
    const keys = Object.keys(selectedAlert);
    const lowerCaseKeys = keys.map((key) => key);
    const index = lowerCaseKeys.indexOf("alertState");
    if (index !== -1) {
      const key = keys[index];
      if (selectedAlert[key]) {
        alertState = selectedAlert[key];
      }
    }
    this.setState({
      modal: !this.state.modal,
      guid: selectedAlert.guid,
      id: selectedAlert.id,
      alertState: alertState,
    });
  };

  closeModel = () => {
    this.setState({
      modal: !this.state.modal,
      alertId: null,
      alertState: "",
      id: null,
    });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
    });
  };

  async updateAlert() {
    const { guid, alertState } = this.state;
    if (alertState === "") {
      console.log("Please select alert state");
      this.setState({
        severity: config.SEVERITY_ERROR,
        message: "Please select alert state",
        isAlertOpen: true,
      });
      return;
    }
    let obj = {
      guid: guid,
      alertState: alertState,
    };
    console.log("Alert being update : ", obj);
    await RestService.add(config.UPDATE_ALERT, obj).then((response) => {
      console.log("update alert response: ", response);
      if (response.length > 0) {
        this.setState({
          severity: config.SEVERITY_SUCCESS,
          message: config.UPDATE_ALERT_SUCCESS_MESSAGE,
          isAlertOpen: true,
        });
        this.props.onSaveUpdate(response);
      } else {
        this.setState({
          severity: config.SEVERITY_ERROR,
          message: config.SERVER_ERROR_MESSAGE,
          isAlertOpen: true,
        });
      }
    });
  }

  render() {
    const state = this.state;
    return (
      <Modal
        isOpen={state.modal}
        toggle={this.closeModel}
        className="modal-container alert-modal-container"
        modalClassName="alert-modal-container"
      >
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={state.isAlertOpen}
          severity={state.severity}
          msg={state.message}
        ></AlertMessage>
        <ModalHeader toggle={this.closeModel}>Update Alert</ModalHeader>
        <ModalBody
          style={{
            height: "calc(100vh - 210px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="select-resource-container">
            <div className="italic-label gray-label m-b-1"> </div>
            <div className="form-row m-t-1">
              <div className="form-group filter-control-group col-sm-3">
                <label htmlFor="selectAlertState">Select Alert State</label>
                <select
                  className="form-control"
                  name="alertState"
                  value={state.alertState}
                  onChange={this.onChange}
                >
                  <option key="" value="">
                    Select Alert State
                  </option>
                  <option key="New" value="New">
                    New
                  </option>
                  <option key="InProgress" value="InProgress">
                    InProgress
                  </option>
                  <option key="Closed" value="Closed">
                    Closed
                  </option>
                </select>
              </div>
            </div>
            <div>
              <button
                className="btn btn-secondary m-r-2"
                onClick={this.updateAlert}
              >
                Update
              </button>
              <button className="btn btn-warning" onClick={this.closeModel}>
                Cancel
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default EditAlertPopup;

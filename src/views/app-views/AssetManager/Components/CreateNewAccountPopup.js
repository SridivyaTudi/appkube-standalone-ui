import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import config from "../../config";
import { RestService } from "../../Services/RestService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ToastMessage } from "../../../../Toast/ToastMessage";
class CreateNewAccountPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
      departments: [],
      initailFlag: true,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      newDepartment: "",
      initailFlag: true,
    });
  };

  setLink = (link) => {
    this.setState({
      link,
    });
  };

  componentDidMount() {
    this.setState({ departments: this.props.departments });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.departments) !==
      JSON.stringify(prevState.departments)
    ) {
      this.setState({
        departments: this.props.departments,
      });
    }
  }
  renderDepartments() {
    if (this.state.departments && this.state.departments.length) {
      return this.state.departments.map((department, index) => {
        return (
          <Grid item xs={12} key={index}>
            <div className="d-flex align-items-center p-b-10">
              <input
                type="checkbox"
                checked={department.id == this.props.checkedId}
                onChange={() => {
                  this.props.setID(
                    this.props.checkedId == department.id
                      ? false
                      : department.id
                  );
                }}
              />
              <label
                onClick={() => {
                  this.props.setID(
                    this.props.checkedId == department.id
                      ? false
                      : department.id
                  );
                }}
              >
                {department.name}
              </label>
            </div>
          </Grid>
        );
      });
    }
  }
  createDepartMent = () => {
    let organizationId = 1;
    if (localStorage.getItem("currentOrgId")) {
      organizationId = localStorage.getItem("currentOrgId");
    }
    let postData = {
      name: this.state.newDepartment,
      organization: {
        id: organizationId,
      },
    };
    RestService.postData(config.ADD_DEPARTMENT, postData).then((response) => {
      this.setState({
        newDepartment: "",
        departments: [response].concat(this.state.departments),
        initailFlag: true,
      });
      this.props.newDepartmentAppend(response);
    });
  };
  render() {
    const state = this.state;
    return (
      <Modal
        isOpen={state.modal}
        toggle={this.toggle}
        className="select-account-modal-container"
      >
        <ModalHeader>
          Create New OU
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.toggle}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", height: "260px" }}
        >
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name OF OU"
              value={this.state.newDepartment}
              onChange={(e) => {
                this.setState({
                  newDepartment: e.target.value,
                  initailFlag: false,
                });
              }}
            />
            <span className="text-left red">
              {this.state.newDepartment == "" && !this.state.initailFlag
                ? "Name of Ou is required"
                : ""}
            </span>
          </div>
          <h4 className="text-left m-b-1">Select The Account Or OU Below</h4>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              {this.state.departments && this.state.departments.length ? (
                this.renderDepartments()
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-bar">
          <div className="d-block text-center">
            <button
              className="gray-outline"
              onClick={() => {
                this.props.setID(false);
              }}
            >
              Clear
            </button>
            <button
              onClick={() => {
                // !this.state.initailFlag && this.state.newDepartment != '' ? this.createDepartMent() : !this.props.checkedId ? ToastMessage('Please select any Organizational Unit.', "unsuccess") : ''
                if (!this.state.initailFlag && this.state.newDepartment != "") {
                  this.createDepartMent();
                } else if (!this.props.checkedId) {
                  ToastMessage(
                    "Please select any Organizational Unit.",
                    "unsuccess"
                  );
                } else {
                  this.toggle();
                }
              }}
              className="new-button m-b-0"
            >
              Add
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CreateNewAccountPopup;

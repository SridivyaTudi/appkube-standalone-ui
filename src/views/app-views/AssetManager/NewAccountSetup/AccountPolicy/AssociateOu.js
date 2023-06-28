import React, { Component } from "react";
import SelectExisting from "../../../../../assets/img/assetmanager/select-existing.png";
import CreateFileIcon from "../../../../../assets/img/assetmanager/create-file-icon.png";
import AssociatedAccountPopup from "../../Components/AssociatedAccountPopup";
import CreateNewOuPopup from "../../Components/CreateNewOuPopup";
import SelectAccountPopup from "../../Components/SelectAccountPopup";
import CreateNewAccountPopup from "../../Components/CreateNewAccountPopup";
import config from "../../../config";
import { RestService } from "./../../../Services/RestService";
import { ToastMessage } from "../../../../../Toast/ToastMessage";
import Button from '@mui/material/Button';

let initialFlag = true;

class AssociateOu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      checkedId: false,
      isDepartmentCreated: false,
      name: "",
      description: "",
    };
    this.associatedAccountModalRef = React.createRef();
    this.createNewOuModalRef = React.createRef();
    this.selectAccountModalRef = React.createRef();
    this.createNewAccountModalRef = React.createRef();
  }
  onClickAssociatedAccount = () => {
    this.associatedAccountModalRef.current.toggle();
  };
  onClickCreateNewOu = () => {
    this.createNewOuModalRef.current.toggle();
  };
  onClickSelectAccount = (link) => {
    this.selectAccountModalRef.current.setLink(link);
    this.selectAccountModalRef.current.toggle();
  };
  onClickCreateNewAccount = (link) => {
    this.createNewAccountModalRef.current.setLink(link);
    this.createNewAccountModalRef.current.toggle();
  };
  componentDidMount() {
    this.getDepartMents();
  }
  getDepartMents() {
    let organizationId = 1;
    if (localStorage.getItem("currentOrgId")) {
      organizationId = localStorage.getItem("currentOrgId");
    }
    try {
      RestService.getData(
        config.GET_DEPARTMENTS + organizationId,
        null,
        null
      ).then((response) => {
        this.setState({ departments: response });
        initialFlag = false;
      });
    } catch (error) {
      console.log(error)
    }

  }
  newDepartmentAppend = (department, description) => {
    this.setState({
      departments: [department].concat(this.state.departments),
      checkedId: department.id,
      isDepartmentCreated: true,
      name: department.name,
      description: description,
    });
    this.props.setDepartment(department.id, department.name, description);
    // this.onClickCreateNewAccount('')
  };
  getDepartmentName = (id) => {
    return this.state.departments.filter((department) => department.id == id)[0]
      .name;
  };
  render() {
    return (
      <>
        {!this.state.isDepartmentCreated && !this.state.checkedId ? (
          <div className="d-inline-block width-100 new-account-setup-tab-contents">
            <h3>Associate OU</h3>
            <p>
              Select Organizational Unit to Associate with Cloud Account Or
              Create new
            </p>
            <div className="organizational-box">
              <div className="organizational-inner-boxs">
                <div
                  className="select-organizational"
                  onClick={() =>
                    this.state.departments && this.state.departments.length
                      ? this.onClickSelectAccount("")
                      : this.onClickAssociatedAccount("")
                  }
                >
                  <div className="organizational-image">
                    <img src={SelectExisting} alt="" />
                  </div>
                  <div className="organizational-title">
                    Select From Existing OU
                  </div>
                </div>
                <div
                  className="select-organizational"
                  onClick={() => this.onClickCreateNewOu("")}
                >
                  <div className="organizational-image">
                    <img src={CreateFileIcon} alt="" />
                  </div>
                  <div className="organizational-title">Create New OU</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-inline-block width-100 new-account-setup-tab-contents">
            <h3>Great Job !!</h3>
            <p>
              Selected Organizational Unit{" "}
              <strong>{this.props.roleDetails.departmentName}</strong>. All you
              need to do <br /> now is click on that <strong>"Finished"</strong>{" "}
              button to move forward with the next step.
            </p>
            <div className="associate-box">
              <h3>Associate OU</h3>
              <div className="contents">
                <label>Name</label>
                <p>{this.props.roleDetails.departmentName}</p>
              </div>
              <div className="contents">
                <label>Description</label>
                <p>{this.state.description}</p>
              </div>
              <div
                className="d-flex width-100 align-items-center"
                style={{ justifyContent: "space-between" }}
              >
                <Button
                  className="primary-text-btn min-width"
                  variant="contained"
                  style={{ paddingLeft: 0, textDecoration: 'underline' }}
                  onClick={() => this.onClickSelectAccount()}
                >
                  Change OU
                </Button>
                <Button
                  className="primary-btn min-width"
                  variant="contained"
                  onClick={() => this.onClickCreateNewOu()}
                >
                  Create OU
                </Button>
              </div>
            </div>
          </div>
        )}
        <AssociatedAccountPopup
          ref={this.associatedAccountModalRef}
          addModalOpen={() => {
            this.onClickAssociatedAccount("");
          }}
          newDepartmentAppend={this.newDepartmentAppend}
        />
        <CreateNewOuPopup
          ref={this.createNewOuModalRef}
          addModalOpen={() => {
            this.onClickCreateNewOu("");
          }}
          newDepartmentAppend={this.newDepartmentAppend}
        />
        <SelectAccountPopup
          ref={this.selectAccountModalRef}
          departments={this.state.departments}
          addModalOpen={() => {
            this.onClickSelectAccount("");
            this.onClickCreateNewAccount("");
          }}
          checkedId={this.state.checkedId}
          setID={(checkedId) => {
            this.setState({ checkedId });
            // this.onClickSelectAccount('')
            this.props.setDepartment(
              checkedId,
              checkedId ? this.getDepartmentName(checkedId) : ""
            );
          }}
        />
        <CreateNewAccountPopup
          ref={this.createNewAccountModalRef}
          departments={this.state.departments}
          newDepartmentAppend={this.newDepartmentAppend}
          checkedId={this.state.checkedId}
          setID={(checkedId) => {
            this.setState({ checkedId });
            this.props.setDepartment(
              checkedId,
              checkedId ? this.getDepartmentName(checkedId) : ""
            );
            // this.onClickCreateNewAccount('')
          }}
        />
      </>
    );
  }
}

export default AssociateOu;

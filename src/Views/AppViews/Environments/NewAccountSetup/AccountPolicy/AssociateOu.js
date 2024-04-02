import React, { Component } from "react";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";
import SelectExisting from "assets/img/assetmanager/select-existing.png";
import CreateFileIcon from "assets/img/assetmanager/create-file-icon.png";
import AssociatedAccountPopup from "./AssociatedAccountPopup";
import CreateNewOuPopup from "./CreateNewOuPopup";
import SelectAccountPopup from "./SelectAccountPopup";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { Box } from "@mui/material";
import { navigateRouter } from "Utils/Navigate/navigateRouter";

class AssociateOu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      checkedId: false,
      isDepartmentCreated: false,
      name: "",
      description: "",
      selectAccountPopupShow: false,
      createNewOuPopupShow: false,
    };
  }

  componentDidMount = () => {
    let { departmentId } = this.getUrlDetails();
    let productData = this.props.createProductFormData;
    console.log(productData, departmentId);
    if (departmentId > 0 && productData) {
      this.setState({ checkedId: departmentId });
      this.props.setDepartment(
        departmentId,
        productData.departmentName,
        productData.departmentDescription
      );
    }
  };

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.organizationWiseDepartments.status !==
        this.props.organizationWiseDepartments.status &&
      this.props.organizationWiseDepartments.status === status.SUCCESS &&
      this.props.organizationWiseDepartments.data
    ) {
      this.setState({
        departments: this.props.organizationWiseDepartments.data.departments,
      });
    }
  };

  newDepartmentAppend = (department, description) => {
    try {
      this.setState({
        departments: [department].concat(this.state.departments),
        checkedId: department.id,
        isDepartmentCreated: true,
        name: department.name,
        description: description,
      });
      this.props.setDepartment(department.id, department.name, description);
    } catch (error) {
      console.error(error);
    }
  };

  getDepartmentDetails = (id) => {
    let details = this.state.departments.filter(
      (department) => department.id === Number(id)
    )[0];
    return { name: details.name, description: details.description };
  };

  toggleSelectAccountPopup = (clear) => {
    if (clear) {
      this.setState({
        name: "",
        description: "",
        isDepartmentCreated: false,
        checkedId: false,
      });
    }
    this.setState({
      selectAccountPopupShow: !this.state.selectAccountPopupShow,
    });
  };

  toggleCreateNewOuPopup = () => {
    this.setState({
      createNewOuPopupShow: !this.state.createNewOuPopupShow,
    });
  };

  /** Get url details. */
  getUrlDetails() {
    let departmentId = this.props.params?.departmentId || 0;
    return { departmentId };
  }

  render() {
    const {
      selectAccountPopupShow,
      isDepartmentCreated,
      checkedId,
      description,
      createNewOuPopupShow,
    } = this.state;
    const {
      roleDetails: { departmentName, description: depDescription },
    } = this.props;
    let { departmentId } = this.getUrlDetails();
    return (
      <>
        <Link className="close-btn" to={`${APP_PREFIX_PATH}/environments`}>
          <i className="fa-solid fa-xmark"></i>
        </Link>
        {!isDepartmentCreated && !checkedId ? (
          <Box className="d-inline-block width-100 new-account-setup-tab-contents">
            <h3>Associate OU</h3>
            <p>
              Select Organizational Unit to Associate with Cloud Account Or
              Create new
            </p>
            <Box className="organizational-box">
              <Box className="organizational-inner-boxs">
                <Box
                  className="select-organizational"
                  onClick={this.toggleSelectAccountPopup}
                >
                  <Box className="organizational-image">
                    <img src={SelectExisting} alt="" />
                  </Box>
                  <div className="organizational-title">
                    Select From Existing OU
                  </div>
                </Box>
                <Box
                  className="select-organizational"
                  onClick={this.toggleCreateNewOuPopup}
                >
                  <Box className="organizational-image">
                    <img src={CreateFileIcon} alt="" />
                  </Box>
                  <div className="organizational-title">Create New OU</div>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box className="d-inline-block width-100 new-account-setup-tab-contents">
            <h3>Great Job!!</h3>
            <p>
              Selected Organizational Unit
              <strong> {departmentName}</strong>. All you need to do <br /> now
              is click on that
              <strong>"Finished" </strong>
              button to move forward with the next step.
            </p>
            <Box className="associate-box">
              <h3>Associate OU</h3>
              <Box className="contents">
                <label>Name</label>
                <p>{departmentName}</p>
              </Box>
              <Box className="contents">
                <label>Description</label>
                <p>{depDescription || description}</p>
              </Box>
              {departmentId > 0 ? (
                <></>
              ) : (
                <Box
                  className="d-flex width-100 align-items-center"
                  style={{ justifyContent: "space-between" }}
                >
                  <Button
                    className="primary-text-btn min-width"
                    variant="contained"
                    style={{ paddingLeft: 0, textDecoration: "underline" }}
                    onClick={this.toggleSelectAccountPopup}
                  >
                    Change ou
                  </Button>
                  <Button
                    className="primary-btn min-width"
                    variant="contained"
                    onClick={this.toggleCreateNewOuPopup}
                  >
                    Create OU
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}
        <AssociatedAccountPopup
          addModalOpen={this.toggleSelectAccountPopup}
          newDepartmentAppend={this.newDepartmentAppend}
        />
        <CreateNewOuPopup
          toggleCreateNewOuPopupShow={createNewOuPopupShow}
          toggleCreateNewOuPopup={this.toggleCreateNewOuPopup}
          newDepartmentAppend={this.newDepartmentAppend}
        />
        {selectAccountPopupShow ? (
          <SelectAccountPopup
            selectAccountPopupShow={selectAccountPopupShow}
            toggleSelectAccountPopup={this.toggleSelectAccountPopup}
            checkedId={checkedId}
            setID={(checkedId) => {
              if (checkedId) {
                this.setState({ checkedId });
                let details = this.getDepartmentDetails(checkedId);
                let name = "";
                let description = "";
                if (checkedId) {
                  name = details.name;
                  description = details.description;
                }
                this.props.setDepartment(checkedId, name, description);
              }
            }}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { organizationWiseDepartments } = state.environments;
  const { createProductFormData } = state.biMapping;
  return { createProductFormData, organizationWiseDepartments };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AssociateOu));

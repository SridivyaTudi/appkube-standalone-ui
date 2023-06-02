import React, { Component } from "react";
import { Link } from "react-router-dom";
import Wizard from "./Wizard";
import AssociateOu from "./AssociateOu";
import PreparePolicy from "./PreparePolicy";
import CreateRole from "./CreateRole";
import Finish from "./Finish";
// import Ou from "./Ou";
// import Review from "./Review";

class AccountPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationList: null,
      selection: [],
      name: "",
      accessKey: "",
      secretKey: "",
      externalId: "",
      role: "",
      validateRoleFlag: { name: false, role: false, externalId: false },
      checkedId:false
    };
    this.roleRef = React.createRef();
    this.ouRef = React.createRef();
    this.wizardRef = React.createRef();
    this.reviewRef = React.createRef();
    this.steps = [
      {
        name: "Prepare Policy",
        component: () => <PreparePolicy />,
      },
      {
        name: "Create Role",
        component: () => (
          <CreateRole ref={this.roleRef} onChangeInput={this.onChangeInput} validateRoleFlag={this.state.validateRoleFlag} />
        ),
      },
      {
        name: "Associate OU",
        component: () => <AssociateOu setDepartment={(checkedId,departmentName)=>{
          this.setState({checkedId,departmentName })
        }} roleDetails={{ externalId: this.state.externalId, role: this.state.role, name: this.state.name,departmentName:this.state.departmentName }} />,
      },
      {
        name: "Finish",
        component: () => <Finish roleDetails={{ externalId: this.state.externalId, role: this.state.role, name: this.state.name,departmentName:this.state.departmentName }}  />,
      },

      //   {
      //     name: "OU",
      //     component: () => (
      //       <Ou
      //         ref={this.ouRef}
      //         onChangeSelection={this.onChangeSelection}
      //         organizationList={this.state.organizationList}
      //         getOrganizationList={this.getOrganizationList}
      //         meta={props.meta}
      //       />
      //     ),
      //   },
      //   {
      //     name: "Review",
      //     component: () => (
      //       <Review
      //         ref={this.reviewRef}
      //         selectedOrg={
      //           this.ouRef.current !== null
      //             ? this.ouRef.current.getSelection()
      //             : null
      //         }
      //         selectedData={
      //           this.roleRef.current !== null
      //             ? this.roleRef.current.getRoleData()
      //             : null
      //         }
      //       />
      //     ),
      //   },
    ];
  }

  onChangeSelection = (selection) => {
    this.setState({
      selection,
    });
  };

  onChangeInput = (name, role, externalId) => {
    this.setState({
      name,
      role,
      externalId,
      validateRoleFlag: { name: name == '' ? true : false, role: role == '' ? true : false, externalId: externalId == '' ? true : false }
    });
  };
  validateCreateRoleForm = (parameters) => {
    this.setState({ validateRoleFlag: parameters })
  }
  getSelectedData = () => {
    return {
      name: this.state.name,
      accessKey: this.state.accessKey,
      secretKey: this.state.secretKey,
    };
  };

  // onSubmit = () => {
  //     const selectionData = this.ouRef.current.getSelection();
  //     const roleData = this.roleRef.current.getRoleData();
  //     if (!roleData.isValid) {
  //         this.wizardRef.current.setActiveStep(2);
  //     } else if (!selectionData[0] || !selectionData[1]) {
  //         this.wizardRef.current.setActiveStep(3);
  //     } else {
  //         const sendData = {
  //             "name": roleData.displayName,
  //             "accessKey": roleData.accessKey,
  //             "secretKey": roleData.secretKey,
  //             "accountId": roleData.accountId,
  //             "orgId": selectionData[0],
  //             "ouId": selectionData[1]
  //         };
  //         RestService.add(this.config.ADD_ACCOUNT, sendData).then(
  //             (response) => {
  //                 alert("Account created")
  //             });
  //     }
  // }

  async componentDidMount() {
    try {
      var usr = localStorage.getItem(`userInfo`);
      if (usr !== null) {
        const user = JSON.parse(usr);
        // await RestService.getData(this.config.GET_USER_ORGANIZATION + '/' + user.info.credentials.name, null, null).then(
        //     (response) => {
        //         this.setState({
        //             organizationList: response,
        //         });
        //     });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  getOrganizationList = () => {
    var usr = localStorage.getItem(`userInfo`);

    if (usr !== null) {
      const user = JSON.parse(usr);
      // RestService.getData(this.config.GET_USER_ORGANIZATION + '/' + user.info.credentials.name, null, null).then(
      //     (response) => {
      //         this.setState({
      //             organizationList: response,
      //         });
      //     });
    }
  };

  render() {
    return (
      <div className="new-account-container">
        <div className="new-account-page-container">
          <Wizard ref={this.wizardRef} steps={this.steps} rolesDetails={{ externalId: this.state.externalId, role: this.state.role, name: this.state.name }} validateCreateRoleForm={this.validateCreateRoleForm} departmentId={this.state.checkedId} />
        </div>
      </div>
    );
  }
}

export default AccountPolicy;

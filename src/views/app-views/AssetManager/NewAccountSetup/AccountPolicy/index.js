import React, { Component } from "react";
import Wizard from "./Wizard";
import AssociateOu from "./AssociateOu";
import PreparePolicy from "./PreparePolicy";
import CreateRole from "./CreateRole";
import Finish from "./Finish";

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
      checkedId: false,
      finishPrevious: false,
      initialMsgFlag: false
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
        component: () => <AssociateOu setDepartment={(checkedId, departmentName,description) => {
          this.setState({ checkedId, departmentName,description })
        }} roleDetails={{ externalId: this.state.externalId, role: this.state.role, name: this.state.name, departmentName: this.state.departmentName,description:this.state.description,departmentId:this.state.checkedId }} />,
      },
      {
        name: "Finish",
        component: () => <Finish roleDetails={{ externalId: this.state.externalId, role: this.state.role, name: this.state.name, departmentName: this.state.departmentName, departmentId: this.state.checkedId,description:this.state.description }} previousStep={() => {
          this.setState({ finishPrevious: true })
        }} />,
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

  onChangeInput = (nameVal, roleVal, externalIdVal) => {
    
    // let name = nameVal
    // let role = roleVal
    // let externalId = externalIdVal
    
    // if (!nameVal && !roleVal && !externalId && !this.state.initialMsgFlag) {
    //   this.setState({ initialMsgFlag: true })
      let name = nameVal ? nameVal : '';
      let role = roleVal ? roleVal : '';
      let externalId = externalIdVal ? externalIdVal : ''
    // }
    this.setState({
      name,
      role,
      externalId,
      validateRoleFlag: { name:name == '' ? true : false, role: role == '' ? true : false, externalId:  externalId == '' ? true : false,initialMsgFlag:this.state.initialMsgFlag }
    });
  };
  validateCreateRoleForm = (parameters) => {
    
    if (parameters.name && parameters.role && parameters.externalId && !this.state.initialMsgFlag) {
      this.setState({initialMsgFlag:true})
    }
    this.setState({ validateRoleFlag: parameters })
  }
  getSelectedData = () => {
    return {
      name: this.state.name,
      accessKey: this.state.accessKey,
      secretKey: this.state.secretKey,
    };
  };

  async componentDidMount() {
    try {
      var usr = localStorage.getItem(`userInfo`);
      if (usr !== null) {
        const user = JSON.parse(usr);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  getOrganizationList = () => {
    var usr = localStorage.getItem(`userInfo`);

    if (usr !== null) {
      const user = JSON.parse(usr);
    }
  };

  render() {
    return (
      <div className="new-account-container">
        <div className="new-account-page-container">
          <Wizard ref={this.wizardRef} steps={this.steps} rolesDetails={{ externalId: this.state.externalId, role: this.state.role, name: this.state.name }} validateCreateRoleForm={this.validateCreateRoleForm} departmentId={this.state.checkedId} previousStep={(finishPrevStep) => {
            if (finishPrevStep == 'finishPrevStep') {
              this.setState({ finishPrevious: false })
            } else {
              this.props.previousStep()
            }

          }} finishPrevious={this.state.finishPrevious} />
        </div>
      </div>
    );
  }
}

export default AccountPolicy;

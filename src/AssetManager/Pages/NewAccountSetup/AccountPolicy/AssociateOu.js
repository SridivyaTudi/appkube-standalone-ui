import React, { Component } from "react";
import SelectExisting from "../../../../assets/img/assetmanager/select-existing.png";
import CreateFileIcon from "../../../../assets/img/assetmanager/create-file-icon.png";
import SelectAccountPopup from "../../../Components/SelectAccountPopup";
import CreateNewAccountPopup from "../../../Components/CreateNewAccountPopup";
import { config } from "./../../../../AssetManager/config";
import { RestService } from "./../../../../Services/RestService";

class AssociateOu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      checkedId: false,
    };
    this.selectAccountModalRef = React.createRef();
    this.createNewAccountModalRef = React.createRef();
  }
  onClickSelectAccount = (link) => {
    this.selectAccountModalRef.current.setLink(link);
    this.selectAccountModalRef.current.toggle();
  };
  onClickCreateNewAccount = (link) => {
    this.createNewAccountModalRef.current.setLink(link);
    this.createNewAccountModalRef.current.toggle();
  };
  componentDidMount() {
    this.getDepartMents()
  }
  getDepartMents() {

    let organizationId = 1
    if (localStorage.getItem('organizations')) {
      organizationId = JSON.parse(localStorage.getItem('organizations'))[0].id
    }
    RestService.getData(config.DEPARTMENTLIST + organizationId, null, null).then(
      (response) => {
        this.setState({ departments: response })
      }
    );
  }
  newDepartmentAppend = (department) => {
    this.setState({ departments: [department].concat(this.state.departments) })
    this.props.setDepartment(department.id,department.name)
    this.onClickCreateNewAccount('')
  }
  getDepartmentName = (id)=>{
    return  this.state.departments.filter((department)=>department.id == id)[0].name
  }
  render() {
    return (
      <div className="d-inline-block width-100 new-account-setup-tab-contents">
        <h3>Associate OU</h3>
        <p className="m-b-2">
          Select Organizational Unit to Associate with Cloud Account Or Create
          new
        </p>
        <div className="organizational-box">
          <div className="organizational-inner-boxs">
            <div className="select-organizational" onClick={() => this.onClickSelectAccount("")}>
              <div className="organizational-image">
                <img src={SelectExisting} alt="" />
              </div>
              <div className="organizational-title">
                Select From Existing OU
              </div>
            </div>
            <div className="select-organizational" onClick={() => this.onClickCreateNewAccount("")}>
              <div className="organizational-image">
                <img src={CreateFileIcon} alt="" />
              </div>
              <div className="organizational-title">
                Create New OU
              </div>
            </div>
          </div>
        </div>
        <SelectAccountPopup ref={this.selectAccountModalRef} departments={this.state.departments} addModalOpen={() => {
          this.onClickSelectAccount('')
          this.onClickCreateNewAccount('')
        }} checkedId={this.state.checkedId} setID={(checkedId) => {
          this.setState({ checkedId })
          this.onClickSelectAccount('')
          this.props.setDepartment(checkedId,this.getDepartmentName(checkedId))
        }} />
        <CreateNewAccountPopup ref={this.createNewAccountModalRef} departments={this.state.departments} newDepartmentAppend={this.newDepartmentAppend} checkedId={this.state.checkedId} setID={(checkedId) => {

          this.setState({ checkedId })
          this.props.setDepartment(checkedId,this.getDepartmentName(checkedId))
          this.onClickCreateNewAccount('')
        }} />
      </div>
    );
  }
}

export default AssociateOu;

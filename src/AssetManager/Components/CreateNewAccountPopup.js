import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./SelectAccountPopup.css";
import { config } from "../../AssetManager/config";
import { RestService } from "../../Services/RestService";
class CreateNewAccountPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
      departments: [],
      initailFlag:true,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      newDepartment:'',
      initailFlag:true
    });
  };

  setLink = (link) => {
    this.setState({
      link,
    });
  };

  componentDidMount() {
    this.setState({ departments: this.props.departments })

  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.departments) !== JSON.stringify(prevState.departments)) {
      this.setState({
        departments: this.props.departments,
      });
    }
  }
  renderDepartments() {
    if (this.state.departments && this.state.departments.length) {
      return this.state.departments.map((department, index) => {
        return (
          <div className="d-flex align-items-center p-b-10" key={index}>
            <input type="checkbox" checked={department.id == this.props.checkedId} onChange={()=>{
              this.props.setID(this.props.checkedId == department.id ? false : department.id)
            }} />
            <label>{department.name}</label>
          </div>
        )
      })
    }
  }
  createDepartMent =()=>{
    
    let organizationId = 1
    if(localStorage.getItem('organizations')){
      organizationId = JSON.parse(localStorage.getItem('organizations'))[0].id
    }
    let postData =  {
      "name": this.state.newDepartment,
      "organization":{
          "id":organizationId
      }
  }
    RestService.postData(config.ADD_DEPARTMENT, postData).then(
      (response) => {
        this.setState({newDepartment:'',departments:[response].concat(this.state.departments),initailFlag:true})
        this.props.newDepartmentAppend(response)
      }
    );
  }
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
            <i class="fal fa-times"></i>
          </button>
        </ModalHeader>
        <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name OF OU" value={this.state.newDepartment} onChange={(e)=>{
                this.setState({newDepartment:e.target.value,initailFlag:false})  
              }}
            />
           <span className="text-left red">{this.state.newDepartment == '' && !this.state.initailFlag ? "Name of Ou is required" : ""}</span>
          </div>
          <h4 className="text-left m-b-1">Select The Account Or OU Below</h4>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-left">
              {this.state.departments && this.state.departments.length ? this.renderDepartments() : <></>}
              {/* <div className="d-flex align-items-center p-b-10">
              <input type="checkbox" />
              <label>HR</label>
            </div> */}

            </div>
          </div>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <div className="d-block text-center">
            {/* {state.link && (
              
            )} */}
            <button className="gray-button m-r-1 m-b-0" onClick={this.toggle}>
              Clear
            </button>
            <button
              onClick={() => !this.state.initailFlag && this.state.newDepartment != '' ? this.createDepartMent() : this.setState({newDepartment:"",initailFlag:false})}
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

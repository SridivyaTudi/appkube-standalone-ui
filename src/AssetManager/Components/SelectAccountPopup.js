import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./SelectAccountPopup.css";

class SelectAccountPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
      departments:[]
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
  
  componentDidMount(){
    this.setState({departments:this.props.departments})

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
      let leftData = [];
      let rightData = [];
      let centerData = [];
      for (let departmentIndex = 0; departmentIndex < this.state.departments.length; departmentIndex += 3) {
        leftData.push(this.state.departments[departmentIndex])
        if (this.state.departments[departmentIndex + 1]) 
          centerData.push(this.state.departments[departmentIndex + 1])
        
        if (this.state.departments[departmentIndex + 2])
          rightData.push(this.state.departments[departmentIndex + 2])
      }
      
     return  [leftData,centerData,rightData].map((departments,departmentsIndex) => {
        return (
          <div className="col-lg-4 col-md-4 col-sm-12 text-left" key={departmentsIndex}>
            {
              departments.map((department,index) => {
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

          </div>
        )
      })
    }
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
          Select From Existing OU
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
          <h4 className="text-left m-b-1">Select OU</h4>
          <div className="row">
            
            {
              this.state.departments && this.state.departments.length ? this.renderDepartments() : <></>
              
            }
            {/* <div className="col-lg-4 col-md-4 col-sm-12 text-left">

              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>HR</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Production</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>HR</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Production</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>HR</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Production</label>
              </div>

            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 text-left">
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Finance</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Marketing</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Finance</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Marketing</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Finance</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Marketing</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 text-left">
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>IT</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Operations</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>IT</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Operations</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>IT</label>
              </div>
              <div className="d-flex align-items-center p-b-10">
                <input type="checkbox" />
                <label>Operations</label>
              </div>
            </div> */}
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
             onClick={()=>this.props.addModalOpen()}
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
export default SelectAccountPopup;

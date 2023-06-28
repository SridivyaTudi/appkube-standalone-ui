import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { ToastMessage } from "../../../../Toast/ToastMessage";
import Button from '@mui/material/Button';

class SelectAccountPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
      departments: []
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

      return [leftData, centerData, rightData].map((departments, departmentsIndex) => {
        return (
          <Grid item xs={4} key={departmentsIndex}>
            {
              departments.map((department, index) => {
                return (
                  <div className="d-flex align-items-center p-b-10" key={index}>
                    <input type="checkbox" checked={department.id == this.props.checkedId} onChange={() => {
                      this.props.setID(this.props.checkedId == department.id ? false : department.id)
                    }} />
                    <label onClick={() => {
                      this.props.setID(this.props.checkedId == department.id ? false : department.id)
                    }}>{department.name}</label>
                  </div>
                )
              })
            }
          </Grid>
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
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody style={{ overflow: 'hidden', overflowY: 'auto', maxHeight: '300px' }}>
          <h4 className="text-left m-b-1">Select OU</h4>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              {this.state.departments && this.state.departments.length ? this.renderDepartments() : <></>}
            </Grid>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-bar">
          <div className="d-block text-center">
            <Button
              className="secondary-text-btn m-r-2"
              variant="contained"
              onClick={() => {
                this.props.setID(false);
              }}
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                if (!this.props.checkedId) {
                  ToastMessage.error('Please select any Organizational Unit.');
                } else {
                  this.toggle()
                }
              }}
              className="primary-btn m-b-0"
              variant="contained"
            >
              Add
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}
export default SelectAccountPopup;

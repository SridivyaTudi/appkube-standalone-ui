import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ToastMessage } from "../../../../../Toast/ToastMessage";
import Button from "@mui/material/Button";
import { getOrgWiseDepartments } from "Redux/Environments/environmentsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";

class SelectAccountPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      currentSelectedDepId: undefined,
    };
  }

  componentDidMount = () => {
    this.props.getOrgWiseDepartments();
    if (Number(this.props.checkedId)) {
      this.setState({ currentSelectedDepId: Number(this.props.checkedId) });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (
      this.props.organizationWiseDepartments &&
      this.props.organizationWiseDepartments.status !==
        prevProps.organizationWiseDepartments.status &&
      this.props.organizationWiseDepartments.status === status.SUCCESS
    ) {
      this.setState({
        departments: this.props.organizationWiseDepartments.data.departments,
      });
    }
  };

  handleCheck = (e) => {
    const { currentSelectedDepId } = this.state;
    const { id } = e.target;
    if (currentSelectedDepId === id) {
      this.setState({ currentSelectedDepId: undefined });
    } else {
      this.setState({ currentSelectedDepId: id });
    }
  };

  renderDepartments() {
    const { departments } = this.state;
    return (
      <>
        {departments.map((department, index) => {
          return (
            <Grid item xs={4} key={department.id}>
              <div className="d-flex align-items-center" key={index}>
                <input
                  type="checkbox"
                  id={department.id}
                  onChange={this.handleCheck}
                  checked={
                    department.id === Number(this.state.currentSelectedDepId)
                  }
                />
                <label htmlFor={department.id}>{department.name}</label>
              </div>
            </Grid>
          );
        })}
      </>
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.props.selectAccountPopupShow}
        toggle={() => this.props.toggleSelectAccountPopup()}
        className="select-account-modal-container"
      >
        <ModalHeader>
          Select From Existing OU
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => this.props.toggleSelectAccountPopup()}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{ overflow: "hidden", overflowY: "auto", maxHeight: "300px" }}
        >
          <h4 className="text-left m-b-1">Select OU</h4>
          {this.props?.organizationWiseDepartments?.status ===
          status.IN_PROGRESS ? (
            <Box className="text-center align-self-center p-t-20 p-b-20">
              <i className="fa-solid fa-spinner fa-spin" /> Loading...
            </Box>
          ) : (
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
          )}
        </ModalBody>
        <ModalFooter className="footer-top-bar">
          <div className="d-block text-center">
            <Button
              className="secondary-text-btn m-r-2"
              variant="contained"
              onClick={() => {
                this.setState({ currentSelectedDepId: undefined });
                this.props.setID(false);
                this.props.toggleSelectAccountPopup();
              }}
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                if (!this.state.currentSelectedDepId) {
                  ToastMessage.error("Please select any Organizational Unit.");
                } else {
                  this.props.setID(this.state.currentSelectedDepId);
                  this.props.toggleSelectAccountPopup();
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

const mapStateToProps = (state) => {
  const { environments } = state;
  return environments;
};

const mapDispatchToProps = {
  getOrgWiseDepartments,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAccountPopup);

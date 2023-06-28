import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const departments = [
  "HR",
  "Finance",
  "IT",
  "Production",
  "Marketing",
  "Operations",
];

const production = ["HRMS", "Procurement", "WeDesk", "CMS", "AppCube", "HMS"];

const environments = [
  { img: "department", name: "Department" },
  { img: "testing", name: "Testing" },
  { img: "stage", name: "Stage" },
  { img: "production", name: "Production" },
];

class SelectDepartmentPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
      selectedDepartments: [],
      selectedProductions: [],
      selectedEnvs: [],
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      selectedDepartments: [],
      selectedProductions: [],
      selectedEnvs: [],
    });
  };

  setLink = (link) => {
    this.setState({
      link,
    });
  };

  handleCheckChange = (e, type) => {
    const { value, checked } = e.target;
    let { selectedDepartments, selectedProductions } = this.state;
    if (type === "dep") {
      if (checked) {
        this.setState((prevState) => ({
          selectedDepartments: [...prevState.selectedDepartments, value],
        }));
      } else {
        let newChecked = selectedDepartments.filter((item) => item !== value);
        this.setState({
          selectedDepartments: newChecked,
          selectedProductions: [],
          selectedEnvs: [],
        });
      }
    } else if (type === "prod") {
      if (checked) {
        this.setState((prevState) => ({
          selectedProductions: [...prevState.selectedProductions, value],
        }));
      } else {
        let newChecked = selectedProductions.filter((item) => item !== value);
        this.setState({ selectedProductions: newChecked });
      }
    }
  };

  handleEnvChange = (name) => {
    let { selectedEnvs } = this.state;
    if (selectedEnvs.includes(name)) {
      selectedEnvs = selectedEnvs.filter((item) => item !== name);
    } else {
      selectedEnvs.push(name);
    }
    this.setState({ selectedEnvs });
  };

  render() {
    const { selectedProductions, selectedDepartments, selectedEnvs } =
      this.state;
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className="select-account-modal-container"
      >
        <ModalHeader>
          Filter
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.toggle}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
          <h4 className="text-left m-b-1">Select Department</h4>
          <Box sx={{ width: "100%" }} className="border-bottom p-b-10">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              {departments.map((item) => {
                return (
                  <Grid item lg={4} md={4} xs={12}>
                    <Box className="d-flex align-items-center checkbox">
                      <input
                        className="checkbox-input"
                        type="checkbox"
                        value={item}
                        onChange={(e) => this.handleCheckChange(e, "dep")}
                      />
                      <label onClick={(e) => this.handleCheckChange(e, "dep")}>
                        {item}
                      </label>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          {selectedDepartments.length ? (
            <>
              <h4 className="text-left m-b-1 m-t-2">Select Production</h4>
              <Box sx={{ width: "100%" }} className="border-bottom p-b-10">
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  {production.map((item) => {
                    return (
                      <Grid item lg={4} md={4} xs={12}>
                        <Box className="d-flex align-items-center">
                          <input
                            type="checkbox"
                            value={item}
                            onChange={(e) => this.handleCheckChange(e, "prod")}
                          />
                          <label>{item}</label>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </>
          ) : (
            <></>
          )}

          {selectedProductions.length && selectedDepartments.length ? (
            <>
              <h4 className="text-left m-b-1 m-t-2">Select Environment</h4>
              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  {environments.map((item) => {
                    return (
                      <Grid item lg={3} md={4} xs={12}>
                        <Box
                          onClick={() => this.handleEnvChange(item.name)}
                          className={`environment-box ${
                            selectedEnvs.includes(item.name) ? "active" : ""
                          }`}
                        >
                          <Box className="d-block">
                            <Box className={`envir-image ${item.img}`}></Box>
                            <Box className="environment-title">{item.name}</Box>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </>
          ) : (
            <></>
          )}
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <button className="gray-button m-r-1 m-b-0">Clear</button>
            {selectedEnvs.length ? (
              <Link
                to={`${this.state.link}`}
                onClick={this.toggle}
                className="new-button m-b-0"
              >
                Submit
              </Link>
            ) : (
              <></>
            )}
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}
export default SelectDepartmentPopup;

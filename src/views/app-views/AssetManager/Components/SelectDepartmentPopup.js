import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { getProductsByDepId } from "redux/assetManager/environments/environmentsThunk";
import { getCurrentOrgId } from "utils";
import Button from "@mui/material/Button";

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
      selectedDepartments: [],
      selectedProductions: [],
      selectedEnvs: [],
      products: {},
    };
  }

  toggle = () => {
    this.props.togglePopup();
    this.setState({
      selectedDepartments: [],
      products: [],
      selectedEnvs: [],
    });
  };

  handleCheckChange = (e, type, depId,isChecked=false) => {
    let orgId = getCurrentOrgId();
    let departmentId = depId;
    const { value, checked } = e.target;
    let { selectedDepartments, selectedProductions , products} = this.state;
    if (type === "dep") {
      if (checked || isChecked) {
        this.props
          .getProductsByDepId({ orgId: orgId, depId: depId })
          .then((res) => {
            if (res.payload) {
              this.setState((prevState) => ({
                products: { ...prevState.products, [depId]: res.payload },
              }));
            }
          });
      } else {
        let removeProducts = products;
        delete removeProducts[depId];
        this.setState({
          products: removeProducts,
        });
        console.log(removeProducts, "removeProducts");
      }
    } else if (type === "prod") {
      if (checked) {
        this.setState((prevState) => ({
          selectedProductions: [...prevState.selectedProductions, value],
        }));
      } else if (selectedProductions.length <= 1) {
        let newChecked = selectedProductions.filter((item) => item !== value);
        this.setState({ selectedProductions: newChecked, selectedEnvs: [] });
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

  renderDepartMents = () => {
    return this.props.departments.map((department, index) => {
      return (
        <Grid item lg={4} md={4} xs={12} key={index}>
          <Box className="d-flex align-items-center checkbox">
            <input
              className="checkbox-input"
              type="checkbox"
              checked={this.isDepartmentSelected(department.id)}
              onChange={(e) => this.handleCheckChange(e, "dep", department.id)}
            />
            <label htmlFor={department.name}  onClick={(e) => this.handleCheckChange(e, "dep", department.id,!this.isDepartmentSelected(department.id))}>{department.name}</label>
          </Box>
        </Grid>
      );
    });
  };

  renderProducts = () => {
    return Object.keys(this.state.products).map((departmentProducts, index) => {
      return this.state.products[departmentProducts].map(
        (product, innerIndex) => {
          return (
            <Grid key={innerIndex} item lg={4} md={4} xs={12}>
              <Box className="d-flex align-items-center">
                <input
                  type="checkbox"
                  value={product}
                  onChange={(e) => this.handleCheckChange(e, "prod")}
                  id={product}
                />
                <label htmlFor={product}>{product}</label>
              </Box>
            </Grid>
          );
        }
      );
    });
  };

  isDepartmentSelected = (depId) => {
    return (
      this.state.products &&
      Object.keys(this.state.products).length &&
      this.state.products[depId]
    );
  };
  productsLength = ()=>{
    let isProduct = false
    if(this.state.products && Object.keys(this.state.products).length){
      Object.keys(this.state.products).forEach((productKey)=>{
        if (this.state.products[productKey] && this.state.products[productKey].length && !isProduct) {
          isProduct = true
        }
      })
    }
    return isProduct
  }
  render() {
    const { selectedProductions, selectedDepartments, selectedEnvs,products } =
      this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
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
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", height: "300px" }}
        >
          <h4 className="text-left m-b-1">Select Department</h4>
          <Box sx={{ width: "100%" }} className="border-bottom p-b-10">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              {(this.props.departments &&
                this.props.departments.length &&
                this.renderDepartMents()) ||
                ""}
            </Grid>
          </Box>
          {this.productsLength() ? (
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
                  {this.renderProducts()}
                </Grid>
              </Box>
            </>
          ) : (
            <></>
          )}
          {selectedProductions.length && products && Object.keys(products).length ? (
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
                      <Grid key={item.name} item lg={3} md={4} xs={12}>
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
            <button className="gray-button m-r-1 m-b-0" onClick={this.toggle}>
              Clear
            </button>
            {this.productsLength() ? (
              <Link onClick={this.toggle} className="primary-btn m-b-0">
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

const mapStateToProps = (state) => {
  const { orgWiseDepartments, departmentsFilters, productsByDepId } = state;
  return {
    orgWiseDepartments,
    departmentsFilters,
    productsByDepId,
  };
};

const mapDispatchToProps = {
  getProductsByDepId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDepartmentPopup);

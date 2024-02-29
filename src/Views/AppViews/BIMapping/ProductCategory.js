import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import admissionIcon from "assets/img/bimapping/admission.png";
import searchIcon from "assets/img/bimapping/search.png";
import filterIcon from "assets/img/bimapping/filter.png";
import rbacIcon from "assets/img/bimapping/rbac.png";
import ServiceModal from "./Components/ServiceModal";
import { Link } from "react-router-dom";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { setProductIntoDepartment } from "Redux/BIMapping/BIMappingSlice";
import { connect } from "react-redux";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import {
  getSingleValueFromLocalStorage,
  setSingleValueInLocalStorage,
  removeSingleValueFromLocalStorage,
} from "Utils";

class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showServiceModal: false,
    };
  }

  componentDidMount = () => {
    window.addEventListener("load", this.redirectPage);
    window.addEventListener("beforeunload", () => {
      setSingleValueInLocalStorage(
        "departmentName",
        this.props?.createProductFormData?.departmentName
      );
    });
  };

  componentWillUnmount() {
    window.removeEventListener("load", this.redirectPage);
  }

  redirectPage = () => {
    let departMentName = getSingleValueFromLocalStorage("departmentName");
    removeSingleValueFromLocalStorage("departmentName");
    this.props.navigate(
      `${APP_PREFIX_PATH}/bim/add-product/${departMentName
        ?.toLowerCase()
        ?.replace(" ", "-")}`
    );
  };

  handleServiceModal = () => {
    this.setState({
      showServiceModal: !this.state.showServiceModal,
    });
  };
  /** Get url details. */
  getUrlDetails() {
    let name = this.props.params.name;
    return { name };
  }
  render() {
    const { showServiceModal } = this.state;
    let { createProductFormData } = this.props;
    let { name: departMentName } = this.getUrlDetails();
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Product Category</h3>
          <Box className="breadcrumbs">
            <ul>
              <li onClick={() => this.props.navigate("/app/bim")}>
                BI-Mapping
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li
                onClick={() =>
                  this.props.navigate(`/app/bim/add-product/${departMentName}`)
                }
              >
                Add Product
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Product Category</li>
            </ul>
          </Box>
        </Box>

        <Box className="product-category-container">
          <Box className="d-block">
            <Box className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Business Services</h3>
                <Link
                  to={`/app/bim/add-product/${departMentName}/product-category/${createProductFormData?.category
                    ?.toLowerCase()
                    ?.replace(" ", "-")}`}
                >
                  <Button className="primary-btn">Add</Button>
                </Link>
              </Box>
            </Box>
            <Box className="product-category-cards">
              {/* <Box className="product-category-card">
                <Box
                  className="product-category-details"
                  onClick={() => this.handleServiceModal()}
                >
                  <Box className="product-image">
                    <img src={admissionIcon} alt="" />
                  </Box>
                  <span className="d-block name">Admission</span>
                </Box>
              </Box> */}
            </Box>
          </Box>
          <Box className="d-block">
            <Box className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Common Services</h3>
                <Button className="primary-btn">Add</Button>
              </Box>
            </Box>
            <Box className="product-category-cards">
              {/* <Box className="content">
                <p>
                  Driving innovation and efficiency in Business Services through
                  seamless integration of SOA and microservices architecture
                </p>
              </Box> */}
              {/* <Box className="product-category-card">
                <Box
                  className="product-category-details"
                  onClick={() => this.handleServiceModal()}
                >
                  <Box className="product-image">
                    <img src={searchIcon} alt="" />
                  </Box>
                  <span className="d-block name">Search</span>
                </Box>
              </Box> */}
              {/* <Box className="product-category-card">
                <Box
                  className="product-category-details"
                  onClick={() => this.handleServiceModal()}
                >
                  <Box className="product-image">
                    <img src={filterIcon} alt="" />
                  </Box>
                  <span className="d-block name">Filter</span>
                </Box>
              </Box> */}
              {/* <Box className="product-category-card">
                <Box
                  className="product-category-details"
                  onClick={() => this.handleServiceModal()}
                >
                  <Box className="product-image">
                    <img src={rbacIcon} alt="" />
                  </Box>
                  <span className="d-block name">RBAC</span>
                </Box>
              </Box> */}
            </Box>
          </Box>
        </Box>
        {showServiceModal ? (
          <ServiceModal
            showModal={showServiceModal}
            handleServiceModal={this.handleServiceModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { createProductFormData } = state.biMapping;
  return {
    createProductFormData,
  };
}

const mapDispatchToProps = {
  setProductIntoDepartment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ProductCategory));

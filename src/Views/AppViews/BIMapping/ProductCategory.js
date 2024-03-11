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
  };

  componentWillUnmount() {
    window.removeEventListener("load", this.redirectPage);
  }

  redirectPage = () => {
    let { name: departMentName, id } = this.getUrlDetails();

    this.props.navigate(
      `${APP_PREFIX_PATH}/bim/add-product/${departMentName}/${id}`
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
    let id = this.props.params.id;
    return { name, id };
  }
  // Move to next page
  moveToNextPage = (serviceType) => {
    let { createProductFormData } = this.props;
    this.props.setProductIntoDepartment({
      ...createProductFormData,
      serviceType,
    });
  };
  render() {
    const { showServiceModal } = this.state;
    let { createProductFormData } = this.props;
    let { name: departMentName, id } = this.getUrlDetails();
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
                  this.props.navigate(
                    `/app/bim/add-product/${departMentName}/${id}`
                  )
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
                  to={`/app/bim/add-product/${departMentName}/${id}/product-category/${createProductFormData?.category
                    ?.toLowerCase()
                    ?.replace(" ", "-")}`}
                  onClick={() => this.moveToNextPage("business")}
                >
                  <Button className="primary-btn">Add</Button>
                </Link>
              </Box>
            </Box>
            <Box className="product-category-cards"></Box>
          </Box>
          <Box className="d-block">
            <Box className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Common Services</h3>
                <Link
                  to={`/app/bim/add-product/${departMentName}/${id}/product-category/${createProductFormData?.category
                    ?.toLowerCase()
                    ?.replace(" ", "-")}`}
                  onClick={() => this.moveToNextPage("common")}
                >
                  <Button className="primary-btn">Add</Button>
                </Link>
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

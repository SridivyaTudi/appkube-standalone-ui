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
    this.props.navigate(`${APP_PREFIX_PATH}/bim/add-product/${departMentName}`);
  };

  handleServiceModal = () => {
    this.setState({
      showServiceModal: !this.state.showServiceModal,
    });
  };

  render() {
    const { showServiceModal } = this.state;
    let { createProductFormData } = this.props;
    return (
      <Box className="bimapping-container">
        <Box className="global-services-fliter">
          <Box className="heading">
            <Box className="breadcrumbs">
              <ul>
                <li>
                  <p>Synectiks</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>
                  <p>{createProductFormData.departmentName}</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">
                  <p>{createProductFormData.productName}</p>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>

        <Box className="product-category-container">
          <Box className="d-block">
            <Box className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Service type : Business Services</h3>
                <Link
                  to={`/app/bim/add-product/${createProductFormData?.category?.replace(
                    " ",
                    "-"
                  )}`}
                >
                  <Button className="primary-btn">Add</Button>
                </Link>
              </Box>
            </Box>
            <Box className="product-category-cards">
              <Box className="product-category-card">
                <Box
                  className="product-category-details"
                  onClick={() => this.handleServiceModal()}
                >
                  <Box className="product-image">
                    <img src={admissionIcon} alt="" />
                  </Box>
                  <span className="d-block name">Admission</span>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="d-block">
            <Box className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Service type : Common Services</h3>
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
              <Box className="product-category-card">
                <Box
                  className="product-category-details"
                  onClick={() => this.handleServiceModal()}
                >
                  <Box className="product-image">
                    <img src={searchIcon} alt="" />
                  </Box>
                  <span className="d-block name">Search</span>
                </Box>
              </Box>
              <Box className="product-category-card">
                <Box
                  className="product-category-details"
                  onClick={() => this.handleServiceModal()}
                >
                  <Box className="product-image">
                    <img src={filterIcon} alt="" />
                  </Box>
                  <span className="d-block name">Filter</span>
                </Box>
              </Box>
              <Box className="product-category-card">
                <Box
                  className="product-category-details"
                  onClick={() => this.handleServiceModal()}
                >
                  <Box className="product-image">
                    <img src={rbacIcon} alt="" />
                  </Box>
                  <span className="d-block name">RBAC</span>
                </Box>
              </Box>
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

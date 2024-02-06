import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import admissionIcon from "assets/img/bimapping/admission.png";
import searchIcon from "assets/img/bimapping/search.png";
import filterIcon from "assets/img/bimapping/filter.png";
import rbacIcon from "assets/img/bimapping/rbac.png";
import ServiceModal from "./Components/ServiceModal";
import { Link } from "react-router-dom";
class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showServiceModal: false,
    };
  }
  handleServiceModal = () => {
    this.setState({
      showServiceModal: !this.state.showServiceModal,
    });
  };

  render() {
    const { showServiceModal } = this.state;
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Product category : SOA</h3>
        </Box>
        <Box className="product-category-container">
          <Box className="d-block">
            <Box className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Service type : Business Services</h3>
                <Link to={`/app/bim/soa`}>
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

export default ProductCategory;

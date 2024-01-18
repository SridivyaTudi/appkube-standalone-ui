import React, { Component } from "react";
import { Box, Button, Card } from "@mui/material";

class ProductCategory extends Component {
  render() {
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Product category : SOA</h3>
        </Box>
        <Box className="product-category-container">
          <Box className="d-block">
            <Card className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Service type : Business Services</h3>
                <Button className="primary-btn">Add</Button>
              </Box>
            </Card>
            <Card className="product-info-card"></Card>
          </Box>
          <Box className="d-block">
            <Card className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Service type : Business Services</h3>
                <Button className="primary-btn">Add</Button>
              </Box>
            </Card>
            <Card className="product-info-card">
              <Box className="content">
                <p>
                  Driving innovation and efficiency in Business Services through
                  seamless integration of SOA and microservices architecture
                </p>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ProductCategory;

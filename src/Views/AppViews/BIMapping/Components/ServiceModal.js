import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Box, Tabs, Tab, TabPanel } from "@mui/material";
import adminIcon from "../../../../assets/img/bimapping/setting.png";
import deployedIcon from "../../../../assets/img/bimapping/depolyed.png";
import clusterIcon from "../../../../assets/img/bimapping/cluster.png";
import loadIcon from "../../../../assets/img/bimapping/load.png";
import ingressIcon from "../../../../assets/img/bimapping/ingress.png";
import serviceIcon from "../../../../assets/img/bimapping/service.png";

class ServiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { value } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleServiceModal}
        className="service-modal-container"
      >
        <Box className="d-flex align-items-center service-header">
          <Box className="icon">
            <img src={adminIcon} alt="" />
          </Box>
          <span className="name d-block">Admin</span>
        </Box>
        <Box className="tabs-container">
          <Tabs
            value={value}
            onChange={this.handleChange}
            aria-label="basic tabs example"
            className="tabs-title"
          >
            <Tab label="App" />
            <Tab label="Data" />
            <Tab label="Others" />
          </Tabs>
          <Box className="tabs-content">
            {value === 0 && (
              <Box className="d-block">
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={deployedIcon} alt="" />
                    </Box>
                    <span className="name">Deployed To</span>
                  </Box>
                  <span className="number">EKS</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={clusterIcon} alt="" />
                    </Box>
                    <span className="name">Cluster Id</span>
                  </Box>
                  <span className="number">1243</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={loadIcon} alt="" />
                    </Box>
                    <span className="name">Load Balancer ID</span>
                  </Box>
                  <span className="number">4434</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={ingressIcon} alt="" />
                    </Box>
                    <span className="name">Ingress ID</span>
                  </Box>
                  <span className="number">5133</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={serviceIcon} alt="" />
                    </Box>
                    <span className="name">Service ID</span>
                  </Box>
                  <span className="number">8788</span>
                </Box>
              </Box>
            )}
            {value === 1 && (
              <Box className="d-block">
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={deployedIcon} alt="" />
                    </Box>
                    <span className="name">Deployed To</span>
                  </Box>
                  <span className="number">EKS</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={clusterIcon} alt="" />
                    </Box>
                    <span className="name">Cluster Id</span>
                  </Box>
                  <span className="number">3759</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={loadIcon} alt="" />
                    </Box>
                    <span className="name">Load Balancer ID</span>
                  </Box>
                  <span className="number">6766</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={ingressIcon} alt="" />
                    </Box>
                    <span className="name">Ingress ID</span>
                  </Box>
                  <span className="number">9002</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={serviceIcon} alt="" />
                    </Box>
                    <span className="name">Service ID</span>
                  </Box>
                  <span className="number">1726</span>
                </Box>
              </Box>
            )}
            {value === 2 && (
              <Box className="d-block">
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={deployedIcon} alt="" />
                    </Box>
                    <span className="name">Deployed To</span>
                  </Box>
                  <span className="number">EKS</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={clusterIcon} alt="" />
                    </Box>
                    <span className="name">Cluster Id</span>
                  </Box>
                  <span className="number">0987</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={loadIcon} alt="" />
                    </Box>
                    <span className="name">Load Balancer ID</span>
                  </Box>
                  <span className="number">1100</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={ingressIcon} alt="" />
                    </Box>
                    <span className="name">Ingress ID</span>
                  </Box>
                  <span className="number">9789</span>
                </Box>
                <Box className="d-flex justify-content-between service-info-container">
                  <Box className="d-flex align-items-center">
                    <Box className="icon">
                      <img src={serviceIcon} alt="" />
                    </Box>
                    <span className="name">Service ID</span>
                  </Box>
                  <span className="number">5464</span>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    );
  }
}
export default ServiceModal;

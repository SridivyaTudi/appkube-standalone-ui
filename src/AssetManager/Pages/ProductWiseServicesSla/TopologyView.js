import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { images } from "../../img";

export class TopologyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: null,
      modalData: [],
      searchedService: "",
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    const { data, isDataLoaded, searchedService } = this.props;
    if (isDataLoaded) {
      this.setState({
        data: data,
        searchedService: searchedService ? searchedService : "",
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.isDataLoaded &&
      JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)
    ) {
      this.setState({
        data: this.props.data,
        searchedService: this.props.searchedService
          ? this.props.searchedService
          : "",
      });
    }
    if (this.props.searchedService !== prevProps.searchedService) {
      this.setState({
        searchedService: this.props.searchedService
          ? this.props.searchedService
          : "",
      });
    }
  }

  createModalData = (serviceType, hostingType, serviceNature, serviceName) => {
    const { data } = this.state;
    if (
      data &&
      data[serviceType] &&
      data[serviceType][hostingType] &&
      data[serviceType][hostingType][serviceNature] &&
      data[serviceType][hostingType][serviceNature][serviceName]
    ) {
      const services =
        data[serviceType][hostingType][serviceNature][serviceName];
      const modalData = {
        cost: 0,
        performance: 0,
        availability: 0,
        endusage: 0,
        security: 0,
        compliance: 0,
        appServices: [],
        dataServices: [],
        avg: 0,
        serviceName,
      };
      let avgPerformance = 0;
      let avgSecurity = 0;
      let avgAvailability = 0;
      let avgEndUsage = 0;
      let avgCompliance = 0;
      services.map((service) => {
        const {
          serviceType,
          name,
          serviceNature,
          associatedManagedCloudServiceLocation,
          stats,
          associatedLandingZone,
          dbType,
          appType,
        } = service.metadata_json;
        if (service.sla_json) {
          const { availability, performance, security, compliance, endusage } =
            service.sla_json;
          avgPerformance += performance.sla;
          avgAvailability += availability.sla;
          avgEndUsage += endusage.sla;
          avgSecurity += security.sla;
          avgCompliance += compliance.sla;
        }
        if (serviceType === "Data") {
          modalData.dataServices.push({
            name,
            serviceNature,
            location: associatedManagedCloudServiceLocation,
            account: associatedLandingZone,
            dbType: dbType,
          });
        } else {
          modalData.appServices.push({
            name,
            serviceNature,
            location: associatedManagedCloudServiceLocation,
            account: associatedLandingZone,
            appType,
          });
        }
        modalData.cost += stats.totalCostSoFar
          ? parseInt(stats.totalCostSoFar)
          : 0;
      });
      modalData.performance = avgPerformance / services.length;
      modalData.security = avgSecurity / services.length;
      modalData.availability = avgAvailability / services.length;
      modalData.endusage = avgEndUsage / services.length;
      modalData.compliance = avgCompliance / services.length;
      modalData.avg =
        (modalData.performance +
          modalData.security +
          modalData.availability +
          modalData.endusage +
          modalData.compliance) /
        5;
      console.log(modalData);
      this.setState({
        modalData,
      });
    }
  };

  onClickService = (serviceType, hostingType, serviceNature, serviceName) => {
    this.createModalData(serviceType, hostingType, serviceNature, serviceName);
    this.toggle();
  };

  renderServices = (serviceType, hostingType, serviceNature) => {
    const { data, searchedService } = this.state;
    const retData = [];
    if (
      data &&
      data[serviceType] &&
      data[serviceType][hostingType] &&
      data[serviceType][hostingType][serviceNature]
    ) {
      const associatedServices = data[serviceType][hostingType][serviceNature];
      const serviceNames = Object.keys(associatedServices);
      serviceNames.map((serviceName) => {
        if (
          searchedService === "" ||
          serviceName.toLowerCase().indexOf(searchedService.toLowerCase()) !==
            -1
        ) {
          retData.push(
            <li>
              <a
                onClick={() =>
                  this.onClickService(
                    serviceType,
                    hostingType,
                    serviceNature,
                    serviceName
                  )
                }
              >
                {serviceName}
              </a>
            </li>
          );
        }
      });
    }
    return retData;
  };

  renderModalData = (serviceType, isDataService) => {
    const { modalData } = this.state;
    const services = modalData[serviceType];
    const retData = [];
    if (services) {
      services.map((service) => {
        retData.push(
          <div className="row">
            <div className="col-md-3">
              <span>{service.name}</span>
            </div>
            <div className="col-md-3">
              <span>{service.serviceNature}</span>
            </div>
            <div className="col-md-3">
              <span>{service.location}</span>
            </div>
            <div className="col-md-3">
              {isDataService ? (
                <span>
                  <img
                    src={images[service.dbType]}
                    alt=""
                    style={{ maxWidth: "20px", marginRight: "5px" }}
                  />{" "}
                  {service.dbType}
                </span>
              ) : (
                <span>{service.appType}</span>
              )}
            </div>
          </div>
        );
      });
    }
    return retData;
  };

  getClassBasedOnScore = (score) => {
    if (score >= 75) {
      return "green";
    } else if (score >= 50) {
      return "orange";
    } else if (score >= 25) {
      return "yellow";
    } else {
      return "red";
    }
  };

  render() {
    const { modal, modalData } = this.state;
    const isDataModal =
      modalData &&
      modalData["dataServices"] &&
      modalData["dataServices"].length > 0
        ? true
        : false;
    return (
      <>
        <div className="topology-view-container">
          <div className="topology-view-contains">
            <div className="topology-left-nav">
              <ul>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img
                        src={images.MobileApps}
                        alt=""
                        style={{ maxWidth: "24px" }}
                      />
                    </i>
                    <span>Mobile apps</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img
                        src={images.Applications}
                        alt=""
                        style={{ maxWidth: "24px" }}
                      />
                    </i>
                    <span>Applications</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img
                        src={images.Dashboard}
                        alt=""
                        style={{ maxWidth: "24px" }}
                      />
                    </i>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img
                        src={images.Reports}
                        alt=""
                        style={{ maxWidth: "24px" }}
                      />
                    </i>
                    <span>Reports</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img
                        src={images.Query}
                        alt=""
                        style={{ maxWidth: "24px" }}
                      />
                    </i>
                    <span>Query</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img
                        src={images.Api}
                        alt=""
                        style={{ maxWidth: "24px" }}
                      />
                    </i>
                    <span>API</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topology-buttons">
              <ul>
                <li className="waf">
                  <span>WAF</span>
                </li>
                <li className="api-gateway">
                  <span>API Gateway</span>
                </li>
              </ul>
            </div>
            <div className="app-services">
              <div className="heading" style={{ background: "transparent" }}>
                App Services
              </div>
              <div className="app-services-container">
                <div className="services-nav">
                  <ul>
                    <li className="orchestration">
                      <span>Orchestration</span>
                    </li>
                    <li className="business-service">
                      <span>Business Service</span>
                    </li>
                    <li className="common-service">
                      <span>Common Service</span>
                    </li>
                  </ul>
                </div>
                <div className="services-contains">
                  <div className="contains">
                    <div className="sub-heading">Cluster</div>
                    <ul className="orchestration-buttons">
                      <li>
                        <a style={{ color: "#5ca0f0", fontWeight: "bold" }}>
                          Load Balancer
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://mesh.synectiks.net/"
                          target="_blank"
                          style={{ color: "#5ca0f0", fontWeight: "bold" }}
                        >
                          Service Mesh
                        </a>
                      </li>
                    </ul>
                    <ul className="business-service-buttons">
                      {this.renderServices("App", "Cluster", "Business")}
                    </ul>
                    <ul className="common-service-buttons">
                      {this.renderServices("App", "Cluster", "Common")}
                    </ul>
                  </div>
                  <div className="contains">
                    <div className="sub-heading">Server less</div>
                    <ul className="orchestration-buttons"></ul>
                    <ul className="business-service-buttons">
                      {this.renderServices("App", "ServerLess", "Business")}
                    </ul>
                    <ul className="common-service-buttons">
                      {this.renderServices("App", "ServerLess", "Common")}
                    </ul>
                  </div>
                  <div className="contains">
                    <div className="sub-heading">Cloud Managed</div>
                    <ul className="orchestration-buttons"></ul>
                    <ul className="business-service-buttons">
                      {this.renderServices("App", "CloudManaged", "Business")}
                    </ul>
                    <ul className="common-service-buttons">
                      {this.renderServices("App", "CloudManaged", "Common")}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="data-services-right">
              <div className="data-heading">Data Services</div>
              <div className="data-services-buttons">
                <div className="sub-heading">Clustered</div>
                <ul className="common-service-buttons">
                  {this.renderServices("Data", "Cluster", "Business")}
                  {this.renderServices("Data", "Cluster", "Common")}
                </ul>
              </div>
              <div className="data-services-buttons">
                <div className="sub-heading">Cloud Managed</div>
                <ul className="common-service-buttons">
                  {this.renderServices("Data", "CloudManaged", "Business")}
                  {this.renderServices("Data", "CloudManaged", "Common")}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className="modal-topology-view modal-container"
        >
          <ModalHeader>
            {modalData.serviceName}
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.toggle}
            >
              <i class="fal fa-times"></i>
            </button>
          </ModalHeader>
          <ModalBody
            style={{
              height: "calc(75vh - 50px)",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="cost-score">
              <div className="header">
                <div className="total-cost-text">
                  Total Cost : ${modalData.cost}
                </div>
                <div className="total-cost-text">
                  Quality Score : {modalData.avg ? modalData.avg.toFixed(2) : 0}
                  %
                </div>
              </div>
              <div className="body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="content">
                      <label>Performance:</label>
                      <p>
                        {modalData.performance
                          ? modalData.performance.toFixed(2)
                          : 0}
                        %{" "}
                        <span
                          className={this.getClassBasedOnScore(
                            modalData.performance
                              ? modalData.performance.toFixed(2)
                              : 0
                          )}
                        ></span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="content">
                      <label>Availability:</label>
                      <p>
                        {modalData.availability
                          ? modalData.availability.toFixed(2)
                          : 0}
                        %{" "}
                        <span
                          className={this.getClassBasedOnScore(
                            modalData.availability
                              ? modalData.availability.toFixed(2)
                              : 0
                          )}
                        ></span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="content">
                      <label>Security:</label>
                      <p>
                        {modalData.security ? modalData.security.toFixed(2) : 0}
                        %{" "}
                        <span
                          className={this.getClassBasedOnScore(
                            modalData.security
                              ? modalData.security.toFixed(2)
                              : 0
                          )}
                        ></span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="content">
                      <label>End Usage:</label>
                      <p>
                        {modalData.endusage ? modalData.endusage.toFixed(2) : 0}
                        %{" "}
                        <span
                          className={this.getClassBasedOnScore(
                            modalData.endusage
                              ? modalData.endusage.toFixed(2)
                              : 0
                          )}
                        ></span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="content">
                      <label>Compliance:</label>
                      <p>
                        {modalData.compliance
                          ? modalData.compliance.toFixed(2)
                          : 0}
                        %{" "}
                        <span
                          className={this.getClassBasedOnScore(
                            modalData.compliance
                              ? modalData.compliance.toFixed(2)
                              : 0
                          )}
                        ></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table">
              <div className="thead">
                <div className="row">
                  <div className="col-md-3">
                    <span className="first">Service Type</span>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-3">
                        <span>Services</span>
                      </div>
                      <div className="col-md-3">
                        <span>Service Nature</span>
                      </div>
                      <div className="col-md-3">
                        <span>Location</span>
                      </div>
                      <div className="col-md-3">
                        <span>{isDataModal ? "DB Type" : "App Type"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {modalData["appServices"] &&
              modalData["appServices"].length > 0 ? (
                <div className="tbody">
                  <div className="row">
                    <div className="col-md-3">
                      <strong>App Services</strong>
                    </div>
                    <div className="col-md-9">
                      {this.renderModalData("appServices", false)}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {modalData["dataServices"] &&
              modalData["dataServices"].length > 0 ? (
                <div className="tbody">
                  <div className="row">
                    <div className="col-md-3">
                      <strong>Data Services</strong>
                    </div>
                    <div className="col-md-9">
                      {this.renderModalData("dataServices", true)}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

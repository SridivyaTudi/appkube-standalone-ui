import React, { Component } from 'react';
import Icon from '../../../assets/img/assetmanager/icon.png';
// import { images } from '../../img';
// import { Link } from 'react-router-dom';
// import { PLUGIN_BASE_URL } from '../../constants';

class ServicesPerformance extends Component {
  tagNameServiceMapping = {
    App: 'App Services',
    Network: 'Network Services',
    Data: 'Data Services',
    Other: 'Other Services',
  };
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      productToggle: { index: 0, isOpened: false },
      viewMapping: this.props.hostingType,
      mappingOptions: [
        { key: 'CloudManaged', name: 'Cloud Managed' },
        { key: 'Cluster', name: 'Cluster' },
        { key: 'ViewAll', name: 'View All' },
      ],
    };
  }

  toggleEnvironmentView = (index) => {
    const { product } = this.state;
    product.deploymentEnvironmentList.forEach((environment) => {
      environment.isOpen = false;
    });
    product.deploymentEnvironmentList[index].isOpen = true;
    this.setState({
      product,
    });
  };

  toggleCategories = (environmentIndex, categoryIndex) => {
    const { product } = this.state;
    if (
      product.deploymentEnvironmentList[environmentIndex].serviceCategoryList[categoryIndex].serviceNameList &&
      product.deploymentEnvironmentList[environmentIndex].serviceCategoryList[categoryIndex].serviceNameList.length > 0
    ) {
      for (let j = 0; j < product.deploymentEnvironmentList[environmentIndex].serviceCategoryList.length; j++) {
        if (j !== categoryIndex) {
          product.deploymentEnvironmentList[environmentIndex].serviceCategoryList[j].isOpen = false;
        }
      }
      product.deploymentEnvironmentList[environmentIndex].serviceCategoryList[categoryIndex].isOpen = !product
        .deploymentEnvironmentList[environmentIndex].serviceCategoryList[categoryIndex].isOpen;
      this.setState({
        product,
      });
    }
  };

  handleView = (e) => {
    const { name, value } = e.target;
    // let { hostingType } = this.props;
    // hostingType = value;
    this.setState({
      [name]: value,
    });
    this.props.handleChangeViewOfProduct(value);
  };

  onClickMenu = (k, l) => {
    const { product } = this.state;
    if (
      product.deploymentEnvironmentList[k].serviceCategoryList &&
      product.deploymentEnvironmentList[k].serviceCategoryList.length > 0
    ) {
      for (let i = 0; i < product.deploymentEnvironmentList[k].serviceCategoryList.length; i++) {
        if (i !== l) {
          product.deploymentEnvironmentList[k].serviceCategoryList[i].menuOpen = false;
        }
      }
    }
    product.deploymentEnvironmentList[k].serviceCategoryList[l].menuOpen = !product.deploymentEnvironmentList[k]
      .serviceCategoryList[l].menuOpen;
    this.setState({
      product,
    });
  };

  renderStages = (deploymentEnvironmentList) => {
    const { filters } = this.props;
    const environmentFilters = filters['Environments'];
    if (deploymentEnvironmentList) {
      return deploymentEnvironmentList.map((environment, environmentIndex) => {
        if (!environmentFilters || (environmentFilters && environmentFilters.indexOf(environment.name) !== -1)) {
          return (
            <li
              onClick={() => this.toggleEnvironmentView(environmentIndex)}
              className={environment.isOpen == true ? 'active' : ''}
            >
              {environment.name}
            </li>
          );
        }
        return <></>;
      });
    }
    return null;
  };

  renderCategories = (categories, environmentIndex) => {
    let retData = [];
    if (categories) {
      // return categories.map((category, categoryIndex: number) => {
      for (let h = 0; h < categories.length; h++) {
        let category = categories[h];
        let categoryIndex = h;
        // if (category.serviceNameList && category.serviceNameList.length > 0) {
        //   for (let i = 0; i < category.serviceNameList.length; i++) {
        //     if (category.serviceNameList[i].tagList && category.serviceNameList[i].tagList.length > 0) {
        //       for (let j = 0; j < category.serviceNameList[i].tagList.length; j++) {
        //         if (category.serviceNameList[i].tagList[j].serviceList && category.serviceNameList[i].tagList[j].serviceList.length > 0) {
        //           for (let k = 0; k < category.serviceNameList[i].tagList[j].serviceList.length; k++) {
        //             category['hostingType'] = category.serviceNameList[i].tagList[j].serviceList[k].hostingType;
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        // if ((category.hostingType === this.props.hostingType) && (this.props.hostingType!=="ViewAll") ) {
        retData.push(
          <>
            <li>
              {!category.isOpen && (
                <div className="icon">
                  <div className="gauge">
                    <div className="gauge__container">
                      <img src={Icon} alt="" />
                      <div className="gauge__center"></div>
                      <div
                        className="gauge__needle"
                        style={{
                          transform: `rotate(${parseInt(category.overallScore, 10) / 200 + 0.5}turn)`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div className={category.isOpen === true ? 'heading full' : 'heading'}>
                <span onClick={() => this.toggleCategories(environmentIndex, categoryIndex)}>{category.name}</span>
                <div className="icon">
                  <div className="fa-icon" onClick={() => this.toggleCategories(environmentIndex, categoryIndex)}>
                    <i className={category.isOpen === true ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}></i>
                  </div>
                  <div className="edit">
                    <div className="bars" onClick={() => this.onClickMenu(environmentIndex, categoryIndex)}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    {category.menuOpen == true && (
                      <>
                        <div
                          className="open-create-menu-close"
                          onClick={() => this.onClickMenu(environmentIndex, categoryIndex)}
                        >
                          {' '}
                        </div>
                        <div
                          className="text-center open-create-menu"
                          style={{ right: '5px', top: '30px', backgroundColor: '#ffffff' }}
                        >
                          <a href="#"> Add Firewall </a>
                          <a href="#"> Remove Firewall </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {category.isOpen === true && category.serviceNameList && category.serviceNameList.length > 0 && (
                <div className="content-table">
                  <div className="table">
                    <div className="thead">
                      <div className="th">Name</div>
                      <div className="th">Performance</div>
                      <div className="th">Availability</div>
                      <div className="th">Security</div>
                      <div className="th">Compliance</div>
                      <div className="th">End Usage</div>
                    </div>
                    <div style={{ maxHeight: '400px', overflowX: 'hidden', overflowY: 'auto' }}>
                      {this.renderServiceName(category.serviceNameList, [environmentIndex, categoryIndex])}
                    </div>
                  </div>
                </div>
              )}
            </li>
          </>
        );
        // }
        // else if(this.props.hostingType === "ViewAll"){
        //   retData.push(
        //     <>
        //       <li>
        //         {!category.isOpen &&
        //           <div className='icon'>
        //             <div className="gauge">
        //               <div className="gauge__container">
        //                 <img src={images.Icon} alt="" />
        //                 <div className="gauge__center"></div>
        //                 <div
        //                   className="gauge__needle"
        //                   style={{
        //                     transform: `rotate(${parseInt(category.overallScore, 10) /
        //                       200 +
        //                       0.5
        //                       }turn)`,
        //                   }}
        //                 ></div>
        //               </div>
        //             </div>
        //           </div>
        //         }
        //         <div className={category.isOpen === true ? 'heading full' : 'heading'} >
        //           <span onClick={() => this.toggleCategories(environmentIndex, categoryIndex)}>
        //             {category.name}
        //           </span>
        //           <div className='icon'>
        //             <div
        //               className='fa-icon'
        //               onClick={() => this.toggleCategories(environmentIndex, categoryIndex)}
        //             >
        //               <i className={category.isOpen === true ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}></i>
        //             </div>
        //             <div className='edit'>
        //               <div
        //                 className='bars'
        //                 onClick={() => this.onClickMenu(environmentIndex, categoryIndex)}
        //               >
        //                 <span></span>
        //                 <span></span>
        //                 <span></span>
        //               </div>
        //               {category.menuOpen == true && (
        //                 <>
        //                   <div className="open-create-menu-close" onClick={() => this.onClickMenu(environmentIndex, categoryIndex)}>    </div>
        //                   <div className="text-center open-create-menu" style={{ right: '5px', top: '30px', backgroundColor: '#ffffff' }}>
        //                     <a href='#'> Add Firewall </a>
        //                     <a href='#'> Remove Firewall </a>
        //                   </div>
        //                 </>
        //               )}
        //             </div>
        //           </div>
        //         </div>
        //         {category.isOpen === true && category.serviceNameList && category.serviceNameList.length > 0 &&
        //           <div className='content-table'>
        //             <div className='table'>
        //               <div className='thead'>
        //                 <div className='th'>Name</div>
        //                 <div className='th'>Performance</div>
        //                 <div className='th'>Availability</div>
        //                 <div className='th'>Security</div>
        //                 <div className='th'>Data Protection</div>
        //                 <div className='th'>User exp</div>
        //               </div>
        //               <div style={{ maxHeight: '400px', overflowX: 'hidden', overflowY: 'auto' }}>
        //                 {this.renderServiceName(category.serviceNameList, [environmentIndex, categoryIndex])}
        //               </div>
        //             </div>
        //           </div>
        //         }
        //       </li>

        //     </>
        //   );
        // }
      }
    }
    if (retData.length > 0) {
      return retData;
    } else {
      retData.push(
        <div className="tabs-container">
          <span>No Services found in this view please select other view</span>
        </div>
      );
      return retData;
    }
  };

  renderServiceName = (serviceNames, indexArr) => {
    const retData = [];
    let displayType = [];
    serviceNames.map((serviceName, index) => {
      displayType = [];
      if (serviceName.tagList && serviceName.tagList.length > 0) {
        for (let j = 0; j < serviceName.tagList.length; j++) {
          let tag = serviceName.tagList[j];
          displayType.push(tag.tagName);
        }
      }
      if (displayType.indexOf('Unlinked') === -1) {
        retData.push(
          <div className="table performance-table">
            <div className="tbody">
              <div className="tbody" onClick={() => this.openTagServices(indexArr, index)}>
                <div className="td" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <strong style={{ marginRight: '15px' }}>{serviceName.name}</strong>
                  <i className={serviceName.isOpen === true ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}></i>
                </div>
              </div>
              {serviceName.tagList && serviceName.tagList.length > 0 ? (
                serviceName.isOpen ? (
                  this.renderTags(serviceName.tagList)
                ) : (
                  <></>
                )
              ) : (
                <div className="tbody">
                  <div className="td title">
                    <strong>
                      {serviceName.name}
                      <i className={serviceName.isOpen == true ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}></i>
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      } else {
        retData.push(this.renderDirectSerices(serviceName.tagList));
      }
    });
    return retData;
  };

  onClickDirectService = (e, service) => {
    let serviceData = localStorage.getItem('added-services');
    if (serviceData) {
      serviceData = JSON.parse(serviceData);
    } else {
      serviceData = [];
    }
    let existingIndex = -1;
    for (let i = 0; i < serviceData.length; i++) {
      if (serviceData[i].id === service.id) {
        existingIndex = i;
        break;
      }
    }
    if (existingIndex !== -1) {
      serviceData.splice(existingIndex, 1);
    }
    let avgScore =
      (service.performance.score +
        service.availability.score +
        service.security.score +
        service.dataProtection.score +
        service.userExperiance.score) /
      5;
    serviceData.push({
      id: service.id,
      name: service.name,
      labelText: `${service.associatedProductEnclave} > ${service.associatedCluster} > ${service.associatedEnv} > ${service.serviceType} Services`,
      organizationUnit: service.associatedOU,
      serviceType: service.serviceType,
      serviceScore: avgScore.toFixed(2),
      associatedProduct: service.associatedProduct,
      asscociatedEnv: service.associatedEnv,
    });
    localStorage.setItem('added-services', JSON.stringify(serviceData));
  };

  renderTags = (tagList) => {
    // const { accountId, cloudName } = this.props;
    const { viewMapping } = this.state;
    const retData = [];
    const renderIndex = ['App', 'Data', 'Network', 'Other'];
    renderIndex.forEach((renderTag) => {
      tagList.forEach((tag, i) => {
        if (tag.tagName === renderTag) {
          retData.push(
            <div className="tbody">
              <div className="td">
                <span>{this.tagNameServiceMapping[tag.tagName]}</span>
              </div>
              {tag.serviceList &&
                tag.serviceList.map((service, i) => {
                  const { slaJson } = service;
                  const availability = slaJson ? slaJson.availability : { sla: 0 };
                  const compliance = slaJson ? slaJson.compliance : { sla: 0 };
                  const endusage = slaJson ? slaJson.endusage : { sla: 0 };
                  const performance = slaJson ? slaJson.performance : { sla: 0 };
                  const security = slaJson ? slaJson.security : { sla: 0 };
                  if (service.hostingType === this.props.hostingType || viewMapping === 'ViewAll') {
                    return (
                      <div className="tbody">
                        <div className="td" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                          <span style={{ paddingLeft: '45px' }}>{service.name}</span>
                        </div>
                        <div className="td">
                          <div
                            title={performance.sla.toFixed(2)}
                            className={`progress-circle ${this.getPerformanceClass(performance.sla.toFixed(2))}`}
                          >
                            <i className="fa fa-check-circle"></i>
                          </div>
                        </div>
                        <div className="td">
                          <div
                            title={availability.sla.toFixed(2)}
                            className={`progress-circle ${this.getPerformanceClass(availability.sla.toFixed(2))}`}
                          >
                            <i className="fa fa-check-circle"></i>
                          </div>
                        </div>
                        <div className="td">
                          <div
                            title={security.sla.toFixed(2)}
                            className={`progress-circle ${this.getPerformanceClass(security.sla.toFixed(2))}`}
                          >
                            <i className="fa fa-check-circle"></i>
                          </div>
                        </div>
                        <div className="td">
                          <div
                            title={compliance.sla.toFixed(2)}
                            className={`progress-circle ${this.getPerformanceClass(compliance.sla.toFixed(2))}`}
                          >
                            <i className="fa fa-check-circle"></i>
                          </div>
                        </div>
                        <div className="td">
                          <div
                            title={endusage.sla.toFixed(2)}
                            className={`progress-circle ${this.getPerformanceClass(endusage.sla.toFixed(2))}`}
                          >
                            <i className="fa fa-check-circle"></i>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return <></>;
                })}
            </div>
          );
        }
      });
    });
    return retData;
  };

  renderDirectSerices = (tagList) => {
    const retData = [];
    tagList.forEach((tag, i) => {
      const servicesJSX = [];
      tag.serviceList &&
        tag.serviceList.forEach((service, i) => {
          const { slaJson } = service;
          const availability = slaJson ? slaJson.availability : { sla: 0 };
          const compliance = slaJson ? slaJson.compliance : { sla: 0 };
          const endusage = slaJson ? slaJson.endusage : { sla: 0 };
          const performance = slaJson ? slaJson.performance : { sla: 0 };
          const security = slaJson ? slaJson.security : { sla: 0 };
          if (service.hostingType === this.props.hostingType) {
            servicesJSX.push(
              <div className="tbody">
                <div className="td" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ paddingLeft: '0px' }}>{service.name}</span>
                </div>
                <div className="td">
                  <div
                    title={performance.sla.toFixed(2)}
                    className={`progress-circle ${this.getPerformanceClass(performance.sla.toFixed(2))}`}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                </div>
                <div className="td">
                  <div
                    title={availability.sla.toFixed(2)}
                    className={`progress-circle ${this.getPerformanceClass(availability.sla.toFixed(2))}`}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                </div>
                <div className="td">
                  <div
                    title={security.sla.toFixed(2)}
                    className={`progress-circle ${this.getPerformanceClass(security.sla.toFixed(2))}`}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                </div>
                <div className="td">
                  <div
                    title={compliance.sla.toFixed(2)}
                    className={`progress-circle ${this.getPerformanceClass(compliance.sla.toFixed(2))}`}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                </div>
                <div className="td">
                  <div
                    title={endusage.sla.toFixed(2)}
                    className={`progress-circle ${this.getPerformanceClass(endusage.sla.toFixed(2))}`}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                </div>
              </div>
            );
          }
        });
      retData.push(<div className="performance-table">{servicesJSX}</div>);
    });
    return retData;
  };

  openTagServices = (parentIndex, currentIndex) => {
    const { product } = this.state;
    if (
      product.deploymentEnvironmentList[parentIndex[0]].serviceCategoryList[parentIndex[1]].serviceNameList &&
      product.deploymentEnvironmentList[parentIndex[0]].serviceCategoryList[parentIndex[1]].serviceNameList.length > 0
    ) {
      if (
        product.deploymentEnvironmentList[parentIndex[0]].serviceCategoryList[parentIndex[1]].serviceNameList[
          currentIndex
        ].isOpen
      ) {
        product.deploymentEnvironmentList[parentIndex[0]].serviceCategoryList[parentIndex[1]].serviceNameList[
          currentIndex
        ].isOpen = !product.deploymentEnvironmentList[parentIndex[0]].serviceCategoryList[parentIndex[1]]
          .serviceNameList[currentIndex].isOpen;
      } else {
        product.deploymentEnvironmentList[parentIndex[0]].serviceCategoryList[parentIndex[1]].serviceNameList[
          currentIndex
        ].isOpen = true;
      }
    }
    this.setState({
      product,
    });
  };

  getPerformanceClass = (score) => {
    if (score >= 75) {
      return 'green';
    } else if (score >= 50) {
      return 'orange';
    } else if (score >= 25) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  render() {
    const { product, viewMapping } = this.state;
    return (
      <div className="environments">
        <div className="environments-inner">
          <div className="heading">
            <h3>Deployment environments</h3>
            <div className="buttons">
              {/* <h3 style={{ paddingRight: '10px' }}>{viewMapping}</h3> */}
              <select name="viewMapping" id="options" value={viewMapping} onChange={this.handleView}>
                <option value="CloudManaged">Cloud Managed</option>
                <option value="Cluster">Cluster</option>
                <option value="ViewAll">View All</option>
              </select>
              <button className="btn">
                <i className="fa fa-plus"></i>
              </button>
              <button className="btn">
                <i className="fa fa-bars"></i>
              </button>
            </div>
          </div>
          <div className="content">
            <div className="tabs-container">
              <div className="tabs">
                <ul>{this.renderStages(product.deploymentEnvironmentList)}</ul>
              </div>
              {product.deploymentEnvironmentList &&
                product.deploymentEnvironmentList.map((environment, environmentIndex) => {
                  // && environment.hostingShow == true
                  if (environment.isOpen == true) {
                    return (
                      <div className="tabs-content">
                        <ul>{this.renderCategories(environment.serviceCategoryList, environmentIndex)}</ul>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
            {/* {product.deploymentEnvironmentList && product.deploymentEnvironmentList.map((environment, index) => {
              if (environment.isOpen == true && environment.hostingShow == false) {
                return (
                  <div className='tabs-container'>
                    {index == 0 &&
                      <span>No Services found in this view please select other view</span>
                    }
                  </div>
                );
              }else{
                return null;
              }
            })} */}
          </div>
        </div>
      </div>
    );
  }
}

export default ServicesPerformance;

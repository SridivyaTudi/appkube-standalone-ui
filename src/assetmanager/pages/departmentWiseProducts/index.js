import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Jobs from '../../../assets/img/jobs.png';
import ProductWiseServices from '../../components/ProductWiseServices';
import { RestService } from '../_service/RestService';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import _ from 'lodash';

ChartJS.register(ArcElement, Tooltip, Legend);

class DepartmentWiseProducts extends Component {
  colorMapping = {
    75: '#5dbc73',
    50: '#ef8f00',
    25: '#e34120',
  };
  constructor(props) {
    super(props);
    this.state = {
      showRecentFilter: false,
      showAddNewFilter: false,
      product: [],
      departmentWiseData: [],
      graphData: {
        productionvsOthersData: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [],
            },
          ],
        },
        productWiseCostData: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [],
            },
          ],
        },
        serviceWiseCoastData: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [],
            },
          ],
        },
      },
      productWiseCostOptions: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
            display: false,
            position: 'bottom',
            responsive: true,
            align: 'middle',
          },
          title: {
            display: true,
            text: '',
            position: 'bottom',
            color: '#202020',
            font: {
              size: 18,
            },
          },
        },
      },
      productionvsOthersOptions: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
            display: false,
            position: 'bottom',
            responsive: true,
            align: 'middle',
          },
          title: {
            display: true,
            text: 'Total Cost: $6,71,246',
            position: 'bottom',
            color: '#202020',
            font: {
              size: 18,
            },
          },
        },
      },
      serviceWiseCoastOptions: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
            display: false,
            position: 'bottom',
            responsive: true,
            align: 'middle',
          },
          title: {
            display: true,
            text: 'Total Cost: $6,71,246',
            position: 'bottom',
            color: '#202020',
            font: {
              size: 18,
            },
          },
        },
      },
      displayJsonData: [
        {
          name: 'Products',
          key: 'products',
          id: 22,
          filter: [],
        },
        {
          name: 'Environments',
          key: 'environments',
          id: 29,
          filter: [],
        },
        {
          name: 'App Services',
          key: 'app-services',
          id: 31,
          filter: [],
        },
        {
          name: 'Data Services',
          key: 'data-services',
          id: 40,
          filter: [],
        },
      ],
    };
  }

  componentDidMount() {
    this.getDepartmentData();
    this.getRandomColor();
  }

  getDepartmentData = async () => {
    try {
      await RestService.getData(`${this.config.GET_PRODUCT_DATA}`, null, null).then((response) => {
        this.manipulateDepartmentWiseProductData(_.cloneDeep(response.organization.departmentList));
        this.getFilterData(_.cloneDeep(response.organization.departmentList));
        this.setState({
          departmentWiseData: response.organization.departmentList,
        });
        localStorage.setItem('departmentData', JSON.stringify(response));
        let { graphData } = this.state;
        graphData = this.setProductGraphData(response.organization.departmentList, graphData);
        graphData = this.setProductionOthers(response.organization.departmentList, graphData);
        graphData = this.setServiceCostData(response.organization.departmentList, graphData);
        this.setState({
          graphData,
        });
      });
    } catch (err) {
      console.log('Loading accounts failed. Error: ', err);
    }
  };

  calculatePercentage = (value, total) => {
    if (value === 0 && total === 0) {
      return 0;
    } else {
      return Math.ceil((value * 100) / total);
    }
  };

  manipulateDepartmentWiseProductData = (departmentList) => {
    for (let i = 0; i < departmentList.length; i++) {
      const department = departmentList[i];
      const productList = department.productList;
      productList.forEach((product) => {
        if (product.deploymentEnvironmentList && product.deploymentEnvironmentList.length > 0) {
          product.deploymentEnvironmentList[0].isOpen = true;
        }
        const environments = product.deploymentEnvironmentList;
        if (environments) {
          environments.forEach((environent) => {
            const serviceCategoryList = environent.serviceCategoryList;
            if (serviceCategoryList) {
              serviceCategoryList.forEach((category) => {
                const serviceNameList = category.serviceNameList;
                let serviceCategoryScore = 0;
                if (serviceNameList) {
                  serviceNameList.forEach((serviceName) => {
                    const tagList = serviceName.tagList;
                    if (tagList) {
                      let overAllServiceNameScore = 0;
                      tagList.forEach((tag) => {
                        const serviceList = tag.serviceList;
                        if (serviceList) {
                          let overAllTagScore = 0;
                          serviceList.forEach((service) => {
                            let avg = 0;
                            if (service.slaJson) {
                              const { availability, compliance, endusage, performance, security } = service.slaJson;
                              avg =
                                (availability.sla + compliance.sla + performance.sla + security.sla + endusage.sla) / 5;
                            }
                            overAllTagScore += avg;
                          });
                          overAllTagScore = overAllTagScore / serviceList.length;
                          overAllServiceNameScore += overAllTagScore;
                        }
                      });
                      overAllServiceNameScore = overAllServiceNameScore / tagList.length;
                      serviceCategoryScore = serviceCategoryScore + overAllServiceNameScore;
                    }
                  });
                  serviceCategoryScore = serviceCategoryScore / serviceNameList.length;
                }
                category.overallScore = serviceCategoryScore;
              });
            }
          });
        }
      });
      // department.productList = newProductList;
    }
    this.setState({
      product: departmentList,
    });
  };

  getFilterData = (departmentList) => {
    let { displayJsonData } = this.state;
    let product = [];
    let environent = [];
    let appList = [];
    let dataList = [];
    if (departmentList && departmentList.length > 0) {
      for (let i = 0; i < departmentList.length; i++) {
        let department = departmentList[i];
        if (department.productList) {
          for (let j = 0; j < department.productList.length; j++) {
            if (product.indexOf(department.productList[j].name === -1)) {
              product.push(department.productList[j].name);
            }
            let products = department.productList[j];
            if (products.deploymentEnvironmentList && products.deploymentEnvironmentList.length > 0) {
              for (let k = 0; k < products.deploymentEnvironmentList.length; k++) {
                let environments = products.deploymentEnvironmentList[k];
                if (environent.indexOf(environments.name) === -1) {
                  environent.push(environments.name);
                }
                if (environments.serviceCategoryList && environments.serviceCategoryList.length > 0) {
                  for (let l = 0; l < environments.serviceCategoryList.length; l++) {
                    let category = environments.serviceCategoryList[l];
                    if (category.serviceNameList && category.serviceNameList.length > 0) {
                      for (let n = 0; n < category.serviceNameList.length; n++) {
                        let setviceList = category.serviceNameList[n];
                        if (setviceList.tagList && setviceList.tagList.length > 0) {
                          for (let p = 0; p < setviceList.tagList.length; p++) {
                            let tagName = setviceList.tagList[p];
                            if (tagName.tagName === 'Data') {
                              if (tagName.serviceList && tagName.serviceList.length > 0) {
                                for (let q = 0; q < tagName.serviceList.length; q++) {
                                  if (dataList.indexOf(tagName.serviceList[q].name) === -1) {
                                    dataList.push(tagName.serviceList[q].name);
                                  }
                                }
                              }
                            } else if (tagName.tagName === 'App') {
                              if (tagName.serviceList && tagName.serviceList.length > 0) {
                                for (let q = 0; q < tagName.serviceList.length; q++) {
                                  if (appList.indexOf(tagName.serviceList[q].name) === -1) {
                                    appList.push(tagName.serviceList[q].name);
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (displayJsonData && displayJsonData.length > 0) {
      for (let d = 0; d < displayJsonData.length; d++) {
        if (displayJsonData[d].key === 'products') {
          if (product && product.length > 0) {
            for (let h = 0; h < product.length; h++) {
              displayJsonData[d].filter.push({ label: product[h], value: product[h], id: h });
            }
          }
        } else if (displayJsonData[d].key === 'environments') {
          if (environent && environent.length > 0) {
            for (let m = 0; m < environent.length; m++) {
              displayJsonData[d].filter.push({ label: environent[m], value: environent[m], id: m + 9 });
            }
          }
        } else if (displayJsonData[d].key === 'app-services') {
          if (appList && appList.length > 0) {
            for (let g = 0; g < appList.length; g++) {
              displayJsonData[d].filter.push({ label: appList[g], value: appList[g], id: g + 80 });
            }
          }
        } else if (displayJsonData[d].key === 'data-services') {
          if (dataList && dataList.length > 0) {
            for (let s = 0; s < dataList.length; s++) {
              displayJsonData[d].filter.push({ label: dataList[s], value: dataList[s], id: s + 100 });
            }
          }
        }
      }
    }
    this.setState({
      displayJsonData,
    });
  };

  setProductGraphData = (departmentWiseData, graphData) => {
    let { productWiseCostOptions } = this.state;
    let totalCostList = [];
    let labels = [];
    let totalCost = 0;
    if (departmentWiseData && departmentWiseData.length > 0) {
      for (let i = 0; i < departmentWiseData.length; i++) {
        let department = departmentWiseData[i];
        if (department.productList) {
          department.productList.map((product, index) => {
            let totalProductCost = 0;
            if (labels.indexOf(product.name) === -1) {
              labels.push(product.name);
            }
            if (product.deploymentEnvironmentList) {
              product.deploymentEnvironmentList.map((environment, envIndex) => {
                if (environment.serviceCategoryList) {
                  environment.serviceCategoryList.map((category, catIndex) => {
                    if (category.serviceNameList) {
                      category.serviceNameList.map((serviceName) => {
                        if (serviceName.tagList) {
                          serviceName.tagList.map((tag) => {
                            if (tag.serviceList) {
                              tag.serviceList.map((service) => {
                                totalProductCost += service.serviceBilling.amount;
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
            totalCost += totalProductCost;
            totalCostList.push(totalProductCost);
          });
        }
      }
    }
    graphData.productWiseCostData.labels = labels;
    graphData.productWiseCostData.datasets[0].data = totalCostList;
    for (let i = 0; i < totalCostList.length; i++) {
      graphData.productWiseCostData.datasets[0].backgroundColor.push(this.getRandomColor());
    }
    productWiseCostOptions.plugins.title.text = `Total Cost: $${totalCost.toFixed(2)}`;
    this.setState({
      productWiseCostOptions,
    });
    return graphData;
  };

  setProductionOthers = (departmentWiseData, graphData) => {
    let { productionvsOthersOptions } = this.state;
    let totalProductionCost = 0;
    const labels = ['Production', 'Others'];
    let totalOtherCost = 0;
    if (departmentWiseData && departmentWiseData.length > 0) {
      for (let i = 0; i < departmentWiseData.length; i++) {
        let department = departmentWiseData[i];
        if (department.productList) {
          department.productList.map((product, index) => {
            if (product.deploymentEnvironmentList) {
              product.deploymentEnvironmentList.map((environment, envIndex) => {
                if (environment.serviceCategoryList) {
                  environment.serviceCategoryList.map((category, catIndex) => {
                    if (category.serviceNameList) {
                      category.serviceNameList.map((serviceName) => {
                        if (serviceName.tagList) {
                          serviceName.tagList.map((tag) => {
                            if (tag.serviceList) {
                              tag.serviceList.map((service) => {
                                if (environment.name === 'PROD') {
                                  totalProductionCost += service.serviceBilling.amount;
                                } else {
                                  totalOtherCost += service.serviceBilling.amount;
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      }
      const data = [];
      data.push(totalProductionCost);
      data.push(totalOtherCost);
      graphData.productionvsOthersData.labels = labels;
      graphData.productionvsOthersData.datasets[0].data = data;
      for (let i = 0; i < data.length; i++) {
        graphData.productionvsOthersData.datasets[0].backgroundColor.push(this.getRandomColor());
      }
      productionvsOthersOptions.plugins.title.text = `Total Cost: $${(totalProductionCost + totalOtherCost).toFixed(
        2
      )}`;
      this.setState({
        productionvsOthersOptions,
      });
    }
    return graphData;
  };

  setServiceCostData = (departmentWiseData, graphData) => {
    let { serviceWiseCoastOptions } = this.state;
    let data = [];
    let totalCount = 0;
    let labels = [];
    let serviceByType = {};
    if (departmentWiseData && departmentWiseData.length > 0) {
      for (let i = 0; i < departmentWiseData.length; i++) {
        let department = departmentWiseData[i];
        if (department.productList) {
          for (let j = 0; j < department.productList.length; j++) {
            let product = department.productList[j];
            if (product.deploymentEnvironmentList) {
              for (let k = 0; k < product.deploymentEnvironmentList.length; k++) {
                let environment = product.deploymentEnvironmentList[k];
                if (environment.serviceCategoryList && environment.serviceCategoryList.length > 0) {
                  for (let l = 0; l < environment.serviceCategoryList.length; l++) {
                    if (
                      environment.serviceCategoryList[l].serviceNameList &&
                      environment.serviceCategoryList[l].serviceNameList.length > 0
                    ) {
                      for (let n = 0; n < environment.serviceCategoryList[l].serviceNameList.length; n++) {
                        let serviceNameList = environment.serviceCategoryList[l].serviceNameList[n];
                        if (serviceNameList.tagList && serviceNameList.tagList.length > 0) {
                          for (let m = 0; m < serviceNameList.tagList.length; m++) {
                            let tag = serviceNameList.tagList[m];
                            if (tag && tag.serviceList) {
                              tag.serviceList.map((service) => {
                                serviceByType[tag.tagName] = serviceByType[tag.tagName] || 0;
                                serviceByType[tag.tagName] += service.serviceBilling.amount;
                              });
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      for (var key in serviceByType) {
        totalCount += serviceByType[key];
        data.push(serviceByType[key]);
        labels.push(key);
      }
    }
    graphData.serviceWiseCoastData.labels = labels;
    graphData.serviceWiseCoastData.datasets[0].data = data;
    for (let i = 0; i < data.length; i++) {
      graphData.serviceWiseCoastData.datasets[0].backgroundColor.push(this.getRandomColor());
    }
    serviceWiseCoastOptions.plugins.title.text = `Total Cost: $${totalCount.toFixed(2)}`;
    this.setState({
      serviceWiseCoastOptions,
    });
    return graphData;
  };

  renderDepartmentWiseData = (departments) => {
    if (departments) {
      return departments.map((department, index) => {
        let serviceByType = {};
        var productionTotal = 0;
        var othersTotal = 0;
        if (department.productList) {
          for (let i = 0; i < department.productList.length; i++) {
            let product = department.productList[i];
            for (let b = 0; b < product.deploymentEnvironmentList.length; b++) {
              let environment = product.deploymentEnvironmentList[b];
              if (environment.serviceCategoryList && environment.serviceCategoryList.length > 0) {
                for (let a = 0; a < environment.serviceCategoryList.length; a++) {
                  const serviceCategory = environment.serviceCategoryList[a];
                  if (serviceCategory.serviceNameList && serviceCategory.serviceNameList.length > 0) {
                    for (let n = 0; n < serviceCategory.serviceNameList.length; n++) {
                      let serviceName = serviceCategory.serviceNameList[n];
                      if (serviceName.tagList) {
                        serviceName.tagList.map((tag) => {
                          serviceByType[tag.tagName] = serviceByType[tag.tagName] || 0;
                          serviceByType[tag.tagName] += tag.serviceList ? tag.serviceList.length : 0;
                          if (tag && tag.serviceList) {
                            tag.serviceList.map((service) => {
                              if (environment.name === 'PROD') {
                                productionTotal += service.serviceBilling.amount;
                              } else {
                                othersTotal += service.serviceBilling.amount;
                              }
                            });
                          }
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
        const percentage = this.calculatePercentage(productionTotal, productionTotal + othersTotal);
        let color = '';
        if (percentage >= 75) {
          color = this.colorMapping[75];
        } else if (percentage >= 50) {
          color = this.colorMapping[50];
        } else {
          color = this.colorMapping[25];
        }
        const endcodedDName = department.name.replace('&', ';amp;');
        return (
          <div className="department-box" key={index}>
            <Link to={`/department-wise-charts?department=${endcodedDName}`} className="heading">
              {department.name}
            </Link>
            <div className="contents">
              <ul>
                <li>
                  <label>No. of Products</label>
                  <span>{department.productList.length}</span>
                </li>
                <li>
                  <label>No. of App Services</label>
                  <span>{serviceByType['App'] || 0}</span>
                </li>
                <li>
                  <label>No. of Data Services</label>
                  <span>{serviceByType['Data'] || 0}</span>
                </li>
                <li>
                  <label>No. of Network Services</label>
                  <span>{serviceByType['Network'] || 0}</span>
                </li>
                <li>
                  <label>No. of Other Services</label>
                  <span>{serviceByType['Other'] || 0}</span>
                </li>
              </ul>
              <div className="production-heading">
                <label>Production Usage Ratio:&nbsp;</label>
                <span>{percentage}%</span>
              </div>
              <div className="production-chart">
                <CircularProgressbar
                  value={percentage}
                  text={`$${(productionTotal + othersTotal).toFixed(2)}`}
                  strokeWidth={20}
                  styles={{
                    trail: {
                      stroke: '#F6EEFF',
                    },
                    path: {
                      stroke: color,
                      strokeLinecap: 'butt',
                    },
                    text: {
                      fontSize: '10px',
                      fontWeight: 'bold',
                      fill: '#000',
                    },
                  }}
                />
              </div>
              <div className="production-billing-text">
                <label style={{ color }}>Production Billing:</label>
                <span style={{ color }}>${productionTotal.toFixed(2)}</span>
              </div>
              <div className="production-billing-text">
                <label>Other Billing:</label>
                <span>${othersTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        );
      });
    }
    return [];
  };

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    const {
      departmentWiseData,
      graphData,
      productWiseCostOptions,
      productionvsOthersOptions,
      serviceWiseCoastOptions,
      product,
      displayJsonData,
    } = this.state;
    return (
      <div className="asset-container">
        <div className="department-wise-container">
          <div className="common-container border-bottom-0">
            <div className="department-heading">
              <div className="row">
                <div className="col-lg-9 col-md-8 col-sm-6">
                  <div className="asset-heading">Cost Analysis</div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="float-right common-right-btn">
                    <Link to={`/assetmanager/pages/environments`} className="asset-white-button min-width-inherit">
                      <img src={Jobs} alt="" style={{ maxWidth: '20px' }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {graphData && (
              <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="cost-analysis-chart">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="heading">Product wise Cost</div>
                      </div>
                    </div>
                    <div className="chart">
                      {graphData.productWiseCostData &&
                      graphData.productWiseCostData.datasets[0].data.length > 0 &&
                      graphData.productWiseCostData.labels.length > 0 ? (
                        <Doughnut data={graphData.productWiseCostData} options={productWiseCostOptions} />
                      ) : (
                        <div className="chart-spinner">
                          <i className="fa fa-spinner fa-spin" /> Loading...
                        </div>
                      )}
                    </div>
                    <div className="view-details-link">
                      <Link to={`/product-wise-cost`}>
                        View details <i className="fa fa-chevron-down" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="cost-analysis-chart">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="heading">Production Vs Others</div>
                      </div>
                    </div>
                    <div className="chart">
                      {graphData.productionvsOthersData &&
                      graphData.productionvsOthersData.datasets[0].data.length > 0 &&
                      graphData.productionvsOthersData.labels.length > 0 ? (
                        <Pie data={graphData.productionvsOthersData} options={productionvsOthersOptions} />
                      ) : (
                        <div className="chart-spinner">
                          <i className="fa fa-spinner fa-spin" /> Loading...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="cost-analysis-chart">
                    <div className="row">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="heading">Service Type wise Cost</div>
                      </div>
                    </div>
                    <div className="chart">
                      {graphData.serviceWiseCoastData &&
                      graphData.serviceWiseCoastData.datasets[0].data.length > 0 &&
                      graphData.serviceWiseCoastData.labels.length > 0 ? (
                        <Pie data={graphData.serviceWiseCoastData} options={serviceWiseCoastOptions} />
                      ) : (
                        <div className="chart-spinner">
                          <i className="fa fa-spinner fa-spin" /> Loading...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="asset-heading">Department wise</div>
              </div>
            </div>
            <div className="department-wise-boxs">
              <div className="department-wise-inner">{this.renderDepartmentWiseData(departmentWiseData)}</div>
            </div>
          </div>
          {product && <ProductWiseServices product={product} displayJsonData={displayJsonData} type="department" />}
        </div>
      </div>
    );
  }
}
export default DepartmentWiseProducts;

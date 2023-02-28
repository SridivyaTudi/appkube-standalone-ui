import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Jobs from '../../../assets/img/jobs.png';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

class DepartmentWiseProducts extends Component {
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
          </div>
        </div>
      </div>
    );
  }
}
export default DepartmentWiseProducts;

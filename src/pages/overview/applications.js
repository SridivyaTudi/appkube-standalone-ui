import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import Cloud from '../../assets/img/cloud.svg';
import Azure from '../../assets/img/azure.svg';
import GCP from '../../assets/img/gcp.svg';
import AWS from '../../assets/img/aws.svg';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);


class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSpend: {
        data: {
          labels: ['', '', '', '', ''],
          datasets: [
            {
              fill: false,
              borderColor: 'rgba(225, 5, 5, 1)',
              cubicInterpolationMode: 'monotone',
              pointRadius: 0,
              data: [20, 40, 30, 60],
            },
          ],
        },
        lineOptions: {
          plugins: {
            legend: {
              display: false,
              labels: {
                usePointStyle: true,
              },
            },
            tooltips: {
              enabled: false,
            },
          },
          scales: {
            x: {
              display: false,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
            y: {
              display: false,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      },
    };
  }

  componentDidMount = () => {
    fetch('http://34.199.12.114:5057/api/analytics/cloud-wise-spend')
    .then(response => response.json())
    .then(
      (result) => {
        console.log(result);
      }
    )
  }

  render() {
    const {} = this.props;
    const { totalSpend } = this.state;

    return (
      <div className="overview-container">
        <div className="applications-container">
          <div className="applications-inner-container">
            <div className="dashboard-spent-main">
              <div className="row">
                <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                  <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <div className="dashboard-spent">
                        <div className="dashboard-spent-left">
                          <label>Total Spend</label>
                          <strong>$6,71,456</strong>
                        </div>
                        <div className="dashboard-spent-right">
                          {totalSpend && (
                            <Line data={totalSpend.data} options={totalSpend.lineOptions} />
                          )}
                          <span>+4 from last week</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <div className="dashboard-spent">
                        <div className="dashboard-days-spent-left">
                          <label>Last 7 days Spend</label>
                          <strong>
                            412,531
                            <span>
                              <i className="fa fa-caret-up"></i>+5%
                            </span>
                          </strong>
                        </div>
                        <div className="dashboard-days-spent-right">
                          <span>
                            <span className="orange" style={{ height: '50%' }}></span>
                          </span>
                          <span>
                            <span className="blue" style={{ height: '20%' }}></span>
                          </span>
                          <span>
                            <span className="red" style={{ height: '70%' }}></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <div className="dashboard-spent">
                        <div className="current-spend-rate">
                          <label>Current spend Rate</label>
                          <div className="rate-text">
                            <strong>$21</strong>
                            <span>Per Hour</span>
                          </div>
                          <div className="rate-line"></div>
                          <div className="rate-text">
                            <strong>$504</strong>
                            <span>Per Day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <div className="dashboard-spent">
                        <div className="total-budget">
                          <div className="heading">
                            <label>Total Budget(Q1)</label>
                            <span>$10,00,000</span>
                          </div>
                          <div className="content">
                            <div className="remaining-graph">
                              <div className="gauge gauge--liveupdate" id="gauge">
                                <div className="gauge__container">
                                  <div className="gauge__background"></div>
                                  <div className="gauge__center__center"></div>
                                  <div className="gauge__center"></div>
                                  <div className="gauge__data" style={{ transform: 'rotate(0.775turn)' }}></div>
                                  <div className="gauge__needle" style={{ transform: 'rotate(0.775turn)' }}></div>
                                </div>
                              </div>
                              <div className="used-text">55% Used</div>
                            </div>
                            <div className="remaining-text">
                              <span>Remaining</span>
                              <strong>$3,28,457</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <div className="dashboard-spent">
                        <div className="spends-today">
                          <div className="spends-today-left">
                            <i className="fa fa-caret-up"></i>
                            <span>+5%</span>
                          </div>
                          <div className="spends-today-right">
                            <label>Spends today</label>
                            <strong>$5245</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <div className="dashboard-spent">
                        <div className="spends-yesterday">
                          <div className="spends-yesterday-left">
                            <label>Spends yesterday</label>
                            <strong>$5245</strong>
                          </div>
                          <div className="spends-yesterday-right">
                            <i className="fa fa-caret-down"></i>
                            <span>+5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                  <div className="cloud-wise-spend">
                    <div className="heading">
                      <label>Cloud wise spend</label>
                      <i className="fa fa-ellipsis-v"></i>
                    </div>
                    <div className="contents">
                      <div className="content">
                        <div className="icon">
                          <img alt="OTHER" src={Cloud} />
                        </div>
                        <div className="progress-content">
                          <div className="text">
                            <span className="name">OTHER</span>
                            <span className="value">50250.92</span>
                            <span className="diff up">
                              <i className="fa fa-caret-up"></i>8.27%
                            </span>
                          </div>
                          <div className="progress">
                            <span className="other" style={{ width: '8.26772%' }}></span>
                          </div>
                        </div>
                      </div>
                      <div className="content">
                        <div className="icon">
                          <img alt="AZURE" src={Azure} />
                        </div>
                        <div className="progress-content">
                          <div className="text">
                            <span className="name">AZURE</span>
                            <span className="value">50391.94</span>
                            <span className="diff up">
                              <i className="fa fa-caret-up"></i>2.47%
                            </span>
                          </div>
                          <div className="progress">
                            <span className="azure" style={{ width: '2.4655%' }}></span>
                          </div>
                        </div>
                      </div>
                      <div className="content">
                        <div className="icon">
                          <img alt="GCP" src={GCP} />
                        </div>
                        <div className="progress-content">
                          <div className="text">
                            <span className="name">GCP</span>
                            <span className="value">50353.89</span>
                            <span className="diff up">
                              <i className="fa fa-caret-up"></i>12.81%
                            </span>
                          </div>
                          <div className="progress">
                            <span className="gcp" style={{ width: '12.8107%' }}></span>
                          </div>
                        </div>
                      </div>
                      <div className="content">
                        <div className="icon">
                          <img alt="AWS" src={AWS} />
                        </div>
                        <div className="progress-content">
                          <div className="text">
                            <span className="name"></span>
                            <span className="value">50240.62</span>
                            <span className="diff up">
                              <i className="fa fa-caret-up"></i>14.13%
                            </span>
                          </div>
                          <div className="progress">
                            <span className="aws" style={{ width: '14.1335%' }}></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Applications;

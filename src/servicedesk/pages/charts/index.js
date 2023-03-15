import React, {Component} from 'react';
//import * as React from 'react';
//import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { config } from '../../config';
//import { Bar } from 'react-chartjs-2';

class Charts extends Component {
  breadCrumbs;
  barChartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'right',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: 'rgba(169, 185, 198, 1)',
            fontSize: 12,
            beginAtZero: true,
            min: 0,
            max: 400,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: 'rgba(240, 243, 247, 1)',
          },
          ticks: {
            fontColor: 'rgba(169, 185, 198, 1)',
            fontSize: 12,
          },
        },
      ],
    },
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.breadCrumbs = [
      {
        label: 'Home',
        route: `/`,
      },
      {
        label: 'Tickets | Dashboard',
        route: `${config.basePath}/dashboard`,
      },
      {
        label: 'Reports',
        isCurrentPage: true,
      },
    ];
  }

  barChart1Data = {
    labels: ['Email', 'Widget', 'Chat'],
    datasets: [
      {
        type: 'bar',
        label: '',
        backgroundColor: 'rgba(31, 120, 180, 1)',
        borderColor: 'rgba(31, 120, 180, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(31, 120, 180, 1)',
        hoverBorderColor: 'rgba(31, 120, 180, 1)',
        data: [100, 380, 200],
      },
    ],
  };

  barChart2Data = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        type: 'bar',
        label: '',
        backgroundColor: 'rgba(31, 120, 180, 1)',
        borderColor: 'rgba(31, 120, 180, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(31, 120, 180, 1)',
        hoverBorderColor: 'rgba(31, 120, 180, 1)',
        data: [280, 180, 350],
      },
    ],
  };

  barChart3Data = {
    labels: ['Open', 'Inprogress', 'Closed'],
    datasets: [
      {
        type: 'bar',
        label: '',
        backgroundColor: 'rgba(31, 120, 180, 1)',
        borderColor: 'rgba(31, 120, 180, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(31, 120, 180, 1)',
        hoverBorderColor: 'rgba(31, 120, 180, 1)',
        data: [390, 270, 200],
      },
    ],
  };

  barChart4Data = {
    labels: ['Question', 'Issue'],
    datasets: [
      {
        type: 'bar',
        label: '',
        backgroundColor: 'rgba(31, 120, 180, 1)',
        borderColor: 'rgba(31, 120, 180, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(31, 120, 180, 1)',
        hoverBorderColor: 'rgba(31, 120, 180, 1)',
        data: [320, 150],
      },
    ],
  };

  render() {
    return (
      <div className="servicedesk-dashboard-container">
        {/* <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="TICKETING TOOL" /> */}
        <div className="servicedesk-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="page-heading">
                  <h1>Created Tickets</h1>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 text-right">
                <Link
                  to={`${config.basePath}/reporthelpdesh`}
                  className="blue-button m-r-0 m-b-0 min-width-inherit width-auto create-btn"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 p-b-0">
            <div className="charts-boxs">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="d-block width-100 chart-box">
                    {/* <Bar data={this.barChart1Data} options={this.barChartOptions} /> */}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="d-block width-100 chart-box">
                    {/* <Bar
                      data={this.barChart2Data}
                      options={this.barChartOptions}
                    /> */}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="d-block width-100 chart-box">
                    {/* <Bar
                      data={this.barChart3Data}
                      options={this.barChartOptions}
                    /> */}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="d-block width-100 chart-box">
                    {/* <Bar
                      data={this.barChart3Data}
                      options={this.barChartOptions}
                    /> */}
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
export default Charts;

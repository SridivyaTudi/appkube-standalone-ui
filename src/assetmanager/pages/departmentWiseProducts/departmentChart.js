import * as React from "react";
import { Link } from "react-router-dom";
import { RestService } from "../_service/RestService";
import { configFun } from "../../config";
import { CommonService } from "../_common/common";
import { Bar } from "react-chartjs-2";
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
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

class DepartmentWiseCharts extends React.Component {
  breadCrumbs;
  config;
  constructor(props) {
    super(props);
    this.state = {
      displayBarChart: true,
      graph: {},
      departmentWiseData: [],
      humanResources: {
        total: null,
        labels: [],
        datasets: [
          {
            data: [],
            lineTension: 0.2,
            backgroundColor: [],
          },
        ],
      },
      barOptions: {
        indexAxis: "y",
        plugins: {
          scales: {
            y: {
              ticks: {
                fontColor: "black",
                stepSize: 10,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
            x: {
              ticks: {
                fontColor: "black",
                display: false,
                stepSize: 10,
              },
              gridLines: {
                display: false,
              },
            },
          },
          legend: {
            display: false,
          },
          title: {
            display: false,
            text: "Total Cost: $6,71,246",
            position: "bottom",
            color: "#202020",
            font: {
              size: 18,
            },
          },
          responsive: true,
        },
      },
    };
    this.breadCrumbs = [
      {
        label: "Home",
        route: `/`,
      },
      {
        label: "Assets | Environments",
        isCurrentPage: true,
      },
    ];
    this.config = configFun(
      props.meta.jsonData.apiUrl,
      props.meta.jsonData.mainProductUrl
    );
  }

  async componentDidMount() {
    let departmentList = await localStorage.getItem("departmentData");
    let department;
    if (departmentList) {
      department = JSON.parse(departmentList);
      this.setState({
        departmentWiseData: department,
      });
      this.handleGraphValue(department.organization.departmentList);
    } else {
      this.getDepartmentData();
    }
  }

  getDepartmentData = async () => {
    try {
      await RestService.getData(
        `http://34.199.12.114:5057/api/department-wise-analytics/get-data`,
        null,
        null
      ).then((response) => {
        console.log(response);
        this.setState({
          departmentWiseData: response,
        });
        this.handleGraphValue(response.organization.departmentList);
      });
    } catch (err) {
      console.log("Loading accounts failed. Error: ", err);
    }
  };

  handleGraphValue = (departmentWiseData) => {
    let departmentName = CommonService.getParameterByName(
      "department",
      window.location.href
    );
    departmentName = departmentName ? departmentName.replace(";amp;", "&") : "";
    let { humanResources } = this.state;
    let data = [];
    let labels = [];
    // let totalCount = 0;
    if (departmentWiseData && departmentWiseData.length > 0) {
      for (let i = 0; i < departmentWiseData.length; i++) {
        let department = departmentWiseData[i];
        if (
          department.productList &&
          (!departmentName || departmentName === department.name)
        ) {
          for (let j = 0; j < department.productList.length; j++) {
            let count = 0;
            let product = department.productList[j];
            if (labels.indexOf(product.name) === -1) {
              labels.push(product.name);
            }
            product.deploymentEnvironmentList.map((environment, envIndex) => {
              if (environment.serviceCategoryList) {
                environment.serviceCategoryList.map((category, catIndex) => {
                  if (category.serviceNameList) {
                    category.serviceNameList.map((serviceName) => {
                      if (serviceName.tagList) {
                        serviceName.tagList.map((tag) => {
                          if (tag.serviceList) {
                            tag.serviceList.map((service) => {
                              count += service.serviceBilling.amount;
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
            data.push(count);
          }
        }
      }
    }
    humanResources.labels = labels;
    humanResources.datasets[0].data = data;
    for (let i = 0; i < data.length; i++) {
      humanResources.datasets[0].backgroundColor.push(this.getRandomColor());
    }
    this.setState({
      humanResources,
    });
  };

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    const { barOptions, humanResources } = this.state;
    let departmentName = CommonService.getParameterByName(
      "department",
      window.location.href
    );
    departmentName = departmentName
      ? departmentName.replace(";amp;", "&")
      : "All Departments";
    return (
      <div className="asset-container">
        <div className="department-wise-container">
          <div className="common-container border-bottom-0">
            <div className="department-heading">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="asset-heading">Product Wise Cost</div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="float-right common-right-btn">
                    <Link
                      to={`${"#"}/department-wise-products`}
                      className="asset-white-button min-width-inherit"
                    >
                      <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                {humanResources && (
                  <div className="cost-analysis-chart">
                    <div className="heading">{departmentName}</div>
                    {humanResources.total && (
                      <div className="total-cost-text cost">
                        <strong>${humanResources.total}</strong> - 40% off the
                        total cost
                      </div>
                    )}
                    <div className="chart">
                      {humanResources.datasets &&
                      humanResources.datasets[0].data.length > 0 &&
                      humanResources.labels.length > 0 ? (
                        <Bar
                          data={humanResources}
                          options={barOptions}
                          height={70}
                        />
                      ) : (
                        <div className="chart-spinner">
                          <i className="fa fa-spinner fa-spin"></i> Loading...
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DepartmentWiseCharts;

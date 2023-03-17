import React from "react";
import { CommonService } from "../_common/common";
import { Bar, Pie } from "react-chartjs-2";
import { RestService } from "../_service/RestService";
import _ from "lodash";
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

const stageColors = {
  PROD: "#52b121",
  DEV: "#ff9900",
  TEST: "#d84539",
  STAGE: "#0089d6",
};

class ProductWiseCost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieView: false,
      chartData: {},
      totalCost: 0,
    };
  }

  componentDidMount() {
    this.getDepartmentData();
  }

  getDepartmentData = async () => {
    try {
      await RestService.getData(
        `http://34.199.12.114:5057/api/department-wise-analytics/get-data`,
        null,
        null
      ).then((response) => {
        this.manipulateDepartmentWiseProductData(
          _.cloneDeep(response.organization.departmentList)
        );
      });
    } catch (err) {
      console.log("Loading accounts failed. Error: ", err);
    }
  };

  manipulateDepartmentWiseProductData = (departmentList) => {
    let data = {};
    let totalCost = 0;
    for (let i = 0; i < departmentList.length; i++) {
      const department = departmentList[i];
      const productList = department.productList;
      productList.forEach((product) => {
        let productCost = 0;
        let stageWiseCost = {};
        data[product.name] = data[product.name] || {};
        const environments = product.deploymentEnvironmentList;
        if (environments) {
          environments.forEach((environent) => {
            stageWiseCost[environent.name] =
              stageWiseCost[environent.name] || 0;
            const serviceCategoryList = environent.serviceCategoryList;
            if (serviceCategoryList) {
              serviceCategoryList.forEach((category) => {
                const serviceNameList = category.serviceNameList;
                if (serviceNameList) {
                  serviceNameList.forEach((serviceName) => {
                    const tagList = serviceName.tagList;
                    if (tagList) {
                      tagList.forEach((tag) => {
                        const serviceList = tag.serviceList;
                        if (serviceList) {
                          serviceList.forEach((service) => {
                            productCost += service.serviceBilling.amount;
                            stageWiseCost[environent.name] +=
                              service.serviceBilling.amount;
                            totalCost += service.serviceBilling.amount;
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
            stageWiseCost[environent.name] =
              stageWiseCost[environent.name].toFixed(2);
          });
        }
        data[product.name] = {
          stageWiseCost,
          productCost: productCost.toFixed(2),
        };
      });
    }
    this.setState({
      chartData: data,
      totalCost: totalCost.toFixed(2),
    });
  };

  handleChartViewToggle = () => {
    this.setState({ pieView: !this.state.pieView });
  };

  calculatePerc = (total, quo) => {
    return ((quo / total) * 100).toFixed(2);
  };

  createChart = () => {
    const { totalCost, chartData, pieView } = this.state;
    const keys = Object.keys(chartData);
    const dataJSX = keys.map((productName) => {
      const product = chartData[productName];
      const { productCost, stageWiseCost } = product;
      const costPerc = this.calculatePerc(totalCost, productCost);
      const prodPerc = this.calculatePerc(productCost, stageWiseCost.PROD);
      const devPerc = this.calculatePerc(productCost, stageWiseCost.DEV);
      const testPerc = this.calculatePerc(productCost, stageWiseCost.TEST);
      const stagePerc = this.calculatePerc(productCost, stageWiseCost.STAGE);
      const tempData = {
        title: "Human Resource",
        totalCost: productCost,
        costPercentage: `${costPerc}%`,
        labels: [`PROD`, `DEV`, `STAGE`, `TEST`],
        data: [prodPerc, devPerc, stagePerc, testPerc],
        backgroundColor: [
          stageColors.PROD,
          stageColors.DEV,
          stageColors.STAGE,
          stageColors.TEST,
        ],
        productionCost: stageWiseCost.PROD,
        developmentCost: stageWiseCost.DEV,
        stageCost: stageWiseCost.STAGE,
        testCost: stageWiseCost.TEST,
      };

      const chartTempData = {
        labels: tempData.labels,
        datasets: [
          {
            data: tempData.data,
            backgroundColor: tempData.backgroundColor,
          },
        ],
      };

      return (
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="chart-box">
            <h3>{productName}</h3>
            <div className="total-cost-text text-center">
              <strong>Total Cost : ${productCost}</strong> -{" "}
              {tempData.costPercentage} of the total cost
            </div>
            <div className="chart-bar">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  {pieView ? (
                    <Pie
                      data={chartTempData}
                      height={160}
                      width={200}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: "top",
                            display: false,
                          },
                        },
                      }}
                    />
                  ) : (
                    <Bar
                      data={chartTempData}
                      height={200}
                      width={200}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: "top",
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            ticks: {
                              maxTicksLimit: 5,
                            },
                          },
                        },
                      }}
                    />
                  )}
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="chart-data">
                    <ul className="chart-data-text">
                      <li>
                        <span
                          style={{ backgroundColor: stageColors.PROD }}
                        ></span>
                        <p>
                          Production <strong>${tempData.productionCost}</strong>
                        </p>
                      </li>
                      <li>
                        <span
                          style={{ backgroundColor: stageColors.DEV }}
                        ></span>
                        <p>
                          Development{" "}
                          <strong>${tempData.developmentCost}</strong>
                        </p>
                      </li>
                      <li>
                        <span
                          style={{ backgroundColor: stageColors.STAGE }}
                        ></span>
                        <p>
                          Stage <strong>${tempData.stageCost}</strong>
                        </p>
                      </li>
                      <li>
                        <span
                          style={{ backgroundColor: stageColors.TEST }}
                        ></span>
                        <p>
                          Test <strong>${tempData.testCost}</strong>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="last-updated-text">
              Last Updated: 03/28/2022 17:25
            </div>
          </div>
        </div>
      );
    });
    return dataJSX;
  };

  render() {
    const { pieView } = this.state;
    let departmentName = CommonService.getParameterByName(
      "department",
      window.location.href
    );
    departmentName = departmentName
      ? departmentName.replace(";amp;", "&")
      : "All Departments";
    return (
      <div className="asset-container">
        <div className="product-wise-cost-container">
          <div className="common-container border-bottom-0">
            <div
              className="services-heading"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Product Wise Cost
              <div className="float-right">
                <input
                  type="checkbox"
                  onChange={this.handleChartViewToggle}
                  style={{ cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    verticalAlign: "middle",
                    display: "inline-block",
                    paddingLeft: "5px",
                  }}
                >
                  {pieView ? "Pie Chart" : "Bar Graph"}
                </span>
              </div>
            </div>
            <div className="pie-chart-container">
              <div className="row">{this.createChart()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductWiseCost;

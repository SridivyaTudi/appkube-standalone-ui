import React from "react";
import { Bar } from "react-chartjs-2";
import { TopologyView } from "./TopologyView";
import { images } from "../../img";
import { ServiceView } from "./ServiceView";
const GLOBAL_SERVICE = "Cloud Managed";
const enumServiceNature = {
  common: "Common",
  business: "Business",
};

class ProductWiseServicesSla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      auctionchartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      accountId: "",
      tableData: [],
      environmentType: "",
      productName: "",
      topologyMainData: null,
      isDataLoaded: false,
      isTopologyActive: false,
      accountList: [],
      treeDataWithAccount: {},
      topologyDataWithAccount: {},
      topologySearchKeyword: "",
    };
  }

  componentDidMount() {
    this.getServicesData();
  }

  getServicesData = () => {
    fetch("http://34.199.12.114:5057/api/service-detail/search")
      .then((response) => response.json())
      .then((data) => this.manipulateServiceData(data.services));
  };

  manipulateServiceData = (services) => {
    const treeDataWithAccount = {};
    const topologyDataWithAccount = {};
    const { filterData } = this.state;
    services.forEach((service) => {
      const {
        serviceNature,
        associatedProduct,
        associatedEnv,
        serviceHostingType,
        associatedCommonService,
        associatedBusinessService,
        associatedLandingZone,
        serviceType,
      } = service.metadata_json;
      const treeData = treeDataWithAccount[associatedLandingZone] || {};
      const node = treeData[associatedProduct] || {};
      const envServicesData = node[associatedEnv] || {};
      const serviceNatureData = envServicesData[serviceNature] || {};
      let associatedService = associatedBusinessService;
      if (serviceNature === enumServiceNature.common) {
        associatedService = associatedCommonService;
      }
      serviceNatureData[associatedService] =
        serviceNatureData[associatedService] || [];
      serviceNatureData[associatedService].push(service);
      envServicesData[serviceNature] = serviceNatureData;
      node[associatedEnv] = envServicesData;
      treeData[associatedProduct] = node;
      treeDataWithAccount[associatedLandingZone] = treeData;

      //manipulation for topology view
      const topologyMainData =
        topologyDataWithAccount[associatedLandingZone] || {};
      const topNode = topologyMainData[associatedProduct] || {};
      const envTopData = topNode[associatedEnv] || {};
      const serviceTypeTopDat = envTopData[serviceType] || {};
      const serviceHostingData = serviceTypeTopDat[serviceHostingType] || {};
      const serviceNatureDataForTop = serviceHostingData[serviceNature] || {};
      let associatedServiceTop = associatedBusinessService;
      if (serviceNature === enumServiceNature.common) {
        associatedServiceTop = associatedCommonService;
      }
      serviceNatureDataForTop[associatedServiceTop] =
        serviceNatureDataForTop[associatedServiceTop] || [];
      serviceNatureDataForTop[associatedServiceTop].push(service);
      serviceHostingData[serviceNature] = serviceNatureDataForTop;
      serviceTypeTopDat[serviceHostingType] = serviceHostingData;
      envTopData[serviceType] = serviceTypeTopDat;
      topNode[associatedEnv] = envTopData;
      topologyMainData[associatedProduct] = topNode;
      topologyDataWithAccount[associatedLandingZone] = topologyMainData;
    });
    let tableData = {};
    let topologyMainData = {};
    const accountList = Object.keys(treeDataWithAccount);
    accountList.forEach((account) => {
      tableData = {
        ...tableData,
        ...treeDataWithAccount[account],
      };
      topologyMainData = {
        ...topologyMainData,
        ...topologyDataWithAccount[account],
      };
    });
    const products = Object.keys(tableData);
    let firstProd = "";
    let firstEnv = "";
    if (products.length > 0) {
      firstProd = products[0];
      const envs = Object.keys(tableData[firstProd]);
      firstEnv = envs[0];
    }
    this.setState({
      treeDataWithAccount,
      topologyDataWithAccount,
      tableData,
      filterData,
      environmentType: firstEnv,
      productName: firstProd,
      topologyMainData,
      isDataLoaded: true,
      accountList,
    });
  };

  convertObjectIntoArray = (obj) => {
    const keys = Object.keys(obj);
    return keys.map((key) => {
      return obj[key];
    });
  };

  getAppDataServices = (treeData) => {
    const nodeKeys = Object.keys(treeData);
    const servicesLength = {};
    nodeKeys.forEach((nodeKey) => {
      if (nodeKey === GLOBAL_SERVICE) {
        const uniqueProducts = [];
        const environmentData = treeData[GLOBAL_SERVICE];
        const environemntKeys = Object.keys(environmentData);
        environemntKeys.forEach((enviornemntKey) => {
          const commonBusinessServices = environmentData[enviornemntKey];
          const commonBusinessKeys = Object.keys(commonBusinessServices);
          commonBusinessKeys.forEach((commonBusinessKey) => {
            const productData = commonBusinessServices[commonBusinessKey];
            const productKeys = Object.keys(productData);
            productKeys.forEach((productKey) => {
              if (uniqueProducts.indexOf(productKey) === -1) {
                uniqueProducts.push(productKey);
              }
              servicesLength[nodeKey] = servicesLength[nodeKey] || {};
              servicesLength[nodeKey].uniqueProducts = uniqueProducts.length;
            });
          });
        });
      } else {
        const uniqueProducts = [];
        const clusterData = treeData[nodeKey];
        const clusterKeys = Object.keys(clusterData);
        clusterKeys.forEach((clusterKey) => {
          const environmentData = clusterData[clusterKey];
          const environemntKeys = Object.keys(environmentData);
          environemntKeys.forEach((enviornemntKey) => {
            const commonBusinessServices = environmentData[enviornemntKey];
            const commonBusinessKeys = Object.keys(commonBusinessServices);
            commonBusinessKeys.forEach((commonBusinessKey) => {
              const productData = commonBusinessServices[commonBusinessKey];
              const productKeys = Object.keys(productData);
              productKeys.forEach((productKey) => {
                if (uniqueProducts.indexOf(productKey) === -1) {
                  uniqueProducts.push(productKey);
                }
                const serviceDatas = productData[productKey];
                const serviceDataKeys = Object.keys(serviceDatas);
                serviceDataKeys.forEach((serviceDataKey) => {
                  const appData = serviceDatas[serviceDataKey].appData;
                  const appDataKeys = Object.keys(appData);
                  appDataKeys.forEach((appDataKey) => {
                    servicesLength[nodeKey] = servicesLength[nodeKey] || {};
                    servicesLength[nodeKey][appDataKey] =
                      servicesLength[nodeKey][appDataKey] || 0;
                    servicesLength[nodeKey][appDataKey] += appData[appDataKey];
                    servicesLength[nodeKey].uniqueProducts =
                      uniqueProducts.length;
                  });
                });
              });
            });
          });
        });
      }
    });
    this.setState({
      servicesLength,
    });
  };

  displayServiceSLA = () => {
    let { tableData, auctionchartData, productName } = this.state;
    let retData = [];
    let labels = [];
    if (tableData) {
      const products = Object.keys(tableData);
      products.map((product, index) => {
        let appcount = 0;
        let datacount = 0;
        let data = {};
        let chartticksdata = [];
        let totalCost = 0;
        let envCount = 0;
        const environments = Object.keys(tableData[product]);
        let serviceByType = {};
        environments.map((environment, i) => {
          envCount = envCount + 1;
          const serviceNatureData = tableData[product][environment];
          Object.keys(serviceNatureData).map((serviceNature, j) => {
            const associatedServicesData = serviceNatureData[serviceNature];
            Object.keys(associatedServicesData).map((associatedService) => {
              const servicesArray = associatedServicesData[associatedService];
              if (servicesArray && servicesArray.length > 0) {
                serviceByType["performance"] =
                  serviceByType["performance"] || 0;
                serviceByType["availability"] =
                  serviceByType["availability"] || 0;
                serviceByType["security"] = serviceByType["security"] || 0;
                serviceByType["compliance"] = serviceByType["compliance"] || 0;
                serviceByType["endusage"] = serviceByType["endusage"] || 0;
                for (let k = 0; k < servicesArray.length; k++) {
                  const { metadata_json, sla_json } = servicesArray[k];
                  if (sla_json) {
                    const {
                      availability,
                      performance,
                      security,
                      compliance,
                      endusage,
                    } = sla_json;
                    serviceByType["performance"] =
                      serviceByType["performance"] +
                      (performance ? performance["sla"] : 0);
                    serviceByType["availability"] =
                      serviceByType["availability"] +
                      (availability ? availability["sla"] : 0);
                    serviceByType["security"] =
                      serviceByType["security"] +
                      (security ? security["sla"] : 0);
                    serviceByType["compliance"] =
                      serviceByType["compliance"] +
                      (compliance ? compliance["sla"] : 0);
                    serviceByType["endusage"] =
                      serviceByType["endusage"] +
                      (endusage ? endusage["sla"] : 0);
                  }
                  totalCost =
                    totalCost + parseFloat(metadata_json.stats.totalCostSoFar);
                  if (metadata_json.serviceType === "Data") {
                    datacount += 1;
                  } else if (metadata_json.serviceType === "App") {
                    appcount += 1;
                  }
                }
              }
            });
          });
        });
        serviceByType["performance"] = (
          serviceByType["performance"] /
          (appcount + datacount)
        ).toFixed(2);
        serviceByType["availability"] = (
          serviceByType["availability"] /
          (appcount + datacount)
        ).toFixed(2);
        serviceByType["security"] = (
          serviceByType["security"] /
          (appcount + datacount)
        ).toFixed(2);
        serviceByType["compliance"] = (
          serviceByType["compliance"] /
          (appcount + datacount)
        ).toFixed(2);
        serviceByType["endusage"] = (
          serviceByType["endusage"] /
          (appcount + datacount)
        ).toFixed(2);
        for (var val in serviceByType) {
          data[val] = serviceByType[val] || 0;
          if (labels && labels.length > 0) {
            for (let j = 0; j < labels.length; j++) {
              if (labels.indexOf(val) === -1) {
                labels.push(val);
              }
            }
          } else {
            labels.push(val);
          }
        }
        Object.keys(data).map((ser, ind) => {
          chartticksdata.push(data[ser]);
        });
        let chart = {};
        chart[product] = JSON.parse(JSON.stringify(auctionchartData));
        chart[product].labels = labels;
        chart[product].datasets[0].data = chartticksdata;
        chart[product].datasets[0].backgroundColor = [
          this.getColorBasedOnScore(serviceByType["performance"]),
          this.getColorBasedOnScore(serviceByType["availability"]),
          this.getColorBasedOnScore(serviceByType["security"]),
          this.getColorBasedOnScore(serviceByType["compliance"]),
          this.getColorBasedOnScore(serviceByType["endusage"]),
        ];
        chartticksdata = [];
        retData.push(
          <div
            className={
              product == productName
                ? "services-sla-box active"
                : "services-sla-box"
            }
            onClick={() => {
              const envs = Object.keys(tableData[product]);
              this.setState({
                productName: product,
                environmentType: envs.length > 0 ? envs[0] : "",
              });
            }}
          >
            <a className="heading">{product}</a>
            <div className="contents">
              <ul>
                <li>
                  <label>No of Env:</label>
                  <span>{envCount}</span>
                </li>
                <li>
                  <label>No of App Services:</label>
                  <span>{appcount}</span>
                </li>
                <li>
                  <label>No of Data Services:</label>
                  <span>{datacount}</span>
                </li>
              </ul>
              <div className="production-chart">
                <Bar
                  data={chart[product]}
                  height={200}
                  width={350}
                  options={{
                    responsive: false,
                    plugins: {
                      legend: {
                        position: "top",
                        display: false,
                      },
                      title: {
                        display: true,
                        text: `Total Cost : $${totalCost.toFixed(2)}`,
                        color: "#202020",
                        font: {
                          size: 18,
                        },
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
              </div>
            </div>
          </div>
        );
      });
    }

    return retData;
  };

  getColorBasedOnScore = (score) => {
    if (score >= 75) {
      return "#5AB66F";
    } else if (score >= 50) {
      return "#FF9429";
    } else if (score >= 25) {
      return "#FFF700";
    } else {
      return "#DC3F1F";
    }
  };

  displayEnvServices = () => {
    const { tableData, environmentType, productName } = this.state;
    let retData = [];
    let serviceList = [];
    if (tableData) {
      Object.keys(tableData).map((key, index) => {
        if (productName === key) {
          Object.keys(tableData[key]).map((service, i) => {
            if (serviceList && serviceList.length > 0) {
              if (serviceList.indexOf(service) === -1) {
                serviceList.push(service);
              }
            } else {
              serviceList.push(service);
            }
          });
        }
      });
      if (serviceList && serviceList.length > 0) {
        for (let i = 0; i < serviceList.length; i++) {
          retData.push(
            <li
              className={environmentType == serviceList[i] ? "active" : ""}
              onClick={() => {
                this.setState({ environmentType: serviceList[i] });
              }}
            >
              {serviceList[i]}
            </li>
          );
        }
      }
    }
    return retData;
  };

  toggleView = () => {
    this.setState({
      isTopologyActive: !this.state.isTopologyActive,
      topologySearchKeyword: "",
    });
  };

  renderAccountOptions = () => {
    const { accountList } = this.state;
    return accountList.map((account) => {
      return <option value={account}>{account}</option>;
    });
  };

  onChangeAccount = (e) => {
    const { value } = e.target;
    const { treeDataWithAccount, accountList, topologyDataWithAccount } =
      this.state;
    let newTableData = {};
    if (value) {
      newTableData = treeDataWithAccount[value];
    } else {
      accountList.forEach((account) => {
        newTableData = {
          ...newTableData,
          ...treeDataWithAccount[account],
        };
      });
    }
    const products = Object.keys(newTableData);
    let firstProd = "";
    let firstEnv = "";
    if (products.length > 0) {
      firstProd = products[0];
      const envs = Object.keys(newTableData[firstProd]);
      firstEnv = envs[0];
    }
    let newTopologyData = {};
    if (value) {
      newTopologyData = topologyDataWithAccount[value];
    } else {
      accountList.forEach((account) => {
        newTopologyData = {
          ...newTopologyData,
          ...topologyDataWithAccount[account],
        };
      });
    }
    this.setState({
      accountId: value,
      tableData: newTableData,
      environmentType: firstEnv,
      productName: firstProd,
      topologyMainData: newTopologyData,
    });
  };

  onChangeSearchKeyword = (e) => {
    const { value } = e.target;
    this.setState({
      topologySearchKeyword: value,
    });
  };

  handleChartViewToggle = () => {
    this.setState({ pieView: !this.state.pieView });
  };

  render() {
    const {
      productName,
      tableData,
      topologyMainData,
      environmentType,
      isDataLoaded,
      isTopologyActive,
      accountId,
      topologySearchKeyword,
    } = this.state;
    return (
      <div className="asset-container">
        <div className="services-sla-container">
          <div className="common-container border-bottom-0">
            <div
              className="services-heading"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Product Wise Services SLA
              <select value={accountId} onChange={this.onChangeAccount}>
                <option value="">All</option>
                {this.renderAccountOptions()}
              </select>
            </div>
            {!isDataLoaded ? (
              <div className="services-sla-boxs">Loading...</div>
            ) : (
              <div className="services-sla-boxs">
                <div className="services-sla-inner">
                  {this.displayServiceSLA()}
                </div>
              </div>
            )}
          </div>
          <div className="common-container border-bottom-0">
            <div className="services-heading">{productName}</div>
            {!isDataLoaded ? (
              <div className="services-tabs">Loading...</div>
            ) : (
              <div className="services-tabs">
                <ul className="tabs">{this.displayEnvServices()}</ul>
                <div className="common-container bottom-border-none">
                  <div className="row">
                    <div
                      className="col-lg-9 col-md-9 col-sm-12"
                      style={{ marginBottom: "10px" }}
                    >
                      <div className="topology-heading">
                        {isTopologyActive
                          ? "Topology view"
                          : "Service wise view"}
                        <div
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                          className="asset-white-button min-width-inherit"
                          onClick={this.toggleView}
                        >
                          <img
                            src={images.Jobs}
                            alt=""
                            style={{ maxWidth: "15px" }}
                          />
                        </div>
                      </div>
                    </div>
                    {isTopologyActive ? (
                      <div className="col-lg-3 col-md-3 col-sm-12">
                        <div className="search-box">
                          <form>
                            <div className="form-group search-control-group m-b-0">
                              <input
                                type="text"
                                className="input-group-text"
                                placeholder={"Search"}
                                value={topologySearchKeyword}
                                onChange={this.onChangeSearchKeyword}
                              />
                              <button>
                                <i
                                  className="fa fa-search"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="services-contents active">
                    <div className="environment-services">
                      {isTopologyActive ? (
                        <TopologyView
                          data={topologyMainData[productName][environmentType]}
                          isDataLoaded={isDataLoaded}
                          searchedService={topologySearchKeyword}
                        />
                      ) : (
                        <ServiceView
                          data={tableData[productName][environmentType]}
                          isDataLoaded={isDataLoaded}
                        />
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

export default ProductWiseServicesSla;

import * as React from "react";
import { RestService } from "../_service/RestService";
// import { configFun } from "../../config";
import ProductWiseServices from "../../components/ProductWiseServices";
import _ from "lodash";

class Applications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      displayJsonData: [
        {
          name: "Products",
          key: "products",
          id: 22,
          filter: [],
        },
        {
          name: "Environments",
          key: "environments",
          id: 29,
          filter: [],
        },
        {
          name: "App Services",
          key: "app-services",
          id: 31,
          filter: [],
        },
        {
          name: "Data Services",
          key: "data-services",
          id: 40,
          filter: [],
        },
      ],
      accountId: "",
      cloudName: "",
    };
    // this.config = configFun(
    //   props.meta.jsonData.apiUrl,
    //   props.meta.jsonData.mainProductUrl
    // );
  }

  componentDidMount() {
    const queryPrm = new URLSearchParams(document.location.search);
    const accountId = queryPrm.get("accountId");
    const cloudName = queryPrm.get("cloudName");
    this.setState({
      accountId,
      cloudName,
    });
    // let departmentList = localStorage.getItem('applicationData');
    // let department;
    // if (departmentList) {
    //     departmentList = JSON.parse(departmentList);
    //     if(departmentList[accountId]){
    //         department = departmentList ? departmentList[accountId] : {};
    //     this.manipulateDepartmentWiseProductData(_.cloneDeep(department.organization.departmentList));
    //     this.getFilterData(_.cloneDeep(department.organization.departmentList));
    //     }
    // }
    this.getDepartmentData(accountId);
  }

  getDepartmentData = async (accountId) => {
    try {
      await RestService.getData(
        `http://34.199.12.114:5057/api/department-wise-analytics/get-data?associatedLandingZone=${accountId}`,
        null,
        null
      ).then((response) => {
        this.manipulateDepartmentWiseProductData(
          _.cloneDeep(response.organization.departmentList)
        );
        this.getFilterData(_.cloneDeep(response.organization.departmentList));
        // localStorage.setItem('applicationData', JSON.stringify(response));
      });
    } catch (err) {
      console.log("Loading accounts failed. Error: ", err);
    }
  };

  manipulateDepartmentWiseProductData = (departmentList) => {
    for (let i = 0; i < departmentList.length; i++) {
      const department = departmentList[i];
      const productList = department.productList;
      productList.forEach((product) => {
        if (
          product.deploymentEnvironmentList &&
          product.deploymentEnvironmentList.length > 0
        ) {
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
                              const {
                                availability,
                                compliance,
                                endusage,
                                performance,
                                security,
                              } = service.slaJson;
                              avg =
                                (availability.sla +
                                  compliance.sla +
                                  performance.sla +
                                  security.sla +
                                  endusage.sla) /
                                5;
                            }
                            overAllTagScore += avg;
                          });
                          overAllTagScore =
                            overAllTagScore / serviceList.length;
                          overAllServiceNameScore += overAllTagScore;
                        }
                      });
                      overAllServiceNameScore =
                        overAllServiceNameScore / tagList.length;
                      serviceCategoryScore =
                        serviceCategoryScore + overAllServiceNameScore;
                    }
                  });
                  serviceCategoryScore =
                    serviceCategoryScore / serviceNameList.length;
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
            if (
              products.deploymentEnvironmentList &&
              products.deploymentEnvironmentList.length > 0
            ) {
              for (
                let k = 0;
                k < products.deploymentEnvironmentList.length;
                k++
              ) {
                let environments = products.deploymentEnvironmentList[k];
                if (environent.indexOf(environments.name) === -1) {
                  environent.push(environments.name);
                }
                if (
                  environments.serviceCategoryList &&
                  environments.serviceCategoryList.length > 0
                ) {
                  for (
                    let l = 0;
                    l < environments.serviceCategoryList.length;
                    l++
                  ) {
                    let category = environments.serviceCategoryList[l];
                    if (
                      category.serviceNameList &&
                      category.serviceNameList.length > 0
                    ) {
                      for (
                        let n = 0;
                        n < category.serviceNameList.length;
                        n++
                      ) {
                        let setviceList = category.serviceNameList[n];
                        if (
                          setviceList.tagList &&
                          setviceList.tagList.length > 0
                        ) {
                          for (let p = 0; p < setviceList.tagList.length; p++) {
                            let tagName = setviceList.tagList[p];
                            if (tagName.tagName === "Data") {
                              if (
                                tagName.serviceList &&
                                tagName.serviceList.length > 0
                              ) {
                                for (
                                  let q = 0;
                                  q < tagName.serviceList.length;
                                  q++
                                ) {
                                  if (
                                    dataList.indexOf(
                                      tagName.serviceList[q].name
                                    ) === -1
                                  ) {
                                    dataList.push(tagName.serviceList[q].name);
                                  }
                                }
                              }
                            } else if (tagName.tagName === "App") {
                              if (
                                tagName.serviceList &&
                                tagName.serviceList.length > 0
                              ) {
                                for (
                                  let q = 0;
                                  q < tagName.serviceList.length;
                                  q++
                                ) {
                                  if (
                                    appList.indexOf(
                                      tagName.serviceList[q].name
                                    ) === -1
                                  ) {
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
        if (displayJsonData[d].key === "products") {
          if (product && product.length > 0) {
            for (let h = 0; h < product.length; h++) {
              displayJsonData[d].filter.push({
                label: product[h],
                value: product[h],
                id: h,
              });
            }
          }
        } else if (displayJsonData[d].key === "environments") {
          if (environent && environent.length > 0) {
            for (let m = 0; m < environent.length; m++) {
              displayJsonData[d].filter.push({
                label: environent[m],
                value: environent[m],
                id: m + 9,
              });
            }
          }
        } else if (displayJsonData[d].key === "app-services") {
          if (appList && appList.length > 0) {
            for (let g = 0; g < appList.length; g++) {
              displayJsonData[d].filter.push({
                label: appList[g],
                value: appList[g],
                id: g + 80,
              });
            }
          }
        } else if (displayJsonData[d].key === "data-services") {
          if (dataList && dataList.length > 0) {
            for (let s = 0; s < dataList.length; s++) {
              displayJsonData[d].filter.push({
                label: dataList[s],
                value: dataList[s],
                id: s + 100,
              });
            }
          }
        }
      }
    }
    this.setState({
      displayJsonData,
    });
  };

  render() {
    const { product, displayJsonData, accountId, cloudName } = this.state;
    return (
      <div className="department-wise-container">
        {product ? (
          <ProductWiseServices
            product={product}
            displayJsonData={displayJsonData}
            type="department"
            cloudName={cloudName}
            accountId={accountId}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Applications;

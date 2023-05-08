import { escape } from "lodash";
import { object } from "prop-types";
import React, { Component } from "react";
import { Collapse } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { ToastMessage } from "../../../Toast/ToastMessage";
import { RestService } from "../../../Services/RestService";
import apiEndPoint from "../../../Services";
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
const resetChildNode = {
  parent: [],
  departments: ["parent"],
  products: ["departments", "parent"],
  deploymentEnvironments: ["departments", "parent", "products"],
  modules: ["departments", "parent", "products", "deploymentEnvironments"],
};
class AddTaggingWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      toggleTreeData: {
        parent: {},
        departments: {},
        products: {},
        deploymentEnvironments: {},
        modules: {},
      },
      wizardPathNames: [],
    };
  }
  componentDidMount() {
    try {
      this.getDiscoverAssest(this.props.params.landingZone);
    } catch (e) {
      console.log(e);
    }
  }
  getDiscoverAssest(id) {
    return RestService.getData(
      `${apiEndPoint.getOrganizations}${id}`,
      null,
      null
    ).then((response) => {
      if (response) {
        if (response["status"] != 404) {
          this.setState({ data: response });
        } else {
          ToastMessage("There is some issue", "unsuccess");
        }
      }
    });
  }
  handleToggleTree(type, id = 0, isChecked) {
    let { toggleTreeData } = this.state;
    toggleTreeData[type][id] = !toggleTreeData[`${type}`][id];
    this.setState({
      toggleTreeData: this.setStateToggleTree(
        toggleTreeData,
        type,
        isChecked,
        id
      ),
      wizardPathNames: type == "modules" ? this.state.wizardPathNames : [],
    });
  }
  setStateToggleTree(treeData, customType, isChecked, id) {
    let prepareTreeObj = {};
    let treeDataList = Object.keys(treeData);
    treeDataList.forEach((defaultType) => {
      prepareTreeObj[defaultType] =
        defaultType == customType
          ? treeData[`${customType}`]
          : resetChildNode[defaultType].indexOf(customType) >= 0
          ? isChecked
            ? this.state.toggleTreeData[`${defaultType}`]
            : this.unmarkTag(defaultType, id)
          : this.state.toggleTreeData[`${defaultType}`];
    });
    return prepareTreeObj;
  }
  unmarkTag(defaultType, id) {
    let prepareType = {};
    let toggleTreeDataType = Object.keys(
      this.state.toggleTreeData[defaultType]
    );
    toggleTreeDataType.forEach((key) => {
      prepareType[key] = key.startsWith(id)
        ? false
        : this.state.toggleTreeData[defaultType][key];
    });
    return prepareType;
  }
  handlePath(data, checked) {
    let { wizardPathNames } = this.state;
    let pathKeys = ["PRODUCT", "ENV", "MODULE", "SERVICE", "SERVICE_TYPE"];
    if (checked) {
      this.handleDiscoverAssetsUpdate(data).then((res) => {
        if (res && res.tag) {
          let tagPath = res.tag.split(",");
          let newPath = "";
          tagPath.forEach((tempData, key) => {
            if (key > 1) {
              newPath += " > ";
            }
            if (key > 0) {
              newPath += tempData.replace(`${pathKeys[key - 1]}=`, "");
            }
          });
          wizardPathNames.push({
            id: data.id,
            value: newPath,
            type: data.type,
            tagId: res.id,
          });
          this.setState({
            wizardPathNames: wizardPathNames,
          });
          ToastMessage("Tag Added", "success");
        }
      });
    } else {
      let tabId = wizardPathNames.filter((path) => path.id == data.id);
      this.handleTagDelete(tabId.length && tabId[0].tagId).then((res) => {
        if (res) {
          wizardPathNames = wizardPathNames.filter(
            (path) => path.id != data.id
          );
          this.setState({ wizardPathNames });
          ToastMessage("Tag untagged", "success");
        }
      });
    }
  }
  handleDiscoverAssetsUpdate(otherparams) {
    return RestService.getData(
      `${apiEndPoint.serviceAllocations}${this.props.params.landingZone}&${otherparams.id}`,
      null,
      null
    ).then((res) => {
      if (res && res.length) {
        return RestService.postData(`${apiEndPoint.tagList}`, {
          discoveredAsset: {
            id: this.props.params.id,
          },
          serviceAllocation: otherparams.serviceAllocation,
          tag: otherparams.value + res[0].serviceType,
        }).then((res) => res);
      }
    });
  }
  handleTagDelete(id) {
    return RestService.deleteData(apiEndPoint.removeTag).then(
      (res) =>
        res.status == 404 && ToastMessage("There is some issue", "unsuccess"),
      (error) => error.status == 204
    );
  }
  handlemodule(searchString) {
    let { wizardPathNames } = this.state;
    let pathKeys = ["PRODUCT", "ENV", "MODULE", "SERVICE", "SERVICE_TYPE"];
    return RestService.getData(
      apiEndPoint.searchTag + searchString,
      null,
      null
    ).then((res) => {
      if (res && res.length) {
        res.forEach((tag) => {
          let tagId = `departmentId=${tag.serviceAllocation.departmentId}&productId=${tag.serviceAllocation.productId}&deploymentEnvironmentId=${tag.serviceAllocation.deploymentEnvironmentId}&moduleId=${tag.serviceAllocation.moduleId}&servicesId=${tag.serviceAllocation.servicesId}`;
          if (
            wizardPathNames.filter(
              (path) =>
                path.id == tagId &&
                path.type == tag.serviceAllocation.serviceType
            ).length == 0
          ) {
            let tagPath = tag.tag.split(",");
            let newPath = "";
            tagPath.forEach((tempData, key) => {
              if (key > 1) {
                newPath += " > ";
              }
              if (key > 0) {
                newPath += tempData.replace(`${pathKeys[key - 1]}=`, "");
              }
            });
            wizardPathNames.push({
              id: `departmentId=${tag.serviceAllocation.departmentId}&productId=${tag.serviceAllocation.productId}&deploymentEnvironmentId=${tag.serviceAllocation.deploymentEnvironmentId}&moduleId=${tag.serviceAllocation.moduleId}&servicesId=${tag.serviceAllocation.servicesId}`,
              type: tag.serviceAllocation.serviceType,
              value: newPath,
              tagId: tag.id,
            });
          }
        });
        this.setState({ wizardPathNames });
      }
    });
  }
  renderDiscoverAssests() {
    return this.state.data.length ? (
      this.renderParent("parent", this.state.data)
    ) : (
      <></>
    );
  }
  renderParent(type, data) {
    return data.map((parent, index) => {
      return (
        <tr key={index}>
          <td>
            {this.renderCommonHtml(type, parent.name, parent.id)}
            {this.isOtherListExist(parent.departments, parent.id, type) ? (
              <table className="data-table inner">
                {this.renderDepartment("departments", parent.departments, {
                  parent: parent.id,
                })}
              </table>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  renderDepartment(type, data, ids) {
    return data.map((department, index) => {
      return (
        <tr key={index}>
          <td>
            {this.renderCommonHtml(
              "departments",
              department.name,
              `${ids.parent}_${department.id}`
            )}
            {this.isOtherListExist(
              department.products,
              `${ids.parent}_${department.id}`,
              type
            ) ? (
              <table className="data-table inner">
                {this.renderProducts("products", department.products, {
                  department: department.id,
                  parent: ids.parent,
                })}
              </table>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  renderProducts(type, data, ids) {
    return data.map((product, index) => {
      return (
        <tr key={index}>
          <td>
            {this.renderCommonHtml(
              "products",
              product.name,
              `${ids.parent}_${ids.department}_${product.id}`
            )}
            {this.isOtherListExist(
              product.deploymentEnvironments,
              `${ids.parent}_${ids.department}_${product.id}`,
              type
            ) ? (
              <table className="data-table inner">
                {this.renderDeploymentEnvironments(
                  "deploymentEnvironments",
                  product.deploymentEnvironments,
                  { ...ids, ...{ product: product.id } },
                  {
                    product: product.name,
                  }
                )}
              </table>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  renderDeploymentEnvironments(type, data, ids, names) {
    return data.map((deploymentEnvironment, index) => {
      return (
        <tr key={index}>
          <td>
            {this.renderCommonHtml(
              "deploymentEnvironments",
              deploymentEnvironment.name,
              `${ids.parent}_${ids.department}_${ids.product}_${deploymentEnvironment.id}`
            )}
            {this.isOtherListExist(
              deploymentEnvironment.modules,
              `${ids.parent}_${ids.department}_${ids.product}_${deploymentEnvironment.id}`,
              type
            ) ? (
              <table className="data-table inner">
                {this.renderModule(
                  "modules",
                  deploymentEnvironment.modules,
                  {
                    ...ids,
                    ...{ deploymentEnvironment: deploymentEnvironment.id },
                  },
                  {
                    ...names,
                    ...{ deploymentEnvironment: deploymentEnvironment.name },
                  }
                )}
              </table>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  renderModule(type, data, ids, names) {
    return data.map((module, index) => {
      return (
        <tr key={index}>
          <td>
            {this.renderCommonHtml(
              "modules",
              module.name,
              `${ids.parent}_${ids.department}_${ids.product}_${ids.deploymentEnvironment}_${module.id}`,
              () => {
                return this.handlemodule(
                  `landingZone=${this.props.params.landingZone}&departmentId=${
                    ids.department
                  }&productId=${ids.product}&deploymentEnvironmentId=${
                    ids.deploymentEnvironment
                  }&moduleId=${
                    module.id
                  }&discoveredAssetId=${this.handleGetId()}`
                );
              }
            )}
            {this.isOtherListExist(
              module.appServices,
              `${ids.parent}_${ids.department}_${ids.product}_${ids.deploymentEnvironment}_${module.id}`,
              type
            ) ? (
              <table className="data-table inner">
                {this.renderAppServices(
                  "appService",
                  module.appServices,
                  {
                    ...ids,
                    ...{ module: module.id },
                  },
                  { ...names, ...{ module: module.name } }
                )}
              </table>
            ) : (
              <></>
            )}
            {this.isOtherListExist(
              module.dataServices,
              `${ids.parent}_${ids.department}_${ids.product}_${ids.deploymentEnvironment}_${module.id}`,
              type
            ) ? (
              <table className="data-table inner">
                {this.renderDataServices(
                  "dataService",
                  module.dataServices,
                  {
                    department: ids.department,
                    product: ids.product,
                    deploymentEnvironment: ids.deploymentEnvironment,
                    module: module.id,
                  },
                  { ...names, ...{ module: module.name } }
                )}
              </table>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  renderAppServices(type, data, ids, names) {
    return data.map((appService, index) => {
      return (
        <tr key={index}>
          <td>
            {this.renderCommonHtml("APP", appService.name, ids, (isChecked) => {
              return this.handlePath(
                this.getHandlePathFirstArgs(
                  { ...ids, ...{ appService: appService.id } },
                  { ...names, ...{ appService: appService.name } },
                  "APP"
                ),
                isChecked,
                appService.id
              );
            })}
          </td>
        </tr>
      );
    });
  }
  renderDataServices(type, data, ids, names) {
    return data.map((dataService, index) => {
      return (
        <tr key={index}>
          <td>
            {this.renderCommonHtml(
              "DATA",
              dataService.name,
              ids,
              (isChecked) => {
                return this.handlePath(
                  this.getHandlePathFirstArgs(
                    { ...ids, ...{ dataService: dataService.id } },
                    { ...names, ...{ dataService: dataService.name } },
                    "DATA"
                  ),
                  isChecked,
                  dataService.id
                );
              }
            )}
          </td>
        </tr>
      );
    });
  }
  getHandlePathFirstArgs(ids, names, type) {
    return {
      id: `departmentId=${ids.department}&productId=${
        ids.product
      }&deploymentEnvironmentId=${ids.deploymentEnvironment}&moduleId=${
        ids.module
      }&servicesId=${type == "APP" ? ids.appService : ids.dataService}`,
      value: `asset-id-${this.handleGetId()},PRODUCT=${names.product},ENV=${
        names.deploymentEnvironment
      },MODULE=${names.module},SERVICE=${
        type == "APP" ? ids.appService : ids.dataService
      },SERVICE_TYPE=`,
      currentId: type == "APP" ? ids.appService : ids.dataService,
      type: type,
      serviceAllocation: {
        landingZone: this.props.params.landingZone,
        departmentId: ids.department,
        productId: ids.product,
        deploymentEnvironmentId: ids.deploymentEnvironment,
        moduleId: ids.module,
        servicesId: type == "APP" ? ids.appService : ids.dataService,
      },
    };
  }
  isServiceTagged(ids, type) {
    return (
      this.state.wizardPathNames &&
      this.state.wizardPathNames.length &&
      this.state.wizardPathNames.filter(
        (path) =>
          path.type === type &&
          path.id ===
            `departmentId=${ids.department}&productId=${
              ids.product
            }&deploymentEnvironmentId=${ids.deploymentEnvironment}&moduleId=${
              ids.module
            }&servicesId=${type === "APP" ? ids.appService : ids.dataService}`
      ).length > 0
    );
  }
  isOtherListExist(data, id, type) {
    return (
      this.state.toggleTreeData.parent &&
      this.state.toggleTreeData[type][id] &&
      data &&
      data.length
    );
  }
  renderCommonHtml(type, name, id, callBackFunction) {
    return (
      <div className="table-contant">
        <input
          type="checkbox"
          className="checkbox"
          onChange={(e) => {
            if (type === "APP" || type === "DATA") {
              callBackFunction(e.target.checked);
            } else {
              this.handleToggleTree(type, id, e.target.checked);
              if (type === "modules" && e.target.checked) {
                callBackFunction();
              }
            }
          }}
          checked={
            type === "APP" || type === "DATA"
              ? this.isServiceTagged(id, type)
              : this.renderIsChecked(type, id)
          }
        />
        <span>{name}</span>
      </div>
    );
  }
  renderIsChecked(type, id) {
    return (
      this.state.toggleTreeData[type] && this.state.toggleTreeData[type][id]
    );
  }
  render() {
    return (
      <div className="asset-container">
        <div className="tagging-wizard-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Discovered Assets</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <a
                    className="white-button m-r-0"
                    href="/assetmanager/pages/taggingWizard"
                  >
                    <i className="fa fa-arrow-circle-left"></i>
                    &nbsp;&nbsp; Back
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className=" common-container border-bottom-0">
            <div className="urganisational-unit-container add-tagging-contant">
              <div className="associate-head p-b-1">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <strong>Associate Elements</strong>
                  </div>
                </div>
              </div>
              <div className="select-resources">
                <p className="m-t-1">
                  Please select below the resources you want to tag with element
                </p>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Resources</h4>
                      </div>
                      <div className="resources-contant">
                        <table className="data-table">
                          {this.renderDiscoverAssests()}
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Existing tags of element</h4>
                      </div>
                      {this.state.wizardPathNames &&
                      this.state.wizardPathNames.length ? (
                        this.state.wizardPathNames.map((path) => {
                          return (
                            <div className="existing-tags-contant">
                              <div className="existing-tags-text">
                                <p>{path.value}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
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
export default withParams(AddTaggingWizard);

import { escape } from "lodash";
import { object } from "prop-types";
import React, { Component } from "react";
import { Collapse } from "reactstrap";
//import { config } from "../../config";
export class AddTaggingWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      toggleTree: {
        parent: false,
        departments: {},
        products: {},
        deploymentEnvironments: {},
        modules: {},
      },
      wizardPathNames: [],
    };
  }

  async getDiscoverAssest(id) {
    const response = await fetch(
      `http://34.199.12.114:5057/api/organizations/${id}`
    );
    const discoverData = await response.json();
    if (discoverData["status"] != 404) {
      this.setState({ ...this.state, ["data"]: discoverData });
    }
  }
  componentDidMount() {
    let getId = this.handleGetId();
    this.getDiscoverAssest(getId);
  }
  handleToggleTree(type, id = 0) {
    let { toggleTree } = this.state;
    if (type == "parent") {
      this.setState({
        ...this.state,
        ["toggleTree"]: {
          ...this.state.toggleTree,
          [`${type}`]: !this.state.toggleTree[`${type}`],
        },
      });
    } else if (type == "departments") {
      toggleTree["departments"][id] = !toggleTree["departments"][id];
      this.setState({
        ...this.state,
        ["toggleTree"]: {
          ...this.state.toggleTree,
          ["departments"]: toggleTree["departments"],
        },
        ["wizardPathNames"]: [],
      });
    } else if (type == "products") {
      toggleTree["products"][id] = !toggleTree["products"][id];
      this.setState({
        ...this.state,
        ["toggleTree"]: {
          ...this.state.toggleTree,
          ["products"]: toggleTree["products"],
        },
      });
    } else if (type == "deploymentEnvironments") {
      toggleTree["deploymentEnvironments"][id] =
        !toggleTree["deploymentEnvironments"][id];
      this.setState({
        ...this.state,
        ["toggleTree"]: {
          ...this.state.toggleTree,
          ["deploymentEnvironments"]: toggleTree["deploymentEnvironments"],
        },
      });
    } else if (type == "modules") {
      toggleTree["modules"][id] = !toggleTree["modules"][id];
      this.setState({
        ...this.state,
        ["toggleTree"]: {
          ...this.state.toggleTree,
          ["modules"]: toggleTree["modules"],
        },
      });
    }
  }
  async handlePath(data, checked) {
    let { wizardPathNames } = this.state;
    let pathKeys = ["PRODUCT", "ENV", "MODULE", "SERVICE", "SERVICE_TYPE"];

    if (checked) {
      this.handleDiscoverAssetsUpdate(data).then((res) => {
        if (res && res.tag) {
          let getTab = res.tag.split(",");
          let newPath = "";
          getTab.forEach((tempData, key) => {
            if (key > 1) {
              newPath += " > ";
            }
            if (key > 0) {
              newPath += tempData.replace(`${pathKeys[key - 1]}=`, "");
            }
          });
          wizardPathNames.push({ id: data.id, value: newPath });
          this.setState({
            ...this.state,
            ["wizardPathNames"]: wizardPathNames,
          });
        }
      });
    } else {
      wizardPathNames = wizardPathNames.filter((path) => path.id != data.id);
      this.setState({ ...this.state, ["wizardPathNames"]: wizardPathNames });
    }
  }
  handleGetId() {
    try {
      return window.location.pathname
        .replace("/assetmanager/pages/addTaggingWizard/", "")
        .split("/")[0];
    } catch (e) {
      console.log(e);
    }
  }
  handleGetLandingId() {
    try {
      return window.location.pathname
        .replace("/assetmanager/pages/addTaggingWizard/", "")
        .split("/")[1];
    } catch (e) {
      console.log(e);
    }
  }
  async handleDiscoverAssetsUpdate(otherparams) {
    let getLandingId = this.handleGetLandingId();
    return new Promise(async function (myResolve, myReject) {
      const response = await fetch(
        `http://34.199.12.114:5057/api/service-allocations/search?landingZone=${getLandingId}&${otherparams.id}`
      );
      const discoverDataId = await response.json();
      if (discoverDataId && discoverDataId.length) {
        const response = await fetch(
          `http://34.199.12.114:5057/api/service-allocations/${otherparams.currentId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
              id: discoverDataId[0].id,
              tag: otherparams.value + discoverDataId[0].serviceType,
            }),
          }
        );
        const discoverData = await response.json();
        myResolve(discoverData);
      }
    });
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
                  <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Resources</h4>
                      </div>
                      <div className="resources-contant">
                        <table className="data-table">
                          {Object.keys(this.state.data).length ? (
                            <tr>
                              <td>
                                <div className="table-contant">
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    onChange={() => {
                                      this.handleToggleTree("parent");
                                    }}
                                  />
                                  <span>{this.state.data.name}</span>
                                </div>

                                {this.state.toggleTree.parent &&
                                this.state.data.departments &&
                                Object.keys(this.state.data.departments)
                                  .length ? (
                                  <table className="data-table inner">
                                    {this.state.data.departments.map(
                                      (department, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>
                                              <div className="table-contant">
                                                <input
                                                  type="checkbox"
                                                  className="checkbox"
                                                  onChange={() => {
                                                    this.handleToggleTree(
                                                      "departments",
                                                      department.id
                                                    );
                                                  }}
                                                  checked={
                                                    this.state.toggleTree[
                                                      "departments"
                                                    ] &&
                                                    this.state.toggleTree[
                                                      "departments"
                                                    ][department.id]
                                                  }
                                                />
                                                <span>{department.name}</span>
                                              </div>
                                              {this.state.toggleTree[
                                                "departments"
                                              ] &&
                                              this.state.toggleTree[
                                                "departments"
                                              ][department.id] &&
                                              department.products &&
                                              department.products.length ? (
                                                <table className="data-table inner">
                                                  {department.products.map(
                                                    (product, innerIndex) => {
                                                      return (
                                                        <tr>
                                                          <td>
                                                            <div className="table-contant">
                                                              <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                                onChange={() => {
                                                                  this.handleToggleTree(
                                                                    "products",
                                                                    `${department.id}_${product.id}`
                                                                  );
                                                                }}
                                                                checked={
                                                                  this.state
                                                                    .toggleTree[
                                                                    "products"
                                                                  ] &&
                                                                  this.state
                                                                    .toggleTree[
                                                                    "products"
                                                                  ][
                                                                    `${department.id}_${product.id}`
                                                                  ]
                                                                }
                                                              />
                                                              <span>
                                                                {product.name}
                                                              </span>
                                                            </div>
                                                            {this.state
                                                              .toggleTree[
                                                              "products"
                                                            ] &&
                                                            this.state
                                                              .toggleTree[
                                                              "products"
                                                            ][
                                                              `${department.id}_${product.id}`
                                                            ] &&
                                                            product.deploymentEnvironments &&
                                                            product
                                                              .deploymentEnvironments
                                                              .length ? (
                                                              <table className="data-table inner">
                                                                {product.deploymentEnvironments.map(
                                                                  (
                                                                    deploymentEnvironment,
                                                                    deploymentEnvironmentIdeIndex
                                                                  ) => {
                                                                    return (
                                                                      <tr>
                                                                        <td>
                                                                          <div className="table-contant">
                                                                            <input
                                                                              type="checkbox"
                                                                              className="checkbox"
                                                                              onChange={() => {
                                                                                this.handleToggleTree(
                                                                                  "deploymentEnvironments",
                                                                                  `${department.id}_${product.id}_${deploymentEnvironment.id}`
                                                                                );
                                                                              }}
                                                                              checked={
                                                                                this
                                                                                  .state
                                                                                  .toggleTree[
                                                                                  "deploymentEnvironments"
                                                                                ] &&
                                                                                this
                                                                                  .state
                                                                                  .toggleTree[
                                                                                  "deploymentEnvironments"
                                                                                ][
                                                                                  `${department.id}_${product.id}_${deploymentEnvironment.id}`
                                                                                ]
                                                                              }
                                                                            />
                                                                            <span>
                                                                              {
                                                                                deploymentEnvironment.name
                                                                              }
                                                                            </span>
                                                                          </div>
                                                                          {this
                                                                            .state
                                                                            .toggleTree[
                                                                            "deploymentEnvironments"
                                                                          ] &&
                                                                          this
                                                                            .state
                                                                            .toggleTree[
                                                                            "deploymentEnvironments"
                                                                          ][
                                                                            `${department.id}_${product.id}_${deploymentEnvironment.id}`
                                                                          ] &&
                                                                          deploymentEnvironment.modules &&
                                                                          deploymentEnvironment
                                                                            .modules
                                                                            .length ? (
                                                                            <table className="data-table inner">
                                                                              {deploymentEnvironment.modules.map(
                                                                                (
                                                                                  module,
                                                                                  moduleIndex
                                                                                ) => {
                                                                                  return (
                                                                                    <tr
                                                                                      key={
                                                                                        moduleIndex
                                                                                      }
                                                                                    >
                                                                                      <td>
                                                                                        <div className="table-contant">
                                                                                          <input
                                                                                            type="checkbox"
                                                                                            className="checkbox"
                                                                                            onChange={() => {
                                                                                              this.handleToggleTree(
                                                                                                "modules",
                                                                                                `${department.id}_${product.id}_${deploymentEnvironment.id}_${module.id}`
                                                                                              );
                                                                                            }}
                                                                                            checked={
                                                                                              this
                                                                                                .state
                                                                                                .toggleTree[
                                                                                                "modules"
                                                                                              ] &&
                                                                                              this
                                                                                                .state
                                                                                                .toggleTree[
                                                                                                "modules"
                                                                                              ][
                                                                                                `${department.id}_${product.id}_${deploymentEnvironment.id}__${module.id}`
                                                                                              ]
                                                                                            }
                                                                                          />
                                                                                          <span>
                                                                                            {
                                                                                              module.name
                                                                                            }
                                                                                          </span>
                                                                                        </div>
                                                                                        {this
                                                                                          .state
                                                                                          .toggleTree[
                                                                                          "modules"
                                                                                        ] &&
                                                                                        this
                                                                                          .state
                                                                                          .toggleTree[
                                                                                          "modules"
                                                                                        ][
                                                                                          `${department.id}_${product.id}_${deploymentEnvironment.id}_${module.id}`
                                                                                        ] &&
                                                                                        module.appServices &&
                                                                                        module
                                                                                          .appServices
                                                                                          .length ? (
                                                                                          <table className="data-table inner">
                                                                                            {module.appServices.map(
                                                                                              (
                                                                                                appService,
                                                                                                serviceIndex
                                                                                              ) => {
                                                                                                return (
                                                                                                  <tr
                                                                                                    key={
                                                                                                      serviceIndex
                                                                                                    }
                                                                                                  >
                                                                                                    <td>
                                                                                                      <div className="table-contant">
                                                                                                        <input
                                                                                                          type="checkbox"
                                                                                                          className="checkbox"
                                                                                                          onChange={(
                                                                                                            e
                                                                                                          ) => {
                                                                                                            this.handlePath(
                                                                                                              {
                                                                                                                id: `departmentId=${department.id}&productId=${product.id}&deploymentEnvironmentId=${deploymentEnvironment.id}&moduleId=${module.id}&servicesId=${appService.id}`,
                                                                                                                value: `asset-id-${this.handleGetId()},PRODUCT=${
                                                                                                                  product.name
                                                                                                                },ENV=${
                                                                                                                  deploymentEnvironment.name
                                                                                                                },MODULE=${
                                                                                                                  module.name
                                                                                                                },SERVICE=${
                                                                                                                  appService.name
                                                                                                                },SERVICE_TYPE=`,
                                                                                                                currentId:
                                                                                                                  appService.id,
                                                                                                              },
                                                                                                              e
                                                                                                                .target
                                                                                                                .checked,
                                                                                                              appService.id
                                                                                                            );
                                                                                                          }}
                                                                                                          checked={
                                                                                                            this
                                                                                                              .state
                                                                                                              .wizardPathNames &&
                                                                                                            this
                                                                                                              .state
                                                                                                              .wizardPathNames
                                                                                                              .length
                                                                                                              ? this.state.wizardPathNames.filter(
                                                                                                                  (
                                                                                                                    path
                                                                                                                  ) =>
                                                                                                                    path.id ==
                                                                                                                    `departmentId=${department.id}&productId=${product.id}&deploymentEnvironmentId=${deploymentEnvironment.id}&moduleId=${module.id}&servicesId=${appService.id}`
                                                                                                                )
                                                                                                              : false}
                                                                                                        />
                                                                                                        <span>
                                                                                                          {
                                                                                                            appService.name
                                                                                                          }
                                                                                                        </span>
                                                                                                      </div>
                                                                                                      {/* table */}
                                                                                                    </td>
                                                                                                  </tr>
                                                                                                );
                                                                                              }
                                                                                            )}
                                                                                          </table>
                                                                                        ) : (
                                                                                          <>

                                                                                          </>
                                                                                        )}
                                                                                        {this
                                                                                          .state
                                                                                          .toggleTree[
                                                                                          "modules"
                                                                                        ] &&
                                                                                        this
                                                                                          .state
                                                                                          .toggleTree[
                                                                                          "modules"
                                                                                        ][
                                                                                          `${department.id}_${product.id}_${deploymentEnvironment.id}_${module.id}`
                                                                                        ] &&
                                                                                        module.dataServices &&
                                                                                        module
                                                                                          .dataServices
                                                                                          .length ? (
                                                                                          <table className="data-table inner">
                                                                                            {module.dataServices.map(
                                                                                              (
                                                                                                dataService,
                                                                                                dataserviceIndex
                                                                                              ) => {
                                                                                                return (
                                                                                                  <tr
                                                                                                    key={
                                                                                                      dataserviceIndex
                                                                                                    }
                                                                                                  >
                                                                                                    <td>
                                                                                                      <div className="table-contant">
                                                                                                        <input
                                                                                                          type="checkbox"
                                                                                                          className="checkbox"
                                                                                                          checked={
                                                                                                            this
                                                                                                              .state
                                                                                                              .wizardPathNames &&
                                                                                                            this
                                                                                                              .state
                                                                                                              .wizardPathNames
                                                                                                              .length
                                                                                                              ? this.state.wizardPathNames.filter(
                                                                                                                  (
                                                                                                                    path
                                                                                                                  ) =>
                                                                                                                    path.id ==
                                                                                                                    `departmentId=${department.id}&productId=${product.id}&deploymentEnvironmentId=${deploymentEnvironment.id}&moduleId=${module.id}&servicesId=${dataService.id}`
                                                                                                                )
                                                                                                              : false
                                                                                                          }
                                                                                                          onChange={(
                                                                                                            e
                                                                                                          ) => {
                                                                                                            this.handlePath(
                                                                                                              {
                                                                                                                id: `departmentId=${department.id}&productId=${product.id}&deploymentEnvironmentId=${deploymentEnvironment.id}&moduleId=${module.id}&servicesId=${dataService.id}`,
                                                                                                                value: `asset-id-${this.handleGetId()},PRODUCT=${
                                                                                                                  product.name
                                                                                                                },ENV=${
                                                                                                                  deploymentEnvironment.name
                                                                                                                },MODULE=${
                                                                                                                  module.name
                                                                                                                },SERVICE=${
                                                                                                                  dataService.name
                                                                                                                },SERVICE_TYPE=`,
                                                                                                                currentId:
                                                                                                                  dataService.id,
                                                                                                              },
                                                                                                              e
                                                                                                                .target
                                                                                                                .checked,
                                                                                                              dataService.id
                                                                                                            );
                                                                                                          }}
                                                                                                        />
                                                                                                        <span>
                                                                                                          {
                                                                                                            dataService.name
                                                                                                          }
                                                                                                        </span>
                                                                                                      </div>
                                                                                                      {/* table */}
                                                                                                    </td>
                                                                                                  </tr>
                                                                                                );
                                                                                              }
                                                                                            )}
                                                                                          </table>
                                                                                        ) : (
                                                                                          <>

                                                                                          </>
                                                                                        )}
                                                                                        {/* table */}
                                                                                      </td>
                                                                                    </tr>
                                                                                  );
                                                                                }
                                                                              )}
                                                                            </table>
                                                                          ) : (
                                                                            <>

                                                                            </>
                                                                          )}
                                                                          {/* table */}
                                                                        </td>
                                                                      </tr>
                                                                    );
                                                                  }
                                                                )}
                                                              </table>
                                                            ) : (
                                                              <></>
                                                            )}
                                                          </td>
                                                        </tr>
                                                      );
                                                    }
                                                  )}

                                                  {/* <tr>
                                                    <td>
                                                      <div className="table-contant">
                                                        <input
                                                          type="checkbox"
                                                          className="checkbox"
                                                        />
                                                        <span>
                                                          Account Management
                                                        </span>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <div className="table-contant">
                                                        <input
                                                          type="checkbox"
                                                          className="checkbox"
                                                        />
                                                        <span>
                                                          Inventory Management
                                                        </span>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <div className="table-contant">
                                                        <input
                                                          type="checkbox"
                                                          className="checkbox"
                                                        />
                                                        <span>
                                                          Travel Management
                                                        </span>
                                                      </div>
                                                    </td>
                                                  </tr> */}
                                                </table>
                                              ) : (
                                                <></>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                    {/* <tr>
                                      <td>
                                        <div className="table-contant">
                                          <input
                                            type="checkbox"
                                            className="checkbox"
                                          />
                                          <span>Human Resource</span>
                                        </div>
                                        <table className="data-table inner">
                                          <tr>
                                            <td>
                                              <div className="table-contant">
                                                <input
                                                  type="checkbox"
                                                  className="checkbox"
                                                />
                                                <span>HRMS</span>
                                              </div>
                                              <table className="data-table inner">
                                                <tr>
                                                  <td>
                                                    <div className="table-contant">
                                                      <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                      />
                                                      <span>Development</span>
                                                    </div>
                                                    <table className="data-table inner">
                                                      <tr>
                                                        <td>
                                                          <div className="table-contant">
                                                            <input
                                                              type="checkbox"
                                                              className="checkbox"
                                                            />
                                                            <span>
                                                              Payroll Management
                                                            </span>
                                                          </div>
                                                          <table className="data-table inner">
                                                            <tr>
                                                              <td>
                                                                <div className="table-contant">
                                                                  <input
                                                                    type="checkbox"
                                                                    className="checkbox"
                                                                  />
                                                                  <span>
                                                                    App Services
                                                                  </span>
                                                                </div>
                                                                <table className="data-table inner">
                                                                  <tr>
                                                                    <td>
                                                                      <div className="table-contant">
                                                                        <input
                                                                          type="checkbox"
                                                                          className="checkbox"
                                                                        />
                                                                        <span>
                                                                          Java
                                                                          Springboot
                                                                          API
                                                                          Service
                                                                        </span>
                                                                      </div>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>
                                                                      <div className="table-contant">
                                                                        <input
                                                                          type="checkbox"
                                                                          className="checkbox"
                                                                        />
                                                                        <span>
                                                                          Golang
                                                                          API
                                                                          Services
                                                                        </span>
                                                                      </div>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>
                                                                      <div className="table-contant">
                                                                        <input
                                                                          type="checkbox"
                                                                          className="checkbox"
                                                                        />
                                                                        <span>
                                                                          NodeJs
                                                                          API
                                                                          Services
                                                                        </span>
                                                                      </div>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>
                                                                      <div className="table-contant">
                                                                        <input
                                                                          type="checkbox"
                                                                          className="checkbox"
                                                                        />
                                                                        <span>
                                                                          Java
                                                                          Lambda
                                                                          Functions{" "}
                                                                        </span>
                                                                      </div>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td>
                                                                <div className="table-contant">
                                                                  <input
                                                                    type="checkbox"
                                                                    className="checkbox"
                                                                  />
                                                                  <span>
                                                                    Data
                                                                    Services
                                                                  </span>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>
                                                          <div className="table-contant">
                                                            <input
                                                              type="checkbox"
                                                              className="checkbox"
                                                            />
                                                            <span>
                                                              Leave Management
                                                            </span>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>
                                                          <div className="table-contant">
                                                            <input
                                                              type="checkbox"
                                                              className="checkbox"
                                                            />
                                                            <span>
                                                              Facility
                                                              Management
                                                            </span>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>
                                                          <div className="table-contant">
                                                            <input
                                                              type="checkbox"
                                                              className="checkbox"
                                                            />
                                                            <span>
                                                              Appraisal
                                                              Management
                                                            </span>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>
                                                          <div className="table-contant">
                                                            <input
                                                              type="checkbox"
                                                              className="checkbox"
                                                            />
                                                            <span>
                                                              H&M Management
                                                            </span>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>
                                                          <div className="table-contant">
                                                            <input
                                                              type="checkbox"
                                                              className="checkbox"
                                                            />
                                                            <span>
                                                              Vendor Management
                                                            </span>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <div className="table-contant">
                                                      <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                      />
                                                      <span>Stage</span>
                                                    </div>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <div className="table-contant">
                                                      <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                      />
                                                      <span>Testing</span>
                                                    </div>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <div className="table-contant">
                                                      <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                      />
                                                      <span>Production</span>
                                                    </div>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <div className="table-contant">
                                                <input
                                                  type="checkbox"
                                                  className="checkbox"
                                                />
                                                <span>Account Management</span>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <div className="table-contant">
                                                <input
                                                  type="checkbox"
                                                  className="checkbox"
                                                />
                                                <span>
                                                  Inventory Management
                                                </span>
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <div className="table-contant">
                                                <input
                                                  type="checkbox"
                                                  className="checkbox"
                                                />
                                                <span>Travel Management</span>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr> */}
                                    {/* <tr>
                                      <td>
                                        <div className="table-contant">
                                          <input
                                            type="checkbox"
                                            className="checkbox"
                                          />
                                          <span>IT Networking</span>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="table-contant">
                                          <input
                                            type="checkbox"
                                            className="checkbox"
                                          />
                                          <span>Monitoring</span>
                                        </div>
                                      </td>
                                    </tr> */}
                                  </table>
                                ) : (
                                  <></>
                                )}
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
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
export default AddTaggingWizard;

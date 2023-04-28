import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import Table from "../../Components/Table";
import Rbac from "../../Components/Rbac";
import UnimplementedFeaturePopup from "../../Components/UnimplementedFeaturePopup";

class Rules extends Component {
  constructor(props) {
    super(props);
    this.tableValue = {
      columns: [
        {
          label: "Name",
          key: "name",
        },
        {
          label: "Condition",
          key: "condition",
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (value) => {
            let strClass = "isEnabled";
            return (
              <td>
                <div className="enabled-disabled-container">
                  <div className={`${strClass ? "enabled" : "disabled"}`}></div>
                </div>
              </td>
            );
          },
        },
        {
          label: "Target resource",
          key: "targetResource",
        },
        {
          label: "Action",
          key: "action",
          renderCallback: () => {
            return (
              <td>
                <div className="d-inline-block">
                  <Rbac
                    parentName={config.PARENT_NAME}
                    childName="rules-index-editbtn"
                  >
                    <button
                      className="btn btn-link"
                      onClick={() => this.onClickUnImplementedFeature("")}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </Rbac>
                  <Rbac
                    parentName={config.PARENT_NAME}
                    childName="rules-index-deletebtn"
                  >
                    <button
                      className="btn btn-link"
                      onClick={() => this.onClickUnImplementedFeature("")}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </Rbac>
                </div>
              </td>
            );
          },
        },
      ],
      data: [
        {
          name: "Percentage CPU",
          condition: "Percentage CPU greater or equal to 0",
          isEnabled: false,
          targetResource: "kub-master-146783",
          checkStatus: false,
        },
        {
          name: "Disk Write Bytes",
          condition: "Disk Write Bytes alert is greater than 10GB",
          isEnabled: true,
          targetResource: "Metrics",
          checkStatus: false,
        },
        {
          name: "Network Out",
          condition: "Network Out GreaterThan 3333",
          isEnabled: true,
          targetResource: "Ser08-Test-11",
          checkStatus: false,
        },
        {
          name: "Network In",
          condition: "Network In GreatThan 3333",
          isEnabled: false,
          targetResource: "Ser08-Test-11",
          checkStatus: false,
        },
      ],
    };
    this.perPageLimit = 2;
    this.checkboxValue = true;
    this.state = {};

    this.unimplementedFeatureModalRef = React.createRef();
  }
  onClickUnImplementedFeature = (link) => {
    this.unimplementedFeatureModalRef.current.setLink(link);
    this.unimplementedFeatureModalRef.current.toggle();
  };

  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    return (
      <div className="all-alerts-container">
        <div className="alert-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-md-9 col-sm-12">
                <Rbac
                  parentName={config.PARENT_NAME}
                  childName="rules-index-newalertrulebtn"
                >
                  <Link
                    to={`/alertmanager/pages/manage-alert-rule`}
                    className="asset-white-button"
                  >
                    <i className="fa fa-plus"></i>&nbsp;&nbsp; New Alert Rule
                  </Link>
                </Rbac>
                <a
                  className="asset-white-button"
                  onClick={() => this.onClickUnImplementedFeature("")}
                >
                  <i className="fa fa-refresh"></i>&nbsp;&nbsp; Refresh
                </a>
              </div>
              <div className="col-md-3 col-sm-12">
                <Link
                  to={`/alertmanager/pages/manage-alert-rule`}
                  className="asset-white-button min-width-inherit float-right m-r-0"
                >
                  <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp; Back
                </Link>
              </div>
            </div>
          </div>
          <div className="filter-container row common-container">
            <div className="form-group filter-control-group col-md-4 col-sm-12">
              <label htmlFor="resources">
                Rousources Group&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="resources">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="form-group filter-control-group col-md-4 col-sm-12">
              <label htmlFor="resources">
                Rousources&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="resources">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="alert-data-table-container rulesalert-data-table-container common-container border-bottom-0">
            <Table
              valueFromData={this.tableValue}
              perPageLimit={this.perPageLimit}
              visiblecheckboxStatus={this.checkboxValue}
              tableClasses={{
                table: "alert-data-tabel",
                tableParent: "alerts-data-tabel",
                parentClass: "all-alert-data-table",
              }}
              searchKey="name"
              showingLine="Showing %start% to %end% of %total%"
              dark={!this.isLightTheme()}
            />
          </div>
        </div>
        <UnimplementedFeaturePopup ref={this.unimplementedFeatureModalRef} />
      </div>
    );
  }
}

export default Rules;

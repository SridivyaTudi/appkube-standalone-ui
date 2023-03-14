import React, { Component } from "react";
import awsLogo from "../../../assets/img/perfmanager/aws.png";
import microsoftAzureLogo from "../../../assets/img/perfmanager/microsoftazure.png";
import gcpLogo from "../../../assets/img/perfmanager/google-cloud.png";
import KubernetesLogo from "../../../assets/img/perfmanager/kubernetes.png";
import folderIcon from "../../../assets/img/perfmanager/folder.png";
import listIcon from "../../../assets/img/perfmanager/list.png";
import sortIcon from "../../../assets/img/perfmanager/sort.png";
import tagIcon from "../../../assets/img/perfmanager/tag.png";
import openFolderIcon from "../../../assets/img/perfmanager/open-folder.png";
import { Collapse } from "reactstrap";
import TopMenu from "../catalog/topMenu";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderArray: [
        {
          title: "General",
          openSubFolder: true,
          checkValueStatus: false,
          subData: [
            {
              tableTitle: "Amazon CloudWatch Logs",
              checkValue: false,
              attribute: [
                {
                  attributeName: "AWS",
                  backColorClass: "aws-bg",
                },
                {
                  attributeName: "Amazon",
                  backColorClass: "amazon-bg",
                },
                {
                  attributeName: "Cloud Watch",
                  backColorClass: "cloudwatch-bg",
                },
                {
                  attributeName: "Logs",
                  backColorClass: "logs-bg",
                },
              ],
            },
            {
              tableTitle: "Amazon RDS",
              checkValue: false,
              attribute: [
                {
                  attributeName: "Cloud Watch",
                  backColorClass: "cloudwatch-bg",
                },
                {
                  attributeName: "Monitoringartist",
                  backColorClass: "aws-bg",
                },
              ],
            },
            {
              tableTitle: "AWS VPN",
              checkValue: false,
              attribute: [
                {
                  attributeName: "Cloud Watch",
                  backColorClass: "cloudwatch-bg",
                },
                {
                  attributeName: "Monitoringartist",
                  backColorClass: "aws-bg",
                },
              ],
            },
            {
              tableTitle: "AWS VPN Dashboard",
              checkValue: false,
            },
            {
              tableTitle: "Cloud Trial",
              checkValue: false,
            },
            {
              tableTitle: "Cloud Watch",
              checkValue: false,
            },
          ],
        },
        {
          title: "Main",
          openSubFolder: false,
          checkValueStatus: false,
          subData: [
            {
              tableTitle: "Amazon CloudWatch Logs",
              checkValue: false,
              attribute: [
                {
                  attributeName: "AWS",
                  backColorClass: "aws-bg",
                },
                {
                  attributeName: "Amazon",
                  backColorClass: "amazon-bg",
                },
                {
                  attributeName: "Cloud Watch",
                  backColorClass: "cloudwatch-bg",
                },
                {
                  attributeName: "Logs",
                  backColorClass: "logs-bg",
                },
              ],
            },
            {
              tableTitle: "Amazon RDS",
              checkValue: false,
              attribute: [
                {
                  attributeName: "Cloud Watch",
                  backColorClass: "cloudwatch-bg",
                },
                {
                  attributeName: "Monitoringartist",
                  backColorClass: "aws-bg",
                },
              ],
            },
            {
              tableTitle: "AWS VPN",
              checkValue: false,
              attribute: [
                {
                  attributeName: "Cloud Watch",
                  backColorClass: "cloudwatch-bg",
                },
                {
                  attributeName: "Monitoringartist",
                  backColorClass: "aws-bg",
                },
              ],
            },
            {
              tableTitle: "AWS VPN Dashboard",
              checkValue: false,
            },
            {
              tableTitle: "Cloud Trial",
              checkValue: false,
            },
            {
              tableTitle: "Cloud Watch",
              checkValue: false,
            },
          ],
        },
        {
          title: "Open",
          openSubFolder: false,
          checkValueStatus: false,
          subData: [
            {
              tableTitle: "Amazon CloudWatch Logs",
              checkValue: false,
            },
            {
              tableTitle: "Amazon RDS",
              checkValue: false,
              attribute: [
                {
                  attributeName: "Cloud Watch",
                  backColorClass: "cloudwatch-bg",
                },
                {
                  attributeName: "Monitoringartist",
                  backColorClass: "aws-bg",
                },
              ],
            },
            {
              tableTitle: "AWS VPN",
              checkValue: false,
              attribute: [
                {
                  attributeName: "Cloud Watch",
                  backColorClass: "cloudwatch-bg",
                },
                {
                  attributeName: "Monitoringartist",
                  backColorClass: "aws-bg",
                },
              ],
            },
            {
              tableTitle: "AWS VPN Dashboard",
              checkValue: false,
            },
            {
              tableTitle: "Cloud Trial",
              checkValue: false,
            },
            {
              tableTitle: "Cloud Watch",
              checkValue: false,
            },
          ],
        },
      ],
    };
  }

  openCloseManageDashboardFolder = () => {
    const retData = [];
    const { folderArray } = this.state;
    const length = folderArray.length;
    for (let i = 0; i < length; i++) {
      const folder = folderArray[i];
      const subFolders = folder.subData;
      const subFolderJSX = [];
      for (let j = 0; j < subFolders.length; j++) {
        const attribute = subFolders[j].attribute;
        const subAttributeFolder = [];
        if (subFolders[j].attribute) {
          for (let k = 0; k < attribute.length; k++) {
            const subAtt = attribute[k];
            subAttributeFolder.push(
              <div className={subAtt.backColorClass}>
                {subAtt.attributeName}
              </div>
            );
          }
        }
        const subFolder = subFolders[j];
        subFolderJSX.push(
          <tr>
            <td>
              <input
                type="checkbox"
                className="checkbox"
                checked={subFolder.checkValue}
                onClick={() => this.onClickChildCheckbox(i, j)}
              />
              <span>{subFolder.tableTitle}</span>
            </td>
            <td>
              <div className="float-right">{subAttributeFolder}</div>
            </td>
          </tr>
        );
      }
      retData.push(
        <div>
          <div className="general-heading">
            <input
              type="checkbox"
              checked={folder.checkValueStatus}
              onChange={(e) => {
                this.onChangeParentCheckbox(e, i);
              }}
              className="checkbox"
            />
            <span onClick={() => this.onClickOpenSubFolder(i)}>
              <img src={openFolderIcon} alt="" />
            </span>
            <h4>{folder.title}</h4>
            <i className="fa fa-angle-down float-right"></i>
          </div>
          <Collapse isOpen={folder.openSubFolder}>
            <div className="general-logs">
              <div className="general-logs-inner">
                <table className="data-table">{subFolderJSX}</table>
              </div>
            </div>
          </Collapse>
        </div>
      );
    }
    return retData;
  };

  onChangeParentCheckbox = (e, index) => {
    const { folderArray } = this.state;
    const parentCheckbox = folderArray[index];
    const checked = e.target.checked;
    for (let j = 0; j < parentCheckbox.subData.length; j++) {
      parentCheckbox.subData[j].checkValue = checked;
      parentCheckbox.checkValueStatus = checked;
    }
    this.setState({
      folderArray,
    });
  };

  onClickChildCheckbox = (parentIndex, childIndex) => {
    let countCheckedCheckbox = 0;
    const { folderArray } = this.state;
    const parentCheckbox = folderArray[parentIndex];
    parentCheckbox.subData[childIndex].checkValue =
      !parentCheckbox.subData[childIndex].checkValue;
    for (let j = 0; j < parentCheckbox.subData.length; j++) {
      if (parentCheckbox.subData[j].checkValue == true) {
        countCheckedCheckbox++;
      } else {
        countCheckedCheckbox--;
      }
    }
    if (countCheckedCheckbox == parentCheckbox.subData.length) {
      parentCheckbox.checkValueStatus = true;
    } else {
      parentCheckbox.checkValueStatus = false;
    }
    this.setState({
      folderArray,
    });
  };

  onClickOpenSubFolder = (index) => {
    const { folderArray } = this.state;
    folderArray[index].openSubFolder = !folderArray[index].openSubFolder;
    this.setState({
      folderArray: folderArray,
    });
  };

  render() {
    return (
      <div className="perfmanager-dashboard-container">
        <div className="perfmanager-page-container">
          <div className="common-container">
            <TopMenu />
          </div>
          <div className="common-container border-bottom-0">
            <div className="collection-logos">
              <ul>
                <li>
                  <a>
                    <span>
                      <img src={awsLogo} alt="" />
                    </span>
                    <p>AWS</p>
                  </a>
                </li>
                <li>
                  <a>
                    <span>
                      <img src={microsoftAzureLogo} alt="" />
                    </span>
                    <p>Azure</p>
                  </a>
                </li>
                <li>
                  <a>
                    <span>
                      <img src={gcpLogo} alt="" />
                    </span>
                    <p>GCP</p>
                  </a>
                </li>
                <li>
                  <a>
                    <span>
                      <img src={KubernetesLogo} alt="" />
                    </span>
                    <p>Kubernetes</p>
                  </a>
                </li>
              </ul>
            </div>
            <div className="collection-dashboard-radio-btns">
              <ul>
                <li>
                  <input type="radio" id="f-kpi" name="selector" />
                  <label htmlFor="f-kpi">KPI</label>
                </li>
                <li>
                  <input type="radio" id="f-log" name="selector" />
                  <label htmlFor="f-v">Log</label>
                </li>
                <li>
                  <input type="radio" id="f-schema" name="selector" />
                  <label htmlFor="f-schema">Schema</label>
                </li>
              </ul>
            </div>

            <div className="collection-dashboard-search">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="search-buttons float-right">
                    <a className="blue-button">New Dashboard</a>
                    <a className="blue-button">New Folder</a>
                    <a className="blue-button m-r-0">Import</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="collection-dashboard-fliter-sort">
              <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                  <div className="sort-checkbox">
                    <input type="checkbox" className="checkbox" />
                  </div>
                  <div className="sort-view">
                    <ul>
                      <li className="active">
                        <a>
                          <img src={folderIcon} alt="" />
                        </a>
                      </li>
                      <li>
                        <a>
                          <img src={listIcon} alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="sort-select-menu">
                    <span>
                      <img src={sortIcon} alt="" />
                    </span>
                    <select>
                      <option>Sort (Default A-Z)</option>
                      <option>Sort (Default A-Z)</option>
                      <option>Sort (Default A-Z)</option>
                    </select>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                  <div className="filter-starred float-right">
                    <div className="sort-checkbox">
                      <input type="checkbox" className="checkbox" />
                      <span>Filter by starred</span>
                    </div>
                    <div className="sort-select-menu">
                      <span>
                        <img src={tagIcon} alt="" />
                      </span>
                      <select>
                        <option>Filter by tag</option>
                        <option>Filter by tag</option>
                        <option>Filter by tag</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="collection-dashboard-general">
              {this.openCloseManageDashboardFolder()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Collection;

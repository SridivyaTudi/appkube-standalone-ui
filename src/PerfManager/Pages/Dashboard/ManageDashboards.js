import * as React from "react";
import tagIcon from "../../img/tag.png";
import folderIcon from "../../img/folder.png";
import listIcon from "../../img/list.png";
import sortIcon from "../../img/sort.png";
import openFolderIcon from "../../img/open-folder.png";
import { Collapse } from "reactstrap";
import { RestService } from "../../../Services/RestService";
import config from "../../../config";
import { getTagColorsFromName } from "../_utilities";
import data from "./data.json";

class ManageDashboards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderArray: [],
    };
  }

  componentDidMount() {
    // RestService.get(config.DASHBOARD_LIST_API).then((response) => {
    //   console.log(response);
    //   const retData = this.manipulateData(response);
    //   const folderArray = this.convertObjectToArray(retData);
    //   this.setState({
    //     folderArray,
    //   });
    // });
    const retData = this.manipulateData(data);
    const folderArray = this.convertObjectToArray(retData);
    this.setState({
      folderArray,
    });
  }

  convertObjectToArray(object) {
    const keys = Object.keys(object);
    const retData = [];
    for (let i = 0; i < keys.length; i++) {
      retData.push(object[keys[i]]);
    }
    return retData;
  }

  manipulateData(result) {
    const retData = {};
    for (let i = 0; i < result.length; i++) {
      const dash = result[i];
      if (dash.type === "dash-db") {
        retData[dash.folderId] = retData[dash.folderId] || {
          subData: [],
          openSubFolder: false,
          checkValueStatus: false,
          id: dash.folderId,
        };
        retData[dash.folderId].title = dash.folderTitle;
        const tags = dash.tags.map((tag) => {
          const color = getTagColorsFromName(tag);
          return {
            name: tag,
            color,
          };
        });
        retData[dash.folderId].subData.push({
          ...dash,
          title: dash.title,
          checkValue: false,
          tags,
        });
      }
    }
    return retData;
  }

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

  openCloseManageDashboardFolder = () => {
    const retData = [];
    const { folderArray } = this.state;
    const length = folderArray.length;
    for (let i = 0; i < length; i++) {
      const folder = folderArray[i];
      const subFolders = folder.subData;
      const subFolderJSX = [];
      for (let j = 0; j < subFolders.length; j++) {
        const tags = subFolders[j].tags;
        const subAttributeFolder = [];
        if (subFolders[j].tags) {
          for (let k = 0; k < tags.length; k++) {
            const tag = tags[k];
            subAttributeFolder.push(
              <div className="tag" style={tag.color}>
                {tag.name}
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
              <span>{subFolder.title}</span>
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

  render() {
    return (
      <div>
        <div className="manage-dashboard-search">
          <div className="search-top-header">
            <div className="header-left m-b-1">
              <div className="search-box">
                <form>
                  <div className="search-control-group">
                    <input
                      type="text"
                      className="input-group-text"
                      placeholder="Search dashboards by name"
                    />
                    <button>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="search-buttons float-right header-right m-b-1">
              <a className="blue-button">New Dashboard</a>
              <a className="blue-button">New Folder</a>
              <a className="blue-button m-r-0">Import</a>
            </div>
          </div>
        </div>
        <div className="manage-dashboard-fliter-sort">
          <div className="fliter-sort-left ">
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
          <div className="filter-starred  fliter-sort-right">
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
        <div className="manage-dashboard-general">
          {this.openCloseManageDashboardFolder()}
        </div>
      </div>
    );
  }
}

export default ManageDashboards;

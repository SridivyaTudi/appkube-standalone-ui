import React from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import folderIcon from "./img/config-collapse-icon1.png";
import fileIcon from "./img/config-collapse-icon2.png";
import { RestService } from "../_service/RestService";
import { Collapse, UncontrolledPopover, PopoverBody } from "reactstrap";
import collapseToggleIcon from "./img/config-collapse-icon1.png";
import ConfirmDialog from "../../components/ConfirmDialog";
import AlertMessage from "../../components/AlertMessage";
import TopMenu from "./../catalog/topMenu";
import Rbac from "../../components/Rbac";
import UnimplementedFeaturePopup from "../../components/UnimplementedFeaturePopup";
import ViewDashboardJsonPopup from "./viewDashboardJsonPopup";

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiCalled: false,
      libData: [],
      activeTabs: [0],
      dashboardList: [],
      isConfirmDialogOpen: false,
      confirmTitleMessage: null,
      message: null,
      objectType: null,
      objectId: null,
      object: null,
      isAlertOpen: false,
    };
    this.unimplementedFeatureModalRef = React.createRef();
    this.viewDashboardJsonPopupRef = React.createRef();
  }

  onClickUnImplementedFeature = (link) => {
    this.unimplementedFeatureModalRef.current.setLink(link);
    this.unimplementedFeatureModalRef.current.toggle();
  };

  async componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({
      isApiCalled: true,
    });
    try {
      await RestService.getData(config.GET_LIBRARY_TREE, null, null).then(
        (response) => {
          this.setState({
            libData: response,
          });
        }
      );
    } catch (err) {
      console.log("Loading library failed. Error: ", err);
    }
    this.setState({
      isApiCalled: false,
    });
  }

  _displayTab = () => {
    const { activeTabs, libData } = this.state;
    const length = activeTabs.length;
    const duplicateTabs = [...activeTabs];
    const retData = [];
    let folder = libData;
    if (libData && libData.length > 0) {
      for (let i = 0; i < length; i++) {
        let tab = duplicateTabs[i];
        let lib = folder[tab];
        folder = lib.items;
        retData.push(
          <li
            className={length - 1 === i ? "active" : ""}
            onClick={() => this._onClickTab(i)}
          >
            {lib.name}
          </li>
        );
      }
    }
    return retData;
  };

  _findChild = (activeTabs, libData) => {
    if (activeTabs.length > 1 && libData.length > 0) {
      let currentLib = libData[activeTabs[0]];
      activeTabs.splice(0, 1);
      return this._findChild(activeTabs, currentLib.items);
    } else if (activeTabs.length === 1) {
      let currentLib = libData[activeTabs[0]];
      return currentLib;
    }
    return null;
  };

  _createLibararyTable = () => {
    const { activeTabs, libData } = this.state;
    const retData = [];
    const currentItem = this._findChild([...activeTabs], libData);
    if (currentItem) {
      const items = currentItem.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        retData.push(
          <tr className="">
            <td className="">
              <div
                onClick={() => this._onClickItem(i, item)}
                className="pointer-label"
              >
                <input type="checkbox" className="checkbox" />
                <span className="config-icon">
                  {item.isFolder && <img src={folderIcon} alt="" />}
                  {!item.isFolder && <img src={fileIcon} alt="" />}
                </span>
                <p>{item.name}</p>
              </div>
            </td>
            <td>{item.description}</td>
            <td>{item.createdBy}</td>
            <td>{item.lastModified}</td>
            <td>
              <div className="text-right">
                <Rbac
                  parentName={config.PARENT_NAME}
                  childName="library-index-tbl-editbtn"
                >
                  <button className="btn btn-link">
                    <i className="fa fa-edit"></i>
                  </button>
                </Rbac>
                {item.isFolder && (
                  <Rbac
                    parentName={config.PARENT_NAME}
                    childName="library-index-tbl-deletebtn"
                  >
                    <button
                      onClick={() => this.removeFolder(item)}
                      className="btn btn-link"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </Rbac>
                )}
                {!item.isFolder && (
                  <Rbac
                    parentName={config.PARENT_NAME}
                    childName="library-index-tbl-deletebtn"
                  >
                    <button
                      onClick={() => this.removeCollector(item)}
                      className="btn btn-link"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </Rbac>
                )}
                {item.type == "catalogue" && (
                  <>
                    <button
                      className="btn btn-link"
                      id={`PopoverFocus-${item.id}`}
                    >
                      <i className="fa fa-ellipsis-h"></i>
                    </button>
                    <UncontrolledPopover
                      trigger="legacy"
                      placement="bottom"
                      target={`PopoverFocus-${item.id}`}
                    >
                      <PopoverBody>
                        <Rbac
                          parentName={config.PARENT_NAME}
                          childName="allalerts-index-alerttbl-createticketbtn"
                        >
                          <Link
                            className=" "
                            to={`/dashboard/import?id=${item.id}&isFolder=false&type=${item.type}`}
                          >
                            Import All Dashborads
                          </Link>
                        </Rbac>
                      </PopoverBody>
                    </UncontrolledPopover>
                  </>
                )}
              </div>
            </td>
          </tr>
        );
      }
    } else {
      retData.push(
        <tr>
          <td colSpan={5} style={{ textAlign: "center" }}>
            Your data is loading...
          </td>
        </tr>
      );
    }
    return retData;
  };

  _onClickItem = (index, item) => {
    const { activeTabs } = this.state;
    if (item.isFolder) {
      activeTabs.push(index);
      this.setState({
        activeTabs,
        dashboardList: [],
      });
    } else if (item.dashboardList) {
      this.setState({
        dashboardList: item.dashboardList,
      });
    }
  };

  _onClickTab = (index) => {
    const { activeTabs } = this.state;
    activeTabs.splice(index + 1, activeTabs.length - 1);
    this.setState({
      activeTabs,
      dashboardList: [],
    });
  };

  renderDashboardList = () => {
    let { dashboardList } = this.state;
    const retData = [];
    if (dashboardList && dashboardList.length > 0) {
      const length = dashboardList.length;
      for (let i = 0; i < length; i++) {
        const dashboard = dashboardList[i];
        retData.push(
          <div className="config-collapse" key={`dashboard-list-${i}`}>
            <div
              className="collapse-toggle d-flex"
              onClick={() => this.openDashboard(i)}
            >
              <div className="collapse-Toggle-icon">
                <img src={collapseToggleIcon} alt="" />
              </div>
              <div className="collapse-Toggle-name">{dashboard.title}</div>
              <div className="collapse-Toggle-description">
                {dashboard.description}OK
              </div>
              <div className="collapse-Toggle-createdBy">
                {dashboard.createdBy}
              </div>
              <div className="collapse-Toggle-lastModified">
                {dashboard.lastModified}
              </div>
              <div className="float-right collapse-Toggle-buttons">
                <button
                  onClick={() => this.viewDashboradJson(dashboard)}
                  className="btn btn-link"
                >
                  <i className="fa fa-eye"></i>
                </button>
                <button className="btn btn-link">
                  <i className="fa fa-edit"></i>
                </button>
                <button
                  onClick={() => this.deleteDashboard(dashboard)}
                  className="btn btn-link"
                >
                  <i className="fa fa-trash"></i>
                </button>
                <button
                  className="btn btn-link"
                  id={`PopoverFocus-${dashboard.id}`}
                >
                  <i className="fa fa-ellipsis-h"></i>
                </button>
                <UncontrolledPopover
                  trigger="legacy"
                  placement="bottom"
                  target={`PopoverFocus-${dashboard.id}`}
                >
                  <PopoverBody>
                    <Rbac
                      parentName={config.PARENT_NAME}
                      childName="allalerts-index-alerttbl-createticketbtn"
                    >
                      <Link
                        className=" "
                        to={`/dashboard/import?id=${dashboard.id}&isFolder=false&type=${dashboard.type}`}
                      >
                        Import Dashborad
                      </Link>
                    </Rbac>
                    <Rbac
                      parentName={config.PARENT_NAME}
                      childName="allalerts-index-alerttbl-silencebtn"
                    >
                      <Link
                        className=" "
                        onClick={() =>
                          this.updateDashbordMonitorFlag(dashboard.id)
                        }
                        to="#"
                      >
                        Select For Monitring
                      </Link>
                    </Rbac>
                  </PopoverBody>
                </UncontrolledPopover>
              </div>
            </div>
            <Collapse isOpen={dashboard.open}>
              <div className="collapse-card-body">
                <p>{dashboard.description}</p>
              </div>
            </Collapse>
          </div>
        );
      }
    }
    return retData;
  };

  updateDashbordMonitorFlag = async (id) => {
    await fetch(
      config.UPDATE_DASHBOARD_MONITOR_FLAG_URL +
        "?id=" +
        id +
        "&monitorFlag=yes",
      {
        method: "put",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("response: ", response);
        if (response != null) {
          console.log("ok");
          this.setState({
            severity: config.SEVERITY_SUCCESS,
            message: config.UPDATE_DASHBOARD_MONITOR_FLAG,
            isAlertOpen: true,
          });
        } else {
          console.log("Not ok");
          this.setState({
            severity: config.SEVERITY_ERROR,
            message: config.SERVER_ERROR_MESSAGE,
            isAlertOpen: true,
          });
        }
        setTimeout(() => {
          this.setState({
            isAlertOpen: false,
          });
        }, 3000);
      });
  };

  openDashboard = (index) => {
    let { dashboardList } = this.state;
    dashboardList[index].open = !dashboardList[index].open;
    this.setState({
      dashboardList,
    });
  };

  deleteDashboard = (dashboard) => {
    console.log("Dashborad=" + dashboard.id);
    this.setState({
      confirmTitleMessage: "Delete Dashboard",
      message: "Are you sure, you want to delete the dashboard?",
      isConfirmDialogOpen: true,
      objectType: "dashboard",
      object: dashboard,
    });
  };

  viewDashboradJson = (dashboard) => {
    console.log("Dashborad=" + JSON.stringify(dashboard));
    this.viewDashboardJsonPopupRef.current.toggle(JSON.stringify(dashboard));
  };

  removeCollector = (collector) => {
    console.log("Parent id : ", collector.parentId);
    this.setState({
      confirmTitleMessage: "Remove Collector",
      message: "Are you sure, you want to remove the collector?",
      isConfirmDialogOpen: true,
      objectType: "collector",
      object: collector,
    });
  };

  removeFolder = (folder) => {
    console.log("library id : ", folder.id);
    this.setState({
      confirmTitleMessage: "Remove Folder",
      message: "Are you sure, you want to Remove Folder?",
      isConfirmDialogOpen: true,
      objectType: "folder",
      object: folder,
    });
  };

  handleCloseConfirmDialog = () => {
    this.setState({
      isConfirmDialogOpen: false,
    });
  };

  handleConfirmDelete = (objectType, object) => {
    console.log(
      "Deleting.... objectType : " + objectType + ", objectId : " + object.id
    );
    let url = null;
    if (objectType === "dashboard") {
      url = config.DELETE_DASHBOARD + `/` + object.id;
    }
    if (objectType === "collector") {
      url =
        config.REMOVE_COLLECTOR +
        `?collectorId=` +
        object.id +
        `&folderId=` +
        object.parentId;
      console.log("url=" + url);
    }
    if (objectType === "folder") {
      url = config.REMOVE_FOLDER + `/` + object.id;
      console.log("url=", url);
    }
    this.callDeleteApi(url);
    this.setState({
      isConfirmDialogOpen: false,
    });
  };

  async callDeleteApi(url) {
    await RestService.deleteObject(url)
      .then((response) => {
        console.log("Delete Response : ", response);
        this.setState({
          severity: config.SEVERITY_SUCCESS,
          message: "Data deleted successfully",
          isAlertOpen: true,
        });
      })
      .catch((error) => {
        console.log("Deletion error", error);
        this.setState({
          severity: config.SEVERITY_ERROR,
          message:
            "Data could not be deleted. Please check the service logs for details",
          isAlertOpen: true,
        });
      });
  }

  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
    });
  };

  render() {
    const state = this.state;
    return (
      <div className="perfmanager-dashboard-container">
        <ConfirmDialog
          objectType={state.objectType}
          objectId={state.object}
          handleCloseConfirmDialog={this.handleCloseConfirmDialog}
          handleConfirmDelete={this.handleConfirmDelete}
          open={state.isConfirmDialogOpen}
          titleMsg={state.confirmTitleMessage}
          msg={state.message}
        ></ConfirmDialog>
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={state.isAlertOpen}
          severity={state.severity}
          msg={state.message}
        ></AlertMessage>
        <div className="perfmanager-page-container">
          <div className="common-container">
            <TopMenu />
          </div>
          <div className="common-container library-search">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="library-heading">Library</div>
              </div>
              <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="float-right">
                  <Rbac
                    parentName={config.PARENT_NAME}
                    childName="library-index-addfolderbtn"
                  >
                    <a
                      className="blue-button m-r-5 add-folder"
                      onClick={() => this.onClickUnImplementedFeature("")}
                    >
                      Add Folder
                    </a>
                  </Rbac>
                  <div className="form-group search-control-group">
                    <form>
                      <input
                        type="text"
                        className="input-group-text"
                        placeholder="Search"
                      />
                      <button>
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 p-b-0 p-t-0">
            <div className="library-tabs">
              <ul>{this._displayTab()}</ul>
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="tab-container">
              <div className="library-details">
                <div className="container-inner">
                  <table className="alert-data-table">
                    <tbody>
                      <tr className="alert-data-table-header">
                        <th>
                          <div className="pointer-label">
                            <input type="checkbox" className="checkbox" />
                            Name
                          </div>
                        </th>
                        <th>Description</th>
                        <th>Created By</th>
                        <th>Last Modified</th>
                        <th></th>
                      </tr>
                      {this._createLibararyTable()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="library-collapse-expand catalog-collapse m-t-2">
              <div className="library-collapse-expand-inner">
                {state.dashboardList.length > 0 && this.renderDashboardList()}
              </div>
            </div>
          </div>
          <ViewDashboardJsonPopup ref={this.viewDashboardJsonPopupRef} />
          <UnimplementedFeaturePopup ref={this.unimplementedFeatureModalRef} />
        </div>
      </div>
    );
  }
}

export default Library;

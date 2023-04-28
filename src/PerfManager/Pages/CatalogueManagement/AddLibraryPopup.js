import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Collapse } from "reactstrap";
import openFolderIcon from "../../../assets/img/perfmanager/open-folder.png";
import { RestService } from "../../../Services/RestService";
import config from "../../../config";
import AlertMessage from "../../Components/AlertMessage";

class AddLibraryPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: null,
      dataSource: null,
      catalogName: null,
      catalogId: null,
      isApiCalled: false,
      modal: false,
      folderArray: [],
      checkedFolder: [],
      isAlertOpen: false,
      message: null,
      severity: null,
    };

    this.addToLibrary = this.addToLibrary.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }

  async componentWillMount() {
    this.setState({
      isApiCalled: true,
    });
    console.log("Add Lib popup");
    try {
      await RestService.getData(config.GET_FOLDER_TREE, null, null).then(
        (response) => {
          console.log("Folder Ary::", response);
          this.setState({
            folderArray: response,
          });
        }
      );
    } catch (err) {
      console.log("Loading folder tree failed. Error: ", err);
    }
    this.setState({
      isApiCalled: false,
    });
  }

  toggle = (selectedCatalogName, selectedCatalogId) => {
    this.setState({
      modal: !this.state.modal,
      catalogName: selectedCatalogName,
      catalogId: selectedCatalogId,
      checkedFolder: [],
      appName: null,
    });
  };

  closeModel = () => {
    this.setState({
      catalogName: "",
      catalogId: null,
      modal: !this.state.modal,
      checkedFolder: [],
      appName: null,
    });
  };

  onClickOpenSubFolderArr = (indexArr) => {
    const { folderArray } = this.state;
    const folder = this.findChild(folderArray, [...indexArr]);
    folder.isOpened = !folder.isOpened;
    this.setState({
      folderArray,
    });
  };

  findChild = (folderList, indexArr) => {
    const index = indexArr.splice(0, 1)[0];
    if (indexArr.length === 0) {
      return folderList[index];
    } else {
      return this.findChild(folderList[index].subData, indexArr);
    }
  };

  checkUnCheckChild = (folderList, checked) => {
    const length = folderList.length;
    for (let i = 0; i < length; i++) {
      const folder = folderList[i];
      folder.isChecked = checked;
      if (folder.isFolder) {
        this.checkUnCheckChild(folder.subData, checked);
      }
    }
  };

  unCheckParent = (folderList, indexArr) => {
    if (indexArr.length > 0) {
      let child = this.findChild(folderList, [...indexArr]);
      child.isChecked = false;
      indexArr.splice(indexArr.length - 1, 1);
      this.unCheckParent(folderList, indexArr);
    }
  };

  checkParent = (folderList, indexArr) => {
    if (indexArr.length > 0) {
      let child = this.findChild(folderList, [...indexArr]);
      if (child.isFolder) {
        const length = child.subData.length;
        let isChecked = true;
        for (let i = 0; i < length; i++) {
          if (!child.subData[i].isChecked) {
            isChecked = false;
          }
        }
        if (isChecked) {
          child.isChecked = true;
        }
      }
      indexArr.splice(indexArr.length - 1, 1);
      this.checkParent(folderList, indexArr);
    }
  };

  onClickCheckbox = (e, indexArr) => {
    const { checked } = e.target;
    let { folderArray } = this.state;
    const folder = this.findChild(folderArray, [...indexArr]);
    folder.isChecked = checked;
    if (folder.isFolder) {
      this.checkUnCheckChild(folder.subData, checked);
    }
    if (checked) {
      // this.checkParent(folderArray, [...indexArr]);
    } else {
      this.unCheckParent(folderArray, [...indexArr]);
    }
    this.setState({
      folderArray,
    });
    const checkedFolder = [];
    this.setCheckedArray(folderArray, checkedFolder);
    this.setState({
      checkedFolder,
    });
  };

  setCheckedArray = (folderArray, checkedArray) => {
    const length = folderArray.length;
    for (let i = 0; i < length; i++) {
      const folder = folderArray[i];
      if (folder.isChecked) {
        checkedArray.push(folder.id);
      }
      if (folder.isFolder) {
        this.setCheckedArray(folder.subData, checkedArray);
      }
    }
    return checkedArray;
  };

  renderTree = () => {
    const retData = [];
    const { folderArray } = this.state;
    const length = folderArray.length;
    for (let i = 0; i < length; i++) {
      const folder = folderArray[i];
      retData.push(this.renderFolder(folder, [i]));
    }
    return retData;
  };

  renderFolder = (folder, indexArr) => {
    const retData = [];
    const subFolders = folder.subData;
    const subFolderJSX = [];
    for (let j = 0; j < subFolders.length; j++) {
      const subFolder = subFolders[j];
      let subIndexArr = [];
      subIndexArr = [...indexArr, j];
      subFolderJSX.push(
        <tr>
          <td>
            {!subFolder.isFolder && (
              <React.Fragment>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={subFolder.isChecked}
                  onClick={(e) => this.onClickCheckbox(e, [...subIndexArr])}
                />
                <span>{subFolder.title}</span>
              </React.Fragment>
            )}
            {subFolder.isFolder && this.renderFolder(subFolder, subIndexArr)}
          </td>
        </tr>
      );
    }
    retData.push(
      <>
        <div className="general-heading">
          <input
            type="checkbox"
            checked={folder.isChecked}
            className="checkbox"
            onClick={(e) => this.onClickCheckbox(e, [...indexArr])}
          />
          <span onClick={() => this.onClickOpenSubFolderArr([...indexArr])}>
            <img src={openFolderIcon} alt="" />
          </span>
          <h4>{folder.title}</h4>
        </div>
        <Collapse isOpen={folder.isOpened}>
          <div className="general-logs">
            <div className="general-logs-inner">
              <table className="data-table">{subFolderJSX}</table>
            </div>
          </div>
        </Collapse>
      </>
    );
    return retData;
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  async addToLibrary() {
    const { catalogId, checkedFolder, appName, dataSource } = this.state;
    if (checkedFolder.length === 0) {
      console.log("Please select one folder");
      this.setState({
        severity: config.SEVERITY_ERROR,
        message: "Please select at least one folder for library location",
        isAlertOpen: true,
      });
      return;
    } else if (checkedFolder.length > 1) {
      console.log("Only one folder can be selected for library location");
      this.setState({
        severity: config.SEVERITY_ERROR,
        message: "Only one folder can be selected for library location",
        isAlertOpen: true,
      });
      return;
    }
    if (!appName) {
      this.setState({
        severity: config.SEVERITY_ERROR,
        message:
          "App name is mandatory. Please provide some value for app name",
        isAlertOpen: true,
      });
      return;
    }
    let obj = {
      collectorId: catalogId,
      folderIdList: checkedFolder,
      appName: appName,
      dataSource: dataSource === null ? "AWS" : dataSource,
    };
    console.log("Object being added to library : ", obj);
    await RestService.postData(config.ADD_COLLECTOR_TO_LIBRARY, obj).then(
      (response) => {
        console.log("response: ", response);
        if (response === "OK") {
          this.setState({
            severity: config.SEVERITY_SUCCESS,
            message: config.ADD_COLLECTOR_TO_LIBRARY_SUCCESS_MESSAGE,
            isAlertOpen: true,
          });
        } else {
          this.setState({
            severity: config.SEVERITY_ERROR,
            message: config.SERVER_ERROR_MESSAGE,
            isAlertOpen: true,
          });
        }
        setTimeout(() => {
          this.setState({
            isAlertOpen: false,
            modal: !this.state.modal,
          });
        }, 3000);
      }
    );
  }

  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
    });
  };

  render() {
    const state = this.state;
    return (
      <Modal
        isOpen={state.modal}
        toggle={this.closeModel}
        className="modal-container perfmanager-modal-container"
      >
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={state.isAlertOpen}
          severity={state.severity}
          msg={state.message}
        ></AlertMessage>
        <ModalHeader toggle={this.closeModel}>
          {this.state.catalogName}
        </ModalHeader>
        <ModalBody
          style={{
            height: "calc(75vh - 110px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="catalog-form-group">
            <div className="form-group">
              <label htmlFor="appName">App Name:</label>
              <input
                type="text"
                placeholder=""
                name="appName"
                id="appName"
                value={state.appName}
                onChange={this.onChange}
                maxLength={255}
                className="input-group-text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="selectDataSource">Select Data Source</label>
              <select
                className="form-control primary-select-box"
                name="dataSource"
                id="dataSource"
                value={state.dataSource}
                onChange={this.onChange}
              >
                <option key="AWS" value="AWS">
                  AWS
                </option>
                <option key="AZURE" value="AZURE">
                  AZURE
                </option>
                <option key="GCP" value="GCP">
                  GCP
                </option>
                <option key="GCP" value="GCP">
                  Synectiks
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="selectLocationInLibrary">
                Select location in Library
              </label>
              {this.renderTree()}
            </div>
            <div className="form-group text-right">
              <a className="gray-button" onClick={this.closeModel}>
                Cancel
              </a>
              <a className="blue-button m-r-0" onClick={this.addToLibrary}>
                Add to Library
              </a>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddLibraryPopup;

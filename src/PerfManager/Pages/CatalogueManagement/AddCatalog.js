import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import { config } from "../../config";
import AlertMessage from "../../Components/AlertMessage";

class AddCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogName: null,
      catalogType: null,
      catalogDescription: null,
      isApiCalled: false,
      modal: false,
      folderArray: [],
      checkedFolder: [],
      isAlertOpen: false,
      message: null,
      severity: null,
      showSubTypesFlag: false,
      selectedSubType: "",
      subTypesJson: {
        AWS: ["VPS", "VPN", "RSD"],
        AZURE: ["X", "Y", "Z"],
        GCP: ["A", "B", "C"],
        Synectiks: ["P", "Q", "R"],
      },
    };

    this.onChange = this.onChange.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }

  async componentWillMount() {
    this.setState({
      isApiCalled: true,
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  closeModel = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  addCatalog = async () => {
    const { catalogName, catalogType, selectedSubType, catalogDescription } =
      this.state;
    if (!catalogName) {
      this.setState({
        severity: config.SEVERITY_ERROR,
        message:
          "Catalog  name is mandatory. Please provide some value for catalog name",
        isAlertOpen: true,
      });
      return;
    }
    if (!catalogType) {
      this.setState({
        severity: config.SEVERITY_ERROR,
        message: "Please select catalog type",
        isAlertOpen: true,
      });
      return;
    }
    console.log(
      "Cataloge Name = " +
        catalogName +
        ", Cataloge Type = " +
        catalogType +
        ", catalog description = " +
        catalogDescription
    );

    const cd = new FormData();
    cd.append("name", catalogName);
    cd.append("type", catalogType);
    cd.append("description", catalogDescription);
    console.log("Data is adding :: ", cd);
    await fetch(
      config.ADD_CATALOG +
        "?name=" +
        catalogName +
        "&type=" +
        catalogType +
        "&subType=" +
        selectedSubType +
        "&description=" +
        catalogDescription,
      {
        method: "post",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("response: ", response);
        let refreshCatalog = this.props.refreshCatalog;
        refreshCatalog();
        if (response != null) {
          console.log("ok");
          this.setState({
            severity: config.SEVERITY_SUCCESS,
            message: config.ADD_CATALOGUE_SUCCESS_MESSAGE,
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
            modal: !this.state.modal,
          });
        }, 3000);
      });
  };
  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
    });
  };
  onChangeSelectBox = (e) => {
    this.setState({
      catalogType: e.target.value,
      showSubTypesFlag: !this.state.showSubTypesFlag,
    });
  };
  onChangeSelectSubTypeBox = (e) => {
    this.setState({
      selectedSubType: e.target.value,
    });
  };
  showSubTypes = (type) => {
    let catalogSubTypesJson = JSON.parse(
      JSON.stringify(config.CATALOG_SUB_TYPES_JSON)
    );
    let types = catalogSubTypesJson[type];
    var options = [];
    for (let i in types) {
      options.push(
        <option
          key={types[i]}
          onChange={this.onChangeSelectSubTypeBox}
          value={types[i]}
        >
          {types[i]}
        </option>
      );
    }
    return options;
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
        <ModalBody
          style={{
            height: "calc(48vh - 0px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="catalog-form-group">
            <div className="form-group">
              <label htmlFor="catalogName">Catalog Name:</label>
              <input
                type="text"
                placeholder=""
                name="catalogName"
                id="catalogName"
                value={state.catalogName}
                onChange={this.onChange}
                maxLength={255}
                className="input-group-text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="CatalogType">Catalog Type</label>
              <select
                className="form-control primary-select-box"
                name="catalogType"
                id="catalogType"
                value={state.catalogType}
                onChange={this.onChangeSelectBox}
              >
                <option value="">select catalog type</option>
                <option key="AWS" value="AWS">
                  AWS
                </option>
                <option key="AZURE" value="AZURE">
                  AZURE
                </option>
                <option key="GCP" value="GCP">
                  GCP
                </option>
                <option key="Synectiks" value="Synectiks">
                  Synectiks
                </option>
              </select>
            </div>
            {state.showSubTypesFlag && (
              <div className="form-group">
                <label htmlFor="CatalogType">Catalog Sub Type</label>
                <select
                  className="form-control primary-select-box"
                  name="catalogType"
                  id="catalogType"
                  value={state.selectedSubType}
                  onChange={this.onChangeSelectSubTypeBox}
                >
                  <option value="">select catalog sub type</option>
                  {this.showSubTypes(state.catalogType)}
                </select>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="catalogDescription">Catalog Description:</label>
              <textarea
                name="catalogDescription"
                className="input-group-text"
                id="catalogDescription"
                onChange={this.onChange}
                value={state.catalogDescription}
              ></textarea>
            </div>
            <div className="form-group p-b-0 text-right">
              <a className="gray-button" onClick={this.closeModel}>
                Cancel
              </a>
              <a className="blue-button m-r-0" onClick={this.addCatalog}>
                Add Catalog
              </a>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddCatalog;

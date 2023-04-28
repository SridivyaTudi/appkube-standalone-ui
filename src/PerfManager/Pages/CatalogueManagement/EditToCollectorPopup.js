import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import config from "../../../config";
import AlertMessage from "../../Components/AlertMessage";
// import axios from 'axios';

class EditToCollectorPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogId: null,
      catalogName: "",
      type: "",
      catalogDescription: "",
      catlogNameRequired: "",
      catalogTypeRequired: "",
      catalogDescriptionRequired: "",
      isApiCalled: false,
      modal: false,
      folderArray: [],
      checkedFolder: [],
      isAlertOpen: false,
      message: null,
      severity: null,
      val: null,
      isSubmitted: false,
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }

  async componentWillMount() {
    this.setState({
      isApiCalled: true,
      isSubmitted: true,
    });
  }

  toggle = async (selectedCagtalog) => {
    console.log("Selected  :::: ", selectedCagtalog);
    this.setState({
      modal: !this.state.modal,
      catalogName: selectedCagtalog.catalogName,
      type: selectedCagtalog.type,
      catalogDescription: selectedCagtalog.catalogDescription,
      catalogId: selectedCagtalog.id,
    });
  };

  closeModel = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleStateChange = (e) => {
    const { name, value, id } = e.target;
    let data = [];
    if (name == "name") {
      for (let i = 0; i < this.state.catalogName.length; i++) {
        if (id == i) {
          data.push({ index: i, value: value });
        } else {
          data.push(this.state.catalogName[i]);
        }
      }
      this.setState({
        catalogName: data,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  onChangeSelectBox = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
    });
  };

  onUpdate = async (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const { catalogName, type, catalogDescription, catalogId } = this.state;
    if (catalogName == null || catalogName == "") {
      this.setState({
        catlogNameRequired: "Please enter catalogName",
      });
      return;
    } else {
      this.setState({
        catlogNameRequired: null,
      });
      if (type == null || type == "") {
        this.setState({
          catalogTypeRequired: "Please select catalogType",
        });
        return;
      } else {
        this.setState({
          catlogNameRequired: null,
        });
        if (catalogDescription == null || catalogDescription == "") {
          this.setState({
            catalogDescriptionRequired: "Please enter catalogDescription",
          });
          return;
        } else {
          this.setState({
            catalogDescriptionRequired: null,
          });
        }
      }
      let data = {
        id: catalogId,
        type: type,
        name: catalogName,
        description: catalogDescription,
      };

      let cd = new FormData();
      cd.append("id", catalogId);
      cd.append("name", catalogName);
      cd.append("type", data.type);
      cd.append("description", catalogDescription);
      console.log("all data  :::: ", data);
      // axios
      //   .put(config.UPDATE_CATALOG, cd, {})
      //   .then((response) => {
      //     console.log('res :: ', response);
      //     if (response.data != null) {
      //       this.props.getCatalogs();
      //       this.setState({
      //         message: config.UPDATE_CATALOG_SUCCESS,
      //         severity: config.SEVERITY_SUCCESS,
      //         isAlertOpen: true,
      //       });
      //     } else {
      //       this.setState({
      //         severity: config.SEVERITY_ERROR,
      //         message: config.UPDATE_CATALOG_ERROR,
      //         isAlertOpen: true,
      //       });
      //     }
      //     setTimeout(() => {
      //       this.setState({
      //         isAlertOpen: false,
      //         modal: !this.state.modal,
      //       });
      //     }, 3000);
      //   })
      //   .catch((err) => console.log(err));
    }
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
        <ModalHeader toggle={this.closeModel}>Update Catalog
        <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.toggle}
          >
            <i class="fal fa-times"></i>
          </button>
        </ModalHeader>
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
                value={this.state.catalogName}
                onChange={this.handleStateChange}
                className="input-group-text"
              />
              <span style={{ color: "red" }}>
                {this.state.catlogNameRequired}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="CatalogType">Catalog Type</label>
              <select
                className="form-control primary-select-box"
                name="type"
                id="type"
                onChange={this.onChangeSelectBox}
                value={this.state.type}
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
              <span style={{ color: "red" }}>
                {this.state.catalogTypeRequired}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="catalogDescription">Catalog Description:</label>
              <textarea
                name="catalogDescription"
                className="input-group-text"
                id="catalogDescription"
                onChange={this.handleStateChange}
                value={this.state.catalogDescription}
              ></textarea>
              <span style={{ color: "red" }}>
                {this.state.catalogDescriptionRequired}
              </span>
            </div>
            <div>
              <button
                className="btn btn-secondary m-r-2"
                onClick={this.onUpdate}
              >
                Update
              </button>
              <button className="btn btn-warning" onClick={this.closeModel}>
                Cancel
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default EditToCollectorPopup;

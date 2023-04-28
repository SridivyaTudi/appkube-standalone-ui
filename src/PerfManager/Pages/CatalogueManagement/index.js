import React, { Component } from "react";
import config from "../../../config";
import { Collapse } from "reactstrap";
import categoryImage from "../../../assets/img/perfmanager/category-image1.png";
import collapseToggleIcon from "../../../assets/img/perfmanager/config-collapse-icon1.png";
import AddLibraryPopup from "./AddLibraryPopup";
import AddDashboardToCollectorPopup from "./AddDashboardToCollectorPopup";
import EditToCollectorPopup from "./EditToCollectorPopup";
import PreviewDashboard from "./PreviewDashboard";
import AddCatalog from "./AddCatalog";
import { RestService } from "../../../Services/RestService";
import Rbac from "../../Components/Rbac";

class CatalogueManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiCalled: false,
      searchKey: "",
      currentOpenIndex: "",
      currentCatalogDisplayData: [],
      catalogs: [],
      filterByCatalogTypeFlag: false,
      displayCatalogData: [],
      catalogType: "",
      selectedCatalogName: "",
      selectedCatalogDescription: "",
      selectedCatalogId: null,
    };
    this.addlibraryRef = React.createRef();
    this.addDashboardToCollectorRef = React.createRef();
    this.editToCollectorRef = React.createRef();
    this.previewdashboardRef = React.createRef();
    this.addCatalogRef = React.createRef();
  }

  async componentWillMount() {
    this.getCatalogs();
  }
  getCatalogs = async () => {
    this.setState({
      isApiCalled: true,
    });
    try {
      await RestService.getData(config.GET_ALL_COLLECTOR, null, null).then(
        (response) => {
          this.setState({
            catalogs: response,
            displayCatalogData: response,
          });
        }
      );
    } catch (err) {}
    this.setState({
      isApiCalled: false,
    });
  };
  refreshCatalog = async () => {
    this.getCatalogs();
  };

  _displayCatalogBox() {
    const catalogBox = this.state.displayCatalogData.map((val, key) => {
      console.log("data all :: ", val);
      return (
        <div
          className="category-box"
          onClick={() => this.openCatalogDetail(key, val)}
        >
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12 p-r-0">
              <div className="category-image confit-image">
                <img src={categoryImage} alt="" />
              </div>
            </div>

            <div className="col-lg-9 col-md-9 col-sm-12">
              <a
                style={{ float: "right" }}
                onClick={(e) => this.onClickaEditToCollector(e, val)}
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </a>
              <a style={{ float: "right", marginRight: "9px" }}>
                <i className="fa fa-refresh"></i>
              </a>
              <div className="category-name">{val.catalogName}</div>
              <div className="category-name">{val.type}</div>

              <div className="category-add-link">
                <a
                  onClick={(e) =>
                    this.onClickaAddDashboardToCollector(
                      e,
                      val.catalogName,
                      val.id
                    )
                  }
                >
                  Add Dashboard To Catalog
                </a>
                <a
                  onClick={(e) =>
                    this.onClickAddLibrary(e, val.catalogName, val.id)
                  }
                >
                  Add Catalog To library
                </a>
                <a onClick={this.onClickPreviewDashboard}>Preview Dashboard</a>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return catalogBox;
  }

  openCatalogDetail(key, val) {
    console.log("data get :: ", val);
    let displaycataloddescriptionData = [];

    if (val.catalog_detail != "" && val.catalog_detail) {
      for (let i = 0; i < val.catalog_detail.length; i++) {
        if (val.catalog_detail[i].open == true) {
          val.catalog_detail[i].open = false;
        }

        displaycataloddescriptionData.push(val.catalog_detail[i]);
      }
      this.setState({
        currentOpenIndex: key,
        currentCatalogDisplayData: displaycataloddescriptionData,
        selectedCatalogName: val.catalogName,
        selectedCatalogDescription: val.catalogDescription,
        selectedCatalogId: val.id,
      });
    } else {
      this.setState({
        currentOpenIndex: "",
        currentCatalogDisplayData: "",
        selectedCatalogName: "",
        selectedCatalogDescription: "",
        selectedCatalogId: null,
      });
    }
  }

  openCatalogDescription(val) {
    let opencatalog = [];

    for (let i = 0; i < this.state.currentCatalogDisplayData.length; i++) {
      if (i === val) {
        this.state.currentCatalogDisplayData[i].open =
          !this.state.currentCatalogDisplayData[i].open;
      } else {
        this.state.currentCatalogDisplayData[i].open = false;
      }
      opencatalog.push(this.state.currentCatalogDisplayData[i]);
    }

    this.setState({
      catalogDetail: opencatalog,
    });
  }

  catalogdetail() {
    let displayData = this.state.currentCatalogDisplayData;

    const catalog = displayData.map((val, key) => {
      return (
        <div className="config-collapse" key={key}>
          <p>Hello</p>
          <div
            className="collapse-toggle "
            onClick={() => this.openCatalogDescription(key)}
          >
            <span>
              <img src={collapseToggleIcon} alt="" />
            </span>
            <p>{val.title}</p>
            <p>Hello</p>
          </div>
          <Collapse isOpen={val.open}>
            <div className="collapse-card-body">
              <p>{val.description}</p>
            </div>
          </Collapse>
        </div>
      );
    });
    return catalog;
  }

  keyPress = (e) => {
    const { value } = e.target;
    this.setState({
      searchKey: value,
    });
    const { catalogs } = this.state;
    var searchResult = [];
    for (let i = 0; i < catalogs.length; i++) {
      if (catalogs[i].catalogName.indexOf(value) !== -1 || value === "") {
        searchResult.push(catalogs[i]);
      }
    }
    this.setState({
      displayCatalogData: searchResult,
    });
  };

  onClickAddLibrary = (e, selectedCatalogName, selectedCatalogId) => {
    this.addlibraryRef.current.toggle(selectedCatalogName, selectedCatalogId);
  };

  onClickaAddDashboardToCollector = (
    e,
    selectedCatalogName,
    selectedCatalogId
  ) => {
    this.addDashboardToCollectorRef.current.toggle(
      selectedCatalogName,
      selectedCatalogId
    );
  };

  onClickaEditToCollector = (e, selectedCagtalog) => {
    this.editToCollectorRef.current.toggle(selectedCagtalog);
  };

  onClickPreviewDashboard = (e) => {
    this.previewdashboardRef.current.toggle();
  };

  onClickCreateCatalog = () => {
    this.previewdashboardRef.current.toggle();
  };

  onClickFilterByCatalogType = (e) => {
    const { catalogs } = this.state;
    const catalogType = e.target.value;
    console.log("Selected Catalog type :: ", catalogType);
    this.setState({
      catalogType: catalogType,
    });

    if (!(catalogType == "") && !(catalogType == "ALL")) {
      console.log("before filter :: ", catalogs);
      let displayCatalogData = catalogs.filter((d) => d.type === catalogType);
      console.log("after filter :: ", displayCatalogData);
      console.log("I am in");
      this.setState({
        displayCatalogData: displayCatalogData,
      });
    } else if (catalogType == "ALL") {
      this.setState({
        displayCatalogData: catalogs,
      });
    }
  };

  render() {
    const state = this.state;
    return (
      <div className="perfmanager-dashboard-container">
        <div className="perfmanager-page-container">
          <div className="common-container">{/* <TopMenu /> */}</div>
          <div className="common-container collection-search">
            <div className="catalog-app-text">
              <h3><strong>Catalogue</strong></h3>
              <p>A catalogue is collection of dashboards</p>
            </div>
          </div>
          <div className="common-container">
            <div className="search-top-header">
              <div className="header-left">
                <Rbac
                  parentName={config.PARENT_NAME}
                  childName="commancomponent-createbuttoncomponent-createbtn"
                >
                  <a
                    style={{ float: "left" }}
                    onClick={this.onClickCreateCatalog}
                    className="blue-button min-width-inherit width-auto create-btn"
                  >
                    Add Catalogue
                  </a>
                </Rbac>
              </div>
              <div className=" header-right">
                <div className="script-select m-r-1">
                  <select
                    className="form-control"
                    name="catalogType"
                    value={state.catalogType}
                    onChange={this.onClickFilterByCatalogType}
                  >
                    <option value="ALL">ALL</option>
                    <option value="AWS">AWS</option>
                    <option value="AZURE">AZURE</option>
                    <option value="GCP">GCP</option>
                    <option value="Synectiks">Synectiks</option>
                  </select>
                </div>
                <div className="search-box">
                  <form>
                    <div className="form-group search-control-group m-b-0">
                      <input
                        type="text"
                        onChange={this.keyPress}
                        className="input-group-text"
                        value={this.state.searchKey}
                        placeholder="Search"
                      />
                      <button className="btn btn-search">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="row">
              <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12">
                <div className="categories-boxes">
                  {this._displayCatalogBox()}
                </div>
              </div>
              <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 p-l-0">
                {this.state.currentOpenIndex !== "" && (
                  <div className="right-config-box">
                    <div className="config-heading">
                      <h5>{this.state.selectedCatalogName}</h5>

                      <div className="category-add-link float-right">
                        <a
                          onClick={(e) =>
                            this.onClickAddLibrary(
                              e,
                              this.state.selectedCatalogName,
                              this.state.selectedCatalogId
                            )
                          }
                        >
                          Add Catalog To library
                        </a>
                      </div>
                    </div>
                    <div className="publishing-text">
                      <p>{this.state.selectedCatalogDescription}</p>
                    </div>
                    <div className="catalog-collapse">
                      <p>hello</p>
                      {this.catalogdetail()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <AddLibraryPopup ref={this.addlibraryRef} />
        <PreviewDashboard ref={this.previewdashboardRef} />
        <AddDashboardToCollectorPopup ref={this.addDashboardToCollectorRef} />
        <EditToCollectorPopup
          getCatalogs={this.getCatalogs}
          ref={this.editToCollectorRef}
        />
        <AddCatalog
          refreshCatalog={this.refreshCatalog}
          displayCatalogData={state.displayCatalogData}
          ref={this.addCatalogRef}
        />
      </div>
    );
  }
}

export default CatalogueManagement;

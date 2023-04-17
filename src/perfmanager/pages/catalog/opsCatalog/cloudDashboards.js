import React from "react";
import previewDashboardIcon from "../img/preview-dashboard-icon.png";
import libraryIcon from "../img/library-icon.png";
import PreviewDashboardPopup from "./PreviewDashboardPopup";
import Filter from "./../filter";

class CloudDashboards extends React.Component {
  backupUrl =
    "https://image.shutterstock.com/image-vector/set-colourful-business-charts-diagram-260nw-1388414240.jpg";
  constructor(props) {
    super(props);
    this.state = {
      dashboards: this.props.data || [],
      view: "grid",
      filterData: [
        {
          name: "Cloud",
          key: "associatedCloud",
          filter: [],
        },
        {
          name: "DataType",
          key: "associatedDataType",
          filter: [],
        },
        {
          name: "SLAType",
          key: "associatedSLAType",
          filter: [],
        },
        {
          name: "Element",
          key: "associatedCloudElementType",
          filter: [],
        },
        {
          name: "DataSource Type",
          key: "associatedDataSourceType",
          filter: [],
        },
      ],
      selectedFilter: {},
    };
    this.previewDashboardPopupRef = React.createRef();
  }

  componentDidMount() {
    this.createFilterJson();
  }

  createFilterJson = () => {
    let { dashboards, filterData } = this.state;
    const filterKeys = [
      "associatedDataSourceType",
      "associatedCloudElementType",
      "associatedCloud",
      "associatedDataType",
      "associatedSLAType",
    ];
    const filteredData = {};
    for (let i = 0; i < dashboards.length; i++) {
      let dashboard = dashboards[i];
      for (let j = 0; j < filterKeys.length; j++) {
        const filter = filterKeys[j];
        filteredData[filter] = filteredData[filter] || [];
        if (filteredData[filter].indexOf(dashboard[filter].trim()) === -1) {
          filteredData[filter].push(dashboard[filter].trim());
        }
      }
    }
    if (
      filterKeys &&
      filterData &&
      filterData.length > 0 &&
      filterKeys.length > 0
    ) {
      for (let i = 0; i < filterData.length; i++) {
        for (let k = 0; k < filterKeys.length; k++) {
          const filter = filterKeys[k];
          for (let j = 0; j < filteredData[filter].length; j++) {
            let filters = filteredData[filter][j];
            if (filterData[i].key == filter.trim() && filters) {
              filterData[i].filter.push({ value: filters, label: filters });
            }
          }
        }
      }
    }
    this.setState({
      filterData,
    });
  };

  onClickPreviewDashboard = (images) => {
    if (images && images.length > 0) {
      this.previewDashboardPopupRef.current.setSliderIndex(0);
      this.previewDashboardPopupRef.current.setImages(images);
      this.previewDashboardPopupRef.current.setLink("");
      this.previewDashboardPopupRef.current.toggle();
    } else {
      alert("No preview available");
    }
  };

  renderDashboardsView = (dashboards) => {
    const { view } = this.state;
    let retData = [];
    if (dashboards && dashboards.length > 0) {
      retData = [];
      for (let i = 0; i < dashboards.length; i++) {
        const {
          id,
          name,
          description,
          images,
          associatedDataSourceType,
          associatedDataType,
          associatedSLAType,
          associatedCloud,
          associatedCloudElementType,
        } = dashboards[i];
        if (
          this.hideDashboard(
            associatedDataSourceType,
            associatedDataType,
            associatedSLAType,
            associatedCloud,
            associatedCloudElementType
          )
        ) {
          retData.push(
            <>
              <div
                className={
                  view === "list" ? `blog-list-item box` : `box blog-grid-item`
                }
                key={id}
              >
                {view === "list" ? (
                  <>
                    <div className="module-card-content">
                      <div className="row">
                        <div className="col-md-1 col-sm-12 p-r-0">
                          <img
                            height="100px"
                            width="100px"
                            src={
                              images && images.length > 0
                                ? images[0]
                                : this.backupUrl
                            }
                            alt={name}
                          />
                        </div>
                        <div className="col-md-11 col-sm-12">
                          <h3 className="title is-block">{name}</h3>
                          <p className="subtitle is-block">{description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="module-card-footer">
                      <div className="module-card-footer-details">
                        <a>
                          <img src={libraryIcon} alt="" />
                          {`Add Catalog To library`}
                        </a>
                      </div>
                      <div className="module-card-footer-provider">
                        <a onClick={() => this.onClickPreviewDashboard(images)}>
                          <img src={previewDashboardIcon} alt="" />
                          {`Preview Dashboard`}
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="module-card-content">
                      <div className="image">
                        <img
                          src={
                            images && images.length > 0
                              ? images[0]
                              : this.backupUrl
                          }
                          alt={name}
                        />
                      </div>
                      <h3 className="title is-block">{name}</h3>
                      <p className="subtitle is-block">{description}</p>
                      <div className="library-icon m-b-1">
                        <a>{`Add Catalog To library`}</a>
                      </div>
                      <div className="preview-dashboard-icon m-b-1">
                        <a onClick={() => this.onClickPreviewDashboard(images)}>
                          {`Preview Dashboard`}
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          );
        }
      }
      if (retData.length === 0) {
        retData.push(<div>No dashboard found for applied filter</div>);
      }
    } else {
      retData = [];
      retData.push(<div>No Data Found</div>);
    }
    return retData;
  };

  hideDashboard = (
    associatedDataSourceType,
    associatedDataType,
    associatedSLAType,
    associatedCloud,
    associatedCloudElementType
  ) => {
    const { selectedFilter } = this.state;
    const isAssociatedDatasourceType =
      !selectedFilter["associatedDataSourceType"] ||
      (selectedFilter["associatedDataSourceType"] &&
        selectedFilter["associatedDataSourceType"].indexOf(
          associatedDataSourceType
        ) !== -1);
    const isAssociatedDataType =
      !selectedFilter["associatedDataType"] ||
      (selectedFilter["associatedDataType"] &&
        selectedFilter["associatedDataType"].indexOf(associatedDataType) !==
          -1);
    const isAssociatedSLAType =
      !selectedFilter["associatedSLAType"] ||
      (selectedFilter["associatedSLAType"] &&
        selectedFilter["associatedSLAType"].indexOf(associatedSLAType) !== -1);
    const isCloud =
      !selectedFilter["associatedCloud"] ||
      (selectedFilter["associatedCloud"] &&
        selectedFilter["associatedCloud"].indexOf(associatedCloud) !== -1);
    const isElement =
      !selectedFilter["associatedCloudElementType"] ||
      (selectedFilter["associatedCloudElementType"] &&
        selectedFilter["associatedCloudElementType"].indexOf(
          associatedCloudElementType
        ) !== -1);
    return (
      isAssociatedDatasourceType &&
      isAssociatedDataType &&
      isAssociatedSLAType &&
      isCloud &&
      isElement
    );
  };

  filterValues = (e) => {
    const { value } = e.target;
    let duplicatdashboards = JSON.parse(JSON.stringify(this.props.data)) || [];
    let filtedValue = [];
    if (value) {
      for (let i = 0; i < duplicatdashboards.length; i++) {
        if (
          duplicatdashboards[i].name
            .toLowerCase()
            .indexOf(value.toLowerCase()) !== -1
        ) {
          filtedValue.push(duplicatdashboards[i]);
        }
      }
      this.setState({ dashboards: filtedValue });
    } else {
      if (this.props.data && this.props.data.length > 0) {
        this.setState({ dashboards: this.props.data });
      }
    }
  };

  dashboardsView = (type) => {
    this.setState({ view: type });
  };

  onChangeFilter = (filters) => {
    this.setState({
      selectedFilter: filters,
    });
  };

  formFields = () => {
    const { view, dashboards } = this.state;
    return (
      <div className="catalogue-right-container">
        <div className="templated-search">
          <div className="row d-flex align-items-center">
            <div className="col-lx-10 col-lg-9 col-md-12 col-sm-12 col-xs-12">
              <div className="search-box">
                <form>
                  <div className="form-group search-control-group m-b-0">
                    <input
                      type="text"
                      onChange={(e) => this.filterValues(e)}
                      placeholder="Search Template here"
                      className="input-group-text"
                    />
                    <button className="search-button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lx-2 col-lg-3 col-md-12 col-sm-12 col-xs-12">
              <div className="btnContainer">
                <button
                  className={
                    view == "grid" ? "btn btn-grid btn-active" : "btn btn-grid"
                  }
                  onClick={() => this.dashboardsView("grid")}
                >
                  <i className="fa fa-th-large"></i>
                </button>
                <button
                  className={
                    view == "list" ? "btn btn-list btn-active" : "btn btn-list"
                  }
                  onClick={() => this.dashboardsView("list")}
                >
                  <i className="fa fa-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            view === "grid" ? "catalogue-boxes grid" : "catalogue-boxes list"
          }
        >
          {this.renderDashboardsView(dashboards)}
        </div>
      </div>
    );
  };

  render() {
    const { filterData } = this.state;
    return (
      <div className="catalogue-inner-tabs-container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12 col-r-p">
            <Filter
              filterJsonData={filterData}
              onChangeFilter={this.onChangeFilter}
            />
          </div>
          <div className="col-lg-9 col-md-8 col-sm-12 col-l-p">
            {this.formFields()}
          </div>
        </div>
        <PreviewDashboardPopup
          ref={this.previewDashboardPopupRef}
          images={[]}
        />
      </div>
    );
  }
}

export default CloudDashboards;

import React from "react";
import previewDashboardIcon from "../img/preview-dashboard-icon.png";
import libraryIcon from "../img/library-icon.png";
import PreviewDashboardPopup from "./PreviewDashboardPopup";
import Filter from "./../Filter";

class DataSources extends React.Component {
  backupUrl =
    "https://image.shutterstock.com/image-vector/set-colourful-business-charts-diagram-260nw-1388414240.jpg";
  constructor(props) {
    super(props);
    this.state = {
      dashboards: this.props.data || [],
      view: "grid",
      filterData: [
        {
          name: "Application Location",
          key: "associatedApplicationLocation",
          filter: [],
        },
        {
          name: "Cloud",
          key: "associatedCloud",
          filter: [],
        },
        {
          name: "Creds",
          key: "associatedCreds",
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
      "associatedApplicationLocation",
      "associatedCloud",
      "associatedCreds",
    ];
    const filteredData = {};
    for (let i = 0; i < dashboards.length; i++) {
      let dashboard = dashboards[i];
      for (let j = 0; j < filterKeys.length; j++) {
        const filter = filterKeys[j];
        filteredData[filter] = filteredData[filter] || [];
        if (filteredData[filter].indexOf(dashboard[filter]) === -1) {
          filteredData[filter].push(dashboard[filter]);
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
            if (filterData[i].key == filter && filters) {
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

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({
        dashboards: this.props.data,
      });
    }
  }

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

  renderDashboardsList = (dashboards) => {
    let retData = [];
    if (dashboards && dashboards.length > 0) {
      retData = [];
      for (let i = 0; i < dashboards.length; i++) {
        const { id, name, description, imgUrl } = dashboards[i];
        retData.push(
          <>
            <div className={`blog-list-item box`} key={id}>
              <div className="module-card-content">
                <div className="row">
                  <div className="col-md-1 col-sm-12 p-r-0">
                    <img height="100px" width="100px" src={imgUrl} alt={name} />
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
                  <a onClick={this.onClickPreviewDashboard}>
                    <img src={previewDashboardIcon} alt="" />
                    {`Preview Dashboard`}
                  </a>
                </div>
              </div>
            </div>
          </>
        );
      }
    } else {
      retData = [];
      retData.push(<div>No Data Found</div>);
    }
    return retData;
  };

  renderDashboardsView = (dashboards) => {
    const { view } = this.state;
    let retData = [];
    if (dashboards && dashboards.length > 0) {
      retData = [];
      for (let i = 0; i < dashboards.length; i++) {
        const {
          name,
          description,
          imgUrl,
          associatedApplicationLocation,
          associatedCloud,
          associatedCreds,
          id,
          images,
        } = dashboards[i];
        if (
          this.hideDashboard(
            associatedApplicationLocation,
            associatedCloud,
            associatedCreds
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
                            src={imgUrl}
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
                        <a onClick={this.onClickPreviewDashboard}>
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
                      <div className="library-icon">
                        <a>{`Add Catalog To library`}</a>
                      </div>
                      <div className="preview-dashboard-icon">
                        <a onClick={this.onClickPreviewDashboard}>
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

  dashboardsView = (type) => {
    this.setState({ view: type });
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

  onChangeFilter = (filters) => {
    this.setState({
      selectedFilter: filters,
    });
  };

  hideDashboard = (
    associatedApplicationLocation,
    associatedCloud,
    associatedCreds
  ) => {
    const { selectedFilter } = this.state;
    const isassociatedApplicationLocation =
      !selectedFilter["associatedApplicationLocation"] ||
      (selectedFilter["associatedApplicationLocation"] &&
        selectedFilter["associatedApplicationLocation"].indexOf(
          associatedApplicationLocation
        ) !== -1);
    const isassociatedCloud =
      !selectedFilter["associatedCloud"] ||
      (selectedFilter["associatedCloud"] &&
        selectedFilter["associatedCloud"].indexOf(associatedCloud) !== -1);
    const isassociatedCreds =
      !selectedFilter["associatedCreds"] ||
      (selectedFilter["associatedCreds"] &&
        selectedFilter["associatedCreds"].indexOf(associatedCreds) !== -1);
    return (
      isassociatedApplicationLocation && isassociatedCloud && isassociatedCreds
    );
  };

  formFields = () => {
    const { view, dashboards } = this.state;
    return (
      <div className="catalogue-right-container">
        <div className="templated-search">
          <div className="row">
            <div className="col-lx-10 col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="search-box">
                <form>
                  <div className="form-group search-control-group m-b-0">
                    <input
                      type="text"
                      className="input-group-text"
                      onChange={(e) => this.filterValues(e)}
                      placeholder="Search Template here"
                    />
                    <button className="search-button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lx-2 col-lg-4 col-md-12 col-sm-12 col-xs-12">
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
    const { images, filterData } = this.state;
    return (
      <div className="catalogue-inner-tabs-container">
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-12 col-r-p">
            <Filter
              filterJsonData={filterData}
              onChangeFilter={this.onChangeFilter}
            />
          </div>
          <div className="col-lg-9 col-md-7 col-sm-12 col-l-p">
            {this.formFields()}
          </div>
        </div>
        <PreviewDashboardPopup
          ref={this.previewDashboardPopupRef}
          images={images}
        />
      </div>
    );
  }
}

export default DataSources;

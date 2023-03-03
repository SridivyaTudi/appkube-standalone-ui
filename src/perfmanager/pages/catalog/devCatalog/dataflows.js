import React, { Component } from 'react';
import Filter from "./../filter";

class Dataflows extends Component {
  previewDashboardPopupRef;
  constructor(props) {
    super(props)
    this.state = {
      dashboards: this.props.data || [],
    }
  }
  onClickPreviewDashboard = () => {
    this.previewDashboardPopupRef.current.setLink('');
    this.previewDashboardPopupRef.current.toggle();
  };
  render() {
    const { dashboards } = this.state;
    return (
      <div className="catalogue-inner-tabs-container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-r-p">
            <Filter />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 col-l-p">
            <div className="catalogue-right-container">
              <div className="heading">
                <div className="row">
                  <div className="col-md-9 col-sm-12">
                    <h3>Catalogue</h3>
                    <p>A catalogue is collection of dashboards</p>
                  </div>
                  <div className="col-md-3 col-sm-12">
                    <button className="create-btn">Add Catalogue</button>
                  </div>
                </div>
              </div>
              <div className="catalogue-boxes">
                {/* {this.renderDashboards(dashboards)} */}
              </div>
            </div>
            {/* <div className="catalogue-right-container">
            <div>
              Select a template to start with. You can use filters or the seach box the scope.
            </div>
            <div className="templated-search">
              <div className="row">
                <div className="col-sm-10">
                  <div className="search-box">
                    <button className="search-button"><i className="fa fa-search"></i></button>
                    <input type="text" placeholder="Search Template here" className="input" />
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="btnContainer">
                    <button className="btn btn-grid btn-active"><i className="fa fa-th-large"></i></button>
                    <button className="btn btn-list"><i className="fa fa-list"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
        {/* <PreviewDashboardPopup ref={this.previewDashboardPopupRef} /> */}
      </div>
    )
  }
}

export default Dataflows;
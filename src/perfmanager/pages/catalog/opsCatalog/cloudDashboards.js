import React, { Component } from "react";
import Filter from "./../filter";

class CloudDashboards extends Component {
  
  render() {
    return (
      <div className="catalogue-inner-tabs-container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 col-r-p">
            <Filter
              // filterJsonData={filterData}
              // onChangeFilter={this.onChangeFilter}
            />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12 col-l-p">
            {/* {this.formFields()} */}
          </div>
        </div>
        {/* <PreviewDashboardPopup
          ref={this.previewDashboardPopupRef}
          images={[]}
        /> */}
      </div>
    );
  }
}

export default CloudDashboards;

import React, { Component } from "react";
import CommonFilterViewSearch from "views/app-views/AssetManager/Environments/EnvironmentList/CommonFilterViewSearch";

class Environments extends Component {
  render() {
    return (
      <div className="environmentlist-container">
        <div className="discovered-assets">
          <div className="discovered-assets-head">
            <CommonFilterViewSearch />
          </div>
        </div>
      </div>
    );
  }
}

export default Environments;

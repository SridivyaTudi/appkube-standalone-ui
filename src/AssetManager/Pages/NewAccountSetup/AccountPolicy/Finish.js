import React, { Component } from "react";
import AccountAddedImage from "../../../../assets/img/assetmanager/account-added-image.png"

class Finish extends Component {
  render() {
    return (
      <div className="d-inline-block width-100 new-account-setup-tab-contents">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-7 col-md-6 col-sm-12">
            <h3>Associate OU</h3>
            <p className="m-b-2">
              Select Organizational Unit to Associate with Cloud Account Or
              Create new
            </p>
          </div>
          <div className="col-lg-5 col-md-6 col-sm-12">
            <div className="added-image">
              <img src={AccountAddedImage} alt="added image"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Finish;

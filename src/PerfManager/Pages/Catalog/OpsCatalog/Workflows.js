import React from "react";

class Workflows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="catalogue-right-container">
        <p className="m-t-1">
          Select a template to start with. You can use filters or the seach box
          the scope.
        </p>
        <div className="templated-search ">
          <div className="row">
            <div className="col-lx-10 col-lg-9 col-md-12 col-sm-12 col-xs-12">
              <div className="search-box m-b-1">
                <div className="search-control-group">
                <input type="text" className="input-group-text"
                  placeholder="Search Template here"/>
                  <button className="search-button">
                  <i className="fa fa-search"></i>
                </button>
                </div>
              </div>
            </div>
            <div className="col-lx-2 col-lg-3 col-md-12 col-sm-12 col-xs-12">
              <div className="btnContainer m-b-1">
                <button className="btn btn-grid btn-active ">
                  <i className="fa fa-th-large"></i>
                </button>
                <button className="btn btn-list">
                  <i className="fa fa-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="templated-boxs">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="template-box">
                <div className="heading">Landing Zone</div>
                <div className="sub-text">
                  Create Landing Zone with DevSecOps best practice in AWS
                </div>
                <div className="text">
                  Description text related to creating LAmding zone on AWS will
                  be displayed here
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="template-box">
                <div className="heading">Landing Zone</div>
                <div className="sub-text">
                  Create Landing Zone with DevSecOps best practice in AWS
                </div>
                <div className="text">
                  Description text related to creating LAmding zone on AWS will
                  be displayed here
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="template-box">
                <div className="heading">Landing Zone</div>
                <div className="sub-text">
                  Create Landing Zone with DevSecOps best practice in AWS
                </div>
                <div className="text">
                  Description text related to creating LAmding zone on AWS will
                  be displayed here
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="template-box">
                <div className="heading">Landing Zone</div>
                <div className="sub-text">
                  Create Landing Zone with DevSecOps best practice in AWS
                </div>
                <div className="text">
                  Description text related to creating LAmding zone on AWS will
                  be displayed here
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="template-box">
                <div className="heading">Landing Zone</div>
                <div className="sub-text">
                  Create Landing Zone with DevSecOps best practice in AWS
                </div>
                <div className="text">
                  Description text related to creating LAmding zone on AWS will
                  be displayed here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Workflows;

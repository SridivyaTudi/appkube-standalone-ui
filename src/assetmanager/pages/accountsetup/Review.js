import React, { Component } from "react";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      accessKey: "",
      secretKey: "",
      accountId: "",
      orgId: "",
      ouId: "",
      selectedData: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedData !== prevProps.selectedData) {
      const a = this.props.selectedData;
      this.setState({
        name: a.displayName,
        accessKey: a.accessKey,
        secretKey: a.secretKey,
        accountId: a.accountId,
      });
    }
  }

  render() {
    return (
      <div className="service-content">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">Dispaly Name</div>
              </div>
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">
                  <span>{this.state.name}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">Access Key</div>
              </div>
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">
                  <span>{this.state.accessKey}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">Account Id</div>
              </div>

              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">
                  <span>{this.state.accountId}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">Secret Key</div>
              </div>
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">
                  <span>{this.state.secretKey}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">Organization</div>
              </div>
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added">Organization Unit</div>
              </div>
              <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                <div className="services-added" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;

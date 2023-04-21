import React, { Component } from 'react';

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;
    const {} = this.state;

    return (
      <div className="breadcrumbs-container">
        <div className="page-title">MONITOR | OVERVIEW</div>
        <div className="breadcrumbs">
          <a className="breadcrumbs-link">Home</a>
          <span className="separator">
            <i className="fa fa-chevron-right"></i>
          </span>
          <span className="current-page">Monitor | Alerts</span>
        </div>
      </div>
    );
  }
}

export default Breadcrumbs;

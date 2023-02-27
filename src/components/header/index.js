import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;
    const {} = this.state;

    return (
      <div className="top-nav-bar">
        <div className="logo-container">
          <div className="logo"></div>
        </div>
        <div className="search-box-container">
          <label className="gf-form--has-input-icon mr-auto">
            <input
              type="text"
              placeholder="Search resources, services, and docs"
              className="gf-form-input search-box"
            />
            <i className="gf-form-input-icon fa fa-search"></i>
          </label>
        </div>
        <div className="icon-container">
          <a href="/dashboards" className="icon" title="Dashboards">
            <i className="fa fa-th-large"></i>
          </a>
          <a href="/dashboardlist" className="icon" title="Dashboard List">
            <i className="fa fa-list"></i>
          </a>
          <a className="icon" href="/plugins">
            <i className="fa fa-cog"></i>
          </a>
          <div className="icon">
            <i className="fa fa-bell"></i>
          </div>
          <div className="icon">
            <i className="fa fa-user-circle"></i>
            <div className="profile-dropdown">
              <div className="profile-symbol">
                <div className="symbol-img">
                  <img src="public/img/user_profile.png" alt="" />
                </div>
                <div className="symbol-text">
                  <strong>admin</strong>
                  <span></span>
                </div>
              </div>
              <div className="profile-text">
                <label>Email:</label>
                <span>admin.demomonitoring@synectiks.com</span>
              </div>
              <div className="profile-text">
                <label>Role:</label>
                <span></span>
              </div>
              <ul>
                <li>
                  <a href="/profile">View my profile</a>
                </li>
                <li className="logout">
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;
    const {} = this.state;

    return (
      <div className="sidemenu">
        <div className="menu-item-container">
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className="main-menu">
              <ul>
                <li className="item" title="Overview">
                  <a className="menu-item active">
                    <div className="menu-item-image overview"></div>
                    <div className="menu-item-text">Overview</div>
                  </a>
                </li>
                <li className="item" title="Assets">
                  <a className="menu-item">
                    <div className="menu-item-image assets"></div>
                    <div className="menu-item-text">Assets</div>
                  </a>
                </li>
                <li className="item" title="App Catalogue">
                  <a className="menu-item">
                    <div className="menu-item-image app-catalogue"></div>
                    <div className="menu-item-text">App Catalogue</div>
                  </a>
                </li>
                <li className="item" title="Alerts">
                  <a className="menu-item">
                    <div className="menu-item-image alerts"></div>
                    <div className="menu-item-text">Alerts</div>
                  </a>
                </li>
                <li className="item" title="Analytics">
                  <a className="menu-item">
                    <div className="menu-item-image analytics"></div>
                    <div className="menu-item-text">Analytics</div>
                  </a>
                </li>
                <li className="item" title="Ops central">
                  <a className="menu-item">
                    <div className="menu-item-image ops-central"></div>
                    <div className="menu-item-text">Ops central</div>
                  </a>
                </li>
                <li className="item" title="Dev Central">
                  <a className="menu-item">
                    <div className="menu-item-image dev-central"></div>
                    <div className="menu-item-text">Dev Central</div>
                  </a>
                </li>
                <li className="item" title="Sec Central">
                  <a className="menu-item">
                    <div className="menu-item-image sec-central"></div>
                    <div className="menu-item-text">Sec Central</div>
                  </a>
                </li>
                <li className="item" title="Tools &amp; Diagnostics">
                  <a className="menu-item">
                    <div className="menu-item-image tools-and-diagnostics"></div>
                    <div className="menu-item-text">Tools &amp; Diagnostics</div>
                  </a>
                </li>
                <li className="item" title="Preference">
                  <a className="menu-item">
                    <div className="menu-item-image preferences"></div>
                    <div className="menu-item-text">Preference</div>
                  </a>
                </li>
                <li className="item" title="Preference">
                  <a className="menu-item">
                    <div className="menu-item-image rbac-settings"></div>
                    <div className="menu-item-text">RBAC Settings</div>
                  </a>
                </li>
                <li className="item" title="Resource">
                  <a className="menu-item">
                    <div className="menu-item-image resources"></div>
                    <div className="menu-item-text">Resource</div>
                  </a>
                </li>
              </ul>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default Sidebar;

import React, { Component } from 'react';
import Aws from '../../../../assets/img/aws.png';
import Microsoftazure from '../../../../assets/img/microsoftazure.png';
import { Link } from 'react-router-dom';

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectFilter: false,
      showServiceViewFilter: false,
      showRecentFilter: false,
    };
  }

  toggleColumnSelect = (drdName) => {
    let current = this.state[drdName];
    this.setState({
      [drdName]: !current,
    });
  };

  render() {
    const { showSelectFilter, showServiceViewFilter, showRecentFilter } = this.state;
    return (
      <div className="discovered-assets">
        <div className="discovered-assets-head">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="environment-fliter">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showSelectFilter: !showSelectFilter,
                    })
                  }
                >
                  <i class="fas fa-filter fillter-icon"></i>
                  Select and fillter
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div className={showSelectFilter === true ? 'fliter-collapse active' : 'fliter-collapse'}>
                  <div className="search-bar">
                    <input type="text" placeholder="Search...." />
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      OU
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      Status
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      No of Assets
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      Logs
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      Performance & Availability
                    </li>
                  </ul>
                </div>
                <div
                  className={showSelectFilter === true ? 'fliters-collapse-bg active' : 'fliters-collapse-bg'}
                  onClick={() =>
                    this.setState({
                      showSelectFilter: !showSelectFilter,
                    })
                  }
                />
              </div>
              <div className="environment-fliter">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showServiceViewFilter: !showServiceViewFilter,
                    })
                  }
                >
                  <i class="far fa-eye fillter-icon"></i>
                  Service View
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div
                  className={
                    showServiceViewFilter === true ? 'fliter-collapse recent-collapse active' : 'fliter-collapse'
                  }
                >
                  <ul>
                    <li>
                      <Link to={`/assetmanager/pages/accountsetup`}>
                        <span>
                          <img src={Aws} alt="AWS" />
                        </span>
                        <p>(657907747545)</p>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/assetmanager/pages/accountsetup`}>
                        <span>
                          <img src={Aws} alt="" />
                        </span>
                        <p>(655668745458)</p>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/assetmanager/pages/accountsetup`}>
                        <span>
                          <img src={Microsoftazure} alt="" />
                        </span>
                        <p>(655668745458)</p>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className={showServiceViewFilter === true ? 'fliters-collapse-bg active' : 'fliters-collapse-bg'}
                  onClick={() =>
                    this.setState({
                      showServiceViewFilter: !showServiceViewFilter,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="d-inline-block width-100 text-right">
                <div className="environment-fliter">
                  <div
                    className="fliter-toggel"
                    onClick={() =>
                      this.setState({
                        showRecentFilter: !showRecentFilter,
                      })
                    }
                  >
                    <i class="far fa-clock fillter-icon"></i>
                    Recent
                    <i className="fas fa-caret-down arrow-icon"></i>
                  </div>
                  <div
                    className={showRecentFilter === true ? 'fliter-collapse recent-collapse active' : 'fliter-collapse'}
                  >
                    <ul>
                      <li>
                        <Link to={`/assetmanager/pages/accountsetup`}>
                          <span>
                            <img src={Aws} alt="AWS" />
                          </span>
                          <p>(657907747545)</p>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/assetmanager/pages/accountsetup`}>
                          <span>
                            <img src={Aws} alt="" />
                          </span>
                          <p>(655668745458)</p>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/assetmanager/pages/accountsetup`}>
                          <span>
                            <img src={Microsoftazure} alt="" />
                          </span>
                          <p>(655668745458)</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={showRecentFilter === true ? 'fliters-collapse-bg active' : 'fliters-collapse-bg'}
                    onClick={() =>
                      this.setState({
                        showRecentFilter: !showRecentFilter,
                      })
                    }
                  />
                </div>
                <div className="search-box">
                  <form>
                    <div className="form-group search-control-group m-b-0">
                      <input type="text" className="input-group-text" placeholder="Search" />
                      <button className="search-btn">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inputs;

import React, { Component } from "react";
import AWS from "../../../../../assets/img/aws.png";
import AZURE from "../../../../../assets/img/microsoftazure.png";
import GCP from "../../../../../assets/img/google-cloud.png";
import { Link } from "react-router-dom";

class Alerts extends Component {
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

  setLocalRecentService = (account) => {
    let recentEnv = JSON.parse(localStorage.getItem("recentEnv"));
    recentEnv.map((item, index) => {
      if (item.accountId === account.accountId) {
        arrayMove(recentEnv, index, 0);
      }
    });

    function arrayMove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      localStorage.setItem("recentEnv", JSON.stringify(arr));
    }
  };

  render() {
    const { showSelectFilter, showServiceViewFilter, showRecentFilter } =
      this.state;
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
                <div
                  className={
                    showSelectFilter === true
                      ? "fliter-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <div className="search-bar">
                    <input type="text" placeholder="Search...." />
                  </div>
                  <ul>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      OU
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      Status
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      No of Assets
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      Logs
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChecked()}
                      />
                      Performance & Availability
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    showSelectFilter === true
                      ? "fliters-collapse-bg active"
                      : "fliters-collapse-bg"
                  }
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
                    showServiceViewFilter === true
                      ? "fliter-collapse recent-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <ul>
                    <li>
                      <Link to={`/assetmanager/pages/accountsetup`}>
                        <span>
                          <img src={AWS} alt="AWS" />
                        </span>
                        <p>(657907747545)</p>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/assetmanager/pages/accountsetup`}>
                        <span>
                          <img src={AWS} alt="" />
                        </span>
                        <p>(655668745458)</p>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/assetmanager/pages/accountsetup`}>
                        <span>
                          <img src={AZURE} alt="" />
                        </span>
                        <p>(655668745458)</p>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    showServiceViewFilter === true
                      ? "fliters-collapse-bg active"
                      : "fliters-collapse-bg"
                  }
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
                    className={
                      showRecentFilter === true
                        ? "fliter-collapse recent-collapse active"
                        : "fliter-collapse"
                    }
                  >
                    <ul>
                      {JSON.parse(localStorage.getItem("recentEnv"))?.map(
                        (item) => {
                          return (
                            <li>
                              <Link
                                to={`/assetmanager/pages/environments/environmentlist?accountId=${item.accountId}&cloudName=${item.accountType}`}
                                onClick={() => this.setLocalRecentService(item)}
                              >
                                <span>
                                  <img
                                    src={
                                      item.accountType === "AWS"
                                        ? AWS
                                        : item.accountType === "GCP"
                                        ? GCP
                                        : AZURE
                                    }
                                    alt={item.accountType}
                                  />
                                </span>
                                <p>({item.accountId})</p>
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                  <div
                    className={
                      showRecentFilter === true
                        ? "fliters-collapse-bg active"
                        : "fliters-collapse-bg"
                    }
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
                      <input
                        type="text"
                        className="input-group-text"
                        placeholder="Search"
                      />
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
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead>
                <tr>
                  <th>
                    <i className="m-r-1 fas fa-sort-down"></i>
                    <strong>Severity</strong>
                  </th>
                  <th>Created Time</th>
                  <th>Sources</th>
                  <th>Title</th>
                  <th>Assignee</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="6" border-spacing="0">
                    <div className="billing-section">
                      <div className="billing-details">
                        <i class="fal fa-question-circle"></i>
                        <p>
                          Alerts for this Account / Asset will be displayed here
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Alerts;

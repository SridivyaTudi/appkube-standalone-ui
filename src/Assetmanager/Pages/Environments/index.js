import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jobs from "../../../assets/img/jobs.png";
import Microsoftazure from '../../../assets/img/assetmanager/microsoftazure.png';
import GoogleCloud from '../../../assets/img/assetmanager/google-cloud.png';
import Aws from '../../../assets/img/assetmanager/aws.png';
import Kubernetes from '../../../assets/img/assetmanager/kubernetes.png';

class Environments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRecentFilter: false,
            showAddNewFilter: false,
        };

    }
  render() {
        const { showRecentFilter, showAddNewFilter, filterJsonData } = this.state;
    return (
      <div className="asset-container">
        <div className="environments-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Environments</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <Link className="asset-white-button min-width-inherit">
                    <img alt="jobs" src={Jobs} style={{ maxWidth: "20px" }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 environments-services-container">
                        <div className="row">
                            <div className='col-xl-3 col-lg-6 col-md-6 col-sm-12'>
                                <div className="services-box">
                                    <div className="heading">
                                        <span>
                                            <img src={Microsoftazure} alt="" />
                                        </span>
                                        <h3>AZURE</h3>
                                    </div>
                                    <div className="table-box">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>Accounts</td>
                                                    <td>2</td>
                                                </tr>
                                                <tr>
                                                    <td>Assets</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Alerts</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Total Billing</td>
                                                    <td>97204</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-3 col-lg-6 col-md-6 col-sm-12'>
                                <div className="services-box">
                                    <div className="heading">
                                        <span>
                                            <img src={GoogleCloud} alt="" />
                                        </span>
                                        <h3>GCP</h3>
                                    </div>
                                    <div className="table-box">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>Accounts</td>
                                                    <td>1</td>
                                                </tr>
                                                <tr>
                                                    <td>Assets</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Alerts</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Total Billing</td>
                                                    <td>30400</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-3 col-lg-6 col-md-6 col-sm-12'>
                                <div className="services-box">
                                    <div className="heading">
                                        <span>
                                            <img src={Aws} alt="" />
                                        </span>
                                        <h3>AWS</h3>
                                    </div>
                                    <div className="table-box">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td>Accounts</td>
                                                    <td>2</td>
                                                </tr>
                                                <tr>
                                                    <td>Assets</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Alerts</td>
                                                    <td>0</td>
                                                </tr>
                                                <tr>
                                                    <td>Total Billing</td>
                                                    <td>160360</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="common-container border-bottom-0 environments-table-container">
                        <div className='fliters-container'>
                            <div className='select-fliters'>
                                <div className="add-fliters">
                                    <i className="fa fa-plus"></i>
                                </div>
                                <div className="fliter-toggel" ></div>
                                <i className="fa fa-angle-down" ></i>
                            </div>
                        </div>
                        <div className="recent-fliters-container">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="fliter">
                                                <div
                                                    className="fliter-toggel"
                                                    onClick={() =>
                                                        this.setState({
                                                            showRecentFilter: !showRecentFilter
                                                        })}
                                                >
                                                    <i className="fa fa-clock-o" />
                                                    <span>Recent</span>
                                                </div>
                                                <div
                                                    className={
                                                        showRecentFilter === true ? (
                                                            'fliter-collapse active'
                                                        ) : (
                                                            'fliter-collapse'
                                                        )
                                                    }
                                                >
                                                    <ul>
                                                        <li>
                                                            <Link to={`/assetmanager/pages/accountsetup`}>
                                                                <span>
                                                                    <img src={Aws} alt="" />
                                                                </span>
                                                                <p>AWS (657907747545)</p>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/assetmanager/pages/accountsetup`}>
                                                                <span>
                                                                    <img src={Aws} alt="" />
                                                                </span>
                                                                <p>AWS (655668745458)</p>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div
                                                    className={
                                                        showRecentFilter === true ? (
                                                            'fliters-collapse-bg active'
                                                        ) : (
                                                            'fliters-collapse-bg'
                                                        )
                                                    }
                                                    onClick={() =>
                                                        this.setState({ showRecentFilter: !showRecentFilter })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="fliter">
                                                <div
                                                    className="fliter-toggel"
                                                    onClick={() =>
                                                        this.setState({
                                                            showAddNewFilter: !showAddNewFilter
                                                        })}
                                                >
                                                    <i className="fa fa-plus" />
                                                    <span>Add New Environment</span>
                                                </div>
                                                <div
                                                    className={
                                                        showAddNewFilter === true ? (
                                                            'fliter-collapse active'
                                                        ) : (
                                                            'fliter-collapse'
                                                        )
                                                    }
                                                >
                                                    <ul>
                                                        <li>
                                                            <Link to={`/assetmanager/pages/accountsetup`}>
                                                                <span>
                                                                    <img src={Aws} alt="" />
                                                                </span>
                                                                <p>AWS Environment</p>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/assetmanager/pages/accountsetup`}>
                                                                <span>
                                                                    <img src={Microsoftazure} alt="" />
                                                                </span>
                                                                <p>Azure Environment</p>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/assetmanager/pages/accountsetup`}>
                                                                <span>
                                                                    <img src={GoogleCloud} alt="" />
                                                                </span>
                                                                <p>GCP Environment</p>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/assetmanager/pages/accountsetup`}>
                                                                <span>
                                                                    <img src={Kubernetes} alt="" />
                                                                </span>
                                                                <p>Kubernetes</p>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div
                                                    className={
                                                        showAddNewFilter === true ? (
                                                            'fliters-collapse-bg active'
                                                        ) : (
                                                            'fliters-collapse-bg'
                                                        )
                                                    }
                                                    onClick={() =>
                                                        this.setState({ showAddNewFilter: !showAddNewFilter })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="fliter">
                                                <div className="fliter-toggel">
                                                    <i className="fa fa-sign-out" />
                                                    <span>Export</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <div className="form-group search-control m-b-0">
                                        <button className="btn btn-search">
                                            <i className="fa fa-search" />
                                        </button>
                                        <input type="text" className="input-group-text" placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="environments-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <span>
                                                <img src={Aws} alt="" />
                                            </span>{' '}
                                            AZURE
                                        </th>
                                        <th>Product Enclave</th>
                                        <th>Products</th>
                                        <th>App Services</th>
                                        <th>Data Services</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Link to={`/assetmanager/pages/amazonservices`}>
                                                AZURE (786262340)
                                            </Link>
                                        </td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>227</td>
                                        <td>332</td>
                                        <td>
                                            <div className="d-block text-center action-edit">
                                                <button className="asset-white-button min-width-inherit m-r-0" >
                                                    <i className="fa fa-ellipsis-h"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link to={`/assetmanager/pages/amazonservices`}>
                                                AZURE (786262340)
                                            </Link>
                                        </td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>227</td>
                                        <td>332</td>
                                        <td>
                                            <div className="d-block text-center action-edit">
                                                <button className="asset-white-button min-width-inherit m-r-0" >
                                                    <i className="fa fa-ellipsis-h"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Environments;

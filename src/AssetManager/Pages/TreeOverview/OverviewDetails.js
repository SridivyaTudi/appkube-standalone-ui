import React, { Component } from "react";
import Lakes from "../../../assets/img/assetmanager/lakes.png";
import Targets from "../../../assets/img/assetmanager/targets.png";
import Tables from "../../../assets/img/assetmanager/tables.png";
import Catalougeus from "../../../assets/img/assetmanager/catalougeus.png";
import Aws from "../../../assets/img/aws.png";
import { Link } from "react-router-dom";
class OverviewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metricQueryTypeBuilder: false,
    };
  }

  render() {
    const { metricQueryTypeBuilder } = this.state;
    return (
      <div className="tree-overview-details">
        <div className="head">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="head-left">
                <h2>Ogranization Details</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="head-right">
                <button className="new-button-outline m-b-0">Refresh</button>
                <button className="new-button m-b-0 m-r-0">Change View</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ogranization-details">
          <div className="account-list">
            <h3>Total Accounts</h3>
            <ul>
              <li>
                <span>Central Accounts</span>
                <strong>02</strong>
              </li>
              <li>
                <span>Producer Accounts</span>
                <strong>05</strong>
              </li>
              <li>
                <span>Consumer Accounts</span>
                <strong>23</strong>
              </li>
            </ul>
          </div>
          <div className="account-list-conitant">
            <div className="account-list-details">
              <div className="d-block">
                <strong>30</strong>
                <p>LOB'S</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>02</strong>
                <p>Mesh</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>80</strong>
                <p>Products</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>300</strong>
                <p>App's</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>500</strong>
                <p>Roles</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>1200</strong>
                <p>IAM Users</p>
              </div>
            </div>
          </div>
        </div>
        <div className="resources-section">
          <h2>Resources</h2>
          <div className="resources-inner-section">
            <div className="resources-total-cost">
              <label>Total Cost</label>
              <strong>$98,642</strong>
            </div>
            <div className="cost-businnesses">
              <div className="businnesses-box">
                <div className="businnesses-heading">{"Total Lakes"}</div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="icon">
                      <img src={Lakes} alt="" />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="cost">2K</div>
                  </div>
                </div>
              </div>
              <div className="businnesses-box">
                <div className="businnesses-heading">{"Total s3 Targets"}</div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="icon">
                      <img src={Targets} alt="" />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="cost">10K</div>
                  </div>
                </div>
              </div>
              <div className="businnesses-box">
                <div className="businnesses-heading">{"Total tables"}</div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="icon">
                      <img src={Tables} alt="" />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="cost">50K</div>
                  </div>
                </div>
              </div>
              <div className="businnesses-box">
                <div className="businnesses-heading">{"Shared Catalogues"}</div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="icon">
                      <img src={Catalougeus} alt="" />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="cost">40K</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mesh-overview">
          <div className="mesh-head">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm">
                <div className="mesh-left">
                  <h2>Mesh Overview</h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm">
                <div className="mesh-right">
                  <div className="builder-code-button">
                    <button
                      className={metricQueryTypeBuilder ? `btn active` : `btn`}
                      onClick={() => {
                        this.setState({
                          metricQueryTypeBuilder: !metricQueryTypeBuilder,
                        });
                      }}
                    >
                      Mesh 1
                    </button>
                    <button
                      className={!metricQueryTypeBuilder ? `btn active` : `btn`}
                      onClick={() => {
                        this.setState({
                          metricQueryTypeBuilder: !metricQueryTypeBuilder,
                        });
                      }}
                    >
                      Mesh 2
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="environment-table-section">
            <div className="table">
              <table className="overview">
                <thead className="active">
                  <tr>
                    <th>
                      <div className="environment-image">
                        <img src={Aws} alt="" />
                      </div>
                      <strong>AWS Account</strong>
                    </th>
                    <th>Line of Businnesses (LOB's)</th>
                    <th>type of Account</th>
                    <th>No of Lakes</th>
                    <th>Datalake Users</th>
                    <th>Datalake Roles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Link to={``}>AWS (657907747554)</Link>
                    </td>
                    <td>5</td>
                    <td>Central</td>
                    <td>5</td>
                    <td>500</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to={``}>AWS (657907747555)</Link>
                    </td>
                    <td>3</td>
                    <td>Producer</td>
                    <td>10</td>
                    <td>1300</td>
                    <td>42</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to={``}>AWS (657907747556)</Link>
                    </td>
                    <td>1</td>
                    <td>Consumer</td>
                    <td>8</td>
                    <td>800</td>
                    <td>32</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to={``}>AWS (657907747557)</Link>
                    </td>
                    <td>4</td>
                    <td>Producer/Consumer</td>
                    <td>2</td>
                    <td>350</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to={``}>AWS (657907747558)</Link>
                    </td>
                    <td>4</td>
                    <td>Central</td>
                    <td>2</td>
                    <td>1500</td>
                    <td>60</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to={``}>AWS (657907747560)</Link>
                    </td>
                    <td>4</td>
                    <td>Producer/Consumer</td>
                    <td>2</td>
                    <td>350</td>
                    <td>15</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to={``}>AWS (657907747561)</Link>
                    </td>
                    <td>3</td>
                    <td>Central</td>
                    <td>4</td>
                    <td>1500</td>
                    <td>60</td>
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

export default OverviewDetails;

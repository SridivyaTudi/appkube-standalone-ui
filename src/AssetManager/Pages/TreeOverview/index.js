import React, { Component } from "react";
import businnessesIocn from "../../../assets/img/assetmanager/businnesses-icon.png";
import meshIocn from "../../../assets/img/assetmanager/mesh-icon.png";
import Lakes from "../../../assets/img/assetmanager/lakes.png";
import Targets from "../../../assets/img/assetmanager/targets.png";
import Tables from "../../../assets/img/assetmanager/tables.png";
import Catalougeus from "../../../assets/img/assetmanager/catalougeus.png";
import { Link } from "react-router-dom";

class TreeOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <div className="tree-overview-container">
        <div className="tree-overview-left">
          <div className="heading">Ogranization Details</div>
          <div className="total-cost-price">
            <span>Total Cost</span>
            <strong>$98,642</strong>
          </div>
          <div className="cost-businnesses">
            <div className="businnesses-box">
              <div className="businnesses-heading">
                {"Line of Businnesses (LOBs)"}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="icon">
                    <img src={businnessesIocn} alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cost">30</div>
                </div>
              </div>
            </div>
            <div className="businnesses-box">
              <div className="businnesses-heading">{"Total Mesh"}</div>
              <div className="row">
                <div className="col-md-6">
                  <div className="icon">
                    <img src={meshIocn} alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cost">02</div>
                </div>
              </div>
            </div>
          </div>
          <div className="total-accounts">
            <div className="accounts-heading">Total Accounts</div>
            <div className="accounts-box">
              <div className="content">
                <span>Central Accounts</span>
                <strong>02</strong>
              </div>
              <div className="content">
                <span>Producer Accounts</span>
                <strong>05</strong>
              </div>
              <div className="content">
                <span>Consumer Accounts</span>
                <strong>23</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="tree-overview-center">
          <div className="tree-overview"></div>
          <div className="product-list">
            <div className="total-product">
              <div className="product-icon">
                <i className="far fa-eye"></i>
              </div>
              <div className="product-content">
                <span>Total Products</span>
                <strong>80</strong>
              </div>
            </div>
            <div className="total-product">
              <div className="product-icon">
                <i className="far fa-eye"></i>
              </div>
              <div className="product-content">
                <span>Total Apps</span>
                <strong>300</strong>
              </div>
            </div>
            <div className="total-product">
              <div className="product-icon">
                <i className="far fa-eye"></i>
              </div>
              <div className="product-content">
                <span>Roles</span>
                <strong>500</strong>
              </div>
            </div>
            <div className="total-product">
              <div className="product-icon">
                <i className="far fa-eye"></i>
              </div>
              <div className="product-content">
                <span>IAM Users</span>
                <strong>1200</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="tree-overview-right">
          <div className="head">
            <button className="new-button-outline">Refresh</button>
            <button className="new-button">
            <Link to={`/assetmanager/pages/treeoverview/overviewdetails`}>Change View</Link>
            </button>
          </div>
          <div className="heading">Resources</div>
          <div className="cost-businnesses">
            <div className="businnesses-box">
              <div className="businnesses-heading">
                {"Lakes"}
              </div>
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
              <div className="businnesses-heading">{"Total Tables"}</div>
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
    );
  }
}

export default TreeOverview;

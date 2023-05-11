import React, { Component } from 'react';
import businnessesIocn from '../../../assets/img/assetmanager/businnesses-icon.png';
import meshIocn from '../../../assets/img/assetmanager/mesh-icon.png';

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
              <div className="businnesses-heading">{'Line of Businnesses (LOBs)'}</div>
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
              <div className="businnesses-heading">{'Total Mesh'}</div>
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
                <strong>02</strong>
              </div>
              <div className="content">
                <span>Consumer Accounts</span>
                <strong>02</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="tree-overview-center">
          <div className="tree-overview"></div>
        </div>
        <div className="tree-overview-right"></div>
      </div>
    );
  }
}

export default TreeOverview;

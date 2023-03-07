import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { UnimplementedFeaturePopup } from '../../components/UnimplementedFeaturePopup';
import UnimplementedFeaturePopup from '../../components/UnimplementedFeaturePopup';

export class TopMenu extends Component {
  unimplementedFeatureModalRef;
  constructor(props) {
    super(props);
    this.state = {};
    this.unimplementedFeatureModalRef = React.createRef();
  }
  onClickUnImplementedFeature = (link) => {
    this.unimplementedFeatureModalRef.current.setLink(link);
    this.unimplementedFeatureModalRef.current.toggle();
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="float-right common-right-btn">
            <Link to={`/perfmanager/pages/managedashboard`} className="white-button m-r-0">
              <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp; Back
            </Link>
          </div>
        </div>
        <UnimplementedFeaturePopup ref={this.unimplementedFeatureModalRef} />
      </div>
    );
  }
}

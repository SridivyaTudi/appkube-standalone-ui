import React, { Component } from "react";
import SelectExisting from "../../../../assets/img/assetmanager/select-existing.png";
import CreateFileIcon from "../../../../assets/img/assetmanager/create-file-icon.png";
import SelectAccountPopup from "../../../Components/SelectAccountPopup";

class AssociateOu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectAccountModalRef = React.createRef();
  }
  onClickSelectAccount  = (link) => {
    this.selectAccountModalRef.current.setLink(link);
    this.selectAccountModalRef.current.toggle();
  };
  render() {
    return (
      <div className="d-inline-block width-100 new-account-setup-tab-contents">
        <h3>Associate OU</h3>
        <p className="m-b-2">
          Select Organizational Unit to Associate with Cloud Account Or Create
          new
        </p>
        <div className="organizational-box">
          <div className="organizational-inner-boxs">
            <div className="select-organizational" onClick={() => this.onClickSelectAccount("")}>
              <div className="organizational-image">
                <img src={SelectExisting} alt="" />
              </div>
              <div className="organizational-title">
                Select From Existing OU
              </div>
            </div>
            <div className="select-organizational">
              <div className="organizational-image">
                <img src={CreateFileIcon} alt="" />
              </div>
              <div className="organizational-title">
                Create New OU
              </div>
            </div>
          </div>
        </div>
        <SelectAccountPopup ref={this.selectAccountModalRef} />
      </div>
    );
  }
}

export default AssociateOu;

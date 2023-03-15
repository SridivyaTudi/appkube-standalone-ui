import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LaunchTcpInputPopup from './launchTcpInputPopup';
import ContentPacksPopup from './contentPacksPopup';

class TopMenu extends Component {
  launchTcpInputRef;
  contentPackPopupRef;
  constructor(props) {
    super(props);
    this.state = {};
    this.launchTcpInputRef = React.createRef();
    this.contentPackPopupRef = React.createRef();
  }
  onClickOpenTcpInputPopup = (e) => {
    this.launchTcpInputRef.current.toggle();
  };
  onClickOpenContentPackPopup = (e) => {
    this.contentPackPopupRef.current.toggle();
  };
  render() {
    return (
      <>
        <div className="common-container">
          <button className="blue-button">
            <i className="fa fa-cog"></i>&nbsp;&nbsp; Search
          </button>
          <button className="blue-button">
            <i className="fa fa-cog"></i>&nbsp;&nbsp; Streams
          </button>
          <button className="blue-button">
            <i className="fa fa-cog"></i>&nbsp;&nbsp; Alerts
          </button>
          <button className="blue-button">
            <i className="fa fa-cog"></i>&nbsp;&nbsp; Dashboard
          </button>
          <button className="blue-button" onClick={this.onClickOpenTcpInputPopup}>
            <i className="fa fa-cog"></i>&nbsp;&nbsp; Input
          </button>
          <button className="blue-button">
            <i className="fa fa-cog"></i>&nbsp;&nbsp; Pipeline
          </button>
          <Link to={`/logmanager/pages/contentspacks`} className="blue-button">
            <i className="fa fa-cog"></i>&nbsp;&nbsp; Content Packs
          </Link>
          <button className="white-button float-right m-r-0 back-btn">
            <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp; Back
          </button>
        </div>
        <LaunchTcpInputPopup ref={this.launchTcpInputRef} />
        <ContentPacksPopup ref={this.contentPackPopupRef} />
      </>
    );
  }
}
export default TopMenu;
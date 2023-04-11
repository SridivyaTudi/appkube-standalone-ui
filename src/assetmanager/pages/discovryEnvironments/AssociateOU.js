import React, { Component } from "react";
import CreateNewAssociateOuPopup from "./CreateNewAssociateOuPopup";

class AssociateOU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: [],
      selectedData: [],
      showPopup: false,
    };
    this.createNewOURef = React.createRef();
  }

  collapseExpand = (index) => {
    const { collapsed } = this.state;
    collapsed[index] = !collapsed[index];
    this.setState({
      collapsed,
    });
  };

  selectUnit = (id, unitId) => {
    this.setState({
      selectedData: [id, unitId],
    });
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  popupToggle = () => {
    this.setState({ showPopup: !this.state.showPopup });
  };

  renderOrganizations = (organizationList) => {
    const { collapsed, selectedData } = this.state;
    const retData = [];
    const units = organizationList.organizationalUnitList;
    const unitsJSX = [];
    if (units) {
      for (let j = 0; j < units.length; j++) {
        unitsJSX.push(
          <li
            onClick={() => this.selectUnit(organizationList.id, units[j].id)}
            className={`${selectedData[1] === units[j].id ? "selected" : ""}`}
            key={`unit-${j}`}
          >
            {units[j].name}
          </li>
        );
      }
    }

    retData.push(
      <li key={`org-0`}>
        <div className="text">
          <div
            onClick={() => this.collapseExpand(0)}
            className={`${collapsed[0] ? "caret-down" : "caret-right"}`}
          />
          <label
            onClick={() => this.selectUnit(organizationList.id, "")}
            className={`${
              selectedData[0] === organizationList.id ? "selected" : ""
            }`}
          >
            {organizationList.name}
          </label>
        </div>
        {collapsed[0] && <ul className="show">{unitsJSX}</ul>}
      </li>
    );
    return retData;
  };

  refresh = () => {
    this.props.getOrganizationList();
  };

  getSelection = () => {
    return this.state.selectedData;
  };

  render() {
    const { organizationList, meta } = this.props;
    const { showPopup } = this.state;
    return (
      <>
        <div className="d-inline-block width-100 account-setup-tab-contents">
          <div className="contents">
            <div className="sub-heading">
              <strong>
                Select Organizational Unit to Associate with Cloud Account Or
                Create new
              </strong>
            </div>
            <p>
              Select the OU from below or{" "}
              <strong>
                <a
                  onClick={() => {
                    this.setState({ showPopup: !this.state.showPopup });
                  }}
                >
                  create new OU
                </a>
              </strong>
            </p>
            <div onClick={this.toggleMenu} className="open-close-menu">
              <div className="caret-right"></div>
              {/* <div className="caret-down"></div> */}
              <strong>Synectiks</strong>
            </div>
            {this.state.showMenu == true && (
              <div className="menu-list">
                <ul>
                  <li>
                    <a href="#">
                      <strong>Finance</strong>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <strong>IT Networking</strong>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <strong>Monitoring</strong>
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <div className="collapse-contents">
              <ul>
                {organizationList !== null &&
                  this.renderOrganizations(organizationList)}
              </ul>
            </div>
          </div>
        </div>
        {showPopup && (
          <CreateNewAssociateOuPopup
            isOpen={showPopup}
            toggle={this.popupToggle}
          />
        )}
      </>
    );
  }
}

export default AssociateOU;

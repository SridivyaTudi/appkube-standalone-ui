import * as React from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import { images } from "../../img";
import Utils from "../../utils";

const entBaseClsPkg = "com.synectiks.cms.entities.";

class GslBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cldByGroup: [],
    };
  }

  componentDidMount() {
    let url = config.LIST_ALL_CLD_GRP;
    if (this.state.cldName) {
      url += "?cloudName=" + this.state.cldName;
    }
    console.log("url: " + url);
    Utils.getReq(url).then((response) => {
      this.setState({
        cldByGroup: response.data,
      });
      this.getCloudNames(response.data);
    });
  }

  getCloudNames = (cldByGroup) => {
    const cld = [];
    if (cldByGroup) {
      cldByGroup.map((item) => {
        if (cld.indexOf(item.cloudName) < 0) {
          cld.push(item.cloudName);
        }
      });
    }
    console.log("unique clouds", cld);
    if (cld.length > 0) {
      this.setState({
        clds: cld,
      });
    }
  };

  cloudSelection = (e) => {
    const sel = e.target.value;
    if (e.target.checked) {
      this.resetGroups(sel);
    }
  };

  resetGroups = (selCld) => {
    this.setState({
      selCloud: selCld,
    });
  };

  getGroupBody = () => {
    const { cldByGroup, selCloud } = this.state;
    if (!cldByGroup) {
      return;
    }
    let retData = [];
    cldByGroup.map((item) => {
      let grp = "";
      if (selCloud === item.cloudName) {
        if (item.groupName != grp) {
          grp = item.groupName;
          retData.push(
            <div className="items">
              <h4>{grp}</h4>
              <ul>{this.getGroupEntities(grp)}</ul>
            </div>
          );
        }
      }
    });
    return retData;
  };

  getGroupEntities = (grp) => {
    let retData = [];
    this.state.cldByGroup.map((item) => {
      if (this.state.selCloud === item.cloudName && item.groupName != grp) {
        retData.push(
          <li>
            <Link
              to={`/compliancemanager/pages/editorgslbuilder?cls=${item.entity}`}
            >
              <span>
                <img src={images.ApiGateway} alt="" />
              </span>
              <p>{item.entity.replace(entBaseClsPkg, "")}</p>
            </Link>
          </li>
        );
      }
    });
    return retData;
  };

  displayclds = () => {
    let retcldsData = [];
    this.state.clds.map((cld) => {
      retcldsData.push(
        <li>
          <input
            type="radio"
            name="clouds"
            id={cld}
            value={cld}
            onChange={this.cloudSelection}
          />
          <label htmlFor={cld}>{cld}</label>
        </li>
      );
    });
    return retcldsData;
  };

  render() {
    const { cldByGroup } = this.state;
    return (
      <div className="compliance-dashboard-container">
        <div className="compliancemanager-page-container gslbuilder-page-container">
          <div className="common-container">
            <div className="gsl-editor-logos">
              <h3>GSL Editor</h3>
              <ul>{this.state.clds != undefined && this.displayclds()}</ul>
            </div>
            <div className="gsl-editor-items">
              <h3>Select the context from the items below</h3>
              <div className="item-content">
                {cldByGroup.length > 0 && this.getGroupBody()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GslBuilder;

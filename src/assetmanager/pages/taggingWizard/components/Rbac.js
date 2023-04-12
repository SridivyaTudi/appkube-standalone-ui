import React from "react";

class Rbac extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      permissions: [],
      childName: null,
      parentName: null,
      mapPermissions: {},
      isExternalSecurityEnabled:
        localStorage.getItem("external_security_enable") === "true"
          ? true
          : false,
    };
    this.getExternaSecurityStatus = this.getExternaSecurityStatus.bind(this);
  }
  async componentDidMount() {
    await this.getExternaSecurityStatus();
  }
  async getExternaSecurityStatus() {
    if (this.state.isExternalSecurityEnabled) {
      let uInfo =
        localStorage.getItem("userInfo") === null ||
        localStorage.getItem("userInfo") === undefined ||
        localStorage.getItem("userInfo") === ""
          ? ""
          : localStorage.getItem("userInfo");
      let userInfo =
        uInfo !== "" &&
        uInfo !== null &&
        uInfo !== undefined &&
        uInfo !== "undefined"
          ? JSON.parse(uInfo)
          : "";
      this.setState({
        mapPermissions: userInfo !== "" ? userInfo.authz.mapPermissions : [],
        permissions: userInfo !== "" ? userInfo.authz.permissions : [],
        childName: this.props.childName,
        parentName: this.props.parentName,
      });
    }
  }

  include(arr, obj) {
    return arr.indexOf(obj) != -1;
  }
  checkParent(mapPermissions, str) {
    return mapPermissions.hasOwnProperty(str);
  }
  render() {
    const { childName, mapPermissions, parentName, isExternalSecurityEnabled } =
      this.state;
    if (!isExternalSecurityEnabled) {
      return this.props.children;
    }
    if (!this.checkParent(mapPermissions, parentName)) {
      return null;
    }
    if (!this.include(mapPermissions[parentName], childName)) {
      return null;
    }
    return this.props.children;
  }
}
export default Rbac;

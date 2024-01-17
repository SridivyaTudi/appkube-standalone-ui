import { Component } from "react";
import { getRbacPermissions } from "Utils";
import RBAC_MAPPING from "Utils/RbacMapping";

export class Rbac extends Component {
  constructor(props) {
    super(props);
  }

  getPermission = () => {
    let userPermission = getRbacPermissions();

    if (userPermission?.length) {
      let permission = userPermission.find(
        (rbacVal) => rbacVal.permissionName === this.props.rbacValue
      );

      if (permission) {
        let valueToKey = permission?.permissionName
          ?.toUpperCase()
          .replaceAll(" ", "_");

        return RBAC_MAPPING[valueToKey] || null;
      } else {
        return null;
      }
    }
  };
  render() {
    return this.getPermission();
  }
}
export default Rbac;

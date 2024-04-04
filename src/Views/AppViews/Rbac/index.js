import { Component } from "react";
import { getAllowedRbacPermissions, getCurrentUserRole } from "Utils";
import RBAC_MAPPING from "Utils/RbacMapping";

let currentUserRole = getCurrentUserRole();

const CheckRbacPerMission = (permissionAndRole) => {
  const getPermission = () => {
    // if (userRoles?.includes(currentUserRole?.toUpperCase())) {
    let permissions = Object.keys(permissionAndRole);
    let roles = Object.values(permissionAndRole);

    let userPermission = getAllowedRbacPermissions();

    if (userPermission?.length) {
      let permission = userPermission.find((rbacVal) => {
        return (
          permissions.includes(rbacVal.permissionName) &&
          permissionAndRole[rbacVal.permissionName].includes(
            currentUserRole?.toUpperCase()
          )
        );
      });

      if (permission) {
        let valueToKey = permission?.permissionName
          ?.toUpperCase()
          ?.replaceAll(" ", "_");

        return RBAC_MAPPING[valueToKey] !== "" ? true : false;
      }
    }
    // }

    return false;
  };

  return getPermission();
};
export default CheckRbacPerMission;

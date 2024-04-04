import { Component } from "react";
import { getAllowedRbacPermissions, getCurrentUserRole } from "Utils";
import RBAC_MAPPING from "Utils/RbacMapping";

let currentUserRole = getCurrentUserRole();

const CheckRbacPerMission = (rbacValues, userRoles) => {
  const getPermission = () => {
    if (userRoles?.includes(currentUserRole?.toUpperCase())) {
      let userPermission = getAllowedRbacPermissions();

      if (userPermission?.length) {
        let permission = userPermission.find((rbacVal) =>
          rbacValues.includes(rbacVal.permissionName)
        );

        if (permission) {
          let valueToKey = permission?.permissionName
            ?.toUpperCase()
            ?.replaceAll(" ", "_");

          return RBAC_MAPPING[valueToKey] !== "" ? true : false;
        }
      }
    }

    return false;
  };

  return getPermission();
};
export default CheckRbacPerMission;

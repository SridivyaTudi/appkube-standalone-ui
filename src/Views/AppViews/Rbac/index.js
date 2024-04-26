import { getAllowedRbacPermissions } from "Utils";

export const Rbac = (props) => {
  const { permissions } = props;

  const checkPermissions = () => {
    let allowedPermissions = getAllowedRbacPermissions();

    if (allowedPermissions?.length) {
      let permission = allowedPermissions.find((rbacVal) => {
        return permissions.includes(rbacVal.permissionName);
      });

      if (permission) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  return checkPermissions() ? <>{props.children}</> : <></>;
};
export default Rbac;

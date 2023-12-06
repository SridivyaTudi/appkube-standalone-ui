import { Component } from "react";
import PermissionTable from "Views/AppViews/Setting/Permissions/Components/PermissionTable";

class Enviroment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          permissionName: "Create Landing Zone",
        },
        {
          permissionName: "Edit Landing Zone",
        },
        {
          permissionName: "Clone Landing Zone",
        },
        {
          permissionName: "Delete Landing Zone",
        },
        {
          permissionName: "Create Product Environment",
        },
        {
          permissionName: "Edit Product Environment",
        },
        {
          permissionName: "Migrate Product Environment",
        },
        {
          permissionName: "Replicate Product Environment",
        },
        {
          permissionName: "Add Service in Product Environment",
        },
      ],
    };
  }

  render() {
    const { rows } = this.state;
    return <PermissionTable data={rows} />;
  }
}

export default Enviroment;

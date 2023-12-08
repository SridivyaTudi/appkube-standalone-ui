import { Component } from "react";
import PermissionTable from "Views/AppViews/Setting/Permissions/Components/PermissionTable";
class Devsecops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        { id: 1, permissionName: "Create Landing Zone" },
        { id: 2, permissionName: "Edit Landing Zone" },
        { id: 3, permissionName: "Clone Landing Zone" },
        { id: 4, permissionName: "Delete Landing Zone" },
        { id: 5, permissionName: "Create Product Environment" },
        { id: 6, permissionName: "Edit Product Environment" },
        { id: 7, permissionName: "Migrate Product Environment" },
        { id: 8, permissionName: "Replicate Product Environment" },
        { id: 9, permissionName: "Add Service in Product Environment" },
      ],
    };
  }

  render() {
    const { rows } = this.state;
    return <PermissionTable data={rows} />;
  }
}

export default Devsecops;

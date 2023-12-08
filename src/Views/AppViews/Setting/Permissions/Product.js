import { Component } from "react";
import PermissionTable from "Views/AppViews/Setting/Permissions/Components/PermissionTable";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        { id: 1, permissionName: "Enable SLA monitoring for Service" },
        { id: 2, permissionName: "Edit Product Environment" },
        { id: 3, permissionName: "Clone Product Environment" },
        { id: 4, permissionName: "Migrate Product Environment" },
        { id: 5, permissionName: "Create Product Environment" },
        { id: 6, permissionName: "Replicate Product Environment" },
        { id: 7, permissionName: "Add Service in Product Environment" },
        { id: 8, permissionName: "Delete Service in Product Environment" },
        { id: 9, permissionName: "Add Service in Product Environment" },
      ],
    };
  }

  render() {
    const { rows } = this.state;
    return <PermissionTable data={rows} />;
  }
}

export default Product;

import { Component } from "react";
import PermissionTable from "Views/AppViews/Setting/Permissions/Components/PermissionTable";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          permissionName: "Enable SLA monitoring for Service",
        },
        {
          permissionName: "Edit Product Environment",
        },
        {
          permissionName: "Clone Product Environment",
        },
        {
          permissionName: "Migrate Product Environment",
        },
        {
          permissionName: "Create Product Environment",
        },
        {
          permissionName: "Replicate Product Environment",
        },
        {
          permissionName: "Add Service in Product Environment",
        },
        {
          permissionName: "Delete Service in Product Environment",
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

export default Product;

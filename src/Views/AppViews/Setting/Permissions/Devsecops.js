import { Component } from "react";
import PermissionTable from "Views/AppViews/Setting/Permissions/Components/PermissionTable";
class Devsecops extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <PermissionTable data={this.props.data} />;
  }
}

export default Devsecops;

import { Component } from "react";
import PermissionTable from "Views/AppViews/Setting/Permissions/Components/PermissionTable";

class Enviroment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <PermissionTable data={this.props.data} />;
  }
}

export default Enviroment;

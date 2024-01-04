import { Box } from "@mui/material";
import { Component } from "react";
import AccordionView from "Views/AppViews/Setting/Components/AccordionView";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      selectedGroup: [],
    };
  }

  componentDidMount = () => {
    this.setRowsStateOrReturn();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.userDetailsById.status !== prevProps.userDetailsById.status
    ) {
      if (this.props.userDetailsById.status === status.SUCCESS) {
        this.setRowsStateOrReturn();
      }
    }
  };

  setRowsStateOrReturn = (isStateSet = 1) => {
    let userDetails = this.props.userDetailsById.data || {};
    if (userDetails.roles) {
      let permissions = this.manipulationUserData(userDetails.roles);
      permissions = this.getUniquePermission(permissions);
      if (isStateSet) {
        this.setState({ rows: permissions });
      } else {
        return permissions;
      }
    }
  };

  manipulationUserData = (data) => {
    if (data?.length) {
      let policies = [];
      data.forEach((element) => {
        let roles = element.roles;
        if (roles) {
          roles.forEach((role) => {
            let polices = role.policies;
            if (polices) {
              policies = policies.concat(polices);
            }
          });
        }
      });
      if (policies.length) {
        return this.setPolicyAccordingToFormat(
          JSON.parse(JSON.stringify(policies))
        );
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  // set policy state according format
  setPolicyAccordingToFormat = (policies) => {
    return policies.map((policy) => {
      let permissions = policy?.permissions;
      if (permissions?.length) {
        let categories = [];
        permissions.forEach((permission) => {
          let { permissionCategoryId, permissionCategoryName } = permission;
          let isExistCategory = categories.filter(
            (category) => category.id === permissionCategoryId
          ).length;

          if (!isExistCategory) {
            categories.push({
              id: permissionCategoryId,
              name: permissionCategoryName,
            });
          }
        });

        let permissionList = categories.map((category) => {
          let childData = [];
          permissions.forEach((permission) => {
            if (permission.permissionCategoryId === category.id) {
              let obj = {
                id: permission.permissionId,
                name: permission.permissionName,
                permissionCategoryId: category.id,
              };
              childData.push(obj);
            }
          });

          category["chlidren"] = childData;
          return category;
        });

        policy["chlidren"] = permissionList;
        return policy;
      } else {
        return policy;
      }
    });
  };

  getUniquePermission = (permissions) => {
    let uniqueArr = [];
    let policyIds = [];
    permissions.forEach((permission) => {
      if (!policyIds.includes(permission.id)) {
        uniqueArr.push(permission);
        policyIds.push(permission.id);
      }
    });
    return uniqueArr;
  };
  render() {
    let { rows } = this.state;
    return (
      <Box className="setting-table">
        {rows.length ? (
          <AccordionView data={rows} />
        ) : (
          <Box className="group-loader h-100  text-center  p-t-20 p-b-20">
            <h5 className="m-t-0 m-b-0">There are no permission available.</h5>
          </Box>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { userDetailsById } = state.settings;
  return { userDetailsById };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Permission);

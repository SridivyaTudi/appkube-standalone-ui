import React, { Component } from "react";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import DefaultIcon from "../../../../assets/img/setting/default-icon.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import { v4 } from "uuid";
import Loader from "Components/Loader";
import ConfirmationPopup from "Components/ConfirmationPopup";
import {
  deleteGroup,
  getUserPermissionData,
} from "Redux/Settings/SettingsThunk";
import { ToastMessage } from "Toast/ToastMessage";
import { getCurrentUser } from "Utils";
import { API_ERROR_MESSAGE, NO_DATA_FOUND } from "CommonData";
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(11),
  },
}));

class GroupControl extends Component {
  user = { id: "", username: "" };
  constructor(props) {
    super(props);
    this.state = {
      groupList: [],
      actionButton: null,
      groupId: 0,
      showConfirmPopup: false,
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.setGroupStateOrReturnData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.userPermissionData !== prevProps.userPermissionData) {
      this.setGroupStateOrReturnData();
    }

    if (this.props.removeGroup.status !== prevProps.removeGroup.status) {
      if (this.props.removeGroup.status === status.SUCCESS) {
        let removeGroupRes = this.props.removeGroup.data;
        if (removeGroupRes) {
          this.togglePopup();
          this.props.getUserPermissionData(this.user.username);
          ToastMessage.success("Group Removed Successfully");
        } else {
          ToastMessage.error("Group Deletion Failed!");
        }
      }
    }
  };

  handleActionButton = (index, anchorEl) => {
    this.setState({
      actionButton: index,
      anchorEl,
    });
  };

  renderDropDownData = (groupId) => {
    return [
      { label: "Delete Group", icon: "fas fa-trash-alt" },
      { label: "Duplicate Group", icon: "fas fa-copy" },
    ].map((data, index) => {
      return (
        <MenuItem
          key={index}
          onClick={() => {
            index === 0 ? (
              this.setState({
                showConfirmPopup: true,
                groupId,
              })
            ) : (
              <></>
            );
            this.handleActionButton(null, null);
          }}
        >
          <i className={data.icon} />
          {data.label}
        </MenuItem>
      );
    });
  };

  // Render Groups
  renderGroupList = () => {
    const { groupList, actionButton } = this.state;

    if (this.props.userPermissionData.status === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      let retData = [];
      if (groupList?.length > 0) {
        groupList.forEach((groupData, index) => {
          retData.push(
            <Box className="group-box" key={index}>
              <Box className="heading">
                <h4>{groupData.name}</h4>
                {groupData.default ? (
                  <Box className="d-flex roles-box">
                    <HtmlTooltip
                      className="table-tooltip-dark d-flex"
                      title={
                        <React.Fragment>
                          <span>
                            This role created by default by the system
                          </span>
                        </React.Fragment>
                      }
                    >
                      <span className="m-r-0">
                        <img src={DefaultIcon} alt="" /> Default
                      </span>
                    </HtmlTooltip>
                  </Box>
                ) : (
                  <></>
                )}

                <IconButton
                  className="action-btn"
                  aria-label="morevertIcon"
                  size="small"
                  onClick={(e) =>
                    this.handleActionButton(groupData.id, e.currentTarget)
                  }
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <Menu
                  className="common-list-menu"
                  id={`basic-menu-${groupData.id}`}
                  anchorEl={this.state.anchorEl}
                  open={actionButton === groupData.id}
                  onClose={() => this.handleActionButton(null, null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  {this.renderDropDownData(groupData.id)}
                </Menu>
              </Box>
              <Box className="group-data">
                <Box className="data">
                  <label>Active Users</label>
                  <span>{groupData.users?.length || 0}</span>
                </Box>
                <Box className="data">
                  <label>Roles Assigned</label>
                  <span className="group-name">Basic Users</span>
                </Box>
              </Box>
              <Box className="description-text">
                <label>Group Description</label>
                <p>{groupData.description}</p>
              </Box>
              <Box className="view-btn text-center">
                <Link
                  to={`${APP_PREFIX_PATH}/setting/group-details/${groupData.id}`}
                >
                  <Button className="primary-btn min-width">View Group</Button>
                </Link>
              </Box>
            </Box>
          );
        });
      } else {
        retData = (
          <Box className="group-loader h-100 width-100 text-center   p-t-20 p-b-20">
            <h5 className="m-t-0 m-b-0">
              {this.props.userPermissionData.status === status.FAILURE
                ? API_ERROR_MESSAGE
                : NO_DATA_FOUND}
            </h5>
          </Box>
        );
      }
      return retData;
    }
  };

  // Render search group and btn
  renderSearchInputAndBtn = () => {
    const { searchedKey } = this.state;
    return (
      <Box className="d-flex width-100 search-box">
        <Box className="search">
          <input
            type="text"
            className="input"
            placeholder="Search Group"
            value={searchedKey}
            onChange={this.handleSearchChange}
            autoFocus="autoFocus"
          />
          <button className="button">
            <SearchOutlinedIcon />
          </button>
        </Box>
        <Link to={`${APP_PREFIX_PATH}/setting/create-group`}>
          <Button className="primary-btn min-width">Create New Group</Button>
        </Link>
      </Box>
    );
  };

  //  Serach Groups
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { groupList } = this.state;
    let groups = this.props.userPermissionData.data?.roleGroups || [];
    if (groups?.length) {
      if (value) {
        groupList = groups.filter((group) => {
          if (group?.name.toLowerCase().includes(value.toLowerCase())) {
            return group;
          } else {
            return null;
          }
        });
      } else {
        groupList = groups;
      }
      this.setState({ groupList, searchedKey: value });
    }
  };

  // Set state or return data
  setGroupStateOrReturnData = (isStateSet = 1) => {
    let groupList = this.props.userPermissionData.data?.roleGroups || [];

    if (isStateSet) {
      this.setState({ groupList });
    } else {
      return groupList;
    }
  };

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-block text-center w-100 h-100 m-r-auto m-l-auto ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  // Delete group
  handleDeleteGroup = () => {
    let { groupId } = this.state;
    if (groupId) {
      this.props.deleteGroup(groupId);
    }
  };

  // toggle confirmation popup
  togglePopup = () => {
    let { showConfirmPopup, groupId } = this.state;
    this.setState({
      showConfirmPopup: !showConfirmPopup,
      groupId: showConfirmPopup ? 0 : groupId,
      actionButton: false,
    });
  };

  render() {
    let { showConfirmPopup } = this.state;
    let deleteGroupStatus =
      this.props.removeGroup?.status === status.IN_PROGRESS;
    return (
      <>
        {this.renderSearchInputAndBtn()}
        <Box className="group-control-boxs">{this.renderGroupList()}</Box>
        {showConfirmPopup ? (
          <ConfirmationPopup
            showModal={showConfirmPopup}
            togglePopup={this.togglePopup}
            labels={{
              btnYes: "Delete",
              header: "Do you want to delete this Group ? ",
              btnNo: "Cancel",
            }}
            icon={<i className="fas fa-trash-alt"></i>}
            handleCallBack={this.handleDeleteGroup}
            showLoader={deleteGroupStatus}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { userPermissionData, removeGroup } = state.settings;
  return {
    userPermissionData,
    removeGroup,
  };
};

const mapDispatchToProps = { deleteGroup, getUserPermissionData };

export default connect(mapStateToProps, mapDispatchToProps)(GroupControl);

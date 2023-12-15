import React, { Component } from "react";
import { Box, Button, IconButton } from "@mui/material";
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
import { deleteGroup, getGroups } from "Redux/Settings/SettingsThunk";
import { ToastMessage } from "Toast/ToastMessage";
import { getCurrentUser } from "Utils";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    color: "#ffffff",
    maxWidth: 250,

    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    padding: "4px 8px",
    fontSize: "11px",
  },
}));

class GroupControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: [],
      actionButton: null,
      groupId: 0,
      showConfirmPopup: false,
    };
  }

  componentDidMount = () => {
    this.setGroupStateOrReturnData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.allGroups.status !== prevProps.allGroups.status) {
      if (this.props.allGroups.status === status.SUCCESS) {
        this.setGroupStateOrReturnData();
      }
    }

    if (this.props.removeGroup.status !== prevProps.removeGroup.status) {
      if (this.props.removeGroup.status === status.SUCCESS) {
        let removeGroupRes = this.props.removeGroup.data;
        if (removeGroupRes) {
          this.togglePopup();
          this.props.getGroups(this.getCurrentUserInfo().username);
          ToastMessage.success("Group Removed Successfully");
        } else {
          ToastMessage.error("Group Deletion Failed!");
        }
      }
    }
  };

  handleActionButton = (index) => {
    const { actionButton } = this.state;
    if (actionButton === null) {
      this.setState({
        actionButton: index,
      });
    } else {
      this.setState({
        actionButton: null,
      });
    }
  };

  // Render Groups
  renderGroupList = () => {
    const { groupList, actionButton } = this.state;

    if (this.props.allGroups.status === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      let retData = [];
      if (groupList?.length > 0) {
        groupList.forEach((groupData, index) => {
          retData.push(
            <Box className="group-box" key={v4()}>
              <Box className="heading">
                <h4 onClick={this.props.setActiveTab}>{groupData.name}</h4>
                {groupData.default ? (
                  <Box className="d-flex roles-box">
                    <HtmlTooltip
                      className="table-tooltip d-flex"
                      title={
                        <React.Fragment>
                          <span>
                            This role created by default by the system
                          </span>
                        </React.Fragment>
                      }
                    >
                      <span>
                        <img src={DefaultIcon} alt="" />
                        Default
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
                  onClick={() => this.handleActionButton(index)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                {actionButton === index && (
                  <>
                    <Box className="action-buttons">
                      <Button
                        startIcon={
                          <DeleteOutlineOutlinedIcon className="icon" />
                        }
                        className="secondary-text-btn"
                        onClick={() => {
                          this.setState({
                            showConfirmPopup: true,
                            groupId: groupData.id,
                          });
                        }}
                      >
                        Delete Group
                      </Button>
                      <Button
                        startIcon={<ContentCopyIcon className="icon" />}
                        className="secondary-text-btn"
                      >
                        Duplicate Group
                      </Button>
                    </Box>
                    <Box
                      className="action-buttons-bg"
                      onClick={() => this.handleActionButton(index)}
                    ></Box>
                  </>
                )}
              </Box>
              <Box className="group-data" onClick={this.props.setActiveTab}>
                <Box className="data">
                  <label>Active Users</label>
                  <span>{groupData.users?.length || 0}</span>
                </Box>
                <Box className="data">
                  <label>Roles Assigned</label>
                  <span className="group-name">Basic Users</span>
                </Box>
              </Box>
              <Box
                className="description-text"
                onClick={this.props.setActiveTab}
              >
                <label>Group Description</label>
                <p>{groupData.description}</p>
              </Box>
              <Box className="view-btn text-center">
                <Link to={`${APP_PREFIX_PATH}/setting/super-admin`}>
                  <Button className="primary-btn min-width">View Group</Button>
                </Link>
              </Box>
            </Box>
          );
        });
      } else {
        retData = (
          <Box className="group-loader h-100  m-r-auto m-l-auto  p-t-20 p-b-20">
            <h5 className="m-t-0 m-b-0">There are no groups available.</h5>
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
        <Link to={`/app/setting/create-group`}>
          <Button className="primary-btn min-width">Create New Group</Button>
        </Link>
      </Box>
    );
  };

  //  Serach Groups
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { groupList } = this.state;
    let groups = this.props.allGroups.data || [];
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
    let groupList = this.props.allGroups.data || [];

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

  getCurrentUserInfo = () => {
    return getCurrentUser()
      ? getCurrentUser()?.info?.user
        ? getCurrentUser().info.user
        : { id: "", username: "" }
      : { id: "", username: "" };
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
              description: "Do you want to delete this Group ? ",
              btnNo: "Cancel",
            }}
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
  const { allGroups, removeGroup } = state.settings;
  return {
    allGroups,
    removeGroup,
  };
};

const mapDispatchToProps = { deleteGroup, getGroups };

export default connect(mapStateToProps, mapDispatchToProps)(GroupControl);

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
     fontSize: theme.typography.pxToRem(11),
    border: "1px solid #dadde9",
    padding: "4px 8px",
  },
}));

let groups = [
  {
    name: "Default Users",
    activeUsers: "45",
    rolesAssigned: "Basic Users",
    description:
      "Active The super admin is the highest level of administrative authority within a system",
  },
  {
    name: "Super Admins",
    activeUsers: "45",
    rolesAssigned: "Administrator",
    description:
      "Active The super admin is the highest level of administrative authority within a system",
  },
];
class GroupControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: groups,
      actionButton: null,
    };
  }

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
    let retData = [];
    if (groupList?.length > 0) {
      groupList.forEach((groupData, index) => {
        retData.push(
          <Box className="group-box" key={groupData.name}>
            <Box className="heading">
              <h4 onClick={this.props.setActiveTab}>{groupData.name}</h4>
              <Box className="d-flex roles-box">
                <HtmlTooltip
                  className="table-tooltip d-flex"
                  title={
                    <React.Fragment>
                      <span>This role created by default by the system</span>
                    </React.Fragment>
                  }
                >
                  <span>
                    <img src={DefaultIcon} alt="" />
                    Default
                  </span>
                </HtmlTooltip>
              </Box>
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
                      startIcon={<DeleteOutlineOutlinedIcon className="icon" />}
                      className="secondary-text-btn"
                    >
                      Delete Role
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
                <span>{groupData.activeUsers}</span>
              </Box>
              <Box className="data">
                <label>Roles Assigned</label>
                <span className="group-name">{groupData.rolesAssigned}</span>
              </Box>
            </Box>
            <Box className="description-text" onClick={this.props.setActiveTab}>
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
        <Box className="group-loader text-center w-100">
          There are no groups available.
        </Box>
      );
    }
    return retData;
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

  render() {
    return (
      <>
        {this.renderSearchInputAndBtn()}
        <Box className="group-control-boxs">{this.renderGroupList()}</Box>
      </>
    );
  }
}
export default GroupControl;

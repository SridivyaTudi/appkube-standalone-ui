import React, { Component } from "react";
import { Box, Button, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CreateGroupControlModal from "./Components/CreateGroupControlModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class GroupControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateGroupControlModal: false,
      groupControlData: [
        {
          name: "Super Admin Group",
          activeUsers: "45",
          rolesAssigned: "All",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Finance Manager",
          activeUsers: "05",
          rolesAssigned: "01",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Team Leads",
          activeUsers: "17",
          rolesAssigned: "08",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Fleet Manager",
          activeUsers: "70",
          rolesAssigned: "12",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Area Manager",
          activeUsers: "500",
          rolesAssigned: "81",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Director",
          activeUsers: "01",
          rolesAssigned: "52",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Auditor",
          activeUsers: "10",
          rolesAssigned: "All",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Quality Manager",
          activeUsers: "05",
          rolesAssigned: "17",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Account Manager",
          activeUsers: "07",
          rolesAssigned: "19",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Analytics",
          activeUsers: "45",
          rolesAssigned: "07",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
      ],
      actionButton: null,
    };
  }

  handleCreateGroupControlModal = () => {
    this.setState({
      showCreateGroupControlModal: !this.state.showCreateGroupControlModal,
    });
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

  renderGroupControlData = () => {
    const { groupControlData, actionButton } = this.state;
    let retData = [];
    if (groupControlData?.length > 0) {
      groupControlData.forEach((groupData, index) => {
        retData.push(
          <Box className="group-box" key={groupData.name}>
            <Box className="heading">
              <h4 onClick={this.props.setActiveTab}>{groupData.name}</h4>
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
                <span>{groupData.rolesAssigned}</span>
              </Box>
            </Box>
            <Box className="description-text" onClick={this.props.setActiveTab}>
              <label>Group Description</label>
              <p>{groupData.description}</p>
            </Box>
            <Box className="view-btn text-center">
              <Button className="primary-btn min-width">
                <Link to={`${APP_PREFIX_PATH}/setting/super-admin`}>View Group</Link>
              </Button>
            </Box>
          </Box>
        );
      });
    } else {
      retData = (
        <Box className="group-loader text-center w-100">
          There are no data available.
        </Box>
      );
    }
    return retData;
  };

  render() {
    const { showCreateGroupControlModal } = this.state;
    return (
      <>
        <Box className="d-flex width-100 search-box">
          <Box className="search">
            <input type="text" className="input" placeholder="Search Group" />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
          <Button
            className="primary-btn min-width"
            onClick={this.handleCreateGroupControlModal}
          >
            Create New Group
          </Button>
        </Box>
        <Box className="group-control-boxs">
          {this.renderGroupControlData()}
        </Box>
        {showCreateGroupControlModal ? (
          <CreateGroupControlModal
            showModal={showCreateGroupControlModal}
            handleCreateGroupControlModal={this.handleCreateGroupControlModal}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default GroupControl;

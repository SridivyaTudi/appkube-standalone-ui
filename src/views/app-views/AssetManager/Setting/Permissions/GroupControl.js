import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CreateGroupControlModal from "./Components/CreateGroupControlModal";

class GroupControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateGroupControlModal: false,
    };
  }

  handleCreateGroupControlModal = () => {
    this.setState({
      showCreateGroupControlModal: !this.state.showCreateGroupControlModal,
    });
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
          <Box className="group-box"></Box>
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

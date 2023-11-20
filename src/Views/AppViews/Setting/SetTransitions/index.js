import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddPermitionControlModal from "../SetPolicy/Componenits/AddPermitionControlModal";

class SetTransitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPermitionControlModal: false,
    };
  }

  handleAddPermitionControlModal = () => {
    this.setState({
      showAddPermitionControlModal: !this.state.showAddPermitionControlModal,
    });
  };
  render() {
    const {  showAddPermitionControlModal  } =
    this.state;
    return (
      <Box className="set-transitions-container">
        <Box className="list-heading">
          <h3>Set Policy</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`#`}>Admin</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Set Policy</li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Set Transitions</li>
            </ul>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }} className="search-bar">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Box className="top-search">
                <input type="text" className="form-control" placeholder="Search policy" />
                <button className="button">
                  <SearchOutlinedIcon />
                </button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="policy-section">
          {/* <h3>Set Policy and Permission</h3> */}
          <Box className="policy-permission">
            <Box className="policy-permission-head">
              <Box className="title">Policy</Box>
              <Box className="title">Permission</Box>
            </Box>
            <Box className="policy-permission-content"  onClick={this.handleAddPermitionControlModal}>
              <Box className="policy-text">
                <input type="checkbox" />
                <span>Environment</span>
              </Box>
              <Box className="edit-policy">
              <List>
                  <ListItem>
                    <Button>Delete</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Edit</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Delete</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Edit</Button>
                  </ListItem>
                </List>
                <span>
                  <i className="fa-solid fa-angle-down"></i>
                </span>
              </Box>
            </Box>
            <Box className="policy-permission-content">
              <Box className="policy-text">
                <input type="checkbox" />
                <span>Product</span>
              </Box>
              <Box className="edit-policy">
                <List>
                  <ListItem>
                    <Button>Delete</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Edit</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Delete</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Edit</Button>
                  </ListItem>
                </List>
                <span>
                  <i className="fa-solid fa-angle-down"></i>
                </span>
              </Box>
            </Box>
            <Box className="policy-permission-content">
              <Box className="policy-text">
                <input type="checkbox" />
                <span>SRE</span>
              </Box>
              <Box className="edit-policy">
              <List>
                  <ListItem>
                    <Button>Delete</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Edit</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Delete</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Edit</Button>
                  </ListItem>
                </List>
                <span>
                  <i className="fa-solid fa-angle-down"></i>
                </span>
              </Box>
            </Box>
          </Box>
        </Box>
        {showAddPermitionControlModal ? (
          <AddPermitionControlModal
            showModal={showAddPermitionControlModal}
            handleAddPermitionControlModal={this.handleAddPermitionControlModal}
          />
        ) : (
          <></>
        )}
      </Box>
      
    );
  }
}

export default SetTransitions;

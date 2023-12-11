import React, { Component } from "react";
import { Box, Button, Checkbox } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import AccordionView from "../Components/AccordionView";
let accessPolicyData = [
  {
    name: "All Access",
    chlidren: [
      {
        name: "Environment",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment" },
          { name: "Create Product Environment" },
        ],
      },
      {
        name: "Product",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment" },
          { name: "Create Product Environment" },
        ],
      },
      {
        name: "SHR",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment" },
          { name: "Create Product Environment" },
        ],
      },
      {
        name: "DevSecOps",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment" },
          { name: "Create Product Environment" },
        ],
      },
    ],
  },
];
let searchedData = [];
class Policies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedKey: "",
      data: accessPolicyData,
      selectedData: [],
    };
  }

  //  Serach Groups
  handleSearchChange = (e) => {
    let searchedKey = e.target.value;
    let { selectedData } = this.state;
    searchedData = [];
    selectedData = [];
    if (accessPolicyData?.length) {
      if (searchedKey) {
        this.searchRecursiveLogic(searchedKey, accessPolicyData);
        selectedData = this.getParentElement(searchedData);
      } else {
        selectedData = [];
      }

      this.setState({ selectedData, searchedKey });
    }
  };

  //  Search recursive logic
  searchRecursiveLogic = (value, policyData, parentIndex) => {
    policyData.forEach((data, index) => {
      let currentNode = `${parentIndex ? `${parentIndex}_` : ""}${index}`;

      if (data?.name.toLowerCase().includes(value.toLowerCase())) {
        searchedData.push(currentNode);
      }
      if (data?.chlidren?.length) {
        return this.searchRecursiveLogic(value, data?.chlidren, currentNode);
      }
    });
  };

  //  Get parent element from child element
  getParentElement = (data) => {
    let parentElement = [];

    data.forEach((value) => {
      let currentVal = value;
      let currentValToArr = value.split("_");
      if (currentValToArr.length) {
        for (let index = 0; index < currentValToArr.length; index = index + 2) {
          parentElement.push(currentVal.slice(0, index + 1));
        }
      }
    });

    return [...new Set(parentElement)].concat(data);
  };
  
  render() {
    let { searchedKey, data, selectedData } = this.state;
    return (
      <>
        <Box className="d-flex Justify-content-between align-items-center search-box">
          <Box className="d-flex width-100 ">
            <Box className="search">
              <input
                type="text"
                className="input"
                placeholder="Search User"
                value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
              <button className="button">
                <SearchOutlinedIcon />
              </button>
            </Box>
            <Link to={`/app/setting/create-policy`}>
              <Button className="primary-btn min-width">Create Policy</Button>
            </Link>
          </Box>
          <Button className="danger-btn min-width-inherit" variant="contained">
            Delete
          </Button>
        </Box>
        <Box className="setting-table">
          <AccordionView data={data} selectedData={selectedData}
            headers={[
              { name: "Policy name", subChild: <Box className="check-box"> <Checkbox size="small" /></Box>, styled: { width: 20} },
            ]}
           />
        </Box>
      </>
    );
  }
}

export default Policies;

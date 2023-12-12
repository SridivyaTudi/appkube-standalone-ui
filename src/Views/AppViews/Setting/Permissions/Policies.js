import React, { Component } from "react";
import { Box, Button, Checkbox } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import status from "Redux/Constants/CommonDS";
import AccordionView from "../Components/AccordionView";
import { connect } from "react-redux";
import Loader from "Components/Loader";
let searchedData = [];
class Policies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedKey: "",
      data: [],
      selectedData: [],
    };
  }

  componentDidMount = () => {
    this.setPolicyStateOrReturnData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.allPolicy?.status !== prevProps.allPolicy?.status) {
      if (this.props.allPolicy.status === status.SUCCESS) {
        this.setPolicyStateOrReturnData();
      }
    }
  };

  //  Serach Groups
  handleSearchChange = (e) => {
    let searchedKey = e.target.value;
    let { selectedData } = this.state;
    searchedData = [];
    selectedData = [];
    let data = this.setPolicyStateOrReturnData(0);
    if (data?.length) {
      if (searchedKey) {
        this.searchRecursiveLogic(searchedKey, data);
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

  // set policy state according format
  setPolicyAccordingToFormat = (policies) => {
    return policies.map((policy) => {
      policy["name"] = policy.name || policy.permissionId;

      if (policy.version) {
        policy["isCheckBoxShow"] = true;
      }
      if (policy?.permissions?.length) {
        policy["chlidren"] = this.setPolicyAccordingToFormat(
          policy.permissions
        );
        return policy;
      } else {
        return policy;
      }
    });
  };

  // Set state of policies
  setPolicyStateOrReturnData = (isStateSet = 1) => {
    let data = this.props.allPolicy?.data || [];
    if (data?.length) {
      data = this.setPolicyAccordingToFormat(JSON.parse(JSON.stringify(data)));
      if (isStateSet) {
        this.setState({ data });
      } else {
        return data;
      }
    }
  };

  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
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
          {this.props.allPolicy?.status === status.IN_PROGRESS ? (
            this.renderLoder()
          ) : data?.length ? (
            <AccordionView
              data={data}
              selectedData={selectedData}
              headers={[
                {
                  name: "Policy name",
                  subChild: (
                    <Box className="check-box">
                      <Checkbox size="small" />
                    </Box>
                  ),
                  styled: { width: 20 },
                },
              ]}
            />
          ):<></>}
        </Box>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { allPolicy } = state.settings;
  return {
    allPolicy,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Policies);

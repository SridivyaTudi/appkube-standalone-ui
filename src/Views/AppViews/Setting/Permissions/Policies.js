import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import status from "Redux/Constants/CommonDS";
import AccordionView from "../Components/AccordionView";
import { connect } from "react-redux";
import Loader from "Components/Loader";
import ConfirmationPopup from "Components/ConfirmationPopup";
import { deletePolicy, getPolicies } from "Redux/Settings/SettingsThunk";
import { ToastMessage } from "Toast/ToastMessage";
let searchedData = [];
class Policies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedKey: "",
      data: [],
      selectedData: [],
      selectedCheckBox: [],
      showConfirmPopup: false,
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

    if (
      prevProps.removePolicy.status !== this.props.removePolicy.status &&
      this.props.removePolicy.status === status.SUCCESS
    ) {
      if (this.props.removePolicy.data === "OK") {
        this.togglePopup();
        ToastMessage.success("Policy removed successfully.");
        this.props.getPolicies();
      } else {
        ToastMessage.error("Policy is not removed.");
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

      if (
        data?.name
          ?.toString()
          ?.toLowerCase()
          .includes(value?.toString()?.toLowerCase())
      ) {
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
    let permissionCategory = this.props.permissionCategory.data || [];
    return policies.map((policy) => {
      policy["name"] = policy.name;

      if (policy.version) {
        policy["isCheckBoxShow"] = true;
      }
      if (policy?.permissions?.length) {
        // permissionCategory
        policy["chlidren"] = policy?.permissions;
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

  onClickDeleteBtn = () => {
    let { data, selectedCheckBox } = this.state;
    this.setState({
      showConfirmPopup: true,
      selectedPolicyId: data[selectedCheckBox[0]].id,
    });
  };

  // toggle confirmation popup
  togglePopup = () => {
    let { showConfirmPopup, selectedPolicyId, selectedCheckBox } = this.state;
    this.setState({
      showConfirmPopup: !showConfirmPopup,
      selectedPolicyId: showConfirmPopup ? 0 : selectedPolicyId,
    });
  };

  handleDeletePolicy = () => {
    let { selectedPolicyId } = this.state;
    if (selectedPolicyId) {
      this.props.deletePolicy(selectedPolicyId);
    }
  };
  render() {
    let {
      searchedKey,
      data,
      selectedData,
      selectedCheckBox,
      showConfirmPopup,
    } = this.state;
    let deletePolicyStatus = this.props?.removePolicy?.status;
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
          {selectedCheckBox?.length ? (
            <Button
              className="danger-btn min-width-inherit"
              variant="contained"
              onClick={this.onClickDeleteBtn}
            >
              Delete
            </Button>
          ) : (
            <></>
          )}
        </Box>
        <Box className="policies-setting-table">
          {this.props.allPolicy?.status === status.IN_PROGRESS ? (
            this.renderLoder()
          ) : data?.length ? (
            <AccordionView
              data={data}
              selectedData={selectedData}
              headers={[
                {
                  name: "Policy name",
                  styled: { width: 20 },
                },
              ]}
              setSelectedViewData={(data) => {
                let { selectedCheckBox } = data;
                this.setState({ selectedCheckBox });
              }}
            />
          ) : (
            <></>
          )}

          {showConfirmPopup ? (
            <ConfirmationPopup
              showModal={showConfirmPopup}
              togglePopup={this.togglePopup}
              labels={{
                btnYes: "Yes",
                description: "Are you sure delete the policy ? ",
                btnNo: "Cancel",
              }}
              handleCallBack={this.handleDeletePolicy}
              showLoader={deletePolicyStatus === status.IN_PROGRESS}
            />
          ) : (
            <></>
          )}
        </Box>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { allPolicy, removePolicy, permissionCategory } = state.settings;
  return {
    allPolicy,
    removePolicy,
    permissionCategory,
  };
};

const mapDispatchToProps = { deletePolicy, getPolicies };

export default connect(mapStateToProps, mapDispatchToProps)(Policies);

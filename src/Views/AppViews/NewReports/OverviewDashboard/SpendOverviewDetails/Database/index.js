import React, { Component } from "react";
import TimeSpendComponent from "../../../Components/TimeSpendComponent";
import SpendingTable from "Views/AppViews/NewReports/OverviewDashboard/SpendOverviewDetails/Components/SpendingTable";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box } from "@mui/material";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import {
  getElementSummary,
  getElementDetails,
} from "Redux/Reports/ReportsThunk";
import { ENVIRONMENTS, getCurrentOrgId } from "Utils";
import Loader from "Components/Loader";
import { REPORT_PAGE_TYPE } from "CommonData";

class Database extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementDetails: [],
      elementSummary: [],
    };
  }
  componentDidMount = () => this.apiCall();

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.elementDetailsData.status !==
        this.props.elementDetailsData.status &&
      this.props.elementDetailsData.status === status.SUCCESS &&
      this.props.elementDetailsData?.data
    ) {
      const elementDetailsData = this.props.elementDetailsData?.data.data || [];
      if (elementDetailsData.length) {
        this.manipluateElementDetailsData(elementDetailsData);
      }
    }

    if (
      prevProps.elementSummaryData.status !==
        this.props.elementSummaryData.status &&
      this.props.elementSummaryData.status === status.SUCCESS &&
      this.props.elementSummaryData?.data
    ) {
      const elementSummaryData = this.props.elementSummaryData?.data.data || [];
      if (elementSummaryData.length) {
        this.manipluateElementSummaryData(elementSummaryData);
      }
    }

    if (prevProps.selectedGranularity !== this.props.selectedGranularity) {
      this.apiCall();
    }
  }
  /** Get url details. */
  getUrlDetails() {
    const name = this.props.params.name;
    return { name };
  }
  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { elementDetails } = this.state;
    let data = this.manipluateElementDetailsData(
      this.props.elementDetailsData?.data.data || [],
      1
    );
    if (data?.length) {
      if (value) {
        elementDetails = data.filter((tableData) => {
          if (
            tableData?.InstanceID.toLowerCase().includes(value.toLowerCase())
          ) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        elementDetails = data;
      }
      this.setState({ elementDetails, searchedKey: value });
    }
  };

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 p-t-20 p-b-20 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  }

  //manipluate compute data
  manipluateElementDetailsData = (data, isReturnData = 0) => {
    let { elementDetails } = this.state;
    elementDetails = [];
    if (data.length) {
      data.forEach((details) => {
        elementDetails.push({
          tags: details.tags,
          InstanceID: details.instanceId,
          type: details.instanceType,
          status: details.instanceStatus,
          priceModel: details.pricingModel,
          availabilityZone: details.availabilityZone,
          onDemandCostHr: details.ondemandCostPerHr,
          RICostHr: details.riCostPerHr,
          usageHrs: details.usageHours,
          addOns: details.addOns,
          totalSpend: details.totalSpend,
        });
      });
    }
    if (isReturnData) {
      return elementDetails;
    } else {
      this.setState({ elementDetails });
    }
  };

  //manipluate compute data
  manipluateElementSummaryData = (data, isReturnData = 0) => {
    let { elementSummary } = this.state;
    elementSummary = [];
    if (data.length) {
      data.forEach((details) => {
        elementSummary.push({
          name: details.instance_desc,
          value: `$${details.current_total}`,
          percentage: details.variance,
          subName: " vs Last " + this.props.selectedGranularity,
        });
      });
    }
    if (isReturnData) {
      return elementSummary;
    } else {
      this.setState({ elementSummary });
    }
  };

  apiCall = () => {
    const { name: elementType } = this.getUrlDetails();
    let serviceCategory =
      REPORT_PAGE_TYPE.SPEND_OVERVIEW_SERVICE_CATEGORY.DATABASE.toLowerCase();

    this.props.getElementSummary({
      serviceCategory,
      cloud: ENVIRONMENTS.AWS.toLowerCase(),
      granularity: this.props.selectedGranularity,
      compareTo: -1,
      orgId: getCurrentOrgId(),
      elementType,
    });
    this.props.getElementDetails({
      serviceCategory,
      cloud: ENVIRONMENTS.AWS.toLowerCase(),
      granularity: this.props.selectedGranularity,
      compareTo: -1,
      orgId: getCurrentOrgId(),
      elementType,
    });
  };
  
  render() {
    const { name } = this.getUrlDetails();
    let { searchedKey, elementDetails, elementSummary } = this.state;
    let { elementSummaryData, elementDetailsData } = this.props;
    return (
      <>
        {" "}
        {elementSummaryData.status === status.IN_PROGRESS ? (
          this.renderLoder()
        ) : (
          <TimeSpendComponent data={elementSummary} />
        )}
        <Box className="table-head" alignItems={"end"}>
          <Box className="d-block">
            <h3>{name} SPENDINGS</h3>
            <h4 className="m-t-3 m-b-0">Cost consumption of {name}</h4>
          </Box>
          <Box className="search m-r-0">
            <input
              type="text"
              className="input"
              placeholder="Search Insatnce "
              value={searchedKey}
              onChange={this.handleSearchChange}
              autoFocus="autoFocus"
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
        </Box>
        {elementDetailsData.status === status.IN_PROGRESS ? (
          this.renderLoder()
        ) : (
          <SpendingTable data={elementDetails} />
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { elementSummaryData, elementDetailsData } = state.reports;
  return { elementSummaryData, elementDetailsData };
}

const mapDispatchToProps = {
  getElementSummary,
  getElementDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(Database));

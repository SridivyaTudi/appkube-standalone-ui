import React, { Component } from "react";
import { Box } from "@mui/material";
import Aws from "assets/img/aws.png";
import GoogleCloud from "assets/img/google-cloud.png";
import Microsoftazure from "assets/img/microsoftazure.png";
import AssetsEnvironmentTab from "Views/AppViews/DiscoveredAssets/Components/AssetsEnvironmentTab";
import AssetsTable from "Views/AppViews/DiscoveredAssets/Components/AssetsTable";
import AssetsFilterSection from "Views/AppViews/DiscoveredAssets/Components/AssetsFilterSection";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { connect } from "react-redux";
import { ENVIRONMENTS } from "Utils";
import status from "Redux/Constants/CommonDS";
import { getDiscoveredAssets } from "Redux/DiscoveredAssets/DiscoveredAssetsThunk";
import { API_ERROR_MESSAGE } from "CommonData";

class DiscoveredAssetsComponent extends Component {
  controlMapping = [
    {
      image: Aws,
      label: "Amazon Web Services",
      dataKey: "amazonWebServices",
      key: ENVIRONMENTS.AWS,
    },
    {
      image: GoogleCloud,
      label: "Google Cloud Platform",
      dataKey: "googleCloudPlatform",
      key: ENVIRONMENTS.GCP,
    },
    {
      image: Microsoftazure,
      label: "Azure Cloud",
      dataKey: "azureCloud",
      key: ENVIRONMENTS.AZURE,
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      assestsData: [],
      assestsDataLength: 0,
      assestsDataPage: 0,
    };
  }

  componentDidMount() {
    const discoveredData = this.props.discoveredAssetsData?.data || [];
    this.manipulateDiscoveredData(discoveredData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.discoveredAssetsData.status !==
        this.props.discoveredAssetsData.status &&
      this.props.discoveredAssetsData.status === status.SUCCESS &&
      this.props.discoveredAssetsData?.data
    ) {
      const discoveredData = this.props.discoveredAssetsData?.data || [];
      this.manipulateDiscoveredData(discoveredData);
    }

    if (
      prevProps.discoveredAssetsFilters.data !==
      this.props.discoveredAssetsFilters?.data
    ) {
      const discoveredData = this.props.discoveredAssetsData?.data || [];
      this.manipulateDiscoveredData(discoveredData);
    }
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab }, () => {
      const discoveredData = this.props.discoveredAssetsData?.data || [];
      this.manipulateDiscoveredData(discoveredData);
    });
  };

  manipulateDiscoveredData = (data) => {
    let { totalPages = 0, cloudElementList = [] } = data;
    let { activeTab } = this.state;
    let filterData = this.props.discoveredAssetsFilters.data || [];

    let assestsData = [];

    let cloud = this.controlMapping.find(
      (details, index) => index === activeTab
    );

    if (cloudElementList.length) {
      cloudElementList.forEach((assest) => {
        let isCloudMatch = assest.cloud?.toUpperCase() === cloud?.key;

        if (isCloudMatch) {
          let isFilteredFromLandingZone = filterData.filter(
            (assestItem) =>
              assestItem.name === "accounts" &&
              assestItem.label === assest.landingZone
          );

          let isOtherFiltered = filterData.filter(
            (assestItem) =>
              assestItem.name !== "accounts" &&
              [assest.elementType, assest.productEnclaveInstanceId].includes(
                assestItem.value
              )
          );
          if (
            filterData.length === 1 ||
            (isFilteredFromLandingZone.length > 0 && isOtherFiltered.length > 0)
          ) {
            assestsData.push({
              name: assest.instanceName,
              elementType: assest.elementType,
              landingZone: assest.landingZone,
              productEnclave: assest.productEnclaveInstanceId,
              id: assest.id,
              isEventEnabled: assest.isEventEnabled ? true : false,
              isLogEnabled: assest.isLogEnabled ? true : false,
              isTagged: assest.isTagged ? true : false,
              isTraceEnabled: assest.isTraceEnabled ? true : false,
              instanceId: assest.instanceId,
              landingZoneId: assest.landingzoneId,
              cloud: assest.cloud,
            });
          }
        }
      });
    }

    this.setState({
      assestsData,
      assestsDataLength: assestsData.length,
      assestsDataPage: totalPages,
    });
  };
  render() {
    let { activeTab, assestsData, assestsDataLength } = this.state;
    let { discoveredAssetsData } = this.props;
    return (
      <Box className="discovered-assets-inner-tabs">
        <Box className="assets-sevices-tabs">
          <AssetsEnvironmentTab
            data={this.controlMapping}
            activeTab={activeTab}
            setActiveTab={(id) => this.setActiveTab(id)}
          />
          <Box className="tabs-content">
            <AssetsFilterSection flag="all" />
            <AssetsTable
              data={assestsData}
              loderStatus={discoveredAssetsData?.status === status.IN_PROGRESS}
              totalRecords={assestsDataLength}
              activeTab={activeTab}
              errorMessage={
                discoveredAssetsData.status === status.FAILURE
                  ? API_ERROR_MESSAGE
                  : ""
              }
            />
          </Box>
        </Box>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { discoveredAssetsData, discoveredAssetsFilters } =
    state.discoveredAssets;

  return { discoveredAssetsData, discoveredAssetsFilters };
}

const mapDispatchToProps = { getDiscoveredAssets };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(DiscoveredAssetsComponent));

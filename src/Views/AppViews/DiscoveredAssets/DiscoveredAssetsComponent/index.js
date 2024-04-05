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
import { ENVIRONMENTS, getCurrentOrgId } from "Utils";
import status from "Redux/Constants/CommonDS";
import { getDiscoveredAssets } from "Redux/DiscoveredAssets/DiscoveredAssetsThunk";


let data = [
  {
    name: "45sdf28d",
    elementType: "EKS",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
  },
  {
    name: "45sdf28d",
    elementType: "EKS",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
  },
  {
    name: "45sdf28d",
    elementType: "EKS",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
  },
  {
    name: "45sdf28d",
    elementType: "EKS",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
  },
  {
    name: "45sdf28d",
    elementType: "EKS",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
  },
  {
    name: "45sdf28d",
    elementType: "EKS",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
  },
  {
    name: "45sdf28d",
    elementType: "EKS",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
    logClass: "setting-icon",
    traceClass: "orange",
    eventClass: "orange",
  },
  {
    name: "45sdf28d",
    elementType: "EKS",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
    tagStatusClass: "setting-icon",
  },
  {
    name: "45sdf28d",
    elementType: "EKS",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
    tagStatusClass: "setting-icon",
  },
];

let filterData = [
  {
    name: "Region",
    value: "US East 2",
  },
  {
    name: "AWS Account",
    value: "AWS (657",
  },
  {
    name: "Product Enclave ",
    value: "8 VPC",
  },
  {
    name: "Element Type",
    value: "EC2",
  },

  {
    name: "App",
    value: "Data",
  },
  {
    name: "Element Type",
    value: "EKS",
  },
];
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
      selectedFilters: filterData,
    };
  }

  componentDidMount = () => {
    const orgId = getCurrentOrgId();
    this.props.getDiscoveredAssets(orgId);
  };

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
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab, selectedFilters: filterData }, () => {
      const discoveredData = this.props.discoveredAssetsData?.data || [];
      this.manipulateDiscoveredData(discoveredData);
    });
  };

  onClickCloseIcon = (id) => {
    let { selectedFilters } = this.state;
    selectedFilters = selectedFilters.filter((filter, index) => index !== id);
    this.setState({ selectedFilters });
  };

  manipulateDiscoveredData = (data) => {
    let assestsData = [];
    let { activeTab } = this.state;

    let cloud = this.controlMapping.find(
      (details, index) => index === activeTab
    );

    if (data.length) {
      data.forEach((assest) => {
        if (assest.cloud?.toUpperCase() === cloud?.key) {
          assestsData.push({
            name: assest.instanceName,
            elementType: assest.elementType,
            landingZone: assest.landingZone,
            productEnclave: assest.productEnclaveInstanceId,
          });
        }
      });
    }
    this.setState({ assestsData });
  };
  render() {
    const { activeTab, selectedFilters, assestsData } = this.state;
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
            {/* <AssetsFilterSection
              data={selectedFilters}
              onClickCloseIcon={(id) => this.onClickCloseIcon(id)}
              onClickClearFilter={() => this.setState({ selectedFilters: [] })}
            /> */}
            <AssetsTable
              data={assestsData}
              loderStatus={discoveredAssetsData?.status === status.IN_PROGRESS}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { discoveredAssetsData } = state.discoveredAssets;

  return { discoveredAssetsData };
}

const mapDispatchToProps = { getDiscoveredAssets };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(DiscoveredAssetsComponent));

import React, { Component } from "react";
import { Box } from "@mui/material";
import Aws from "assets/img/aws.png";
import GoogleCloud from "assets/img/google-cloud.png";
import Microsoftazure from "assets/img/microsoftazure.png";
import AssetsEnvironmentTab from "Views/AppViews/DiscoveredAssets/Components/AssetsEnvironmentTab";
import AssetsTable from "Views/AppViews/DiscoveredAssets/Components/AssetsTable";
import AssetsFilterSection from "Views/AppViews/DiscoveredAssets/Components/AssetsFilterSection";

let data = [
  {
    name: "45sdf28d",
    elementType: "Batch",
    landingZone: "AWS (657907747554)",
    productEnclave: "VPC-ds42es114",
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
];

class UntaggedAssets extends Component {
  controlMapping = [
    {
      image: Aws,
      label: "Amazon Web Services",
      dataKey: "amazonWebServices",
    },
    {
      image: GoogleCloud,
      label: "Google Cloud Platform",
      dataKey: "googleCloudPlatform",
    },
    {
      image: Microsoftazure,
      label: "Azure Cloud",
      dataKey: "azureCloud",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      environmentList: data,
      selectedFilters: filterData,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab, selectedFilters: filterData });
  };

  onClickCloseIcon = (id) => {
    let { selectedFilters } = this.state;
    selectedFilters = selectedFilters.filter((filter, index) => index !== id);
    this.setState({ selectedFilters });
  };

  render() {
    const { activeTab, selectedFilters, environmentList } = this.state;
    return (
      <Box className="discovered-assets-inner-tabs">
        <Box className="assets-sevices-tabs">
          <AssetsEnvironmentTab
            data={this.controlMapping}
            activeTab={activeTab}
            setActiveTab={(id) => this.setActiveTab(id)}
          />
          <Box className="tabs-content">
            <AssetsFilterSection
              data={selectedFilters}
              onClickCloseIcon={(id) => this.onClickCloseIcon(id)}
              onClickClearFilter={() => this.setState({ selectedFilters: [] })}
            />
            <AssetsTable data={environmentList} />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default UntaggedAssets;

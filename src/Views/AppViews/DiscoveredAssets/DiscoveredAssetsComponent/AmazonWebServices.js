import React, { Component } from "react";
import AssetsTable from "Views/AppViews/DiscoveredAssets/Components/AssetsTable";
import AssetsFilterSection from "Views/AppViews/DiscoveredAssets/Components/AssetsFilterSection";
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
class AmazonWebServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      environmentList: data,
      selectedFilters: filterData,
    };
  }

  onClickCloseIcon = (id) => {
    let { selectedFilters } = this.state;
    selectedFilters = selectedFilters.filter((filter, index) => index !== id);
    this.setState({ selectedFilters });
  };
  render() {
    let { selectedFilters, environmentList } = this.state;
    return (
      <>
        <AssetsFilterSection
          data={selectedFilters}
          onClickCloseIcon={(id) => this.onClickCloseIcon(id)}
          onClickClearFilter={() => this.setState({ selectedFilters: [] })}
        />
        <AssetsTable data={environmentList} />
      </>
    );
  }
}

export default AmazonWebServices;

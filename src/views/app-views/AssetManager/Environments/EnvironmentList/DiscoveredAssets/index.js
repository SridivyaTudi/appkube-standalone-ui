import React, { Component } from "react";
import Aws from "assets/img/aws.png";
import VpcServicesIcon from "assets/img/assetmanager/vpc-services-icon.png";
import ClusterIcon from "assets/img/assetmanager/cluster-icon.png";
import CommonFilterViewSearch from "../CommonFilterViewSearch";
import ServicesNameLogo from "../ServicesNameLogo";
import GlobalSerivces from "./GlobalServices";
import GatewayDetails from "./GatewayDetails";
import CloudManagedDetails from "./CloudManagedDetails";
import {
  IconButton,
  Box,
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
} from "@mui/material";
import status from "redux/constants/commonDS";
import { connect } from "react-redux";
import TopologyView from "./Components/TopologyView";
import VpcDetails from "./VpcDetails";
import ClusterDetails from "./ClusterDetails";

const nextTypes = {
  service: "vpc",
  vpc: "cluster",
  cluster: "product",
  product: "",
};

const TABLE_LEVEL_1 = {
  APP: "App",
  DATA: "Data",
};

const TOPOLOGY_VIEW_TYPE = {
  VPC: "vpc",
  CLUSTER: "cluster",
  GLOBAL_SERVICE: "globalService",
};

class DiscoveredAssets extends Component {
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      display_detail: true,
      cloudAssets: [],
      breadcrumbs: [
        {
          id: "service",
          name: cloudName,
          type: "service",
          serviceIndexs: {},
        },
      ],
      searchString: "",
      accountId: queryPrm.get("landingZone"),
      dataOfTableLevel1: [],
      dataOfLevel1: {},
      currentActiveNodeLabel: "",
    };
  }

  componentDidMount = ()=>{
    let { productEnclaveList, globalServiceList } =
    this.getEnvironmentDataByLandingZone();
  if (productEnclaveList?.length  || globalServiceList?.length) {
    this.prepareDataTableLevel1(productEnclaveList);
    this.prepareDataTopologyViewComponent(
      productEnclaveList,
      globalServiceList
    );
  }
  }
  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.envDataByLandingZone.status !==
        this.props.envDataByLandingZone.status &&
      this.props.envDataByLandingZone.status === status.SUCCESS
    ) {
      let { productEnclaveList, globalServiceList } =
        this.getEnvironmentDataByLandingZone();
      if (productEnclaveList) {
        this.prepareDataTableLevel1(productEnclaveList);
        this.prepareDataTopologyViewComponent(
          productEnclaveList,
          globalServiceList
        );
      }
    }
  };

  showHideDetail = () => {
    const { display_detail } = this.state;
    this.setState({
      display_detail: !display_detail,
    });
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  getBreadCrumbs() {
    return this.state.breadcrumbs.map((data, index) => {
      return (
        <>
          {index > 0 ? (
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
          ) : (
            <></>
          )}
          <li
            onClick={() => {
              if (this.state.breadcrumbs.length > 1) {
                this.handleToggleNode(
                  data.serviceIndexs,
                  data.type === "service" ? "vpc" : "",
                  data.type,
                  data.type === "service" ? false : true,
                  (data.type && nextTypes[data.type]) || ""
                );
              }
            }}
          >
            <a>{data.name}</a>
          </li>
        </>
      );
    });
  }

  renderVpcsDetails() {
    let { dataOfTableLevel1 } = this.state;
    return dataOfTableLevel1.map((vpc, index) => {
      return (
        <TableRow key={index}>
          <TableCell align="center">{vpc.name}</TableCell>
          <TableCell align="center">{vpc.product_count}</TableCell>
          <TableCell align="center">{vpc.app_count}</TableCell>
          <TableCell align="center">{vpc.data_count}</TableCell>
          <TableCell align="center">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={this.toggleMenu}
              className="list-icon"
            >
              <i className="fas fa-ellipsis-v"></i>
            </IconButton>
            <Box className="open-create-menu-close"></Box>
            {this.state.showMenu === true && (
              <Box className="menu-list">
                <List>
                  <ListItem className="active">
                    <a href="#">Add New datasource</a>
                  </ListItem>
                  <ListItem>
                    <a href="#">Add Compliance</a>
                  </ListItem>
                  <ListItem>
                    <a href="#">Associate to OU</a>
                  </ListItem>
                  <ListItem>
                    <a href="#">Add New VPC</a>
                  </ListItem>
                  <ListItem>
                    <a href="#">Add New Product</a>
                  </ListItem>
                </List>
              </Box>
            )}
          </TableCell>
        </TableRow>
      );
    });
  }

  renderTableLevel1() {
    let { dataOfTableLevel1 } = this.state;
    if (!dataOfTableLevel1.length) return null;
    return (
      <Box
        className="environment-table-section discovered-table"
        style={{ height: "537px" }}
      >
        <Box className="table discovered-assets-table">
          <TableContainer>
            <Table className="overview">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box className="environment-image">
                      <img src={Aws} />
                    </Box>
                  </TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>App Services</TableCell>
                  <TableCell>Data Services</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <tbody>{this.renderVpcsDetails()}</tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }

  filterVpcsData(searchString) {
    let { allVpcsDetails, vpcsDetails } = this.props;
    vpcsDetails =
      searchString != ""
        ? allVpcsDetails.filter((vpc) =>
            vpc.name.toLowerCase().includes(searchString.toLowerCase())
          )
        : allVpcsDetails;
    this.setState({ searchString });
    this.props.handleSearchVpcs(vpcsDetails);
  }

  getEnvironmentDataByLandingZone = () => {
    const { envDataByLandingZone } = this.props;
    let checkLengthEnvData = false;
    try {
      checkLengthEnvData =
        envDataByLandingZone && Object.keys(envDataByLandingZone.data).length;
    } catch (error) {
      console.log(error);
    }
    return checkLengthEnvData
      ? {
          productEnclaveList: envDataByLandingZone.data?.productEnclaveList,
          globalServiceList: envDataByLandingZone.data?.globalServiceList,
        }
      : {};
  };

  prepareDataTableLevel1 = (envData) => {
    let vpcs = [];
    for (let envIndex = 0; envIndex < envData.length; envIndex++) {
      let details = {
        name: "",
        product_count: 0,
        app_count: 0,
        data_count: 0,
      };
      details.name = envData[envIndex].name;
      const hostingTypeList = envData[envIndex].hostingTypeList;
      hostingTypeList.forEach((hostingType) => {
        const categories = hostingType.category;
        categories.forEach((category) => {
          if (category.category === TABLE_LEVEL_1.APP) {
            details.app_count += category.elementList.length;
          } else if (category.category === TABLE_LEVEL_1.DATA) {
            details.data_count += category.elementList.length;
          }
        });
      });
      vpcs.push(details);
    }
    this.setState({
      dataOfTableLevel1: vpcs,
    });
  };

  prepareDataTopologyViewComponent = (envData) => {
    const queryPrm = new URLSearchParams(document.location.search);
    let formatData = {
      label: "Account ID",
      subLabel: this.getLandingZone(),
      image: ServicesNameLogo.LOGOS[queryPrm.get("cloudName").toUpperCase()],
      children: [[], []],
    };
    let prepareData = [];

    for (let envIndex = 0; envIndex < envData.length; envIndex++) {
      let obj = {
        label: envData[envIndex].name,
        id: envData[envIndex].id,
        type: TOPOLOGY_VIEW_TYPE.VPC,
        image: VpcServicesIcon,
        children: [],
      };
      const hostingTypeList = envData[envIndex].hostingTypeList;
      hostingTypeList.forEach((hostingType) => {
        obj.children.push({
          label: hostingType.hostingType,
          id: "",
          image: ClusterIcon,
          type: TOPOLOGY_VIEW_TYPE.CLUSTER,
          children: [],
        });
      });
      prepareData.push(obj);
    }
    formatData.children = [prepareData, []];
    this.setState({ dataOfLevel1: formatData });
  };

  getLandingZone = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const landingZone = urlParams.get("landingZone");
    return landingZone;
  };

  getCurrentActiveTreeLevel = (label) => {
    this.setState({ currentActiveNodeLabel: label });
  };

  render() {
    const { dataOfTableLevel1, dataOfLevel1, currentActiveNodeLabel } =
      this.state;
    const { envDataByLandingZone, departments } = this.props;
    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-head">
          <CommonFilterViewSearch
            data={{ dataOfTableLevel1 }}
            handleSearch={(string) => {
              // this.filterVpcsData(string);
            }}
            updateAccountId={(accountId) => {
              this.setState({ accountId });
              this.props.updateCloudName(
                new URLSearchParams(document.location.search).get("cloudName"),
                accountId
              );
            }}
            accountList={this.props.accountList}
            updateCurrentAccountId={this.props.updateCurrentAccountId}
          />
        </Box>
        <Box className="discovered-assets-body">
          {envDataByLandingZone.status === status.IN_PROGRESS ||
          departments.status === status.IN_PROGRESS ? (
            <Box className="chart-spinner text-center width-100 p-t-20 p-b-20">
              <i className="fa-solid fa-spinner fa-spin" /> Loading...
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <TopologyView
                  data={dataOfLevel1}
                  setLevel={this.getCurrentActiveTreeLevel}
                />
                <Grid item xs={5}>
                  {!currentActiveNodeLabel ? this.renderTableLevel1() : <></>}
                  <Box className="fliter-tabs global-service-penal">
                    <Box className="global-services-fliter">
                      <Box className="heading">
                        <Box className="breadcrumbs">
                          <ul>{this.getBreadCrumbs()}</ul>
                        </Box>
                      </Box>
                    </Box>
                    {currentActiveNodeLabel.includes("cluster") ? (
                      <ClusterDetails />
                    ) : currentActiveNodeLabel.includes("vpc") ? (
                      <VpcDetails />
                    ) : currentActiveNodeLabel.includes("gateway") ? (
                      <GatewayDetails />
                    ) : currentActiveNodeLabel.includes("cloudManaged") ? (
                      <CloudManagedDetails />
                    ) : currentActiveNodeLabel.includes("globalServices") ? (
                      <GlobalSerivces />
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { envDataByLandingZone, departments } = state.environmentData;
  return { envDataByLandingZone, departments };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(DiscoveredAssets);

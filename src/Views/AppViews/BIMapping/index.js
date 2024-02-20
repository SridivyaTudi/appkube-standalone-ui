import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import Aws from "../../../assets/img/aws.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import Kubernetes from "../../../assets/img/kubernetes.png";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";
import AccordionView from "Views/AppViews/Setting/Components/AccordionView";
import { getCurrentOrgId, getCloudWiseLandingZoneCount } from "Utils";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import {
  getProductList,
  getProductEnv,
  getModules,
  getModuleElements,
  getModulesOf3Tier,
} from "Redux/AssociateApp/AssociateAppThunk";
import { getOrgWiseDepartments } from "Redux/Environments/EnvironmentsThunk";
import Loader from "Components/Loader";
const orgId = getCurrentOrgId();
let data = [
  {
    name: "Synectiks",
    chlidren: [
      {
        name: (
          <>
            HR{" "}
            <Link to={`/app/bim/add-product`}>
              <i className="add-icon fa-solid fa-circle-plus"></i>
            </Link>
          </>
        ),
        chlidren: [
          {
            name: "Payroll",
            chlidren: [
              { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
              { name: "EC2", chlidren: [{ name: "SIP 1" }] },
              { name: "ECS", chlidren: [{ name: "SIP 1" }] },
              { name: "WAF", chlidren: [{ name: "SIP 1" }] },
              { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
            ],
          },
          {
            name: "Accounts",
            chlidren: [
              { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
              { name: "EC2", chlidren: [{ name: "SIP 1" }] },
              { name: "ECS", chlidren: [{ name: "SIP 1" }] },
              { name: "WAF", chlidren: [{ name: "SIP 1" }] },
              { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
            ],
          },
          {
            name: "IT",
            chlidren: [
              { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
              { name: "EC2", chlidren: [{ name: "SIP 1" }] },
              { name: "ECS", chlidren: [{ name: "SIP 1" }] },
              { name: "WAF", chlidren: [{ name: "SIP 1" }] },
              { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
            ],
          },
          {
            name: "Leave Management",
            chlidren: [
              { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
              { name: "EC2", chlidren: [{ name: "SIP 1" }] },
              { name: "ECS", chlidren: [{ name: "SIP 1" }] },
              { name: "WAF", chlidren: [{ name: "SIP 1" }] },
              { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
            ],
          },
          {
            name: "Maintenance",
            chlidren: [
              { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
              { name: "EC2", chlidren: [{ name: "SIP 1" }] },
              { name: "ECS", chlidren: [{ name: "SIP 1" }] },
              { name: "WAF", chlidren: [{ name: "SIP 1" }] },
              { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
            ],
          },
        ],
      },
      {
        name: (
          <>
            Digital auction{" "}
            <Link to={`/app/bim/add-product`}>
              <i className="add-icon fa-solid fa-circle-plus"></i>
            </Link>
          </>
        ),
        chlidren: [
          { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
          { name: "EC2", chlidren: [{ name: "SIP 1" }] },
          { name: "ECS", chlidren: [{ name: "SIP 1" }] },
          { name: "WAF", chlidren: [{ name: "SIP 1" }] },
          { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
        ],
      },
      {
        name: (
          <>
            We Desk{" "}
            <Link to={`/app/bim/add-product`}>
              <i className="add-icon fa-solid fa-circle-plus"></i>
            </Link>
          </>
        ),
        chlidren: [
          { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
          { name: "EC2", chlidren: [{ name: "SIP 1" }] },
          { name: "ECS", chlidren: [{ name: "SIP 1" }] },
          { name: "WAF", chlidren: [{ name: "SIP 1" }] },
          { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
        ],
      },
      {
        name: (
          <>
            Procurement{" "}
            <Link to={`/app/bim/add-product`}>
              <i className="add-icon fa-solid fa-circle-plus"></i>
            </Link>
          </>
        ),
        chlidren: [
          { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
          { name: "EC2", chlidren: [{ name: "SIP 1" }] },
          { name: "ECS", chlidren: [{ name: "SIP 1" }] },
          { name: "WAF", chlidren: [{ name: "SIP 1" }] },
          { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
        ],
      },
      {
        name: (
          <>
            Product 5{" "}
            <Link to={`/app/bim/add-product`}>
              <i className="add-icon fa-solid fa-circle-plus"></i>
            </Link>
          </>
        ),
        chlidren: [
          { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
          { name: "EC2", chlidren: [{ name: "SIP 1" }] },
          { name: "ECS", chlidren: [{ name: "SIP 1" }] },
          { name: "WAF", chlidren: [{ name: "SIP 1" }] },
          { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
        ],
      },
    ],

    isMutipleCell: true,
    multipeCellData: [
      { name: "01" },
      { name: "01" },
      { name: "02" },
      { name: "03" },
    ],
  },
];

let headers = [
  { name: "Organization Name", styled: {} },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={Aws} alt="" />
        </Box>
        AWS
      </>
    ),
    styled: {},
  },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={Microsoftazure} alt="" />
        </Box>
        Azure
      </>
    ),
    styled: {},
  },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={GoogleCloud} alt="" />
        </Box>
        GCP
      </>
    ),
    styled: {},
  },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={Kubernetes} alt="" />
        </Box>
        Kubernetes
      </>
    ),
    styled: {},
  },
];
class BIMapping extends Component {
  TYPE = {
    ORGANIZATION: "organization",
    DEPARTMENT: "department",
    PRODUCT: "product",
    PRODUCT_ENVS: "productEnvs",
  };
  constructor(props) {
    super(props);
    this.state = {
      isSelectDepartmentOpen: false,
      organizationTableData: [],
      clickTableData: {},
    };
  }

  componentDidMount = () => {
    this.props.getOrgWiseDepartments(orgId);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.organizationWiseDepartments.status !==
        this.props.organizationWiseDepartments.status &&
      this.props.organizationWiseDepartments.status === status.SUCCESS &&
      this.props.organizationWiseDepartments?.data
    ) {
      const organization = this.props.organizationWiseDepartments.data;
      this.manipulateDepartMentData(organization);
    }

    if (
      prevProps.products.status !== this.props.products.status &&
      this.props.products.status === status.SUCCESS &&
      this.props.products?.data
    ) {
      let products = this.props.products?.data;
      this.manipulateProductData(products);
    }

    if (
      prevProps.productEnv.status !== this.props.productEnv.status &&
      this.props.productEnv.status === status.SUCCESS &&
      this.props.productEnv?.data
    ) {
      let productEnvs = this.props.productEnv.data;
      this.manipulateProductEnvsData(productEnvs);
    }
  }
  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
    });
  };

  manipulateChildrenData = (data, type) => {
    return data.map((dataDetails) => {
      let { name, id, departmentId } = dataDetails;
      return {
        name,
        id,
        chlidren: [],
        type,
        departmentId,
        isLastClickEnable: true,
      };
    });
  };

  // Manipulation of department data
  manipulateDepartMentData = (organization) => {
    if (organization) {
      let { name, id, departments } = organization;
      let { organizationTableData } = this.state;
      let chlidren = [];
      if (departments?.length) {
        chlidren = this.manipulateChildrenData(
          departments,
          this.TYPE.DEPARTMENT
        );
      }
      let cloudWiseLandingZoneCount = getCloudWiseLandingZoneCount();
      if (cloudWiseLandingZoneCount.length) {
        let environments = ["AWS", "AZURE", "GCP", "KUBEENETES"];
        cloudWiseLandingZoneCount = cloudWiseLandingZoneCount.map((count) => {
          if (environments.includes(count.cloud)) {
            environments.splice(environments.indexOf(environments), 1);
          }
          return { name: "" + count.totalAccounts };
        });
        if (environments.length) {
          cloudWiseLandingZoneCount = [
            ...cloudWiseLandingZoneCount,
            { name: 0 },
          ];
        }
      }
      
      organizationTableData = [
        {
          name,
          id,
          isMutipleCell: true,
          multipeCellData: cloudWiseLandingZoneCount,
          type: this.TYPE.ORGANIZATION,
          chlidren,
        },
      ];

      this.setState({
        organizationTableData,
      });
    }
  };
  // Manipulation of Product data
  manipulateProductData = (products) => {
    if (products) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          if (organization.chlidren?.length) {
            organization.chlidren = organization.chlidren.map((department) => {
              if (department.id === clickTableData.id) {
                department.chlidren = this.manipulateChildrenData(
                  products,
                  this.TYPE.PRODUCT
                );
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };

  // Manipulation of ProductEnvs data
  manipulateProductEnvsData = (productEnvs) => {
    if (productEnvs) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          let organizationChlidren = organization.chlidren;

          if (organizationChlidren?.length) {
            organization.chlidren = organizationChlidren.map((department) => {
              if (department.id === clickTableData.departmentId) {
                department.chlidren = department.chlidren.map((product) => {
                  if (product.id === clickTableData.id) {
                    product.chlidren = this.manipulateChildrenData(
                      productEnvs,
                      this.TYPE.PRODUCT_ENVS
                    );
                  }
                  return product;
                });
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };

  // Render Loder
  renderLoder(widthClass) {
    return (
      <Box className="d-blck text-center w-100 h-100 p-t-20 p-b-20 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  }

  onClickNode(data) {
    let { type } = data;
    let { clickTableData } = this.state;

    if (type === this.TYPE.DEPARTMENT) {
      this.props.getProductList(data.id);
    } else if (type === this.TYPE.PRODUCT) {
      this.props.getProductEnv(data.id);
    }
    this.setState({ clickTableData: data });
  }
  render() {
    const { isSelectDepartmentOpen, organizationTableData } = this.state;
    const {
      organizationWiseDepartments: organization,
      products,
      productEnv,
    } = this.props;
    const inprogressStatus = status.IN_PROGRESS;
    let loderStatus = [products.status, productEnv.status].includes(
      inprogressStatus
    );
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Organization Unit</h3>
          <Box className="mapping-fliter">
            <Button
              onClick={this.toggleSelectDepartment}
              className="primary-outline-btn min-width"
              variant="outlined"
            >
              <ControlPointIcon className="m-r-1 plus-icon" />
              Department
            </Button>
            {this.state.isSelectDepartmentOpen === true && (
              <div
                className={
                  isSelectDepartmentOpen
                    ? "fliter-collapse active"
                    : "fliter-collapse"
                }
              >
                <List>
                  <Link to={`/app/bim/create-department`}>
                    <ListItem>
                      <i className="fa-solid fa-circle-dot"></i>Create
                      Department
                    </ListItem>
                  </Link>
                  <Link to={`/app/bim/add-product`}>
                    <ListItem>
                      <i className="fa-solid fa-circle-dot"></i>Add Products
                    </ListItem>
                  </Link>
                </List>
              </div>
            )}
          </Box>
        </Box>
        <Box className="bimapping-table">
          {organization.status === inprogressStatus ? (
            this.renderLoder()
          ) : (
            <AccordionView
              data={organizationTableData}
              headers={headers}
              onClickNode={(data) => this.onClickNode(data)}
              isLoding={loderStatus}
            />
          )}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { products, productEnv, modules, moduleElements, threeTierModules } =
    state.associateApp;
  const { organizationWiseDepartments } = state.environments;
  return {
    organizationWiseDepartments,
    products,
    productEnv,
  };
}

const mapDispatchToProps = {
  getOrgWiseDepartments,
  getProductList,
  getProductEnv,
};

export default connect(mapStateToProps, mapDispatchToProps)(BIMapping);

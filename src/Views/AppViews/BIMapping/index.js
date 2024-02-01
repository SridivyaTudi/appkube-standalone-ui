import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import Aws from "../../../assets/img/aws.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import Kubernetes from "../../../assets/img/kubernetes.png";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";
import AccordionView from "Views/AppViews/Setting/Components/AccordionView";

let data = [
  {
    name: "Synectiks",
    chlidren: [
      {
        name: "HR",
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
        name: "Digital auction",
        chlidren: [
          { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
          { name: "EC2", chlidren: [{ name: "SIP 1" }] },
          { name: "ECS", chlidren: [{ name: "SIP 1" }] },
          { name: "WAF", chlidren: [{ name: "SIP 1" }] },
          { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
        ],
      },
      {
        name: "We Desk",
        chlidren: [
          { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
          { name: "EC2", chlidren: [{ name: "SIP 1" }] },
          { name: "ECS", chlidren: [{ name: "SIP 1" }] },
          { name: "WAF", chlidren: [{ name: "SIP 1" }] },
          { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
        ],
      },
      {
        name: "Procurement",
        chlidren: [
          { name: "Lambda", chlidren: [{ name: "SIP 1" }] },
          { name: "EC2", chlidren: [{ name: "SIP 1" }] },
          { name: "ECS", chlidren: [{ name: "SIP 1" }] },
          { name: "WAF", chlidren: [{ name: "SIP 1" }] },
          { name: "Anthena", chlidren: [{ name: "SIP 1" }] },
        ],
      },
      {
        name: "Product 5",
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
  constructor(props) {
    super(props);
    this.state = {
      isSelectDepartmentOpen: false,
    };
  }
  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
    });
  };
  render() {
    const { isSelectDepartmentOpen } = this.state;
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
              <ControlPointIcon className="m-r-1" />
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
                  <ListItem>
                    <Link to={`/app/bim/create-department`}>
                      <i className="fa-solid fa-circle-dot"></i>Create
                      Department
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to={`/app/bim/add-product`}>
                      <i className="fa-solid fa-circle-dot"></i>Add Products
                    </Link>
                  </ListItem>
                </List>
              </div>
            )}
          </Box>
        </Box>
        <Box className="environment-table">
          <AccordionView data={data} headers={headers} />
          {/* <TableContainer className="table">
            <Table>
              <TableHead className="active">
                <TableRow>
                  <TableCell align="left">Organization Name</TableCell>
                  <TableCell align="center">
                    <Box className="environment-image">
                      <img src={Aws} alt="" />
                    </Box>
                    AWS
                  </TableCell>
                  <TableCell align="center">
                    <Box className="environment-image">
                      <img src={Microsoftazure} alt="" />
                    </Box>
                    Azure
                  </TableCell>
                  <TableCell align="center">
                    <Box className="environment-image">
                      <img src={GoogleCloud} alt="" />
                    </Box>
                    GCP
                  </TableCell>
                  <TableCell align="center">
                    <Box className="environment-image">
                      <img src={Kubernetes} alt="" />
                    </Box>
                    Kubernetes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <Link to={""}>
                      Synectiks
                      <i className="fa-solid fa-caret-down arrow-icon"></i>
                    </Link>
                    <Box className="add-synectiks">
                      <Box className="arrow-image m-r-1">
                        <img src={DownRightArrow} alt="DownRightArrow" />
                      </Box>
                      HR
                      <Link to={"/app/bim/adding-product"}>
                        <i class="fa-solid fa-circle-plus"></i>
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell align="center">01</TableCell>
                  <TableCell align="center">01</TableCell>
                  <TableCell align="center">02</TableCell>
                  <TableCell align="center">00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer> */}
        </Box>
      </Box>
    );
  }
}

export default BIMapping;

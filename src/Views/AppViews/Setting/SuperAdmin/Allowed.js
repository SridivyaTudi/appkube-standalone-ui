import React, { Component } from "react";
import {
  Box,
  List,
  ListItem,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import DefaultIcon from "../../../../assets/img/setting/default-icon.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { v4 } from "uuid";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    color: "#ffffff",
    maxWidth: 250,

    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    padding: "8px 10px",
  },
}));

let accessPolicyData = [
  {
    name: "Permission set",
    status: "Status",
    chlidren: [
      {
        name: "Environment",
       
      },
    ],
  },
];
class Allowed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessPolicy: accessPolicyData,
      selectedPolicy: [],
    };
  }
  // Render the table parent view
  renderAccessPolicyTable = () => {
    let { accessPolicy, selectedPolicy } = this.state;
    if (accessPolicy?.length) {
      return accessPolicy.map((policy, index) => {
        let arrowDownOrRight = selectedPolicy.includes(index)
          ? "down"
          : "right";
        let childDataShow =
          selectedPolicy.includes(index) && policy?.chlidren?.length;
        return (
          <Table key={v4()}>
            <TableHead onClick={() => this.onClickAccessPolicy(index)}>
              <TableRow>
                <TableCell align="left">
                  <span>
                    <i class={`fas fa-chevron-${arrowDownOrRight}`}></i>
                  </span>
                  <strong>{policy.name}</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>{policy.status}</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {childDataShow ? (
                this.renderAccessPolicyChild(policy.chlidren, index)
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        );
      });
    }
  };

  /**
   * Render the table child view
   *  @param {Array} data - child data as array of object
   *  @param {String} parentIndex - parent index
   */
  renderAccessPolicyChild = (data, parentIndex) => {
    let { selectedPolicy } = this.state;
    return data.map((subchild, childIndex) => {
      let currentNode = `${parentIndex}_${childIndex}`;
      let isActive = selectedPolicy.includes(currentNode);
      let arrowDownOrRight = isActive ? "down" : "right";
      let childDataShow =
        selectedPolicy.includes(currentNode) && subchild?.chlidren?.length;
      return (
        <TableRow
          key={v4()}
          onClick={(e) => {
            e.stopPropagation();
            this.onClickAccessPolicy(currentNode);
          }}
          className={`${isActive ? "active" : ""}`}
        >
          <TableCell align="left">
            <span>
              <i class={`fas fa-chevron-${arrowDownOrRight}`}></i>
            </span>
            {subchild.name}

            {childDataShow ? (
              this.renderAccessPolicyChild(subchild?.chlidren, currentNode)
            ) : (
              <></>
            )}
          </TableCell>
          <TableCell>
            <Box className="d-flex roles-box">
              <HtmlTooltip
                className="table-tooltip d-flex"
                title={
                  <React.Fragment>
                    <span>This role created by default by the system</span>
                  </React.Fragment>
                }
              >
                <Box classname="permitted-box">Permitted</Box>
              </HtmlTooltip>
            </Box>
          </TableCell>
        </TableRow>
      );
    });
  };

  /**
   * Fire click event on node
   *  @param {String} currentNode - selected index
   */
  onClickAccessPolicy = (currentNode) => {
    let { selectedPolicy } = this.state;
    let isExistNode = selectedPolicy.filter((policy) => policy === currentNode);

    if (isExistNode.length) {
      selectedPolicy = selectedPolicy.filter(
        (policy) => policy !== currentNode
      );
    } else {
      selectedPolicy.push(currentNode);
    }

    this.setState({ selectedPolicy });
  };
  render() {
    const {} = this.state;
    return (
      <Box className="environment-table">
        <TableContainer className="table">
          {this.renderAccessPolicyTable()}
        </TableContainer>
      </Box>
    );
  }
}

export default Allowed;

import React, { Component, Fragment } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { v4 } from "uuid";
import { Box } from "@mui/material";
class AccordionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      headers: this.props.headers || "",
      selectedNodes: [],
    };
  }

  renderTableHead = () => {
    let { headers } = this.state;
    if (headers?.length) {
      return (
        <TableRow>
          {headers.map((header) => (
            <TableCell key={v4()} style={header.styled}>
              {header.name}
            </TableCell>
          ))}
        </TableRow>
      );
    }
  };

  /**
   * Render the table  view
   *  @param {Array} data - child data as array of object
   *  @param {String} parentIndex - parent index
   */
  renderTableBody = (data, parentIndex) => {
    let { selectedNodes } = this.state;
    return data.map((subchild, childIndex) => {
      let currentNode = `${parentIndex ? `${parentIndex}_` : ""}${childIndex}`;
      let isActive = selectedNodes.includes(currentNode);
      let arrowDownOrRight = isActive ? "down" : "right";
      let childDataShow =
        selectedNodes.includes(currentNode) && subchild?.chlidren?.length;
      return (
        <Fragment key={v4()}>
          <TableRow>
            <TableCell
              width={80}
              onClick={(e) => {
                e.stopPropagation();
                this.onClickNode(currentNode);
              }}
              className={`${isActive ? "active" : ""}`}
            >
              <Box className="access-box">
                <i className={`fas fa-chevron-${arrowDownOrRight}`}></i>
                {subchild.name}
              </Box>
            </TableCell>
            {subchild.subName ? (
              <TableRow className={`${isActive ? "active" : ""}`}>
                <TableCell width={120} className="subchild-table-section">
                  <Table>{subchild.subName ? subchild.subName : <></>}</Table>
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
          </TableRow>
          {childDataShow ? (
            <TableRow>
              <TableCell colSpan={2} className="child-table-section">
                <Table>
                  {this.renderTableBody(subchild?.chlidren, currentNode)}
                </Table>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
        </Fragment>
      );
    });
  };

  /**
   * Fire click event on node
   *  @param {String} currentNode - selected index
   */
  onClickNode = (currentNode) => {
    let { selectedNodes } = this.state;
    let isExistNode = selectedNodes.filter((policy) => policy === currentNode);

    if (isExistNode.length) {
      selectedNodes = selectedNodes.filter((policy) => policy !== currentNode);
    } else {
      selectedNodes.push(currentNode);
    }
    this.setState({ selectedNodes });
  };

  render() {
    let { data } = this.state;
    return data?.length ? (
      <TableContainer component={Paper} className="access-control-table">
        <Table aria-label="collapsible table" className="table">
          <TableHead>{this.renderTableHead()}</TableHead>
          <TableBody> {this.renderTableBody(data)}</TableBody>
        </Table>
      </TableContainer>
    ) : (
      <></>
    );
  }
}

export default AccordionView;

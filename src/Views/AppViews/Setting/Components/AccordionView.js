import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { v4 } from "uuid";
class AccordionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      selectedNodes: [],
    };
  }
  // Render the table parent view
  renderParentTable = () => {
    let { data, selectedNodes } = this.state;
    if (data?.length) {
      return data.map((policy, index) => {
        let arrowDownOrRight = selectedNodes.includes(index) ? "down" : "right";
        let childDataShow =
          selectedNodes.includes(index) && policy?.chlidren?.length;
        return (
          <Table key={v4()}>
            <TableHead onClick={() => this.onClickNode(index)}>
              <TableRow>
                <TableCell align="left">
                  <span>
                    <i class={`fas fa-chevron-${arrowDownOrRight}`}></i>
                  </span>
                  <strong>{policy.name}</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {childDataShow ? (
                this.renderChildTable(policy.chlidren, index)
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
  renderChildTable = (data, parentIndex) => {
    let { selectedNodes } = this.state;
    return data.map((subchild, childIndex) => {
      let currentNode = `${parentIndex}_${childIndex}`;
      let isActive = selectedNodes.includes(currentNode);
      let arrowDownOrRight = isActive ? "down" : "right";
      let childDataShow =
        selectedNodes.includes(currentNode) && subchild?.chlidren?.length;
      return (
        <>
          <TableRow
            key={v4()}
            onClick={(e) => {
              e.stopPropagation();
              this.onClickNode(currentNode);
            }}
            className={`${isActive ? "active" : ""}`}
          >
            <TableCell align="left">
              <span>
                <i class={`fas fa-chevron-${arrowDownOrRight}`}></i>
              </span>
              {subchild.name}
            </TableCell>
          </TableRow>
          {childDataShow ? (
            <TableRow
              key={v4()}
              onClick={(e) => {
                e.stopPropagation();
                this.onClickNode(currentNode);
              }}
              className={`${isActive ? "active" : ""}`}
            >
              <TableCell align="left inner-table-section">
                {this.renderChildTable(subchild?.chlidren, currentNode)}
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
        </>
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
    return (
      <TableContainer className="table">
        {this.renderParentTable()}
      </TableContainer>
    );
  }
}

export default AccordionView;

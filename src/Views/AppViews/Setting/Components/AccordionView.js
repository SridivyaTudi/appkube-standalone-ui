import React, { Component, Fragment } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { v4 } from "uuid";
import { Box, Checkbox } from "@mui/material";
class AccordionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headers: this.props.headers || "",
      selectedNodes: [],
      selectedCheckBox: [],
    };
  }

  componentDidMount = () => {
    let data = this.props.data || [];

    if (data?.length) {
      this.setState({ data });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.selectedData !== prevProps.selectedData) {
      let selectedNodes = this.props.selectedData;
      this.setState({ selectedNodes });
    }

    if (this.props.selectedCheckBoxData !== prevProps.selectedCheckBoxData) {
      let selectedCheckBox = this.props.selectedCheckBoxData?.viewData || [];
      let { selectedCheckBox: stateCheckbox } = this.state;

      if (!selectedCheckBox?.length && stateCheckbox.length) {
        this.setState({ selectedCheckBox: [] });
      }
      this.setState({ selectedCheckBox });
    }

    if (this.props.data !== prevProps.data) {
      let data = this.props.data;

      if (data.length) {
        this.setState({ data });
      }
    }
  };

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
    let { selectedNodes, selectedCheckBox } = this.state;
    return data.map((subchild, childIndex) => {
      let currentNode = `${parentIndex ? `${parentIndex}_` : ""}${childIndex}`;
      let isActive = selectedNodes.includes(currentNode);
      let arrowDownOrRight = isActive ? "down" : "right";
      let isChildExist = subchild?.chlidren?.length ? true : false;
      let childDataShow = selectedNodes.includes(currentNode) && isChildExist;
      return (
        <Fragment key={v4()}>
          <TableRow>
            <TableCell
              width={80}
              onClick={(e) => {
                e.stopPropagation();
                isChildExist ? this.onClickNode(currentNode) : <></>;
              }}
              className={`${isActive ? "active" : ""}`}
            >
              {subchild.isCheckBoxShow ? (
                <Box className="d-inline-block check-box ">
                  <Checkbox
                    size="small"
                    className="check-box"
                    id={currentNode}
                    checked={
                      selectedCheckBox.includes(currentNode) ? true : false
                    }
                    onClick={(e) => {
                      this.onClickCheckBox(e, subchild);
                      e.stopPropagation();
                    }}
                  />
                </Box>
              ) : null}
              <Box className="access-box d-inline-block ">
                {isChildExist ? (
                  <i className={`fas fa-chevron-${arrowDownOrRight}`}></i>
                ) : null}
                {subchild.name}
              </Box>
            </TableCell>
            {subchild.subName ? (
              <TableRow className={`${isActive ? "active" : ""}`}>
                <TableCell
                  width={120}
                  className={`subchild-table-section ${
                    isActive ? "active" : ""
                  }`}
                >
                  <Table>{subchild.subName ? subchild.subName : <></>}</Table>
                </TableCell>
              </TableRow>
            ) : null}
          </TableRow>
          {childDataShow ? (
            <TableRow>
              <TableCell colSpan={2} className="child-table-section">
                <Table>
                  <TableBody>
                    {this.renderTableBody(subchild?.chlidren, currentNode)}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ) : null}
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

  // Handle check box
  onClickCheckBox = (event, extraData) => {
    let { selectedCheckBox } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      if (this.props.isSingleChecked) {
        selectedCheckBox = [id];
      } else {
        selectedCheckBox.push(id);
      }
    } else {
      if (this.props.isSingleChecked) {
        selectedCheckBox = [];
      } else {
        selectedCheckBox = selectedCheckBox.filter((value) => value !== id);
      }
    }

    this.setState({ selectedCheckBox });
    try {
      this.props.setSelectedViewData({
        selectedCheckBox,
        extraData,
        checked,
        uniqueID: id,
      });
    } catch (error) {
      console.log(error);
    }
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

import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFilterModal from "../../Components/SelectFilterModal";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { navigateRouter } from "Utils/Navigate/navigateRouter";

class BudgetProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };

  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table style={{ width: 1500 }}>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell align="center">Date created</TableCell>
          <TableCell>Product category</TableCell>
          <TableCell>High spending region</TableCell>
          <TableCell>Environment</TableCell>
          <TableCell align="center">Spending</TableCell>
          <TableCell align="center">Budget</TableCell>
          <TableCell align="center">Forecast</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    const HtmlTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.arrow}`]: {
        color: "#ffffffff",
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#ffffffff",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 150,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
      },
    }));
    let { data } = this.props;
    return (
      <TableBody>
        <TableRow>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell align="center">22/12/2023 </TableCell>
          <TableCell>3-Tier</TableCell>
          <TableCell>US-East (N.virginia)</TableCell>
          <TableCell>
            <HtmlTooltip
              className="table-tooltip"
              title={
                <React.Fragment>
                  <Box className="report-tooltip-list">
                    <List>
                      <ListItem>
                        {" "}
                        <Box className="payment-status production"></Box>{" "}
                        Production
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status testing"></Box> Testing
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status staging"></Box>{" "}
                        Development
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status development"></Box>{" "}
                        Staging
                      </ListItem>
                    </List>
                  </Box>
                </React.Fragment>
              }
            >
              <Box className="payment-status production"></Box>
              Production +3
            </HtmlTooltip>
          </TableCell>
          <TableCell align="center">
            <strong>$20,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell align="center">22/12/2023 </TableCell>
          <TableCell>3-Tier</TableCell>
          <TableCell>US-East (N.virginia)</TableCell>
          <TableCell>
            <HtmlTooltip
              className="table-tooltip"
              title={
                <React.Fragment>
                  <Box className="report-tooltip-list">
                    <List>
                      <ListItem>
                        {" "}
                        <Box className="payment-status production"></Box>{" "}
                        Production
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status testing"></Box> Testing
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status staging"></Box>{" "}
                        Development
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status development"></Box>{" "}
                        Staging
                      </ListItem>
                    </List>
                  </Box>
                </React.Fragment>
              }
            >
              <Box className="payment-status testing"></Box>Production +3
            </HtmlTooltip>
          </TableCell>
          <TableCell align="center">
            <strong>$20,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell align="center">22/12/2023 </TableCell>
          <TableCell>3-Tier</TableCell>
          <TableCell>US-East (N.virginia)</TableCell>
          <TableCell>
            <HtmlTooltip
              className="table-tooltip"
              title={
                <React.Fragment>
                  <Box className="report-tooltip-list">
                    <List>
                      <ListItem>
                        {" "}
                        <Box className="payment-status production"></Box>{" "}
                        Production
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status testing"></Box> Testing
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status staging"></Box>{" "}
                        Development
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status development"></Box>{" "}
                        Staging
                      </ListItem>
                    </List>
                  </Box>
                </React.Fragment>
              }
            >
              <Box className="payment-status staging"></Box> Production +3
            </HtmlTooltip>
          </TableCell>
          <TableCell align="center">
            <strong>$20,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell align="center">22/12/2023 </TableCell>
          <TableCell>3-Tier</TableCell>
          <TableCell>US-East (N.virginia)</TableCell>
          <TableCell>
            <HtmlTooltip
              className="table-tooltip"
              title={
                <React.Fragment>
                  <Box className="report-tooltip-list">
                    <List>
                      <ListItem>
                        {" "}
                        <Box className="payment-status production"></Box>{" "}
                        Production
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status testing"></Box> Testing
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status staging"></Box>{" "}
                        Development
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status development"></Box>{" "}
                        Staging
                      </ListItem>
                    </List>
                  </Box>
                </React.Fragment>
              }
            >
              <Box className="payment-status staging"></Box> Production +3
            </HtmlTooltip>
          </TableCell>
          <TableCell align="center">
            <strong>$20,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell align="center">22/12/2023 </TableCell>
          <TableCell>3-Tier</TableCell>
          <TableCell>US-East (N.virginia)</TableCell>
          <TableCell>
            <HtmlTooltip
              className="table-tooltip"
              title={
                <React.Fragment>
                  <Box className="report-tooltip-list">
                    <List>
                      <ListItem>
                        {" "}
                        <Box className="payment-status production"></Box>{" "}
                        Production
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status testing"></Box> Testing
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status staging"></Box>{" "}
                        Development
                      </ListItem>
                      <ListItem>
                        {" "}
                        <Box className="payment-status development"></Box>{" "}
                        Staging
                      </ListItem>
                    </List>
                  </Box>
                </React.Fragment>
              }
            >
              <Box className="payment-status development"></Box> Production +3
            </HtmlTooltip>
          </TableCell>
          <TableCell align="center">
            <strong>$20,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
          <TableCell align="center">
            <strong>$30,000</strong>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };
  render() {
    let { accounts, searchedKey, showSelectFilterModal } = this.state;
    return (
      <>
        <Box className="new-reports-container">
          <Box className="list-heading">
            <h3>Products</h3>
            <Box className="breadcrumbs">
              <ul>
                <li
                  onClick={() => {
                    this.props.navigate(`/app/new-reports/budget-dashboard`);
                  }}
                >
                  Budget Dashboard
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">Budget Products</li>
              </ul>
            </Box>
          </Box>
          <Box className="d-flex align-items-center justify-content-end m-t-2">
            <Button
              className="light-btn p-l-15 p-r-15 m-r-3"
              onClick={this.handleSelectFilterModal}
            >
              <i className="fas fa-filter m-r-2"></i> Filter
            </Button>
            <Button className="light-btn p-l-15 p-r-15">
              <i className="fas fa-calendar-minus m-r-2"></i> Last Quarter
            </Button>
          </Box>
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">Products with high spending</h4>
            <Box className="search">
              <input
                type="text"
                className="input"
                placeholder="Search Insatnce "
                value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
              <button className="button">
                <SearchOutlinedIcon />
              </button>
            </Box>
          </Box>
          <Box className="new-reports-table">{this.renderTable()}</Box>
          {showSelectFilterModal ? (
            <SelectFilterModal
              showModal={showSelectFilterModal}
              handleSelectFilterModal={this.handleSelectFilterModal}
            />
          ) : (
            <></>
          )}
        </Box>
      </>
    );
  }
}

export default navigateRouter(BudgetProducts);

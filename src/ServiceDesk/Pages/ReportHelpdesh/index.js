import React from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import OpenNewContactPopup from "../../Components/OpenNewContactPopup";
import OpenNewCompanyPopup from "../../Components/OpenNewCompanyPopup";
import OpenNewEmailPopup from "../../Components/OpenNewEmailPopup";
import OpenNewTicketPopup from "../../Components/OpenNewTicketPopup";
import OpenNewScheduleReports from "../../Components/OpenNewScheduleReports";

class ReportHelpdesh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateMenu: false,
      TicketsData: [
        {
          NoOfTickets: "500",
          TicketStatus: "Created Tickets",
        },
        {
          NoOfTickets: "200",
          TicketStatus: "Resolved Tickets",
        },
        {
          NoOfTickets: "100",
          TicketStatus: "Unresolved Tickets",
        },
        {
          NoOfTickets: "150",
          TicketStatus: "Reopen Tickets",
        },
        {
          NoOfTickets: "2 Min 3 Sec",
          TicketStatus: "Average 1st Response Time",
        },
        {
          NoOfTickets: "5 Min 20 Sec",
          TicketStatus: "Average Response Time",
        },

        {
          NoOfTickets: "23 Min 10 Sec",
          TicketStatus: "Average Resolution Time",
        },
        {
          NoOfTickets: "10 Min 2 Sec",
          TicketStatus: "Average 1st Assign Time",
        },
        {
          NoOfTickets: "20%",
          TicketStatus: "First Contact Resolution",
        },
        {
          NoOfTickets: " 90%",
          TicketStatus: "First response SLA",
        },
        {
          NoOfTickets: "50%",
          TicketStatus: "Resolution SLA",
        },
      ],
    };
    this.openNewContactRef = React.createRef();
    this.openNewCompanyRef = React.createRef();
    this.openNewEmailRef = React.createRef();
    this.openNewTicketRef = React.createRef();
    this.openNewScheduleReportsRef = React.createRef();
  }

  onClickOpenNewContact = (e) => {
    this.openNewContactRef.current.toggle();
  };

  onClickOpenNewCompany = (e) => {
    this.openNewCompanyRef.current.toggle();
  };

  onClickOpenNewEmail = (e) => {
    this.openNewEmailRef.current.toggle();
  };

  onClickOpenNewTicket = (e) => {
    this.openNewTicketRef.current.toggle();
  };

  onClickOpenNewScheduleReports = (e) => {
    this.openNewScheduleReportsRef.current.toggle();
  };

  onClickOpenSubLink = () => {
    let menu = !this.state.openCreateMenu;
    this.setState({
      openCreateMenu: menu,
    });
  };

  displayTicketData = () => {
    const { TicketsData } = this.state;
    let retData = [];
    for (let i = 0; i < TicketsData.length; i++) {
      let row = TicketsData[i];
      retData.push(
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <div className="d-block text-center desk-box">
            <Link
              to="/servicedesk/pages/charts"
              className="d-block text-center"
            >
              <div className="d-block text-right icon">
                <button className="white-button min-width-inherit width-auto m-r-0">
                  <i className="fa fa-eye"></i>
                </button>
              </div>
              <div className="d-block number">{row.NoOfTickets}</div>
              <div className="d-block text">{row.TicketStatus}</div>
            </Link>
          </div>
        </div>
      );
    }
    return retData;
  };

  render() {
    const { openCreateMenu } = this.state;
    return (
      <div className="servicedesk-dashboard-container">
        <div className="servicedesk-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="page-heading">
                  <h1>Reports</h1>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 text-right">
                <a
                  href="#"
                  onClick={this.onClickOpenSubLink}
                  className="blue-button m-r-0 min-width-inherit width-auto create-btn"
                >
                  Create
                </a>
                {openCreateMenu == true && (
                  <div>
                    <div
                      className="open-full-screen"
                      onClick={this.onClickOpenSubLink}
                    ></div>
                    <div className="text-center open-create-menu">
                      <a onClick={this.onClickOpenNewTicket}>Ticket</a>
                      <a onClick={this.onClickOpenNewEmail}>Email</a>
                      <a onClick={this.onClickOpenNewContact}>Contact</a>
                      <a onClick={this.onClickOpenNewCompany}>Company</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 filter-container">
            <div className="row report-filter">
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="selecttimeperiod">Select Time Period</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1 Sept 2020 - 31 Sept 2020"
                  />
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="agents">Agents</label>
                  <select className="form-control">
                    <option>Select Agents</option>
                    <option>Jeremy Griffin</option>
                    <option>Timothy Dean</option>
                    <option>Andreea Baker</option>
                    <option>Kevin Reyes</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="groups">Groups</label>
                  <select className="form-control">
                    <option>Select Groups</option>
                    <option>Billings</option>
                    <option>Escalations</option>
                    <option>Product Management</option>
                    <option>QA</option>
                    <option>Replacements</option>
                    <option>Sales</option>
                    <option>Unassigned</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="customer">Customer</label>
                  <select className="form-control">
                    <option>Select Due by</option>
                    <option>Customer 1</option>
                    <option>Customer 2</option>
                    <option>Customer 3</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="type">Type</label>
                  <select className="form-control">
                    <option>Select Type</option>
                    <option>None</option>
                    <option>Question</option>
                    <option>Problem</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="source">Source</label>
                  <select className="form-control">
                    <option>Select Source</option>
                    <option>Email</option>
                    <option>Portal</option>
                    <option>Forum</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="priority">Priority</label>
                  <select className="form-control">
                    <option>Select Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="p-t-20 form-group filter-control-group">
                  <a
                    href="#"
                    className="blue-button m-r-0 m-b-0 apply-filters-button"
                  >
                    Apply Filters
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="common-container border-bottom-0 desk-depth-container">
            <div className="d-block p-b-20">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="d-block p-b-10 heading">
                    <h2 className="d-block m-b-0">Help Desk In-Depth</h2>
                    <span className="d-block">Last update 30 mins ago</span>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="d-block text-right filters-buttons">
                    <button className="blue-button min-width-inherit width-auto">
                      Hide Filters
                    </button>
                    <button
                      className="white-button min-width-inherit width-auto"
                      onClick={this.onClickOpenNewScheduleReports}
                    >
                      <i className="fa fa-file"></i>
                    </button>
                    <button className="white-button min-width-inherit width-auto m-r-0">
                    <i class="far fa-calendar-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block">
              <div className="row">{this.displayTicketData()}</div>
            </div>
          </div>
        </div>
        <OpenNewContactPopup ref={this.openNewContactRef} />
        <OpenNewCompanyPopup ref={this.openNewCompanyRef} />
        <OpenNewEmailPopup ref={this.openNewEmailRef} />
        <OpenNewTicketPopup ref={this.openNewTicketRef} />
        <OpenNewScheduleReports ref={this.openNewScheduleReportsRef} />
      </div>
    );
  }
}

export default ReportHelpdesh;

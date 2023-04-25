import React from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import ticketIconImage1 from "../../img/ticket-icon-img1.png";
import { Line } from "react-chartjs-2";
import Table from "./../../Components/Table";
import { RestService } from "../_service/RestService";
import Rbac from "../Rbac/Rbac";
import CreateButtonComponent from "../CommanComponents/CreateButtonComponent";
// import DatePicker from "react-date-picker";
// import "react-datepicker/dist/react-datepicker.css";
import OpenEditTicketPopup from "../../Components/OpenEditTicketPopup";

class Dashboard extends React.Component {
  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "rgba(240, 243, 247, 1)",
          },
          ticks: {
            stepSize: 10,
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(240, 243, 247, 1)",
          },
          ticks: {
            stepSize: 10,
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: false,
      position: "bottom",
    },
  };

  constructor(props) {
    super(props);
    const res = async () => {
      const res = await fetch(config.SERVICEDESK_API_URL + "/api/tickets", {
        method: "get",
      }).then((response) => response.json());
      return res;
    };
    this.openEditTicketRef = React.createRef();
    console.log("data in constructor", res());
    this.perPageLimit = 2;
    this.checkboxValue = false;
    this.state = {
      LineChartData: {
        responsive: true,
        labels: [],
        datasets: [
          {
            label: "Hours",
            lineTension: 0.4,
            fill: false,
            borderColor: "rgba(0, 170, 240, 1)",
            data: [],
          },
        ],
      },
      openCreateMenu: false,
      columns: [
        {
          label: "ID",
          key: "id",
        },
        {
          label: "Requester Name",
          key: "requesterName",
        },
        {
          label: "Subjects",
          key: "subject",
        },
        {
          label: "Status",
          key: "status",
          renderCallback: (value) => {
            let strClass = "";
            if (value === "Open") {
              strClass = "yellow-green";
            } else if (value === "Closed") {
              strClass = "red";
            } else if (value === "Pending") {
              strClass = "orange";
            }
            return (
              <td>
                <span className={strClass}>{value}</span>
              </td>
            );
          },
        },
        {
          label: "Priority",
          key: "priority",
        },
        {
          label: "Assignee",
          key: "assignedToName",
        },
        {
          label: "Create Date",
          key: "createDate",
        },
        {
          label: "Action",
          key: "action",
          renderCallback: (value, ticketObj) => {
            return (
              <td>
                <div className="d-inline-block">
                  <Rbac
                    parentName={config.PARENT_NAME}
                    childName="dashborad-index-tickettbl-editbtn"
                  >
                    <button
                      className="btn btn-link"
                      onClick={(e) => this.onClickOpenEditTicket(e, ticketObj)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </Rbac>
                  <Rbac
                    parentName={config.PARENT_NAME}
                    childName="dashborad-index-tickettbl-deletebtn"
                  >
                    <button className="btn btn-link">
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </Rbac>
                </div>
              </td>
            );
          },
          isCaseInsensitive: true,
        },
      ],
      ticketDataList: [],
      ticketingData: [],
      performerAgentsData: [
        {
          agentName: "Spruce Springclean",
          ticket: "89",
          responseRate: "91",
        },
        {
          agentName: "Archibald Northbottom",
          ticket: "75",
          responseRate: "85",
        },
        {
          agentName: "Rodney Artichoke",
          ticket: "60",
          responseRate: "70",
        },
        {
          agentName: "Gustav Purpleson",
          ticket: "53",
          responseRate: "63",
        },
      ],
      selectedDate: new Date(),
    };
  }
  LineChartData = {
    responsive: true,
    labels: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
    datasets: [
      {
        label: "Hours",
        lineTension: 0.4,
        fill: false,
        borderColor: "rgba(0, 170, 240, 1)",
        data: [
          10, 25, 15, 9, 30, 34, 35, 35, 15, 10, 25, 30, 40, 46, 49, 33, 40, 42,
          33, 35, 48, 50,
        ],
      },
    ],
  };

  displayTicketingData() {
    const { ticketingData } = this.state;
    const retData = [];
    for (let i = 0; i < ticketingData.length; i++) {
      const data = ticketingData[i];
      retData.push(
        <div className="col-xl-5 col-lg-4 col-md-6 col-sm-12" key={data.ticketingname}>
          <div className="d-block text-center ticketing-box">
            <Link
              to={`${config.basePath}/opentickets?type=${data.ticketingname}`}
            >
              <div className="image">
                <img src={ticketIconImage1} alt="" />
              </div>
              <div className="number">{data.ticketingNumber}</div>
              <div className="name">{data.ticketingname}</div>
            </Link>
          </div>
        </div>
      );
    }
    return retData;
  }
  onClickOpenEditTicket = (e, selectedTicket) => {
    this.openEditTicketRef.current.toggle(selectedTicket);
  };
  async componentDidMount() {
    try {
      await RestService.getData(
        config.GET_ALL_TICKET_FOR_TABLE_URL + "?pageType=all",
        null,
        null
      ).then((response) => {
        this.setState({
          ticketDataList: response,
        });
      });
    } catch (err) {
      console.log("Loading ticket data failed. Error: ", err);
    }
    try {
      await RestService.getData(
        config.GET_ALL_TICKETING_DATA_URL,
        null,
        null
      ).then((response) => {
        this.setState({
          ticketingData: response,
        });
      });
    } catch (err) {
      console.log("Loading ticketing data failed. Error: ", err);
    }
    try {
      await RestService.getData(
        config.GET_TOP_PERFORMER_DATA_URL,
        null,
        null
      ).then((response) => {
        this.setState({
          performerAgentsData: response,
        });
      });
    } catch (err) {
      console.log("Loading top performer data failed. Error: ", err);
    }
    try {
      await RestService.getData(
        config.GET_TODAYS_TICKETS__TREDNDS_DATA_URL,
        null,
        null
      ).then((response) => {
        const { LineChartData } = this.state;
        let dataSets = [
          ...LineChartData.datasets.slice(0, 0),
          Object.assign({}, LineChartData.datasets[0], {
            data: response.numberOfTicketsList,
          }),
        ];
        this.setState({
          LineChartData: {
            ...LineChartData,
            labels: response.hoursList,
            datasets: dataSets,
          },
        });
      });
    } catch (err) {
      console.log("Loading Bar stat data failed. Error: ", err);
    }
  }
  onClickOpenSubLink = () => {
    let menu = !this.state.openCreateMenu;
    this.setState({
      openCreateMenu: menu,
    });
  };
  updateTicketList = (ticketList) => {
    console.log("Updated ticket list :::: ", ticketList);
    this.setState({
      ticketDataList: ticketList,
    });
  };

  performerAgentsData() {
    const { performerAgentsData } = this.state;
    const retData = [];
    for (let i = 0; i < performerAgentsData.length; i++) {
      const data = performerAgentsData[i];
      retData.push(
        <tr key={data.agentName}>
          <td>
            <span className="image"></span> {data.agentName}
          </td>
          <td>{data.ticket} Tickets</td>
          <td>{data.responseRate} %</td>
        </tr>
      );
    }
    return retData;
  }

  setDate = (value) => {
    this.setState({
      selectedDate: value,
    });
  };

  getSelectedDateStr = () => {
    const { selectedDate } = this.state;
    if (selectedDate) {
      return selectedDate.toDateString();
    }
    return "";
  };
  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    const { ticketDataList, columns, LineChartData, selectedDate } = this.state;
    return (
      <div className="servicedesk-dashboard-container">
        <div className="servicedesk-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="page-heading">
                  <h1>Dashboard</h1>
                  <span>Complete Overview of the Tickets</span>
                </div>
              </div>
              <CreateButtonComponent />
            </div>
          </div>
          <div className="common-container border-bottom-0 p-b-0">
            <div className="row">{this.displayTicketingData()}</div>
          </div>
          <div className="common-container border-bottom-0 p-t-0">
            <div className="row">
              <div className="col-lg-7 col-md-12 col-sm-12 ticket-trends-main">
                <div className="ticket-trends">
                  <div className="row">
                    <div className="col-lg-5 col-md-12 col-sm-12">
                      <div className="d-block heading">
                        <h3 className="d-block mb-0">Today's Ticket Trends</h3>
                        <span className="d-block mb-0">
                          {this.getSelectedDateStr()}
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-12 col-sm-12 text-right">
                      <div className="d-inline-block v-a-top calendar-box">
                        {/* <DatePicker
                          onChange={this.setDate}
                          value={selectedDate}
                          format="dd-MM-y"
                          clearIcon={null}
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="d-block p-t-20 width-100 ticket-graphs">
                    <div
                      className="d-block width-100"
                      style={{ height: "100%" }}
                    >
                      <Line
                        data={LineChartData}
                        options={this.lineChartOptions}
                      />
                      <div className="d-block text-center p-t-5 hours-text">
                        Hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 performer-agents-main">
                <div className="performer-agents">
                  <div className="heading">Top Performer Help Agents</div>
                  <table className="performer-agents-table">
                    <thead>
                      <tr>
                        <th>Agent Name</th>
                        <th>Tickets</th>
                        <th>Response Rate</th>
                      </tr>
                    </thead>
                    <tbody>{this.performerAgentsData()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="d-block p-t-20 dashboard-all-ticket-tabel">
              <div className="d-block p-b-10 heading">
                <h2 className="d-block m-b-0">
                  <Link to={`${config.basePath}/tickets`}>All Tickets</Link>
                </h2>
                <span className="d-block">
                  List of ticket opened by Customer
                </span>
              </div>
              <Table
                valueFromData={{ columns: columns, data: ticketDataList }}
                perPageLimit={this.perPageLimit}
                visiblecheckboxStatus={this.checkboxValue}
                tableClasses={{
                  table: "ticket-tabel",
                  tableParent: "d-block p-t-5 tickets-tabel",
                  parentClass: "all-support-ticket-tabel",
                }}
                searchKey="requesterName"
                showingLine="Showing %start% to %end% of %total% Tickets"
                dark={!this.isLightTheme()}
              />
            </div>
          </div>
        </div>
        <OpenEditTicketPopup
          onSaveUpdate={this.updateTicketList}
          ref={this.openEditTicketRef}
        />
      </div>
    );
  }
}

export default Dashboard;

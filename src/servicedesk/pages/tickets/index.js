import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { config } from "../../config";
import Table from "./../../components/Table";
import { RestService } from "../_service/RestService";
import CreateButtonComponent from "../commanComponents/CreateButtonComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

class Tickets extends React.Component {
  barChartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: "right",
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "#fff",
          },
          ticks: {
            fontColor: "#fff",
            fontSize: 12,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "#fff",
          },
          ticks: {
            fontColor: "rgba(169, 185, 198, 1)",
            fontSize: 12,
          },
        },
      ],
    },
  };
  constructor(props) {
    super(props);
    this.tableValue = {
      columns: [
        {
          label: "ID",
          key: "index",
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
          key: "assignee",
        },
        {
          label: "Create Date",
          key: "createDate",
        },
        {
          label: "Agents",
          key: "agents",
        },
        {
          label: "Groups",
          key: "groups",
        },
      ],
      data: [
        {
          index: "#27",
          requesterName: "Rodney Artichoke",
          subject: "I need help with aading a New Contact....",
          status: "Open",
          priority: "Low",
          assignee: "Fergus Douchebag",
          createDate: "10 July 2020",
          agents: "Jacob Jones",
          groups: "Billings",
          checkStatus: false,
        },
        {
          index: "#39",
          requesterName: "Chaplain Mondover",
          subject: "I need help with aading a New Contact data to be pre...",
          status: "Closed",
          priority: "Medium",
          assignee: "Bodrum Salvador",
          createDate: "12 July 2020",
          agents: "Jacob Jones",
          groups: "Billings",
          checkStatus: false,
        },
        {
          index: "#47",
          requesterName: "Rodney Artichoke",
          subject: "Mobile Campaign",
          status: "Pending",
          priority: "Low",
          assignee: "Inverness McKenzie",
          createDate: "15 July 2020",
          agents: "Jacob Jones",
          groups: "Billings",
          checkStatus: false,
        },
        {
          index: "#52",
          requesterName: "Inverness McKenzie",
          subject: "Service related announcements",
          status: "Open",
          priority: "Hign",
          assignee: "Abraham Pigeon",
          createDate: "16 July 2020",
          agents: "Jacob Jones",
          groups: "Billings",
          checkStatus: false,
        },
        {
          index: "#87",
          requesterName: "Douglas Lyphe",
          subject: "I need help with aading a New Contact....",
          status: "Closed",
          priority: "Low",
          assignee: "Fergus Douchebag",
          createDate: "19 July 2020",
          agents: "Jacob Jones",
          groups: "Billings",
          checkStatus: false,
        },
        {
          index: "#92",
          requesterName: "Theodore Handle",
          subject: "Adding a payment methods",
          status: "Pending",
          priority: "Low",
          assignee: "Jarvis Pepperspray",
          createDate: "22 July 2020",
          agents: "Jacob Jones",
          groups: "Billings",
          checkStatus: false,
        },
        {
          index: "#27",
          requesterName: "Rodney Artichoke",
          subject: "I need help with aading a New Contact....",
          status: "Open",
          priority: "Low",
          assignee: "Fergus Douchebag",
          createDate: "10 July 2020",
          agents: "Jacob Jones",
          groups: "Billings",
          checkStatus: false,
        },
        {
          index: "#27",
          requesterName: "Rodney Artichoke",
          subject: "I need help with aading a New Contact....",
          status: "Open",
          priority: "Low",
          assignee: "Fergus Douchebag",
          createDate: "10 July 2020",
          agents: "Jacob Jones",
          groups: "Billings",
          checkStatus: false,
        },
      ],
    };
    this.perPageLimit = 3;
    this.checkboxValue = false;
    this.state = {
      openCreateMenu: false,
      quickStat: {
        unresolvedTicketsPercentage: 0,
        totalTickets: 0,
        opentTicketsPercentage: 0,
        closedTicktsPercentage: 0,
      },
      barChartData: {
        labels: [],
        datasets: [
          {
            type: "bar",
            label: "",
            backgroundColor: "rgba(222, 233, 249, 1)",
            borderColor: "rgba(222, 233, 249, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(222, 233, 249, 1)",
            hoverBorderColor: "rgba(222, 233, 249, 1)",
            data: [],
          },
          {
            label: "",
            backgroundColor: "#fff",
            data: [],
            type: "line",
            pointRadius: 4,
            pointBackgroundColor: function (context) {
              var index = context.dataIndex;
              var value = context.dataset.data[index];
              return value < 20
                ? "#438AFB" // draw negative values in red
                : value > 20 && value <= 30
                ? "#FB7CA4" // else, alternate values in blue and green
                : "#FBB48B";
            },
            borderColor: "#fff",
          },
        ],
      },
    };
  }
  async componentDidMount() {
    try {
      await RestService.getData(
        config.GET_REPORT_QUICK_STAT_URL,
        null,
        null
      ).then((response) => {
        this.setState({
          quickStat: response,
        });
      });
    } catch (err) {
      console.log("Loading quick stat data failed. Error: ", err);
    }
    try {
      await RestService.getData(
        config.GET_GRAPH_STAT_DATA_URL,
        null,
        null
      ).then((response) => {
        const { barChartData } = this.state;
        let data1 = [
          ...barChartData.datasets.slice(0, 0),
          Object.assign({}, barChartData.datasets[0], {
            data: response.numberOfTicketsList,
          }),
          Object.assign({}, barChartData.datasets[1], {
            data: response.numberOfTicketsList,
          }),
          ...barChartData.datasets[0].data.slice(0 + 1),
          ...barChartData.datasets[0].data.slice(1 + 1),
        ];
        this.setState({
          barChartData: {
            ...barChartData,
            labels: response.daysList,
            datasets: data1,
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
  barChartData = {
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
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
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
    ],
    datasets: [
      {
        type: "bar",
        label: "",
        backgroundColor: "rgba(222, 233, 249, 1)",
        borderColor: "rgba(222, 233, 249, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(222, 233, 249, 1)",
        hoverBorderColor: "rgba(222, 233, 249, 1)",
        data: [
          5, 10, 12, 15, 20, 4, 10, 13, 17, 16, 20, 22, 13, 17, 15, 14, 16, 18,
          16, 17, 12, 22, 23, 21, 5, 10, 12, 15, 20, 4, 10, 13, 17, 16, 20, 22,
          13, 17, 15, 14, 20, 30,
        ],
      },
      {
        label: "",
        backgroundColor: "#fff",
        data: [
          5, 10, 12, 15, 20, 4, 10, 13, 17, 16, 20, 22, 13, 17, 15, 14, 16, 18,
          16, 17, 12, 22, 23, 21, 5, 10, 12, 15, 20, 4, 10, 13, 17, 16, 20, 22,
          13, 17, 15, 14, 20, 30,
        ],
        type: "line",
        pointRadius: 4,
        pointBackgroundColor: function (context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          return value < 20
            ? "#438AFB" // draw negative values in red
            : value > 20 && value <= 30
            ? "#FB7CA4" // else, alternate values in blue and green
            : "#FBB48B";
        },
        borderColor: "#fff",
      },
    ],
  };
  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    const { quickStat, barChartData } = this.state;
    return (
      <div className="servicedesk-dashboard-container">
        <div className="servicedesk-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="page-heading">
                  <h1>Quick Statistics</h1>
                  <span>List of ticket opened by Customer</span>
                </div>
              </div>
              <CreateButtonComponent />
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="d-inline-block tickets-number-box">
                  <h3 className="d-block m-b-5 red">
                    {quickStat.totalTickets}
                  </h3>
                  <span className="d-block">Total No.of Tickets</span>
                </div>
              </div>
              <div className="col-lg-7 col-md-8 col-sm-12">
                <div className="d-block w-100 text-right">
                  <div className="d-inline-block tickets-number-box">
                    <h3 className="d-block m-b-5 blue">
                      {quickStat.opentTicketsPercentage}%
                    </h3>
                    <span className="d-block">Open Tickets</span>
                  </div>
                  <div className="d-inline-block tickets-number-box">
                    <h3 className="d-block m-b-5 orange">
                      {quickStat.unresolvedTicketsPercentage}%
                    </h3>
                    <span className="d-block">Unresolved Tickets</span>
                  </div>
                  <div className="d-inline-block tickets-number-box">
                    <h3 className="d-block m-b-5 red">
                      {quickStat.closedTicktsPercentage}%
                    </h3>
                    <span className="d-block">Closed Tickets</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-12 text-right">
                <div className="form-group quarter-form">
                  <select className="form-control" id="Quarter">
                    <option value="" selected>
                      Select Quarter
                    </option>
                    <option value="Quater1">Quarter 1</option>
                    <option value="Quater2">Quarter 2</option>
                    <option value="Quater3">Quarter 3</option>
                    <option value="Quater4">Quarter 4</option>
                    <option value="CustomRange">Custom Range</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="d-block width-100 chart-inner">
              <Bar data={barChartData} options={this.barChartOptions} />
            </div>
          </div>
          <div className="common-container border-bottom-0 filter-container">
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Agents">Agents</label>
                  <select className="form-control" id="Agents">
                    <option value="" selected>
                      Select Agent
                    </option>
                    <option value="JeremyGriffin">Jeremy Griffin</option>
                    <option value="TimothyDean">Timothy Dean</option>
                    <option value="AndreeaDaker">Andreea Daker</option>
                    <option value="KevinReyes">Kevin Reyes</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Groups">Groups</label>
                  <select className="form-control" id="Groups">
                    <option value="" selected>
                      Select Groups
                    </option>
                    <option value="Billings">Billings</option>
                    <option value="Escalation">Escalation</option>
                    <option value="ProductManagment">Product Managment</option>
                    <option value="QA">QA</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Created">Created</label>
                  <select className="form-control" id="Created">
                    <option value="" selected>
                      Select Created
                    </option>
                    <option value="AnyTime">Any Time</option>
                    <option value="Whithin30">Whithin 30</option>
                    <option value="Whithin1hour">Whithin 1 hour</option>
                    <option value="Whithin6hour">Whithin 6 hour</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="dueby">Due by</label>
                  <select className="form-control" id="dueby">
                    <option value="" selected>
                      Select Due by
                    </option>
                    <option value="overdue">Overdue</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="next8hours">Next 8 Hours</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Status">Status</label>
                  <select className="form-control" id="Status">
                    <option value="" selected>
                      Select Status
                    </option>
                    <option value="AllUnresolved">All Unresolved</option>
                    <option value="Open">Open</option>
                    <option value="Pendding">Pendding</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Priority">Priority</label>
                  <select className="form-control" id="Priority">
                    <option value="" selected>
                      Select Priority
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Type">Type</label>
                  <select className="form-control" id="Type">
                    <option value="" selected>
                      Select Type
                    </option>
                    <option value="None">None</option>
                    <option value="Question">Question</option>
                    <option value="Problem">Problem</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Source">Source</label>
                  <select className="form-control" id="Source">
                    <option value="" selected>
                      Select Source
                    </option>
                    <option value="Email">Email</option>
                    <option value="Portal">Portal</option>
                    <option value="Forum">Forum</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Tags">Tags</label>
                  <select className="form-control" id="Tags">
                    <option value="" selected>
                      Select Tags
                    </option>
                    <option value="CPU">CPU</option>
                    <option value="Memory">Memory</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Companies">Companies</label>
                  <select className="form-control" id="Companies">
                    <option value="" selected>
                      Select Company
                    </option>
                    <option value="CompanyName1">Company Name 1</option>
                    <option value="CompanyName2">Company Name 2</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="form-group filter-control-group">
                  <label htmlFor="Contacts">Contacts</label>
                  <select className="form-control" id="Contacts">
                    <option value="" selected>
                      Select Contacts
                    </option>
                    <option value="Any">Any</option>
                    <option value="ListOfContacts">List of Contacts</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="p-t-20 form-group">
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
          <div className="common-container border-bottom-0 p-t-0">
            <div className="all-support-ticket-tabel">
              <div className="d-block p-b-10 heading">
                <h2 className="d-block m-b-0">All Support Tickets</h2>
                <span className="d-block">
                  List of ticket opened by Customer
                </span>
              </div>
              <Table
                valueFromData={this.tableValue}
                perPageLimit={this.perPageLimit}
                visiblecheckboxStatus={this.checkboxValue}
                tableClasses={{
                  table: "ticket-tabel",
                  tableParent: "d-block p-t-5 tickets-tabel",
                  parentClass: "all-support-ticket-tabel",
                }}
                searchKey="subject"
                showingLine="Showing %start% to %end% of %total% Tickets"
                dark={!this.isLightTheme()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tickets;

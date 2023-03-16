import React from "react";
import Table from "./../../components/table";
import CreateButtonComponent from "../commanComponents/CreateButtonComponent";
import { RestService } from "../_service/RestService";
import { config } from "../../config";
import UnimplementedFeaturePopup from "../../components/UnimplementedFeaturePopup";

class MySelectObj {
  id;
  name;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class OpenTickets extends React.Component {
  unimplementedFeatureModalRef;
  perPageLimit;
  tableValue;
  checkboxValue;
  constructor(props) {
    super(props);
    this.perPageLimit = 6;
    this.checkboxValue = false;
    this.state = {
      allAgents: [],
      allContacts: [],
      allCompanies: [],
      agentNameList: [],
      contactNameList: [],
      companyNameList: [],
      agent: "",
      created: "",
      dueBy: "",
      status: "",
      priority: "",
      type: "",
      tags: "",
      company: "",
      contact: "",
      filterCheckbox: false,

      page_type: "",
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
          label: "Type",
          key: "type",
        },
        {
          label: "Tags",
          key: "tags",
        },
        {
          label: "Requester Company",
          key: "requesterCompany",
        },
        {
          label: "Create Date",
          key: "createDate",
        },
        {
          label: "Expected Date Of Complection",
          key: "expectedDateOfCompletion",
        },
      ],
      ticketDataList: [],
    };
  }
  onClickUnImplementedFeature = (link) => {
    this.unimplementedFeatureModalRef.current.setLink(link);
    this.unimplementedFeatureModalRef.current.toggle();
  };
  async componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pageType = urlParams.get("type");
    this.setState({
      page_type: pageType,
    });
    try {
      await RestService.getData(
        config.GET_ALL_TICKET_FOR_TABLE_URL + "?pageType=" + pageType,
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
      await RestService.getData(config.GET_ALL_AGENT_URL, null, null).then(
        (response) => {
          let ary = [];
          // let obj = new MySelectObj("", "Select Agent");
          // ary.push(obj);
          for (let i = 0; i < response.length; i++) {
            let obj = new MySelectObj(response[i].id, response[i].name);
            ary.push(obj);
          }
          this.setState({
            agentNameList: ary,
            allAgents: response,
          });
        }
      );
    } catch (err) {
      console.log("Loading agent data failed. Error: ", err);
    }
    try {
      await RestService.getData(config.GET_ALL_CONTACT_URL, null, null).then(
        (response) => {
          let contactNameAry = [];
          // let obj = new MySelectObj('', 'Select Contact');
          let contactNameObj = new MySelectObj("", "Select Contact");
          for (let i = 0; i < response.length; i++) {
            // obj = new MySelectObj(response[i].id, response[i].userName + ' => ' + response[i].primaryEmail);
            contactNameObj = new MySelectObj(
              response[i].id,
              response[i].userName
            );
            contactNameAry.push(contactNameObj);
          }
          this.setState({
            allContacts: response,
            contactNameList: contactNameAry,
          });
        }
      );
    } catch (err) {
      console.log("Loading contact data failed. Error: ", err);
    }
    try {
      await RestService.getData(config.GET_ALL_COMPANIES_URL, null, null).then(
        (response) => {
          let ary = [];
          let obj = new MySelectObj("", "Select Company");
          for (let i = 0; i < response.length; i++) {
            obj = new MySelectObj(response[i].id, response[i].companyName);
            ary.push(obj);
          }
          this.setState({
            companyNameList: ary,
            allCompanies: response,
          });
        }
      );
    } catch (err) {
      console.log("Loading company data failed. Error: ", err);
    }
  }
  createSelectboxOptions = (data) => {
    let retData = [];
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        retData.push(
          <option value={item.name} key={item.name}>
            {item.name}
          </option>
        );
      }
    }
    return retData;
  };

  onClickOpenSubLink = () => {
    let menu = !this.state.openCreateMenu;
    this.setState({
      openCreateMenu: menu,
    });
  };
  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      filterCheckbox: true,
    });
  };
  applyFilters = () => {
    const {
      ticketDataList,
      agent,
      created,
      dueBy,
      status,
      priority,
      type,
      tags,
      company,
      contact,
    } = this.state;
    const retData = [];
    if (ticketDataList && ticketDataList.length > 0) {
      const length = ticketDataList.length;
      for (let i = 0; i < length; i++) {
        const ticket = ticketDataList[i];
        const ticketKeys = Object.keys(ticket);
        const lowerCaseKeys = ticketKeys.map((key) => key.toLocaleLowerCase());
        let isMatched = true;
        if (agent) {
          let index = lowerCaseKeys.indexOf("assignedtoname");
          if (index !== -1) {
            let key = ticketKeys[index];
            let data = ticket[key];
            if (data) {
              isMatched = agent === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && created) {
        }
        if (isMatched && dueBy) {
          let index = lowerCaseKeys.indexOf("expecteddateofcompletion");
          if (index !== -1) {
            let key = ticketKeys[index];
            let data = ticket[key];

            if (data) {
              var today = new Date();
              var dd = today.getDate();
              var mm = today.getMonth() + 1;
              var day;
              var month;
              var year;
              if (dd < 10) {
                day = "0" + dd.toString();
              }

              if (mm < 10) {
                month = "0" + mm.toString();
              }
              var todayDate = year + "-" + month + "-" + day;

              if (dueBy == "overdue") {
                isMatched = todayDate > data;
              } else if (dueBy == "today") {
                isMatched = todayDate == data;
              } else if (dueBy == "tomorrow") {
                var tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                dd = tomorrow.getDate();
                mm = tomorrow.getMonth();
                year = tomorrow.getFullYear();
                var tomorrowDay;
                var tomorrowMonth;
                if (dd < 10) {
                  tomorrowDay = "0" + dd.toString();
                }

                if (mm < 10) {
                  tomorrowMonth = "0" + mm.toString();
                }
                var tomorrowDate =
                  year + "-" + tomorrowMonth + "-" + tomorrowDay;
                isMatched = tomorrowDate == data;
              }
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && status) {
          let index = lowerCaseKeys.indexOf("status");
          if (index !== -1) {
            let key = ticketKeys[index];
            let data = ticket[key];
            if (data) {
              isMatched = status.toLowerCase() === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && priority) {
          let index = lowerCaseKeys.indexOf("priority");
          if (index !== -1) {
            let key = ticketKeys[index];
            let data = ticket[key];
            if (data) {
              isMatched = priority.toLowerCase() === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && type) {
          let index = lowerCaseKeys.indexOf("type");
          if (index !== -1) {
            let key = ticketKeys[index];
            let data = ticket[key];
            if (data) {
              isMatched = type.toLowerCase() === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && tags) {
          let index = lowerCaseKeys.indexOf("tags");
          if (index !== -1) {
            let key = ticketKeys[index];
            let data = ticket[key];
            if (data) {
              isMatched = tags.toLowerCase() === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && company) {
          let index = lowerCaseKeys.indexOf("requestercompany");
          console.log("index", index);
          if (index !== -1) {
            let key = ticketKeys[index];
            let data = ticket[key];
            if (data) {
              isMatched = company.toLowerCase() === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && contact) {
          let index = lowerCaseKeys.indexOf("requestername");
          if (index !== -1) {
            let key = ticketKeys[index];
            let data = ticket[key];
            if (data) {
              isMatched = contact === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched) {
          retData.push(ticket);
        }
      }
    }
    return retData;
  };
  clearAllFilters = () => {
    this.setState({
      agent: "",
      created: "",
      dueBy: "",
      status: "",
      priority: "",
      type: "",
      tags: "",
      company: "",
      contact: "",
      filterCheckbox: false,
    });
  };
  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    const {
      page_type,
      columns,
      agentNameList,
      companyNameList,
      contactNameList,
      agent,
      dueBy,
      status,
      priority,
      type,
      tags,
      company,
      contact,
      filterCheckbox,
    } = this.state;
    const tableData = this.applyFilters();
    return (
      <div className="servicedesk-dashboard-container">
        <div className="servicedesk-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="page-heading">
                  <h1>{page_type}</h1>
                </div>
              </div>
              <CreateButtonComponent />
            </div>
          </div>
          <div className="common-container border-bottom-0 filter-container">
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="form-group filter-control-group">
                  <label htmlFor="Agents">Agents</label>
                  <select
                    className="form-control"
                    name="agent"
                    value={agent}
                    id="agentName"
                    onChange={this.handleStateChange}
                  >
                    <option value="" selected>
                      Select Agent
                    </option>
                    {this.createSelectboxOptions(agentNameList)}
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="form-group filter-control-group">
                  <label htmlFor="dueby">Due by</label>
                  <select
                    className="form-control"
                    id="dueby"
                    name="dueBy"
                    value={dueBy}
                    onChange={this.handleStateChange}
                  >
                    <option value="" selected>
                      Select Due by
                    </option>
                    <option value="overdue">Overdue</option>
                    <option value="today">Today</option>
                    <option value="tomorrow">Tomorrow</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="form-group filter-control-group">
                  <label htmlFor="Status">Status</label>
                  <select
                    className="form-control"
                    id="Status"
                    name="status"
                    value={status}
                    onChange={this.handleStateChange}
                  >
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
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="form-group filter-control-group">
                  <label htmlFor="Priority">Priority</label>
                  <select
                    className="form-control"
                    id="Priority"
                    name="priority"
                    value={priority}
                    onChange={this.handleStateChange}
                  >
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
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="form-group filter-control-group">
                  <label htmlFor="Type">Type</label>
                  <select
                    className="form-control"
                    id="Type"
                    name="type"
                    value={type}
                    onChange={this.handleStateChange}
                  >
                    <option value="" selected>
                      Select Type
                    </option>
                    <option value="None">None</option>
                    <option value="Question">Question</option>
                    <option value="Problem">Problem</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="form-group filter-control-group">
                  <label htmlFor="Tags">Tags</label>
                  <select
                    className="form-control"
                    id="Tags"
                    name="tags"
                    value={tags}
                    onChange={this.handleStateChange}
                  >
                    <option value="" selected>
                      Select Tags
                    </option>
                    <option value="CPU">CPU</option>
                    <option value="Memory">Memory</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="form-group filter-control-group">
                  <label htmlFor="Companies">Companies</label>
                  <select
                    className="form-control"
                    id="Companies"
                    name="company"
                    value={company}
                    onChange={this.handleStateChange}
                  >
                    <option value="" selected>
                      Select Company
                    </option>
                    {this.createSelectboxOptions(companyNameList)}
                  </select>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="form-group filter-control-group">
                  <label htmlFor="Contacts">Contacts</label>
                  <select
                    className="form-control"
                    id="Contacts"
                    name="contact"
                    value={contact}
                    onChange={this.handleStateChange}
                  >
                    <option value="" selected>
                      Select Contacts
                    </option>
                    {this.createSelectboxOptions(contactNameList)}
                  </select>
                </div>
              </div>
              {filterCheckbox && (
                <div className="form-check filter-control-group clear-filters">
                  <br />
                  <br />
                  <input
                    className="form-check-input clear-all-filter"
                    value={filterCheckbox}
                    type="checkbox"
                    checked={filterCheckbox}
                    name="clearAllFilter"
                    onChange={this.clearAllFilters}
                  />
                  <label className="form-check-label" htmlFor="clearFilter">
                    <span>Clear All Filters</span>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="d-block all-open-ticket-tabel">
              <Table
                valueFromData={{ columns: columns, data: tableData }}
                perPageLimit={this.perPageLimit}
                visiblecheckboxStatus={this.checkboxValue}
                tableClasses={{
                  table: "open-ticket-tabel",
                  tableParent: "d-block p-t-5 open-tickets-tabel",
                  parentClass: "all-open-ticket-tabel",
                }}
                searchKey="subject"
                showingLine="Showing %start% to %end% of %total% Tickets"
                dark={!this.isLightTheme()}
              />
            </div>
          </div>
        </div>
        <UnimplementedFeaturePopup ref={this.unimplementedFeatureModalRef} />
      </div>
    );
  }
}

export default OpenTickets;

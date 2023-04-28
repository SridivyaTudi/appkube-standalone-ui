import React from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import helpdeskIcon from "../../img/helpdesk-icon.png";
import ticketIcon from "../../img/ticket-icon.png";
import phoneSummaryIcon from "../../img/phone-summary-icon.png";
import chatSummaryIcon from "../../img/chat-summary-icon.png";
import agentIcon from "../../img/agent-icon.png";
import groupIcon from "../../img/group-icon.png";
import prformanceIcon from "../../img/prformance-icon.png";
import timeSheetIcon from "../../img/time-sheet-icon.png";
import lifecycleIcon from "../../img/lifecycle-icon.png";
import analysisIcon from "../../img/analysis-icon.png";
import satisfactionIcon from "../../img/satisfaction-icon.png";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InsightsData: [
        {
          NoOfTickets: "365",
          TicketsPersentage: "35%",
          description:
            "Many modern alternatives often incorporate humor or other content that actually purpose of filler.",
        },
        {
          NoOfTickets: "120",
          TicketsPersentage: "27%",
          description:
            "All Tickets and no break? Consider staffing up to resolve more issue high fives, team i ssuper resonsive todays!",
        },
        {
          NoOfTickets: "2h 15m",
          TicketsPersentage: "20%",
          description:
            "Surprisingly, there is a very vocal faction of the design community that wants to see filler text banished to the original sources.",
        },
        {
          NoOfTickets: "15h 25m",
          TicketsPersentage: "32%",
          description: "Your team is on fire today",
        },
        {
          NoOfTickets: "30m 14s",
          TicketsPersentage: "26%",
          description:
            "Those opposed to using filler text of any sort counter by saying: The ultimate purpose of any digital product.",
        },
      ],
    };
  }

  displayTodayInsights = () => {
    let retData = [];
    const { InsightsData } = this.state;
    for (let i = 0; i < InsightsData.length; i++) {
      let row = InsightsData[i];
      retData.push(
        <div className="d-block insight-box">
          <div className="row">
            <div className="col-lg-9 col-sm-12 p-r-0">
              <div className="d-block text-left p-t-5 insight-heading">
                <strong>{row.NoOfTickets}</strong> Received Tickets
              </div>
            </div>
            <div className="col-lg-3 col-sm-12 p-l-0">
              <div className="d-block text-right insight-heading-right-text">
                {row.TicketsPersentage}
              </div>
            </div>
          </div>
          <div className="d-block p-t-10 insight-text">{row.description}</div>
        </div>
      );
    }
    return retData;
  };

  render() {
    return (
      <div className="servicedesk-dashboard-container">
        <div className="servicedesk-page-container reports-page-container">
          <div className="row">
            <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12">
              <div className="reports-left">
                <div className="d-block p-b-15 heading">Reports</div>
                <div className="d-block ask-question">
                  Ask me a question about your Helpdesk
                </div>
                <div className="d-block helpdesk-box">
                  <div className="d-block helpdesk-heading">
                    Helpdesk Analysic
                  </div>
                  <ul className="d-block">
                    <li className="d-inline-block">
                      <Link
                        to={`${config.basePath}/reporthelpdesh`}
                        className="d-block text-center"
                      >
                        <span className="d-inline-block">
                          <img src={helpdeskIcon} alt="" />
                        </span>
                        <strong className="d-block">HELPDESK IN-DEPTH</strong>
                      </Link>
                    </li>
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={ticketIcon} alt="" />
                        </span>
                        <strong className="d-block">
                          TICKET VOLUME TRENDS
                        </strong>
                      </a>
                    </li>
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={phoneSummaryIcon} alt="" />
                        </span>
                        <strong className="d-block">PHONE SUMMARY</strong>
                      </a>
                    </li>
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={chatSummaryIcon} alt="" />
                        </span>
                        <strong className="d-block">CHAT SUMMARY</strong>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="d-block helpdesk-box productivity">
                  <div className="d-block helpdesk-heading">Productivity</div>
                  <ul className="d-block">
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={agentIcon} alt="" />
                        </span>
                        <strong className="d-block">AGENT PERFORMANCE</strong>
                      </a>
                    </li>
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={groupIcon} alt="" />
                        </span>
                        <strong className="d-block">GROUP PERFORMANCE</strong>
                      </a>
                    </li>
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={prformanceIcon} alt="" />
                        </span>
                        <strong className="d-block">
                          PERFORMANCE DISTRIBUTION
                        </strong>
                      </a>
                    </li>
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={timeSheetIcon} alt="" />
                        </span>
                        <strong className="d-block">TIME SHEET SUMMARY</strong>
                      </a>
                    </li>
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={lifecycleIcon} alt="" />
                        </span>
                        <strong className="d-block">TICKET LIFECYCLE</strong>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="d-block helpdesk-box happiness">
                  <div className="d-block helpdesk-heading">
                    Customer Happiness
                  </div>
                  <ul className="d-block">
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={analysisIcon} alt="" />
                        </span>
                        <strong className="d-block">
                          TOP CUSTOMER ANALYSIS
                        </strong>
                      </a>
                    </li>
                    <li className="d-inline-block">
                      <a href="#" className="d-block text-center">
                        <span className="d-inline-block">
                          <img src={satisfactionIcon} alt="" />
                        </span>
                        <strong className="d-block">SATISFACTION SURVEY</strong>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="d-block build-reports-text">
                  <p className="d-block">Want to build custom reports?</p>
                  <strong className="d-block">
                    <a href="#">Schedule an export</a>
                  </strong>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
              <div className="reports-right">
                <div className="row p-b-20">
                  <div className="col-lg-8 col-md-6 col-sm-6">
                    <div className="heading">
                      <h3 className="d-block m-b-0">Today’s Insights</h3>
                      <p className="d-block m-b-0">
                        Last Updated 37 Minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="d-block text-right customize-link">
                      <a href="#">Customize</a>
                    </div>
                  </div>
                </div>
                <div className="row p-t-10">
                  <div className="col-sm-12">{this.displayTodayInsights()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reports;

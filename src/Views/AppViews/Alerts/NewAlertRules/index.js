import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import AlertDetails from "./Components/AlertDetails";
import AlertTypes from "./Components/AlertTypes";
import Conditions from "./Components/Conditions";
import AlertHandler from "./Components/AlertHandler";
import Message from "./Components/Message";
import Wizard from "./Components/Wizard";

class NewAlertRules extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.steps = [
      {
        name: "Alert Details",
        component: <AlertDetails />,
      },
      {
        name: "Alert Type",
        component: <AlertTypes />,
      },
      {
        name: "Conditions",
        component: <Conditions />,
      },
      {
        name: "Alert Handlers",
        component: <AlertHandler />,
      },
      {
        name: "Message",
        component: <Message />,
      },
    ];
  }
  //steps = ["Alert Details", "Alert Type", "Conditions", "Alert Handlers", "Message"];

  render() {
    return (
      <Box className="alert-container">
        <Box className="list-heading">
          <h3>Alerts Rule builder</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() => this.props.navigate(`${APP_PREFIX_PATH}/alerts`)}
              >
                Home
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li
                onClick={() =>
                  this.props.navigate(`${APP_PREFIX_PATH}/alerts/alert-rules`)
                }
              >
                Alerts Rules
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">New Alert Rules</li>
            </ul>
          </Box>
        </Box>
        <Wizard
          steps={this.steps}
          ref={this.wizardRef}
          onChangeStep={this.onChangeStep}
          onChangePrevStep={this.onChangePrevStep}
        />
        {/* <div className="d-block width-100 text-right alert-wizard-buttons">
          {!state.hidePrevBtn && (
            <button
              className="alert-blue-button m-r-0 m-b-0 previous-btn"
              onClick={this.onClickPrevious}
            >
              Previous
            </button>
          )}
          {!state.hideNextBtn && (
            <button
              className="alert-blue-button m-r-0 m-b-0 next-btn"
              onClick={this.onClickNext}
            >
              Next
            </button>
          )}
          {!state.hideFinishBtn && (
            <button className="alert-blue-button m-r-0 m-b-0 finish-btn">
              Finish
            </button>
          )}
        </div> */}
      </Box>
    );
  }
}

export default navigateRouter(NewAlertRules);

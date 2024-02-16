import React, { Component } from "react";
import { Box } from "@mui/material";
import DollerIcon from "assets/img/report/doller-icon.png";

class TimeSpendComponent extends Component {
  render() {
    let { data } = this.props;
    return (
      <Box className="spend-control-cards">
        {data?.length ? (
          data.map((spendData) => {
            return (
              <Box className="time-spend-card">
                <Box className="spend-icon">
                  <img src={DollerIcon} alt="" />
                </Box>
                <Box className="time-spend-content">
                  <label>{spendData.name}</label>
                  <strong>{spendData.value}</strong>
                  <Box className="d-flex align-items-center">
                    <span>
                      <i class="fas fa-long-arrow-down"></i>{" "}
                      {spendData.percentage} &#37;
                    </span>
                    <p className="m-b-0 m-t-0">{spendData.subName}</p>
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default TimeSpendComponent;

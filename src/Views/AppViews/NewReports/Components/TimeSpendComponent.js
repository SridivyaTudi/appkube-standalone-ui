import React, { Component } from "react";
import { Box } from "@mui/material";
import DollerIcon from "assets/img/report/doller-icon.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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
                  <label>
                    <HtmlTooltip
                      className="table-tooltip"
                      title={spendData.name}
                    >
                      {spendData.name}
                    </HtmlTooltip>
                  </label>
                  <strong>
                    <HtmlTooltip
                      className="table-tooltip"
                      title={spendData.value}
                    >
                      {spendData.value}
                    </HtmlTooltip>
                  </strong>
                  <Box className="d-flex align-items-center">
                    <span className="parsent">
                      <i class="fas fa-long-arrow-down"></i>{" "}
                      {spendData.percentage} &#37;
                    </span>
                    <p className="m-b-0 m-t-0">
                      <HtmlTooltip
                        className="table-tooltip"
                        title={spendData.subName}
                      >
                        {spendData.subName}
                      </HtmlTooltip>
                    </p>
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

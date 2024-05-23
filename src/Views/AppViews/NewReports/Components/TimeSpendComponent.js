import React, { Component } from "react";
import { Box } from "@mui/material";
import DollerIcon from "assets/img/report/doller-icon.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { v4 } from "uuid";
import { NO_DATA_FOUND } from "CommonData";

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
  // Render html when data is no available
  renderNoDataHtml = (text) => {
    return (
      <Box className="group-loader text-center  h-100  m-r-auto m-l-auto  p-t-20 p-b-20">
        <h5 className="m-t-0 m-b-0">{text}</h5>
      </Box>
    );
  };
  render() {
    let { data, error } = this.props;
    return (
      <Box className="spend-control-cards">
        {data?.length
          ? data.map((spendData) => {
              return (
                <Box className="time-spend-card" key={v4()}>
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
                      <span
                        className={`parsent ${
                          spendData.percentage > 0 ? "" : "red"
                        }`}
                      >
                        {spendData.percentage > 0 ? (
                          <i class="fas fa-long-arrow-up" />
                        ) : (
                          <i class="fas fa-long-arrow-down" />
                        )}
                        {Math.abs(spendData.percentage)} &#37;
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
          : this.renderNoDataHtml(
              error ? error : NO_DATA_FOUND
            )}
      </Box>
    );
  }
}

export default TimeSpendComponent;

import React, { Component } from "react";
import { Box } from "@mui/material";
import CommonTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const HtmlTooltip = styled(({ className, ...props }) => (
  <CommonTooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
export class VerticalTitleAndIconOfCard extends Component {
  onClickCard = (title) => {
    try {
      this.props.onClickCard(title);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let { label, image, active } = this.props.data;
    return (
      <Box
        className={`deployed-card ${active}`}
        onClick={(e) => this.onClickCard(label)}
      >
        <Box className="d-block text-center">
          <Box className="deployed-image">
            <img src={image} alt="" />
          </Box>
          <Box className="deployed-title">
            <HtmlTooltip className="table-tooltip" title={label}>
              <span>{label}</span>
            </HtmlTooltip>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default VerticalTitleAndIconOfCard;

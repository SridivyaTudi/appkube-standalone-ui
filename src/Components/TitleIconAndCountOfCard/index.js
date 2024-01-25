import React, { Component } from "react";
import { Box } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Loader from "Components/Loader";
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
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
export class TitleIconAndCountOfCard extends Component {
  onClickCard = () => {
    try {
      this.props.onClickCard(this.props.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  };

  render() {
    let { image, title, count, active, isLoding, isIcon,style=null } = this.props.data;
    return (
      <Box
        className={`service-card ${active}`}
        onClick={() => this.onClickCard()} style={style ? style : {}}
      >
        <Box className="service-icon">
          {isIcon ? image : <img src={image} alt="serviceicon" />}
        </Box>
        <Box className="service-contant">
          <HtmlTooltip className="table-tooltip" title={title}>
            <label>{title}</label>
          </HtmlTooltip>
          {isLoding ? this.renderLoder() : <strong>{count}</strong>}
        </Box>
      </Box>
    );
  }
}
export default TitleIconAndCountOfCard;

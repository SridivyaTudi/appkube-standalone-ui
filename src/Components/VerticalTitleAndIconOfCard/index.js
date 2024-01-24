import React, { Component } from "react";
import { Box } from "@mui/material";
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
          <Box className="deployed-title">{label}</Box>
        </Box>
      </Box>
    );
  }
}
export default VerticalTitleAndIconOfCard;

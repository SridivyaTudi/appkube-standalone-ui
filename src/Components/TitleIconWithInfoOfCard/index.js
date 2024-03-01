import React, { Component } from "react";
import { v4 } from "uuid";
import { Box, List, ListItem } from "@mui/material";
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

export class TitleIconWithInfoOfCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClickCard = () => {
    try {
      this.props.onClickCard(this.props.cardDetails);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let { image, title, data, active, style = null } = this.props.cardDetails;
    return (
      <Box
        className={`environment-box ${active}`}
        key={v4()}
        onClick={this.onClickCard}
        style={style ? style : {}}
      >
        <Box className="environment-title">
          <Box className="environment-image">
            <img src={image} alt=" info" />
          </Box>
          <Box className="title-name">
            <HtmlTooltip className="table-tooltip" title= {title}>
            {title}
            </HtmlTooltip>
          </Box>
        </Box>
        <Box className="data-contant">
          <List>
            {data?.length ? (
              data.map((subInfo) => {
                let { backgroundColor, label, value, style = null } = subInfo;
                return (
                  <ListItem key={v4()} style={style ? style : {}}>
                    <Box className="data-text">
                      <span style={{ backgroundColor }}></span>
                      <p>{label}</p>
                    </Box>
                    <label>
                      <HtmlTooltip className="table-tooltip" title={value}>
                        {value}
                      </HtmlTooltip>
                    </label>
                  </ListItem>
                );
              })
            ) : (
              <></>
            )}
          </List>
        </Box>
      </Box>
    );
  }
}
export default TitleIconWithInfoOfCard;

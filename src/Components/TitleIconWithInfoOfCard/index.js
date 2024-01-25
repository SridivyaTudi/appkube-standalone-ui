import React, { Component } from "react";
import { v4 } from "uuid";
import { Box, List, ListItem } from "@mui/material";

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
    let { image, title, data, active, style=null } = this.props.cardDetails;
    return (
      <Box
        className={`environment-box ${active}`}
        key={v4()}
        onClick={this.onClickCard} style={style ? style : {}}
      >
        <Box className="environment-title">
          <Box className="environment-image">
            <img src={image} alt=" info" />
          </Box>
          <Box className="title-name"> {title} </Box>
        </Box>
        <Box className="data-contant">
          <List>
            {data?.length ? (
              data.map((subInfo) => {
                let { backgroundColor, label, value, style=null } = subInfo;
                return (
                  <ListItem key={v4()} style={style ? style : {}} >
                    <Box className="data-text">
                      <span style={{ backgroundColor }}></span>
                      <p>{label}</p>
                    </Box>
                    <label>{value}</label>
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

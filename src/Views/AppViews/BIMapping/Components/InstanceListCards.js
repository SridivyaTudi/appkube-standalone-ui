import React, { Component } from "react";
import { v4 } from "uuid";
import { Box, List, ListItem } from "@mui/material";
import CommonTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Grid, ColumnSizer } from "react-virtualized";

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

export class InstanceListCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClickCard = (details) => {
    try {
      this.props.onClickCard(details);
    } catch (error) {
      console.error(error);
    }
  };
  renderRow = ({ columnIndex, key, index, style }) => {
    let subInfo = this.props.cards[columnIndex];
    let { image, title, data, active } = subInfo;
    return (
      <Box
        className={`environment-box ${active}`}
        key={v4()}
        onClick={()=>this.onClickCard(subInfo)}
        style={style}
      >
        <Box className="environment-title">
          <Box className="environment-image">
            <img src={image} alt=" info" />
          </Box>
          <Box className="title-name">
            <HtmlTooltip className="table-tooltip" title={title}>
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
  };

  render() {
    let data = this.props.cards || [];
    return data.length ? (
      <ColumnSizer
        columnMaxWidth={250}
        columnMinWidth={250}
       
        columnCount={data.length}
        width={600}
      >
        {({ adjustedWidth, getColumnWidth, registerChild }) => (
          <Grid
            className="instace-inner-cards"
            ref={registerChild}
            columnWidth={getColumnWidth}
            columnCount={data.length}
            height={200}
            cellRenderer={this.renderRow}
            rowHeight={170}
            rowCount={1}
            width={600}
          />
        )}
      </ColumnSizer>
    ) : (
      <></>
    );
  }
}
export default InstanceListCards;

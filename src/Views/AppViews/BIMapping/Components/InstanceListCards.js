import React, { Component } from "react";
import { v4 } from "uuid";
import { Box, List, ListItem } from "@mui/material";
import CommonTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Collection, ColumnSizer } from "react-virtualized";
import "react-virtualized/styles.css";

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
    let subInfo = this.props.cards[index];
    let { image, title, data, active, id } = subInfo;

    return (
      <Box
        className={`environment-box ${active}`}
        key={key}
        onClick={() => this.onClickCard(subInfo)}
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
  cellSizeAndPositionGetter = ({ index }) => {
    let data = this.props.cards || [];
    if (data.length) {
      const datum = data[index];
      return {
        height: 150,
        width: 160,
        x: index * (160 + 10),
        y: 0,
      };
    }
  };
  render() {
    let data = this.props.cards || [];
    return data.length ? (
      <ColumnSizer
        columnMaxWidth={160}
        columnMinWidth={160}
        columnCount={data.length}
        width={600}
      >
        {({ adjustedWidth, getColumnWidth, registerChild }) => (
          <Collection
            className="instance-list-cards"
            cellCount={data.length}
            cellRenderer={this.renderRow}
            cellSizeAndPositionGetter={this.cellSizeAndPositionGetter}
            height={190}
            width={600}
            onSectionRendered={(e) => {}}
          />
        )}
      </ColumnSizer>
    ) : (
      <></>
    );
  }
}
export default InstanceListCards;

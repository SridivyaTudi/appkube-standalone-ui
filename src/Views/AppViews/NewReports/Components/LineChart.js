import React, { Component } from "react";
import * as d3 from "d3";
import { convertDigitToThousand, getFormattedDate } from "Utils";
import { Box } from "@mui/material";
let margin = { top: 20, right: 20, bottom: 10, left: 20 },
  width = 524 - margin.left - margin.right,
  height = 230 - margin.top - margin.bottom;

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    if (this.props.data.length) {
      this.renderChart();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data.length) {
        this.renderChart();
      }
    }
  }

  renderChart = async () => {
    let { data, labels, color } = this.props;

    let svg = d3
      .select(this.ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    svg.selectAll("*").remove();
    svg
      .append("g")
      .attr("class", "multiline-content")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let tooltip = d3
      .select("#root")
      .data(data)
      .append("div")
      .attr("class", "chart-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
    // parse the date / time
    const parseTime = d3.timeParse("%d-%m-%y");

    data = data.map((d) => {
      if (typeof d.date === "string") {
        d.date = parseTime(d.dateStr);
        d.value = +d.value;
        d.dateStr = d.dateStr;
      }
      return d;
    });

    // set the ranges
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    // define the 1st line
    let valueline = d3
      .line()
      .curve(d3.curveCardinal)
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.value);
      });
    x.domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);
    // Add the valueline path.
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", color || "steelblue")
      .attr("d", valueline);

    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("cx", (d) => x(new Date(d.date)))
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .on("mouseover", function (d, data, index) {
        let date = getFormattedDate(data.date);
        if (date) {
          date = date?.split(" ");
          date = date[0];
        }
        tooltip.html(
          `<div class="chart-tooltip-contents"><div class="value">${date} - $${data.value}</div></div>`
        );
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function (d) {
        return tooltip
          .style("top", d.pageY - 10 + "px")
          .style("left", d.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });
    // Add the X Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ") ")
      .call(
        d3.axisBottom(x).tickFormat((d) => {
          let date = getFormattedDate(d);
          if (date) {
            date = date?.split(" ");
            return date[0];
          }
        })
      )
      .selectAll("text")
      .attr("transform", "translate(0,10)rotate(20)");

    // Add the Y Axis
    svg
      .append("g")
      .call(d3.axisLeft(y).tickFormat((d) => "$" + convertDigitToThousand(d)));

    d3.select(this.ref.current);
  };

  render() {
    return (
      <Box classname="multi-line-chart">
        <svg
          style={{ width: "100%", height: "auto" }}
          ref={this.ref}
          viewBox={`0 0 ${width} ${
            height + margin.top + margin.bottom + margin.right + 0
          }`}
        />
      </Box>
    );
  }
}

export default LineChart;

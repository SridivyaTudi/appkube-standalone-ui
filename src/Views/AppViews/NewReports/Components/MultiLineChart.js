import React, { Component } from "react";
import * as d3 from "d3";
import { convertDigitToThousand, getFormattedDate } from "Utils";
import { Box } from "@mui/material";
let margin = { top: 20, right: 20, bottom: 50, left: 5 },
  width = 524 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;

class MultiLineChart extends Component {
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
    let { data, labels } = this.props;

    let svg = d3
      .select(this.ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("class", "multiline-content")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.selectAll("*").remove();
    
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
        d.date = parseTime(d.date);
        d.last_quarter = +d.last_quarter;
        d.current_quarter = +d.current_quarter;
        d.forecasted_spend = +d.forecasted_spend;
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
        return y(d.last_quarter);
      });

    // define the 2nd line
    let valueline2 = d3
      .line()
      .curve(d3.curveCardinal)
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.current_quarter);
      });

    let valueline3 = d3
      .line()
      .curve(d3.curveCardinal)
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.forecasted_spend);
      });
    x.domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return Math.max(d.last_quarter, d.current_quarter, d.forecasted_spend);
      }),
    ]);

    // Add the valueline path.
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("d", valueline);

    // Add the valueline2 path.
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .style("stroke", "orange")

      .attr("d", valueline2);
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke-dasharray", "3, 3")
      .attr("fill", "none")
      .style("stroke", "pink")
      .attr("d", valueline3);

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

    let legend = svg
      .selectAll(".legend")
      .data(labels)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${60 + i * 30},10)`);

    legend
      .append("rect")
      .attr("width", 20)
      .attr("height", 8)
      .attr(
        "transform",
        (d, i) =>
          `translate(${i * 80 + 30 * i - 25}, ${height + (margin.bottom - 0)})`
      )
      .attr("fill", (d) => {
        return d.color;
      });

    legend
      .append("text")
      .text((d) => d.name)
      .attr(
        "transform",
        (d, i) =>
          `translate(${i * 80 + 30 * i + 1},  ${
            height + (margin.bottom - 0) + 7
          })`
      )
      .attr("font-size", "12px ");
    // .on("mouseover", function (d, data) {
    //   tooltip.html(
    //     `<div class="chart-tooltip-contents"><div class="value">${data.name}</div></div>`
    //   );
    //   return tooltip.style("visibility", "visible");
    // })
    // .on("mousemove", function (d) {
    //   return tooltip
    //     .style("top", d.pageY - 10 + "px")
    //     .style("left", d.pageX + 10 + "px");
    // })
    // .on("mouseout", function () {
    //   return tooltip.style("visibility", "hidden");
    // });
    d3.select(this.ref.current);
  };
  render() {
    return (
      //   <svg
      //   style={{ width: "100%", height: "auto" }}
      //   ref={this.ref}
      //   viewBox={`0 0 ${width} ${height + margin.top + margin.bottom}`}
      // />
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

export default MultiLineChart;

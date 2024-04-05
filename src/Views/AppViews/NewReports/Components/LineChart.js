import React, { Component } from "react";
import * as d3 from "d3";
import { convertDigitToThousand, getFormattedDate } from "Utils";
import { Box } from "@mui/material";
let margin = { top: 20, right: 20, bottom: 50, left: 20 },
  width = 524 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;

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
      .attr("d", valueline)
      // .on("mouseover", function (d, data, index) {
      //   console.log(d.target.id, data, index);
      //   tooltip.html(
      //     `<div class="chart-tooltip-contents"><div class="value">${d.target.id}</div></div>`
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

  // renderChart = async () => {
  //   let { data, labels, color } = this.props;

  //   let svg = d3
  //     .select(this.ref.current)
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //   const x = d3
  //     .scaleUtc()
  //     .domain(d3.extent(data, (d) => new Date(d.date)))
  //     .range([0, width]);

  //   const y = d3
  //     .scaleLinear()
  //     .domain([0, d3.max(data, (d) => d.value)])
  //     .nice()
  //     .range([height, 0]);

  //   const line = d3
  //     .line()
  //     .x((d) => x(new Date(d.date)))
  //     .y((d) => y(d.value));

  //   svg
  //     .append("g")
  //     .attr("class", "x-axis")
  //     .attr("transform", `translate(0,${height})`)
  //     .call(d3.axisBottom(x));

  //   svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

  //   svg
  //     .append("path")
  //     .datum(data)
  //     .attr("fill", "none")
  //     .attr("stroke", "steelblue")
  //     .attr("stroke-width", 2)
  //     .attr("d", line);

  //   const tooltip = d3
  //     .select("body")
  //     .append("div")
  //     .attr("class", "tooltip")
  //     .style("opacity", 0);

  //   svg
  //     .selectAll(".dot")
  //     .data(data)
  //     .enter()
  //     // .append("circle")
  //     // .attr("class", "dot")
  //     // .attr("cx", (d) => x(new Date(d.date)))
  //     // .attr("cy", (d) => y(d.value))
  //     // .attr("r", 5)
  //     .on("mouseover", function (event, d) {
  //       tooltip.transition().duration(200).style("opacity", 0.9);
  //       tooltip
  //         .html(`Date: ${d.date}<br/>Value: ${d.value}`)
  //         .style("left", event.pageX + 10 + "px")
  //         .style("top", event.pageY - 28 + "px");
  //     })
  //     .on("mouseout", function (d) {
  //       tooltip.transition().duration(500).style("opacity", 0);
  //     });
  // };
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

export default LineChart;

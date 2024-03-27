import React, { Component } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";

let data = [
  { name: "Jan", value1: 2000, value2: 1200 },
  { name: "Feb", value1: 1300, value2: 1200 },
  { name: "Mar", value1: 2000, value2: 1200 },
  { name: "Apr", value1: 1000, value2: 1200 },
  { name: "May", value1: 1500, value2: 900 },
  { name: "Jun", value1: 1500, value2: 1300 },
  { name: "Jul", value1: 2000, value2: 900 },
  { name: "Aug", value1: 900, value2: 700 },
  { name: "Sep", value1: 1200, value2: 700 },
  { name: "Oct", value1: 1200, value2: 700 },
  { name: "Nov", value1: 1200, value2: 700 },
  { name: "Dec", value1: 2000, value2: 900 },
];

let margin = { top: 0, right: 0, bottom: 0, left: 0 },
width = 1200 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

class GroupedBarplotChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    this.renderChart();
  };

  // componentDidUpdate = () => {
  //   d3.select(this.ref.current)
  //     .selectAll("*")
  //     .remove(); // Remove existing chart before rendering new one
  //   this.renderChart();
  // };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.renderChart();
    }
  }

  renderChart = () => {
    let { data } = this.props;
    const margin = { top: 20, right: 0, bottom: 20, left: 40 };
    const width = this.ref.current.parentElement.clientWidth; // Dynamically get parent container width
    const height = 300;
    const barPadding = 0.5;
    const axisTicks = { qty: 5, outerSize: 0, dateFormat: "%m-%d" };

    const svg = d3
      .select(this.ref.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", `0 0 ${width} ${height + margin.top + margin.bottom}`)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xScale0 = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
      .padding(barPadding);
    var xScale1 = d3.scaleBand();
    var yScale = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0]);

    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
    var yAxis = d3
      .axisLeft(yScale)
      .ticks(axisTicks.qty)
      .tickSizeOuter(axisTicks.outerSize);

    xScale0.domain(data.map((d) => d.name));
    xScale1.domain(["value1", "value2"]).range([0, xScale0.bandwidth()]);
    yScale.domain([
      0,
      d3.max(data, (d) => (d.value1 > d.value2 ? d.value1 : d.value2)),
    ]);

    var name = svg
      .selectAll(".name")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "name")
      .attr("transform", (d) => `translate(${xScale0(d.name)},0)`);

    /* Add value1 bars */
    name
      .selectAll(".bar.value1")
      .data((d) => [d])
      .enter()
      .append("rect")
      .attr("class", "bar value1")
      .style("fill", "#8676FF")
      .attr("x", (d) => xScale1("value1"))
      .attr("y", (d) => yScale(d.value1))
      .attr("width", xScale1.bandwidth())
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("height", (d) => {
        return height - margin.top - margin.bottom - yScale(d.value1);
      });

    /* Add value2 bars */
    name
      .selectAll(".bar.value2")
      .data((d) => [d])
      .enter()
      .append("rect")
      .attr("class", "bar value2")
      .style("fill", "#FF2D2E")
      .attr("x", (d) => xScale1("value2") + 4)
      .attr("y", (d) => yScale(d.value2))
      .attr("width", xScale1.bandwidth())
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("height", (d) => {
        return height - margin.top - margin.bottom - yScale(d.value2);
      });

    // Add the X Axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(xAxis);

    // Add the Y Axis
    svg.append("g").attr("class", "y axis").call(yAxis);
  };

  render() {
    return (
      <Box className="grouped-barplot-chart">
        <svg
          ref={this.ref}
          viewBox={`0 0 ${width} ${
            height + margin.top + margin.bottom + margin.right + 0
          }`}
        />
      </Box>
    );
  }
}

export default GroupedBarplotChart;

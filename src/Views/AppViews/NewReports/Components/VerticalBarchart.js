import React, { Component } from "react";
import * as d3 from "d3";
import { convertDigitToThousand } from "Utils";
import { Box } from "@mui/material";

let data = [
  { name: "IT Infra", value: 1300 },
  { name: "IT Security", value: 1100 },
  { name: "IT Ops", value: 900 },
  { name: "IT Dev", value: 900 },
  { name: "Analytics", value: 700 },
  { name: "HR", value: 750 },
  { name: "Marketing", value: 650 },
  { name: "Finance", value: 550 },
  { name: "Sales", value: 550 },
  { name: "R&D", value: 400 },
];

let data1 = [
  { name: "R & D", value: 180 },
  { name: "Sales and marketing", value: 170 },
  { name: "Customer support", value: 150 },
  { name: "Finance admin", value: 900 },
  { name: "Data and Analytics", value: 700 },
];

const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  // Increase the width and height as needed
  const width = 800; // Adjust the width
  const height = 400; // Adjust the height

class VerticalBarchart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => this.renderChart();

  renderChart = () => {
    // let { data,styleProp } = this.props;
    

    const svg = d3.select(this.ref.current);
    const xScale = d3
    .scaleBand()
    .range([margin.left, width - margin.right])
    .domain(data.map((d) => d.name))
    .padding(0.6);

  const yScale = d3
    .scaleLinear()
    .range([height, margin.top])
    .domain([0, d3.max(data, (d) => d.value)])
    .nice();

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .call((g) => g.select(".domain").remove())
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "1.4em")
      .attr("dy", "0.50em")
      .attr("font-size", "10px");

  // .attr("transform", "rotate(-45)");

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickFormat((d) => "$" + d))
      .call((g) => g.select(".domain").remove());

  svg.selectAll("*").remove();

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.name))
    .attr("y", (d) => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.value))
    .attr("fill", this.props?.color?"yellow" :"pink");
  };
  render() {
    return (
      <svg
      style={{ width: "100%", height: "auto" }}
      ref={this.ref}
      viewBox={`0 0 ${width} ${height + margin.top + margin.bottom}`}
    />
    );
  }
}

export default VerticalBarchart;

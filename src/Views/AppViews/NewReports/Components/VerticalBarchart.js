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

const width = 550,
  height = 250;
  
class VerticalBarchart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => this.renderChart();

  renderChart = () => {
    
    const margin = { top: 20, right: 0, bottom: 20, left: 40 };
    const extent = [
      [margin.left, margin.top],
      [width - margin.right, height - margin.top],
    ];

    const svg = d3.select(this.ref.current);

    const xScale = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .domain(
        this.props.color ? data1.map((d) => d.name) : data.map((d) => d.name)
      )
      .padding(0.6);

    const yScale = d3
      .scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain([0, d3.max(this.props.color ? data1 : data, (d) => d.value)])
      .nice();

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSize(0))
        .call((g_local) => g_local.select(".domain").remove());

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickFormat((d) => "$" + d))
        .call((g_local) => g_local.select(".domain").remove());
    const barGroups = svg
      .append("g")
      
      .attr("class", "bars")
      .selectAll("rect")
      .attr("fill", "#B399FF")
      .data(this.props.color ? data1 : data)
      .enter();

    barGroups
      .append("rect")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(30) - yScale(d.value))
      .style("fill", this.props?.color ? "#FAA24B" : "#FA6298")
      .attr("rx", 3)
      .attr("ry", 3);

    barGroups
      .append("text")
      .attr("class", "value")
      .attr("x", (a) => xScale(a.name) + xScale.bandwidth() / 2)
      .attr("y", (a) => yScale(a.value) + 30)
      .attr("text-anchor", "middle");

    svg.append("g").attr("class", "x-axis").call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);

    d3.select(this.ref.current);
  };
  render() {
    return (
      <Box className="vertical-bar-chart">
         {this.props.chardBeforeRenderHTML}
        <svg style={{maxWidth: "100%"}}
          ref={this.ref}
          width={width}
          height={height}
          viewBox={`0 0 ${width - 600} ${height}`}
        ></svg>
      </Box>
    );
  }
}

export default VerticalBarchart;

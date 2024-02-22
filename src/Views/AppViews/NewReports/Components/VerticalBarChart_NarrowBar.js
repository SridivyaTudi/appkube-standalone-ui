import React, { Component } from "react";
import * as d3 from "d3";
// import { convertDigitToThousand } from "Utils";

let data = [
  { name: "Marketing", value: 0 },
  { name: "Development", value: 1100 },
  { name: "IT Ops", value: 900 },
  { name: "Analytics", value: 700 },
  { name: "HR", value: 750 },
  { name: "Marketing", value: 650 },
  { name: "Finance", value: 550 },
  { name: "Sales", value: 550 },
  { name: "R&D", value: 400 },
  { name: "Finance1", value: 550 },
  { name: "Sales2", value: 550 },
  { name: "Finance1", value: 550 },
  { name: "Sales2", value: 550 },
  { name: "R&D3", value: 400 },
  { name: "Finance5", value: 550 },
  { name: "Sales4", value: 550 },
];

let topHighOfArray = data.map((d) => d.value).sort((a, b) => b - a)[0];
let narrowBarsize = topHighOfArray + 100;
console.log("top hegit", narrowBarsize - topHighOfArray);
let data1 = [
  { name: "R & D", value: 180 },
  { name: "Sales and marketing", value: 170 },
  { name: "Customer support", value: 150 },
  { name: "Finance admin", value: 900 },
  { name: "Data and Analytics", value: 700 },
];

const width = 550,
  height = 250;
class VerticalBarChart_NarrowBar extends Component {
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

    const svg = d3.select(this.ref.current)
    .attr("style", "max-width: 100%;  font: 12px sans-serif; ");

    const xScale = d3
      .scaleBand()
      .range([margin.left*1.5, width - margin.right])
      .domain(
        this.props.color ? data1.map((d) => d.name) : data.map((d) => d.name)
      )
      
      .paddingInner(0.7) // Adjust the value to increase or decrease the gap between bars
      .paddingOuter(0.5);

    const yScale = d3
      .scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain([0, d3.max(this.props.color ? data1 : data, (d) => d.value)])
      .nice();

    const xAxis = (g) =>
      g
        .attr("transform", `translate(30,${height - margin.bottom})`)
        
        .call(d3.axisBottom(xScale).tickSize(0))
        .call((g_local) => g_local.select(".domain").remove());

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickFormat((d) => "$" + d))
        .call((g_local) => g_local.select(".domain").remove());

    const narrowBarHeight = 1; // Height of each small rectangle
    const narrowBarPadding = 0; // Padding between small rectangles

    const barGroups = svg
      .append("g")
      .attr("class", "bars")
      .selectAll("g")
      .data(this.props.color ? data1 : data)
      .enter()
      .append("g")
      .attr("transform", (d,i) => `translate(${xScale(d.name)*1.5},0)`);
    barGroups
      .selectAll(".narrow-rect")
      .data((d) => {
        const numRects = Math.ceil(narrowBarsize / 100);
        return Array.from({ length: numRects }, (_, i) => ({
          index: i,
          value: narrowBarsize - i * 60,
        }));
      })
      .enter()
      .append("rect")
      .attr("class", "narrow-rect")
      .attr("y", (d, i) => yScale(d.value) - narrowBarHeight / 2)
      .attr("x", (d, i) => xScale.bandwidth() / 2 - 3.5)
      .attr("height", (d, i) => {
        console.log("height", d, i);
        return narrowBarsize - topHighOfArray + 3.5;
      })
      .attr("width", 7)
      .style("fill",   (d, i, nodes) => {
        // Get the parent group
        const parentGroup = d3.select(nodes[i].parentNode);
        return "#e9ebfb";
      })
      .attr("rx", 5)
      .attr("ry", 5);

    barGroups
      .append("rect")
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => height - margin.bottom - yScale(d.value))
      .attr("width", xScale.bandwidth())
      .style("fill", this.props?.color ? "yellow" : "#53CA43")
      .attr("rx", 3)
      .attr("ry", 3);

    svg.append("g").attr("class", "x-axis").call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);

    d3.select(this.ref.current);
  };

  render() {
    return (
        <svg 
        ref={this.ref}
        width={width + 100} // Increase the width by 400 units
        height={height + 40} // Increase the height by 100 units
        viewBox={`0 0 ${width + 100} ${height + 40}`} // Adjust the viewBox accordingly
      ></svg>
    );
  }
}

export default VerticalBarChart_NarrowBar;

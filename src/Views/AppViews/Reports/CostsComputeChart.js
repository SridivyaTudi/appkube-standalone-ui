import React, { Component } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";
import { convertDigitToThousand } from "Utils";

const alphabet = [
  { letter: "Compute", frequency: 7700, color: "#A145FF", unit: "INSTANCE" },
  { letter: "Storage", frequency: 6700, color: "#FA6298", unit: "TB" },
  { letter: "Network", frequency: 6500, color: "#FAA24B", unit: "TB/DAY" },
  { letter: "Database", frequency: 8500, color: "#F9D33D", unit: "INSTANCE" },
];

class CostsComputeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    this.renderChart();
  };

  renderChart = () => {
    const barHeight = 25;
    const marginTop = 20;
    const marginRight = 0;
    const marginBottom = 10;
    const marginLeft = 60;
    const width = 1200;
    const height =
      Math.ceil(alphabet.length * barHeight) + marginTop + marginBottom;

    // Create the scales.
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(alphabet, (d) => d.frequency)])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(d3.sort(alphabet, (d) => -d.frequency).map((d) => d.letter))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.3);

    // Create the SVG container.
    const svg = d3
      .select(this.ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

    // Append a rect for each letter.
    svg
      .append("g")
      .selectAll()
      .data(alphabet)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.letter))
      .attr("width", (d) => x(d.frequency) - x(0))
      .attr("height", y.bandwidth())
      .attr("fill", (d) => (d?.color ? d.color : "steelblue"));

    // Append a label for each letter.
    svg
      .append("g")
      .attr("fill", "black")
      .attr("text-anchor", "end")
      .selectAll()
      .data(alphabet)
      .join("text")
      .attr("x", (d) => x(d.frequency))
      .attr("y", (d) => y(d.letter) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text((d) => ` ${d.frequency} ${d.unit}`)
      .call((text) =>
        text
          .filter((d) => x(d.frequency) - x(0) < 20) // short bars
          .attr("dx", +4)
          .attr("fill", "black")
          .attr("text-anchor", "start")
      );

    // Create the axes.
    svg
      .append("g")
      .attr("transform", `translate(0,${height + 9})`)
      .call(
        d3.axisTop(x).tickFormat((d, index) => `$${convertDigitToThousand(d)}`)
      )
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0));
    d3.select(this.ref.current);
  };
  render() {
    return (
      <>
        <Box className="heading">
          <span>Costs By Compute / Storage / Network / DB</span>
          <p>
            Monthly cost of all the Service providers spent on Computing,
            Storage, networking and DB
          </p>
        </Box>
        <Box className="chart">
          <svg ref={this.ref}></svg>
        </Box>
      </>
    );
  }
}

export default CostsComputeChart;

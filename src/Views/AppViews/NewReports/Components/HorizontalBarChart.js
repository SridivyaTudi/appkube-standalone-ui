import React, { Component } from "react";
import * as d3 from "d3";

class HorizontalBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    this.renderChart();
  };

  renderChart = () => {
    let { data } = this.props;
    const barHeight = 25;
    const marginTop = 20;
    const marginRight = 0;
    const marginBottom = 10;
    const marginLeft = 60;
    const width = 1200;
    const height =
      Math.ceil(data.length * barHeight) + marginTop + marginBottom;

    // Create the scales.
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(d3.sort(data, (d) => -d.value).map((d) => d.label))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.3);

    // Create the SVG container.
    const svg = d3
      .select(this.ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

    // Append a rect for each label.
    svg
      .append("g")
      .selectAll()
      .data(data)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.label))
      .attr("width", (d) => x(d.value) - x(0))
      .attr("height", y.bandwidth())
      .attr("fill", (d) => (d?.color ? d.color : "steelblue"));

    // Append a label for each label.
    svg
      .append("g")
      .attr("fill", "black")
      .attr("text-anchor", "end")
      .selectAll()
      .data(data)
      .join("text")
      .attr("x", (d) => x(d.value))
      .attr("y", (d) => y(d.label) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .call((text) =>
        text
          .filter((d) => x(d.value) - x(0) < 20) // short bars
          .attr("dx", +4)
          .attr("fill", "black")
          .attr("text-anchor", "start")
      );

    // Create the axes.
    svg
      .append("g")
      .attr("transform", `translate(0,${height + 9})`)
      .call(d3.axisTop(x).tickFormat((d, index) => `$${d}`))
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0));
    d3.select(this.ref.current);
  };
  render() {
    return <svg ref={this.ref}></svg>;
  }
}

export default HorizontalBarChart;

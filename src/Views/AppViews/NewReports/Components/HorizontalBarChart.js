import React, { Component } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";

class HorizontalBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    this.renderChart();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.renderChart();
    }
  }

  renderChart = () => {
    let { data } = this.props;
    const barHeight = 28;
    const marginTop = 0;
    const marginRight = 10;
    const marginBottom = 0;
    const marginLeft = 105;
    const width = 800;
    const height =
      Math.ceil(data.length * barHeight) + marginTop + marginBottom;
    let tooltip = d3
      .select("#root")
      .data(data)
      .append("div")
      .attr("class", "chart-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
    function make_x_gridlines() {
      return d3.axisBottom(x);
    }

    // Create the scales.
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => parseInt(d.value))])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(d3.sort(data, (d) => -d.value).map((d) => d.label))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.3);

    const yAxis = (g) =>
      g.call((g_local) => g_local.select(".domain").remove());

    // Create the SVG container.
    const svg = d3
      .select(this.ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 10, width, height])
      .attr("style", "max-width: 100%;  font: 12px sans-serif; ");
    svg
      .append("g")
      .attr("class", "x grid")
      .attr("transform", `translate(0,${height})`)
      .attr("color", "lightgray")
      .call(
        make_x_gridlines()
          .tickSize(-height + 4)
          .tickFormat("")
          .tickSizeOuter(0)
      );
    // Append a rect for each label.
    svg
      .append("g")
      .selectAll()
      .data(data)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.label))
      .attr("width", (d) => x(d.value) - x(0))
      .attr("height", y.bandwidth() - 5)
      .attr("fill", (d) => (d?.color ? d.color : "steelblue"))
      .on("mouseover", function (d, data) {
        tooltip.html(
          `<div class="chart-tooltip-contents"><div class="value">$${data.value}</div></div>`
        );
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function (d) {
        return tooltip
          .style("top", d.pageY - 30 + "px")
          .style("left", d.pageX - 60 + "px");
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

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
      .attr("style", "font-size: 16px", "sans-serif")
      .attr("transform", `translate(0,${height + 30})`)
      .call(
        d3
          .axisTop(x)
          .tickFormat((d, index) => `$${d}`)
          .tickSize(0)
      )
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("style", "font-size: 16px", "sans-serif")
      .attr("transform", `translate(${marginLeft - 10},-3)`)
      .call(d3.axisLeft(y).tickSize(0))
      .attr("class", "y-axis")
      .call(yAxis);
    d3.select(this.ref.current);
  };

  render() {
    return (
      <Box className="top-used-service-chrt">
        {this.props.chardBeforeRenderHTML}
        <svg ref={this.ref}></svg>
      </Box>
    );
  }
}

export default HorizontalBarChart;

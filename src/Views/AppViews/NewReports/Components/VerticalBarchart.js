import React, { Component } from "react";
import { Box } from "@mui/material";
import * as d3 from "d3";
import { convertDigitToThousand } from "Utils";

const margin = { top: 30, right: 20, bottom: 30, left: 40 };

// Increase the width and height as needed
const width = 1000; // Adjust the width
const height = 320; // Adjust the height

class VerticalBarchart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => (this.props.data?.length ? this.renderChart() : []);

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data?.length) {
        this.renderChart();
      }
    }
  }

  renderChart = () => {
    let { data } = this.props;

    const svg = d3.select(this.ref.current);
    svg.selectAll("*").remove();
    let tooltip = d3
      .select("#root")
      .data(data)
      .append("div")
      .attr("class", "chart-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
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
        .call(d3.axisBottom(xScale))
        // .call((g) => g.select(".domain").remove())
        .selectAll("text")
        // .attr("dx", "0.80em")
        // .attr("dy", "0.10em")
        .attr("transform", "translate(0,10)")
        .attr("font-size", "14px", "sans-serif");

    // .attr("transform", "rotate(-45)");

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left + 10},0)`)
        .call(
          d3.axisLeft(yScale).tickFormat((d) => "$" + convertDigitToThousand(d))
        )
        .attr("font-size", "14px", "sans-serif");
    // .call((g) => g.select(".domain").remove());

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
      .attr("fill", this.props?.color ? this.props?.color : "#FA6298")
      .attr("rx", 5)
      .on("mouseover", function (d, data) {
        tooltip.html(
          `<div class="chart-tooltip-contents"><div class="value">$${
            data?.value || 0
          }</div></div>`
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
  };

  render() {
    return (
      <Box className="vertical-bar-chart">
        <svg
          className="vertical-bar-chart-inner-section"
          style={{ width: "100%" }}
          ref={this.ref}
          viewBox={`-15 0 ${width} ${height + margin.top + margin.bottom}`}
        />
      </Box>
    );
  }
}

export default VerticalBarchart;

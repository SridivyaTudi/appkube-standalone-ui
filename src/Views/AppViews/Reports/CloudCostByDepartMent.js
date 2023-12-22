import React, { Component } from "react";
import * as d3 from "d3";
import { convertDigitToThousand } from "Utils";

const data = [
  {
    label: "Marketing",
    value: 5000,
    index: 1,
  },
  {
    label: "Finance",
    value: 7000,
    index: 2,
  },
  {
    label: "Sales",
    value: 6000,
    index: 3,
  },
  {
    label: "IT",
    value: 8000,
    index: 4,
  },
];

const width = 400,
  height = 380;
class CloudCostByDepartMent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => this.renderChart();

  renderChart = () => {
    var tooltip = d3
      .select("#root")
      .data(data)
      .append("div").attr('class','chart-tooltip')
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");

    const svg = d3
      .select(this.ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    const yMaxValue = d3.max(data, (d) => d.value);
    const xMinValue = d3.min(data, (d) => d.index);
    const xMaxValue = d3.max(data, (d) => d.index);
    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]).domain([0, yMaxValue]);

    const line = d3
      .line()
      .x((d) => xScale(d.index))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(data.length)
          .tickFormat((d, index) => {
            return `${data[index].label}`;
          })
      );

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d, index) => `$${convertDigitToThousand(d)}`)
      );

    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", function (d) {
        return xScale(d.index);
      })
      .attr("cy", function (d) {
        return yScale(d.value);
      })
      .attr("fill", "none")
      .attr("stroke", "black")
      .on("mouseover", function (d, data) {
        tooltip.html(
          `<div class="chart-tooltip-contents"><div class="cost-text">Monthly Spend (USD)</div><div class="value">$${data.value}</div><div class="name">${data.label}</div></div>`
        );
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function (d) {
        return tooltip
          .style("top", d.pageY - 10 + "px")
          .style("left", d.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function (d) {
        return xScale(d.index) - 15;
      })
      .attr("y", function (d) {
        return yScale(d.value) + 35;
      })
      .attr("filter", "url(#solid)")
      .text(function (d) {
        return `$${convertDigitToThousand(d.value)}`;
      });

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#b399ff")
      .attr("stroke-width", 2)
      .attr("d", line);

    d3.select(this.ref.current);
  };
  render() {
    return (
      <svg ref={this.ref} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter x="0" y="0" width="1" height="1" id="solid">
            <feFlood floodColor="#d2d2d3" floodOpacity="0.4" />
            <feComposite in="SourceGraphic" operator="xor" />
          </filter>
        </defs>
      </svg>
    );
  }
}

export default CloudCostByDepartMent;

import React, { Component } from "react";
import * as d3 from "d3";
import { convertDigitToThousand } from "Utils";

let data = [
  { name: "AWS167263", value: 1000, color: "#B399FF" },
  { name: "AWS167264", value: 1500, color: "#F08397" },
  { name: "AWS167265", value: 800, color: "#F2BB23" },
  { name: "AWS167266", value: 1200, color: "#519FFF" },
];

const width = 360,
  height = 360;
class CostAWSAccountsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => this.renderChart();

  renderChart = () => {
    const height = Math.min(width, 400);
    const radius = Math.min(width, height) / 2;

    var tooltip = d3
      .select("#root")
      .data(data)
      .append("div").attr('class','chart-tooltip')
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");

    const arc = d3
      .arc()
      .innerRadius(radius * 0.57)
      .outerRadius(radius - 1);

    const pie = d3
      .pie()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.value);

    const svg = d3.select(this.ref.current);

    svg
      .append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr("fill", (d) => {
        return d.data.color;
      })
      .attr("d", arc)
      .on("mouseover", function (inde, d) {
        tooltip.html(
          `<div class="chart-tooltip-contents"><div class="cost-text">Monthly Spend (USD)</div><div class="value">$${d.data.value}</div><div class="name">${d.data.name}</div></div>`
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
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text((d) => `$${convertDigitToThousand(d.data.value)}`)
      );

    d3.select(this.ref.current);
  };
  render() {
    return (
      <svg
        ref={this.ref}
        width={width}
        height={height}
        viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
        style={{ maxWidth: "100%", height: "auto" }}
      ></svg>
    );
  }
}

export default CostAWSAccountsChart;

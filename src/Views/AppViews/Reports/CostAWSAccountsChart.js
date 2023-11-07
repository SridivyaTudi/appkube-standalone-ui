import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

var data = [
  { name: "AWS167263", value: 1000, color: "#B399FF" },
  { name: "AWS167264", value: 1500, color: "#F08397" },
  { name: "AWS167265", value: 800, color: "#F2BB23" },
  { name: "AWS167266", value: 1200, color: "#519FFF" },
];
var width = 360;
var height = 360;

const CostAWSAccountsChart = () => {
  const ref = useRef(null);
  function donutChart() {
    const height = Math.min(width, 400);
    const radius = Math.min(width, height) / 2;
   
    var tooltip = d3
    .select("body")
    .data(data)
    .append("div")
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

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );

    const svg = d3.select(ref.current);

    svg
      .append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr("fill", (d) => {
        return d.data.color;
      })
      .attr("d", arc)
      .append("title")
      .text((d) => ` ${d.data.value.toLocaleString()}`)

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      // .call((text) =>
      //   text
      //     .append("tspan")
      //     .attr("y", "-0.4em")
      //     .attr("font-weight", "bold")
      //     .text((d) => d.data.name)
      // )
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text((d) => `$${digitToThousand(d.data.value)}`)
      ).on("mouseover", function (inde,d) {

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

    d3.select(ref.current);
  }
  useEffect(() => {
    donutChart();
  }, []);

  function digitToThousand(value) {
    return value >= 1000
      ? Number.isInteger(value / 1000)
        ? parseInt(value / 1000) + "k"
        : Number(value / 1000).toFixed(1) + "k"
      : value;
  }
  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      style={{ maxWidth: "100%", height: "auto" }}
    >
    </svg>
  );
};

export default CostAWSAccountsChart;

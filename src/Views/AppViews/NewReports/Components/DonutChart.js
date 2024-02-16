import React, { useRef, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import * as d3 from "d3";
const thickness = 25;
const DonutChart = ({ data, width, height, style }) => {
  const svgRef = useRef();
  var pieGenerator = d3.pie().value(([key, value]) => {
    return value;
  });
  var arcData = pieGenerator(Object.entries(data));
  const areaWidth = (width - 30) / 2;
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous elements
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.6;
    var colors = ["#8676FF", "#FFBA69", "#F9D33D", "#00B929", "#FF708B"];
    const color = d3.scaleOrdinal(colors).domain(data.map((d) => d.age_group));
    const pie = d3.pie().value((d) => d.population);
    const arc = d3
      .arc()
      .innerRadius(innerRadius - thickness)
      .outerRadius(radius * 0.54);
    const arcs = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "donut-arc")
      .attr("transform", `translate(${width / 1.7},${height / 2})`);

    // Apply clip-path attribute to each arc

    //   .append("path")
    //   .attr("class", "arc")
    //   .attr("d", arc)
    //   .style("fill", (d, i) => color(i))
    //   .attr("clip-path", (d, i) => `url(#clip${i})`);

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "white")
      .style("stroke-width", 6)
      .style("stroke", "#FFFFFF")
      .style("border-radius", "50%")
      .style("fill", (d, i) => color(i))
      .attr("clip-path", (d, i) => `url(#clip${i})`);

    //   middle text center text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "25px")
      .attr("fill", "black")
      .text("$1000")
      .attr("transform", `translate(${width / 1.7},${height / 2})`);

    //   legend area
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width / 2 - 150},${height / -2 + 520})`);

    const lg = legend
      .selectAll("g")
      .data(arcData)
      .enter()
      .append("g")
      .attr("class", "legendGroup");
    // .attr("transform", (d, i) => {
    //   xOff = (i % 2) * 130;
    //   yOff = Math.floor(i / 2) * 25;
    //   return "translate(" + xOff + "," + yOff + ")";
    // });

    lg.append("rect")
      .attr("fill", (d) => {
        return color(d.data[1]);
      })
      //   legend circles
      .attr("x", 30 - 10)
      .attr("y", 31 - 10)
      .attr("width", 7)
      .attr("height", 7)
      .attr("rx", 3)
      .append("title")
      .html((d) => d.data[1]);

    //   legend text
    lg.append("text")
      .style("font-family", "Georgia")
      .style("font-size", "12px")
      .attr("x", 20 + 15)
      .attr("y", 30)
      .text((d) => d.data[1].age_group)
      .append("title");
  }, [data, height, width]);
  return (
    <Box className="spend-overview-chart">
      <svg ref={svgRef} width={width} height={height} style={style}></svg>
    </Box>
  );
};
export default DonutChart;

// is accepting like that manner
// let data = [
//     {
//       age_group: "Others",
//       population: 20201362,
//     },
//     {
//       age_group: "Initial Miscellaneous Code ",
//       population: 40267984,
//     },
//     {
//       age_group: "Liability Limits ",
//       population: 30672088,
//     },
//     {
//       age_group: "Payments on the file",
//       population: 53980105,
//     },
//     {
//       age_group: "Vehicle Make ",
//       population: 81489445,
//     },
//   ];

//    <DonutChart data={data} width={400} height={400} />

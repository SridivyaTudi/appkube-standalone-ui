import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Box, Grid } from "@mui/material";

var data = [
  { name: "Item A", value: 20, color: "#0077b6" },
  { name: "Item B", value: 20, color: "#d9d9d9" },
  { name: "Item C", value: 20, color: "#e5e5e5" },
  { name: "Item D", value: 20, color: "#f2e9e4" },
  { name: "Item E", value: 20, color: "#ffffff" },
];
const CostByDepartmentProducts = () => {
  const ref = useRef();
  var width = 610;
  var height = 350;
  useEffect(() => {
    donutChart();
  }, []);

  function donutChart() {
    const margin = 40;
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;
    var tooltip = d3
      .select("body")
      .data(data)
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Compute the position of each group on the pie:
    var pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value(function (d) {
        return d.value;
      });
    var data_ready = pie(data);

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.45) // This is the size of the donut hole
      .outerRadius(radius * 0.85);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", function (d) {
        return d.data.color;
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on("mouseover", function (inde, d) {
        tooltip.html(
          `<div class="chart-tooltip-contents"><div class="cost-text">Monthly Spend (USD)</div><div class="value">${d.data.value}%</div><div class="name">${d.data.name}</div></div>`
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
    svg.append("text").attr("text-anchor", "middle").text("Total Label");
    const borderArc = d3
      .arc()
      .innerRadius(radius - 10)
      .outerRadius(radius - 17);

    svg
      .append("path")
      .attr("d", borderArc({ startAngle: 0, endAngle: 2 * Math.PI }))
      .attr("fill", "#E6E6FA")
      .attr("stroke-width", 1.5);
    // Add the polylines between chart and labels:
    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", function (d) {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });
    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d) {
        return `${d.data.name} - X(${d.data.value}%)`;
      })
      .attr("transform", function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });

    d3.select(ref.current);
  }

  return (
    <>
      <Box className="heading">
        <span>Cost by Department and Products</span>
        <Box className="chart-fliter">
          <Box className="fliter-toggel">
            <i className="fa-solid fa-filter fillter-icon"></i>
            Fillter
          </Box>
        </Box>
      </Box>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Box className="chart">
            <svg ref={ref}></svg>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CostByDepartmentProducts;

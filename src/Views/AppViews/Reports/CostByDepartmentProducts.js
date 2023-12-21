import React, { Component } from "react";
import * as d3 from "d3";
import { Box, Grid } from "@mui/material";

var data = [
  { name: "Item A", value: 20, color: "#0077b6" },
  { name: "Item B", value: 20, color: "#d9d9d9" },
  { name: "Item C", value: 20, color: "#e5e5e5" },
  { name: "Item D", value: 20, color: "#f2e9e4" },
  { name: "Item E", value: 20, color: "#ffffff" },
];
let overLapData = [
  {
    letter: "A",
    col1: ".04167",
    col2: ".08165",
  },
  {
    letter: "B",
    col1: ".01492",
    col2: ".08165",
  },
  {
    letter: "C",
    col1: ".02782",
    col2: ".08165",
  },
  {
    letter: "D",
    col1: ".04253",
    col2: ".08165",
  },
  {
    letter: "E",
    col1: ".05702",
    col2: ".08165",
  },
];
let OVERLAP_COLOR = {
  COLOR_1: "#1d3557",
  COLOR_2: "#03a1fc",
};
class CostByDepartmentProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
    this.barRef = React.createRef();
  }

  componentDidMount = () => {
    this.donutChart();
    this.barChart();
  };

  donutChart = () => {
    var width = 610;
    var height = 350;
    const margin = 40;
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;
    var tooltip = d3
      .select("#root")
      .data(data)
      .append("div").attr('class','chart-tooltip')
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select(this.ref.current)
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
    svg.append("text").attr("text-anchor", "middle").text("Total ");
    svg
      .append("text")
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text(" Label");
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
        return `${d.data.name} `;
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
    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d) {
        return ` X(${d.data.value}%)`;
      })
      .attr("transform", function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        pos[1] = pos[1] + 20;
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
    d3.select(this.ref.current);
  };

  barChart = () => {
    var width = 660;
    var height = 400;
    let svg = d3.select(this.barRef.current);

    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    let x = d3.scaleLinear().rangeRound([0, width]);
    let y = d3.scaleBand().rangeRound([0, height]).padding(0.1);

    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain([
      0,
      d3.max(overLapData, function (d) {
        return d.col1;
      }),
    ]);
    y.domain(
      overLapData.map(function (d) {
        return d.letter;
      })
    );

    g.append("g")
      .attr("class", "axis x_axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g").attr("class", "axis y_axis").call(d3.axisLeft(y));

    g.selectAll(".bar")
      .data(overLapData)
      .enter()
      .append("rect")
      .attr("fill", `${OVERLAP_COLOR[`COLOR_1`]}`)
      .attr("opacity", 0.5)
      .attr("x", 0)
      .attr("y", function (d) {
        return y(d.letter) + 15;
      })
      .attr("width", function (d) {
        return x(d.col1);
      })
      .attr("height", 20);

    g.selectAll(".bar2")
      .data(overLapData)
      .enter()
      .append("rect")
      .attr("fill", `${OVERLAP_COLOR[`COLOR_2`]}`)
      .attr("opacity", 0.5)
      .attr("x", 0)
      .attr("y", function (d) {
        return y(d.letter);
      })
      .attr("width", function (d) {
        return x(d.col2);
      })
      .attr("height", 51)
      .style("z-index", "10");

    d3.select(this.barRef.current);
  };
  render() {
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
              <svg ref={this.ref}></svg>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="chart">
              <svg ref={this.barRef} viewBox="0 0 610 350"></svg>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default CostByDepartmentProducts;

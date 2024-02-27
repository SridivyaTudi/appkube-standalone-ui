import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
let data = [
  { name: "IT Infra", value: 800 },
  { name: "IT Security", value: 1200 },
  { name: "IT Ops", value: 900 },
  { name: "IT Dev", value: 900 },
  { name: "Analytics", value: 700 },
  { name: "HR", value: 750 },
  { name: "Marketing", value: 650 },
  { name: "Finance", value: 550 },
  { name: "Sales", value: 550 },
  { name: "R&D", value: 400 },
];
let topHighOfArray = data.map((d) => d.value).sort((a, b) => b - a)[0];
let narrowBarsize = topHighOfArray + 100;
const VerticalBarChart_NarrowBar = () => {
  const margin = { top: 50, right: 20, bottom: 0, left: 40 };

  // Increase the width and height as needed
  const width = 800; // Adjust the width
  const height = 300; // Adjust the height

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

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
        .call(d3.axisBottom(xScale).tickSize(0))
        .attr("style", "font-size: 14px", "sans-serif")
        .call((g) => g.select(".domain").remove());

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .attr("style", "font-size: 14px", "sans-serif")
        .call(d3.axisLeft(yScale).tickFormat((d) => "$" + d))
        .call((g) => g.select(".domain").remove());

    svg.selectAll("*").remove();

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);
    const narrowBarHeight = 1; // Height of each small rectangle
    const narrowBarPadding = 0; // Padding between small rectangles

    const barGroups = svg
      .append("g")
      .attr("class", "bars")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${xScale(d.name) * 1},0)`);
    barGroups
      .selectAll(".narrow-rect")
      .data((d) => {
        const numRects = Math.ceil(narrowBarsize / 140);
        return Array.from({ length: numRects }, (_, i) => ({
          index: i,
          value: narrowBarsize - i * 50,
        }));
      })
      .enter()
      .append("rect")
      .attr("class", "narrow-rect")
      .attr("y", (d, i) => yScale(d.value) - narrowBarHeight / 1)
      .attr("x", (d, i) => xScale.bandwidth() / 2 - 3.5)
      .attr("height", (d, i) => {
        console.log("height", d, i);
        return narrowBarsize - topHighOfArray + 80;
      })
      .attr("width", 7)
      .attr("rx", 5)
      .attr("ry", 5)
      .style("fill", (d, i, nodes) => {
        // Get the parent group
        const parentGroup = d3.select(nodes[i].parentNode);
        return "#e9ebfb";
      });

    barGroups
      .append("rect")
      .attr("y", (d) => yScale(d.value))
      .attr("x", (d, i) => xScale.bandwidth() / 3 - 4.5)
      .attr("height", (d) => height - yScale(d.value))
      .attr("width", xScale.bandwidth() - 10)
      .style("fill", this?.props?.color ? "yellow" : "#53CA43")
      .attr("rx", 3)
      .attr("ry", 3);
  }, [data, height, width, margin]);

  return (
    <svg
      style={{ width: "100%", height: "auto" }}
      ref={svgRef}
      viewBox={`-10 0 ${width} ${height + margin.top + margin.bottom}`}
    />
  );
};

export default VerticalBarChart_NarrowBar;

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  { name: "May", value: 500 },
  { name: "Jun", value: 600 },
  { name: "Jul", value: 700 },
  { name: "Aug", value: 800 },
  { name: "Sept", value: 900 },
  { name: "Oct", value: 1000 },
];

const CloudCostMonthChart = () => {
  const width = 520,
    height = 400;
  const ref = useRef(null);

  const margin = { top: 20, right: 0, bottom: 30, left: 40 };
  const extent = [
    [margin.left, margin.top],
    [width - margin.right, height - margin.top],
  ];

  useEffect(() => {
    const svg = d3.select(ref.current);

    const xScale = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .domain(data.map((d) => d.name))
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain([0, d3.max(data, (d) => d.value)])
      .nice();

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0));

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickFormat((d) => "$" + d))
        .call((g_local) => g_local.select(".domain").remove());

    var tooltip = d3
      .select("body")
      .data(data)
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
    
      const barGroups =   svg
      .append("g")
      .attr("class", "bars")
      .selectAll("rect")
      .attr("fill", "#B399FF")
      .data(data)
      .enter()
     
     barGroups.append("rect")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d.value))
      .style("fill", "#B399FF")
      .attr("rx", 5)
      .attr("ry", 5)
      .on("mouseover", function (d, data) {
        tooltip.html(
          `<div class="chart-tooltip-contents"><div class="cost-text">Cost</div><div class="value">$${data.value}</div><div class="previous-month-data"><span>+16.67%</span> vs previous month</div><div class="name">${data.name}</div></div>`
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
      })

      barGroups.append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) + 30)
      .attr('text-anchor', 'middle')
      .text((a) =>`$${a.value >= 1000 ? Number.isInteger((a.value/1000)) ? parseInt(a.value/1000) + 'k' : Number(a.value/1000).toFixed(1)+'k' : a.value}`)
      
  
    svg.append("g").attr("class", "x-axis").call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);

    
    function zoom() {
      function zoomed(event) {
        yScale.range(
          [height - margin.bottom, margin.top].map((d) =>
            event.transform.applyY(d)
          )
        );
        svg
          .selectAll(".bars rect")
          .attr("y", (d) => yScale(d.value))
          .attr("height", (d) => yScale(0) - yScale(d.value));
        svg.selectAll(".y-axis").call(yAxis);
      }

      svg.call(
        d3
          .zoom()
          .scaleExtent([1, 8])
          .translateExtent(extent)
          .extent(extent)
          .on("zoom", zoomed)
      );
    }

    d3.select(ref.current).call(zoom);
    
  }, [data, height, width]);

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width - 600} ${height}`}
    ></svg>
  );
};

export default CloudCostMonthChart;

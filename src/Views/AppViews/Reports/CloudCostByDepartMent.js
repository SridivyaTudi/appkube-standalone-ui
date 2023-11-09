import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

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

const CloudCostByDepartMent = () => {
  const width = 500;
  const height = 380;
  const ref = useRef(null);

  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const extent = [
    [margin.left, margin.top],
    [width - margin.right, height - margin.top],
  ];

  useEffect(() => {
    var tooltip = d3
      .select("body")
      .data(data)
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const yMinValue = d3.min(data, (d) => d.value);
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
        d3.axisLeft(yScale).tickFormat((d, index) => `$${digitToThousand(d)}`)
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
        return `$${digitToThousand(d.value)}`;
      });

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#b399ff")
      .attr("stroke-width", 2)
      .attr("d", line);

    d3.select(ref.current);
  }, [height, width]);

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

      // viewBox={`0 0 ${width - 600} ${height}`}
    >
      <defs>
        <filter x="0" y="0" width="1" height="1" id="solid">
          <feFlood floodColor="#d2d2d3" floodOpacity="0.4" />
          <feComposite in="SourceGraphic" operator="xor" />
        </filter>
      </defs>
    </svg>
  );
};

export default CloudCostByDepartMent;

import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import * as d3 from "d3";
const thickness = 25;
const DonutChart = ({ data, width, height, style, otherData }) => {
  const svgRef = useRef();
  var pieGenerator = d3.pie().value(([key, value]) => {
    return value;
  });
  var arcData = pieGenerator(Object.entries(data));
  useEffect(() => {
    if (data?.length) {
      try {
        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove(); // Clear previous elements
        let tooltip = d3
          .select("#root")
          .data(data)
          .append("div")
          .attr("class", "chart-tooltip")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("visibility", "hidden");
        const radius = Math.min(width, height) / 1.6;
        const innerRadius = radius * 0.6;
        var colors = data.map(
          (e, i) => ["#FF708B", "#ffba69", "#f9d33d", "#8676ff", "#34A2C2"][i]
        );
        const color = d3
          .scaleOrdinal(colors)
          .domain(data.map((d) => d.age_group));
        const pie = d3
          .pie()
          .value((d) => d.population)
          .padAngle(0.05);
        const arc = d3
          .arc()
          .innerRadius(innerRadius - thickness)
          .outerRadius(radius * 0.54)
          .cornerRadius(10);
        const arcs = svg
          .selectAll(".arc")
          .data(pie(data))
          .enter()
          .append("g")
          .attr("class", "donut-arc")
          .attr("transform", `translate(${width / 2},${height / 2.5})`);

        arcs
          .append("path")
          .attr("d", arc)
          .attr("fill", (d, i) => color(i))
          .style("border-radius", "50%")
          .style("fill", (d, i) => color(i))
          .attr("clip-path", (d, i) => `url(#clip${i})`)
          .on("mouseover", function (d, data) {
            tooltip.html(
              `<div class="chart-tooltip-contents"><div class="value">${
                data?.data?.age_group
              } : $${data?.data?.population || 0}</div></div>`
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

        //   middle text center text
        svg
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("font-size", "20px")
          .attr("font-family", "'Poppins', sans-serif")
          .attr("font-weight", "600")
          .attr("fill", "#383874")
          .text(otherData?.centerValue)
          .attr("transform", `translate(${width / 2},${height / 2.4})`);

        //   legend area
        const legend = svg
          .append("g")
          .attr("class", "legend")
          .attr(
            "transform",
            `translate(${width / 2.8},${height - height / 3})`
          );

        const lg = legend
          .selectAll("g")
          .data(arcData)
          .enter()
          .append("g")
          .attr("class", "legendGroup")
          .attr("transform", (d, i) => {
            let xOff = (i % 2) * 120;
            let yOff = Math.floor(i / 2) * 25;
            return "translate(" + xOff + "," + yOff + ")";
          });

        lg.append("rect")
          .attr("fill", (d) => {
            return color(d.data[1]);
          })
          //   legend circles
          .attr("x", -70)
          .attr("y", 32 - 10)
          .attr("width", 7)
          .attr("height", 7)
          .attr("rx", 4)
          .append("title");

        //   legend text
        lg.append("text")
          .style("font-family", "'Poppins', sans-serif")
          .style("font-size", "12px")
          .style("text-transform", "lowercase")
          .attr("x", -60)
          .attr("y", 30)
          .text((d) => {
            let label = `${d.data[1].age_group} ${d.data[1]?.percentage || 0}%`;
            return label;
          });
        // .on("mouseover", function (d, data) {
        //   let label = `${data.data[1]?.age_group} ${
        //     d.data[1]?.percentage || 0
        //   }%%`;

        //   tooltip.html(
        //     `<div class="chart-tooltip-contents"><div class="value">${label}</div></div>`
        //   );
        //   return tooltip.style("visibility", "visible");
        // })
        // .on("mousemove", function (d) {
        //   return tooltip
        //     .style("top", d.pageY - 30 + "px")
        //     .style("left", d.pageX - 60 + "px");
        // })
        // .on("mouseout", function () {
        //   return tooltip.style("visibility", "hidden");
        // })
        // .append("title");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, height, width]);

  return (
    <Box
      className="spend-overview-chart"
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
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

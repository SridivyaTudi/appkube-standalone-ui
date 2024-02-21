import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

function ProgressBar(props) {
  const ref = useRef();

  useEffect(() => {
    const progressBarWidth = ref.current.parentElement.clientWidth; // Get the width of the parent container
    const progress = 0.2;
    const svgElement = d3
      .select(ref.current)
      .append("svg")
      .attr("width", progressBarWidth); // Set the width of the SVG

    svgElement
      .append("rect")
      .attr("rx", 0)
      .attr("ry", 3)
      .attr("fill", "#E0E0E0")
      .attr("height", 14)
      .attr("width", progressBarWidth)
      .attr("x", 0);

    svgElement
      .append("rect")
      .attr("rx", 0)
      .attr("ry", 0)
      .attr("fill", props?.color?props.color:"red")
      .attr("height", 14)
      .attr("width", progress * progressBarWidth) // Adjust the width based on the progress
      .attr("x", 0);

    // Calculate x position for the line (middle of the chart)
    const lineX = progressBarWidth / 2;

    // Append line in the middle of the chart
    svgElement
      .append("line")
      .attr("x1", lineX)
      .attr("y1", 0)
      .attr("x2", lineX)
      .attr("y2", 14)
      .attr("stroke", "black")
      .attr("stroke-width", 1);
  }, []);

  return <svg ref={ref} style={{ width: "100%", height: "20px" }} />;
}

export default ProgressBar;

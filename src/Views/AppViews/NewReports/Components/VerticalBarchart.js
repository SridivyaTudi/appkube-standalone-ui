import React, { Component } from "react";
let width = 460;
let height = 450;
class VerticalBarchart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => this.renderChart();

  renderChart = () => {
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.Country;
        })
      )
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.Country);
      })
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      // no bar at the beginning thus:
      .attr("height", function (d) {
        return height - y(0);
      }) // always equal to 0
      .attr("y", function (d) {
        return y(0);
      });

    // Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d) {
        return y(d.Value);
      })
      .attr("height", function (d) {
        return height - y(d.Value);
      })
      .delay(function (d, i) {
        console.log(i);
        return i * 100;
      });
    const svg = d3.select(this.ref.current);

    d3.select(this.ref.current);
  };

  render() {
    return (
      <svg
        ref={this.ref}
        width={width}
        height={height}
        // viewBox={`0 0 ${width - 600} ${height}`}
      ></svg>
    );
  }
}

export default VerticalBarchart;

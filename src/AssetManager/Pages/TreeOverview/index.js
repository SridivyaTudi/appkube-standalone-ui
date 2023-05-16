import React, { Component } from "react";
import { Link } from "react-router-dom";
import businnessesIocn from "../../../assets/img/assetmanager/businnesses-icon.png";
import meshIocn from "../../../assets/img/assetmanager/mesh-icon.png";
import Lakes from "../../../assets/img/assetmanager/lakes.png";
import Targets from "../../../assets/img/assetmanager/targets.png";
import Tables from "../../../assets/img/assetmanager/tables.png";
import Catalougeus from "../../../assets/img/assetmanager/catalougeus.png";
import d3 from "d3";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
var treeData = {
  name: "AUT-1",
  children: [
    {
      name: "PUB-1",
      children: [
        {
          name: "AUT-11",
          children: [{ name: "AFF-111" }, { name: "AFF-112" }],
        },
        { name: "AUT-12", children: [{ name: "AFF-121" }] },
      ],
      readious: 20,
    },
    {
      name: "PUB-2",
      children: [
        { name: "AUT-21" },
        { name: "AUT-22" },

        {
          name: "AUT-28",
          children: [
            { name: "AFF-281" },
            { name: "AFF-282" },
            { name: "AFF-283" },
          ],
        },
      ],
      readious: 20,
    },
    { name: "PUB-3", readious: 20 },
    {
      name: "PUB-4",
      children: [
        { name: "AUT-41" },
        { name: "AUT-42" },
        {
          name: "AUT-43",
        },
        { name: "AUT-44" },
      ],
      readious: 20,
    },
    {
      name: "PUB-5",
      children: [
        {
          name: "AUT-51",
        },
        { name: "AUT-52" },
        { name: "AUT-53" },
      ],
    },
    {
      name: "PUB-6",
      children: [
        {
          name: "AUT-61",
          children: [
            { name: "AFF-611" },

            {
              name: "AFF-614",
              children: [{ name: "ADD-6141" }, { name: "ADD-6142" }],
            },
          ],
        },
        { name: "AUT-62" },
        { name: "AUT-63" },
      ],
      radious: 20,
    },
  ],
  radious: 30,
};
class TreeOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { treeData };
  }
  componentDidMount() {
    this.treeInIt(this.state.treeData);
  }
  treeInIt(data) {
    var node = document.createElement("div");

    var diameter = 800;

    var margin = { top: 20, right: 120, bottom: 20, left: 120 },
      width = diameter,
      height = diameter;

    var i = 0,
      duration = 350,
      root;

    var tree = d3.layout
      .tree()
      .size([360, diameter / 2 - 80])
      .separation(function (a, b) {
        return (a.parent == b.parent ? 1 : 10) / a.depth || 1;
      });

    var diagonal = d3.svg.diagonal.radial().projection(function (d) {
      return [d.y, (d.x / 180) * Math.PI];
    });

    var svg = d3
      .select("#tree_circular")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr(
        "transform",
        "translate(" + diameter / 2 + "," + diameter / 2 + ")"
      );

    root = data;
    root.x0 = height / 2;
    root.y0 = 0;

    // update(root);
    var tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "blue");

    function update(source) {
      // Compute the new tree layout.
      var nodes = tree.nodes(root),
        links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function (d) {
        d.y = d.depth && d.depth * 80;
      });

      // Update the nodes…
      var node = svg.selectAll("g.node").data(nodes, function (d) {
        return d.id || (d.id = ++i);
      });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .on("click", click)
        .on("mouseover", function (d) {
          tooltip.text(d.name);
          return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function () {
          return tooltip
            .style("top", d3.event.pageY - 10 + "px")
            .style("left", d3.event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          return tooltip.style("visibility", "hidden");
        });
      console.log(nodeEnter);
      nodeEnter
        .append("circle")
        .attr("r", 1e-6)
        .attr("x", 50)
        .attr("y", 50)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        })
        .style("transform", "rotate(0.5turn)");

      nodeEnter
        .append("text")
        .attr("x", 10)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .text(function (d) {
          return d.name;
        })
        .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        });

      nodeUpdate
        .select("circle")
        .attr("r", function (d) {
          return d.radious || 10;
        })
        .attr("x", 50)
        .attr("y", 50)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        })
        .style("transform", "rotate(0.5turn)");

      nodeUpdate
        .select("text")
        .style("fill-opacity", 1)
        .attr("transform", function (d) {
          return d.x < 180
            ? "translate(0)"
            : "rotate(180)translate(-" + (d.name.length + 50) + ")";
        });

      // TODO: appropriate transform
      var nodeExit = node.exit().transition().duration(duration).remove();

      nodeExit.select("circle").attr("r", 1e-6);

      nodeExit.select("text").style("fill-opacity", 1e-6);

      // Update the links…
      var link = svg.selectAll("path.link").data(links, function (d) {
        return d.target.id;
      });

      // Enter any new links at the parent's previous position.
      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function (d) {
          var o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      // Transition links to their new position.
      link.transition().duration(duration).attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function (d) {
          var o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
    // Toggle children on click.
    function click(d) {
      // if (d.children) {
      //   d._children = d.children;
      //   d.children = null;
      // } else {
      //   d.children = d._children;
      //   d._children = null;
      // }
      // update(d);
    }

    update(root);
  }
  render() {
    const {} = this.state;
    return (
      <div className="tree-overview-container">
        <div className="tree-overview-left">
          <div className="heading">Ogranization Details</div>
          <div className="total-cost-price">
            <span>Total Cost</span>
            <strong>$98,642</strong>
          </div>
          <div className="cost-businnesses">
            <div className="businnesses-box">
              <div className="businnesses-heading">
                {"Line of Businnesses (LOBs)"}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="icon">
                    <img src={businnessesIocn} alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cost">30</div>
                </div>
              </div>
            </div>
            <div className="businnesses-box">
              <div className="businnesses-heading">{"Total Mesh"}</div>
              <div className="row">
                <div className="col-md-6">
                  <div className="icon">
                    <img src={meshIocn} alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cost">02</div>
                </div>
              </div>
            </div>
          </div>
          <div className="total-accounts">
            <div className="accounts-heading">Total Accounts</div>
            <div className="accounts-box">
              <div className="content">
                <span>Central Accounts</span>
                <strong>02</strong>
              </div>
              <div className="content">
                <span>Producer Accounts</span>
                <strong>05</strong>
              </div>
              <div className="content">
                <span>Consumer Accounts</span>
                <strong>23</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="tree-overview-center">
          <TransformWrapper>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <React.Fragment>
                <TransformComponent
                // wrapperStyle={{ width: "100%", height: "100%" }}
                // contentStyle={{
                //   width: "100%",
                //   height: "100%",
                //   justifyContent: "center",
                //   alignItems: "flex-start",
                //   paddingTop: "50px",
                //   display: "flex",
                //   transform: "translate(0px, 0px) scale(0)",
                // }}
                >
                  <div className="tree-overview" id="tree_circular"></div>
                </TransformComponent>
              </React.Fragment>
            )}
          </TransformWrapper>
        </div>
        <div className="tree-overview-right">
          <div className="head">
            <button className="new-button-outline">Refresh</button>
            <button className="new-button">
              <Link to={`/assetmanager/pages/treeoverview/overviewdetails`}>
                Change View
              </Link>
            </button>
          </div>
          <div className="heading">Resources</div>
          <div className="cost-businnesses">
            <div className="businnesses-box">
              <div className="businnesses-heading">{"Lakes"}</div>
              <div className="row">
                <div className="col-md-5">
                  <div className="icon">
                    <img src={Lakes} alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="cost">2K</div>
                </div>
              </div>
            </div>
            <div className="businnesses-box">
              <div className="businnesses-heading">{"Total s3 Targets"}</div>
              <div className="row">
                <div className="col-md-5">
                  <div className="icon">
                    <img src={Targets} alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="cost">10K</div>
                </div>
              </div>
            </div>
            <div className="businnesses-box">
              <div className="businnesses-heading">{"Total Tables"}</div>
              <div className="row">
                <div className="col-md-5">
                  <div className="icon">
                    <img src={Tables} alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="cost">50K</div>
                </div>
              </div>
            </div>
            <div className="businnesses-box">
              <div className="businnesses-heading">{"Shared Catalogues"}</div>
              <div className="row">
                <div className="col-md-5">
                  <div className="icon">
                    <img src={Catalougeus} alt="" />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="cost">40K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TreeOverview;

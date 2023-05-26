import React, { Component } from "react";
import AWS from "../../../assets/img/aws.png";
import { Link } from "react-router-dom";
import Iam from "./Iam";
import Kms from "./Kms";
import S3 from "./S3";
import Glue from "./Glue";
import Lakeformation from "./Lakeformation";
import * as d3 from "d3";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
var upstreamData = [
  {
    name: "",
    parent: "",
    children: [
      { name: "Consumer" },
      { name: "Consumer" },
      { name: "Consumer" },
      { name: "Consumer" },
      { name: "Consumer" },
    ],
    isRoot: true,
  },
];
// Downstream data

var downstreamData = [
  {
    name: "",
    parent: "",
    children: [
      { name: "Producer" },
      { name: "Producer" },
      { name: "Producer" },
      { name: "Producer" },
      { name: "Producer" },
    ],
    isRoot: true,
  },
];
class MeshTopology extends Component {
  tabMapping = [
    {
      name: "Iam",
      dataKey: "iam",
    },
    {
      name: "KSM",
      dataKey: "ksm",
    },
    {
      name: "S3",
      dataKey: "s3",
    },
    {
      name: "Glue",
      dataKey: "glue",
    },
    {
      name: "Lakeformation",
      dataKey: "lakeformation",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      servicesPanelShow: false,
      activeTab: 0,
    };
  }
  componentDidMount() {
    this.init();
  }
  toggleColumnSelect = () => {
    this.setState({
      servicesPanelShow: !this.state.servicesPanelShow,
    });
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };
  init() {
    var margin = {
        top: 20,
        right: 120,
        bottom: 20,
        left: 220,
      },
      width = 1000 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

    var i = 0,
      duration = 750,
      root;

    var tree = d3.layout.tree().size([height, width]);

    var diagonal = d3.svg.diagonal().projection(function (d) {
      return [d.y, d.x];
    });

    var svg = d3
      .select("#meshTopology")
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .style("position", "relative")
      .style("left", -310);

    this.makeRightTree();
    this.makeLeftTree();
  }
  makeRightTree() {
    // ************** Generate the tree diagram  *****************
    var margin = {
        top: 20,
        right: 150,
        bottom: 20,
        left: 120,
      },
      width = 1260 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

    var i = 0,
      duration = 750,
      root;

    var tree = d3.layout.tree().size([height, width]);

    var diagonal = d3.svg.diagonal().projection(function (d) {
      return [d.y, d.x];
    });

    var svg = d3
      .select("svg")
      .append("g")
      .attr("transform", "translate(700,0)");

    root = upstreamData[0];
    var oldrx = (root.x0 = height / 2);
    var oldry = (root.y0 = 0);

    update(root);

    function update(source) {
      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function (d) {
        d.y = d.depth * 180;
      });

      // Update the nodes…
      var node = svg.selectAll("g.node").data(nodes, function (d) {
        return d.id || (d.id = ++i);
      });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", function (d) {
          if (d.parent == "null") {
            return "node rightparent"; //since its root its parent is null
          } else {
            return "node rightchild"; //all nodes with parent will have this class
          }
        })
        .attr("transform", function (d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        });

      nodeEnter
        .append("rect")
        .attr("x", function (d) {
          return d.isRoot ? -92 : 1;
        })
        .attr("y", "-15")
        .attr("height", function (d) {
          return d.isRoot ? 40 : 30;
        })
        .attr("width", function (d) {
          return 100;
        })
        // .attr("rx", 15)
        // .attr("ry", 15)
        .style("fill", "var(--color-textondarkcanvas, #fff)")
        .style("strokeWidth", 33)
        .style("stroke", function (d) {
          return d.isRoot ? "blue" : "rgb(0,0,0)";
        });

      nodeEnter
        .append("text")
        .attr("x", function (d) {
          return d.children || d._children ? -13 : 13;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function (d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function (d) {
          return d.name;
        })
        .style("fill-opacity", 1e-6);

      // Transition nodes to their new position.
      var nodeUpdate = node
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
          if (d.parent == "null") {
            d.y = oldry;
            d.x = oldrx;
          }

          return "translate(" + d.y + "," + d.x + ")";
        });

      nodeUpdate
        .select("circle")
        .attr("r", 10)
        .style("fill", function (d) {
          return d._children ? "#fff" : "#fff";
        });

      nodeUpdate.select("text").style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

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
          var o = {
            x: source.x0,
            y: source.y0,
          };
          return diagonal({
            source: o,
            target: o,
          });
        })
        .style("stroke", "grey");

      // Transition links to their new position.
      link.transition().duration(duration).attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function (d) {
          var o = {
            x: source.x,
            y: source.y,
          };
          return diagonal({
            source: o,
            target: o,
          });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
  }

  makeLeftTree() {
    // ************** Generate the tree diagram  *****************
    var margin = {
        top: 20,
        right: 120,
        bottom: 20,
        left: 120,
      },
      width = 1260 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

    var i = 0,
      duration = 750,
      root;

    var tree = d3.layout.tree().size([height, width]);

    var diagonal = d3.svg.diagonal().projection(function (d) {
      return [d.y, d.x];
    });

    var svg = d3
      .select("svg")
      .append("g")
      .attr("transform", "translate(-398,0)");

    root = downstreamData[0];
    var oldlx = (root.x0 = height / 2);
    var oldly = (root.y0 = width);

    update(root);

    function update(source) {
      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function (d) {
        d.y = width - d.depth * 180;
      });

      // Update the nodes…
      var node = svg.selectAll("g.node").data(nodes, function (d) {
        return d.id || (d.id = ++i);
      });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", function (d) {
          if (d.parent == "null") {
            return "node leftparent"; //since its root its parent is null
          } else return "node leftchild"; //all nodes with parent will have this class
        })
        .attr("transform", function (d) {
          return "translate(" + (source.y0 - 100) + "," + source.x0 + ")";
        });
      // .on("click", click);

      nodeEnter
        .append("rect")
        .attr("x", function (d) {
          return d.isRoot ? 4 : 1;
        })
        .attr("y", "-15")
        .attr("height", function (d) {
          return d.isRoot ? 40 : 30;
        })
        .attr("width", function (d) {
          return 100;
        })
        .style("fill", "var(--color-textondarkcanvas, #fff)")
        .style("strokeWidth", 33)
        .style("stroke", "rgb(0,0,0)");

      nodeEnter
        .append("text")
        .attr("x", function (d) {
          return d.isRoot ? 88 : d.children || d._children ? -13 : 13;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function (d) {
          return d.children || d._children ? "end" : "start";
        })
        .text(function (d) {
          return d.isRoot ? "Cluster Account" : d.name;
        })
        .style("fill-opacity", 1e-6);
      // Transition nodes to their new position.
      var nodeUpdate = node
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
          if (d.parent == "null") {
            d.y = oldly;
            d.x = oldlx;
          }
          return `translate(${d.isRoot ? d.y - 18 : d.y - 100},${d.x} )`;
        });

      nodeUpdate
        .select("circle")
        .attr("r", 10)
        .style("fill", function (d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeUpdate.select("text").style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

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
          var o = {
            x: source.x0,
            y: source.y0,
          };
          return diagonal({
            source: o,
            target: o,
          });
        })
        .style("stroke", "grey");
      // Transition links to their new position.
      link.transition().duration(duration).attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function (d) {
          var o = {
            x: source.x,
            y: source.y,
          };
          return diagonal({
            source: o,
            target: o,
          });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
  }
  render() {
    const { servicesPanelShow, activeTab } = this.state;
    return (
      <div className="mesh-topology-container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="mesh-topology-left">
              <h2>Mesh Topology</h2>
              <TransformWrapper>
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <React.Fragment>
                    <div className="gmnoprint">
                      <div className="gmnoprint-plus-minus">
                        <button
                          className="btn btn-plus"
                          onClick={() => zoomIn()}
                        >
                          <i className="fal fa-plus"></i>
                        </button>
                        <button
                          className="btn btn-minus"
                          onClick={() => zoomOut()}
                        >
                          <i className="fal fa-minus"></i>
                        </button>
                      </div>
                     
                    </div>
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
                      <div
                        className="topology-chart-box"
                        id="meshTopology"
                      ></div>
                    </TransformComponent>
                  </React.Fragment>
                )}
              </TransformWrapper>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <div className="mesh-topology-right">
              <h2 className="text-center">Central Account</h2>
              <div className="services-panel-tabs">
                <div className="tabs-head">
                  <ul>
                    {this.tabMapping.map((tabData, index) => {
                      return (
                        <li
                          key={`ops-tab-${index}`}
                          className={index === activeTab ? "active" : ""}
                          onClick={(e) => this.setActiveTab(index)}
                        >
                          {tabData.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="tabs-content">
                  {activeTab === 0 ? (
                    <Iam
                      updateCloudName={(service) => {
                        this.setState({ service });
                      }}
                    />
                  ) : activeTab === 1 ? (
                    <Kms
                      departmentWiseData={this.state?.departmentWiseData}
                      updateCurrentAccountId={this.updateCurrentAccountId}
                    />
                  ) : activeTab === 2 ? (
                    <S3 />
                  ) : activeTab === 3 ? (
                    <Glue
                      updateCurrentAccountId={this.updateCurrentAccountId}
                    />
                  ) : activeTab === 4 ? (
                    <Lakeformation
                      updateCurrentAccountId={this.updateCurrentAccountId}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead className="active">
                <tr>
                  <th>
                    <strong>Role Name</strong>
                  </th>
                  <th>Policy Name </th>
                  <th>Trust Relationship</th>
                  <th>Access Advisor</th>
                  <th>Key Tags</th>
                  <th>Creation Date</th>
                  <th>Created By</th>
                  <th>Last Updated Time</th>
                  <th>Updated By</th>
                  <th>Deletion Time</th>
                  <th>Deleted By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MeshTopology;

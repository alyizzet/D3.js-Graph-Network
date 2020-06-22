var width = 2000,
  height = 1000;

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var force = d3.layout
  .force()
  .gravity(0.05)
  .distance(200)
  .charge(-100)
  .size([width, height]);

d3.json("./data/data.json", function (json) {
  force.nodes(json.nodes).links(json.links).start();

  var link = svg
    .selectAll(".link")
    .data(json.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .style("stroke-width", function (d) {
      return Math.sqrt(d.weight);
    });

  var node = svg
    .selectAll(".node")
    .data(json.nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .call(force.drag);

  node.append("circle").attr("r", "10");

  node
    .append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function (d) {
      return d.name;
    });

  force.on("tick", function () {
    link
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    node.attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  });
});

// create a tooltip

// create a tooltip
var Tooltip = d3
  .select("#div_template")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function (d) {
  Tooltip.style("opacity", 1);
  d3.select(this).style("stroke", "black").style("opacity", 1);
};
var mousemove = function (d) {
  Tooltip.html("The exact value of<br>this cell is: " + d.value)
    .style("left", d3.mouse(this)[0] + 70 + "px")
    .style("top", d3.mouse(this)[1] + "px");
};
var mouseleave = function (d) {
  Tooltip.style("opacity", 0);
  d3.select(this).style("stroke", "none").style("opacity", 0.8);
};

var width = 800,
    height = 600;

var margin = {
    'top': 30,
    'right': 35,
    'bottom': 30,
    'left': 30
};

var svg = d3.selectAll("#content")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("id", "canvas")
	// .style("background", "cyan");

var x = d3.scaleLinear().domain([15, 35]).range([0, width]);
var y = d3.scaleLinear().domain([0.40, 0.60]).range([0, height]);

var xAxis = d3.axisBottom(x).tickSizeInner(0).ticks(5);
var yAxis = d3.axisLeft(y);

svg
	.append("g")
	.attr("transform", "translate(0, " + String(height-margin.bottom) + ")")
	.call(xAxis)
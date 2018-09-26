// Dear Lisa, these are the things you'll need to change when you want to put this on doranslab.gg

var WHERE_IWR_w_CSV_LIVES = "static/IWR_w_CI.csv";

var width = 800;
var height = 600;

var margin = {
    'top': 5,
    'right': 60,
    'bottom': 60,
    'left': 60
};

// Okay, the rest of this is code


function updateConfidenceIntervals() {
  if (Window.confidenceIntervalsCheckbox) { // If it's already checked, uncheck it
    Window.confidenceIntervalsCheckbox = false;
    d3.selectAll("#confidence-interval-checkbox").style("fill", "rgba(150, 0, 150, .3)");
  }
  else { // If it's unchecked, check it and assign true
    Window.confidenceIntervalsCheckbox = true;
    d3.selectAll("#confidence-interval-checkbox").style("fill", "rgba(150, 0, 150, 1)");
  }
  somethingChanged();
}

function updateSampleSize() {
  if (Window.sampleSizeCheckbox) { // If it's already checked, uncheck it
    Window.sampleSizeCheckbox = false;
    d3.selectAll("#sample-size-checkbox").style("fill", "rgba(150, 0, 150, .3)");
  }
  else { // If it's unchecked, check it and assign true
    Window.sampleSizeCheckbox = true;
    d3.selectAll("#sample-size-checkbox").style("fill", "rgba(150, 0, 150, 1)");
  }
  somethingChanged();
}

function toggleMouseoverTier() {
  if (Window.bronzeGoldMouseover) { 
    Window.bronzeGoldMouseover = false;
    d3.selectAll("#which-tier-to-toggle-mouseover").style("fill", "rgba(150, 0, 150, .3)");
  }
  else { 
    Window.bronzeGoldMouseover = true;
    d3.selectAll("#which-tier-to-toggle-mouseover").style("fill", "rgba(150, 0, 150, 1)");
  }
  somethingChanged();
}





function nextChampion() {
  if (Window.champidx == Window.champions.length-1) {
    console.log("");
  }
  else {
    Window.champidx = Window.champidx + 1;
    document.getElementById("myinput").value = Window.champions[Window.champidx];
  }
  somethingChanged();
}

function previousChampion() {
  if (Window.champidx == 0) {
    console.log("");
  }
  else {
    Window.champidx = Window.champidx - 1;
    console.log("Hey")
    document.getElementById("myinput").value = Window.champions[Window.champidx];
  }
  somethingChanged();
}

function se95(p, n) {
  return Math.sqrt(p*(1-p)/n)*1.96;
}

var bisectDate = d3.bisector(function(d){return d.x}).left;
var svg = d3.selectAll("#content")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("id", "canvas");


var maxGamesRemaining = 100;
var minGamesRemaining = 0;

var x = d3.scaleLinear().domain([15, 35]).range([margin.left, width-margin.right]);
var y = d3.scaleLinear().domain([0.6, .4]).range([margin.top, height-margin.bottom]);
var r = d3.scaleLinear().domain([maxGamesRemaining, minGamesRemaining]).range([margin.top, height-margin.bottom]);



// Legends
var bronzegoldbox = d3.selectAll("div#bronzegoldbox").append("svg").attr("width", 80).attr("height", 15).style("background", "rgba(0, 100, 250, .4)");

bronzegoldbox.append("line").attr("id", "bronzegoldline").attr("x1", 1).attr("x2", 80).attr("y1", 7).attr("y2", 7).style("stroke-width", "2px").attr("stroke", "blue");

var platniumbox = d3.selectAll("div#platniumbox").append("svg").attr("width", 80).attr("height", 15).style("background", "rgba(150, 0, 50, 0.3");

platniumbox.append("line").attr("id", "platniumline").attr("x1", 1).attr("x2", 80).attr("y1", 7).attr("y2", 7).style("stroke-width", "2px").attr("stroke", "orange");

var gamesremainingbronzegoldbox = d3.selectAll("div#gamesremainingbronzegold").append("svg").attr("width", 80).attr("height", 15)

gamesremainingbronzegoldbox.append("line").attr("id", "theline").attr("x1", 1).attr("x2", 80).attr("y1", 7).attr("y2", 7).style("stroke-width", "2px").attr("stroke", "blue").style("stroke-dasharray", ("4, 2"));

var gamesremainingplatniumbox = d3.selectAll("div#gamesremainingplatnium").append("svg").attr("width", 80).attr("height", 15)

gamesremainingplatniumbox.append("line").attr("id", "theline").attr("x1", 1).attr("x2", 80).attr("y1", 7).attr("y2", 7).style("stroke-width", "2px").attr("stroke", "orange").style("stroke-dasharray", ("4, 2"));

  


var xAxis = d3.axisBottom(x).tickSizeInner(0).tickSizeOuter(0).ticks(5);
var lAxis = d3.axisLeft(y).tickSizeInner(0).tickSizeOuter(0).ticks(5);
var rAxis = d3.axisRight(r).tickSizeInner(0).tickSizeOuter(0).ticks(6).tickFormat((d)=> d + 'K' );

// Declar axes
svg
  .append("g")
  .attr("id", "x-axis")
  .attr("transform", "translate(0, " + String(height-margin.bottom) + ")")
  .call(xAxis);

svg
  .append("g")
  .attr("id", "l-axis")
  .style("stroke-width", "2px")
  .attr("transform", "translate(" + String(margin.left) + ",0)")
  .call(lAxis);

svg
  .append("g")
  .attr("id", "r-axis")
  .attr("transform", "translate(" + String(width - margin.right) + ",0)")
  .call(rAxis);

d3.selectAll("#x-axis")
  .selectAll("text")
  // .attr("transform", "translate(0, 8)")
  .style("font-size", "12px");

d3.selectAll("#l-axis")
  .selectAll("text")
  // .attr("transform", "translate(-8,0)")
  .style("font-size", "12px");

d3.selectAll("#r-axis")
  .selectAll("text")
  // .attr("transform", "translate(8,0)")
  .style("font-size", "12px");

// Line going through middle
d3.selectAll("svg")
  .append("g")
  .append("line")
  .style("stroke", "black")
  .style("stroke-width", "2px")
  .attr("x1", x(15))
  .attr("x2", x(35))
  .attr("y1", y(.5))
  .attr("y2", y(.5))

// Line across top
d3.selectAll("svg")
  .append("g")
  .append("line")
  .style("stroke", "black")
  .style("stroke-width", "1px")
  .attr("x1", x(15))
  .attr("x2", x(35))
  .attr("y1", y(.6))
  .attr("y2", y(.6))

// x-axis label
svg.append("text")             
  .attr("x", x(25))
  .attr("y", y(.4) + 15)
  .attr("transform", "translate(0, 35)")
  .style("text-anchor", "middle")
  .text("Minutes")
  .style("font-size", "18px")
  .attr("class", "axis-labels");

// y-axis label
var x0 = margin.left;
var y0 = (.5)*(height - margin.top - margin.bottom) + margin.top;
var dx = -y0 - x0;
var dy = x0 - y0 - 35;

svg.append("text")  
  .attr("id", "y-axis-label")           
  .attr("x", x(15))
  .attr("y", y(.5))
  .attr("transform", "rotate(-90) translate("+ dx +","+ dy +")")
  .style("text-anchor", "middle")
  .text("IWR")
  .attr("class", "axis-labels")

// r-axis label
var x0 = width - margin.right;
var y0 = (.5)*(height - margin.top - margin.bottom) + margin.top;
var dx = y0 - x0;
var dy = -x0 - y0 - 35;

svg.append("text")  
  .attr("id", "r-axis-label")           
  .attr("x", x(35))
  .attr("y", y(.5))
  .attr("transform", "rotate(90) translate("+ dx +","+ dy +")")
  .style("text-anchor", "middle")
  .text("Games Remaining")
  .style("font-size", "18px")
  .attr("class", "axis-labels")

var area = d3.area()
    .x(function(d) { 
      return x(d.x)
    })
    .y0(function(d) { 
      return y(parseFloat(d.lcl))
    })
    .y1(function(d) { 
      return y(parseFloat(d.ucl))
    });

var winrateline = d3.line()
  .x(function(d) {return x(d.x)})
  .y(function(d) {return y(d.y)})
  .curve(d3.curveLinear);

var gamesremainingline = d3.line()
  .x(function(d) {return x(d.x)})
  .y(function(d) {
    console.log(d.r);
    return r(d.r)
  })
  .curve(d3.curveLinear);

var getCSV = {"Volibear": "volibear.csv", "Kai'Sa": "kaisa.csv", "Ashe": "ashe.csv", "Vayne": "vayne.csv", "Miss Fortune": "missfortune.csv"};



function plotChampion(data, g, confidenceIntervals, sampleSizeCheckbox, color) {
  var winratepath = g.append("path");
    winratepath
      .datum(data)
      .attr("class", "winrate-path")
      .attr("d", winrateline)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", "2px")

  if (sampleSizeCheckbox){
    var gamesremainingpath = g.append("path");
    gamesremainingpath
      .datum(data)
      .attr("class", "gamesremaining-path")
      .attr("d", gamesremainingline)
      .attr("fill", "none")
      .attr("stroke", color)
      .style("stroke-dasharray", ("3, 3"))
      .attr("stroke-width", "1px")
  }


  if (confidenceIntervals){
    if (color == "orange") {  
      g.append("path")
          .datum(data)
          .attr("fill", "rgba(200, 50, 20 ,0.3)")
          .attr("d", area);
    }
    if (color == "blue") {  
      g.append("path")
          .datum(data)
          .attr("fill", "rgba(0, 100, 250,0.3)")
          .attr("d", area);
    }

  }
}




function somethingChanged() {

  Window.justChanged = true;

  // Remove everything
  svg.selectAll("g.displayed-data").remove();

  // Get the three parameters: champion, confidenceIntervals and sampleSize
  var currentChampion = document.getElementById("myinput").value;
  var confidenceIntervals = document.getElementById("confidence-interval-checkbox").checked;
  var sampleSizeCheckbox = document.getElementById("sample-size-checkbox").checked;

  var confidenceIntervals = Window.confidenceIntervalsCheckbox;
  var sampleSizeCheckbox = Window.sampleSizeCheckbox;



  var filename = "static/" + getCSV[currentChampion];
  var g = svg.append("g").attr("class", "displayed-data");

  var bronzeGoldData = Window.data.filter(function(el) {
    return el["Champion"] == currentChampion &&
      el["match_rank"] == "Bronze-Gold";
  });

  var bronzeGoldInitialWinrate = Window.data.filter(function(el) {
    return el["Champion"] == currentChampion &&
      el["match_rank"] == "Bronze-Gold" ||
      el["x"] == "15" || el["x"] == 5
  });

  var platPlusData = Window.data.filter(function(el) {
    return el["Champion"] == currentChampion &&
      el["match_rank"] == "Plat+";
  });


  // SAMPLE CODE TO DYNAMICALLY ADJUST AXES VALUES FOR GAMES REMAINING AXIS 
  // var maxGamesRemaining = Math.max.apply(Math, bronzeGoldData.map(function(o) { return parseFloat(o.r) }));
  // var minGamesRemaining = Math.min.apply(Math, bronzeGoldData.map(function(o) { return parseFloat(o.r) }));
  // r.domain([maxGamesRemaining, minGamesRemaining]);
  // var rAxis = d3.axisRight(r).tickSizeInner(0).tickSizeOuter(0).ticks(6).tickFormat((d)=> d + 'K' );
  // d3.selectAll("#r-axis").call(rAxis);
  // END SAMPLE CODE TO DYNAMCALLY ADJUST AXES VALUES


  plotChampion(bronzeGoldData, g, confidenceIntervals, sampleSizeCheckbox, "blue");
  plotChampion(platPlusData, g, confidenceIntervals, sampleSizeCheckbox, "orange");

  if (!sampleSizeCheckbox) {
    svg.selectAll("g#r-axis")
      .selectAll("text")
      .style("display", "none");
    svg.selectAll("text#r-axis-label")
      .style("display", "none");
  }
  else {
    svg.selectAll("g#r-axis")
      .selectAll("text")
      .style("display", null);
    svg.selectAll("text#r-axis-label")
      .style("display", null);
  }
  
  if (Window.bronzeGoldMouseover) {
    var data = bronzeGoldData;
  }
  else {
    var data = platPlusData;
  }


  var hoverline = g.append("g")
    .append("line")
    .attr("x1", x(15))
    .attr("x2", x(15))
    .attr("y1", y(0.40))
    .attr("y2", y(0.40))
    .style("stroke-width", "2px")
    .style("stroke", "black")
    .style("display", "none");

  var hoverdotwinrate = g.append("g")
    .append("circle")
    .attr("r", 0)
    .attr("cx", x(15))
    .attr("cy", y(0.5))
    .attr("stroke", "blue")
    .attr("fill", "blue");

  var hoverdotsamplesize = g.append("g")
    .append("circle")
    .attr("r", 0)
    .attr("cx", x(15))
    .attr("cy", y(0.5))
    .attr("stroke", "blue");



    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { 
          hoverline.style("display", null);
        })
        .on("mouseout", function() { 
          hoverline.attr("display", "none");
          hoverdotwinrate.attr("display", "none");
          hoverdotsamplesize.attr("display", "none");

          d3.selectAll("p#fun-fact").text("Generic text for Lisa");
        })
        .on("mousemove", mousemove);

    function mousemove() {
      Window.justChanged = false;
      var mx = x.invert(d3.mouse(this)[0]);

      var bisect = d3.bisector(function(d) {return d.x;}).right;
      var i = bisect(data, mx, 1);
      var x0 = data[i-1].x;
      var x1 = data[i].x;
      var y0 = data[i-1].y;
      var y1 = data[i].y;

      var slope = (y1 - y0) / (x1 - x0);

      var yh = parseFloat(slope*(mx - x0)) + parseFloat(y0);

      if (mx <= 15 || mx >= 35) { // If we're not on our axes
        hoverline.attr("display", "none");
        hoverdotwinrate.attr("display", "none");
      } 
      else {
        hoverline.attr("x1", x(mx)).attr("x2", x(mx)).attr("y1", y(0.4)).attr("y2", y(0.6)).attr("display", null);  
        hoverdotwinrate.attr("cx", x(mx)).attr("cy", y(yh)).attr("r", 5).attr("display", null);
      }

        var bisect = d3.bisector(function(d) {return d.x;}).right;
        var i = bisect(data, mx, 1);
        var x0 = data[i-1].x;
        var x1 = data[i].x;
        var r0 = data[i-1].r;
        var r1 = data[i].r;

        var slope = (r1 - r0) / (x1 - x0);  

        var rh = parseFloat(slope*(mx - x0)) + parseFloat(r0);
        console.log("Calculated rh to be: " + rh);
      

      if (sampleSizeCheckbox) {
        if (mx <= 15 || mx >= 35) { // If we're not on our axes
          hoverdotsamplesize.attr("display", "none");
        } 
        else {
          hoverdotsamplesize.attr("cx", x(mx)).attr("cy", r(rh)).attr("r", 5).attr("display", null);
        }
      }


      var f = d3.format(".0f");

      var funfact = "In Bronze-Gold games that lasted over " + f(mx) + " minutes, " + currentChampion + " had a winrate of " + f(100*yh) + "% in " + f(rh) + "k games";
      d3.selectAll("#fun-fact").text(funfact);
    }

    if (Window.justChanged) {
      // var f = d3.format(".0f");
      // var funfact = "In Bronze-Gold games that lasted over " + 15 + " minutes, " + currentChampion + " had a winrate of " + "<initial win rate>" + "% in " + "<initial games remaining>" + "k games";
      // d3.selectAll("#fun-fact").text(funfact);
      d3.selectAll("p#fun-fact").text("Generic text for Lisa");
    }

}







$( document ).ready(function() {
  d3.dsv(",", WHERE_IWR_w_CSV_LIVES, function(d) { // Read the csv
  return d;
}).then(function(data) { 

  Window.data = [];
  Window.champions = [];
  for (var i = 0; i < data.length; i++) {

    var remaining_games = 0;

    // Don't allow more than maxgamesremaining
    if (data[i].remaining_games/1000 >= maxGamesRemaining) {
      remaining_games = maxGamesRemaining;
    }
    else {
      remaining_games = data[i].remaining_games/1000
    }

    if (data[i].game_minute <= 35 && data[i].game_minute >= 15) { // Only add it if it's in our axis
      var obj = {
      "match_rank":data[i].match_rank, 
      "Champion":data[i].Champion, 
      "x": data[i].game_minute,
      "y": data[i].winrate_remaining,
      "lcl": data[i].LCL,
      "ucl": data[i].UCL,
      "r": remaining_games,
      "remaining_wins": data[i].remaining_wins
      }
      Window.data.push(obj);

      Window.champions.push(obj["Champion"]);
    }

    
  }
  Window.champions = [...new Set(Window.champions)];
  Window.champidx = 0;

  d3.selectAll("p#current-champion").text(Window.champions[Window.champidx]);
  somethingChanged();

  var input = document.getElementById("myinput");
  new Awesomplete(input, {
    list: Window.champions
  });


  $("#myinput").on('awesomplete-selectcomplete', function(){
    somethingChanged();
    console.log(document.getElementById("myinput").value);
    })

  })
  
  Window.sampleSizeCheckbox = false;
  Window.confidenceIntervalsCheckbox = false;
  Window.bronzeGoldMouseover = false;
  d3.selectAll("path.domain").style("stroke-width", "1px")
  d3.selectAll("#gamesremainingbronzegold").selectAll("g").remove();
  d3.selectAll("#gamesremainingplatnium").selectAll("g").remove();
  d3.selectAll("#bronzegoldbox").selectAll("g").remove();
  d3.selectAll("#platniumbox").selectAll("g").remove();

})




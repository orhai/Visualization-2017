var globaly;
var svg6;
var margin6 = { top: 50, right: 0, bottom: 100, left: 225 },
    width6 = 1400 - margin6.left - margin6.right,
    height6 = 950 - margin6.top - margin6.bottom,
    gridSize = Math.floor(width6 / 24),
    legendElementWidth = gridSize * 2,
    buckets = 15,
    colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"], // alternatively colorbrewer.YlGnBu[9]
    times = ["1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM", "12PM"];
var crimeTypes6 = ["HOMICIDE", "THEFT", "DECEPTIVE PRACTICE", "BATTERY", "ASSAULT", "OTHER OFFENSE", "CRIMINAL DAMAGE"
    , "ROBBERY", "MOTOR VEHICLE THEFT", "OFFENSE INVOLVING CHILDREN", "BURGLARY", "PROSTITUTION", "CRIMINAL TRESPASS"
    , "CRIM SEXUAL ASSAULT", "ARSON", "WEAPONS VIOLATION", "PUBLIC PEACE VIOLATION", "NARCOTICS", "LIQUOR LAW VIOLATION"
    , "SEX OFFENSE", "GAMBLING", "STALKING", "INTERFERENCE WITH PUBLIC OFFICER", "KIDNAPPING", "INTIMIDATION", "CONCEALED CARRY LICENSE VIOLATION"
    , "OBSCENITY", "NON-CRIMINAL", "HUMAN TRAFFICKING", "PUBLIC INDECENCY", "OTHER NARCOTIC VIOLATION", "NON-CRIMINAL (SUBJECT SPECIFIED)"];

var HeatmapData = [];

var HeatmapMain = function () {
    d3.select("#modal6").select("svg").remove();
    generateData();
    createHeatmapSVG();
    heatmapChart();

}



var generateData = function () {
    HeatmapData = [];
    for (var i = 0; i < crimeTypes6.length; i++) {
        for (var j = 1; j <= 24; j++) {
            HeatmapData.push({ crime: i + 1, hour: j, value: 0 });
        }
    }

    for (var i = 0; i < crimes.length; i++) {
        var hour = parseInt(crimes[i][10].split("T")[1].split(":")[0]);
        if (hour == 0) {
            hour = 24;
        }
        if (crimes[i][13] == "HOMICIDE")
            HeatmapData[hour - 1].value = HeatmapData[hour - 1].value + 1;
        else if (crimes[i][13] == "THEFT")
            HeatmapData[23 + hour].value = HeatmapData[23 + hour].value + 1;
        else if (crimes[i][13] == "DECEPTIVE PRACTICE")
            HeatmapData[47 + hour].value = HeatmapData[47 + hour].value + 1;
        else if (crimes[i][13] == "BATTERY")
            HeatmapData[71 + hour].value = HeatmapData[71 + hour].value + 1;
        else if (crimes[i][13] == "ASSAULT")
            HeatmapData[95 + hour].value = HeatmapData[95 + hour].value + 1;
        else if (crimes[i][13] == "OTHER OFFENSE")
            HeatmapData[119 + hour].value = HeatmapData[119 + hour].value + 1;
        else if (crimes[i][13] == "CRIMINAL DAMAGE")
            HeatmapData[143 + hour].value = HeatmapData[143 + hour].value + 1;
        else if (crimes[i][13] == "ROBBERY")
            HeatmapData[167 + hour].value = HeatmapData[167 + hour].value + 1;
        else if (crimes[i][13] == "MOTOR VEHICLE THEFT")
            HeatmapData[191 + hour].value = HeatmapData[191 + hour].value + 1;
        else if (crimes[i][13] == "OFFENSE INVOLVING CHILDREN")
            HeatmapData[215 + hour].value = HeatmapData[215 + hour].value + 1;
        else if (crimes[i][13] == "BURGLARY")
            HeatmapData[239 + hour].value = HeatmapData[239 + hour].value + 1;
        else if (crimes[i][13] == "PROSTITUTION")
            HeatmapData[263 + hour].value = HeatmapData[263 + hour].value + 1;
        else if (crimes[i][13] == "CRIMINAL TRESPASS")
            HeatmapData[287 + hour].value = HeatmapData[287 + hour].value + 1;
        else if (crimes[i][13] == "CRIM SEXUAL ASSAULT")
            HeatmapData[311 + hour].value = HeatmapData[311 + hour].value + 1;
        else if (crimes[i][13] == "ARSON")
            HeatmapData[335 + hour].value = HeatmapData[335 + hour].value + 1;
        else if (crimes[i][13] == "WEAPONS VIOLATION")
            HeatmapData[359 + hour].value = HeatmapData[359 + hour].value + 1;
        else if (crimes[i][13] == "PUBLIC PEACE VIOLATION")
            HeatmapData[383 + hour].value = HeatmapData[383 + hour].value + 1;
        else if (crimes[i][13] == "NARCOTICS")
            HeatmapData[407 + hour].value = HeatmapData[407 + hour].value + 1;
        else if (crimes[i][13] == "LIQUOR LAW VIOLATION")
            HeatmapData[431 + hour].value = HeatmapData[431 + hour].value + 1;
        else if (crimes[i][13] == "SEX OFFENSE")
            HeatmapData[455 + hour].value = HeatmapData[455 + hour].value + 1;
        else if (crimes[i][13] == "GAMBLING")
            HeatmapData[479 + hour].value = HeatmapData[479 + hour].value + 1;
        else if (crimes[i][13] == "STALKING")
            HeatmapData[503 + hour].value = HeatmapData[503 + hour].value + 1;
        else if (crimes[i][13] == "INTERFERENCE WITH PUBLIC OFFICER")
            HeatmapData[527 + hour].value = HeatmapData[527 + hour].value + 1;
        else if (crimes[i][13] == "KIDNAPPING")
            HeatmapData[551 + hour].value = HeatmapData[551 + hour].value + 1;
        else if (crimes[i][13] == "INTIMIDATION")
            HeatmapData[575 + hour].value = HeatmapData[575 + hour].value + 1;
        else if (crimes[i][13] == "OBSCENITY")
            HeatmapData[599 + hour].value = HeatmapData[599 + hour].value + 1;
        else if (crimes[i][13] == "NON-CRIMINAL")
            HeatmapData[623 + hour].value = HeatmapData[623 + hour].value + 1;
        else if (crimes[i][13] == "HUMAN TRAFFICKING")
            HeatmapData[647 + hour].value = HeatmapData[647 + hour].value + 1;
        else if (crimes[i][13] == "PUBLIC INDECENCY")
            HeatmapData[671 + hour].value = HeatmapData[671 + hour].value + 1;
        else if (crimes[i][13] == "OTHER NARCOTIC VIOLATION")
            HeatmapData[695 + hour].value = HeatmapData[695 + hour].value + 1;
        else if (crimes[i][13] == "INTERFERENCE WITH PUBLIC OFFICER")
            HeatmapData[719 + hour].value = HeatmapData[719 + hour].value + 1;
        else if (crimes[i][13] == "NON-CRIMINAL (SUBJECT SPECIFIED)")
            HeatmapData[743 + hour].value = HeatmapData[743 + hour].value + 1;

    }
}

var createHeatmapSVG = function () {
    svg6 = d3.select("#modal6").append("svg")
        .attr("width", width6 + margin6.left + margin6.right)
        .attr("height", height6 + margin6.top + margin6.bottom)
        .append("g")
        .attr("transform", "translate(" + margin6.left + "," + margin6.top + ")");

    var crimeLabels = svg6.selectAll(".crimeLabel")
        .data(crimeTypes6)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize * 0.5; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize * 0.5 / 1.5 + ")")
        .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "crimeLabel crimeAxis axis axis-crimetype" : "crimeLabel crimeAxis axis"); });

    var timeLabels = svg6.selectAll(".timeLabel")
        .data(times)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function (d, i) { return ((i >= 7 && i <= 16) ? "timeLabel crimeAxis axis axis-crimetime" : "timeLabel crimeAxis axis"); });
}

var heatmapChart = function () {

    var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(HeatmapData, function (d) { return d.value; })])
        .range(colors);

    var cards = svg6.selectAll(".hour")
        .data(HeatmapData, function (d) { return d.crime + ':' + d.hour; });

    cards.append("title");

    cards.enter().append("rect")
        .attr("x", function (d) { return (d.hour - 1) * gridSize; })
        .attr("y", function (d) { return (d.crime - 1) * gridSize * 0.5; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour crimeBordered")
        .attr("width", gridSize)
        .attr("height", gridSize * 0.5)
        .style("fill", colors[0]);

    cards.transition().duration(1000)
        .style("fill", function (d) { return colorScale(d.value); });

    cards.select("title").text(function (d) { return d.value; });

    cards.exit().remove();

    var legend = svg6.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function (d) { return d; });

    legend.enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
        .attr("x", function (d, i) { return legendElementWidth * i; })
        .attr("y", height6)
        .attr("width", legendElementWidth)
        .attr("height", gridSize / 2)
        .style("fill", function (d, i) { return colors[i]; });

    legend.append("text")
        .attr("class", "crimeAxisLegend")
        .text(function (d) { return "≥ " + Math.round(d); })
        .attr("x", function (d, i) { return legendElementWidth * i; })
        .attr("y", height6 + gridSize);

    legend.exit().remove();
};
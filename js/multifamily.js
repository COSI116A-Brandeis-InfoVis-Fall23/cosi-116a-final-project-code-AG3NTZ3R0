["#door1", "#door2", "#door3", "#door4"].forEach(function(door) {
    d3.select(door).on("click", function() {
        d3.select("#vis-svg-1").style("display", "none");
        document.getElementById("filterButtons").style.display = "block";
        d3.select("#vis-svg-2").style("display", "block");
    });
});

d3.select("#back").on("click", function() {
    document.getElementById("filterButtons").style.display = "none";
    d3.select("#vis-svg-2").style("display", "none");
    d3.select("#vis-svg-1").style("display", "block");
    
});
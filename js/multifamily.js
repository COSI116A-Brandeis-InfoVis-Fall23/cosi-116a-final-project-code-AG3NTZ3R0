["#door1", "#door2", "#door3", "#door4"].forEach(function(door, index) {
    d3.select(door).on("click", function() {

        // Toggles visibility of MFH svg & filter and back buttons
        d3.select("#vis-svg-1").style("display", "none");
        document.getElementById("filterButtons").style.display = "block";
        d3.select("#vis-svg-2").style("display", "block");
        document.getElementById("back").style.display = "block";
    });
});

d3.select("#back").on("click", function() {
    document.getElementById("filterButtons").style.display = "none";
    d3.select("#vis-svg-2").style("display", "none");
    d3.select("#vis-svg-1").style("display", "block");

    // Toggles the "back" button once pressed
    document.getElementById("back").style.display = "none";
    
});
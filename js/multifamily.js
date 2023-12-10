import('./visualization.js').then(module => {
    const SVGChart = module.SVGChart;

    // Multi-Family Home Visualization
    let multiFamilyHome = new SVGChart('.vis-holder', 'vis-svg-1', '0 0 1000 600');
    let g = multiFamilyHome.addGroup('multi-family', 'white', 'black', '2.5');

    // Add main house
    multiFamilyHome.addRect(g, 'house', 100, 200, 800, 375, 'lightgrey');
    // Add roof
    multiFamilyHome.addPolygon(g, 'roof', '100,200 500,50 900,200', 'darkgrey');

    // Add chimney
    multiFamilyHome.addRect(g, 'chimney', 700, 100, 100, 100, 'darkred');
    // Add smoke cloud
    let smokeCloud = "M 750 80 Q 760 70 770 80 T 790 80 T 810 80 T 830 80";
    multiFamilyHome.addPath(g, 'smoke-cloud', smokeCloud, 'lightgrey');

    // Define the racial categories
    const racialCategories = ["White", "Black", "Asian", "Other"];

    // Add doors, knobs, steps, door windows, blinds, and signs
    for (let i = 0; i < 4; i++) {
      multiFamilyHome.addRect(g, `door${i+1}`, 220 + 150 * i, 350, 100, 225, 'brown');
      multiFamilyHome.addCircle(g, `door-knob${i+1}`, 300 + 150 * i, 450, 5, 'gold');
      multiFamilyHome.addRect(g, `door-step${i+1}`, 220 + 150 * i, 550, 100, 25, 'darkgrey');
      multiFamilyHome.addRect(g, `door-window${i+1}`, 245 + 150 * i, 375, 50, 50, 'lightblue');
      multiFamilyHome.addRect(g, `door-window-blind${i+1}`, 245 + 150 * i, 375, 50, 5, 'white');
      multiFamilyHome.addRect(g, `door-sign${i+1}`, 220 + 150 * i, 300, 100, 25, 'white');
      multiFamilyHome.addText(g, 245 + 150 * i, 320, racialCategories[i], '20px', 'black');
    }

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

});
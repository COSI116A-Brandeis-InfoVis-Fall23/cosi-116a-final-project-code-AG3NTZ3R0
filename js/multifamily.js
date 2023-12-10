import('./visualization.js').then(module => {
    const SVGChart = module.SVGChart;

    class MultiFamilyHome extends SVGChart {
        constructor(parentSelector, id, viewBox, preserveAspectRatio) {
            super(parentSelector, id, viewBox, preserveAspectRatio);
        }

        addFloorPlan
    }

    // Multi-Family Home Visualization
    let multiFamilyHome = new MultiFamilyHome('.vis-holder', 'vis-svg-1', '0 0 1000 600');
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
    let index = 0;
    for (let category of racialCategories) {
      let doorId = `door-${category.toLowerCase()}`;
      multiFamilyHome.addRect(g, doorId, 220 + 150 * index, 350, 100, 225, 'brown');
      multiFamilyHome.addCircle(g, `${doorId}-knob`, 300 + 150 * index, 450, 5, 'gold');
      multiFamilyHome.addRect(g, `${doorId}-step`, 220 + 150 * index, 550, 100, 25, 'darkgrey');
      multiFamilyHome.addRect(g, `${doorId}-window`, 245 + 150 * index, 375, 50, 50, 'lightblue');
      multiFamilyHome.addRect(g, `${doorId}-window-blind`, 245 + 150 * index, 375, 50, 5, 'white');
      multiFamilyHome.addRect(g, `${doorId}-sign`, 220 + 150 * index, 300, 100, 25, 'white');
      multiFamilyHome.addText(g, 245 + 150 * index, 320, category, '20px', 'black');

      createFloorPlan(category.toLowerCase());
      d3.select(`#vis-svg-${category.toLowerCase()}`).style("display", "none");

      index++;
    }

    racialCategories.forEach((category, index) => {
        let doorId = `door-${category.toLowerCase()}`;
        d3.select(`#${doorId}`).on("click", function() {
            d3.select("#vis-svg-1").style("display", "none");
            document.getElementById("filterButtons").style.display = "block";
            d3.select(`#vis-svg-${category.toLowerCase()}`).style("display", "block");
        });
    });

    d3.select("#back").on("click", function() {
        document.getElementById("filterButtons").style.display = "none";
        d3.select("#vis-svg-2").style("display", "none");
        d3.select("#vis-svg-1").style("display", "block");

    });

    function createFloorPlan(name) {
        // Floor Plan Visualization
        let floorPlan = new SVGChart('.vis-holder', `vis-svg-${name}`, '0 0 1000 600');
        let roomFloorPlan = floorPlan.addGroup(`${name}-floor-plan`, 'white', 'black', '2.5');

        // Main House Rectangle
        floorPlan.addRect(roomFloorPlan, `${name}-house`, 50, 30, 600, 400);

        // Bedrooms
        for (let i = 0; i < 3; i++) {
            floorPlan.addRect(roomFloorPlan, `${name}-bedroom${i + 1}`, 50 + 130 * i, 30 + 240 * (i % 2), 180 - 40 * (i % 2), 160);
        }

        // Closets and Bathrooms
        floorPlan.addRect(roomFloorPlan, `${name}-closet1`, 230, 30, 50, 80);
        floorPlan.addRect(roomFloorPlan, `${name}-bathroom1`, 280, 30, 90, 80);
        floorPlan.addRect(roomFloorPlan, `${name}-bathroom2`, 230, 110, 90, 80);
        floorPlan.addRect(roomFloorPlan, `${name}closet2`, 50, 230, 60, 40);

        // Kitchen
        floorPlan.addRect(roomFloorPlan, `${name}-kitchen`, 550, 150, 100, 150);

        // Balcony
        floorPlan.addRect(roomFloorPlan, `${name}-balcony`, 350, 430, 140, 60);

        // Washer/Dryer and Closet
        floorPlan.addRect(roomFloorPlan, `${name}-w/d`, 550, 30, 60, 30);
        floorPlan.addRect(roomFloorPlan, `${name}-closet`, 610, 30, 40, 90);

        floorPlan.addText(roomFloorPlan, 900, 50, name, '20px', 'black');

        // Hexagon Visualization
        let hexagonDimension = floorPlan.addGroup(`${name}-hexagon-dimension`, 'none', 'black', '1').attr('font-size', '11px');
        let hexagon = floorPlan.addGroup(`${name}-hexagon`, 'white', 'black', '1.5').attr('transform', 'rotate(30,830,353.93)');

        // Hexagon Layers
        const hexagonLayers = [
            "770 250, 890 250, 950 353.93, 890 455.86, 770 455.86, 710 353.93",
            "780 267.32, 880 267.32, 930 353.93, 880 438.54, 780 438.54, 730 353.93",
            "790 284.64, 870 284.64, 910 353.93, 870 421.22, 790 421.22, 750 353.93",
            "800 301.96, 860 301.96, 890 353.93, 860 403.9, 800 403.9, 770 353.93",
            "810 319.28, 850 319.28, 870 353.93, 850 386.58, 810 386.58, 790 353.93"
        ];

        hexagonLayers.forEach((points, i) => {
            floorPlan.addPolygon(hexagon, `${name}-hexagon${i + 1}`, points);
        });

        // Center Circle
        floorPlan.addCircle(hexagon, `${name}-center-circle`, 830, 353.93, 1);

        // Text Labels
        const labels = [
            {x: 800, y: 225, text: "Cash Income"},
            {x: 675, y: 285, text: "Total Tax"},
            {x: 940, y: 280, text: "Total Subsidies"},
            {x: 675, y: 410, text: "Work Expenses"},
            {x: 675, y: 425, text: "Other Expenses"},
            {x: 800, y: 490, text: "Child Expenses"},
            {x: 940, y: 410, text: "Medical Expenses"}
        ];

        labels.forEach(label => {
            floorPlan.addText(hexagonDimension, label.x, label.y, label.text);
        });
    }

});
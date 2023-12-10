import('./visualization.js').then(module => {
    const SVGChart = module.SVGChart;

    // Floor Plan Visualization
    let floorPlan = new SVGChart('.vis-holder', 'vis-svg-2', '0 0 1000 600');
    let basicFloorPlan = floorPlan.addGroup('basic-floorplan', 'white', 'black', '2.5');

    // Main House Rectangle
    floorPlan.addRect(basicFloorPlan, 'house', 50, 30, 600, 400);

    // Bedrooms
    for (let i = 0; i < 3; i++) {
        floorPlan.addRect(basicFloorPlan, `bedroom${i + 1}`, 50 + 130 * i, 30 + 240 * (i % 2), 180 - 40 * (i % 2), 160);
    }

    // Closets and Bathrooms
    floorPlan.addRect(basicFloorPlan, 'closet1', 230, 30, 50, 80);
    floorPlan.addRect(basicFloorPlan, 'bathroom1', 280, 30, 90, 80);
    floorPlan.addRect(basicFloorPlan, 'bathroom2', 230, 110, 90, 80);
    floorPlan.addRect(basicFloorPlan, 'closet2', 50, 230, 60, 40);

    // Kitchen
    floorPlan.addRect(basicFloorPlan, 'kitchen', 550, 150, 100, 150);

    // Balcony
    floorPlan.addRect(basicFloorPlan, 'balcony', 350, 430, 140, 60);

    // Washer/Dryer and Closet
    floorPlan.addRect(basicFloorPlan, 'w/d', 550, 30, 60, 30);
    floorPlan.addRect(basicFloorPlan, 'closet', 610, 30, 40, 90);

    // Hexagon Visualization
    let hexagonDimension = floorPlan.addGroup('hexagon-dimension', 'none', 'black', '1').attr('font-size', '11px');
    let hexagon = floorPlan.addGroup('hexagon', 'white', 'black', '1.5').attr('transform', 'rotate(30,830,353.93)');

    // Hexagon Layers
    const hexagonLayers = [
      "770 250, 890 250, 950 353.93, 890 455.86, 770 455.86, 710 353.93",
      "780 267.32, 880 267.32, 930 353.93, 880 438.54, 780 438.54, 730 353.93",
      "790 284.64, 870 284.64, 910 353.93, 870 421.22, 790 421.22, 750 353.93",
      "800 301.96, 860 301.96, 890 353.93, 860 403.9, 800 403.9, 770 353.93",
      "810 319.28, 850 319.28, 870 353.93, 850 386.58, 810 386.58, 790 353.93"
    ];

    hexagonLayers.forEach((points, i) => {
      floorPlan.addPolygon(hexagon, `hexagon${i + 1}`, points);
    });

    // Center Circle
    floorPlan.addCircle(hexagon, 'center-circle', 830, 353.93, 1);

    // Text Labels
    const labels = [
      { x: 800, y: 225, text: "Cash Income" },
      { x: 675, y: 285, text: "Total Tax" },
      { x: 940, y: 280, text: "Total Subsidies" },
      { x: 675, y: 410, text: "Work Expenses" },
      { x: 675, y: 425, text: "Other Expenses" },
      { x: 800, y: 490, text: "Child Expenses" },
      { x: 940, y: 410, text: "Medical Expenses" }
    ];

    labels.forEach(label => {
      floorPlan.addText(hexagonDimension, label.x, label.y, label.text);
    });
});
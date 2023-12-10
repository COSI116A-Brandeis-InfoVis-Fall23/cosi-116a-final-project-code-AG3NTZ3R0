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
});
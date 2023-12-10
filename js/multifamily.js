import('./visualization.js').then(module => {
    const SVGChart = module.SVGChart;

    class MultiFamilyHome extends SVGChart {
        constructor(parentSelector, id, viewBox, preserveAspectRatio) {
            super(parentSelector, id, viewBox, preserveAspectRatio);
        }

        addFloorPlan

        addRoomKey() {
            // Color code squares
            const colors = [
                { color: "lightgreen", label: "Income", x: 50, y: 20 },
                { color: "orange", label: "Subsidies", x: 50, y: 60 },
                { color: "red", label: "Expenses", x: 50, y: 100 }
            ];
    
            colors.forEach(d => {
                this.svg.append("rect")
                    .attr("x", d.x)
                    .attr("y", d.y)
                    .attr("width", 20)
                    .attr("height", 20)
                    .style("fill", d.color);
    
                this.svg.append("text")
                    .attr("x", d.x + 30)
                    .attr("y", d.y + 15)
                    .text(d.label);
            });
    
            // Size representation squares
            const sizes = [
                { size: 20, label: "$1,000", x: 200, y: 20 },
                { size: 30, label: "$10,000", x: 200, y: 50 },
                { size: 40, label: "$1,000,000", x: 200, y: 90 }
            ];
    
            sizes.forEach(d => {
                this.svg.append("rect")
                    .attr("x", d.x)
                    .attr("y", d.y)
                    .attr("width", d.size)
                    .attr("height", d.size)
                    .style("fill", "grey");
    
                this.svg.append("text")
                    .attr("x", d.x + d.size + 10)
                    .attr("y", d.y + d.size / 2 + 5)
                    .text(d.label);
            });
        }
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

    // add room key
    multiFamilyHome.addRoomKey(); 
    
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

      // Add furniture
      class FurnitureGenerator {
        constructor(svgId) {
            this.svg = d3.select(svgId);
        }

        sampleFurniture() {
            // Create sample furniture
            // Bed
            this.createBed(70,30,80,100,"green");
            this.createBed(60,330,70,100,"green",180);
            this.createBed(200,350,50,80,"green",180);
            // Bathtub
            this.createBathtub(320,30,50,30,"orange");
            this.createBathtub(230,110,50,30,"orange");
            // Dining table
            this.createDiningTable(520,340,100,60,"red");
            // Couch
            this.createCouch(350,140,50,43,"red",300);
            this.createCouch(390,250,100,43,"orange",175);
            this.createCouch(390,445,30,25,"red");
            // Other furniture
            this.createRect(400,180,80,50,"orange");
            this.createRect(610,175,40,100,"orange");
            this.createRect(620,30,30,40,"red");
            this.createCircle(440,470,13,"red");
        }

        createBed(x, y, w, h, color, rotation) {
            let g = this.svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
            // bedsheet
            g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
            // pillow (size:30*15)
            g.append("rect").attr("x", x + w / 2 - 15).attr("y", y + 6).attr("rx", 3).attr("ry", 3).attr("width", 30).attr("height", 15).style("opacity", 0.5)
            // quilt
            g.append("rect").attr("x", x).attr("y", y + 25).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h - 25).style("opacity", 0.4)
        }

        createBathtub(x, y, w, h, color) {
            let g = this.svg.append("g").attr("fill", `${color}`)
            g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.5)
            g.append("rect").attr("x", x + w / 12).attr("y", y + h / 8).attr("rx", 4).attr("ry", 4).attr("width", w - w / 6).attr("height", h - h / 4).style("opacity", 0.5)
        }

        createDiningTable(x, y, w, h, color, rotation) {
            let g = this.svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
            // table
            g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.7)
            // chairs (size:20*15)
            g.append("rect").attr("x", x + (w - 40) / 3).attr("y", y - 15).attr("width", 20).attr("height", 15).style("opacity", 0.6)
            g.append("rect").attr("x", x + 2 * (w - 40) / 3 + 20).attr("y", y - 15).attr("width", 20).attr("height", 15).style("opacity", 0.6)
            g.append("rect").attr("x", x + (w - 40) / 3).attr("y", y + h).attr("width", 20).attr("height", 15).style("opacity", 0.6)
            g.append("rect").attr("x", x + 2 * (w - 40) / 3 + 20).attr("y", y + h).attr("width", 20).attr("height", 15).style("opacity", 0.6)
        }

        createCouch(x, y, w, h, color, rotation) {
            let g = this.svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
            g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
            g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", w).attr("height", 0.4 * h).style("opacity", 0.5)
            g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3 * w).attr("height", h).style("opacity", 0.5)
            g.append("rect").attr("x", x + 0.7 * w).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3 * w).attr("height", h).style("opacity", 0.5)
        }

        createRect(x, y, w, h, color, rotation) {
            this.svg.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
                .style("fill", `${color}`).style("opacity", 0.6)
        }

        createCircle(x, y, r, color) {
            this.svg.append("circle").attr("cx", x).attr("cy", y).attr("r", r).style("fill", `${color}`).style("opacity", 0.6)
        }
    }
      let furnitureGenerator = new FurnitureGenerator(`#vis-svg-${category.toLowerCase()}`);
      furnitureGenerator.sampleFurniture();

      index++;
    }

    racialCategories.forEach((category, index) => {
        let doorId = `door-${category.toLowerCase()}`;
        d3.select(`#${doorId}`).on("click", function() {
            d3.select("#vis-svg-1").style("display", "none");
            document.getElementById("filterButtons").style.display = "block";
            d3.select(`#vis-svg-${category.toLowerCase()}`).style("display", "block");
        });

        d3.select(`#${category.toLowerCase()}-back-button`).on("click", function() {
            d3.select(`#vis-svg-${category.toLowerCase()}`).style("display", "none");
            d3.select("#vis-svg-1").style("display", "block");
            document.getElementById("filterButtons").style.display = "none";
        });
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

        // Add back button
        floorPlan.addText(roomFloorPlan, 900, 100, 'Back', '20px', 'black')
            .attr('id', `${name}-back-button`)
            .style('cursor', 'pointer');
        }


});


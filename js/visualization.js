class SVGChart {
  constructor(parentSelector, id, viewBox, preserveAspectRatio, furnitureData=[]) {
    this.svg = d3.select(parentSelector)
      .append('svg')
      .attr('id', id)
      .attr('viewBox', viewBox)
      .attr('preserveAspectRatio', preserveAspectRatio || 'xMidYMid meet')
      .attr('version', '1.1')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    // Calls additional methods to create floorplan visualizations
    //this.createFloorPlan(furnitureData);
  }

  addGroup(id, fill, stroke, strokeWidth) {
    return this.svg.append('g')
      .attr('id', id)
      .attr('fill', fill)
      .attr('stroke', stroke)
      .attr('stroke-width', strokeWidth);
  }

  addRect(group, id, x, y, width, height) {
    return group.append('rect')
      .attr('id', id)
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height);
  }

  addPolygon(group, id, points) {
    return group.append('polygon')
      .attr('id', id)
      .attr('points', points);
  }

  addCircle(group, id, cx, cy, r) {
    return group.append('circle')
      .attr('id', id)
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r);
  }

  addText(group, x, y, text) {
    return group.append('text')
      .attr('x', x)
      .attr('y', y)
      .text(text);
  }
  
  createFloorPlan(furnitureData) {
    let basicFloorPlan = this.addGroup('basic-floorplan', 'white', 'black', '2.5');

    // Main House Rectangle
    this.addRect(basicFloorPlan, 'house', 50, 30, 600, 400);

    // Bedrooms
    for (let i = 0; i < 3; i++) {
      this.addRect(basicFloorPlan, `bedroom${i + 1}`, 50 + 130 * i, 30 + 240 * (i % 2), 180 - 40 * (i % 2), 160);
    }

    // Closets and Bathrooms
    this.addRect(basicFloorPlan, 'closet1', 230, 30, 50, 80);
    this.addRect(basicFloorPlan, 'bathroom1', 280, 30, 90, 80);
    this.addRect(basicFloorPlan, 'bathroom2', 230, 110, 90, 80);
    this.addRect(basicFloorPlan, 'closet2', 50, 230, 60, 40);

    // Kitchen
    this.addRect(basicFloorPlan, 'kitchen', 550, 150, 100, 150);

    // Balcony
    this.addRect(basicFloorPlan, 'balcony', 350, 430, 140, 60);

    // Washer/Dryer and Closet
    this.addRect(basicFloorPlan, 'w/d', 550, 30, 60, 30);
    this.addRect(basicFloorPlan, 'closet', 610, 30, 40, 90);

    // Call createFurniture for the provided furniture data
    this.createFurniture(basicFloorPlan, furnitureData);
  }
addFurnitureToRoom(room, furnitureType, x, y, width, height = 0, color, rotation = 0) {
    const roomGroupSelection = this.svg.select(`#${room}`);
    let roomGroup;

    // Check if the room group exists
    if (!roomGroupSelection.empty()) {
        // Check if the furniture group exists inside the room group
        const existingFurnitureGroup = roomGroupSelection.select('.furniture');

        if (existingFurnitureGroup.empty()) {
            // If not, create the furniture group
            roomGroup = roomGroupSelection.append('g').classed('furniture', true);
        } else {
            // If it exists, use the existing furniture group
            roomGroup = existingFurnitureGroup;
        }
    } else {
        // Handle the case where the room group doesn't exist (optional)
        console.error(`Room group with ID ${room} not found.`);
        return; // Exit the function if room group doesn't exist
    }

    // Print method for debugging purposes
    console.log('Room Group:', roomGroup);
    console.log('Adding furniture to room:', room, furnitureType, x, y, width, height, color, rotation);

    // Add furniture based on the type
    switch (furnitureType) {
      case 'bed':
        if (room.match(/^bedroom\d+$/)) {
          createBed(roomGroup, x, y, width, height, color, rotation);
        }
        break;

      case 'rect':
          createRect(roomGroup, x, y, width, height, color, rotation);
        break;

      case 'circle':
          createCircle(roomGroup, x, y, width, color);
        break;

      case 'couch':
          createCouch(roomGroup, x, y, width, height, color, rotation);
        break;

      case 'bathtub':
        if (room.match(/^bathroom\d+$/)) {
          createBathtub(roomGroup, x, y, width, height, color, rotation);
        }
        break;

      case 'table':
        if (room.match(/^bedroom\d+$/) || room.match(/^kitchen\d+$/) || room.match(/^balcony\d+$/) || room.match(/^house\d+$/)) {
          createDiningTable(roomGroup, x, y, width, height, color, rotation);
        }
        break;

      // Add more cases for other furniture types as needed

      default:
        console.error('Unsupported furniture type:', furnitureType);
    }
  };

  // modified createFurniture method to accept furniture data
  createFurniture(floorPlanG, furnitureData) {
  	// Clear previous furniture
    const svg = this.svg;
    svg.selectAll(".furniture").remove() 

	  // Scale furniture size
    const scaleFactor = 1;

    // Retrieve dimensions of the "house" rectangle
    const houseRect = floorPlanG.select('#house'); // Adjust the ID if needed
    const houseWidth = +houseRect.attr('width');
    const houseHeight = +houseRect.attr('height');
	
	  // Reference to furniture group w/ specified floor plan
    const furnitureGroup = floorPlanG.select('furniture');
    
    // Create furniture group if it doesn't exist
    if (floorPlanG.empty()) {
      furnitureGroup = floorPlanG.append('g').classed('furniture', true);
    }
  
    console.log('Furniture Group:', furnitureGroup);
    console.log('Floorplan Group:', floorPlanG);

	  // Method to make sure that furniture does not overlap
    const hasOverlap = (x, y, width, height) => {
      const existingFurniture = furnitureGroup.selectAll(".furniture"); 

      let overlap = false;

      existingFurniture.each(function () {
        const existingX = +d3.select(this).attr("x");
        const existingY = +d3.select(this).attr("y");
        const existingWidth = +d3.select(this).attr("width");
        const existingHeight = +d3.select(this).attr("height");

        // Check for overlap
        if (
          x < existingX + existingWidth &&
          x + width > existingX &&
          y < existingY + existingHeight &&
          y + height > existingY
        ) {
          overlap = true;
        }
      });

      return overlap;
    };

    // Iterate over each item in the furniture data
    furnitureData.forEach(({position, attributes}) => {
	  // Print statement for debugging purposes
    console.log('Processing furniture item:', position, attributes);
      
    let x = position.x;
    let y = position.y;
    const furnitureWidth = position.width;
    const furnitureHeight = position.height;
    const rotation = position.rotation;
	  // const color = item.color;

	  // Check for overlap, adjust coordinates if needed
    while (
      hasOverlap(x, y, furnitureWidth, furnitureWidth) ||
      x < 0 ||
      y < 0 ||
      x + furnitureWidth > houseWidth ||
      y + furnitureWidth > houseHeight
    ) {
	    // Print positions for debugging purposes
      console.log(`Current position: x=${x}, y=${y}`);

	    // If the furniture goes beyond the right or bottom edge, adjust its position
      if (x + furnitureWidth > houseWidth) {
        x = houseWidth - furnitureWidth;
      }
      if (y + furnitureHeight > houseHeight) {
        y = houseHeight - furnitureHeight;
      }

	    // If the furniture goes beyond the left or top edge, adjust its position
      if (x === 0) {
        x = 0;
      }
      if (y === 0) {
        y = 0;
      }
	    // Check for overlap after adjustments
      if (hasOverlap(x, y, furnitureWidth, furnitureHeight)) {
		  // Adjust the position incrementally
        x += 10;
        y += 10;
      }

	    // Prevent infinite loop if repositioning doesn't help
      if (x >= houseWidth || y >= houseHeight) {
        console.error("Cannot position furniture within house boundaries.");
        break;
      }
      
      // Print statement for debugging purposes
      if (!hasOverlap(x, y, furnitureWidth, furnitureHeight)) {
          console.log('Furniture items created successfully for room:', room);
        }
    }
	
    // Access attributes specific to each furniture item
    const {spmTotalValue, spmSnapSub, spmCapHouseSub, spmSchLunch, spmEngVal,
    spmWICVal, spmFica, spmFedTax, spmStTax, spmCapWkCCXpns, spmMedXpns,
    } = attributes;

    const bed = spmTotalValue * scaleFactor;
    const bathtub = spmSnapSub * scaleFactor;
    const dining = spmCapHouseSub * scaleFactor;
    const couch1 = spmSchLunch * scaleFactor;
    const rect1 = spmEngVal * scaleFactor;
    const rect2 = spmWICVal * scaleFactor;
    const rect3 = spmFica * scaleFactor;
    const couch2 = spmFedTax * scaleFactor;
    const couch3 = spmStTax * scaleFactor;
    const circle1 = spmCapWkCCXpns * scaleFactor;
    const circle2 = spmMedXpns * scaleFactor;
    
    // Create furniture based on given values
    this.addFurnitureToRoom('bedroom1', 'bed', x, y, bed, bed, spmTotalValue >= 0 ? "green" : "red", rotation);
    this.addFurnitureToRoom('bathroom1', 'bathtub', x, y, bathtub, bathtub, spmSnapSub >= 0 ? "orange" : "grey", rotation);
    this.addFurnitureToRoom("house", "table", x, y, dining, dining, spmCapHouseSub >= 0 ? "orange" : "grey", rotation);
    this.addFurnitureToRoom("house", "couch", x, y, couch1, couch1, spmSchLunch >= 0 ? "orange" : "grey", rotation);
    this.addFurnitureToRoom("house", "rect", x, y, rect1, rect1, spmEngVal >= 0 ? "orange" : "grey", rotation);
    this.addFurnitureToRoom("closet1", "rect", x, y, rect2, rect2, spmWICVal >= 0 ? "orange" : "grey", rotation);
    this.addFurnitureToRoom("balcony", "rect", x, y, rect3, rect3, spmFica >= 0 ? "red" : "green", rotation);
    this.addFurnitureToRoom("bedroom1", "couch", x, y, couch2, couch2, spmFedTax >= 0 ? "red" : "grey", rotation);
    this.addFurnitureToRoom("house", "couch", x, y, couch3, couch3, spmStTax >= 0 ? "red" : "grey", rotation);
    this.addFurnitureToRoom("kitchen", "circle", x, y, circle1, 0,  spmCapWkCCXpns >= 0 ? "red" : "grey");
    this.addFurnitureToRoom("balcony", "circle", x, y, circle2, 0, circle2 >= 0 ? "red" : "grey");

    // Print statement for debugging purposes
    console.log('Furniture items created successfully.');
    console.log('Furniture Group:', furnitureGroup);
    
    console.log('FloorPlan Group:', floorPlanG);
    });
  }
}

// Multi-Family Home Visualization
let multiFamilyHome = new SVGChart('.vis-holder', 'vis-svg-1', '0 0 1000 600');
let g = multiFamilyHome.addGroup('multi-family', 'white', 'black', '2.5');
multiFamilyHome.addRect(g, 'house', 100, 200, 800, 375);
multiFamilyHome.addPolygon(g, 'roof', '100,200 500,50 900,200');

// Add doors, knobs, steps, door windows, blinds, and signs
for (let i = 0; i < 4; i++) {
  multiFamilyHome.addRect(g, `door${i+1}`, 200 + 150 * i, 350, 100, 225);
  multiFamilyHome.addCircle(g, `door-knob${i+1}`, 280 + 150 * i, 450, 5);
  multiFamilyHome.addRect(g, `door-step${i+1}`, 200 + 150 * i, 550, 100, 25);
  multiFamilyHome.addRect(g, `door-window${i+1}`, 225 + 150 * i, 375, 50, 50);
  multiFamilyHome.addRect(g, `door-window-blind${i+1}`, 225 + 150 * i, 375, 50, 5);
  multiFamilyHome.addRect(g, `door-sign${i+1}`, 200 + 150 * i, 300, 100, 25);
  multiFamilyHome.addText(g, 210 + 150 * i, 320, `Unit ${i+1}`);
}


/* Define furniture data for different racial categories
format = [position={x, y}, attributes={spmTotalValue, spmSnapSub, 
spmCapHouseSub, spmSchLunch, spmEngVal, spmWICVal, spmFica, spmFedTax,
spmStTax, spmCapWkCCXpns, spmMedXpns}]
 */
const floorPlanDataAsian = [
	{position: {x: 70, y: 30, width: 10, height: 10, rotation: 0},
	attributes: {spmTotalValue: 151067, spmSnapSub: 420, spmCapHouseSub: 137, spmSchLunch: 310, spmEngVal: 19, spmWICVal: 10, spmFica: 9022, spmFedTax: 16321, spmStTax: 5829, spmCapWkCCXpns: 3617, spmMedXpns: 6275}
	}];
const floorPlanDataBlack =  [
	{position: {x: 70, y: 30, width: 10, height: 10, rotation: 0}, 
	attributes: {spmTotalValue: 75492, spmSnapSub: 1132, spmCapHouseSub: 509, spmSchLunch: 362, spmEngVal: 37, spmWICVal: 29, spmFica: 4417, spmFedTax: 148, spmStTax: 1936, spmCapWkCCXpns: 2491, spmMedXpns: 4237}
	}];
const floorPlanDataOther =  [
	{position: {x: 70, y: 30, width: 10, height: 10, rotation: 0},
	attributes: {spmTotalValue: 95906, spmSnapSub: 820, spmCapHouseSub: 279,	spmSchLunch: 487, spmEngVal: 25, spmWICVal: 28, spmFica: 6106, spmFedTax: 1667, spmStTax: 2410, spmCapWkCCXpns: 3274, spmMedXpns: 4621}
	}];
const floorPlanDataWhite = [
	{position: {x: 70, y: 30, width: 10, height: 10, rotation: 0},
	attributes: {spmTotalValue: 115321, spmSnapSub: 319, spmCapHouseSub: 63,	spmSchLunch: 299, spmEngVal: 17, spmWICVal: 10, spmFica: 6361, spmFedTax: 9653, spmStTax: 3595, spmCapWkCCXpns: 9653, spmMedXpns: 3595}
	}];

  
// Floor Plan Visualization
let floorPlan = new SVGChart('.vis-holder', 'vis-svg-2', '0 0 1000 600');
// // Call createFloorPlan for each racial category
// floorPlan.createFloorPlan(furnitureDataAsian);
// floorPlan.createFloorPlan(furnitureDataBlack);
// floorPlan.createFloorPlan(furnitureDataOther);
// floorPlan.createFloorPlan(furnitureDataWhite);

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

// Event listeners for room filter buttons
d3.select("#povertyFilter").on("click", function() {
  updateVisualization('poverty');
});

d3.select("#educationFilter").on("click", function() {
  updateVisualization('education');
});

d3.select("#ownershipFilter").on("click", function() {
  updateVisualization('ownership');
});

d3.select("#incomeFilter").on("click", function() {
  updateVisualization('income');
});

// Event listener for door clicks
document.querySelectorAll('[id^="door"]').forEach((door, index) => {
  door.addEventListener('click', function() {
  // Print statement for debugging
  console.log('Door clicked inside vis.js:', this.id);
  
  // Assign each door its own floorplan
  const floorPlanDataArray = [ // Can change the order but door signs won't update titles
      floorPlanDataAsian,
      floorPlanDataBlack,
      floorPlanDataOther,
      floorPlanDataWhite
  ];

  // Dynamically generate the respective floor plan based on clicked door
  const doorFloorPlanData = floorPlanDataArray[index];
  floorPlan.createFloorPlan(doorFloorPlanData);
  console.log("Door floor plan data:", doorFloorPlanData); 
  });
});

// Update the visualization based on the selected filter
// this function is not working entirely and still needs revision on how to correlate 
// the instances of furnitures 
function updateVisualization(filterType) {
  // shadow all furnitures
  d3.selectAll('#vis-svg-2 g').style('opacity', 0.2);

  // Based on the filter type, highlight the corresponding furniture
  switch (filterType) {
      case 'poverty':
          d3.selectAll('#vis-svg-2 g').filter(function() {
              return this.innerHTML.includes('bedsheet'); 
          }).style('opacity', 1);
          break;
      case 'education':
          d3.selectAll('#vis-svg-2 g').filter(function() {
              return this.innerHTML.includes('table'); 
          }).style('opacity', 1);
          break;
      case 'ownership':
          d3.selectAll('#vis-svg-2 g').filter(function() {
              return this.innerHTML.includes('bathtub'); 
          }).style('opacity', 1);
          break;
      case 'income':
          d3.selectAll('#vis-svg-2 g').filter(function() {
              return this.innerHTML.includes('couch'); 
          }).style('opacity', 1);
          break;
      default:
          d3.selectAll('#vis-svg-2 g').style('opacity', 1);
          break;
  }
}


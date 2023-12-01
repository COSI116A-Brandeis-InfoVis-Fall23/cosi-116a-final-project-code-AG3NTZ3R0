class SVGChart {
  constructor(parentSelector, id, viewBox, preserveAspectRatio) {
    this.svg = d3.select(parentSelector)
      .append('svg')
      .attr('id', id)
      .attr('viewBox', viewBox)
      .attr('preserveAspectRatio', preserveAspectRatio || 'xMidYMid meet')
      .attr('version', '1.1')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
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
  
  // modified createFurniture method to accept furniture data
  createFurniture(furnitureData) {
	// Clear previous furniture
	const svg = this.svg;
	svg.selectAll(".furniture").remove() 
	  
	// Scale furniture size
	const scaleFactor = 0.01;
	
	// Get canvas size
    const canvasWidth = 500;
    const canvasHeight = 500;
	console.log(`Viz size: x=${canvasWidth}, y=${canvasHeight}`);
	
	/*// Reference to furniture group
	const furnitureGroup = svg.append('g').classed('furniture', true);
	*/
	
	// Method to make sure that furniture does not overlap
	const hasOverlap = (x, y, width, height) => {
	  const existingFurniture = svg.selectAll(".furniture"); 

      let overlap = false;

      existingFurniture.each(function () {
        const existingX = +d3.select(this).attr("x");
        const existingY = +d3.select(this).attr("y");
        const existingWidth = +d3.select(this).attr("furnitureWidth");
        const existingHeight = +d3.select(this).attr("furnitureHeight");

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
		const furnitureRot = position.rotation;


		// const color = item.color;
	
		// Check for overlap, adjust coordinates if needed
		while (
		  hasOverlap(x, y, furnitureWidth, furnitureWidth) ||
		  x < 0 ||
		  y < 0 ||
		  x + furnitureWidth > canvasWidth ||
		  y + furnitureWidth > canvasHeight
		) {
		  // Print positions for debugging purposes
		  console.log(`Current position: x=${x}, y=${y}`);

		  // If the furniture goes beyond the right or bottom edge, adjust its position
		  if (x + furnitureWidth > canvasWidth) {
			x = canvasWidth - furnitureWidth;
		  }
		  if (y + furnitureHeight > canvasHeight) {
			y = canvasHeight - furnitureHeight;
		  }

		  // If the furniture goes beyond the left or top edge, adjust its position
		  if (x < 0) {
			x = 0;
		  }
		  if (y < 0) {
			y = 0;
		  }

		  // Check for overlap after adjustments
		  if (hasOverlap(x, y, furnitureWidth, furnitureHeight)) {
			// Adjust the position incrementally
			x += 10;
			y += 10;
		  }

		  // Prevent infinite loop if repositioning doesn't help
		  if (x > canvasWidth || y > canvasHeight) {
		    console.error("Cannot position furniture within canvas boundaries.");
		    break;
		  }
		}
		
		// Access attributes specific to each furniture item
		const {
			spmTotalValue,
			spmSnapSub,
            spmCapHouseSub,
			spmSchLunch,
            spmEngVal,
            spmWICVal,
            spmFica,
            spmFedTax,
            spmStTax,
            spmCapWkCCXpns,
            spmMedXpns,
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
		createBed(x, y, bed, bed, spmTotalValue >= 0 ? "green" : "red", 0);
		createBathtub(x, y, bathtub, bathtub, spmSnapSub >= 0 ? "orange" : "grey", 0);
		createDiningTable(x, y, dining, dining, spmCapHouseSub >= 0 ? "orange" : "grey", 0);
		createCouch(x, y, couch1, couch1, spmSchLunch >= 0 ? "orange" : "grey", 0);
		createRect(x, y, rect1, rect1, spmEngVal >= 0 ? "orange" : "grey", 0);
		createRect(x, y, rect2, rect2, spmWICVal >= 0 ? "orange" : "grey", 0);
		createRect(x, y, rect3, rect3, spmFica >= 0 ? "green" : "red", 0);
		createCouch(x, y, couch2, couch2, spmFedTax >= 0 ? "red" : "grey", 0);
		createCouch(x, y, couch3, couch3, spmStTax >= 0 ? "red" : "grey", 0);
		createCircle(x, y, circle1, circle1, spmCapWkCCXpns >= 0 ? "red" : "grey");
		createCircle(x, y, circle2, circle2 >= 0 ? "red" : "grey");
		
		// Print statement for debugging purposes
		console.log('Furniture items created successfully.');
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

/* Define furniture data for different racial categories
format = [position={x, y}, attributes={spmTotalValue, spmSnapSub, 
spmCapHouseSub, spmSchLunch, spmEngVal, spmWICVal, spmFica, spmFedTax,
 spmStTax, spmCapWkCCXpns, spmMedXpns}]
 */
const furnitureDataAsian = [
	{position: {x: 70, y: 30, width: 10, height: 10, rotation: 0},
	attributes: {spmTotalValue: 151067, spmSnapSub: 420, spmCapHouseSub: 137, spmSchLunch: 310, spmEngVal: 19, spmWICVal: 10, spmFica: 9022, spmFedTax: 16321, spmStTax: 5829, spmCapWkCCXpns: 3617, spmMedXpns: 6275}
	}];
const furnitureDataBlack =  [
	{position: {x: 70, y: 30, width: 10, height: 10, rotation: 0}, 
	attributes: {spmTotalValue: 75492, spmSnapSub: 1132, spmCapHouseSub: 509, spmSchLunch: 362, spmEngVal: 37, spmWICVal: 29, spmFica: 4417, spmFedTax: 148, spmStTax: 1936, spmCapWkCCXpns: 2491, spmMedXpns: 4237}
	}];
const furnitureDataOther =  [
	{position: {x: 70, y: 30, width: 10, height: 10, rotation: 0},
	attributes: {spmTotalValue: 95906, spmSnapSub: 820, spmCapHouseSub: 279,	spmSchLunch: 487, spmEngVal: 25, spmWICVal: 28, spmFica: 6106, spmFedTax: 1667, spmStTax: 2410, spmCapWkCCXpns: 3274, spmMedXpns: 4621}
	}];
const furnitureDataWhite = [
	{position: {x: 70, y: 30, width: 10, height: 10, rotation: 0},
	attributes: {spmTotalValue: 115321, spmSnapSub: 319, spmCapHouseSub: 63,	spmSchLunch: 299, spmEngVal: 17, spmWICVal: 10, spmFica: 6361, spmFedTax: 9653, spmStTax: 3595, spmCapWkCCXpns: 9653, spmMedXpns: 3595}
	}];

// Call createFurniture for each racial category
floorPlan.createFurniture(furnitureDataAsian);
floorPlan.createFurniture(furnitureDataBlack);
floorPlan.createFurniture(furnitureDataOther);
floorPlan.createFurniture(furnitureDataWhite);

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

// // Room Filter
// let filterGroup = floorPlan.addGroup('filter-container', 'none', 'black', '0').attr('transform', 'translate(700, 90)');
//
// // Filter Labels
// const filters = [
//     { label: "Poverty Level:", id: "poverty" },
//     { label: "Education Level:", id: "education" },
//     { label: "Ownership Rate:", id: "ownership" },
//     { label: "Income Level:", id: "income" }
// ];
//
// filters.forEach((filter, index) => {
//     let yOffset = index * 30;
//     floorPlan.addText(filterGroup, `${filter.id}-label`, 0, yOffset + 15, filter.label);
//     floorPlan.addRect(filterGroup, `${filter.id}-track`, 120, yOffset + 5, 100, 2, 'grey');
//     floorPlan.addCircle(filterGroup, `${filter.id}-handle`, 135, yOffset + 6, 5, 'blue');
//     floorPlan.addText(filterGroup, `${filter.id}Value`, 230, yOffset + 15, '50');
// });
//

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
      .attr('stroke-width', strokeWidth)
  }

  addRect(group, id, x, y, width, height, fill) {
    return group.append('rect')
      .attr('id', id)
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', fill);
  }

  addPolygon(group, id, points, fill) {
    return group.append('polygon')
      .attr('id', id)
      .attr('points', points)
      .attr('fill', fill);
  }

  addCircle(group, id, cx, cy, r, fill) {
    return group.append('circle')
      .attr('id', id)
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .attr('fill', fill);
  }

  addText(group, x, y, text, font_size, fill, text_anchor) {
    return group.append('text')
      .attr('x', x)
      .attr('y', y)
      .text(text)
      .attr('font-size', font_size)
      .attr('fill', fill);
  }

    addPath(group, id, d, fill) {
        return group.append('path')
        .attr('id', id)
        .attr('d', d)
        .attr('fill', fill);
    }
}

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


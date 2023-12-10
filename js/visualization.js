export class SVGChart {
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


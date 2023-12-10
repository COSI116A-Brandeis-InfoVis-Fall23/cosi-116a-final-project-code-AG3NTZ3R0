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


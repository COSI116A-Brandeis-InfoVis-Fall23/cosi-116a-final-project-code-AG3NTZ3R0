// Immediately Invoked Function Expression to limit access to our 
// variables and prevent global scope pollution
(() => {
  // Assuming you have separate SVG elements for each racial category
  const asianSvg = d3.select("#asian-floor-plan");
  const blackSvg = d3.select("#black-floor-plan");
  const otherSvg = d3.select("#other-floor-plan");
  const whiteSvg = d3.select("#white-floor-plan");
  
  // Apply the common class to each SVG
  asianSvg.classed("floor-plan", true);
  blackSvg.classed("floor-plan", true);
  otherSvg.classed("floor-plan", true);
  whiteSvg.classed("floor-plan", true);

  // Function to create furniture based on CSV data
  function createFurniture(data, svg) {
    svg.selectAll("*").remove(); // Clear previous furniture
	
	const scaleFactor = 10; // Adjust this value based on your needs

    data.forEach((item, index) => {
      const racialCategory = item.Race; // Assuming the column name is "Race"

      // Create variables for each category
      const SPM_Totval = +item["Avg. SPM Totval"].replace(/,/g, '');
      const SPM_SnapSub = +item["Avg. SPM SnapSub"].replace(/,/g, '');
      const SPM_CapHouseSub = +item["Avg. SPM CapHouseSub"].replace(/,/g, '');
      const SPM_SchLunch = +item["Avg. SPM SchLunch"].replace(/,/g, '');
      const SPM_EngVal = +item["Avg. SPM EngVal"].replace(/,/g, '');
      const SPM_WICval = +item["Avg. SPM WICval"].replace(/,/g, '');
      const SPM_Fica = +item["Avg. SPM Fica"].replace(/,/g, '');
      const SPM_FedTax = +item["Avg. SPM FedTax"].replace(/,/g, '');
      const SPM_StTax = +item["Avg. SPM StTax"].replace(/,/g, '');
      const SPM_CapWkCCXpns = +item["Avg. SPM CapWkCCXpns"].replace(/,/g, '');
      const SPM_MedXpns = +item["Avg. SPM MedXpns"].replace(/,/g, '');

      // Determine furniture creation based on data values

      createBed(70, 30, SPM_Totval * scaleFactor, SPM_Totval * scaleFactor, SPM_Totval >= 0 ? "green" : "red");

	  createBathtub(320, 30, SPM_SnapSub * scaleFactor, SPM_SnapSub * scaleFactor, SPM_SnapSub >= 0 ? "orange" : "grey");

      createDiningTable(520, 340, SPM_CapHouseSub * scaleFactor, SPM_CapHouseSub * scaleFactor, SPM_CapHouseSub >= 0 ? "orange" : "grey");
	  
	  createCouch(350, 140, SPM_SchLunch, SPM_SchLunch, SPM_SchLunch >= 0 ? "orange" : "grey");	
	  
	  createRect(400, 180, SPM_EngVal, SPM_EngVal, SPM_EngVal >= 0 ? "orange" : "grey");		
	  createRect(610, 175, SPM_WICval, SPM_WICval, SPM_WICval >= 0 ? "orange" : "grey");
	  createRect(390, 250, SPM_Fica, SPM_Fica, SPM_Fica >= 0 ? "green" : "red");
	  createRect(620, 30, SPM_FedTax, SPM_FedTax, SPM_FedTax >= 0 ? "green" : "red");
	  createCircle(440, 470, SPM_CapWkCCXpns, SPM_CapWkCCXpns, SPM_CapWkCCXpns >= 0 ? "green" : "red");
      createCircle(390, 445, SPM_MedXpns, SPM_MedXpns, SPM_MedXpns >= 0 ? "green" : "red");

    });
  }
  });
}

 // Function to read CSV file and create furniture
  function readCSV(file, svg) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const csvData = d3.csvParse(e.target.result);
      createFurniture(csvData, svg);
    };
    reader.readAsText(file);
  }

  // Assume you have a default CSV file in the repository
  const defaultCsvFile = "/data/SPM_Resources_Avgs_by_Race.csv";
  readCSV(defaultCsvFile, d3.select(asianSvg)); // Assuming Asian is the first category
  readCSV(defaultCsvFile, d3.select(blackSvg)); 
  readCSV(defaultCsvFile, d3.select(otherSvg)); 
  readCSV(defaultCsvFile, d3.select(whiteSvg)); 
})();
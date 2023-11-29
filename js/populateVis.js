/**
 * Immediately Invoked Function Expression (IIFE) to limit access to our
 * variables and prevent global scope pollution.
 */
(() => {
    // Select SVG elements for each racial category
    const asianSvg = d3.select("#asian-floor-plan");
    const blackSvg = d3.select("#black-floor-plan");
    const otherSvg = d3.select("#other-floor-plan");
    const whiteSvg = d3.select("#white-floor-plan");

    // Apply the common class to each SVG
    asianSvg.classed("floor-plan", true);
    blackSvg.classed("floor-plan", true);
    otherSvg.classed("floor-plan", true);
    whiteSvg.classed("floor-plan", true);

    /**
     * Function to create furniture based on CSV data
     * @param {Array} data - The data from the CSV file
     * @param {Object} svg - The SVG element to draw the furniture on
     */
    function createFurniture(data, svg) {
        // Clear previous furniture
        svg.selectAll("*").remove();

        // Scale factor for furniture size
        const scaleFactor = 10;

        // Iterate over each item in the data
        data.forEach((item, index) => {
            // Get the racial category from the data
            const racialCategory = item.Race;

            // Parse and clean data values
            const spmTotalValue = +item["Avg. SPM Totval"].replace(/,/g, '');
            const spmSnapSub = +item["Avg. SPM SnapSub"].replace(/,/g, '');
            const spmCapHouseSub = +item["Avg. SPM CapHouseSub"].replace(/,/g, '');
            const spmSchLunch = +item["Avg. SPM SchLunch"].replace(/,/g, '');
            const spmEngVal = +item["Avg. SPM EngVal"].replace(/,/g, '');
            const spmWICval = +item["Avg. SPM WICval"].replace(/,/g, '');
            const spmFica = +item["Avg. SPM Fica"].replace(/,/g, '');
            const spmFedTax = +item["Avg. SPM FedTax"].replace(/,/g, '');
            const spmStTax = +item["Avg. SPM StTax"].replace(/,/g, '');
            const spmCapWkCCXpns = +item["Avg. SPM CapWkCCXpns"].replace(/,/g, '');
            const spmMedXpns = +item["Avg. SPM MedXpns"].replace(/,/g, '');

            // Create furniture based on data values
            createBed(70, 30, spmTotalValue * scaleFactor, spmTotalValue * scaleFactor, spmTotalValue >= 0 ? "green" : "red");
            createBathtub(320, 30, spmSnapSub * scaleFactor, spmSnapSub * scaleFactor, spmSnapSub >= 0 ? "orange" : "grey");
            createDiningTable(520, 340, spmCapHouseSub * scaleFactor, spmCapHouseSub * scaleFactor, spmCapHouseSub >= 0 ? "orange" : "grey");
            createCouch(350, 140, spmSchLunch, spmSchLunch, spmSchLunch >= 0 ? "orange" : "grey");
            createRect(400, 180, spmEngVal, spmEngVal, spmEngVal >= 0 ? "orange" : "grey");
            createRect(610, 175, spmWICval, spmWICval, spmWICval >= 0 ? "orange" : "grey");
            createRect(390, 250, spmFica, spmFica, spmFica >= 0 ? "green" : "red");
        });
    }
})();
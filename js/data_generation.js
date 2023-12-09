/**
 * Immediately Invoked Function Expression (IIFE) to limit access to our
 * variables and prevent global scope pollution.
 */
(() => {
    console.log("Populate Vis");
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

        data.forEach((item, index) => {
            // Get the racial category from the data
            const racialCategory = item.Race;

            // Initialize an object to store the parsed values
            const parsedValues = {};

            // Iterate over the keys of the item
            for (let key in item) {
                // Skip the 'Race' key
                if (key !== 'Race') {
                    // Parse and clean data values
                    parsedValues[key] = item[key] ? +item[key].replace(/,/g, '') : 0;
                }
            }

            console.log(parsedValues);

            // Now you can use parsedValues to access the cleaned data values
            // For example: parsedValues["Avg. SPM Totval"]

            /// Create furniture based on data values
            createBed(70, 30, parsedValues["Avg. SPM Totval"] * scaleFactor, parsedValues["Avg. SPM Totval"] * scaleFactor, parsedValues["Avg. SPM Totval"] >= 0 ? "green" : "red");
            createBathtub(320, 30, parsedValues["Avg. SPM SnapSub"] * scaleFactor, parsedValues["Avg. SPM SnapSub"] * scaleFactor, parsedValues["Avg. SPM SnapSub"] >= 0 ? "orange" : "grey");
            createDiningTable(520, 340, parsedValues["Avg. SPM CapHouseSub"] * scaleFactor, parsedValues["Avg. SPM CapHouseSub"] * scaleFactor, parsedValues["Avg. SPM CapHouseSub"] >= 0 ? "orange" : "grey");
            createCouch(350, 140, parsedValues["Avg. SPM SchLunch"], parsedValues["Avg. SPM SchLunch"], parsedValues["Avg. SPM SchLunch"] >= 0 ? "orange" : "grey");
            createRect(400, 180, parsedValues["Avg. SPM EngVal"], parsedValues["Avg. SPM EngVal"], parsedValues["Avg. SPM EngVal"] >= 0 ? "orange" : "grey");
            createRect(610, 175, parsedValues["Avg. SPM WICval"], parsedValues["Avg. SPM WICval"], parsedValues["Avg. SPM WICval"] >= 0 ? "orange" : "grey");
            createRect(390, 250, parsedValues["Avg. SPM Fica"], parsedValues["Avg. SPM Fica"], parsedValues["Avg. SPM Fica"] >= 0 ? "green" : "red");
        });
    }

    d3.csv("data/SPM_Resources_Avgs_by_Race.csv", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            // Create furniture based on the CSV data
            createFurniture(data, asianSvg);
        }
    });
})();
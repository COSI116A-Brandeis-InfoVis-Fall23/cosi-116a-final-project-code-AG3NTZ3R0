/**
 * Immediately Invoked Function Expression (IIFE) to limit access to our
 * variables and prevent global scope pollution.
 */
(() => {
    const asianSvg = d3.select("#asian-floor-plan");
    const blackSvg = d3.select("#black-floor-plan");
    const otherSvg = d3.select("#other-floor-plan");
    const whiteSvg = d3.select("#white-floor-plan");

    asianSvg.classed("floor-plan", true);
    blackSvg.classed("floor-plan", true);
    otherSvg.classed("floor-plan", true);
    whiteSvg.classed("floor-plan", true);

    function createFurniture(data, svg) {
        svg.selectAll("*").remove();

        const scaleFactor = 10;

        data.forEach((item, index) => {
            const racialCategory = item.Race;

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

            createBed(70, 30, spmTotalValue * scaleFactor, spmTotalValue * scaleFactor, spmTotalValue >= 0 ? "green" : "red");
            createBathtub(320, 30, spmSnapSub * scaleFactor, spmSnapSub * scaleFactor, spmSnapSub >= 0 ? "orange" : "grey");
            createDiningTable(520, 340, spmCapHouseSub * scaleFactor, spmCapHouseSub * scaleFactor, spmCapHouseSub >= 0 ? "orange" : "grey");
            createCouch(350, 140, spmSchLunch, spmSchLunch, spmSchLunch >= 0 ? "orange" : "grey");
            createRect(400, 180, spmEngVal, spmEngVal, spmEngVal >= 0 ? "orange" : "grey");
            createRect(610, 175, spmWICval, spmWICval, spmWICval >= 0 ? "orange" : "grey");
            createRect(390, 250, spmFica, spmFica, spmFica >= 0 ? "green" : "red");
        });
    }

    // Load CSV file and execute createFurniture function
    d3.csv("/data/SPM_Resources_Avgs_by_Race.csv").then((data) => {
        createFurniture(data, asianSvg);
        createFurniture(data, blackSvg);
        createFurniture(data, otherSvg);
        createFurniture(data, whiteSvg);
    });
})();

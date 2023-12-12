import { SVGChart } from './svg_chart.js';
import { FloorPlan } from "./floor_plan.js";
import { Furniture } from "./furniture.js";
import { RoomKey } from "./room_key.js";

export class MultiFamilyHome extends SVGChart {
    constructor(parentSelector, id, viewBox, preserveAspectRatio) {
        super(parentSelector, id, viewBox, preserveAspectRatio);

        this.g = this.addGroup('multi-family', 'white', 'black', '2.5');

        this.build();
    }

    build() {
        this.addRect(this.g, 'house', 100, 200, 800, 375, 'lightgrey');
        this.addPolygon(this.g, 'roof', '100,200 500,50 900,200', 'darkgrey');
        this.addRect(this.g, 'chimney', 700, 100, 100, 100, 'darkred');

        let smokeCloud = "M 750 80 Q 760 70 770 80 T 790 80 T 810 80 T 830 80";
        this.addPath(this.g, 'smoke-cloud', smokeCloud, 'lightgrey');

        // Define the racial categories
        const racialCategories = ["White", "Black", "Asian", "Other"];

        let index = 0;
        for (let category of racialCategories) {
            let doorId = `door-${category.toLowerCase()}`;
            this.addRect(this.g, doorId, 220 + 150 * index, 350, 100, 225, 'brown');
            this.addCircle(this.g, `${doorId}-knob`, 300 + 150 * index, 450, 5, 'gold');
            this.addRect(this.g, `${doorId}-step`, 220 + 150 * index, 550, 100, 25, 'darkgrey');
            this.addRect(this.g, `${doorId}-window`, 245 + 150 * index, 375, 50, 50, 'lightblue');
            this.addRect(this.g, `${doorId}-window-blind`, 245 + 150 * index, 375, 50, 5, 'white');
            this.addRect(this.g, `${doorId}-sign`, 220 + 150 * index, 300, 100, 25, 'white');
            this.addText(this.g, 245 + 150 * index, 320, category, '20px', 'black');

            let floorPlan = new FloorPlan('.vis-holder', `vis-svg-${category.toLowerCase()}`, '0 0 1000 600', 'xMidYMid meet', category);
            d3.select(`#vis-svg-${category.toLowerCase()}`).style("display", "none");

            let roomKey = new RoomKey(`#vis-svg-${category.toLowerCase()}`);
            roomKey.addRoomKey();

            this.load(category.toLowerCase());

            let furniture = new Furniture(`#vis-svg-${category.toLowerCase()}`);
            furniture.sampleFurniture();


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
    }

    load(racialCategory) {
        d3.csv(`data/${racialCategory}_floor_plan.csv`, function(error, data) {
            if (error) {
                console.log(error);
            } else {
                let columns = [
                    // Each Income
                    "SPM Resources (AVG)", "SPM Totval (AVG)",
                    // Total Tax
                    "SPM FedTax (AVG)", "Spm Fica (AVG)", "SPM StTax (AVG)",
                    // Total Subsidies
                    "SPM SnapSub (AVG)", "SPM SchLunch (AVG)", "SPM WICvalgi (AVG)", "SPM CapHouseSub (AVG)", "SPM EngVal (AVG)",
                    // Work Expenses
                    "SPM CapWkCCXpns (AVG)",
                    // Other Expenses
                    // None
                    // Child Expenses
                    "SPM CapWkCCXpns (AVG)",
                    // Medical Expenses
                    "SPM MedXpns (AVG)"
                ]
                let statistics = {};
                columns.forEach(function(column) {
                    // Generate default statistics
                    statistics[column] = {"count": 0, "total": 0, "avg": 0, "max": 0, "min": 1000000};
                    // Generate statistics
                    data.forEach(function(row) {
                        if (row[column] < statistics[column]["min"]) {
                            statistics[column]["min"] = row[column];
                        }
                        if (row[column] > statistics[column]["max"]) {
                            statistics[column]["max"] = row[column];
                        }
                        statistics[column]["total"] += +row[column];
                        statistics[column]["count"] += 1;
                    });
                    statistics[column]["avg"] = statistics[column]["total"] / statistics[column]["count"];
                });

                console.log(statistics)
            }
        });
    }
}
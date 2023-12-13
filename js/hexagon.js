export class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

export class Hexagon {
    constructor(svgId, data) {
        this.svg = d3.select(svgId);
        this.data = data;
        this.vertices = this.svg.append('g').attr('id', 'hexagon-vertices');
        this.dispatcher;
    }

    // Upper bound value for each dimension
    maxValue = {
        resources: 65000,
        cashIncome: 80000,
        totalTax: 10000,
        totalSubsidies: 4000,
        wkccExpenses: 3000,
        medicalExpenses: 6000,
    }

    // Points
    originPoint = new Point(830,353.93);
    resourcesEndPoint = new Point(770, 250);
    totalTaxEndPoint = new Point(710, 353.93);
    cashIncomeEndPoint = new Point(890, 250);
    totalSubsidiesEndPoint = new Point(770, 455.86);
    wkccExpensesEndPoint = new Point(890, 455.86);
    medicalExpensesEndPoint = new Point(950, 353.93);

    // Generate vertex in the given dimension
    generateVertex(dimension, value) {
        let x = this.originPoint.x;
        let y = this.originPoint.y;
        switch (dimension) {
            case "Resources":
                x = this.originPoint.x - value / this.maxValue.resources * Math.abs(this.resourcesEndPoint.x - this.originPoint.x);
                y = this.originPoint.y - value / this.maxValue.resources * Math.abs(this.resourcesEndPoint.y - this.originPoint.y);
                break;
            case "Total Tax":
                x = this.originPoint.x - value / this.maxValue.totalTax * Math.abs(this.totalTaxEndPoint.x - this.originPoint.x);
                y = this.totalTaxEndPoint.y;
                break;
            case "Cash Income":
                x = this.originPoint.x + value / this.maxValue.cashIncome * Math.abs(this.cashIncomeEndPoint.x - this.originPoint.x);
                y = this.originPoint.y - value / this.maxValue.cashIncome * Math.abs(this.cashIncomeEndPoint.y - this.originPoint.y);
                break;
            case "Total Subsidies":
                x = this.originPoint.x - value / this.maxValue.totalSubsidies * Math.abs(this.totalSubsidiesEndPoint.x - this.originPoint.x);
                y = this.originPoint.y + value / this.maxValue.totalSubsidies * Math.abs(this.totalSubsidiesEndPoint.y - this.originPoint.y);
                break;
            case "WKCC Expenses":
                x = this.originPoint.x + value / this.maxValue.wkccExpenses * Math.abs(this.wkccExpensesEndPoint.x - this.originPoint.x);
                y = this.originPoint.y + value / this.maxValue.wkccExpenses * Math.abs(this.wkccExpensesEndPoint.y - this.originPoint.y);
                break;
            case "Medical Expenses":
                x = this.originPoint.x + value / this.maxValue.medicalExpenses * Math.abs(this.medicalExpensesEndPoint.x - this.originPoint.x);
                y = this.medicalExpensesEndPoint.y;
                break;
            default:
        }
        return new Point(x,y);
    }

    generateHexagon(resources, cashIncome, totalTax, totalSubsidies, wkccExpenses, medicalExpenses) {
        let points = [
            this.generateVertex("Resources", resources),
            this.generateVertex("Cash Income", cashIncome),
            this.generateVertex("Medical Expenses", medicalExpenses),
            this.generateVertex("WKCC Expenses", wkccExpenses),
            this.generateVertex("Total Subsidies", totalSubsidies),
            this.generateVertex("Total Tax", totalTax)
        ];

        this.svg.append("polygon")
        .attr("points", `${points[0].x} ${points[0].y}, ${points[1].x} ${points[1].y}, ${points[2].x} ${points[2].y}, 
        ${points[3].x} ${points[3].y}, ${points[4].x} ${points[4].y}, ${points[5].x} ${points[5].y}, ${points[0].x} ${points[0].y}`)
        .attr("transform", "rotate(30,830,353.93)")
        .attr("fill", "green").attr("opacity", 0.6)

        let id = ['p-resources','p-totval','p-medxpns','p-wkccxpns','p-totsub','p-tottax'];

        for (let i = 0; i < 6; i++) {
            this.vertices.append("circle").attr('id', id[i]).attr('cx', `${points[i].x}`).attr('cy', `${points[i].y}`).attr('r', '3')
            .attr("transform", "rotate(30,830,353.93)").attr("fill", "green")
        }
        
    }

    // Brushing and Linking
    brush() {
        let margin = {
            top: 240,
            left: 700,
            right: 960,
            bottom: 465
        }

        const brush = d3.brush()
        .on("start brush", highlight)
        .on("end", brushEnd)
        .extent([[margin.left, margin.top],[margin.right, margin.bottom]]);

        this.svg.call(brush);

        // Highlight the selected vertices in hexagon
        function highlight() {
            if (d3.event.selection === null) return;
            const [[x0, y0],[x1, y1]] = d3.event.selection;

            // select vertices
            const vertices = this.vertices.selectAll("circle");
            vertices.each(function() {
                const vertex = d3.select(this);
                const x = +vertex.attr("cx");
                const y = +vertex.attr("cy");
                vertex.classed("point-selected", x0 <= x && x <= x1 && y0 <= y && y <= y1);
            })

            let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];

            dispatcher.call(dispatchString, this, svg.selectAll(".point-selected").id());
        }

        function brushEnd() {
            if (d3.event.sourceEvent.type != "end") {
              d3.select(this).call(brush.move, null);
            }
          }
        
    }

    selectionDispatcher(_) {
        if (!arguments.length) return dispatcher;
        this.dispatcher = _;
    }

    updateSelection(selectedFurniture) {
        if (!arguments.length) return;
        const furnitureIds = selectedFurniture.selectAll("*").nodes().map(element => element.id);
        // update selected vertices according to selected furniture
        for (let id in furnitureIds) {
            id = id.substring(2);
            switch (id) {
                case "resources": 
                    this.vertices.select("#p-resources").classed("point-selected")
                    break;
                case "totval": 
                    this.vertices.select("#p-totval").classed("point-selected")
                    break;
                case "medxpns": 
                    this.vertices.select("#p-medxpns").classed("point-selected")
                    break;
                case "capwkccxpns": 
                    this.vertices.select("#p-wkccxpns").classed("point-selected")
                    break;
                case "fedtax":
                case "sttax":
                case "fica":
                    this.vertices.select("#p-tottax").classed("point-selected")
                    break;
                case "snapsub":
                case "schlunch":
                case "wicval":
                case "caphousesub":
                case "engval":
                    this.vertices.select("#p-totsub").classed("point-selected")
                    break;
                default:
            }
        }
    }

}

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
    }

    // Upper bound value for each dimension
    maxValue = {
        resources: 100000,
        cashIncome: 100000,
        totalTax: 20000,
        totalSubsidies: 4000,
        wkccExpenses: 1000,
        medicalExpenses: 10000,
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
        p1 = generateVertex("Resources", resources);
        p2 = generateVertex("Cash Income", cashIncome);
        p3 = generateVertex("Medical Expenses", medicalExpenses);
        p4 = generateVertex("WKCC Expenses", wkccExpenses);
        p5 = generateVertex("Total Subsidies", totalSubsidies);
        p6 = generateVertex("Total Tax", totalTax);


        d3.select("#hexagon").append("polygon")
        .attr("points", `${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}, ${p5.x} ${p5.y}, ${p6.x} ${p6.y}, ${p1.x} ${p1.y}`)
        .attr("transform", "rotate(30,830,353.93)")
        .attr("fill", "green").attr("opacity", 0.6)
    }

}

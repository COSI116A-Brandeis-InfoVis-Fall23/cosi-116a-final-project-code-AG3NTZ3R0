class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

// Upper bound value for each dimension
const maxValue = {
    // Sample values
    cashIncome: 150000,
    totalTax: 50000,
    totalSubsidies: 20000,
    workExpenses: 50000,
    childExpenses: 50000,
    medicalExpenses: 50000,
}

// Points
const originPoint = new Point(830,353.93);
const cashIncomeEndPoint = new Point(770, 250);
const totalTaxEndPoint = new Point(710, 353.93);
const totalSubsidiesEndPoint = new Point(890, 250);
const workExpensesEndPoint = new Point(770, 455.86);
const childExpensesEndPoint = new Point(890, 455.86);
const medicalExpensesEndPoint = new Point(950, 353.93);

// Generate vertex in the given dimension
function generateVertex(dimension, value) {
    let x = originPoint.x;
    let y = originPoint.y;
    switch (dimension) {
        case "Cash Income":
            x = originPoint.x - value / maxValue.cashIncome * Math.abs(cashIncomeEndPoint.x - originPoint.x);
            y = originPoint.y - value / maxValue.cashIncome * Math.abs(cashIncomeEndPoint.y - originPoint.y);
            break;
        case "Total Tax":
            x = originPoint.x - value / maxValue.totalTax * Math.abs(totalTaxEndPoint.x - originPoint.x);
            y = totalTaxEndPoint.y;
            break;
        case "Total Subsidies":
            x = originPoint.x + value / maxValue.totalSubsidies * Math.abs(totalSubsidiesEndPoint.x - originPoint.x);
            y = originPoint.y - value / maxValue.totalSubsidies * Math.abs(totalSubsidiesEndPoint.y - originPoint.y);
            break;
        case "Work Expenses":
            x = originPoint.x - value / maxValue.workExpenses * Math.abs(workExpensesEndPoint.x - originPoint.x);
            y = originPoint.y + value / maxValue.workExpenses * Math.abs(workExpensesEndPoint.y - originPoint.y);
            break;
        case "Child Expenses":
            x = originPoint.x + value / maxValue.childExpenses * Math.abs(childExpensesEndPoint.x - originPoint.x);
            y = originPoint.y + value / maxValue.childExpenses * Math.abs(childExpensesEndPoint.y - originPoint.y);
            break;
        case "Medical Expenses":
            x = originPoint.x + value / maxValue.medicalExpenses * Math.abs(medicalExpensesEndPoint.x - originPoint.x);
            y = medicalExpensesEndPoint.y;
            break;
        default:
    }
    return new Point(x,y);
}

function generateHexagon(cashIncome, totalTax, totalSubsidies, workExpenses, childExpenses, medicalExpenses) {
    p1 = generateVertex("Cash Income", cashIncome);
    p2 = generateVertex("Total Subsidies", totalSubsidies);
    p3 = generateVertex("Medical Expenses", medicalExpenses);
    p4 = generateVertex("Child Expenses", childExpenses);
    p5 = generateVertex("Work Expenses", workExpenses);
    p6 = generateVertex("Total Tax", totalTax);


    d3.select("#hexagon").append("polygon")
    .attr("points", `${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}, ${p5.x} ${p5.y}, ${p6.x} ${p6.y}, ${p1.x} ${p1.y}`)
    .attr("transform", "rotate(30,830,353.93)")
    .attr("fill", "green").attr("opacity", 0.6)
}

// Sample Chart
generateHexagon(120000, 30000, 5000, 20000, 40000, 10000);
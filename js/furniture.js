export class Furniture {
    constructor(svgId) {
        this.svg = d3.select(svgId);
    }

    sampleFurniture() {
        // Create sample furniture
        // Bed
        this.createBed(70,30,80,100,"green");
        this.createBed(60,330,70,100,"green",180);
        this.createBed(200,350,50,80,"green",180);
        // Bathtub
        this.createBathtub(320,30,50,30,"orange");
        this.createBathtub(230,110,50,30,"orange");
        // Dining table
        this.createDiningTable(520,340,100,60,"red");
        // Couch
        this.createCouch(350,140,50,43,"red",300);
        this.createCouch(390,250,100,43,"orange",175);
        this.createCouch(390,445,30,25,"red");
        // Other furniture
        this.createRect(400,180,80,50,"orange");
        this.createRect(610,175,40,100,"orange");
        this.createRect(620,30,30,40,"red");
        this.createCircle(440,470,13,"red");
    }

    createBed(x, y, w, h, color, rotation) {
        let g = this.svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        // bedsheet
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
        // pillow (size:30*15)
        g.append("rect").attr("x", x + w / 2 - 15).attr("y", y + 6).attr("rx", 3).attr("ry", 3).attr("width", 30).attr("height", 15).style("opacity", 0.5)
        // quilt
        g.append("rect").attr("x", x).attr("y", y + 25).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h - 25).style("opacity", 0.4)
    }

    createBathtub(x, y, w, h, color) {
        let g = this.svg.append("g").attr("fill", `${color}`)
        g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.5)
        g.append("rect").attr("x", x + w / 12).attr("y", y + h / 8).attr("rx", 4).attr("ry", 4).attr("width", w - w / 6).attr("height", h - h / 4).style("opacity", 0.5)
    }

    createDiningTable(x, y, w, h, color, rotation) {
        let g = this.svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        // table
        g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.7)
        // chairs (size:20*15)
        g.append("rect").attr("x", x + (w - 40) / 3).attr("y", y - 15).attr("width", 20).attr("height", 15).style("opacity", 0.6)
        g.append("rect").attr("x", x + 2 * (w - 40) / 3 + 20).attr("y", y - 15).attr("width", 20).attr("height", 15).style("opacity", 0.6)
        g.append("rect").attr("x", x + (w - 40) / 3).attr("y", y + h).attr("width", 20).attr("height", 15).style("opacity", 0.6)
        g.append("rect").attr("x", x + 2 * (w - 40) / 3 + 20).attr("y", y + h).attr("width", 20).attr("height", 15).style("opacity", 0.6)
    }

    createCouch(x, y, w, h, color, rotation) {
        let g = this.svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", w).attr("height", 0.4 * h).style("opacity", 0.5)
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3 * w).attr("height", h).style("opacity", 0.5)
        g.append("rect").attr("x", x + 0.7 * w).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3 * w).attr("height", h).style("opacity", 0.5)
    }

    createRect(x, y, w, h, color, rotation) {
        this.svg.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
            .style("fill", `${color}`).style("opacity", 0.6)
    }

    createCircle(x, y, r, color) {
        this.svg.append("circle").attr("cx", x).attr("cy", y).attr("r", r).style("fill", `${color}`).style("opacity", 0.6)
    }
}
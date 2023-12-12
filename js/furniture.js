export class Furniture {
    constructor(svgId, data) {
        this.svg = d3.select(svgId);
        this.data = data;
    }

    sampleFurniture() {
        // Create sample furniture
        // Bed
        // this.createBed(70,30,80,100,"red");
        // this.createBed(60,330,70,100,"green",180);
        // this.createBed(200,350,50,80,"green",180);
        this.createBed(70,30,80,"green");
        this.createBed(60,330,70,"green",180);
        this.createBed(200,350,50,"green",180);
        // Bathtub
        // this.createBathtub(320,30,50,30,"orange");
        // this.createBathtub(230,110,50,30,"orange");
        this.createBathtub(320,30,50,"orange");
        this.createBathtub(230,110,50,"orange");
        // Dining table
        // this.createDiningTable(520,340,100,60,"red");
        this.createDiningTable(520,340,100,"red");
        // Couch
        // this.createCouch(350,140,50,43,"red",300);
        // this.createCouch(390,250,100,43,"orange",175);
        // this.createCouch(390,445,30,25,"red");
        this.createCouch(350,140,50,"red",300);
        this.createCouch(390,250,100,"orange",175);
        this.createCouch(390,445,30,"red");
        // Other furniture
        this.createRect(400,180,80,50,"orange");
        this.createRect(610,175,40,100,"orange");
        this.createRect(620,30,30,40,"red");
        this.createCircle(440,470,13,"red");
    }

    /**
     * Possible parameters for creating a furniture:
     * @param {*} x   x coordinate
     * @param {*} y   y coordinate
     * @param {*} w   furniture's width
     * @param {*} color   furniture's color
     * @param {*} rotation   furniture's rotation angle
     */

    createBed(x, y, w, color, rotation) {
        let h = 1.25 * w;
        let g = this.svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        // bedsheet
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
        // pillow
        g.append("rect").attr("x", x + w / 2 - 0.2 * w).attr("y", y + 6).attr("rx", 3).attr("ry", 3).attr("width", 0.4 * w).attr("height", 0.2 * w).style("opacity", 0.5)
        // quilt
        g.append("rect").attr("x", x).attr("y", y + 0.3 * w).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h - 0.3 * w).style("opacity", 0.4)
    }

    createBathtub(x, y, w, color) {
        let h = 0.6 * w;
        let g = this.svg.append("g").attr("fill", `${color}`)
        g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.5)
        g.append("rect").attr("x", x + w / 12).attr("y", y + h / 8).attr("rx", 4).attr("ry", 4).attr("width", w - w / 6).attr("height", h - h / 4).style("opacity", 0.5)
    }

    createDiningTable(x, y, w, color, rotation) {
        let h = 0.6 * w;
        let g = this.svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        // table
        g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.7)
        // chairs
        let w_chair = 0.2 * w, h_chair = 0.15 * w;
        g.append("rect").attr("x", x + (w - 2*w_chair) / 3).attr("y", y - h_chair).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
        g.append("rect").attr("x", x + 2 * (w - 2*w_chair) / 3 + w_chair).attr("y", y - h_chair).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
        g.append("rect").attr("x", x + (w - 2*w_chair) / 3).attr("y", y + h).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
        g.append("rect").attr("x", x + 2 * (w - 2*w_chair) / 3 + w_chair).attr("y", y + h).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
    }

    createCouch(x, y, w, color, rotation) {
        let h = 43;
        if (w < 50) {h = 0.85 * w;}
        if (w > 100) {h = 0.43 * w;}
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
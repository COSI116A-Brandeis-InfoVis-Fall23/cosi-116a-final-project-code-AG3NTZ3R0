export class Furniture {
    constructor(svgId, data) {
        this.svg = d3.select(svgId);
        this.data = data;
        this.fg = this.svg.append("g").attr("id", "furniture");
    }

    build() {
        // Create sample furniture
        // Bed
        this.createBed('f-resources', 70, 30, "green", 180);
        this.createBed('f-totval', 60, 350, "green", 180);
        this.createBed('f-fedtax', 200, 350, "red", 180);
        // Bathtub
        this.createBathtub('f-snapsub', 320, 30, "orange");
        this.createBathtub('f-schlunch', 230, 110, "orange");
        // Dining table
        this.createDiningTable('f-fica', 520, 340, "red");
        // Couch
        this.createCouch('f-medxpns', 350, 225, "red", 300);
        this.createCouch('f-wicval', 390, 340, "orange", 175);
        this.createCouch('f-sttax',390,445,"red");
        // Other furniture
        this.createRect('f-caphousesub', 400, 275, "orange");
        this.createRect('f-engval', 610, 175, "orange");
        this.createRect('f-capwkccxpns', 620, 30, "red");
    }

    createBed(id, x, y, color, rotation) {
        let w = 50;
        let h = 1.25 * w;
        let g = this.fg.append("g").attr("id", id).attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        // bedsheet
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
        // pillow
        g.append("rect").attr("x", x + w / 2 - 0.2 * w).attr("y", y + 6).attr("rx", 3).attr("ry", 3).attr("width", 0.4 * w).attr("height", 0.2 * w).style("opacity", 0.5)
        // quilt
        g.append("rect").attr("x", x).attr("y", y + 0.3 * w).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h - 0.3 * w).style("opacity", 0.4)
    }

    createBathtub(id, x, y, color) {
        let w = 50;
        let h = 0.6 * w;
        let g = this.fg.append("g").attr("id", id).attr("fill", `${color}`)
        g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.5)
        g.append("rect").attr("x", x + w / 12).attr("y", y + h / 8).attr("rx", 4).attr("ry", 4).attr("width", w - w / 6).attr("height", h - h / 4).style("opacity", 0.5)
    }

    createDiningTable(id, x, y, color, rotation) {
        let w = 100;
        let h = 0.6 * w;
        let g = this.fg.append("g").attr("id", id).attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        // table
        g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.7)
        // chairs
        let w_chair = 0.2 * w, h_chair = 0.15 * w;
        g.append("rect").attr("x", x + (w - 2*w_chair) / 3).attr("y", y - h_chair).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
        g.append("rect").attr("x", x + 2 * (w - 2*w_chair) / 3 + w_chair).attr("y", y - h_chair).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
        g.append("rect").attr("x", x + (w - 2*w_chair) / 3).attr("y", y + h).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
        g.append("rect").attr("x", x + 2 * (w - 2*w_chair) / 3 + w_chair).attr("y", y + h).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
    }

    createCouch(id, x, y, color, rotation) {
        let w = 30;
        let h = 43;
        if (w < 50) {h = 0.85 * w;}
        if (w > 100) {h = 0.43 * w;}
        let g = this.fg.append("g").attr("id", id).attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", w).attr("height", 0.4 * h).style("opacity", 0.5)
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3 * w).attr("height", h).style("opacity", 0.5)
        g.append("rect").attr("x", x + 0.7 * w).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3 * w).attr("height", h).style("opacity", 0.5)
    }

    createRect(id, x, y, color, rotation = 0) {
        let w = 30;
        let h = 1.25 * w;
        let rotationPoint = `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`;
        this.fg
            .append('g')
            .attr('id', id)
            .append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", w)
            .attr("height", h)
            .attr("transform", rotationPoint)
            .style("fill", color)
            .style("opacity", 0.6);
    }
}
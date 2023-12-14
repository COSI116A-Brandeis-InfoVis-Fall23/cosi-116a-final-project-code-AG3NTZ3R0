export class Furniture {
    constructor(svgId, statistics) {
        this.statistics = statistics;
        this.svg = d3.select(svgId);

        this.fg = this.svg.append("g").attr("id", "furniture");
    }

    build() {
        // Bed
        this.createBed('f-resources', 'SPM Resources (AVG)', 70, 30, "green", 180);
        this.createBed('f-totval', 'SPM Totval (AVG)', 60, 350, "green", 180);
        this.createBed('f-fedtax', 'SPM FedTax (AVG)', 200, 350, "red", 180);
        // Bathtub
        this.createBathtub('f-snapsub', 'SPM SnapSub (AVG)', 300, 30, "orange");
        this.createBathtub('f-schlunch', 'SPM SchLunch (AVG)', 230, 110, "orange");
        // Dining table
        this.createDiningTable('f-fica', 'Spm Fica (AVG)', 520, 340, "red");
        // Couch
        this.createCouch('f-medxpns', 'SPM MedXpns (AVG)', 350, 225, "red", 300);
        this.createCouch('f-wicval', 'SPM WICval (AVG)', 390, 340, "orange", 175);
        this.createCouch('f-sttax','SPM StTax (AVG)', 390,445,"red");
        // Other furniture
        this.createRect('f-caphousesub', 'SPM CapHouseSub (AVG)', 400, 275, "orange");
        this.createRect('f-engval', 'SPM EngVal (AVG)', 610, 175, "orange");
        this.createRect('f-capwkccxpns', 'SPM CapWkCCXpns (AVG)', 620, 30, "red");
    }

    calculateNormalizedAvg(metric) {
        return (this.statistics[metric]['avg'] - this.statistics[metric]['min']) /
            (this.statistics[metric]['max'] - this.statistics[metric]['min']);
    }

    scaleDimensions(w, h, metric) {
        let norm_avg = this.calculateNormalizedAvg(metric);
        let scaled_w = w * norm_avg;
        let scaled_h = h * norm_avg;

        return [scaled_w, scaled_h];
    }


    createBed(id, metric, x, y, color, rotation) {
        let w = 100;
        let h = 1.25 * w;

        [w, h] = this.scaleDimensions(w, h, metric)
        let g = this.fg.append("g").attr("id", id).attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        // Tool Tip
        g.append("title").text(metric)
        // bedsheet
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
        // pillow
        g.append("rect").attr("x", x + w / 2 - 0.2 * w).attr("y", y + 6).attr("rx", 3).attr("ry", 3).attr("width", 0.4 * w).attr("height", 0.2 * w).style("opacity", 0.5)
        // quilt
        g.append("rect").attr("x", x).attr("y", y + 0.3 * w).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h - 0.3 * w).style("opacity", 0.4)

    }

    createBathtub(id, metric, x, y, color) {
        let w = 100;
        let h = 0.6 * w;

        [w, h] = this.scaleDimensions(w, h, metric)
        let g = this.fg.append("g").attr("id", id).attr("fill", `${color}`)
        // Tool Tip
        g.append("title").text(metric)
        g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.5)
        g.append("rect").attr("x", x + w / 12).attr("y", y + h / 8).attr("rx", 4).attr("ry", 4).attr("width", w - w / 6).attr("height", h - h / 4).style("opacity", 0.5)
    }

    createDiningTable(id, metric, x, y, color, rotation) {
        let w = 100;
        let h = 0.6 * w;

        [w, h] = this.scaleDimensions(w, h, metric)
        let g = this.fg.append("g").attr("id", id).attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        // Tool Tip
        g.append("title").text(metric)
        // table
        g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.7)
        // chairs
        let w_chair = 0.2 * w, h_chair = 0.15 * w;
        g.append("rect").attr("x", x + (w - 2*w_chair) / 3).attr("y", y - h_chair).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
        g.append("rect").attr("x", x + 2 * (w - 2*w_chair) / 3 + w_chair).attr("y", y - h_chair).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
        g.append("rect").attr("x", x + (w - 2*w_chair) / 3).attr("y", y + h).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
        g.append("rect").attr("x", x + 2 * (w - 2*w_chair) / 3 + w_chair).attr("y", y + h).attr("width", w_chair).attr("height", h_chair).style("opacity", 0.6)
    }

    createCouch(id, metric, x, y, color, rotation) {
        let w = 30;
        let h = 43;
        if (w < 50) {h = 0.85 * w;}
        if (w > 100) {h = 0.43 * w;}

        [w, h] = this.scaleDimensions(w, h, metric)
        let g = this.fg.append("g").attr("id", id).attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`)
        // Tool Tip
        g.append("title").text(metric)
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", w).attr("height", 0.4 * h).style("opacity", 0.5)
        g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3 * w).attr("height", h).style("opacity", 0.5)
        g.append("rect").attr("x", x + 0.7 * w).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3 * w).attr("height", h).style("opacity", 0.5)
    }

    createRect(id, metric, x, y, color, rotation = 0) {
        let w = 30;
        let h = 1.25 * w;

        [w, h] = this.scaleDimensions(w, h, metric)
        let rotationPoint = `rotate(${rotation}, ${x + w / 2}, ${y + h / 2})`;
        let g = this.fg
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
        // Tool Tip
        g.append("title").text(metric)
    }
}
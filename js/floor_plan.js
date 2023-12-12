import { SVGChart } from './svg_chart.js';

export class FloorPlan extends SVGChart {
    constructor(parentSelector, id, viewBox, preserveAspectRatio, racialCategory) {
        super(parentSelector, id, viewBox, preserveAspectRatio);

        this.g = this.addGroup(`${racialCategory}-floor-plan`, 'white', 'black', '2.5');

        this.build();
    }

    build() {
        // Main House Rectangle
        this.addRect(this.g, `${name}-house`, 50, 30, 600, 400);

        // Bedrooms
        for (let i = 0; i < 3; i++) {
            this.addRect(this.g, `${name}-bedroom${i + 1}`, 50 + 130 * i, 30 + 240 * (i % 2), 180 - 40 * (i % 2), 160);
        }

        // Closets and Bathrooms
        this.addRect(this.g, `${name}-closet1`, 230, 30, 50, 80);
        this.addRect(this.g, `${name}-bathroom1`, 280, 30, 90, 80);
        this.addRect(this.g, `${name}-bathroom2`, 230, 110, 90, 80);
        this.addRect(this.g, `${name}closet2`, 50, 230, 60, 40);

        // Kitchen
        this.addRect(this.g, `${name}-kitchen`, 550, 150, 100, 150);

        // Balcony
        this.addRect(this.g, `${name}-balcony`, 350, 430, 140, 60);

        // Washer/Dryer and Closet
        this.addRect(this.g, `${name}-w/d`, 550, 30, 60, 30);
        this.addRect(this.g, `${name}-closet`, 610, 30, 40, 90);

        this.addText(this.g, 900, 50, name, '20px', 'black');

        this.hexagon();

        // Add back button
        this.addText(this.g, 900, 100, 'Back', '20px', 'black')
            .attr('id', `${name}-back-button`)
            .style('cursor', 'pointer');
    }

    hexagon() {
        // Hexagon Visualization
        let hexagonDimension = this.addGroup(`${name}-hexagon-dimension`, 'none', 'black', '1').attr('font-size', '11px');
        let hexagon = this.addGroup(`${name}-hexagon`, 'white', 'black', '1.5').attr('transform', 'rotate(30,830,353.93)');

        // Hexagon Layers
        const hexagonLayers = [
            "770 250, 890 250, 950 353.93, 890 455.86, 770 455.86, 710 353.93",
            "780 267.32, 880 267.32, 930 353.93, 880 438.54, 780 438.54, 730 353.93",
            "790 284.64, 870 284.64, 910 353.93, 870 421.22, 790 421.22, 750 353.93",
            "800 301.96, 860 301.96, 890 353.93, 860 403.9, 800 403.9, 770 353.93",
            "810 319.28, 850 319.28, 870 353.93, 850 386.58, 810 386.58, 790 353.93"
        ];

        hexagonLayers.forEach((points, i) => {
            this.addPolygon(hexagon, `${name}-hexagon${i + 1}`, points);
        });

        // Center Circle
        this.addCircle(hexagon, `${name}-center-circle`, 830, 353.93, 1);

        // Text Labels
        const labels = [
            {x: 800, y: 225, text: "Cash Income"},
            {x: 675, y: 285, text: "Total Tax"},
            {x: 940, y: 280, text: "Total Subsidies"},
            {x: 675, y: 410, text: "Work Expenses"},
            {x: 675, y: 425, text: "Other Expenses"},
            {x: 800, y: 490, text: "Child Expenses"},
            {x: 940, y: 410, text: "Medical Expenses"}
        ];

        labels.forEach(label => {
            this.addText(hexagonDimension, label.x, label.y, label.text);
        });
    }
}
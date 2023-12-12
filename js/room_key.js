export class RoomKey {
    constructor(svgId) {
        this.svg = d3.select(svgId);
    }

    addRoomKey() {
        const keyBackground = this.svg.append("rect")
            .attr("x", 685)  // Adjust as needed
            .attr("y", 20)  // Adjust as needed
            .attr("width", 320 / 1.8)   // Adjust width as needed
            .attr("height", 130 / 1.5)  // Adjust height as needed
            .style("fill", "rgb(255, 255, 180)")
            .style("stroke", "black")  // Border color
            .style("stroke-width", 2);  // Border width
        // Color code squares
        const colors = [
            { color: "lightgreen", label: "Income", x: 695, y: 30},
            { color: "orange", label: "Subsidies", x: 695, y: 55},
            { color: "red", label: "Expenses", x: 695, y: 80 }
        ];

        colors.forEach(d => {
            this.svg.append("rect")
                .attr("x", d.x)
                .attr("y", d.y)
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", d.color);

            this.svg.append("text")
                .attr("x", d.x + 15)
                .attr("y", d.y + 7.5)
                .style("font-size", 12)
                .text(d.label);
        });

        // Size representation squares
        const sizes = [
            { size: 9.5, label: "$1,000", x: 770, y: 30 },
            { size: 12, label: "$10,000", x: 770, y: 55},
            { size: 14, label: "$1,000,000", x: 770, y: 80}
        ];

        sizes.forEach(d => {
            this.svg.append("rect")
                .attr("x", d.x)
                .attr("y", d.y)
                .attr("width", d.size)
                .attr("height", d.size)
                .style("fill", "grey");

            this.svg.append("text")
                .attr("x", d.x + d.size + 10)
                .attr("y", d.y + d.size / 2 + 5)
                .style("font-size", 12)
                .text(d.label);
        });
    }
}
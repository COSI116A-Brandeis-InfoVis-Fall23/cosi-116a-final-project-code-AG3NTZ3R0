function createInfoKey(svg) {
    // Color code squares
    const colors = [
        { color: "lightgreen", label: "Income", x: 50, y: 20 },
        { color: "orange", label: "Subsidies", x: 50, y: 60 },
        { color: "red", label: "Expenses", x: 50, y: 100 }
    ];

    colors.forEach(function(d) {
        svg.append("rect")
            .attr("x", d.x)
            .attr("y", d.y)
            .attr("width", 20)
            .attr("height", 20)
            .style("fill", d.color);

        svg.append("text")
            .attr("x", d.x + 30)
            .attr("y", d.y + 15)
            .text(d.label);
    });

    // Size representation squares
    const sizes = [
        { size: 20, label: "$1,000", x: 200, y: 20 },
        { size: 30, label: "$10,000", x: 200, y: 50 },
        { size: 40, label: "$1,000,000", x: 200, y: 90 }
    ];

    sizes.forEach(function(d) {
        svg.append("rect")
            .attr("x", d.x)
            .attr("y", d.y)
            .attr("width", d.size)
            .attr("height", d.size)
            .style("fill", "grey");

        svg.append("text")
            .attr("x", d.x + d.size + 10)
            .attr("y", d.y + d.size / 2 + 5)
            .text(d.label);
    });
}

// Assuming 'svg' is your main SVG element
createInfoKey(svg);

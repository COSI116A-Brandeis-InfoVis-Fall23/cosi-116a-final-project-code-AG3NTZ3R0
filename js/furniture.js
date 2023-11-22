var svg = d3.select("#vis-svg-2");

function createBed(x,y,w,h,color,rotation) {
    let g = svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x+w/2}, ${y+h/2})`)
    // bedsheet
    g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
    // pillow (size:30*15)
    g.append("rect").attr("x", x+w/2-15).attr("y", y+6).attr("rx", 3).attr("ry", 3).attr("width", 30).attr("height", 15).style("opacity", 0.5)
    // quilt
    g.append("rect").attr("x", x).attr("y", y+25).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h-25).style("opacity", 0.4)
}

function createBathtub(x,y,w,h,color) {
    let g = svg.append("g").attr("fill", `${color}`)
    g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.5)
    g.append("rect").attr("x", x+w/12).attr("y", y+h/8).attr("rx", 4).attr("ry", 4).attr("width", w-w/6).attr("height", h-h/4).style("opacity", 0.5)
}

function createDiningTable(x,y,w,h,color,rotation) {
    let g = svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x+w/2}, ${y+h/2})`)
    // table
    g.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).style("opacity", 0.7)
    // chairs (size:20*15)
    g.append("rect").attr("x", x+(w-40)/3).attr("y", y-15).attr("width", 20).attr("height", 15).style("opacity", 0.6)
    g.append("rect").attr("x", x+2*(w-40)/3+20).attr("y", y-15).attr("width", 20).attr("height", 15).style("opacity", 0.6)
    g.append("rect").attr("x", x+(w-40)/3).attr("y", y+h).attr("width", 20).attr("height", 15).style("opacity", 0.6)
    g.append("rect").attr("x", x+2*(w-40)/3+20).attr("y", y+h).attr("width", 20).attr("height", 15).style("opacity", 0.6)
}

function createCouch(x,y,w,h,color,rotation) {
    let g = svg.append("g").attr("fill", `${color}`).attr("transform", `rotate(${rotation}, ${x+w/2}, ${y+h/2})`)
    g.append("rect").attr("x", x).attr("y", y).attr("rx", 5).attr("ry", 5).attr("width", w).attr("height", h).style("opacity", 0.4)
    g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", w).attr("height", 0.4*h).style("opacity", 0.5)
    g.append("rect").attr("x", x).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3*w).attr("height", h).style("opacity", 0.5)
    g.append("rect").attr("x", x+0.7*w).attr("y", y).attr("rx", 3).attr("ry", 3).attr("width", 0.3*w).attr("height", h).style("opacity", 0.5)
}

function createRect(x,y,w,h,color,rotation) {
    svg.append("rect").attr("x", x).attr("y", y).attr("width", w).attr("height", h).attr("transform", `rotate(${rotation}, ${x+w/2}, ${y+h/2})`)
    .style("fill", `${color}`).style("opacity", 0.6)
}

function createCircle(x,y,r,color) {
    svg.append("circle").attr("cx", x).attr("cy", y).attr("r", r).style("fill", `${color}`).style("opacity", 0.6)
}

// Create sample furniture
// Bed
createBed(70,30,80,100,"green");
createBed(60,330,70,100,"green",180);
createBed(200,350,50,80,"green",180);
// Bathtub
createBathtub(320,30,50,30,"orange");
createBathtub(230,110,50,30,"orange");
// Dining table
createDiningTable(520,340,100,60,"red");
// Couch
createCouch(350,140,50,43,"red",300);
createCouch(390,250,100,43,"orange",175);
createCouch(390,445,30,25,"red");
// Other furniture
createRect(400,180,80,50,"orange");
createRect(610,175,40,100,"orange");
createRect(620,30,30,40,"red");
createCircle(440,470,13,"red");
;(function () {
    const margin = { top: 10, right: 30, bottom: 40, left: 30 }

    const width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    const xPositionScale = d3.scaleTime().range([0, width]);//.style("fill", "#d8d6d6")
    const yPositionScale = d3.scaleLinear().range([height, 0]);
    const parseDate = d3.timeParse("%Y")

    const svg = d3
    .select("#chart3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 20)
       .attr("y", 20)
       .attr("font-size", "16px")
       .text("Last 20 years GDP growth rate")
       .style('fill', '#d8d6d6')



    // line = svg.append('line')
    //    .style("stroke", "#f0f0f0")
    //    .style("stroke-width", 3)
    //    .style("stroke-dasharray", 5)
    //    .attr("x1", xPositionScale(parseDate(2002)))
    //    .attr("y1", yPositionScale(0))
    //    .attr("x2", xPositionScale(parseDate(2021)))
    //    .attr("y2", yPositionScale(100))
    //    .attr('class', 'label hidden')
        //  console.log(line)

    var x = d3.scaleBand().range([0, width]).padding(0.4),
        y = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
			// Mitch note: needed to change the translate values here to match the margins of the chart instead of using 100
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        

    d3.csv("all_csvs/NigeriaGDP.csv")
    .then(function (data){

        x.domain(data.map(function(d) { return +d.year; }));
        y.domain([d3.min(data,function(d){return +d.pctchangeGDP}), d3.max(data, function(d) { return +d.pctchangeGDP; })]);

        g.append("g")
        // Mitch note: added a class for easier selection later
        .attr("class", "x-axis")
        // Mitch note: changed the y translate property from height to y(0) to line it up with zero on the scale
        .attr("transform", "translate(0," + y(-2) + ")")
        .call(d3.axisBottom(x))


        // Mitch note: this bit of code flips the axis labels for the negative values
        // g.select(".x-axis")
        // 	.selectAll("text")
        // 	.attr("y", (_, i) => (+data[i].pctchangeGDP >= 0 ? 10 : -18))
        // g.select(".x-axis")
        // 	.selectAll("line")
        // 	.attr("y2", (_, i) => (+data[i].pctchangeGDP >= 0 ? 6 : -6));

        g.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){return d+ "%"}))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "white")



        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .on("mouseover", onMouseOver) //Add listener for the mouseover event
        .on("mouseout", onMouseOut)   //Add listener for the mouseout event
        .attr("x", function(d) { return x(+d.year); })
        .attr("y", function(d) { return y(Math.max(0, +d.pctchangeGDP)); })
        .attr("width", x.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(400)
        .delay(function (d, i) {
            return i * 50;
        })
        .attr("height", function(d) { return Math.abs(y(0) - y(+d.pctchangeGDP)); });
    
    
        //mouseover event handler function
        function onMouseOver(d, i) {
            d3.select(this).attr('class', 'highlight');
            d3.select(this)
            .transition()     // adds animation
            .duration(400)
            .attr('width', x.bandwidth() + 5)
            .attr("y", function(d) { return y(+d.pctchangeGDP) - 10; })
            .attr("height", function(d) { return Math.abs(y(0) - y(+d.pctchangeGDP)) + 10; });

            g.append("text")
            .attr('class', 'val') 
            .attr('x', function() {
                return x(+d.year);
            })
            .attrTween('y', function() {
                return y(+d.pctchangeGDP) - 15;
            })
            .text(function() {
                return [+d.pctchangeGDP];  // Value of the text
            });
        }

        //mouseout event handler function
        function onMouseOut(d, i) {
            // use the text label class to remove label on mouseout
            d3.select(this).attr('class', 'bar');
            d3.select(this)
            .transition()     // adds animation
            .duration(400)
            .attr('width', x.bandwidth())
            .attr("y", function(d) { return y(+d.pctchangeGDP); })
            .attr("height", function(d) { return Math.abs(y(0) - y(+d.pctchangeGDP)); });

            // d3.selectAll('.val')
            // .remove()
    
        }
    })
})()

;(function () {
    const margin = { top: 10, right: 70, bottom: 50, left: 50 }

    const width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    let povLines; // create a variable in the outermost scope where we can store the lines we draw
    let label;

    const svg = d3
        .select("#chart2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const colorScale = d3.scaleOrdinal().range(d3.schemePaired)
    const xPositionScale = d3.scaleTime().range([0, width])//.style("fill", "#d8d6d6")
    const yPositionScale = d3.scaleLinear().range([height, 0])//.style("fill", "#d8d6d6")
    const parseDate = d3.timeParse("%Y")
    var formatPercent = d3.format(".0%");
    const paddingForText = { left: 5, right: 5 }

    const line = d3
        .line()
        // .interpolate("basis")  
        .x(d => xPositionScale(d.Year))
        .y(d => yPositionScale(d.pct))

    d3.csv("all_csvs/topGDP.csv")
        .then(ready)
        .catch(function (error) {
            console.log("Failed with", error)
        })


    function ready(datapoints) {
        datapoints.forEach(function (d) {
            d.Year = parseDate(d.Year)
            d["pct"] = +d["pct"]
        })

        // Update the scales
        const extentPov = d3.max(datapoints, d => d["pct"])
        yPositionScale.domain([0, extentPov]).nice()
        xPositionScale.domain(d3.extent(datapoints, d => d.Year))


        const grouped = d3.groups(datapoints, d => d["country"])

        povLines = svg.selectAll("path") // I'm assigning my lines to the variable we created up top
            .data(grouped)
            .enter()
            .append("path")
            .attr('id', (d,i)=> 'line-'+ i)
            .attr("stroke", d => colorScale(d[0]))
            .attr("fill", "none")
            .attr("d", d => line(d[1]))
            .style('stroke-dasharray', 1000) // hiding the lines sneakily
            .style('stroke-dashoffset', 1000);

        const yAxis = d3.axisLeft(yPositionScale).tickFormat(formatPercent); //or .tickFormat(function(d){return d+ "%"});
        svg.append("g")
            .attr("class", "axis y-axis")
            .attr("class", "axisWhite")
            .call(yAxis)
            // .style("fill", "#d8d6d6")

        const xAxis = d3.axisBottom(xPositionScale)
        svg.append("g")
            .attr("class", "axis x-axis")
            .attr("class", "axisWhite")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            // .style("fill", "#d8d6d6")
            

        label1 = svg.append('text') // assigning my label to the variable up top
            .text("Nigeria")
            .attr('x', xPositionScale(parseDate(2019)))
            .attr('y', yPositionScale(0.3919825))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');
            console.log(label)
        label2 = svg.append('text') // assigning my label to the variable up top
            .text("Algeria")
            .attr('x', xPositionScale(parseDate(1982)))
            .attr('y', yPositionScale(0.02743073))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');

        label3 = svg.append('text') // assigning my label to the variable up top
            .text("Angola")
            .attr('x', xPositionScale(parseDate(2019)))
            .attr('y', yPositionScale(0.5139554))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');

        label4 = svg.append('text') // assigning my label to the variable up top
            .text("Egypt")
            .attr('x', xPositionScale(parseDate(2019)))
            .attr('y', yPositionScale(0.04069901))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');
        label5 = svg.append('text') // assigning my label to the variable up top
            .text("Ethiopia")
            .attr('x', xPositionScale(parseDate(2016)))
            .attr('y', yPositionScale(0.26))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');
        label6 = svg.append('text') // assigning my label to the variable up top
            .text("Ghana")
            .attr('x', xPositionScale(parseDate(2019)))
            .attr('y', yPositionScale(0.1070145))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');
        label7 = svg.append('text') // assigning my label to the variable up top
            .text("Kenya")
            .attr('x', xPositionScale(parseDate(2019)))
            .attr('y', yPositionScale(0.3125394))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');
        label8 = svg.append('text') // assigning my label to the variable up top
            .text("Morocco")
            .attr('x', xPositionScale(parseDate(2019)))
            .attr('y', yPositionScale(0.006033214))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');
        label9 = svg.append('text') // assigning my label to the variable up top
            .text("S'Africa")
            .attr('x', xPositionScale(parseDate(2019)))
            .attr('y', yPositionScale(0.1967182))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');
        label10 = svg.append('text') // assigning my label to the variable up top
            .text("Tanzania")
            .attr('x', xPositionScale(parseDate(2019)))
            .attr('y', yPositionScale(0.4771645))
            .style('fill', '#d8d6d6')
            .attr('class', 'label hidden');

    }

    // do stuff to the chart here
    // depending on what step you are at
    const updateChart = (step_index, direction)=>{

        console.log('we are at step', step_index);

        if(step_index === 0){
            //animating my lines into view
            if(direction==='forward'){
                povLines.transition()
                .duration(1500)
                .style('stroke-dashoffset', 0);

            } else{
                povLines
                .style('opacity', 1).style('stroke-width', 1)
                .transition()
                .duration(2000)
                .style('stroke-dashoffset', 1000);
            }
            
        }

        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1)
                label1.classed('hidden', false);
            } else{
                povLines.style('opacity', 0.2);
                d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);

            }
        }

        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                // d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                // d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
            }
        }

        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                // d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                // d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
                label2.classed('hidden', false);

            }
        }
        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
                label3.classed('hidden', true);
            }
        }
        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
                label4.classed('hidden', true);

            }
        }
        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
                label5.classed('hidden', true);


            }
        }
        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
                label6.classed('hidden', true);
            }
        }
        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
                label7.classed('hidden', true);

            }
        }
        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
                label8.classed('hidden', true);
            }
        }
        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
                label9.classed('hidden', true);
            }
        }
        if(step_index === 1){
            if(direction==='forward'){
                povLines.style('opacity', 0.2).style('stroke-dashoffset', 0);
                d3.select('#line-7').raise().style('stroke-width', '2.5px').style('opacity', 1);
            } else{
                povLines.style('opacity', 0.2);
                d3.select('#line-7').raise().style('stroke-width', '2px').style('opacity', 1);
                label10.classed('hidden', true);
            }
        }


        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label1.classed('hidden', false);
            } else{
                
            }
        }

        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label2.classed('hidden', false);
            } else{
                
            }
        }
        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label3.classed('hidden', false);
            } else{
                
            }
        }
        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label4.classed('hidden', false);
            } else{
                
            }
        }
        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label5.classed('hidden', false);
            } else{
                
            }
        }
        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label6.classed('hidden', false);
            } else{
                
            }
        }
        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label7.classed('hidden', false);
            } else{
                
            }
        }
        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label8.classed('hidden', false);
            } else{
                
            }
        }
        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label9.classed('hidden', false);
            } else{
                
            }
        }
        if(step_index === 2){
            if(direction==='forward'){
                povLines.style('opacity', 1).style('stroke-width', 1);
                label10.classed('hidden', false);
            } else{
                
            }
        }

    };

    //select the steps
    // let steps = d3.selectAll('.step');
    let steps = d3.selectAll('.step');
    // add a listener to the steps that knows when it enters into view
    // using enter-view.js (https://github.com/russellgoldenberg/enter-view)
    // call the update function when we switch to a new step!

    enterView({
        selector: steps.nodes(), // which elements to pay attention to
        offset: 0.2, // the offset says when on the page should the trigger happen. 0.5 == when the top of the element reaches the middle of the page
        enter: el => { // when it enters, do this
            const index = +d3.select(el).attr('data-index'); //get the "data-index" attribute
            updateChart(index, 'forward'); // run the updateChart function, pass it the 'data-index"
        },
        exit: el => { // when it leaves view (aka scrolling backwards), do this
            let index = +d3.select(el).attr('data-index'); // get the index
            index = Math.max(0, index - 1); // subtract one but don't go lower than 0
            updateChart(index, 'back'); // update with the new index
        }
    });
})()

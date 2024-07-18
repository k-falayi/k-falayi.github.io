const width = 1000;
const height = 610;
const margin = {top: 10, right: 50, bottom: 70, left: 100};
const companyProperties = [
        {name: 'Country', property: 'country'},
        {name: 'Continent', property: 'continent'},
        {name: 'Funding', property: 'funding'}
      ];

const widthTooltip = 230;
const backgroundCol = "#ffffff";
const accentCol = "#ffffff";
const fontSize = "14px";
const borderRadius = 5;
const circleBaseColour = "#6d98e8";
const circleStrokeColour = "#fff";
const circleWomanColour = "#f45900";

function renderOptions(data, countries, continent, solutions) {
	const optionsEl = d3.select("#options");

	optionsEl.append("label")
		.attr("for", "country-select")

	const countrySelect = d3.select("#country-select")

	countrySelect
		.selectAll("option.opt")
		.data(countries)
		.join("option")
		.attr("class", "opt")
		.attr("value", d => d)
		.text(d => d)

	const continentSelect = d3.select("#continent-select")

	continentSelect
		.selectAll("option.opt")
		.data(continent)
		.join("option")
		.attr("class", "opt")
		.attr("value", d => d)
		.text(d => d)

	const solutionSelect = d3.select("#solution-select");

	solutionSelect
		.selectAll("option.opt")
		.data(solutions)
		.join("option")
		.attr("class", "opt")
		.attr("value", d => d)
		.text(d => d)

	countrySelect.on("change", (e) => {
		renderChart(data, {
			update: true,
			selectCountry: countrySelect.node().value,
			selectSolution: solutionSelect.node().value,
			selectContinent: continentSelect.node().value
		})
	})
	solutionSelect.on("change", (e) => {
		renderChart(data, {
			update: true,
			selectCountry: countrySelect.node().value,
			selectSolution: solutionSelect.node().value,
			selectContinent: continentSelect.node().value
		})
	})
	continentSelect.on("change", (e) => {
		renderChart(data, {
			update: true,
			selectCountry: countrySelect.node().value,
			selectSolution: solutionSelect.node().value,
			selectContinent: continentSelect.node().value
		})
	})
}

// function to render the chart
function renderChart(dataLoad, opts = {update: false}) {
	const selectCountry = opts && opts.selectCountry || "all";
	const selectSolution = opts && opts.selectSolution || "all";
	const selectContinent = opts && opts.selectContinent || "select";

	const countries = (_.uniqBy(dataLoad, 'country')).map(d => d.country);
	const continent = (_.uniqBy(dataLoad, 'continent')).map(d => d.continent);
	const solutions = (_.uniqBy(dataLoad, 'solutionFocus')).map(d => d.solutionFocus);
	const countryCondition = d => (d['country'] === selectCountry) || (selectCountry === 'all')
	const solutionCondition = d => (d['solutionFocus'] === selectSolution) || (selectSolution === 'all')
	const continentCondition = d => (d['continent'] === selectContinent) || (selectContinent === 'select')


	if (!opts.update) {
		renderOptions(dataLoad, countries, continent, solutions)
	}
	const data = dataLoad
			.filter(countryCondition)
			.filter(solutionCondition)
			.filter(continentCondition)


	const chart = d3.select("#chart1")
	chart.html("")
	const svg = chart.append("svg")
		.attr('width', width)
		.attr('height', height)
		// .attr("viewBox", "0 0 " + width + " " + height )
		// .attr("preserveAspectRatio", "xMidYMid meet")
		.style('background-color', '#343d4b')

	  /// Scales ///
	  // x scale for positioning horizontally based on funding
	  const xScale = d3.scaleSqrt()
		.domain(d3.extent(dataLoad, d => +d.funding))
		.range([margin.left, width - margin.right])

	  // size scale for the radius of circles based on num employees 
	  const rScale = d3.scaleSqrt()
		.domain(d3.extent(dataLoad, d => +d.funding))
		.range([2, 30])



		const xAxis = g => g
        .attr("transform", `translate(${0}, ${height - margin.bottom})`)
        .call(d3.axisBottom(xScale)
          .tickSizeOuter(0)
        //   .ticks(8)
		  .tickValues([50000000, 200000000, 400000000, 600000000, 800000000, 1000000000, 2000000000])
          .tickFormat(i => `$${d3.format(".2s")(i).replace("G", "B")}`) 
		// console.log(xAxis)
        )

		.call(g => g.selectAll(".tick line")
		  .attr("y2", -height+100)
		  .attr("opacity", 0.5)
		  .attr("stroke-width", 0.5)
		  .attr('stroke-dasharray', '3 1')
		  .attr("color", '#dbd9d9')
		)
		.call(g => g.selectAll("text")
		  .attr("font-size", '12px')
		  .attr("color", circleBaseColour)
		  .attr("opacity", 0.8)
		  .attr("font-weight", "bold")
		)
		.call(g => g.select(".domain")
		  .attr("stroke-width", 4)
		  .attr("stroke", circleBaseColour)
		)

	  

		/// Call the axes ///
		svg.selectAll('.x-axis').data([null]).join("g")
		  .classed("x-axis", true)
		  .call(xAxis)

		/// Force definition ///
		// define force where x is based on the horizonral scale, y pushes the circles to the middle
		const force = d3.forceSimulation(dataLoad)
		  .force('forceX', d3.forceX(d => xScale(+d.funding)).strength(2))
		  .force('forceY', d3.forceY(height/2).strength(0.1))
		  .force('collide', d3.forceCollide(d => rScale(+d.funding) + 0.5).strength(1.5))

		// then run the force for a large number of iterations even before appending the shapes 
		// this way the layout is calculated first and we don't see the giggling in place on load
		const NUM_ITERATIONS = 400;
		for (let i = 0; i < NUM_ITERATIONS; ++i) {
		  force.tick();
		};
		force.stop();


		/// Add Title ///
		svg.append("text")
		  .style('font-size', '30px')
		  .attr('x', width/2)
		  .attr('y', 60)
		  .style('fill', 'rgb(219, 217, 217)')
		  .style('font-weight', 'bold')
		  .text('Agritech companies by funding raised')
		  .style('font-family', 'Montserrat')
		svg.append("text")
		  .style('font-size', '12px')
		  .attr('x', width/2)
		  .attr('y', 90)
		  .style('fill', 'rgb(219, 217, 217)')
		  .text('click bubbles for company info')
		svg.append("text")
		  .style('font-size', '12px')
		  .attr('x', width/10)
		  .attr('y', 570)
		  .style('fill', 'rgb(219, 217, 217)')
		  .text('Source: CB Insights | Kunle Falayi')
		svg.append("text")
		  .style('font-size', '12px')
		  .attr('x', width/10)
		  .attr('y', 585)
		  .style('fill', 'rgb(219, 217, 217)')
		  .text('Note: Solution focus is based on CB Insights broad categories.')
		svg.append("text")
		  .style('font-size', '12px')
		  .attr('x', width/10)
		  .attr('y', 600)
		  .style('fill', 'rgb(219, 217, 217)')
		  .text('Some startups show zero funding because they do not make funding raised public')
		  
		  


		///////////////////////////////////////////////////
		//////////////// Beeswarm Plot ////////////////////
		///////////////////////////////////////////////////

		// 1. group for the whole plot
		const beeswarmG = svg.selectAll(".beeswarm-g")
		  .data([null])
		  .join("g")
		  .classed("beeswarm-g", true)

		// 2. circles for each company
		const beeswarmCircles = beeswarmG.selectAll(".beeswarm-circle")
		  .data(dataLoad)
		  .join("circle")
		  .classed("beeswarm-circle", true)
			.attr("cx", d => d.x)
			.attr("cy", d => d.y)
			.attr("r", d => rScale(d.funding))
			.attr("fill", d => d.continent === 'Africa' ? circleStrokeColour : circleBaseColour)
			.attr("opacity", d => data.includes(d) ? 1 : 0.1)
			//.attr("opacity", 1)
			.attr("stroke", d => d.continent === 'Africa' ? circleWomanColour : 'none')
			.attr("stroke-dasharray", d => d.continent === 'Africa' 
			  ? `2 ${Math.round(rScale(d.funding)*0.25)}` 
			  : 'none'
			)
			.attr("stroke-width", d => d.continent === 'Africa' ?  rScale(d.funding)*0.2 + 0.2 : 0)
			.attr("stroke-linecap", 'round')

		// 3. append additional cirlces on top of the existing ones just for woman CEOs companies 
		// so we can create the stroke effect
		const beeswarmCirclesW = beeswarmG.selectAll(".beeswarm-circle-w")
		  .data(dataLoad.filter(d => d.continent === 'Africa'))
		  .join("circle")
		  .classed("beeswarm-circle-w", true)
			.attr("cx", d => d.x)
			.attr("cy", d => d.y)
			.attr("r", d => rScale(d.funding)*0.8)
			.attr("fill", circleWomanColour)
			.attr("opacity", d => data.includes(d) ? 1 : 0.1)
			//.attr("opacity", 1)

		///////////////////////////////////////////////////
		/////////// Tooltip and Click events //////////////
		///////////////////////////////////////////////////
		// 4. click events -- use this to control the tooltip later
		function clickHandler(e, datum) {
		  
		  d3.selectAll('.tooltip-g').remove() // remove any existing tooltips
		  
		  const tooltipG = beeswarmG
			.selectAll('g')
			.data([null])
			.join('g')
			.classed('tooltip-g', true)
			  .style("opacity", 1)
			  .attr('transform', d => datum.x > width-200 
					? `translate(${datum.x-250}, ${datum.y})`
					: `translate(${datum.x-50}, ${datum.y})`
				   )
			  .style('font-family', "Arial, Helvetica, sans-serif")
			  .style('font-size', fontSize)

		  tooltipG.append('rect')
			  .attr('width', widthTooltip)
			  .attr('height', 135)
			  .attr('fill', backgroundCol)
			  .attr('rx', borderRadius)
			  .attr('ry', borderRadius)
			  .attr('stroke', accentCol)
			  .attr('stroke-width', 3)
			  .style("z-index", 1)

		  tooltipG.selectAll('text')
			.data(companyProperties)
			.join('text')
			  .classed('company-properties-text', true)
			  .text(d => d.name === 'funding'
					? `${d.name}: $${d3.format(",.2f")(+datum[d.property])}` 
					: `${d.name}: ${datum[d.property]}`)
			  .attr('x', 10)
			  .attr('y', (d, i) => i * 20 + 50)
			  .style("z-index", 2)
			  .attr('text-anchor', 'left')
			  .attr('dy', '0.35em')

		  tooltipG.append('rect')
			.attr('width', widthTooltip - 40)
			.attr('height', 2)
			.attr('fill', '#ee6c4d')
			.attr('y', 35)
			.attr('x', 20)

		  tooltipG.append('text')
			.text(datum.companies)
			.attr('text-anchor', 'middle')
			.attr('dy', '0.35em')
			.attr('x', widthTooltip/2)
			.attr('y', 20)
			.style('fill', '#1b212c')
			.style('font-size', '16px')
			.style('font-weight', 'bold')
		}
		  
		beeswarmCircles.on('click', function(e, datum) {
		  return clickHandler(e, datum)
		})
		beeswarmCirclesW.on('click', function(e, datum) {
		  return clickHandler(e, datum)
		})

		// 5. Hide the tooltip when clicked outside 
		svg.on("click",function(e, datum){
		  if (this == e.target) {
			d3.selectAll(".tooltip-g")
			  .style("opacity", 0)
			  .style("z-index", -1)
		  }
		});

}

// load data and then render chart
d3.csv("https://static.observableusercontent.com/files/119f775d250a1a8b5376bbd6e7245341532ce0d3ab5bfe6e29f98d7a2b286faea74d5f14e1e081b427f763dbdc121eaae9aee00de053a478337069cd55794eb1?response-content-disposition=attachment%3Bfilename*%3DUTF-8%27%27conCountries%25401.csv", d3.autoType).then((d) => renderChart(d))

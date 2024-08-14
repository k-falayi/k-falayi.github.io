// Define the number format globally
const formatNumber = d3.format(',');

// Function to create or update the progress bar
function createOrUpdateProgressBar(data) {
    const container = d3.select("#progress-bar");
    const width = container.node().getBoundingClientRect().width;
    const height = 100; // Height of the progress bar
    const totalVotesCounted = +data[0].totalVotesCounted;
    const votesUncounted = +data[0].votesUncounted;
    const totalVotes = totalVotesCounted + votesUncounted;
    const totalBallots = +data[0].totalBallots;

    // Increase the width of the viewBox to allow space for the text
    container.attr("viewBox", `-100 0 ${width + 250} ${height + 50}`)
             .attr("preserveAspectRatio", "xMinYMid meet");

    // Remove any existing elements before redrawing
    container.selectAll("*").remove();

    const progressBar = container.append("g");

    // Append the total votes counted segment
    progressBar.append("rect")
               .attr("x", 0)
               .attr("y", (height - 100) / 2) // Center the bar vertically
               .attr("width", (totalVotesCounted / totalVotes) * width)
               .attr("height", 100) // Height of the bar
               .attr("fill", "#e41a1c");

    // Append the votes uncounted segment
    progressBar.append("rect")
               .attr("x", (totalVotesCounted / totalVotes) * width)
               .attr("y", (height - 100) / 2) // Center the bar vertically
               .attr("width", (votesUncounted / totalVotes) * width)
               .attr("height", 100) // Height of the bar
               .attr("fill", "#d3d3d3");

    // Append the text for total votes counted
    progressBar.append("text")
               .attr("x", -45)
               .attr("y", (height + 5) / 2) // Center the text vertically
               .attr("alignment-baseline", "middle")
               .attr("text-anchor", "end")
               .attr("fill", "black")
               .attr("class", "progress-bar-info")
               .append("tspan")
               .text(`${formatNumber(totalVotesCounted)}`)
               .append("tspan")
               .attr("x", -50)
               .attr("dy", "1.1em")
               .text("counted");

    // Append the text for votes uncounted
    progressBar.append("text")
               .attr("x", width + 40)
               .attr("y", (height + 5) / 2) // Center the text vertically
               .attr("text-anchor", "start")
               .attr("alignment-baseline", "middle")
               .attr("fill", "black")
               .attr("class", "progress-bar-info")
               .append("tspan")
               .text(`${formatNumber(votesUncounted)}`)
               .append("tspan")
               .attr("x", width + 60)
               .attr("dy", "1.1em")
               .text("uncounted");

    // Append the text for total ballots projected votes
    progressBar.append("text")
               .attr("x", width / 2)
               .attr("y", height + 30) // Position the text below the bar
               .attr("alignment-baseline", "middle")
               .attr("text-anchor", "middle")
               .attr("fill", "black")
               .attr("class", "progress-bar-info")
               .text(`${formatNumber(totalBallots)} projected votes`);
}

// Set up the SVG container and dimensions for arc charts
const margin = {top: 20, right: 20, bottom: 20, left: 20};

function createArcChart(containerId, candidateData) {
    const container = d3.select(`#${containerId}`);
    const svg = container.select("svg");
    const width = container.node().getBoundingClientRect().width;
    const height = width / 1.2;
    const radius = Math.min(width, height) / 2 - Math.max(margin.top, margin.right, margin.bottom, margin.left);

    svg.attr("viewBox", `0 0 ${width} ${height}`)
       .attr("preserveAspectRatio", "xMinYMid meet");

    const g = svg.append("g")
                 .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const totalBallots = +candidateData.totalBallots;
    const candidateVotes = +candidateData.candidateVotes;
    const votesNeeded = +candidateData.votesNeeded;
    const remainingVotes = totalBallots - candidateVotes - votesNeeded;

    const pie = d3.pie()
                  .sort(null)
                  .startAngle(-Math.PI / 2)
                  .endAngle(Math.PI / 2)
                  .value(d => d.value);

    const arc = d3.arc()
                  .innerRadius(radius * 0.5)
                  .outerRadius(radius * 1.095);

    const pieData = pie([
        {label: "Candidate Votes", value: candidateVotes, color: "#e41a1c"},
        {label: "Votes Needed", value: votesNeeded, color: "#FE9E9E"},
        {label: "Remaining Votes", value: remainingVotes, color: "#d3d3d3"}
    ]);

    g.selectAll("path")
     .data(pieData)
     .enter()
     .append("path")
     .attr("d", arc)
     .attr("fill", d => d.data.color);

    // Append candidate name
    g.append("text")
     .attr("class", "candidate-name")
     .attr("y", -radius * 0.15)
     .text(candidateData.Candidate.toUpperCase());

    // Append candidateVotes and votesNeeded as text
    const infoGroup = g.append("g")
                       .attr("class", "arc-info")
                       .attr("transform", `translate(0, ${radius * 0.05})`);

    infoGroup.append("text")
             .attr("y", radius * 0.2)
             .html(`<tspan style="fill: #e41a1c;">Candidate Votes:</tspan> ${formatNumber(candidateVotes)}`);

    infoGroup.append("text")
             .attr("y", radius * 0.05)
             .html(`<tspan style="fill: #FE9E9E;">Votes Needed to Guarantee Win:</tspan> ${formatNumber(votesNeeded)}`);
}

// Load the data
d3.csv("electionResult.csv").then(data => {
    createOrUpdateProgressBar(data); // Create the progress bar initially
    createArcChart('chart1', data[0]); // Lake
    createArcChart('chart2', data[1]); // Lamb
    createArcChart('chart3', data[2]); // Reye
    createArcChart('chart4', data[3]); // Williams

    // Add an event listener to update the progress bar on resize
    window.addEventListener("resize", () => createOrUpdateProgressBar(data));
});

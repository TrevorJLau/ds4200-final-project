// Set the dimensions and margins of the graph
const margin = { top: 50, right: 30, bottom: 100, left: 150 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Append the svg object to the div called 'chart'
const svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .style("font-family", "Arial");  // Set the font family to Arial

// Parse the Data
d3.csv("SO2mean.csv").then(function(data) {
  // Sort data in descending order based on SO2 mean data
  data.sort((a, b) => d3.descending(+a["SO2 Mean"], +b["SO2 Mean"]));

  // X axis
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d["SO2 Mean"])])
    .range([0, width]);
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .style("text-anchor", "end");

  // Y axis
  const y = d3.scaleBand()
    .range([0, height])
    .domain(data.map(d => d.State))
    .padding(0.1);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", 0)
      .attr("y", d => y(d.State))
      .attr("width", d => x(d["SO2 Mean"]))
      .attr("height", y.bandwidth())
      .attr("fill", "#69b3a2");

  // Add title
  svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)  // Position above the top margin
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Average SO2 Pollution by State");

  // Add X axis label
  svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)  // Position below the bottom margin
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Average SO2 Pollution");

  // Add Y axis label
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -120)  // Position to the left of the left margin
      .attr("x", -(height / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("State");
});

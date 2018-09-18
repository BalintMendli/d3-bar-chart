document.addEventListener("DOMContentLoaded", () => {
  d3.json(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  ).then(data => {
    const gdp = [];
    data.data.forEach(element => {
      const datesplit = element[0].split("-");
      let quarter = "";
      switch (datesplit[1]) {
        case "01":
          quarter = "Q1";
          break;
        case "04":
          quarter = "Q2";
          break;
        case "07":
          quarter = "Q3";
          break;
        case "10":
          quarter = "Q4";
          break;
        default:
          quarter = "";
      }
      gdp.push([
        new Date(element[0]),
        Number(element[1]),
        `${datesplit[0]} ${quarter}`
      ]);
    });

    d3.select("#container")
      .append("h1")
      .text("United States GDP")
      .attr("id", "title");

    const w = 900;
    const h = 500;

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    const padding = 40;
    const xScale = d3
      .scaleTime()
      .domain([d3.min(gdp, d => d[0]), d3.max(gdp, d => d[0])])
      .range([padding, w - padding]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(gdp, d => d[1])])
      .range([h - padding, padding]);

    svg
      .selectAll("rect")
      .data(gdp)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d[0]))
      .attr("y", d => yScale(d[1]))
      .attr("width", 3)
      .attr("height", d => h - padding - yScale(d[1]))
      .attr("fill", "royalblue")
      .attr("class", "bar")
      .append("title")
      .text(d => `${d[2]}\n$${d[1]} Billion`)
      .attr("id", "tooltip");

    const xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${h - padding})`)
      .call(xAxis)
      .attr("id", "x-axis");

    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(${padding},0)`)
      .call(yAxis)
      .attr("id", "y-axis");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 + padding)
      .attr("x", 0 - h / 3)
      .attr("dy", "1.5em")
      .style("text-anchor", "middle")
      .text("Gross Domestic Product");

    svg
      .append("text")
      .attr("text-anchor", "right")
      .attr("transform", `translate(${w - padding - 348},${h - 3})`)
      .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
      .attr("class", "small");
  });
});

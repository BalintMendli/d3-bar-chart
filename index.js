document.addEventListener('DOMContentLoaded', function() {
   d3.json(
      'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
   ).then(function(data) {
      let gdp = [];
      data.data.forEach(element => {
         const datesplit = element[0].split('-');
         let quarter = '';
         switch (datesplit[1]) {
            case '01':
               quarter = 'Q1';
               break;
            case '04':
               quarter = 'Q2';
               break;
            case '07':
               quarter = 'Q3';
               break;
            case '10':
               quarter = 'Q4';
               break;
         }
         gdp.push([new Date(element[0]), Number(element[1]), datesplit[0] + ' ' + quarter]);
      });
      console.log(gdp);

      d3.select('#container')
         .append('h1')
         .text('United States GDP');

      const w = 900;
      const h = 500;

      const svg = d3
         .select('body')
         .append('svg')
         .attr('width', w)
         .attr('height', h);

      const padding = 40;
      const xScale = d3
         .scaleTime()
         .domain([
            d3.min(gdp, (d, i) => d[0]),
            d3.max(gdp, (d, i) => d[0])
         ])
         .range([padding, w - padding]);
      const yScale = d3
         .scaleLinear()
         .domain([0, d3.max(gdp, d => d[1])])
         .range([h - padding, padding]);

      svg.selectAll('rect')
         .data(gdp)
         .enter()
         .append('rect')
         .attr('x', (d, i) => xScale(d[0]))
         .attr('y', d => yScale(d[1]))
         .attr('width', 3)
         .attr('height', d => h-padding-yScale(d[1]))
         .attr('fill', 'royalblue')
         .attr('class', 'bar')
         .append('title')
         .text(d => {
            return d[2] + '\n$' + d[1] + ' Billion';
         });

      const xAxis = d3.axisBottom(xScale);

      svg.append("g")
         .attr("transform", "translate(0, " + (h - padding) + ")")
         .call(xAxis);

      const yAxis = d3.axisLeft(yScale);

      svg.append('g')
         .attr('transform', 'translate('+ padding + ',0)')
         .call(yAxis);
   });
});

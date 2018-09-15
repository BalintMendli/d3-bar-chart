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
         gdp.push([datesplit[0] + ' ' + quarter, Number(element[1])]);
      });

      d3.select('#container')
         .append('h1')
         .text('United States GDP');

      const w = 1400;
      const h = 600;

      const svg = d3
         .select('body')
         .append('svg')
         .attr('width', w)
         .attr('height', h);

      svg.selectAll('rect')
         .data(gdp)
         .enter()
         .append('rect')
         .attr('x', (d, i) => {
            return i * 4;
         })
         .attr('y', d => {
            return h - d[1] / 30;
         })
         .attr('width', 3)
         .attr('height', d => {
            return d[1] / 30;
         })
         .attr('fill', 'royalblue')
         .attr('class', 'bar')
         .append('title')
         .text(d => {
            return d[0] + '\n$' + d[1] + ' Billion';
         });
   });
});

document.addEventListener('DOMContentLoaded',function(){
   d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(data) {

   let date=[];
   let gdp=[];
   data.data.forEach(element => {
      gdp.push(Number(element[1]));
      const datesplit=element[0].split('-');
      let quarter='';
      switch (datesplit[1]){
         case '01':
            quarter='Q1';
            break;
         case '04':
            quarter='Q2';
            break;
         case '07':
            quarter='Q3';
            break;
         case '10':
            quarter='Q4';
            break;
      }
      date.push(datesplit[0]+' '+quarter);

   });

   console.log(date);
   console.log(gdp);

   d3.select("#container")
      .append("h1")
      .text("Very important item");


   }); 
});
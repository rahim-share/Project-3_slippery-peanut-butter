//function to generate a barchart
function BuildCharts(city) {
    d3.json("/api/evdata",  function (apiData)  {
        console.log(data);
        //plot for the first chart
        var data = [{
            x: apiData[city].Year,
            y: apiData[city].CarCounts,
            type: "bar"  }];
        var layout = {title:"Count by State"};
        Plotly.newPlot("barchart", data, layout);
        //plot the second chart
        var data2 = [{
            labels: apiData[city].Car,
            values: apiData[city].PopCount,
            type: "pie"  }];
        var layout2 = {title:"Car Model Split"};
        Plotly.newPlot("pie", data2, layout2);
    });
};
    //this will deal with selecting a new value from html
function optionChanged(cityName) {
    console.log(cityName);
    BuildCharts(cityName);
};
function createStateChart() {
    d3.json("/api/state_pop", function(stateData) {
        var data = [{
            x: stateData.state,
            y: stateData.total,
            type: "bar"
            }]
        var layout = {title:"Sales by State"};
    Plotly.newPlot("myStateChart",data,layout)
    });
};










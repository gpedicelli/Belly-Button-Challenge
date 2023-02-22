//Get the samples

function buildCharts(sample){
  const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

  // Use `d3.json` to fetch the sample data for the plots
  d3.json(samples).then((data) => {
      var samples= data.samples;
      var resultsarray= samples.filter(sampleobject => sampleobject.id == sample);
      var result= resultsarray[0]
    
      var ids = result.otu_ids;
      var labels = result.otu_labels;
      var values = result.sample_values;

      // Building bubble chart
      var LayoutBubble = {
          margin: { t: 0 },
          xaxis: { title: "OTU ID" },
          hovermode: "closest",
          };
      
          var DataBubble = [ 
          {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
              color: ids,
              size: values,
              }
          }
        ];
      
        Plotly.newPlot("bubble", DataBubble, LayoutBubble);
        
  //  Building bar chart
        var bar_data =[
          {
            y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x:values.slice(0,10).reverse(),
            text:labels.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
      
          }
        ];
      
        var barLayout = {
          title: "Top 10 Bacteria Cultures Found",
          margin: { t: 30, l: 150 }
        };
      
        Plotly.newPlot("bar", bar_data, barLayout);
  });
};   
     
    
function init() {
// Grab a reference to the dropdown select element

  const samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

  // Use `d3.json` to fetch the sample data for the plots
  d3.json(samples).then((data) => {

    var dropdownames=data.names;

    // TA helped with this part 
    var selector = d3.select("#selDataset");
    for(let name = 0; name<dropdownames.length;name++){
      selector.append("option").text(dropdownames[name]).property("value",dropdownames[name])
    };
  })

    
  // Use the first sample from the list to build the initial plots
  // const firstSample = sampleNames[0];
  const firstSample = '940'
  buildCharts(firstSample);
  // buildMetadata(firstSample);
}

function optionChanged(newSample) {
// Fetch new data each time a new sample is selected
  buildCharts(newSample);
  // buildMetadata(newSample);
}

// run init function on page load/refresh
init()
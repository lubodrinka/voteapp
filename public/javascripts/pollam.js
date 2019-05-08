/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */






// Themes begin

am4core.useTheme(am4themes_animated);
// Themes end
function adddata(chart) {
  let object = amDataset;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key];
      element.color = chart.colors.next();

    }
  }
  return object;
}

var chart;
// Create chart instance
console.log(graphType);
if (graphType == 'bar') {
  chart = am4core.create("chartdiv", am4charts.XYChart3D);
  chart.data = adddata(chart);
  //Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "name";
  categoryAxis.renderer.labels.template.rotation = 270;
  categoryAxis.renderer.labels.template.hideOversized = false;
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";
  categoryAxis.tooltip.label.rotation = 270;
  categoryAxis.tooltip.label.horizontalCenter = "right";
  categoryAxis.tooltip.label.verticalCenter = "middle";

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = "";
  valueAxis.title.fontWeight = "bold";

  // Create series
  var series = chart.series.push(new am4charts.ColumnSeries3D());
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "name";
  series.name = "Votes";
  series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  series.columns.template.fillOpacity = .8;
  series.columns.template.propertyFields.fill = "color";

  var columnTemplate = series.columns.template;
  columnTemplate.strokeWidth = 2;
  columnTemplate.strokeOpacity = 1;
  columnTemplate.stroke = am4core.color("#FFFFFF");

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineX.strokeOpacity = 0;
  chart.cursor.lineY.strokeOpacity = 0;

  // Enable export
  chart.exporting.menu = new am4core.ExportMenu();

} else if (graphType == 'pie') {
  
  chart = am4core.create("chartdiv", am4charts.PieChart3D);
  chart.data = adddata(chart);
  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  chart.legend = new am4charts.Legend();
  var series = chart.series.push(new am4charts.PieSeries3D());
  series.dataFields.value = "value";
  series.dataFields.category = "name";

} else if (graphType == 'doughnut') {

  chart = am4core.create("chartdiv", am4charts.PieChart);
  chart.data = adddata(chart);
  // Add and configure Series
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "value";
  pieSeries.dataFields.category = "name";
  pieSeries.innerRadius = am4core.percent(50);
  pieSeries.ticks.template.disabled = true;
  pieSeries.labels.template.disabled = true;

  // Add data

  var rgm = new am4core.RadialGradientModifier();
  rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
  pieSeries.slices.template.fillModifier = rgm;
  pieSeries.slices.template.strokeModifier = rgm;
  pieSeries.slices.template.strokeOpacity = 0.4;
  pieSeries.slices.template.strokeWidth = 0;

  chart.legend = new am4charts.Legend();
  chart.legend.position = "right";




} else if (graphType == 'radar') {
  chart = am4core.create("chartdiv", am4charts.RadarChart);
  chart.data = adddata(chart);
 

  /* Create axes */
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "name";

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
  valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

  /* Create and configure series */
  var series = chart.series.push(new am4charts.RadarSeries());
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "name";
  series.name = "Sales";
  series.strokeWidth = 3;


}





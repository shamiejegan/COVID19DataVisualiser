// function to draw the X axis tickers at specified interval

//currently used by line chart templates:
  // multiclass-line-chart.js
  // time-series-chart.js

function drawYAxisTickLabels(min, max, layout, mapFunction, decimalPlaces) {

  // Map function must be passed with .bind(this).
  var range = max - min;
  var yTickStep = range / layout.numYTickLabels;

  fill(0);
  textAlign('right', 'center'); // align text against axis
  textSize(10);

  // Draw all axis tick labels and grid lines.
  for (i = 0; i <= layout.numYTickLabels; i++) {
    var value = min + (i * yTickStep);
    var y_location = mapFunction(value);

    noStroke();
    // Add tick labsel.
    text(numberToCommas(value.toFixed(decimalPlaces)),
         layout.leftMargin - layout.pad +5,
         y_location);

    if (layout.grid) {
      // Add grid lines
      stroke(200);
      line(layout.leftMargin, y_location, layout.rightMargin, y_location);
    }
  }
}

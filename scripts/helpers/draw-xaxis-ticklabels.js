// function to draw the X axis tickers at specified interval

//currently used by line chart templates:
  // multiclass-line-chart.js
  // time-series-chart.js

function drawXAxisTickLabels(min, max, layout, mapFunction, decimalPlaces) {

  // Map function must be passed with .bind(this).
  var range = max - min;
  var xTickStep = range / layout.numXTickLabels;

  fill(0);
  textAlign('center');
  textSize(10);

  // Draw all axis tick labels and grid lines.
  for (i = 0; i <= layout.numXTickLabels; i++) {
    var value =min + (i * xTickStep);
    var x_location = mapFunction(value);

    // Add tick labels
    noStroke();
    text(value.toFixed(decimalPlaces),
         x_location,
         layout.bottomMargin + layout.pad);

    if (layout.grid) {
      // Add grid lines
      stroke(220);
      line(x_location, layout.topMargin, x_location, layout.bottomMargin);

    }
  }
}

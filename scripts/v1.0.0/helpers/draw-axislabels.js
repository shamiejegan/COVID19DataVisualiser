// function to indicate the x & y axis labels of the chart

//currently used by line chart templates:
  // multiclass-line-chart.js
  // time-series-chart.js

function drawAxisLabels(xLabel, yLabel, layout) {
  fill(0);
  noStroke();
  textAlign('center', 'center');
  textSize(12);

  // Draw x-axis label.
  text(xLabel,
       (layout.plotWidth() / 2) + layout.leftMargin,
       layout.bottomMargin + 30);

  // Draw y-axis label.
  push();
  translate(layout.leftMargin - 60,
            layout.bottomMargin / 2 +30);
  rotate(- PI / 2);
  text(yLabel, 0, 0);
  pop();
}

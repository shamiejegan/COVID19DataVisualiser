// function to plot a horizontal line at the bottom of the canvas for the x axis
// and vertical line at the left of the canvas as the y axis

//currently used by line chart templates:
  // multiclass-line-chart.js
  // time-series-chart.js

function drawAxis(layout) {
  stroke(0);

  // x-axis
  line(layout.leftMargin,
       layout.bottomMargin,
       layout.rightMargin,
       layout.bottomMargin);

  // y-axis
  line(layout.leftMargin,
       layout.topMargin,
       layout.leftMargin,
       layout.bottomMargin);
}

// function to draw out the individual lines connecting the previous and current values of a line chart

// currently used by:
  // MulticlassTimeseriesChart contructor
  //TimeSeriesChart constructors

function drawLinepoints(currentX,currentY,previousX,previousY){
  line(previousX,
    previousY,
    currentX,
    currentY);
  ellipse(currentX,
    currentY,
    3);
}

// Function to line chart with time in x axis to the screen.

function TimeSeriesChart(x,y,title,xLabel,yLabel,gridOn,
  startTime,endTime,minY,maxY,baseLine) {

  // calculate number of time steps to draw to screen
  var timestamps = endTime - startTime;
  var timestamp_int=min(timestamps,10);

  // name of x and y axis
  this.xLabel = xLabel;
  this.yLabel= yLabel;

  // identify to min and max values for the Y axis
  this.minY=minY;
  this.maxY=maxY;

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    // set margin around plot, iwth larger Left and bottom margins for labels.
    leftMargin: 100,
    rightMargin: width-50,
    topMargin: 80,
    bottomMargin: height-50,
    pad: 10,
    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },
    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },
    // Boolean to enable/disable background grid.
    grid: gridOn,
    // Number of axis tick labels to draw
    numXTickLabels: timestamp_int,
    numYTickLabels: 20
  };


  this.draw = function() {

    // Draw all x-axis labels before plotting points
    strokeWeight(1);
    drawXAxisTickLabels(startTime,
                       endTime,
                       this.layout,
                       this.mapTimeToWidth.bind(this),
                       0);
    // Draw all y-axis labels before plotting points
    drawYAxisTickLabels(this.minY,
                        this.maxY,
                        this.layout,
                        this.mapYToHeight.bind(this),
                        1);

    // draw axis lines
    drawAxis(this.layout);

    // Draw x and y axis labels.
    drawAxisLabels(this.xLabel,
                   this.yLabel,
                   this.layout);

    // draw baseline (e.g. @ 0), which will be indicated as an input parameter
    strokeWeight(2);
    stroke(0);
    line(this.mapTimeToWidth(startTime),
      this.mapYToHeight(baseLine),
      this.mapTimeToWidth(endTime),
      this.mapYToHeight(baseLine)
    );

    // Plot line between startYear and endYear.
    var previous=null;

    for (var i=0; i < timestamps +1; i++){
      // Create an object to store data for the current time.
      var current = {
        // store the current time step and volume in an object
        'time': x[i],
        'volume': y[i]
      }

      // if it is not the first item in the list, draw.
      if (previous) {

        // draw line connecting vol of previous to current timestamp
        strokeWeight(3);
        stroke(this.mapYToColour(current.volume,255));
        fill(this.mapYToColour(current.volume,0));

        // map the current and previous values to points on the canvas
        this.currentX=this.mapTimeToWidth(current.time);
        this.currentY=this.mapYToHeight(current.volume);
        this.previousX=this.mapTimeToWidth(previous.time);
        this.previousY=this.mapYToHeight(previous.volume);

        // function to draw lines connecting the current and previous numbers together
        drawLinepoints(this.currentX,this.currentY,this.previousX,this.previousY);

        //calculate distance between x locations
        xDiff=Math.ceil(this.mapTimeToWidth(current.time)-this.mapTimeToWidth(previous.time));
        yDiff=Math.ceil(this.mapYToHeight(current.volume)-this.mapYToHeight(previous.volume));

        noStroke(); //restart stroke to none as individual rectangles are only 1px wide
        fill(this.mapYToColour(current.volume,100));
        //draw thin rectangles below line to give illusion of shading
        for (var j=0; j<xDiff; j++){
          rect(
            //increment x by 1 pixel at a time
            this.mapTimeToWidth(previous.time)+j,
            //change height gradually from the previous to current value at each pixel
            this.mapYToHeight(previous.volume)+j*(yDiff/xDiff),
             //draw one pixel at a time
            1,
            // change the height of the rectangle such that it always end at bottom of chart
            this.mapYToHeight(this.minY)-(this.mapYToHeight(previous.volume)+j*(yDiff/xDiff))
          )
        }
      }

    // Assign current to previous so it is available for next iteration
    previous = current;

    }

    // insert title of chart
    addTitle(title)

  }

  // method to map time onto X axis in canvas
  this.mapTimeToWidth = function(value) {
    return map(value,
               startTime,
               endTime,
               this.layout.leftMargin,   // Draw left-to-right from margin.
               this.layout.rightMargin);
  };

  // method to map values onto Y axis in canvas
  this.mapYToHeight = function(value) {
    return map(value,
               this.minY,
               this.maxY,
               this.layout.bottomMargin,   // Draw bottom-to-top from margin.
               this.layout.topMargin);
  };

  // function to assign colour scale to line depending of y value
  // higher values have a shade of red
  // lower values have a shade of blue
  // added alpha value as input so that same formula can be used for area shade
  this.mapYToColour = function(value,alpha) {
    var red =  map(value,
                   this.minY,
                   this.maxY,
                   0,
                   255);
    var blue = 255 - red;
    return color(red, 0, blue, alpha);
  };

}

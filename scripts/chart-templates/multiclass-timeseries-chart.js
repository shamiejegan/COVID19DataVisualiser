// Function to draw a multi-line timeseries chart to the screen.

function MulticlassTimeseriesChart(data,colours,title,xLabel,yLabel,gridOn,
  startTime,endTime,datalimit) {

  // name of x and y axis
  this.xLabel = xLabel;
  this.yLabel= yLabel;

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
    numXTickLabels: 26,
    numYTickLabels: 20
  };

  // draw method called by the visualiser to plot the chart after setting it up
  this.draw = function() {

    // create an array of all possible values, which will be used to identify max point
    var allCases=[];
    for (var i=0; i<data.getColumnCount()-1;i++){
      for (var j=0; j<data.getRowCount()-1; j++){
        append(allCases, data.getNum(j+1,i+1));
      }
    }

    // set min case to 0 (start graph at 0)
    this.minY = 0;
    // Find max Cases for mapping to canvas height.
    //set min case to a rounded up value
    this.maxY = Math.ceil(max(allCases)/100000)*100000 ;

     // Draw all x-axis labels before plotting points
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
                         0);

     // Draw x and y axis to chart
     drawAxis(this.layout);

     // Draw x and y axis labels.
     drawAxisLabels(this.xLabel,
                    this.yLabel,
                    this.layout);

    var timestamps = endTime - startTime;

    // Loop over all rows and draw a line from the previous to current value.
    for (var i = 1; i < data.getColumnCount(); i++) {

      var previous=null;

      var country=data.columns[i]

      // get the ith column of data (each category is one column)
      var col=stringsToNumbers(data.getColumn(i));

      //only draw line if the category has a value exceeding the data limit
      if(max(col)>datalimit){

        for (var j=0; j < timestamps +1; j++){
          // Create an object to store data for the current time.
          var current = {
            // store the current time step and volume in an object
            'time': startTime+ j,
            'volume': data.getNum(j,i)
          }

          // if it is not the first item in the list, draw.
          if (previous) {

            // draw line connecting vol of previous to current timestamp
            stroke(colours[i-1]);
            fill(colours[i-1]);

            // map the current and previous values to points on the canvas
            this.currentX=this.mapTimeToWidth(current.time);
            this.currentY=this.mapYToHeight(current.volume);
            this.previousX=this.mapTimeToWidth(previous.time);
            this.previousY=this.mapYToHeight(previous.volume);

            // function to draw lines connecting the current and previous numbers together
            drawLinepoints(this.currentX,this.currentY,this.previousX,this.previousY);

            // function to display text on screen if mouse is hovered ellipse
            this.texts=[country,numberToCommas(current.volume)];
            checkMouseHover(this.currentX,this.currentY,this.texts,8);

          }

        // Assign current to previous so it is available for next iteration
        previous = current;

        }

      }

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

};

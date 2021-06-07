function MultiClassLineChart(data,colours,title) {

  this.data=data;

  this.title=title;

  this.itemcolour=colours

  // Layout object to store all common plot layout parameters and methods.

  var marginSize=30;

  // Names for each axis.
  this.xAxisLabel = '2020 Week';
  this.yAxisLabel = 'Cases';

  this.layout = {
    marginSize: marginSize,

    // Margin positions around the plot. Left and bottom have double
    // margin size to make space for axis and tick labels on the canvas.
    leftMargin: marginSize * 2,
    rightMargin: width - marginSize,
    topMargin: marginSize,
    bottomMargin: height - marginSize * 2,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },

    // Boolean to enable/disable background grid.
    grid: false,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 26,
    numYTickLabels: 20

  };

  this.draw = function() {

    // Draw the title above the plot.
    this.drawTitle();

    // Set min and max Weeks: assumes data is sorted by date.
    this.startWeek = this.data.getNum(0,'Week');
    this.endWeek = this.data.getNum(this.data.getRowCount() - 1, 'Week');

    // Find min and max Cases for mapping to canvas height.

    var allCases=[];
    for(var i=0; i<this.data.getColumnCount()-1;i++){
      for(var j=0; j<this.data.getRowCount()-1; j++){
        append(allCases, this.data.getNum(j+1,i+1));
      }
    }
    this.maxCases = max(allCases);
    this.minCases = min(allCases);


    textSize(10);

    // Draw all y-axis labels.
    drawYAxisTickLabels(this.minCases,
                        this.maxCases,
                        this.layout,
                        this.mapCasesToHeight.bind(this),
                        0);

    // Draw x and y axis.
    drawAxis(this.layout);

    // Draw x and y axis labels.
    drawAxisLabels(this.xAxisLabel,
                   this.yAxisLabel,
                   this.layout);


     var numWeeks = this.endWeek - this.startWeek;

     // The number of x-axis labels to skip so that only
     // numXTickLabels are drawn.
     var xLabelSkip = ceil(numWeeks / this.layout.numXTickLabels);


     // Draw the tick label marking the start of the previous year.
     for (var j=1; j<numWeeks+1; j++){
       if (j % xLabelSkip == 0) {
         drawXAxisTickLabel(j, this.layout,
                            this.mapWeekToWidth.bind(this));
       }
     }


    // Loop over all rows and draw a line from the previous value to
    // the current.
    for (var i = 1; i < this.data.getColumnCount(); i++) {
      var previous=null;
      var country=this.data.columns[i]

      // get the ith column of data (each country is one column)
      var col=this.data.getColumn(i);

      for (var j=0; j < numWeeks+1; j++){
        // Create an object to store data for the current Week.
        var current = {
          // Convert strings to numbers.
          'Week': this.startWeek+ j,
          'Cases': this.data.getNum(j,i)
        }

        if (previous) {
          // Draw line segment connecting previous Week to current
          // Week pay gap.
          stroke(this.itemcolour[i-1]);
          line(this.mapWeekToWidth(previous.Week),
            this.mapCasesToHeight(previous.Cases),
            this.mapWeekToWidth(current.Week),
            this.mapCasesToHeight(current.Cases));
          ellipse(this.mapWeekToWidth(current.Week),
            this.mapCasesToHeight(current.Cases),
            2);


          if (abs(mouseX-this.mapWeekToWidth(current.Week))<4 && abs(mouseY-this.mapCasesToHeight(current.Cases))<4){
            fill(this.itemcolour[i-1]);
            noStroke();
            textSize(12);
            text(country,mouseX,this.mapCasesToHeight(current.Cases)-20);
            text(current.Cases,mouseX,this.mapCasesToHeight(current.Cases)-10);

          }


        }


      // Assign current year to previous year so that it is available
      // during the next iteration of this loop to give us the start
      // position of the next line segment.
      previous = current;
      }



    }


  }

  this.mapWeekToWidth = function(value) {
    return map(value,
               this.startWeek,
               this.endWeek,
               this.layout.leftMargin,   // Draw left-to-right from margin.
               this.layout.rightMargin);
  };

  this.mapCasesToHeight = function(value) {
    return map(value,
               this.minCases,
               this.maxCases,
               this.layout.bottomMargin,   // Draw bottom-to-top from margin.
               this.layout.topMargin);
  };

  this.drawTitle = function() {
    fill(0);
    noStroke();
    textSize(24);
    textAlign('center', 'center');

    text(title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.topMargin - (this.layout.marginSize / 2));
  };
};

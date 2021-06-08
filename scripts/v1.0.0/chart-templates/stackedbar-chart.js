// Function to draw stacked bar chart to the screen.
function StackedBarChart(data,title,refpoint,AColour,BColour,classes) {

  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    leftMargin: 100,
    rightMargin: width,
    topMargin: 80,
    bottomMargin: height,
    pad: 5,
    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    }
  };

  this.draw = function() {

    // Draw labels at the top of the plot.
    this.drawCategoryLabels();

    // distribute the height of each bar based on number of input rows
    var lineHeight = (height - this.layout.topMargin) /
        data.getRowCount();

    // Loop over every row in the data.
    for (var i = 0; i < data.getRowCount(); i++) {

      // Calculate the y position for each company.
      var lineY = (lineHeight * i) + this.layout.topMargin;

      // Create an object that stores data from the current row.
      var company = {
        // Convert strings to numbers.
        'name': data.getRow(i).getString("company"),
        'classA': data.getRow(i).getNum("female"),
        'classB': data.getRow(i).getNum("male")
      };

      // Draw the company name in the left margin.
      fill(0);
      noStroke();
      textAlign('right', 'top');
      text(company.name,
           this.layout.leftMargin - this.layout.pad,
           lineY);

      // Draw female employees rectangle.
      fill(AColour);
      rect(this.layout.leftMargin,
           lineY,
           this.mapPercentToWidth(company.classA),
           lineHeight - this.layout.pad);

      // Draw male employees rectangle.
      fill(BColour);
      rect(this.layout.leftMargin+this.mapPercentToWidth(company.classA),
           lineY,
           this.mapPercentToWidth(company.classB),
           lineHeight - this.layout.pad);
    }

    // Draw 50% line
    stroke(50);
    strokeWeight(5);
    line(refx,
         this.layout.topMargin-10,
         refx,
         this.layout.bottomMargin);

   // add title to chart
    addTitle(title)

  };


  // Variable reference line location e.g. 50% line.
  refx = (this.layout.plotWidth() *refpoint) + this.layout.leftMargin;


  // method to draw the labels of each category above graph
  this.drawCategoryLabels = function() {
    fill(0);
    noStroke();
    textSize(10);
    textAlign('left', 'top');
    text(classes[0],
         this.layout.leftMargin,
         this.layout.topMargin-20);
    textAlign('center', 'top');
    text(round(refpoint*100)+'%',
         refx-15,
         this.layout.topMargin-10);
    textAlign('right', 'top');
    text(classes[1],
         this.layout.rightMargin,
         this.layout.topMargin-20);
  };

  // method to map the numbers in percentage to length of the bar
  this.mapPercentToWidth = function(percent) {
    return map(percent,
               0,
               100,
               0,
               this.layout.plotWidth());
  };


};
